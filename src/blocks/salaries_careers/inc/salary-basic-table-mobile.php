<?php
// inc/mobile-table.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';

$has_source = !empty($source_text) || !empty($source_link) || !empty($source_text_hyperlink);

$area_key = 'area';
$median_key = 'median';
$p75_key = 'n_75th_percentile';
$p90_key = 'n_90th_percentile';

foreach ($columns as $column) {
    if (!isset($column['name'])) {
        continue;
    }
    $name = $column['name'];
    if (strpos($name, '75') !== false) {
        $p75_key = $name;
    }
    if (strpos($name, '90') !== false) {
        $p90_key = $name;
    }
}
?>

<?php
$pinned_us = isset($pinned_us) ? (bool) $pinned_us : true;
?>
<div
    class="<?php echo $current_site; ?>-salaries-careers-table-mobile salaries-careers-table-mobile cafeto-salaries-careers-table-mobile is-template-salary-basic-table-mobile"
    data-entries-per-page="<?php echo esc_attr($entries_per_page); ?>"
    id="<?php echo esc_attr($block_id); ?>"
    data-pin-united-states="<?php echo $pinned_us ? '1' : '0'; ?>"
>

    <!-- Table Title -->
    <div class="cafeto-mobile-topbar">
        <?php if (!empty($mobile_table_label)) : ?>
            <p class="cafeto-mobile-table-label"><?php echo esc_html($mobile_table_label); ?></p>
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

    <!-- Filters -->
    <?php if ($total_entries > 0): ?>
        <div class="ventrix-table-controls cafeto-mobile-controls">
            <div class="ventrix-table-controls__search show-search-input">
                <input type="text" class="cafeto-mobile-search-input" placeholder="Search states...">
            </div>
        </div>

        <div class="cafeto-mobile-sort-row">
            <span class="cafeto-mobile-sort-label">Sort by:</span>
            <button type="button" class="cafeto-mobile-sort-option" data-sort-key="area">State A-Z</button>
            <button type="button" class="cafeto-mobile-sort-option" data-sort-key="median">Median <span class="cafeto-sort-icon">↕</span></button>
            <button type="button" class="cafeto-mobile-sort-option" data-sort-key="p75">75th <span class="cafeto-sort-icon">↕</span></button>
            <button type="button" class="cafeto-mobile-sort-option" data-sort-key="p90">90th <span class="cafeto-sort-icon">↕</span></button>
        </div>
    <?php endif; ?>

    <div class="ventrix-mobile-table-container <?php echo ((($total_entries > $entries_per_page) && ( $table_name === 'salary_standard'))  ? 'height-fixed-mobile-salary-standard' : ''); ?>
    <?php echo ((($total_entries > $entries_per_page) && ( $table_name === 'career_bridge'))  ? 'height-fixed-mobile-career-bridge' : ''); ?>
        <?php echo ((($total_entries > $entries_per_page) && ( $table_name === 'career_standard'))  ? 'height-fixed-mobile-career-standard' : ''); ?>">
        <div class="cafeto-mobile-table cafeto-mobile-cards">
            <?php foreach ($results as $row): ?>
                <?php
                $state_name = isset($row[$area_key]) ? trim((string) $row[$area_key]) : '';
                $state_slug = sanitize_title($state_name);
                $area_value = isset($row['area']) ? strtolower(trim((string) $row['area'])) : '';
                $is_us_row = in_array($area_value, array('united states', 'u.s.', 'us'));
                $state_icon_svg = (!$is_us_row && function_exists('cafeto_get_mobile_state_icon_svg'))
                    ? cafeto_get_mobile_state_icon_svg($state_name)
                    : '';
                $median_value = isset($row[$median_key]) ? $row[$median_key] : '';
                $p75_value = isset($row[$p75_key]) ? $row[$p75_key] : '';
                $p90_value = isset($row[$p90_key]) ? $row[$p90_key] : '';
                $row_search_blob = implode(' ', array_map('strval', $row));
                ?>
                <article
                    class="cafeto-mobile-card<?php echo ($is_us_row && $pinned_us) ? ' cafeto-us-row' : ''; ?>"
                    data-state="<?php echo esc_attr($state_name); ?>"
                    data-state-slug="<?php echo esc_attr($state_slug); ?>"
                    data-sort-area="<?php echo esc_attr($state_name); ?>"
                    data-sort-median="<?php echo esc_attr($median_value); ?>"
                    data-sort-p75="<?php echo esc_attr($p75_value); ?>"
                    data-sort-p90="<?php echo esc_attr($p90_value); ?>"
                    data-search="<?php echo esc_attr($row_search_blob); ?>"
                >
                    <div class="cafeto-mobile-card__header">
                        <div class="cafeto-mobile-card__state-wrap">
                            <?php if ($state_icon_svg) : ?>
                                <div class="cafeto-mobile-state-icon" aria-hidden="true">
                                    <?php echo $state_icon_svg; ?>
                                </div>
                            <?php endif; ?>
                            <p class="cafeto-mobile-card__state"><?php echo esc_html($state_name); ?></p>
                        </div>
                        <p class="cafeto-mobile-card__median"><?php echo esc_html($median_value); ?></p>
                    </div>
                    <div class="cafeto-mobile-card__metrics">
                        <span class="cafeto-mobile-chip">75th: <span class="cafeto-mobile-chip__value"><?php echo esc_html($p75_value); ?></span></span>
                        <span class="cafeto-mobile-chip">90th: <span class="cafeto-mobile-chip__value"><?php echo esc_html($p90_value); ?></span></span>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>

    </div>

    <p class="mobile-disclaimer">Data reflects national numbers, not school-specific information.</p>
</div>
