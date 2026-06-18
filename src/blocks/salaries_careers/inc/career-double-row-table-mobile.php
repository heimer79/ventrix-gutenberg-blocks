<?php
// inc/career-double-row-table-mobile.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';

$has_source = cafeto_has_mobile_source($source_link, $source_text, $mobile_source_text, $mobile_template ?? '');

$area_key = 'area';
$occupation_key = 'occupation';
$curr_jobs_key = 'curr_jobs';
$proj_jobs_key = 'proj_jobs';

$columns = cafeto_order_columns_by_names($columns, array(
    'area',
    'occupation',
    'curr_jobs',
    'proj_jobs',
    'new_jobs',
    'job_growth_rate',
    'avg_ann_opening',
));

foreach ($columns as $column) {
    if (!isset($column['name'])) {
        continue;
    }

    $name = $column['name'];

    if ($name === 'area' || stripos($name, 'area') !== false) {
        $area_key = $name;
    }

    if ($name === 'occupation' || stripos($name, 'occupation') !== false) {
        $occupation_key = $name;
    }

    if ($name === 'curr_jobs' || stripos($name, 'curr_jobs') !== false) {
        $curr_jobs_key = $name;
    }

    if ($name === 'proj_jobs' || stripos($name, 'proj_jobs') !== false) {
        $proj_jobs_key = $name;
    }
}

$grouped_results = cafeto_group_salary_rows_by_area($results, $area_key);
$table_entry_count = count($grouped_results);
$total_entries = $table_entry_count;

$pinned_us = isset($pinned_us) ? (bool) $pinned_us : true;
?>
<div
    class="<?php echo $current_site; ?>-salaries-careers-table-mobile salaries-careers-table-mobile cafeto-salaries-careers-table-mobile is-template-career-double-row-table-mobile"
    data-entries-per-page="<?php echo esc_attr($entries_per_page); ?>"
    id="<?php echo esc_attr($block_id); ?>"
    data-pin-united-states="<?php echo $pinned_us ? '1' : '0'; ?>"
>
    <div class="cafeto-mobile-topbar">
        <?php if (!empty($mobile_table_label)) : ?>
            <p class="cafeto-mobile-table-label"><?php echo esc_html($mobile_table_label); ?></p>
        <?php elseif ($show_title) : ?>
            <p class="cafeto-mobile-table-label"><?php echo esc_html($table_title); ?></p>
        <?php endif; ?>

        <?php if ($has_source) : ?>
            <?php include __DIR__ . '/partials/mobile-topbar-source.php'; ?>
        <?php endif; ?>
    </div>

    <div class="salaries-careers-table-mobile__content">

        <?php if ($table_entry_count > 0) : ?>
            <div class="ventrix-table-controls cafeto-mobile-controls">
                <div class="ventrix-table-controls__search show-search-input">
                    <input type="text" class="cafeto-mobile-search-input" placeholder="Search states...">
                </div>
            </div>

            <div class="cafeto-mobile-sort-row">
                <span class="cafeto-mobile-sort-label">Sort by:</span>
                <button type="button" class="cafeto-mobile-sort-option" data-sort-key="area">State A-Z</button>
                <button type="button" class="cafeto-mobile-sort-option" data-sort-key="curr_jobs">Curr. Jobs <span class="cafeto-sort-icon">&#x2195;&#xFE0E;</span></button>
                <button type="button" class="cafeto-mobile-sort-option" data-sort-key="proj_jobs">Proj. Jobs <span class="cafeto-sort-icon">&#x2195;&#xFE0E;</span></button>
            </div>
        <?php endif; ?>

        <div class="ventrix-mobile-table-container<?php echo (($table_entry_count > $entries_per_page) && ($table_name === 'career_bridge')) ? ' height-fixed-mobile-career-double-row' : ''; ?>">
            <div class="cafeto-mobile-table cafeto-mobile-cards">
                <?php include __DIR__ . '/partials/mobile-career-double-row-cards.php'; ?>
            </div>
        </div>

    </div>

    <p class="mobile-disclaimer">Data reflects national numbers, not school-specific information.</p>
</div>
