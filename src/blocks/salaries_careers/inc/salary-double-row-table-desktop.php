<?php
// inc/desktop-table.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';

?>
<div class="<?php echo $current_site; ?>-salaries-careers-table-desktop salaries-careers-table-desktop cafeto-salaries-careers-table-desktop is-template-salary-double-row-table-desktop"
    data-entries-per-page="<?php echo esc_attr($entries_per_page); ?>" id="<?php echo esc_attr($block_id); ?>">
    <?php if ($show_title): ?>
        <!-- Display table title if $show_title is true -->
        <h2><?php echo esc_html($table_title); ?></h2>
    <?php endif; ?>
    <?php if ($total_entries > $entries_per_page): // show filters and pagination only if there are more than 10 entries ?>
        <div class="ventrix-table-controls mb-4 flex justify-between items-center">
            <div class="show-entries">
                <!-- Dropdown to select number of entries to show -->
                Show 
                <select class="cafeto-entries-select px-2 py-1">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
            </div>
            <div class="show-search-input">
                <!-- Search input field -->
                Search: <input type="text" class="cafeto-search-input border rounded px-2 py-1">
            </div>
        </div>
    <?php endif; ?>

    <div class="ventrix-table-container <?php echo ($total_entries > $entries_per_page ? 'height-fixed-desktop' : ''); ?>">
        <table class="ventrix-table">
            <thead class="bg-white text-[#6D57C3]">
                <tr>
                    <?php foreach ($columns as $column) : ?>
                        <!-- Table header with sortable columns -->
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
                            <!-- Table cell with data -->
                            <td class="px-6 py-4 whitespace-nowrap">
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
