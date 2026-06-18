<?php
// inc/helpers.php

/**
 * Retrieves block data based on the provided attributes.
 *
 * @param array $attributes Attributes for the block.
 * @param array $options    Optional context. Accepts `post_id` for editor/REST validation.
 * @return array|WP_Error Block data or WP_Error on failure.
 */
function cafeto_get_block_data($attributes, $options = array()) {
    global $wpdb;

    // 1. Get the current site (edumed, psd, etc.) using the custom ACF function.
    $site = function_exists('get_select_current_site') ? get_select_current_site() : '';

    // 2. Collect and sanitize block attributes.
    $selected_table = isset($attributes['selectedTable']) ? sanitize_text_field($attributes['selectedTable']) : '';
    $selected_columns = isset($attributes['selectedColumns']) ? $attributes['selectedColumns'] : array();
    $table_title = isset($attributes['tableTitle']) ? sanitize_text_field($attributes['tableTitle']) : 'Salaries and Careers';
    $show_title = isset($attributes['showTitle']) ? (bool)$attributes['showTitle'] : \true;
    $pin_united_states = isset($attributes['pinUnitedStates']) ? (bool)$attributes['pinUnitedStates'] : \true;

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
                if ($site === 'omd') {
                    // Order: Area, Median, 75th Percentile, 90th Percentile
                    $default_cols = array(
                        array('name' => 'area',               'displayName' => 'Area'),
                        array('name' => 'median',             'displayName' => 'Median'),
                        array('name' => 'n_75th_percentile',  'displayName' => '75th Percentile'),
                        array('name' => 'n_90th_percentile',  'displayName' => '90th Percentile'),
                    );
                } elseif ($site === 'psd') {
                    // Order: Area, Occupation, 10th Percentile, 90th Percentile, Median
                    $default_cols = array(
                        array('name' => 'area',               'displayName' => 'Area'),
                        array('name' => 'occupation',         'displayName' => 'Occupation'),
                        array('name' => 'n_10th_percentile',  'displayName' => '10th Percentile'),
                        array('name' => 'n_90th_percentile',  'displayName' => '90th Percentile'),
                        array('name' => 'median',             'displayName' => 'Median'),
                    );
                } elseif ($site === 'phds') {
                    // Order: Area, Median, 75th Percentile, 90th Percentile
                    $default_cols = array(
                        array('name' => 'area',               'displayName' => 'Area'),
                        array('name' => 'median',             'displayName' => 'Median'),
                        array('name' => 'n_75th_percentile',  'displayName' => '75th Percentile'),
                        array('name' => 'n_90th_percentile',  'displayName' => '90th Percentile'),
                    );
                } else {
                    // "edumed" (or other): Area, 10th, Median, 90th
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
                    array('name' => 'area',              'displayName' => 'Area'),
                    array('name' => 'occupation',        'displayName' => 'Occupation'),
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

            case 'salary_geo':
                $default_cols = array(
                    array('name' => 'occupation',          'displayName' => 'Occupation'),
                    array('name' => 'median',              'displayName' => 'Median'),
                    array('name' => 'n_75th_percentile',   'displayName' => '75th Percentile'),
                    array('name' => 'n_90th_percentile',   'displayName' => '90th Percentile'),
                    array('name' => 'relevant_degree_text','displayName' => 'Relevant Degree'),
                    array('name' => 'relevant_degree_link','displayName' => 'Link'),
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
    $post_id = isset($options['post_id']) ? (int) $options['post_id'] : 0;
    if ($post_id > 0) {
        $permalink = get_permalink($post_id);
        $current_slug = $permalink
            ? trim(parse_url($permalink, PHP_URL_PATH), '/')
            : '';
    } else {
        $current_slug = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
    }

    // 10. Check if 'asset_url' column exists.
    $asset_url_exists = in_array('asset_url', $columns_in_table);
    $source_text_exists = in_array('source_text', $columns_in_table);
    $source_link_exists = in_array('source_link', $columns_in_table);
    $source_text_hyperlink_exists = in_array('source_text_hyperlink', $columns_in_table);
    $mobile_table_label_exists = in_array('mobile_table_label', $columns_in_table);
    $mobile_source_text_exists = in_array('mobile_source_text', $columns_in_table);
    $occupation_exists = in_array('occupation', $columns_in_table);

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
    $block_id = function_exists('wp_unique_id')
        ? wp_unique_id('cafeto-salaries-careers-')
        : uniqid('cafeto-salaries-careers-', true);

    // 15. Get source data (source_text, link, etc.) if the columns exist.
    $source_text = '';
    $source_link = '';
    $source_text_hyperlink = '';
    $mobile_table_label = '';
    $mobile_source_text = '';
    $occupation = '';

    if ($source_text_exists || $source_link_exists || $source_text_hyperlink_exists || $mobile_table_label_exists || $mobile_source_text_exists || $occupation_exists) {
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
        if ($mobile_table_label_exists) {
            $source_columns[] = '`mobile_table_label`';
        }
        if ($mobile_source_text_exists) {
            $source_columns[] = '`mobile_source_text`';
        }
        if ($occupation_exists) {
            $source_columns[] = '`occupation`';
        }

        if (!empty($source_columns)) {
            $source_columns_sql = implode(', ', $source_columns);
            $source_query = "SELECT $source_columns_sql FROM `$table_name`";

            if ($asset_url_exists) {
                $source_query .= $wpdb->prepare(' WHERE `asset_url` = %s', '/' . $current_slug . '/');
            }

            // Merge non-empty values across all rows (legacy theme behavior).
            // DISTINCT + LIMIT 1 could return a row with source_text but empty source_link.
            $source_rows = $wpdb->get_results($source_query, ARRAY_A);

            if (!empty($source_rows)) {
                foreach ($source_rows as $source_row) {
                    if ($source_text_exists && !empty($source_row['source_text'])) {
                        $source_text = sanitize_text_field($source_row['source_text']);
                    }

                    if ($source_link_exists && isset($source_row['source_link'])) {
                        $sanitized_link = cafeto_sanitize_salaries_source_url($source_row['source_link']);
                        if ($sanitized_link !== '') {
                            $source_link = $sanitized_link;
                        }
                    }

                    if ($source_text_hyperlink_exists && !empty($source_row['source_text_hyperlink'])) {
                        $source_text_hyperlink = sanitize_text_field($source_row['source_text_hyperlink']);
                    }

                    if ($mobile_table_label_exists && !empty($source_row['mobile_table_label'])) {
                        $mobile_table_label = sanitize_text_field($source_row['mobile_table_label']);
                    }

                    if ($mobile_source_text_exists && !empty($source_row['mobile_source_text'])) {
                        $mobile_source_text = sanitize_text_field($source_row['mobile_source_text']);
                    }

                    if ($occupation_exists && !empty($source_row['occupation'])) {
                        $occupation = sanitize_text_field($source_row['occupation']);
                    }
                }
            }

            cafeto_normalize_salaries_careers_source_fields($source_link, $source_text_hyperlink, $source_text);
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
        'mobile_table_label',
        'mobile_source_text',
        'occupation',
        'table_name',
        'selected_table',
        'pin_united_states'
    );
}

/**
 * Checks whether an area label represents the United States aggregate row.
 *
 * @param string $area_value Area label from the database.
 * @return bool
 */
function cafeto_is_united_states_area($area_value) {
    $area_value = strtolower(trim((string) $area_value));

    return in_array($area_value, array('united states', 'u.s.', 'us'), true);
}

/**
 * Groups flat salary/career rows by area while preserving source order.
 *
 * Each CSV area typically appears on consecutive rows (one per occupation).
 *
 * @param array  $results  Query results.
 * @param string $area_key Column name used for grouping.
 * @return array[] List of groups: [ ['area' => string, 'rows' => array[]], ... ]
 */
function cafeto_group_salary_rows_by_area($results, $area_key = 'area') {
    $groups = array();
    $group_index = array();

    foreach ($results as $row) {
        $area = isset($row[$area_key]) ? trim((string) $row[$area_key]) : '';

        if (!isset($group_index[$area])) {
            $group_index[$area] = count($groups);
            $groups[] = array(
                'area' => $area,
                'rows' => array(),
            );
        }

        $groups[$group_index[$area]]['rows'][] = $row;
    }

    return $groups;
}

/**
 * Parses a currency string into a float amount.
 *
 * @param string $value Raw salary value.
 * @return float|null
 */
function cafeto_parse_salary_amount($value) {
    $normalized = preg_replace('/[^0-9.-]/', '', (string) $value);

    if ($normalized === '' || !is_numeric($normalized)) {
        return null;
    }

    return (float) $normalized;
}

/**
 * Formats a salary difference for mobile comparison badges.
 *
 * @param float $amount Difference amount.
 * @return string
 */
function cafeto_format_salary_difference($amount) {
    $prefix = $amount >= 0 ? '+$' : '-$';

    return $prefix . number_format(abs($amount)) . '/yr';
}

/**
 * Builds footer copy for double-row mobile cards comparing two medians.
 *
 * @param array $rows Grouped rows for a single area.
 * @param string $median_key Median column key.
 * @return array{label: string, badge: string}|null
 */
function cafeto_get_double_row_mobile_comparison($rows, $median_key = 'median') {
    if (count($rows) < 2) {
        return null;
    }

    $first_amount = cafeto_parse_salary_amount($rows[0][$median_key] ?? '');
    $second_amount = cafeto_parse_salary_amount($rows[1][$median_key] ?? '');

    if ($first_amount === null || $second_amount === null) {
        return null;
    }

    $difference = $second_amount - $first_amount;

    if ($difference >= 0) {
        $label = trim((string) ($rows[1]['occupation'] ?? 'Second occupation')) . ' earns more by';
    } else {
        $label = trim((string) ($rows[0]['occupation'] ?? 'First occupation')) . ' earns more by';
        $difference = abs($difference);
    }

    return array(
        'label' => $label,
        'badge' => cafeto_format_salary_difference($difference),
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
        $area_value = isset($row['area']) ? $row['area'] : '';
        if (cafeto_is_united_states_area($area_value)) {
            $us_rows[] = $row;
        } else {
            $other_rows[] = $row;
        }
    }

    // Sort remaining rows alphabetically by area
    usort($other_rows, function($a, $b) {
        return strcmp(
            isset($a['area']) ? strtolower(trim($a['area'])) : '',
            isset($b['area']) ? strtolower(trim($b['area'])) : ''
        );
    });

    // Merge 'United States' rows at the top
    return array_merge($us_rows, $other_rows);
}

/**
 * Sanitizes a salaries/careers source URL (adds https:// when missing).
 *
 * @param string $raw Raw URL from the database.
 * @return string Sanitized URL or empty string.
 */
function cafeto_sanitize_salaries_source_url($raw) {
    $raw = trim((string) $raw);

    if ($raw === '') {
        return '';
    }

    if (!preg_match('#^https?://#i', $raw)) {
        $raw = 'https://' . ltrim($raw, '/');
    }

    $sanitized = esc_url_raw($raw);

    return ($sanitized !== '' && preg_match('#^https?://#i', $sanitized)) ? $sanitized : '';
}

/**
 * Normalizes source fields when URL/label columns are swapped or URLs lack a scheme.
 *
 * @param string $source_link             Source URL (by reference).
 * @param string $source_text_hyperlink  Link label (by reference).
 * @param string $source_text            Trailing source citation (by reference).
 */
function cafeto_normalize_salaries_careers_source_fields(&$source_link, &$source_text_hyperlink, &$source_text) {
    $hyperlink = trim((string) $source_text_hyperlink);
    $link = trim((string) $source_link);
    $text = trim((string) $source_text);

    if ($link === '') {
        $url_from_hyperlink = cafeto_sanitize_salaries_source_url($hyperlink);

        if ($url_from_hyperlink !== '') {
            $source_link = $url_from_hyperlink;
            $source_text_hyperlink = '';
            $source_text = $text;

            return;
        }
    }

    if ($link !== '') {
        $source_link = cafeto_sanitize_salaries_source_url($link);
    }

    $source_text_hyperlink = trim((string) $source_text_hyperlink);
    $source_text = trim((string) $source_text);
}

/**
 * Whether a salaries/careers template slug is a career variant.
 *
 * @param string $template Template slug.
 * @return bool
 */
function cafeto_is_career_salaries_careers_template($template) {
    return !empty($template) && strpos($template, 'career-') === 0;
}

/**
 * Resolves the mobile topbar source label for a template.
 *
 * Career templates use source_text; salary templates use mobile_source_text.
 *
 * @param string $source_text         Source citation text.
 * @param string $mobile_source_text  Mobile source label text.
 * @param string $mobile_template     Mobile template slug.
 * @return string
 */
function cafeto_get_mobile_source_label($source_text, $mobile_source_text, $mobile_template) {
    if (cafeto_is_career_salaries_careers_template($mobile_template)) {
        return trim((string) $source_text);
    }

    return trim((string) $mobile_source_text);
}

/**
 * Whether a mobile template has source content to render.
 *
 * @param string $source_link         Source URL.
 * @param string $source_text         Source citation text.
 * @param string $mobile_source_text  Mobile source label text.
 * @param string $mobile_template     Mobile template slug.
 * @return bool
 */
function cafeto_has_mobile_source($source_link, $source_text, $mobile_source_text, $mobile_template) {
    $label = cafeto_get_mobile_source_label($source_text, $mobile_source_text, $mobile_template);

    return !empty($source_link) || $label !== '';
}

/**
 * Reorders column definitions to match a preferred field order.
 *
 * Unknown columns are appended after the ordered names.
 *
 * @param array  $columns Column definitions.
 * @param array  $order   Preferred column names.
 * @return array
 */
function cafeto_order_columns_by_names($columns, array $order) {
    $indexed = array();

    foreach ($columns as $column) {
        if (!isset($column['name'])) {
            continue;
        }

        $indexed[$column['name']] = $column;
    }

    $ordered = array();

    foreach ($order as $name) {
        if (isset($indexed[$name])) {
            $ordered[] = $indexed[$name];
            unset($indexed[$name]);
        }
    }

    foreach ($indexed as $column) {
        $ordered[] = $column;
    }

    return $ordered;
}

/**
 * Returns stacked/single-line header markup for career double-row desktop tables.
 *
 * @param string $column_name Database column name.
 * @param string $fallback    Fallback label when no preset exists.
 * @return string Safe HTML markup for the <th> label.
 */
function cafeto_render_career_double_row_th_label($column_name, $fallback = '') {
    $stacked_labels = array(
        'curr_jobs'       => array('Curr.', 'Jobs'),
        'proj_jobs'       => array('Proj.', 'Jobs'),
        'new_jobs'        => array('New', 'Jobs'),
        'avg_ann_opening' => array('Avg. Ann.', 'Openings'),
    );

    $single_labels = array(
        'area'             => 'Area',
        'occupation'       => 'Occupation',
        'job_growth_rate'  => 'Growth %',
    );

    if (isset($stacked_labels[$column_name])) {
        $line_one = esc_html($stacked_labels[$column_name][0]);
        $line_two = esc_html($stacked_labels[$column_name][1]);

        return '<span class="cafeto-th-label cafeto-th-label--stacked"><span class="cafeto-th-label__line">' . $line_one . '</span><span class="cafeto-th-label__line">' . $line_two . '</span></span>';
    }

    if (isset($single_labels[$column_name])) {
        return '<span class="cafeto-th-label cafeto-th-label--single">' . esc_html($single_labels[$column_name]) . '</span>';
    }

    if ($fallback !== '') {
        return '<span class="cafeto-th-label cafeto-th-label--single">' . esc_html($fallback) . '</span>';
    }

    return '';
}

/**
 * Directory path for mobile state icon SVG assets (block root /assets/state-icons/).
 *
 * @return string
 */
function cafeto_salaries_careers_block_path() {
    return trailingslashit(dirname(__DIR__));
}

/**
 * Public URL for mobile state icon SVG assets.
 *
 * @return string
 */
function cafeto_salaries_careers_state_icons_base_url() {
    static $base_url = null;

    if ($base_url === null) {
        $block_path = cafeto_salaries_careers_block_path();
        $base_url = trailingslashit(plugin_dir_url($block_path . 'render.php')) . 'assets/state-icons/';
    }

    return $base_url;
}

/**
 * Resolves a state icon filename from the area label.
 *
 * Preferred naming matches WordPress sanitize_title(): lowercase, hyphenated
 * (e.g. "New York" -> new-york.svg). Legacy Title Case names (Alabama.svg) are
 * also checked during migration.
 *
 * @param string $state_name Area label from the database.
 * @return string Basename of the SVG file, or empty string when not found.
 */
function cafeto_resolve_mobile_state_icon_filename($state_name) {
    $slug = sanitize_title(trim((string) $state_name));

    if ($slug === '') {
        return '';
    }

    $base_path = cafeto_salaries_careers_block_path() . 'assets/state-icons/';
    $title_parts = array_map('ucfirst', explode('-', $slug));

    $candidates = array(
        $slug . '.svg',
        implode('', $title_parts) . '.svg',
        implode('-', $title_parts) . '.svg',
        implode(' ', $title_parts) . '.svg',
    );

    foreach (array_unique($candidates) as $filename) {
        if (is_readable($base_path . $filename)) {
            return $filename;
        }
    }

    return '';
}

/**
 * Public URL for a mobile state icon, or empty when the file is missing.
 *
 * @param string $state_name Area label from the database.
 * @return string
 */
function cafeto_get_mobile_state_icon_url($state_name) {
    $filename = cafeto_resolve_mobile_state_icon_filename($state_name);

    if ($filename === '') {
        return '';
    }

    return cafeto_salaries_careers_state_icons_base_url() . $filename;
}

/**
 * Returns the raw SVG content for a mobile state icon.
 *
 * @param string $state_name Area label from the database.
 * @return string
 */
function cafeto_get_mobile_state_icon_svg($state_name) {
    $filename = cafeto_resolve_mobile_state_icon_filename($state_name);

    if ($filename === '') {
        return '';
    }

    $file_path = cafeto_salaries_careers_block_path() . 'assets/state-icons/' . $filename;
    
    if (file_exists($file_path)) {
        return file_get_contents($file_path);
    }

    return '';
}

