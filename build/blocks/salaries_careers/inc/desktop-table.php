<?php
// inc/desktop-table.php
?>
<div class="cafeto-salaries-careers-table-desktop" id="<?php echo esc_attr($block_id); ?>">
    <?php if ($show_title): ?>
        <!-- Display table title if $show_title is true -->
        <h2><?php echo esc_html($table_title); ?></h2>
    <?php endif; ?>
    <div class="cafeto-table-controls mb-4 flex justify-between items-center">
        <div>
            <!-- Dropdown to select number of entries to show -->
            Show 
            <select class="cafeto-entries-select border rounded px-2 py-1">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            entries
        </div>
        <div>
            <!-- Search input field -->
            Search: <input type="text" class="cafeto-search-input border rounded px-2 py-1">
        </div>
    </div>
    <div class="cafeto-table-container overflow-x-auto">
        <table class="cafeto-table">
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
            <tbody class="bg-white divide-y divide-gray-200">
                <?php foreach ($results as $row) : ?>
                    <?php
                    // Determine if the row is a US row based on the 'area' value
                    $area_value = isset($row['area']) ? strtolower(trim($row['area'])) : '';
                    $is_us_row = in_array($area_value, array('united states', 'u.s.', 'us'));
                    $row_class = $is_us_row ? 'cafeto-us-row' : '';
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
    <div class="cafeto-pagination mt-4 flex flex-col sm:flex-row justify-between items-center">
        <div class="mb-2 sm:mb-0">
            <!-- Pagination information -->
            Showing <span class="cafeto-showing-start">1</span> to <span class="cafeto-showing-end">10</span> of <span class="cafeto-total-entries"><?php echo esc_html($total_entries); ?></span> entries
        </div>
        <div>
            <!-- Pagination buttons -->
            <button class="cafeto-prev-page mr-2">Previous</button>
            <button class="cafeto-next-page">Next</button>
        </div>
    </div>
</div>
