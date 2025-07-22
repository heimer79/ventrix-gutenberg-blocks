<?php

/**
 * Plugin Name:       Ventrix Gutenberg Blocks
 * Description:       Custom Gutenberg blocks created by the Ventrix Dev Team.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           3.3.1
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

// Register REST endpoint for testimonial-card users
require_once plugin_dir_path(__FILE__) . 'build/blocks/testimonial-card/inc/class-users-api.php';

// Define plugin constants
define('VENTRIX_PLUGIN_VERSION', '3.3.1');
define('VENTRIX_PLUGIN_SLUG', 'cafeto-gutenberg-blocks');
define('VENTRIX_PLUGIN_FOLDER', basename(dirname(__FILE__))); // Get actual folder name
define('VENTRIX_PLUGIN_FILE', VENTRIX_PLUGIN_FOLDER . '/' . basename(__FILE__)); // Dynamic plugin file path
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

    // Initialize the API
    VG_Users_API::get_instance(); 

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
    
    // Check if this is a push to master branch, a new tag, or contains version changes
    if (isset($payload['ref'])) {
        $ref = $payload['ref'];
        $is_master_push = $ref === 'refs/heads/' . VENTRIX_GITHUB_BRANCH;
        $is_tag = strpos($ref, 'refs/tags/') === 0;
        
        // Also check if the push contains version-related files
        $has_version_changes = false;
        if (isset($payload['commits']) && is_array($payload['commits'])) {
            foreach ($payload['commits'] as $commit) {
                if (isset($commit['modified']) && is_array($commit['modified'])) {
                    foreach ($commit['modified'] as $file) {
                        // Check if version-related files were modified
                        if (in_array($file, ['cafeto-gutenberg-blocks.php', 'package.json', 'version.json'])) {
                            $has_version_changes = true;
                            break 2;
                        }
                    }
                }
                if (isset($commit['added']) && is_array($commit['added'])) {
                    foreach ($commit['added'] as $file) {
                        if (in_array($file, ['cafeto-gutenberg-blocks.php', 'package.json', 'version.json'])) {
                            $has_version_changes = true;
                            break 2;
                        }
                    }
                }
            }
        }
        
        if ($is_master_push || $is_tag || $has_version_changes) {
            $trigger_reason = $is_tag ? 'Tag creation' : ($has_version_changes ? 'Version file changes' : 'Master branch push');
            error_log($trigger_reason . ' detected');
            
            // Force update check with more aggressive clearing
            delete_site_transient('update_plugins');
            delete_transient('ventrix_plugin_remote_version');
            wp_clean_plugins_cache();
            
            // Set a flag to force check on next admin page load
            set_transient('ventrix_force_update_check', true, 300); // 5 minutes
            
            error_log('Update transient deleted and force check scheduled');
            
            return new WP_REST_Response(array(
                'message' => 'Update check triggered successfully',
                'status' => 'success',
                'reason' => $trigger_reason
            ), 200);
        }
    }
    
    error_log('No relevant changes detected. Ref: ' . ($payload['ref'] ?? 'not set'));
    return new WP_REST_Response(array(
        'message' => 'No action required',
        'status' => 'skipped'
    ), 200);
}

/**
 * Preserve plugin folder name during updates
 */
function ventrix_preserve_folder_name($source, $remote_source, $upgrader, $hook_extra = null) {
    global $wp_filesystem;
    
    if (!isset($hook_extra['plugin']) || $hook_extra['plugin'] !== VENTRIX_PLUGIN_FILE) {
        return $source;
    }
    
    $plugin_folder = WP_PLUGIN_DIR . '/' . VENTRIX_PLUGIN_FOLDER;
    
    // If our target folder exists, remove it first
    if ($wp_filesystem->exists($plugin_folder)) {
        $wp_filesystem->delete($plugin_folder, true);
    }
    
    // Move the source to our desired folder name
    if ($wp_filesystem->move($source, $plugin_folder)) {
        return $plugin_folder;
    }
    
    return $source;
}
add_filter('upgrader_source_selection', 'ventrix_preserve_folder_name', 10, 4);

/**
 * Handle plugin activation after update
 */
function ventrix_plugin_activation() {
    // Check if the plugin is not active using dynamic path
    if (!is_plugin_active(VENTRIX_PLUGIN_FILE)) {
        // Deactivate and reactivate to ensure clean state
        deactivate_plugins(VENTRIX_PLUGIN_FILE);
        activate_plugin(VENTRIX_PLUGIN_FILE);
    }
}

/**
 * Handle plugin update process
 */
function ventrix_plugin_update_complete($upgrader_object, $options) {
    if ($options['action'] == 'update' && $options['type'] == 'plugin') {
        foreach ($options['plugins'] as $plugin) {
            if ($plugin == VENTRIX_PLUGIN_FILE) {
                // Clear any caches
                if (function_exists('wp_cache_flush')) {
                    wp_cache_flush();
                }
                
                // Clear update cache
                delete_site_transient('update_plugins');
                
                // Schedule activation for next request
                add_action('shutdown', 'ventrix_plugin_activation');
                
                // Suppress the DISALLOW_FILE_EDIT warning
                if (!defined('DISALLOW_FILE_EDIT')) {
                    define('DISALLOW_FILE_EDIT', true);
                }
            }
        }
    }
}
add_action('upgrader_process_complete', 'ventrix_plugin_update_complete', 10, 2);

/**
 * Suppress specific PHP warnings during update
 */
function ventrix_suppress_warnings() {
    if (defined('DISALLOW_FILE_EDIT')) {
        error_reporting(E_ALL & ~E_WARNING);
    }
}
add_action('admin_init', 'ventrix_suppress_warnings');

/**
 * Add custom update check for the plugin
 */
function ventrix_check_for_updates($transient) {
    if (empty($transient->checked)) {
        return $transient;
    }

    $plugin_slug = VENTRIX_PLUGIN_SLUG;
    $plugin_file = basename(__FILE__);
    $plugin_path = VENTRIX_PLUGIN_FILE; // Use dynamic path

    // Check if we should force an update check
    $force_check = get_transient('ventrix_force_update_check');
    
    // Get cached remote version if not forcing check
    $remote_version_cache_key = 'ventrix_plugin_remote_version';
    $remote_data = false;
    
    if (!$force_check) {
        $remote_data = get_transient($remote_version_cache_key);
    }
    
    if ($remote_data === false) {
        // Get the remote version
        $remote_args = array(
            'timeout' => 30,
            'headers' => array(
                'Authorization' => 'token ' . (defined('VENTRIX_GITHUB_TOKEN') ? VENTRIX_GITHUB_TOKEN : ''),
                'User-Agent' => 'WordPress-Plugin-Updater'
            )
        );
        
        $remote = wp_remote_get('https://api.github.com/repos/' . VENTRIX_GITHUB_REPO . '/releases/latest', $remote_args);
        
        if (is_wp_error($remote)) {
            error_log('GitHub API error: ' . $remote->get_error_message());
            return $transient;
        }

        $response_code = wp_remote_retrieve_response_code($remote);

        if ($response_code === 200) {
            $remote_data = json_decode(wp_remote_retrieve_body($remote));
            
            // Cache the remote data for 5 minutes unless forcing check
            if (!$force_check) {
                set_transient($remote_version_cache_key, $remote_data, 300);
            }
            
            // Clear the force check flag
            if ($force_check) {
                delete_transient('ventrix_force_update_check');
            }
        } else {
            error_log('GitHub API returned status code: ' . $response_code);
            return $transient;
        }
    }
    
    if ($remote_data && isset($remote_data->tag_name)) {
        $remote_version = ltrim($remote_data->tag_name, 'v'); // Remove 'v' prefix
        $current_version = $transient->checked[$plugin_path];
        
        error_log("Comparing versions - Current: {$current_version}, Remote: {$remote_version}");
        
        if (version_compare($current_version, $remote_version, '<')) {
            error_log("Update available: {$current_version} -> {$remote_version}");
            
            $obj = new stdClass();
            $obj->slug = VENTRIX_PLUGIN_FOLDER; // Use actual folder name
            $obj->plugin = $plugin_path;
            $obj->new_version = $remote_version;
            $obj->url = $remote_data->html_url;
            $obj->package = $remote_data->zipball_url;
            $obj->sections = array(
                'description' => isset($remote_data->body) ? $remote_data->body : 'New version available',
                'changelog' => isset($remote_data->body) ? $remote_data->body : 'Check GitHub for changes'
            );
            $obj->requires = '6.1';
            $obj->requires_php = '7.0';
            $obj->tested = '6.4';
            $obj->compatibility = new stdClass();
            $transient->response[$plugin_path] = $obj;
        } else {
            error_log("Plugin is up to date: {$current_version}");
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

    // Get the remote version with authentication
    $remote_args = array(
        'timeout' => 30,
        'headers' => array(
            'Authorization' => 'token ' . (defined('VENTRIX_GITHUB_TOKEN') ? VENTRIX_GITHUB_TOKEN : ''),
            'User-Agent' => 'WordPress-Plugin-Updater'
        )
    );
    
    $remote = wp_remote_get('https://api.github.com/repos/' . VENTRIX_GITHUB_REPO . '/releases/latest', $remote_args);
    
    if (!is_wp_error($remote) && wp_remote_retrieve_response_code($remote) === 200) {
        $remote_data = json_decode(wp_remote_retrieve_body($remote));
        
        $obj = new stdClass();
        $obj->slug = VENTRIX_PLUGIN_SLUG;
        $obj->name = 'Ventrix Gutenberg Blocks';
        $obj->version = ltrim($remote_data->tag_name, 'v');
        $obj->last_updated = $remote_data->published_at;
        $obj->download_link = $remote_data->zipball_url;
        $obj->author = 'Ventrix Dev Team';
        $obj->homepage = 'https://ventrixadvertising.com/';
        $obj->requires = '6.1';
        $obj->requires_php = '7.0';
        $obj->tested = '6.4';
        $obj->sections = array(
            'description' => isset($remote_data->body) ? $remote_data->body : 'Custom Gutenberg blocks created by the Ventrix Dev Team.',
            'changelog' => isset($remote_data->body) ? $remote_data->body : 'Check GitHub for detailed changelog.'
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

/**
 * Force update check when admin loads if flagged
 */
function ventrix_force_update_check_on_admin() {
    if (get_transient('ventrix_force_update_check')) {
        // Force clear all update caches
        delete_site_transient('update_plugins');
        delete_transient('ventrix_plugin_remote_version');
        wp_clean_plugins_cache();
        
        // Trigger update check
        wp_update_plugins();
        
        error_log('Forced update check executed from admin');
    }
}
add_action('admin_init', 'ventrix_force_update_check_on_admin');

/**
 * Add admin notice when update is available
 */
function ventrix_admin_notice_update_available() {
    if (get_transient('ventrix_force_update_check')) {
        ?>
        <div class="notice notice-info is-dismissible">
            <p><?php _e('Ventrix Gutenberg Blocks: Checking for updates from GitHub...', 'cafeto-gutenberg-blocks'); ?></p>
        </div>
        <?php
    }
}
add_action('admin_notices', 'ventrix_admin_notice_update_available');

/**
 * Prevent WordPress from renaming plugin folder
 */
function ventrix_prevent_folder_rename($result, $local_destination, $remote_destination, $clear_destination) {
    // Check if this is our plugin being updated
    if (strpos($local_destination, VENTRIX_PLUGIN_FOLDER) !== false) {
        global $wp_filesystem;
        
        // Ensure we maintain the original folder name
        $target_folder = WP_PLUGIN_DIR . '/' . VENTRIX_PLUGIN_FOLDER;
        
        if ($local_destination !== $target_folder) {
            if ($wp_filesystem->exists($target_folder)) {
                $wp_filesystem->delete($target_folder, true);
            }
            $wp_filesystem->move($local_destination, $target_folder);
            return $target_folder;
        }
    }
    
    return $result;
}
add_filter('upgrader_install_package_result', 'ventrix_prevent_folder_rename', 10, 4);