<?php
/**
 * Renders grouped double-row mobile cards (two occupations per area).
 *
 * Expects: $grouped_results, $columns, $pinned_us, $area_key, $occupation_key, $median_key.
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
    $state_icon_svg = (!$is_us_row && function_exists('cafeto_get_mobile_state_icon_svg'))
        ? cafeto_get_mobile_state_icon_svg($state_name)
        : '';

    $lpn_median = isset($group_rows[0][$median_key]) ? $group_rows[0][$median_key] : '';
    $rn_median = isset($group_rows[1][$median_key]) ? $group_rows[1][$median_key] : '';
    $comparison = cafeto_get_double_row_mobile_comparison($group_rows, $median_key);
    $row_search_blob = implode(' ', array_map(function ($row) {
        return implode(' ', array_map('strval', $row));
    }, $group_rows));
    ?>
    <article
        class="cafeto-mobile-card cafeto-double-row-mobile-card<?php echo ($is_us_row && $pinned_us) ? ' cafeto-us-row' : ''; ?>"
        data-state="<?php echo esc_attr($state_name); ?>"
        data-state-slug="<?php echo esc_attr($state_slug); ?>"
        data-sort-area="<?php echo esc_attr($state_name); ?>"
        data-sort-lpn-median="<?php echo esc_attr($lpn_median); ?>"
        data-sort-rn-median="<?php echo esc_attr($rn_median); ?>"
        data-search="<?php echo esc_attr($row_search_blob); ?>"
    >
        <div class="cafeto-mobile-card__header cafeto-double-row-mobile-card__header">
            <div class="cafeto-mobile-card__state-wrap">
                <?php if ($state_icon_svg) : ?>
                    <div class="cafeto-mobile-state-icon" aria-hidden="true">
                        <?php echo $state_icon_svg; ?>
                    </div>
                <?php endif; ?>
                <p class="cafeto-mobile-card__state"><?php echo esc_html($state_name); ?></p>
            </div>
        </div>

        <div class="cafeto-double-row-mobile-card__rows">
            <?php foreach ($group_rows as $row_index => $row) : ?>
                <?php
                $occupation_value = isset($row[$occupation_key]) ? $row[$occupation_key] : '';
                $median_value = isset($row[$median_key]) ? $row[$median_key] : '';
                $occupation_modifier = ($row_index === 0) ? 'lpn' : 'rn';
                ?>
                <div class="cafeto-double-row-mobile-card__row">
                    <span class="cafeto-double-row-mobile-card__occupation cafeto-double-row-mobile-card__occupation--<?php echo esc_attr($occupation_modifier); ?>">
                        <?php echo esc_html($occupation_value); ?>
                    </span>
                    <span class="cafeto-double-row-mobile-card__value"><?php echo esc_html($median_value); ?></span>
                </div>
            <?php endforeach; ?>
        </div>

        <?php if ($comparison) : ?>
            <div class="cafeto-double-row-mobile-card__footer">
                <span class="cafeto-double-row-mobile-card__footer-label"><?php echo esc_html($comparison['label']); ?></span>
                <span class="cafeto-double-row-mobile-card__footer-badge"><?php echo esc_html($comparison['badge']); ?></span>
            </div>
        <?php endif; ?>
    </article>
    <?php
}
