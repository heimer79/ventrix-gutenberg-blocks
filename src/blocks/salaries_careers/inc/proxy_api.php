<?php

/**
 * Security check: Verify WordPress core functions exist
 */
if (!function_exists('register_rest_route') || !function_exists('add_action') || 
    !function_exists('current_user_can') || !function_exists('wp_remote_get') ||
    !function_exists('wp_send_json_error') || !function_exists('wp_send_json_success') ||
    !function_exists('wp_remote_retrieve_body') || !function_exists('is_wp_error') ||
    !function_exists('esc_url_raw') || !function_exists('register_block_type_from_metadata')) {
    
    // If WordPress functions are not available, don't register anything
    return;
}

/**
 * Security check: Verify WP_Query class exists
 */
if (!class_exists('WP_Query')) {
    return;
}

require_once __DIR__ . '/helpers.php';

/**
 * Permission check for the schema/validation endpoints.
 *
 * They expose database structure, so only administrators may use them.
 * The frontend render of the block does not depend on these endpoints.
 *
 * @return bool
 */
function cafeto_salaries_rest_permission() {
    return current_user_can('manage_options');
}

function register_salaries_careers_api_routes() {
    register_rest_route('salaries-careers/v1', '/tables', array(
        'methods' => 'GET',
        'callback' => 'get_wordpress_tables',
        'permission_callback' => 'cafeto_salaries_rest_permission'
    ));

    register_rest_route('salaries-careers/v1', '/columns', array(
        'methods' => 'GET',
        'callback' => 'get_table_columns',
        'permission_callback' => 'cafeto_salaries_rest_permission'
    ));

    register_rest_route('salaries-careers/v1', '/check-data', array(
        'methods' => 'GET',
        'callback' => 'check_salaries_table_has_data',
        'permission_callback' => 'cafeto_salaries_rest_permission'
    ));

    register_rest_route('salaries-careers/v1', '/validate', array(
        'methods' => 'POST',
        'callback' => 'validate_salaries_careers_block',
        'permission_callback' => 'cafeto_salaries_rest_permission',
    ));
}
add_action('rest_api_init', 'register_salaries_careers_api_routes');



/**
 * Proxies requests to the API.
 *
 * This function handles AJAX requests by forwarding them to the specified API URL.
 * It retrieves data from the API and returns it to the front end.
 */
function proxy_request_to_api() {
    // Require a logged-in user with edit_posts capability.
    if (!is_user_logged_in() || !current_user_can('edit_posts')) {
        wp_send_json_error('Insufficient permissions.', 403);
        return;
    }

    // Verify the request nonce.
    $nonce = isset($_GET['nonce']) ? sanitize_text_field(wp_unslash($_GET['nonce'])) : '';
    if (!wp_verify_nonce($nonce, 'proxy_request_to_api')) {
        wp_send_json_error('Invalid nonce.', 403);
        return;
    }

    // Get the API URL from the request parameters.
    $api_url = isset($_GET['api_url']) ? esc_url_raw($_GET['api_url']) : '';

    // If no URL is provided, return an error response.
    if (empty($api_url)) {
        wp_send_json_error('API URL is missing.');
        return;
    }

    // Restrict destinations to a strict domain whitelist to prevent SSRF.
    $allowed_hosts = apply_filters('cafeto_proxy_request_allowed_hosts', array(
        'api.bls.gov',
        'projectionscentral.com',
    ));
    $parsed_host = wp_parse_url($api_url, PHP_URL_HOST);
    if (!$parsed_host || !in_array(strtolower($parsed_host), $allowed_hosts, true)) {
        wp_send_json_error('URL not allowed.', 403);
        return;
    }

    // Perform the API request.
    $response = wp_remote_get($api_url);

    // Check if the request was successful and return the response.
    if (is_wp_error($response)) {
        wp_send_json_error('Error fetching data from API.');
    } else {
        wp_send_json_success(wp_remote_retrieve_body($response));
    }
}
// Hook the proxy request function. Not exposed to non-logged-in users (wp_ajax_nopriv_*)
// because it is not consumed by any public-facing script — only authenticated editors
// use it, and the capability/nonce/whitelist checks above are enforced regardless.
add_action('wp_ajax_proxy_request_to_api', 'proxy_request_to_api');

/**
 * Allows CORS requests from local development environments.
 *
 * This function sets the appropriate headers to enable CORS for requests coming
 * from local domains. It also handles preflight requests by responding with the
 * correct headers for methods and credentials.
 */
function allow_cors_from_local() {
    // Only apply to this plugin's own AJAX/REST endpoints, not every WordPress request.
    $request_uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
    $is_relevant_request = (
        strpos($request_uri, 'action=proxy_request_to_api') !== false ||
        strpos($request_uri, '/wp-json/salaries-careers/v1/') !== false
    );
    if (!$is_relevant_request) {
        return;
    }

    // Check if the request comes from an allowed origin using a regular expression.
    if (isset($_SERVER['HTTP_ORIGIN']) && preg_match('/^http:\/\/([a-z0-9-]+)\.local$/', $_SERVER['HTTP_ORIGIN'])) {
        header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
    }

    // Handle OPTIONS requests (preflight) to ensure they respond correctly.
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        }
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
            header('Access-Control-Allow-Headers: ' . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
        }
        exit;
    }
}
// Hook the CORS function to the 'init' action to allow CORS from local environments.
add_action('init', 'allow_cors_from_local');





/**
 * Checks if a table has data for the given post (filtered by asset_url if the column exists).
 */
function check_salaries_table_has_data( $request ) {
    global $wpdb;

    $table   = sanitize_text_field( $request->get_param( 'table' ) );
    $post_id = intval( $request->get_param( 'post_id' ) );

    if ( empty( $table ) ) {
        return new WP_Error( 'missing_table', 'Table parameter is required.', array( 'status' => 400 ) );
    }

    if ( ! cafeto_salaries_is_allowed_table( $table ) ) {
        return new WP_Error( 'invalid_table', 'Table not allowed.', array( 'status' => 403 ) );
    }

    $table_name = $wpdb->prefix . $table;
    $columns    = cafeto_salaries_get_table_columns( $table_name, false );

    if ( null === $columns ) {
        return new WP_Error( 'invalid_table', 'The selected table does not exist.', array( 'status' => 404 ) );
    }

    $has_asset_url = in_array( 'asset_url', $columns, true );

    if ( $has_asset_url && $post_id ) {
        $permalink = get_permalink( $post_id );
        $path      = trim( (string) wp_parse_url( $permalink, PHP_URL_PATH ), '/' );
        $count     = $wpdb->get_var(
            $wpdb->prepare( "SELECT COUNT(*) FROM `$table_name` WHERE `asset_url` = %s", '/' . $path . '/' )
        );
    } else {
        $count = $wpdb->get_var( "SELECT COUNT(*) FROM `$table_name`" );
    }

    return new WP_REST_Response( array(
        'has_data' => intval( $count ) > 0,
        'count'    => intval( $count ),
    ), 200 );
}

/**
 * Gets the list of WordPress tables
 */
function get_wordpress_tables() {
    global $wpdb;
    $tables = $wpdb->get_results("SHOW TABLES", ARRAY_N);
    $wordpress_tables = array();
    foreach ($tables as $table) {
        $table_name = $table[0];
        if (strpos($table_name, $wpdb->prefix) !== 0) {
            continue;
        }

        $short_name = substr($table_name, strlen($wpdb->prefix));
        if (cafeto_salaries_is_allowed_table($short_name)) {
            $wordpress_tables[] = $short_name;
        }
    }
    return new WP_REST_Response($wordpress_tables, 200);
}

/**
 * Gets the columns of a specific table
 */
function get_table_columns($request) {
    global $wpdb;
    $table = sanitize_text_field($request->get_param('table'));

    if (!cafeto_salaries_is_allowed_table($table)) {
        return new WP_Error('invalid_table', 'Table not allowed.', array('status' => 403));
    }

    $table_name = $wpdb->prefix . $table;
    $columns = cafeto_salaries_get_table_columns($table_name, false);

    // Verify the table exists
    if ($columns === null) {
        return new WP_Error('invalid_table', 'The selected table does not exist.', array('status' => 404));
    }

    return new WP_REST_Response($columns, 200);
}

/**
 * Validates block configuration for the editor (mirrors frontend render checks).
 *
 * @param WP_REST_Request $request Request object.
 * @return WP_REST_Response
 */
function validate_salaries_careers_block($request) {
    $columns = $request->get_param('columns');
    if (!is_array($columns)) {
        $columns = array();
    }

    $attributes = array(
        'selectedTable'     => sanitize_text_field($request->get_param('table')),
        'selectedColumns'   => $columns,
        'tableTitle'        => sanitize_text_field($request->get_param('table_title') ?: 'Salaries and Careers'),
        'showTitle'         => (bool) $request->get_param('show_title'),
        'pinUnitedStates'   => (bool) $request->get_param('pin_united_states'),
        'pinStateRow'       => (bool) $request->get_param('pin_state_row'),
    );

    $post_id = (int) $request->get_param('post_id');
    $options = $post_id > 0 ? array('post_id' => $post_id) : array();

    $data = cafeto_get_block_data($attributes, $options);

    if (is_wp_error($data)) {
        return new WP_REST_Response(
            array(
                'valid'   => false,
                'code'    => $data->get_error_code(),
                'message' => $data->get_error_message(),
            ),
            200
        );
    }

    return new WP_REST_Response(array('valid' => true), 200);
}

/**
 * Registers the block in WordPress
 */
function register_cafeto_salaries_careers_block() {
    register_block_type_from_metadata(__DIR__, array(
        'render_callback' => 'render_cafeto_salaries_careers_block',
    ));
}
add_action('init', 'register_cafeto_salaries_careers_block');
