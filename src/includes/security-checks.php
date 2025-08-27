<?php
/**
 * Security checks for Ventrix Gutenberg Blocks plugin
 * 
 * This file contains all the security validations to ensure
 * that required functions and classes exist before they are used.
 * 
 * @package Ventrix_Gutenberg_Blocks
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Check if ACF plugin is active and functions exist
 * 
 * @return bool True if ACF is available, false otherwise
 */
function ventrix_check_acf_availability() {
    return function_exists('get_field');
}

/**
 * Check if WordPress core functions exist
 * 
 * @return bool True if all required functions exist, false otherwise
 */
function ventrix_check_wordpress_core_functions() {
    $required_functions = [
        'wp_cache_get',
        'wp_cache_set',
        'get_the_ID',
        'get_the_title',
        'get_the_content',
        'wp_reset_postdata',
        'get_post_field',
        'esc_attr',
        'esc_url',
        'esc_html',
        'esc_html__',
        'esc_html_e',
        'wp_kses_post',
        'wp_is_mobile',
        'htmlspecialchars_decode',
        'register_rest_route',
        'add_action',
        'current_user_can',
        'wp_remote_get',
        'wp_send_json_error',
        'wp_send_json_success',
        'wp_remote_retrieve_body',
        'is_wp_error',
        'esc_url_raw',
        'register_block_type_from_metadata',
        'plugin_dir_url',
        'plugin_dir_path',
        'file_exists',
        'json_encode',
        'error_log'
    ];
    
    foreach ($required_functions as $function) {
        if (!function_exists($function)) {
            return false;
        }
    }
    
    return true;
}

/**
 * Check if WordPress core classes exist
 * 
 * @return bool True if all required classes exist, false otherwise
 */
function ventrix_check_wordpress_core_classes() {
    $required_classes = [
        'WP_Query'
    ];
    
    foreach ($required_classes as $class) {
        if (!class_exists($class)) {
            return false;
        }
    }
    
    return true;
}

/**
 * Get error message for missing ACF
 * 
 * @return string HTML error message
 */
function ventrix_get_acf_error_message() {
    return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
        <strong>Error:</strong> Advanced Custom Fields (ACF) plugin is required for this block to function properly. 
        Please install and activate ACF plugin.
    </div>';
}

/**
 * Get error message for missing WordPress core functions
 * 
 * @return string HTML error message
 */
function ventrix_get_wordpress_core_error_message() {
    return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
        <strong>Error:</strong> Required WordPress functions are not available. 
        This may indicate a WordPress installation issue.
    </div>';
}

/**
 * Get error message for missing WordPress core classes
 * 
 * @return string HTML error message
 */
function ventrix_get_wordpress_classes_error_message() {
    return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
        <strong>Error:</strong> WordPress query functionality is not available. 
        This may indicate a WordPress installation issue.
    </div>';
}

/**
 * Comprehensive security check for the plugin
 * 
 * @return array Array with status and error messages
 */
function ventrix_comprehensive_security_check() {
    $status = [
        'acf_available' => ventrix_check_acf_availability(),
        'core_functions_available' => ventrix_check_wordpress_core_functions(),
        'core_classes_available' => ventrix_check_wordpress_core_classes(),
        'overall_status' => true,
        'errors' => []
    ];
    
    if (!$status['acf_available']) {
        $status['overall_status'] = false;
        $status['errors'][] = 'ACF plugin is not available';
    }
    
    if (!$status['core_functions_available']) {
        $status['overall_status'] = false;
        $status['errors'][] = 'WordPress core functions are not available';
    }
    
    if (!$status['core_classes_available']) {
        $status['overall_status'] = false;
        $status['errors'][] = 'WordPress core classes are not available';
    }
    
    return $status;
}

/**
 * Safe wrapper for get_field function
 * 
 * @param string $field_name The ACF field name
 * @param mixed $post_id The post ID (optional)
 * @return mixed The field value or empty string if ACF is not available
 */
function ventrix_safe_get_field($field_name, $post_id = false) {
    if (ventrix_check_acf_availability()) {
        return get_field($field_name, $post_id);
    }
    return '';
}

/**
 * Safe wrapper for WordPress core functions
 * 
 * @param string $function_name The function name to call
 * @param array $args The arguments to pass to the function
 * @return mixed The function result or null if function doesn't exist
 */
function ventrix_safe_call_function($function_name, $args = []) {
    if (function_exists($function_name)) {
        return call_user_func_array($function_name, $args);
    }
    return null;
}
