<?php
// inc/helpers.php

/**
 * Retrieves block data based on the provided attributes.
 *
 * @param array $attributes Attributes for the block.
 * @return array|WP_Error Block data or WP_Error on failure.
 */
function cafeto_get_block_data($attributes) {
    global $wpdb;

    // 1. Get the current site (edumed, psd, etc.) using the custom ACF function.
    $site = function_exists('get_select_current_site') ? get_select_current_site() : '';

    // 2. Collect and sanitize block attributes.
    $selected_table = isset($attributes['selectedTable']) ? sanitize_text_field($attributes['selectedTable']) : '';
    $selected_columns = isset($attributes['selectedColumns']) ? $attributes['selectedColumns'] : array();
    $table_title = isset($attributes['tableTitle']) ? sanitize_text_field($attributes['tableTitle']) : 'Salaries and Careers';
    $show_title = isset($attributes['showTitle']) ? (bool)$attributes['showTitle'] : false;
    $pin_united_states = isset($attributes['pinUnitedStates']) ? (bool)$attributes['pinUnitedStates'] : false;

    // 3. Verify that the selected table is valid.
    //    We assume our plugin only handles specific tables with a certain prefix,
    //    but you can skip or adapt this validation if needed.
    if (empty($selected_table)) {
        return new WP_Error('invalid_table', 'No table specified.');
    }

    // 4. Build the actual database table name.
    $table_name = $wpdb->prefix . $selected_table;

    // Check that the table exists in the database.
    $tables = $wpdb->get_col('SHOW TABLES');
    if (!in_array($table_name, $tables)) {
        return new WP_Error('table_not_exist', 'The selected table does not exist.');
    }

    // 5. Get the actual columns in the table (to validate and avoid errors).
    $columns_in_table = $wpdb->get_col("DESC `$table_name`", 0);
    if (empty($columns_in_table)) {
        return new WP_Error('no_data', 'The table exists, but has no columns or data.');
    }

    // 6. Define default columns *only* when no columns have been selected.
    //    These default columns vary by site and table.
    if (empty($selected_columns)) {
        // To assign default columns, we use a switch (or if/else) on $selected_table.
        // Adjust as needed for more cases.
        switch ($selected_table) {
            case 'salary_standard':
                if ($site === 'psd' || $site === 'omd') {
                    // Order: Area, Occupation, 10th Percentile, 90th Percentile, Median
                    $default_cols = array(
                        array('name' => 'area',               'displayName' => 'Area'),
                        array('name' => 'occupation',         'displayName' => 'Occupation'),
                        array('name' => 'n_10th_percentile',  'displayName' => '10th Percentile'),
                        array('name' => 'n_90th_percentile',  'displayName' => '90th Percentile'),
                        array('name' => 'median',             'displayName' => 'Median'),
                    );
                } else {
                    // "edumed" (or other): Area, 10th, Median, 90th
                    // (we add occupation at the end as an example).
                    $default_cols = array(
                        array('name' => 'area',               'displayName' => 'Area'),
                        array('name' => 'n_10th_percentile',  'displayName' => '10th Percentile'),
                        array('name' => 'median',             'displayName' => 'Median'),
                        array('name' => 'n_90th_percentile',  'displayName' => '90th Percentile'),
                    );
                }
                break;

            case 'career_standard':
                if ($site === 'psd' || $site === 'omd' ) {
                    // Order: Area, Occupation, Curr. Jobs, Proj. Jobs, New Jobs, Growth %
                    $default_cols = array(
                        array('name' => 'area',          'displayName' => 'Area'),
                        array('name' => 'occupation',    'displayName' => 'Occupation'),
                        array('name' => 'curr_jobs',     'displayName' => 'Curr. Jobs'),
                        array('name' => 'proj_jobs',     'displayName' => 'Proj. Jobs'),
                        array('name' => 'new_jobs',      'displayName' => 'New Jobs'),
                        array('name' => 'job_growth_rate','displayName' => 'Growth %'),
                    );
                } else {
                    // "edumed" (or other): Area, Curr. Jobs, Proj. Jobs, New Jobs, Growth %, Avg. Ann. Openings
                    $default_cols = array(
                        array('name' => 'area',           'displayName' => 'Area'),
                        array('name' => 'curr_jobs',      'displayName' => 'Curr. Jobs'),
                        array('name' => 'proj_jobs',      'displayName' => 'Proj. Jobs'),
                        array('name' => 'new_jobs',       'displayName' => 'New Jobs'),
                        array('name' => 'job_growth_rate','displayName' => 'Growth %'),
                        array('name' => 'avg_ann_opening','displayName' => 'Avg. Ann. Openings'),
                    );
                }
                break;

            // Examples of other cases:
            case 'salary_bridge':
                // Define default columns (same for all sites, or not).
                $default_cols = array(
                    array('name' => 'occupation',        'displayName' => 'Occupation'),
                    array('name' => 'area',              'displayName' => 'Area'),
                    array('name' => 'n_10th_percentile', 'displayName' => '10th Percentile'),
                    array('name' => 'median',            'displayName' => 'Median'),
                    array('name' => 'n_90th_percentile', 'displayName' => '90th Percentile'),
                );
                break;

            case 'career_bridge':
                $default_cols = array(
                    array('name' => 'occupation',      'displayName' => 'Occupation'),
                    array('name' => 'area',            'displayName' => 'Area'),
                    array('name' => 'curr_jobs',       'displayName' => 'Curr. Jobs'),
                    array('name' => 'proj_jobs',       'displayName' => 'Proj. Jobs'),
                    array('name' => 'new_jobs',        'displayName' => 'New Jobs'),
                    array('name' => 'job_growth_rate', 'displayName' => 'Growth %'),
                    array('name' => 'avg_ann_opening', 'displayName' => 'Avg. Ann. Openings'),
                );
                break;

            case 'salarybls':
                $default_cols = array(
                    array('name' => 'area',               'displayName' => 'Area'),
                    array('name' => 'n_10th_percentile',  'displayName' => '10th Percentile'),
                    array('name' => 'median',             'displayName' => 'Median'),
                    array('name' => 'n_90th_percentile',  'displayName' => '90th Percentile'),
                );
                break;

            case 'careerpc':
                $default_cols = array(
                    array('name' => 'area',              'displayName' => 'Area'),
                    array('name' => 'curr_jobs',         'displayName' => 'Curr. Jobs'),
                    array('name' => 'proj_jobs',         'displayName' => 'Proj. Jobs'),
                    array('name' => 'new_jobs',          'displayName' => 'New Jobs'),
                    array('name' => 'job_growth_rate',   'displayName' => 'Growth %'),
                    array('name' => 'avg_ann_opening',   'displayName' => 'Avg. Ann. Openings'),
                );
                break;

            // Add more if needed.

            default:
                // If no specific case, assign nothing.
                $default_cols = array();
                break;
        }

        // Assign defaults if the array is not empty.
        if (!empty($default_cols)) {
            $selected_columns = $default_cols;
        }
    }

    // 7. Validate that the selected columns actually exist in the table
    //    to avoid the 'invalid_column' error.
    foreach ($selected_columns as $col) {
        if (!isset($col['name']) || !in_array($col['name'], $columns_in_table)) {
            return new WP_Error('invalid_column', 'Invalid column selected: ' . ($col['name'] ?? 'undefined'));
        }
    }

    // 8. Prepare $columns with final name and displayName.
    $columns = array();
    foreach ($selected_columns as $column) {
        // If displayName is missing, use the column name itself.
        $columns[] = array(
            'name'        => $column['name'],
            'displayName' => isset($column['displayName']) ? $column['displayName'] : $column['name'],
        );
    }

    // 9. Get the current page slug, in case the table requires filtering by asset_url.
    $current_slug = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');

    // 10. Check if 'asset_url' column exists.
    $asset_url_exists = in_array('asset_url', $columns_in_table);
    $source_text_exists = in_array('source_text', $columns_in_table);
    $source_link_exists = in_array('source_link', $columns_in_table);
    $source_text_hyperlink_exists = in_array('source_text_hyperlink', $columns_in_table);

    // 11. Build the SQL query to retrieve only the selected columns.
    //     Important: escape column names with esc_sql and backticks.
    $column_names_escaped = array_map(
        fn($col) => '`' . esc_sql($col['name']) . '`',
        $columns
    );
    $columns_sql = implode(', ', $column_names_escaped);

    $query = "SELECT $columns_sql FROM `$table_name`";
    if ($asset_url_exists) {
        $query .= $wpdb->prepare(" WHERE `asset_url` = %s", '/' . $current_slug . '/');
    }

    // 12. Execute the query
    $results = $wpdb->get_results($query, ARRAY_A);
    if ($results === null || empty($results)) {
        return new WP_Error('no_data', 'No matching data found or there was an error in the query.');
    }

    // 13. If indicated, "pin" the "United States" row to the top.
    if ($pin_united_states) {
        $results = cafeto_pin_united_states($results);
    }

    // 14. Prepare data for the final response.
    $total_entries = count($results);
    $block_id = uniqid('cafeto-salaries-careers-');

    // 15. Get source data (source_text, link, etc.) if the columns exist.
    $source_text = '';
    $source_link = '';
    $source_text_hyperlink = '';

    if ($source_text_exists || $source_link_exists || $source_text_hyperlink_exists) {
        // Create list of columns to select.
        $source_columns = array();
        if ($source_text_exists) {
            $source_columns[] = '`source_text`';
        }
        if ($source_link_exists) {
            $source_columns[] = '`source_link`';
        }
        if ($source_text_hyperlink_exists) {
            $source_columns[] = '`source_text_hyperlink`';
        }

        if (!empty($source_columns)) {
            $source_columns_sql = implode(', ', $source_columns);

            // Also filter by asset_url if it exists.
            if ($asset_url_exists) {
                $source_data = $wpdb->get_row(
                    $wpdb->prepare(
                        "SELECT DISTINCT $source_columns_sql FROM `$table_name` WHERE `asset_url` = %s LIMIT 1",
                        '/' . $current_slug . '/'
                    ),
                    ARRAY_A
                );
            } else {
                $source_data = $wpdb->get_row("SELECT DISTINCT $source_columns_sql FROM `$table_name` LIMIT 1", ARRAY_A);
            }

            if ($source_data) {
                $source_text = isset($source_data['source_text']) ? sanitize_text_field($source_data['source_text']) : '';
                $source_link = isset($source_data['source_link']) ? esc_url_raw($source_data['source_link']) : '';
                $source_text_hyperlink = isset($source_data['source_text_hyperlink'])
                    ? sanitize_text_field($source_data['source_text_hyperlink'])
                    : '';
            }
        }
    }

    // 16. Return the array with all the data to be used for rendering the block.
    return compact(
        'columns',
        'results',
        'total_entries',
        'block_id',
        'table_title',
        'show_title',
        'source_text',
        'source_link',
        'source_text_hyperlink',
        'table_name',
        'selected_table',
        'pin_united_states'
    );
}

/**
 * Pins the 'United States' row at the beginning of the results.
 *
 * @param array $results Query results.
 * @return array Modified results with the 'United States' row pinned at the top.
 */
function cafeto_pin_united_states($results) {
    $us_rows = array();
    $other_rows = array();

    // Separate 'United States' rows from the rest
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
