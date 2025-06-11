<?php
/**
 * Salary API Handler
 *
 * @package Ventrix_Gutenberg_Blocks
 * @subpackage Ventrix_Gutenberg_Blocks/inc
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Class Salary_API
 *
 * Handles all salary-related API endpoints and data management.
 */
class Salary_API {
    /**
     * Instance of this class.
     *
     * @var Salary_API
     */
    private static $instance = null;

    /**
     * Get the singleton instance of this class.
     *
     * @return Salary_API
     */
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Initialize the class and set up hooks.
     */
    private function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }

    /**
     * Prevent cloning of the instance.
     */
    private function __clone() {}

    /**
     * Prevent unserializing of the instance.
     */
    private function __wakeup() {}

    /**
     * Register REST API routes.
     */
    public function register_routes() {
        // Main salary data endpoint
        register_rest_route('cafeto/v1', '/salary-data', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_salary_data'),
            'permission_callback' => '__return_true',
            'args' => array(
                'state' => array(
                    'required' => true,
                    'type' => 'string',
                    'sanitize_callback' => 'sanitize_text_field',
                    'validate_callback' => function($param) {
                        return preg_match('/^[A-Z]{2}$/', $param);
                    }
                )
            )
        ));

        // Refresh salary data endpoint
        register_rest_route('cafeto/v1', '/salary-data/refresh', array(
            'methods' => 'POST',
            'callback' => array($this, 'refresh_salary_data'),
            'permission_callback' => function() {
                return current_user_can('manage_options');
            }
        ));
    }

    /**
     * Get salary data for a specific state.
     *
     * @param WP_REST_Request $request The request object.
     * @return WP_REST_Response|WP_Error The response object.
     */
    public function get_salary_data($request) {
        global $wpdb;
        $state = $request->get_param('state');
        
        // Try to get data from transient
        $transient_key = 'salary_data_' . $state;
        $cached_data = get_transient($transient_key);
        
        if (false !== $cached_data) {
            return new WP_REST_Response($cached_data, 200);
        }
        
        $table_name = $wpdb->prefix . 'salary_mbc_page';
        
        if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
            return new WP_Error(
                'table_not_found',
                'The salary data table does not exist',
                array('status' => 500)
            );
        }
        
        $results = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE state = %s",
                $state
            )
        );
        
        if (empty($results)) {
            return new WP_Error(
                'no_data',
                'No salary data found for this state',
                array('status' => 404)
            );
        }
        
        // Cache the results for a week
        set_transient($transient_key, $results, WEEK_IN_SECONDS);
        
        return new WP_REST_Response($results, 200);
    }

    /**
     * Refresh salary data for a specific state.
     *
     * @param WP_REST_Request $request The request object.
     * @return WP_REST_Response|WP_Error The response object.
     */
    public function refresh_salary_data($request) {
        $state = $request->get_param('state');
        
        if (empty($state)) {
            return new WP_Error(
                'missing_state',
                'State parameter is required',
                array('status' => 400)
            );
        }

        // Delete existing transient
        $transient_key = 'salary_data_' . $state;
        delete_transient($transient_key);

        // Force a new query
        $request = new WP_REST_Request('GET', '/cafeto/v1/salary-data');
        $request->set_param('state', $state);
        
        return $this->get_salary_data($request);
    }
} 