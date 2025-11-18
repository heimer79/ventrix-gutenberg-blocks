<?php

/**
 * Plugin Name:       Ventrix Gutenberg Blocks
 * Description:       Custom Gutenberg blocks created by the Ventrix Dev Team.
 * Requires Plugins: ventrix-tools
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           3.7.0
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

/**
 * Get the current site configuration safely
 * 
 * @return string The current site identifier or 'edumed' as fallback
 */
function ventrix_get_current_site() {
    // Default fallback
    $default_site = 'edumed';
    
    // Check if ACF is active
    if (!function_exists('get_field')) {
        return $default_site;
    }
    
    // Check if the field group exists
    if (!function_exists('acf_get_field_group')) {
        return $default_site;
    }
    
    // Try to get the field value using safe function
    try {
        // Use the safe ACF function if available
        if (function_exists('ventrix_get_safe_acf_field')) {
            $current_site = ventrix_get_safe_acf_field('select_current_site', 'option', $default_site);
        } else {
            // Fallback to direct get_field with validation
            $current_site = get_field('select_current_site', 'option');

            if (empty($current_site) || !is_string($current_site)) {
                return $default_site;
            }
        }
        
        // Validate against allowed values
        $allowed_sites = array('edumed', 'psd', 'omd', 'phds', 'oc');
        if (!in_array($current_site, $allowed_sites, true)) {
            return $default_site;
        }
        
        return $current_site;
        
    } catch (Exception $e) {
        // Log error if possible
        if (function_exists('error_log')) {
            error_log('Ventrix Testimonial Card: Error getting current site - ' . $e->getMessage());
        }
        return $default_site;
    }
}

/**
 * Define a constant for the current site based on ventrix_get_current_site().
 * This ensures it's available everywhere in WordPress.
 */
if ( ! defined( 'VENTRIX_CURRENT_SITE' ) ) {
    // Check that the helper function exists before calling it
    if ( function_exists( 'ventrix_get_current_site' ) ) {
        define( 'VENTRIX_CURRENT_SITE', ventrix_get_current_site() );
    } else {
        define( 'VENTRIX_CURRENT_SITE', 'edumed' ); // fallback to empty if not defined yet
    }
}

// Include action functions.
require_once plugin_dir_path(__FILE__) . 'build/includes/action-functions.php';

// Include security checks first
$security_file = plugin_dir_path(__FILE__) . 'build/includes/security-checks.php';
if (file_exists($security_file)) {
    require_once $security_file;
}

// Perform comprehensive security check
if (function_exists('ventrix_comprehensive_security_check')) {
    $security_status = ventrix_comprehensive_security_check();

    if (!$security_status['overall_status']) {
        // Log security issues
        if (function_exists('error_log')) {
            error_log('Ventrix Gutenberg Blocks: Security check failed - ' . implode(', ', $security_status['errors']));
        }

        // Add admin notice for security issues
        add_action('admin_notices', function () use ($security_status) {
            echo '<div class="notice notice-error is-dismissible">';
            echo '<p><strong>Ventrix Gutenberg Blocks:</strong> Security check failed. ';
            echo 'Issues found: ' . implode(', ', $security_status['errors']) . '</p>';
            echo '</div>';
        });
    }
}

// Include required files
$salary_api_file = plugin_dir_path(__FILE__) . 'build/blocks/salary_table/inc/class-salary-api.php';
if (file_exists($salary_api_file)) {
    require_once $salary_api_file;
}

// Register REST endpoint for testimonial-card users
require_once plugin_dir_path(__FILE__) . 'build/blocks/testimonial-card/inc/class-users-api.php';

// Include ACF fields for site configuration
require_once plugin_dir_path(__FILE__) . 'build/includes/acf_fields/site-info.php';

// Include site configuration for testimonial card
require_once plugin_dir_path(__FILE__) . 'build/blocks/testimonial-card/inc/site-config.php';

// Include WordPress REST API functions
require_once(ABSPATH . 'wp-includes/rest-api.php');

require_once plugin_dir_path(__FILE__) . 'build/blocks/omd_rankings/shortcode.php';

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
function ventrix_gutenberg_blocks_init()
{
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
                // Load block.json file first
                $block_json_file = $block_path . '/block.json';
                $block_data = [];
                if (file_exists($block_json_file)) {
                    $block_json = file_get_contents($block_json_file);
                    $block_data = json_decode($block_json, true);
                }

                // Check if block.json specifies a render callback
                $render_callback = null;
                if (isset($block_data['render']) && $block_data['render'] === 'file:./render.php') {
                    $render_file = __DIR__ . "/build/blocks/{$block}/render.php";
                    if (file_exists($render_file)) {
                        require_once $render_file;
                        // Convierte los guiones a guiones bajos para el nombre de la función
                        $function_name = 'render_cafeto_' . str_replace('-', '_', $block) . '_block';
                        $render_callback = $function_name;
                    }
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
function ventrix_register_block_categories($categories)
{
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
 * Add admin menu for Ventrix Gutenberg Blocks settings
 */
function ventrix_add_admin_menu() {
    add_options_page(
        'Ventrix Blocks Settings',
        'Ventrix Blocks',
        'manage_options',
        'theme-general-settings',
        'ventrix_admin_page_callback'
    );
}
add_action('admin_menu', 'ventrix_add_admin_menu');

/**
 * Admin page callback for Ventrix Blocks settings
 */
function ventrix_admin_page_callback() {
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
        <p><?php _e('Configure settings for Ventrix Gutenberg Blocks plugin.', 'cafeto-gutenberg-blocks'); ?></p>
        
        <?php if (function_exists('acf_form')): ?>
            <div class="ventrix-acf-settings">
                <?php
                $options = array(
                    'post_id' => 'options',
                    'field_groups' => array('group_67d9cc842b8c8'),
                    'return' => admin_url('options-general.php?page=theme-general-settings'),
                    'submit_value' => __('Save Settings', 'cafeto-gutenberg-blocks'),
                );
                acf_form($options);
                ?>
            </div>
        <?php else: ?>
            <div class="notice notice-error">
                <p><?php _e('Advanced Custom Fields plugin is required for this functionality.', 'cafeto-gutenberg-blocks'); ?></p>
            </div>
        <?php endif; ?>
    </div>
    <?php
}

/**
 * Add admin styles for the settings page
 */
function ventrix_admin_styles() {
    ?>
    <style>
        .ventrix-acf-settings {
            background: #fff;
            padding: 20px;
            border: 1px solid #ccd0d4;
            border-radius: 4px;
            margin-top: 20px;
        }
        .ventrix-acf-settings .acf-fields {
            border: none;
        }
        .ventrix-acf-settings .acf-field {
            border-bottom: 1px solid #f0f0f1;
        }
    </style>
    <?php
}
add_action('admin_head', 'ventrix_admin_styles');

/**
 * Force ACF field group update on plugin activation
 */
function ventrix_force_acf_field_update() {
    // Force the ACF field group to be updated
    if (function_exists('ventrix_register_site_info_acf_fields')) {
        ventrix_register_site_info_acf_fields();
    }
}
register_activation_hook(__FILE__, 'ventrix_force_acf_field_update');

/**
 * Add admin notice for ACF dependency
 */
function ventrix_acf_dependency_notice() {
    if (!function_exists('acf_add_local_field_group')) {
        ?>
        <div class="notice notice-warning is-dismissible">
            <p>
                <strong><?php _e('Ventrix Gutenberg Blocks:', 'cafeto-gutenberg-blocks'); ?></strong>
                <?php _e('Advanced Custom Fields plugin is required for full functionality. Please install and activate ACF.', 'cafeto-gutenberg-blocks'); ?>
            </p>
        </div>
        <?php
    }
}
add_action('admin_notices', 'ventrix_acf_dependency_notice');

/**
 * Register REST API endpoint for getting current site
 */
function ventrix_register_rest_routes() {
    register_rest_route('ventrix/v1', '/current-site', array(
        'methods' => 'GET',
        'callback' => 'ventrix_get_current_site_rest',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'ventrix_register_rest_routes');

/**
 * REST API callback to get current site
 */
function ventrix_get_current_site_rest($request) {
    $current_site = ventrix_get_current_site();
    
    return array(
        'currentSite' => $current_site,
        'success' => true
    );
}

/**
 * Load all ACF local field group definitions dynamically
 * based on the current site directory.
 *
 * @since 1.0.0
 */
function vtx_load_acf_field_groups_for_site() {

    // Bail early if ACF is not active.
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    // Determine current site or fallback to 'edumed'.
    $current_site = defined( 'VENTRIX_CURRENT_SITE' ) ? VENTRIX_CURRENT_SITE : 'edumed';

    // Build the directory path safely.
    $dir = trailingslashit( plugin_dir_path( __FILE__ ) . 'build/includes/acf_fields/' . $current_site . '/' );

    // Exit if directory doesn't exist or isn't readable.
    if ( ! is_dir( $dir ) || ! is_readable( $dir ) ) {
        return;
    }

    // Get all PHP files in the directory.
    $files = glob( $dir . '*.php' );

    if ( empty( $files ) ) {
        return;
    }

    // Require each ACF field definition file.
    foreach ( $files as $file ) {
        if ( is_readable( $file ) ) {
            require_once $file;
        }
    }
}
add_action( 'init', 'vtx_load_acf_field_groups_for_site' );
