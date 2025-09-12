<?php
/**
 * Site Configuration for Testimonial Card Block
 * Provides the current site selection to the frontend
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Include the site helper functions
require_once plugin_dir_path(__FILE__) . 'site-helper.php';

/**
 * Enqueue site configuration script
 */
function ventrix_testimonial_card_site_config() {
    // Get site configuration safely
    $config = ventrix_get_site_config();
    
    // Create inline script with site configuration
    $script = "
        window.ventrixSiteConfig = {
            currentSite: '" . esc_js($config['currentSite']) . "',
            availableSites: " . wp_json_encode($config['availableSites']) . ",
            isConfigured: " . ($config['isConfigured'] ? 'true' : 'false') . "
        };
    ";
    
    wp_add_inline_script('wp-blocks', $script);
}
add_action('wp_enqueue_scripts', 'ventrix_testimonial_card_site_config');
add_action('enqueue_block_editor_assets', 'ventrix_testimonial_card_site_config');

/**
 * Add body class based on current site
 */
function ventrix_add_site_body_class($classes) {
    $current_site = ventrix_get_current_site();
    $classes[] = 'ventrix-site-' . $current_site;
    return $classes;
}
add_filter('body_class', 'ventrix_add_site_body_class');
