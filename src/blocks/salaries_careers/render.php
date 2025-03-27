<?php
// render.php

// Include helper functions
require_once 'inc/helpers.php';
require_once 'inc/proxy_api.php';

/**
 * Renders the Cafeto Salaries Careers block.
 *
 * @param array $attributes Block attributes.
 * @param string $content Block content.
 * @return string Rendered block content.
 */
function render_cafeto_salaries_careers_block($attributes, $content) {
    global $wpdb;

    // Get and validate block attributes
    $data = cafeto_get_block_data($attributes);

    // Handle errors in case of invalid attributes
    if (is_wp_error($data)) {
        return '<p class="text-red-500">' . esc_html($data->get_error_message()) . '</p>';
    }

    // Extract data for easier access
    $columns = $data['columns'];
    $results = $data['results'];
    $total_entries = $data['total_entries'];
    $table_name = $data['selected_table'];
    $block_id = $data['block_id'];
    $table_title = $data['table_title'];
    $show_title = $data['show_title'];
    $source_text = $data['source_text'];
    $source_link = $data['source_link'];
    $source_text_hyperlink = $data['source_text_hyperlink'];
    $pinned_us = $data['pin_united_states'];


    

    // Start output buffering
    ob_start();
    // Check if the request is from a mobile device
    if (wp_is_mobile()) {
        // Include the template for the mobile table
        include 'inc/mobile-table.php';
    } else {
        // Include the template for the desktop table
        include 'inc/desktop-table.php';
    }

    // Return the buffered content
    return ob_get_clean();
}
