<?php
// inc/career-basic-table-desktop.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';

?>
<div class="<?php echo $current_site; ?>-salaries-careers-table-desktop salaries-careers-table-desktop cafeto-salaries-careers-table-desktop is-template-career-basic-table-desktop"
    data-entries-per-page="<?php echo esc_attr($entries_per_page); ?>" id="<?php echo esc_attr($block_id); ?>">

    <?php if ($show_title): ?>
        <h2><?php echo esc_html($table_title); ?></h2>
    <?php endif; ?>

    <?php if ($total_entries > $entries_per_page): ?>
        <div class="ventrix-table-controls">
            <div class="show-entries">
                Show
                <select class="cafeto-entries-select">
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

    <?php if (!empty($mobile_table_label)) : ?>
        <p class="mobile-table-label"><?php echo esc_html($mobile_table_label); ?></p>
    <?php endif; ?>

    <div class="ventrix-table-container <?php echo ($total_entries > $entries_per_page ? 'height-fixed-desktop' : ''); ?>">
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
                <?php foreach ($results as $row) : ?>
                    <?php
                    $area_value = isset($row['area']) ? strtolower(trim($row['area'])) : '';
                    $is_us_row = in_array($area_value, array('united states', 'u.s.', 'us'), true);
                    $row_class = ($is_us_row && $pinned_us) ? 'cafeto-us-row' : '';
                    ?>
                    <tr class="<?php echo esc_attr($row_class); ?>">
                        <?php foreach ($columns as $column) : ?>
                            <td>
                                <?php
                                $col_name = isset($column['name']) ? $column['name'] : '';
                                $cell_value = isset($row[$col_name]) ? $row[$col_name] : '';
                                echo esc_html($cell_value);
                                ?>
                            </td>
                        <?php endforeach; ?>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <?php include __DIR__ . '/table-footer.php'; ?>
</div>
