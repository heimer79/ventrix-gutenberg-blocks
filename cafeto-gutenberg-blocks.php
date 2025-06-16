<?php

/**
 * Plugin Name:       Ventrix Gutenberg Blocks
 * Description:       Custom Gutenberg blocks created by the Ventrix Dev Team.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           3.0.0
 * Author:            Ventrix Dev Team
 * Author URI:        https://ventrixadvertising.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cafeto-gutenberg-blocks
 * Domain Path:       cafeto
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

// Define GitHub webhook secret if not already defined
if (!defined('VENTRIX_GITHUB_WEBHOOK_SECRET')) {
    define('VENTRIX_GITHUB_WEBHOOK_SECRET', ''); // You'll need to set this in wp-config.php
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
        'permission_callback' => 'ventrix_verify_github_webhook'
    ));
}
add_action('rest_api_init', 'ventrix_github_webhook_endpoint');

/**
 * Verify GitHub webhook signature
 */
function ventrix_verify_github_webhook($request) {
    $signature = $request->get_header('X-Hub-Signature-256');
    if (!$signature) {
        return false;
    }

    $payload = $request->get_body();
    $secret = defined('VENTRIX_GITHUB_WEBHOOK_SECRET') ? VENTRIX_GITHUB_WEBHOOK_SECRET : '';
    
    if (empty($secret)) {
        return false;
    }

    $expected_signature = 'sha256=' . hash_hmac('sha256', $payload, $secret);
    return hash_equals($expected_signature, $signature);
}

/**
 * Handle GitHub webhook payload
 */
function ventrix_handle_github_webhook($request) {
    $payload = json_decode($request->get_body(), true);
    
    // Check if this is a push to master branch
    if (isset($payload['ref']) && $payload['ref'] === 'refs/heads/master') {
        // Update the plugin version in the database
        update_option('ventrix_plugin_version', $payload['head_commit']['id']);
        
        // Trigger WordPress update check
        delete_site_transient('update_plugins');
        
        return new WP_REST_Response(array(
            'message' => 'Update notification processed successfully'
        ), 200);
    }
    
    return new WP_REST_Response(array(
        'message' => 'No action required'
    ), 200);
}

/**
 * Add custom update check for the plugin
 */
function ventrix_check_for_updates($transient) {
    if (empty($transient->checked)) {
        return $transient;
    }

    $current_version = $transient->checked['cafeto-gutenberg-blocks/cafeto-gutenberg-blocks.php'];
    $latest_version = get_option('ventrix_plugin_version');

    if ($latest_version && version_compare($current_version, $latest_version, '<')) {
        $transient->response['cafeto-gutenberg-blocks/cafeto-gutenberg-blocks.php'] = (object) array(
            'slug' => 'cafeto-gutenberg-blocks',
            'new_version' => $latest_version,
            'url' => 'https://github.com/your-username/cafeto-gutenberg-blocks',
            'package' => 'https://github.com/your-username/cafeto-gutenberg-blocks/archive/master.zip'
        );
    }

    return $transient;
}
add_filter('pre_set_site_transient_update_plugins', 'ventrix_check_for_updates');