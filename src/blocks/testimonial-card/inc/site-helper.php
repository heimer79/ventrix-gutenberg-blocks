<?php
/**
 * Site Helper Functions for Testimonial Card Block
 * Provides safe functions to get site configuration
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
    
    $field_group = acf_get_field_group('group_67d9cc842b8c8');
    if (!$field_group || !$field_group['active']) {
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
        $allowed_sites = array('edumed', 'psd', 'omd', 'phd', 'oc');
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
 * Get all available sites with their labels
 * 
 * @return array Array of site identifiers and labels
 */
function ventrix_get_available_sites() {
    return array(
        'edumed' => 'Edumed',
        'psd' => 'Public Service Degrees',
        'omd' => 'Online Masters Degrees',
        'phd' => 'PhD Me',
        'oc' => 'Online Colleges'
    );
}

/**
 * Check if ACF is properly configured for the testimonial card
 * 
 * @return bool True if ACF is properly configured
 */
function ventrix_is_acf_configured() {
    // Check if ACF is active
    if (!function_exists('get_field') || !function_exists('acf_get_field_group')) {
        return false;
    }
    
    // Check if our field group exists and is active
    $field_group = acf_get_field_group('group_67d9cc842b8c8');
    if (!$field_group || !$field_group['active']) {
        return false;
    }
    
    return true;
}

/**
 * Get site configuration with fallback
 * 
 * @return array Site configuration array
 */
function ventrix_get_site_config() {
    $current_site = ventrix_get_current_site();
    $available_sites = ventrix_get_available_sites();
    
    return array(
        'currentSite' => $current_site,
        'availableSites' => $available_sites,
        'isConfigured' => ventrix_is_acf_configured()
    );
}
