<?php
// inc/desktop-table.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';

?>
<div class="<?php echo $current_site; ?>-salaries-careers-table-desktop salaries-careers-table-desktop cafeto-salaries-careers-table-desktop is-template-salary-basic-table-desktop" id="<?php echo esc_attr($block_id); ?>">

    <!-- Title -->
    <?php if ($show_title): ?>
        <!-- Display table title if $show_title is true -->
        <h2><?php echo esc_html($table_title); ?></h2>
    <?php endif; ?>

    <!-- Filters and Pagination -->
    <?php if ($total_entries > 10): // show filters and pagination only if there are more than 10 entries ?>
        <div class="ventrix-table-controls mb-4 flex justify-between items-center">

            <!-- Dropdown to select number of entries to show -->
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

            <!-- Search input field -->
            <div class="show-search-input">
                <input type="text" class="cafeto-search-input" placeholder="Search states...">
            </div>
        </div>
    <?php endif; ?>

    <!-- Mobile Table Label -->
    <?php if (!empty($mobile_table_label)) : ?>
        <p class="mobile-table-label"><?php echo esc_html($mobile_table_label); ?></p>
    <?php endif; ?>

    <!-- Table -->
    <div class="ventrix-table-container <?php echo ($total_entries > 10 ? 'height-fixed-desktop' : ''); ?>">
        <table class="ventrix-table">
            <thead>
                <tr>
                    <?php foreach ($columns as $column) : ?>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer whitespace-nowrap">
                            <?php echo esc_html($column['displayName']); ?>
                            <span class="ml-1 cafeto-sort-icon">↕</span>
                        </th>
                    <?php endforeach; ?>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($results as $row) : ?>
                    <?php
                    // Determine if the row is a US row based on the 'area' value
                    $area_value = isset($row['area']) ? strtolower(trim($row['area'])) : '';
                    $is_us_row = in_array($area_value, array('united states', 'u.s.', 'us'));
                    $row_class = ($is_us_row && $pinned_us) ? 'cafeto-us-row' : '';
                    ?>
                    <tr class="<?php echo esc_attr($row_class); ?>">
                        <?php foreach ($columns as $column) : ?>
                            <?php
                            $is_median_col = isset($column['name']) && $column['name'] === 'median';
                            $td_classes = 'px-6 py-4 whitespace-nowrap';
                            if ($is_median_col) {
                                $td_classes .= ' is-col-median';
                            }
                            ?>
                            <td class="<?php echo esc_attr($td_classes); ?>">
                                <?php
                                $cell_value = isset($row[$column['name']]) ? $row[$column['name']] : '';
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
