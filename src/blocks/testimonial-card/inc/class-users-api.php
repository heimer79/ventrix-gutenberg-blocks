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
                'user_link'     => get_author_posts_url($user->ID),
                'credentials'  => $credentials,
                'avatar_url'   => $this->get_user_avatar_url($user->ID),
            );
        }
        return new WP_REST_Response($result, 200);
    }

    /**
     * Get user avatar URL based on domain configuration
     *
     * @param int $user_id The user ID
     * @return string The avatar URL
     */
    private function get_user_avatar_url($user_id) {
        $domain = $this->get_current_domain();
        
        // Check if we should use ACF local_avatar field
        if ($this->should_use_local_avatar($domain)) {
            $local_avatar = get_field('local_avatar', 'user_' . $user_id);
            if ($local_avatar && is_array($local_avatar) && isset($local_avatar['url'])) {
                return $local_avatar['url'];
            }
        }
        
        // Fallback to WordPress avatar (Gravatar)
        return get_avatar_url($user_id, array('size' => 200));
    }

    /**
     * Get the current domain
     *
     * @return string The current domain
     */
    private function get_current_domain() {
        $host = $_SERVER['HTTP_HOST'] ?? '';
        
        // Remove www. prefix if present
        if (strpos($host, 'www.') === 0) {
            $host = substr($host, 4);
        }
        
        return $host;
    }

    /**
     * Check if we should use local avatar based on domain
     *
     * @param string $domain The current domain
     * @return bool True if should use local avatar
     */
    private function should_use_local_avatar($domain) {
        $local_avatar_domains = array(
            'onlinemastersdegrees.org',
            'publicservicedegrees.org'
        );
        
        // Check exact match
        if (in_array($domain, $local_avatar_domains)) {
            return true;
        }
        
        // Check subdomains (dev.domain.com, stg.domain.com, etc.)
        foreach ($local_avatar_domains as $base_domain) {
            if (strpos($domain, $base_domain) !== false) {
                return true;
            }
        }
        
        return false;
    }
}
