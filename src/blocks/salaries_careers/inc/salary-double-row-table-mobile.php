<?php
// inc/salary-double-row-table-mobile.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';

$has_source = !empty($source_text) || !empty($source_link) || !empty($source_text_hyperlink);

$area_key = 'area';
$occupation_key = 'occupation';
$median_key = 'median';

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

    if (stripos($name, 'median') !== false) {
        $median_key = $name;
    }
}

$grouped_results = cafeto_group_salary_rows_by_area($results, $area_key);
$table_entry_count = count($grouped_results);
$total_entries = $table_entry_count;

$pinned_us = isset($pinned_us) ? (bool) $pinned_us : true;
?>
<div
    class="<?php echo $current_site; ?>-salaries-careers-table-mobile salaries-careers-table-mobile cafeto-salaries-careers-table-mobile is-template-salary-double-row-table-mobile"
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
            <p class="cafeto-mobile-source">
                <?php if (!empty($source_link)) : ?>
                    <?php
                    $mobile_source_label = $source_text;
                    if ($mobile_source_label === '' && !empty($source_text_hyperlink)) {
                        $mobile_source_label = $source_text_hyperlink;
                    }
                    if ($mobile_source_label === '') {
                        $mobile_source_label = $source_link;
                    }
                    ?>
                    <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($mobile_source_label); ?></a>
                <?php elseif (!empty($source_text)) : ?>
                    <?php echo esc_html($source_text); ?>
                <?php elseif (!empty($source_text_hyperlink)) : ?>
                    <?php echo esc_html($source_text_hyperlink); ?>
                <?php endif; ?>
            </p>
        <?php endif; ?>
    </div>

    <div class="salaries-careers-table-mobile__content">

        <?php if ($table_entry_count > 0) : ?>

            <div class="cafeto-mobile-sort-row">
                <span class="cafeto-mobile-sort-label">Sort by:</span>
                <button type="button" class="cafeto-mobile-sort-option" data-sort-key="area">State A-Z</button>
                <button type="button" class="cafeto-mobile-sort-option" data-sort-key="rn-median">RN Median <span class="cafeto-sort-icon">&#x2195;&#xFE0E;</span></button>
                <button type="button" class="cafeto-mobile-sort-option" data-sort-key="lpn-median">LPN Median <span class="cafeto-sort-icon">&#x2195;&#xFE0E;</span></button>
            </div>
        <?php endif; ?>

        <div class="ventrix-mobile-table-container<?php echo (($table_entry_count > $entries_per_page) && ($table_name === 'salary_bridge')) ? ' height-fixed-mobile-salary-bridge' : ''; ?>">
            <div class="cafeto-mobile-table cafeto-mobile-cards">
                <?php include __DIR__ . '/partials/mobile-double-row-cards.php'; ?>
            </div>
        </div>

    </div>

    <p class="mobile-disclaimer">Data reflects national numbers, not school-specific information.</p>
</div>
