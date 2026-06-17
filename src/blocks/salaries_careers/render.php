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
    // Get and validate block attributes
    $data = cafeto_get_block_data($attributes);

    // Errors are surfaced in the block editor only (see edit.js). Never output on the frontend.
    if (is_wp_error($data)) {
        return '';
    }

    $is_mobile_request = wp_is_mobile();
    $entries_per_page = isset($attributes['entriesPerPage']) ? intval($attributes['entriesPerPage']) : 10;
    $desktop_template = isset($attributes['desktopTemplate']) ? sanitize_key($attributes['desktopTemplate']) : 'salary-basic-table-desktop';
    $mobile_template = isset($attributes['mobileTemplate']) ? sanitize_key($attributes['mobileTemplate']) : 'salary-basic-table-mobile';

    $allowed_templates = array(
        'salary-basic-table-desktop',
        'salary-basic-table-mobile',
        'salary-double-row-table-desktop',
        'salary-double-row-table-mobile',
        'career-basic-table-desktop',
        'career-basic-table-mobile',
        'career-double-row-table-desktop',
        'career-double-row-table-mobile',
        'salary-table-geo-desktop',
        'salary-table-geo-mobile',
    );

    if (!in_array($desktop_template, $allowed_templates, true)) {
        $desktop_template = 'salary-basic-table-desktop';
    }
    if (!in_array($mobile_template, $allowed_templates, true)) {
        $mobile_template = 'salary-basic-table-mobile';
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
    $mobile_table_label = $data['mobile_table_label'];
    $pinned_us = $data['pin_united_states'];

    // Start output buffering
    ob_start();
    if ($is_mobile_request) {
        $mobile_template_path = __DIR__ . '/inc/' . $mobile_template . '.php';
        if (file_exists($mobile_template_path)) {
            include $mobile_template_path;
        }
    } else {
        $desktop_template_path = __DIR__ . '/inc/' . $desktop_template . '.php';
        if (file_exists($desktop_template_path)) {
            include $desktop_template_path;
        }
    }

    return ob_get_clean();
}



