<?php
/**
 * Renders grouped career double-row mobile cards (two occupations per area).
 *
 * Expects: $grouped_results, $columns, $pinned_us, $area_key, $occupation_key.
 */

foreach ($grouped_results as $group) {
    $group_rows = $group['rows'];
    $row_count = count($group_rows);

    if ($row_count === 0) {
        continue;
    }

    $state_name = $group['area'];
    $state_slug = sanitize_title($state_name);
    $is_us_row = cafeto_is_united_states_area($state_name);

    $occupation_headers = array();
    foreach ($group_rows as $row) {
        $occupation_headers[] = isset($row[$occupation_key]) ? trim((string) $row[$occupation_key]) : '';
    }

    $sort_curr_jobs = isset($group_rows[0][$curr_jobs_key]) ? $group_rows[0][$curr_jobs_key] : '';
    $sort_proj_jobs = isset($group_rows[0][$proj_jobs_key]) ? $group_rows[0][$proj_jobs_key] : '';
    $row_search_blob = implode(' ', array_map(function ($row) {
        return implode(' ', array_map('strval', $row));
    }, $group_rows));
    ?>
    <article
        class="cafeto-mobile-card cafeto-career-double-row-mobile-card<?php echo ($is_us_row && $pinned_us) ? ' cafeto-us-row' : ''; ?>"
        data-state="<?php echo esc_attr($state_name); ?>"
        data-state-slug="<?php echo esc_attr($state_slug); ?>"
        data-sort-area="<?php echo esc_attr($state_name); ?>"
        data-sort-curr_jobs="<?php echo esc_attr($sort_curr_jobs); ?>"
        data-sort-proj_jobs="<?php echo esc_attr($sort_proj_jobs); ?>"
        data-search="<?php echo esc_attr($row_search_blob); ?>"
    >
        <div class="cafeto-career-double-row-mobile-card__header">
            <div class="cafeto-mobile-card__state-wrap">
                <p class="cafeto-mobile-card__state"><?php echo esc_html($state_name); ?></p>
            </div>
            <?php if (!empty($occupation_headers)) : ?>
                <div class="cafeto-career-double-row-mobile-card__occ-headers" aria-hidden="true">
                    <?php foreach ($occupation_headers as $occupation_header) : ?>
                        <span class="cafeto-career-double-row-mobile-card__occ-header"><?php echo esc_html($occupation_header); ?></span>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <div class="cafeto-career-double-row-mobile-card__divider" aria-hidden="true"></div>

        <div class="cafeto-career-double-row-mobile-card__metrics">
            <?php foreach ($columns as $column) : ?>
                <?php
                if (!isset($column['name'])) {
                    continue;
                }

                $col_name = $column['name'];
                if ($col_name === $area_key || $col_name === $occupation_key) {
                    continue;
                }
                ?>
                <div class="cafeto-career-double-row-mobile-card__row">
                    <span class="cafeto-career-double-row-mobile-card__label"><?php echo esc_html($column['displayName']); ?></span>
                    <span class="cafeto-career-double-row-mobile-card__values">
                        <?php foreach ($group_rows as $row) : ?>
                            <?php $metric_value = isset($row[$col_name]) ? $row[$col_name] : ''; ?>
                            <span class="cafeto-career-double-row-mobile-card__value"><?php echo esc_html($metric_value); ?></span>
                        <?php endforeach; ?>
                    </span>
                </div>
            <?php endforeach; ?>
        </div>
    </article>
    <?php
}
