<?php

/**
 * Plugin Name:       Ventrix Gutenberg Blocks
 * Description:       Custom Gutenberg blocks created by the Ventrix Dev Team.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           3.0.1
 * Author:            Ventrix Dev Team
 * Author URI:        https://ventrixadvertising.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cafeto-gutenberg-blocks
 * Domain Path:       cafeto
 * GitHub Plugin URI: https://github.com/ventrixdevops/ventrix-gutenberg-blocks
 * GitHub Branch:     master
 *
 * @package Cafeto
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

// Include required files
$salary_api_file = plugin_dir_path(__FILE__) . 'build/blocks/salary_table/inc/class-salary-api.php';
if (file_exists($salary_api_file)) {
    require_once $salary_api_file;
}

// Define plugin constants
define('VENTRIX_PLUGIN_VERSION', '3.0.1');
define('VENTRIX_PLUGIN_SLUG', 'cafeto-gutenberg-blocks');
define('VENTRIX_GITHUB_REPO', 'ventrixdevops/ventrix-gutenberg-blocks');
define('VENTRIX_GITHUB_BRANCH', 'master');

// Define GitHub webhook secret if not already defined
if (!defined('VENTRIX_GITHUB_WEBHOOK_SECRET')) {
    define('VENTRIX_GITHUB_WEBHOOK_SECRET', 'becc05fc7361773fafc271c2b7007e9278e7672aab0e7b5907232030bd9f88bb'); // You'll need to set this in wp-config.php
}

// Define GitHub token if not already defined
if (!defined('VENTRIX_GITHUB_TOKEN')) {
    define('VENTRIX_GITHUB_TOKEN', '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');
}


// Include WordPress REST API functions
require_once(ABSPATH . 'wp-includes/rest-api.php');

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

/**
 * Initializes the Ventrix Gutenberg Blocks plugin.
 */
function ventrix_gutenberg_blocks_init() {
    // Initialize Salary API using singleton pattern
    Salary_API::get_instance();

    $blocks_directory = __DIR__ . '/build/blocks';
    $blocks = scandir($blocks_directory);

    foreach ($blocks as $block) {
        if ($block !== '.' && $block !== '..') {
            $block_path = $blocks_directory . '/' . $block;
            if (is_dir($block_path)) {
                // Check if the block has a PHP render file
                $render_callback = null;
                $render_file = __DIR__ . "/build/blocks/{$block}/render.php";

                if (file_exists($render_file)) {
                    require_once $render_file;
                    $render_callback = "render_cafeto_{$block}_block";
                }

                // Load block.json file
                $block_json_file = $block_path . '/block.json';
                $block_data = [];
                if (file_exists($block_json_file)) {
                    $block_json = file_get_contents($block_json_file);
                    $block_data = json_decode($block_json, true);
                }

                // Register the block with attributes and render callback if available
                register_block_type($block_path, array(
                    'render_callback' => $render_callback,
                    'attributes' => isset($block_data['attributes']) ? $block_data['attributes'] : [],
                ));
            }
        }
    }
}
add_action('init', 'ventrix_gutenberg_blocks_init');

/**
 * Registers the Ventrix block category.
 *
 * @param array $categories The existing block categories.
 * @return array The modified block categories.
 */
function ventrix_register_block_categories($categories) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'cafeto-category',
				'title' => __('Cafeto Blocks', 'cafeto'),
				'icon'  => 'coffee', 
			),
		)
	);
}

add_filter('block_categories_all', 'ventrix_register_block_categories', 10, 2);

/**
 * Retrieves the value of the "select_current_site" field from ACF options.
 *
 * This function checks if Advanced Custom Fields (ACF) is active and if the `get_field` function is available.
 * It then fetches the value of the `select_current_site` field from the global ACF options and sanitizes it.
 *
 * - If the field exists and has a non-empty value, it returns the sanitized string.
 * - If the field is empty or ACF is not available, it returns the default value `'edumed'`.
 *
 * @return string The sanitized value of `select_current_site` or `'edumed'` if not defined.
 */
function get_select_current_site(): string {
    // Check if ACF is active and get_field() exists
    if (!class_exists('ACF') || !function_exists('get_field')) {
        return 'edumed';
    }

    // Get the field value
    $select_current_site = get_field('select_current_site', 'option');

    // Validate, sanitize, and return the value
    if (isset($select_current_site) && is_string($select_current_site)) {
        $trimmed_value = trim($select_current_site);
        return !empty($trimmed_value) ? sanitize_text_field($trimmed_value) : 'edumed';
    }

    return 'edumed';
}

/**
 * GitHub webhook endpoint for update notifications
 */
function ventrix_github_webhook_endpoint() {
    register_rest_route('ventrix/v1', '/github-webhook', array(
        'methods' => 'POST',
        'callback' => 'ventrix_handle_github_webhook',
        'permission_callback' => function() {
            // Verify GitHub webhook signature
            if (!defined('VENTRIX_GITHUB_WEBHOOK_SECRET') || empty(VENTRIX_GITHUB_WEBHOOK_SECRET)) {
                return false;
            }

            $signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? '';
            if (empty($signature)) {
                return false;
            }

            $payload = file_get_contents('php://input');
            $expected_signature = 'sha256=' . hash_hmac('sha256', $payload, VENTRIX_GITHUB_WEBHOOK_SECRET);
            
            return hash_equals($expected_signature, $signature);
        },
        'show_in_index' => true,
    ));
}
add_action('rest_api_init', 'ventrix_github_webhook_endpoint');

/**
 * Handle GitHub webhook payload
 */
function ventrix_handle_github_webhook($request) {
    error_log('=== VENTRIX WEBHOOK RECEIVED ===');
    error_log('Request body: ' . $request->get_body());
    
    $payload = json_decode($request->get_body(), true);
    
    // Check if this is a push to master branch
    if (isset($payload['ref']) && $payload['ref'] === 'refs/heads/' . VENTRIX_GITHUB_BRANCH) {
        error_log('Master branch push detected');
        // Force update check
        delete_site_transient('update_plugins');
        error_log('Update transient deleted');
        
        return new WP_REST_Response(array(
            'message' => 'Update check triggered successfully',
            'status' => 'success'
        ), 200);
    }
    
    error_log('Not a master branch push. Ref: ' . ($payload['ref'] ?? 'not set'));
    return new WP_REST_Response(array(
        'message' => 'No action required',
        'status' => 'skipped'
    ), 200);
}

/**
 * Handle plugin activation after update
 */
function ventrix_plugin_activation() {
    // Check if the plugin is not active
    if (!is_plugin_active('cafeto-gutenberg-blocks/cafeto-gutenberg-blocks.php')) {
        // Deactivate and reactivate to ensure clean state
        deactivate_plugins('cafeto-gutenberg-blocks/cafeto-gutenberg-blocks.php');
        activate_plugin('cafeto-gutenberg-blocks/cafeto-gutenberg-blocks.php');
    }
}

/**
 * Handle plugin update process
 */
function ventrix_plugin_update_complete($upgrader_object, $options) {
    if ($options['action'] == 'update' && $options['type'] == 'plugin') {
        foreach ($options['plugins'] as $plugin) {
            if ($plugin == 'cafeto-gutenberg-blocks/cafeto-gutenberg-blocks.php') {
                // Clear any caches
                if (function_exists('wp_cache_flush')) {
                    wp_cache_flush();
                }
                
                // Clear update cache
                delete_site_transient('update_plugins');
                
                // Schedule activation for next request
                add_action('shutdown', 'ventrix_plugin_activation');
            }
        }
    }
}
add_action('upgrader_process_complete', 'ventrix_plugin_update_complete', 10, 2);

/**
 * Add custom update check for the plugin
 */
function ventrix_check_for_updates($transient) {
    if (empty($transient->checked)) {
        return $transient;
    }

    $plugin_slug = VENTRIX_PLUGIN_SLUG;
    $plugin_file = basename(__FILE__);
    $plugin_path = $plugin_slug . '/' . $plugin_file;

    // Get the remote version
    $remote = wp_remote_get('https://api.github.com/repos/' . VENTRIX_GITHUB_REPO . '/releases/latest');
    
    if (is_wp_error($remote)) {
        return $transient;
    }

    $response_code = wp_remote_retrieve_response_code($remote);

    if ($response_code === 200) {
        $remote_data = json_decode(wp_remote_retrieve_body($remote));
        $remote_version = ltrim($remote_data->tag_name, 'v'); // Remove 'v' prefix
        
        if (version_compare($transient->checked[$plugin_path], $remote_version, '<')) {
            $obj = new stdClass();
            $obj->slug = $plugin_slug;
            $obj->new_version = $remote_version;
            $obj->url = $remote_data->html_url;
            $obj->package = $remote_data->zipball_url;
            $obj->sections = array(
                'description' => $remote_data->body,
                'changelog' => $remote_data->body
            );
            $obj->requires = '6.1';
            $obj->requires_php = '7.0';
            $obj->tested = '6.4';
            $transient->response[$plugin_path] = $obj;
        }
    }

    return $transient;
}
add_filter('pre_set_site_transient_update_plugins', 'ventrix_check_for_updates');

/**
 * Add custom update information
 */
function ventrix_plugin_update_info($false, $action, $args) {
    if ($action !== 'plugin_information') {
        return $false;
    }

    if (!isset($args->slug) || $args->slug !== VENTRIX_PLUGIN_SLUG) {
        return $false;
    }

    // Get the remote version
    $remote = wp_remote_get('https://api.github.com/repos/' . VENTRIX_GITHUB_REPO . '/releases/latest');
    
    if (!is_wp_error($remote) && wp_remote_retrieve_response_code($remote) === 200) {
        $remote_data = json_decode(wp_remote_retrieve_body($remote));
        
        $obj = new stdClass();
        $obj->slug = VENTRIX_PLUGIN_SLUG;
        $obj->name = 'Ventrix Gutenberg Blocks';
        $obj->version = $remote_data->tag_name;
        $obj->last_updated = $remote_data->published_at;
        $obj->download_link = $remote_data->zipball_url;
        $obj->sections = array(
            'description' => $remote_data->body,
            'changelog' => $remote_data->body
        );
        
        return $obj;
    }

    return $false;
}
add_filter('plugins_api', 'ventrix_plugin_update_info', 10, 3);

/**
 * Add GitHub authentication for private repositories
 */
function ventrix_github_auth($args, $url) {
    if (strpos($url, 'api.github.com') !== false) {
        $args['headers']['Authorization'] = 'token ' . (defined('VENTRIX_GITHUB_TOKEN') ? VENTRIX_GITHUB_TOKEN : '');
    }
    return $args;
}
add_filter('http_request_args', 'ventrix_github_auth', 10, 2);