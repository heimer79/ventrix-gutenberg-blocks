<?php
// inc/helpers.php

/**
 * Retrieves block data based on provided attributes.
 *
 * @param array $attributes Attributes for the block.
 * @return array|WP_Error Block data or WP_Error on failure.
 */
function cafeto_get_block_data($attributes) {
    global $wpdb;

    // Define allowed tables and their columns
    $allowed_tables = array(
            'salarybls' => array('area', 'n_10th_percentile', 'median', 'n_90th_percentile'),
            'careerpc' => array('area', 'curr_jobs', 'proj_jobs', 'new_jobs', 'job_growth_rate', 'avg_ann_opening'),
            'salary_standard' => array('area', 'n_10th_percentile', 'median', 'n_90th_percentile'),
            'salary_bridge' => array('occupation', 'area', 'n_10th_percentile', 'median', 'n_90th_percentile'),
            'career_standard' => array('area', 'curr_jobs', 'proj_jobs', 'new_jobs', 'job_growth_rate', 'avg_ann_opening'),
            'career_bridge' => array('occupation', 'area', 'curr_jobs', 'proj_jobs', 'new_jobs', 'job_growth_rate', 'avg_ann_opening'),
    );

    // Define default display names for columns
    $default_display_names = array(
            'salarybls' => array(
                'area' => 'Area',
                'n_10th_percentile' => '10th Percentile',
                'median' => 'Median',
                'n_90th_percentile' => '90th Percentile',
            ),
            'careerpc' => array(
                'area' => 'Area',
                'curr_jobs' => 'Curr. Jobs',
                'proj_jobs' => 'Proj. Jobs',
                'new_jobs' => 'New Jobs',
                'job_growth_rate' => 'Growth %',
                'avg_ann_opening' => 'Avg. Ann. Openings',
            ),
            'salary_standard' => array(
                'area' => 'Area',
                'n_10th_percentile' => '10th Percentile',
                'median' => 'Median',
                'n_90th_percentile' => '90th Percentile',
            ),
            'salary_bridge' => array(
                'occupation' => 'Occupation',
                'area' => 'Area',
                'n_10th_percentile' => '10th Percentile',
                'median' => 'Median',
                'n_90th_percentile' => '90th Percentile',
            ),
            'career_standard' => array(
                'area' => 'Area',
                'curr_jobs' => 'Curr. Jobs',
                'proj_jobs' => 'Proj. Jobs',
                'new_jobs' => 'New Jobs',
                'job_growth_rate' => 'Growth %',
                'avg_ann_opening' => 'Avg. Ann. Openings',
            ),
            'career_bridge' => array(
                'occupation' => 'Occupation',
                'area' => 'Area',
                'curr_jobs' => 'Curr. Jobs',
                'proj_jobs' => 'Proj. Jobs',
                'new_jobs' => 'New Jobs',
                'job_growth_rate' => 'Growth %',
                'avg_ann_opening' => 'Avg. Ann. Openings',
            ),
    );

    // Retrieve and sanitize attributes
    $selected_table = isset($attributes['selectedTable']) ? sanitize_text_field($attributes['selectedTable']) : '';
    $selected_columns = isset($attributes['selectedColumns']) ? $attributes['selectedColumns'] : array();
    $table_title = isset($attributes['tableTitle']) ? sanitize_text_field($attributes['tableTitle']) : 'Salaries and Careers';
    $show_title = isset($attributes['showTitle']) ? (bool)$attributes['showTitle'] : false;
    $pin_united_states = isset($attributes['pinUnitedStates']) ? (bool)$attributes['pinUnitedStates'] : false;

    // Validate selected table
    if (!array_key_exists($selected_table, $allowed_tables)) {
        return new WP_Error('invalid_table', 'Invalid table selected.');
    }

    // Use default columns if none are selected
    if (empty($selected_columns)) {
        $selected_columns = array_map(function($column_name) use ($selected_table, $default_display_names) {
            $display_name = isset($default_display_names[$selected_table][$column_name]) ? $default_display_names[$selected_table][$column_name] : $column_name;
            return array('name' => $column_name, 'displayName' => $display_name);
        }, $allowed_tables[$selected_table]);
    } else {
        // Validate selected columns
        foreach ($selected_columns as $column) {
            if (!in_array($column['name'], $allowed_tables[$selected_table])) {
                return new WP_Error('invalid_column', 'Invalid column selected.');
            }
        }
    }

    // Prepare columns with display names
    $columns = array();
    foreach ($selected_columns as $column) {
        $columns[] = array(
            'name' => $column['name'],
            'displayName' => isset($column['displayName']) ? $column['displayName'] : $column['name'],
        );
    }

    // Prepare SQL query
    $table_name = $wpdb->prefix . $selected_table;
    $column_names = array_map(function($col) {
        return '`' . esc_sql($col['name']) . '`';
    }, $columns);
    $columns_sql = implode(', ', $column_names);

    // Verify table exists
    $tables = $wpdb->get_col('SHOW TABLES');

    // Verify selected table exists
    if (!in_array($table_name, $tables)) {
        return new WP_Error('table_not_exist', 'The selected table does not exist.');
    }

    // Get current page slug
    $current_slug = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

    // Check if 'asset_url' column exists
    $columns_in_table = $wpdb->get_col("DESC `$table_name`", 0);
    $asset_url_exists = in_array('asset_url', $columns_in_table);
    $source_text_exists = in_array('source_text', $columns_in_table);
    $source_link_exists = in_array('source_link', $columns_in_table);

    // Build SQL query
    $query = "SELECT $columns_sql FROM `$table_name`";
    if ($asset_url_exists) {
        $query .= $wpdb->prepare(" WHERE asset_url = %s", '/' . $current_slug . '/');
    }

    // Execute the query and fetch results
    $results = $wpdb->get_results($query, ARRAY_A);

    // Check for errors or empty results
    if ($results === null || empty($results)) {
        return new WP_Error('no_data', 'No matching data found or there was an error in the query.');
    }

    // Pin 'United States' row if necessary
    if ($pin_united_states) {
        $results = cafeto_pin_united_states($results);
    }

    // Prepare the response data
    $total_entries = count($results);
    $block_id = uniqid('cafeto-salaries-careers-');

    // Fetch Source Text and Link from the data table if the columns exist
    if ($source_text_exists && $source_link_exists) {
        // If asset_url exists, include it in the WHERE clause
        if ($asset_url_exists) {
            $source_data = $wpdb->get_row(
                $wpdb->prepare(
                    "SELECT DISTINCT `source_text`, `source_link` FROM `$table_name` WHERE `asset_url` = %s LIMIT 1",
                    '/' . $current_slug . '/'
                ),
                ARRAY_A
            );
        } else {
            $source_data = $wpdb->get_row("SELECT DISTINCT `source_text`, `source_link` FROM `$table_name` LIMIT 1", ARRAY_A);
        }

        if ($source_data) {
            $source_text = sanitize_text_field($source_data['source_text']);
            $source_link = esc_url_raw($source_data['source_link']);
        } else {
            $source_text = '';
            $source_link = '';
        }
    } else {
        // If the columns do not exist, set them to empty strings
        $source_text = '';
        $source_link = '';
    }

    return compact(
        'columns',
        'results',
        'total_entries',
        'block_id',
        'table_title',
        'show_title',
        'source_text',
        'source_link'
    );
}


/**
 * Pins the 'United States' row at the top of the results.
 *
 * @param array $results The query results.
 * @return array The modified results with 'United States' row pinned at the top.
 */
function cafeto_pin_united_states($results) {
    $us_rows = array();
    $other_rows = array();

    // Separate 'United States' rows from others
    foreach ($results as $row) {
        $area_value = isset($row['area']) ? strtolower(trim($row['area'])) : '';
        if (in_array($area_value, array('united states', 'u.s.', 'us'))) {
            $us_rows[] = $row;
        } else {
            $other_rows[] = $row;
        }
    }

    // Merge 'United States' rows at the top
    return array_merge($us_rows, $other_rows);
}
