<?php
/**
 * Renders grouped double-row table body rows (area rowspan + stacked occupations).
 *
 * Expects: $grouped_results, $columns, $pinned_us.
 */

$area_column_name = 'area';

foreach ($columns as $column) {
    if (!isset($column['name'])) {
        continue;
    }

    if ($column['name'] === 'area' || stripos($column['name'], 'area') !== false) {
        $area_column_name = $column['name'];
        break;
    }
}

foreach ($grouped_results as $group_index => $group) {
    $group_rows = $group['rows'];
    $row_count = count($group_rows);

    if ($row_count === 0) {
        continue;
    }

    $area_value = $group['area'];
    $is_us_row = cafeto_is_united_states_area($area_value);
    $group_class = ($is_us_row && $pinned_us) ? ' cafeto-us-row' : '';
    $stripe_class = ($group_index % 2 === 0) ? 'cafeto-area-group--odd' : 'cafeto-area-group--even';

    foreach ($group_rows as $row_index => $row) {
        $is_last_in_group = ($row_index === $row_count - 1);
        $tr_classes = trim(
            'cafeto-double-row ' . $stripe_class . $group_class
            . ($is_last_in_group ? ' cafeto-double-row-last-in-group' : '')
        );
        ?>
        <tr
            class="<?php echo esc_attr($tr_classes); ?>"
            data-area-group="<?php echo esc_attr($area_value); ?>"
        >
            <?php foreach ($columns as $column) : ?>
                <?php if ($column['name'] === $area_column_name) : ?>
                    <?php if ($row_index === 0) : ?>
                        <td rowspan="<?php echo esc_attr($row_count); ?>" class="is-col-area">
                            <?php echo esc_html($area_value); ?>
                        </td>
                    <?php endif; ?>
                <?php else : ?>
                    <?php
                    $col_name = isset($column['name']) ? $column['name'] : '';
                    $is_median_col = $col_name === 'median';
                    $is_occupation_col = $col_name === 'occupation' || stripos($col_name, 'occupation') !== false;
                    $td_classes = 'cafeto-double-row-cell';

                    if ($is_median_col) {
                        $td_classes .= ' is-col-median';
                    }

                    if ($is_occupation_col) {
                        $td_classes .= ' is-col-occupation';
                    }

                    if (!$is_last_in_group) {
                        $td_classes .= ' cafeto-double-row-cell--has-divider';
                    }
                    ?>
                    <td class="<?php echo esc_attr($td_classes); ?>">
                        <?php
                        $cell_value = isset($row[$column['name']]) ? $row[$column['name']] : '';
                        echo esc_html($cell_value);
                        ?>
                    </td>
                <?php endif; ?>
            <?php endforeach; ?>
        </tr>
        <?php
    }
}
