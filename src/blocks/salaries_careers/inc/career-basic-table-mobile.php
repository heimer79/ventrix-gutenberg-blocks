<?php
// inc/career-basic-table-mobile.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';

$has_source = !empty($source_text) || !empty($source_link) || !empty($source_text_hyperlink);

$area_key = 'area';
$curr_jobs_key = 'curr_jobs';
$proj_jobs_key = 'proj_jobs';
$new_jobs_key = 'new_jobs';
$growth_key = 'job_growth_rate';
$avg_opening_key = 'avg_ann_opening';

foreach ($columns as $column) {
    if (!isset($column['name'])) {
        continue;
    }
    $name = $column['name'];
    if ($name === 'area' || stripos($name, 'area') !== false) {
        $area_key = $name;
    }
    if ($name === 'curr_jobs' || stripos($name, 'curr_jobs') !== false) {
        $curr_jobs_key = $name;
    }
    if ($name === 'proj_jobs' || stripos($name, 'proj_jobs') !== false) {
        $proj_jobs_key = $name;
    }
    if ($name === 'new_jobs' || stripos($name, 'new_jobs') !== false) {
        $new_jobs_key = $name;
    }
    if ($name === 'job_growth_rate' || stripos($name, 'growth') !== false) {
        $growth_key = $name;
    }
    if ($name === 'avg_ann_opening' || stripos($name, 'opening') !== false) {
        $avg_opening_key = $name;
    }
}

$pinned_us = isset($pinned_us) ? (bool) $pinned_us : true;
?>
<div
    class="<?php echo $current_site; ?>-salaries-careers-table-mobile salaries-careers-table-mobile cafeto-salaries-careers-table-mobile is-template-career-basic-table-mobile"
    data-entries-per-page="<?php echo esc_attr($entries_per_page); ?>"
    id="<?php echo esc_attr($block_id); ?>"
    data-pin-united-states="<?php echo $pinned_us ? '1' : '0'; ?>"
>
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

    <?php if ($total_entries > 0): ?>
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
            <button type="button" class="cafeto-mobile-sort-option" data-sort-key="new_jobs">New Jobs <span class="cafeto-sort-icon">&#x2195;&#xFE0E;</span></button>
            <button type="button" class="cafeto-mobile-sort-option" data-sort-key="job_growth_rate">Growth % <span class="cafeto-sort-icon">&#x2195;&#xFE0E;</span></button>
            <button type="button" class="cafeto-mobile-sort-option" data-sort-key="avg_ann_opening">Avg. Openings <span class="cafeto-sort-icon">&#x2195;&#xFE0E;</span></button>
        </div>
    <?php endif; ?>

    <div class="ventrix-mobile-table-container <?php echo ((($total_entries > $entries_per_page) && ($table_name === 'career_standard')) ? 'height-fixed-mobile-career-standard' : ''); ?>
    <?php echo ((($total_entries > $entries_per_page) && ($table_name === 'career_bridge')) ? 'height-fixed-mobile-career-bridge' : ''); ?>">
        <div class="cafeto-mobile-table cafeto-mobile-cards">
            <?php foreach ($results as $row): ?>
                <?php
                $state_name = isset($row[$area_key]) ? trim((string) $row[$area_key]) : '';
                $state_slug = sanitize_title($state_name);
                $area_value = isset($row['area']) ? strtolower(trim((string) $row['area'])) : '';
                $is_us_row = in_array($area_value, array('united states', 'u.s.', 'us'), true);
                $state_icon_svg = (!$is_us_row && function_exists('cafeto_get_mobile_state_icon_svg'))
                    ? cafeto_get_mobile_state_icon_svg($state_name)
                    : '';
                $curr_jobs_value = isset($row[$curr_jobs_key]) ? $row[$curr_jobs_key] : '';
                $proj_jobs_value = isset($row[$proj_jobs_key]) ? $row[$proj_jobs_key] : '';
                $new_jobs_value = isset($row[$new_jobs_key]) ? $row[$new_jobs_key] : '';
                $growth_value = isset($row[$growth_key]) ? $row[$growth_key] : '';
                $avg_opening_value = isset($row[$avg_opening_key]) ? $row[$avg_opening_key] : '';
                $row_search_blob = implode(' ', array_map('strval', $row));
                ?>
                <article
                    class="cafeto-mobile-card cafeto-career-basic-mobile-card<?php echo ($is_us_row && $pinned_us) ? ' cafeto-us-row' : ''; ?>"
                    data-state="<?php echo esc_attr($state_name); ?>"
                    data-state-slug="<?php echo esc_attr($state_slug); ?>"
                    data-sort-area="<?php echo esc_attr($state_name); ?>"
                    data-sort-curr_jobs="<?php echo esc_attr($curr_jobs_value); ?>"
                    data-sort-proj_jobs="<?php echo esc_attr($proj_jobs_value); ?>"
                    data-sort-new_jobs="<?php echo esc_attr($new_jobs_value); ?>"
                    data-sort-job_growth_rate="<?php echo esc_attr($growth_value); ?>"
                    data-sort-avg_ann_opening="<?php echo esc_attr($avg_opening_value); ?>"
                    data-search="<?php echo esc_attr($row_search_blob); ?>"
                >
                    <div class="cafeto-career-basic-mobile-card__header">
                        <div class="cafeto-mobile-card__state-wrap">
                            <?php if ($state_icon_svg) : ?>
                                <div class="cafeto-mobile-state-icon" aria-hidden="true">
                                    <?php echo $state_icon_svg; ?>
                                </div>
                            <?php endif; ?>
                            <p class="cafeto-mobile-card__state"><?php echo esc_html($state_name); ?></p>
                        </div>
                    </div>

                    <div class="cafeto-career-basic-mobile-card__divider" aria-hidden="true"></div>

                    <div class="cafeto-career-basic-mobile-card__metrics">
                        <?php foreach ($columns as $column) : ?>
                            <?php
                            if (!isset($column['name']) || $column['name'] === $area_key) {
                                continue;
                            }
                            $metric_value = isset($row[$column['name']]) ? $row[$column['name']] : '';
                            ?>
                            <div class="cafeto-career-basic-mobile-card__row">
                                <span class="cafeto-career-basic-mobile-card__label"><?php echo esc_html($column['displayName']); ?></span>
                                <span class="cafeto-career-basic-mobile-card__value"><?php echo esc_html($metric_value); ?></span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>

    </div>

    <p class="mobile-disclaimer">Data reflects national numbers, not school-specific information.</p>
</div>
