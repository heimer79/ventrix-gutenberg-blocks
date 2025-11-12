<?php
/**
  * file include all the actions callback functions.
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

if ( defined('VENTRIX_CURRENT_SITE') && in_array( VENTRIX_CURRENT_SITE, ['omd'], true ) ) {

    // Hook the 'latest_rankings' function to the 'init' action.
    add_action('init', 'latest_rankings');
}

function latest_rankings() {
    // Labels for the custom post type 'latest_rankings'
    $labels = array(
        'name'               => __( 'Latest Ranking', 'ventrix' ),
        'singular_name'      => __( 'Latest Ranking', 'ventrix' ),
        'add_new'            => _x( 'Add New Ranking', 'ventrix' ),
        'add_new_item'       => __( 'Add New Ranking', 'ventrix' ),
        'edit_item'          => __( 'Edit Ranking', 'ventrix' ),
        'new_item'           => __( 'New Ranking', 'ventrix' ),
        'view_item'          => __( 'View Ranking', 'ventrix' ),
        'search_items'       => __( 'Search latest ranking', 'ventrix' ),
        'not_found'          => __( 'No Latest Ranking found', 'ventrix' ),
        'not_found_in_trash' => __( 'No Latest Ranking found in Trash', 'ventrix' ),
        'parent_item_colon'  => __( 'Parent Latest Ranking:', 'ventrix' ),
        'menu_name'          => __( 'Latest Ranking', 'ventrix' ),
    );
    // Arguments for the custom post type 'latest_rankings'
    $args = array(
        'labels'               => $labels,
        'hierarchical'         => true,
        'show_ui'              => true,
        'show_in_menu'         => true,
        'show_in_admin_bar'    => true,
        'menu_position'        => 6,
        'show_in_nav_menus'    => true,
        'exclude_from_search'  => false,
        'has_archive'          => true,
        'can_export'           => true,
        'capability_type'      => 'post',
        'show_in_rest'         => true,
        'query_var'            => false,
        'publicly_queryable'   => false,
        'public'               => false, 
        'rewrite'              => false, 
        'supports'             => array(
            'title',
            'editor',
            'author',
            'thumbnail',
            'excerpt',
            'custom-fields',
            'trackbacks',
            'revisions',
            'page-attributes',
            'post-formats'
        ),
        'show_in_graphql'      => true,  // Added for WPGraphQL
        'graphql_single_name'  => 'LatestRanking',  // Added for WPGraphQL
        'graphql_plural_name'  => 'LatestRankings',  // Added for WPGraphQL
    );
    // Register the custom post type 'latest_ranking'
    register_post_type( 'latest_rankings', $args );

    // Labels for the custom taxonomy 'latest_ranking_category'
    $catLabels = array(
        'name'              => _x( 'Ranking Category', 'ventrix' ),
        'singular_name'     => _x( 'Ranking Category', 'taxonomy singular name' ),
        'search_items'      => __( 'Search Rankings Category' ),
        'all_items'         => __( 'All Rankings Category' ),
        'parent_item'       => __( 'Parent Ranking Category' ),
        'parent_item_colon' => __( 'Parent Ranking Category:' ),
        'edit_item'         => __( 'Edit Ranking Category' ),
        'update_item'       => __( 'Update Ranking Category' ),
        'add_new_item'      => __( 'Add New Ranking Category' ),
        'new_item_name'     => __( 'New Ranking Category Name' ),
        'menu_name'         => __( 'Ranking Category' ),
    );
    // Register the custom taxonomy 'ranking_category' and add support for WPGraphQL
    register_taxonomy( 'ranking_category', array( 'latest_rankings' ), array(
        'hierarchical'        => true,
        'labels'              => $catLabels,
        'show_ui'             => true,
        'show_admin_column'   => true,
        'query_var'           => false,
        'publicly_queryable'  => false,
        'public'              => false, 
        'rewrite'             => false, 
        'show_in_graphql'     => true,  // Added for WPGraphQL
        'graphql_single_name' => 'RankingCategory',  // Added for WPGraphQL
        'graphql_plural_name' => 'RankingCategories',  // Added for WPGraphQL
    ) );
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
        'phds' => 'PhDs Me',
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