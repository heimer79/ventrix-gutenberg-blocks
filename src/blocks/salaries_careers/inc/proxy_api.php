<?php


function register_salaries_careers_api_routes() {
    register_rest_route('salaries-careers/v1', '/tables', array(
        'methods' => 'GET',
        'callback' => 'get_wordpress_tables',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        }
    ));

    register_rest_route('salaries-careers/v1', '/columns', array(
        'methods' => 'GET',
        'callback' => 'get_table_columns',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        }
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
    // Get the API URL from the request parameters.
    $api_url = isset($_GET['api_url']) ? esc_url_raw($_GET['api_url']) : '';

    // If no URL is provided, return an error response.
    if (empty($api_url)) {
        wp_send_json_error('API URL is missing.');
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
// Hook the proxy request function to handle both logged-in and non-logged-in users.
add_action('wp_ajax_nopriv_proxy_request_to_api', 'proxy_request_to_api');
add_action('wp_ajax_proxy_request_to_api', 'proxy_request_to_api');

/**
 * Allows CORS requests from local development environments.
 *
 * This function sets the appropriate headers to enable CORS for requests coming
 * from local domains. It also handles preflight requests by responding with the
 * correct headers for methods and credentials.
 */
function allow_cors_from_local() {
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
 * Obtiene la lista de tablas de WordPress
 */
function get_wordpress_tables() {
    global $wpdb;
    $tables = $wpdb->get_results("SHOW TABLES", ARRAY_N);
    $wordpress_tables = array();
    foreach ($tables as $table) {
        $table_name = $table[0];
        if (strpos($table_name, $wpdb->prefix) === 0) {
            $wordpress_tables[] = substr($table_name, strlen($wpdb->prefix));
        }
    }
    return new WP_REST_Response($wordpress_tables, 200);
}

/**
 * Obtiene las columnas de una tabla específica
 */
function get_table_columns($request) {
    global $wpdb;
    $table = $request->get_param('table');
    $table_name = $wpdb->prefix . $table;

    // Verificar que la tabla existe
    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
        return new WP_Error('invalid_table', 'The selected table does not exist.', array('status' => 404));
    }

    // Obtener las columnas de la tabla
    $columns = $wpdb->get_col("DESCRIBE $table_name", 0);

    return new WP_REST_Response($columns, 200);
}

/**
 * Registra el bloque en WordPress
 */
function register_cafeto_salaries_careers_block() {
    register_block_type_from_metadata(__DIR__, array(
        'render_callback' => 'render_cafeto_salaries_careers_block',
    ));
}
add_action('init', 'register_cafeto_salaries_careers_block');
