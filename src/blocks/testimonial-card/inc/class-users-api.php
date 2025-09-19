<?php
/**
 * Users API Handler
 *
 * @package Ventrix_Gutenberg_Blocks
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class VG_Users_API {
    /**
     * Instance of this class.
     *
     * @var VG_Users_API
     */
    private static $instance = null;

    /**
     * Get the singleton instance of this class.
     *
     * @return VG_Users_API
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
    public function __wakeup() {}

    /**
     * Register REST API routes.
     */
    public function register_routes() {
        register_rest_route('cafeto/v1', '/users', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_users'),
            'permission_callback' => '__return_true',
        ));
    }

    /**
     * Get users with display_name and avatar_url.
     *
     * @param WP_REST_Request $request The request object.
     * @return WP_REST_Response|WP_Error The response object.
     */
    public function get_users($request) {
        $users = get_users(array(
            'fields' => array('ID', 'display_name'),
        ));
        $result = array();
        foreach ($users as $user) {
            $credentials = get_user_meta($user->ID, 'credentials', true) ?: '';
            $result[] = array(
                'id'           => $user->ID,
                'display_name' => $user->display_name,
                ' '    => get_author_posts_url($user->ID),
                'credentials'  => $credentials,
                'avatar_url'   => get_avatar_url($user->ID, array('size' => 200)),
            );
        }
        return new WP_REST_Response($result, 200);
    }
}
