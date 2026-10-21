<?php
// inc/salary-double-row-table-desktop.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';

$grouped_results = cafeto_group_salary_rows_by_area($results);
$table_entry_count = count($grouped_results);
$total_entries = $table_entry_count;

?>
<div class="<?php echo $current_site; ?>-salaries-careers-table-desktop salaries-careers-table-desktop cafeto-salaries-careers-table-desktop is-template-salary-double-row-table-desktop"
    data-entries-per-page="<?php echo esc_attr($entries_per_page); ?>" id="<?php echo esc_attr($block_id); ?>">

    <!-- Display table title if $show_title is true -->
    <?php if ($show_title): ?>
        <h2><?php echo esc_html($table_title); ?></h2>
    <?php endif; ?>

    <?php if ($table_entry_count > $entries_per_page): ?>
        <div class="ventrix-table-controls">
            <div class="show-search-input">
                <input type="text" class="cafeto-search-input" placeholder="Search states...">
            </div>
        </div>
    <?php endif; ?>

    <!-- Table -->
    <div class="ventrix-table-container <?php echo ($table_entry_count > $entries_per_page ? 'height-fixed-desktop' : ''); ?>">
        <table class="ventrix-table">
            <thead>
                <tr>
                    <?php foreach ($columns as $column) : ?>
                        <th>
                            <?php echo esc_html($column['displayName']); ?>
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
