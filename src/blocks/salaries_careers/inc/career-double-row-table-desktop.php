<?php
// inc/career-double-row-table-desktop.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';

$columns = cafeto_order_columns_by_names($columns, array(
    'area',
    'occupation',
    'curr_jobs',
    'proj_jobs',
    'new_jobs',
    'job_growth_rate',
    'avg_ann_opening',
));

$area_key = 'area';
foreach ($columns as $column) {
    if (!isset($column['name'])) {
        continue;
    }
    if ($column['name'] === 'area' || stripos($column['name'], 'area') !== false) {
        $area_key = $column['name'];
        break;
    }
}

$grouped_results = cafeto_group_salary_rows_by_area($results, $area_key);
$table_entry_count = count($grouped_results);
$total_entries = $table_entry_count;

?>
<div class="<?php echo $current_site; ?>-salaries-careers-table-desktop salaries-careers-table-desktop cafeto-salaries-careers-table-desktop is-template-career-double-row-table-desktop"
    data-entries-per-page="<?php echo esc_attr($entries_per_page); ?>" id="<?php echo esc_attr($block_id); ?>">

    <?php if ($show_title): ?>
        <h2><?php echo esc_html($table_title); ?></h2>
    <?php endif; ?>

    <?php if ($table_entry_count > 0): ?>
        <div class="ventrix-table-controls">
            <div class="show-entries">
                Show
                <select class="cafeto-entries-select px-2 py-1">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
            </div>
            <div class="show-search-input">
                <input type="text" class="cafeto-search-input" placeholder="Search states...">
            </div>
        </div>
    <?php endif; ?>

    <div class="ventrix-table-container <?php echo ($table_entry_count > $entries_per_page ? 'height-fixed-desktop' : ''); ?>">
        <table class="ventrix-table">
            <thead>
                <tr>
                    <?php foreach ($columns as $column) : ?>
                        <?php
                        $col_name = isset($column['name']) ? $column['name'] : '';
                        $th_classes = array();

                        if ($col_name === $area_key || stripos($col_name, 'area') !== false) {
                            $th_classes[] = 'is-col-area';
                            $th_classes[] = 'is-th-single-line';
                        }

                        if ($col_name === 'occupation' || stripos($col_name, 'occupation') !== false) {
                            $th_classes[] = 'is-col-occupation';
                            $th_classes[] = 'is-th-single-line';
                        }

                        if ($col_name === 'job_growth_rate') {
                            $th_classes[] = 'is-th-single-line';
                        }

                        if (in_array($col_name, array('curr_jobs', 'proj_jobs', 'new_jobs', 'avg_ann_opening'), true)) {
                            $th_classes[] = 'is-th-stacked';
                        }

                        $th_class_attr = !empty($th_classes) ? ' class="' . esc_attr(implode(' ', $th_classes)) . '"' : '';
                        $header_label = cafeto_render_career_double_row_th_label(
                            $col_name,
                            isset($column['displayName']) ? $column['displayName'] : ''
                        );
                        ?>
                        <th<?php echo $th_class_attr; ?>>
                            <?php echo $header_label; ?>
                            <span class="ml-1 cafeto-sort-icon">&#x2195;&#xFE0E;</span>
                        </th>
                    <?php endforeach; ?>
                </tr>
            </thead>
            <tbody>
                <?php include __DIR__ . '/partials/desktop-double-row-rows.php'; ?>
            </tbody>
        </table>
    </div>

    <?php include __DIR__ . '/table-footer.php'; ?>
</div>
