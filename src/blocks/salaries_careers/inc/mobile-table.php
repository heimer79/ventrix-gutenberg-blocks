<?php
// inc/mobile-table.php
?>
<div class="cafeto-salaries-careers-table-mobile" id="<?php echo esc_attr($block_id); ?>">
    <?php if ($show_title): ?>
        <h2><?php echo esc_html($table_title); ?></h2>
    <?php endif; ?>
    <?php if ($total_entries > 5): // show filters and pagination only if there are more than 5 entries ?>
        <div class="cafeto-table-controls flex justify-between items-center">
            <div class="cafeto-table-controls__filters">
                Show 
                <select class="cafeto-mobile-entries-select border rounded px-2 py-1">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
                <div class="cafeto-mobile-filter-options">
                    Filters <span class="cafeto-sort-icon ml-1">↕</span>
                    <div class="cafeto-options-panel">
                        <ul>
                            <?php foreach ($columns as $column) : ?>
                                <li class="cafeto-mobile-column-header px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer whitespace-nowrap">
                                    <?php echo esc_html($column['displayName']); ?>
                                    <span class="cafeto-sort-icon ml-1">↕</span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="cafeto-table-controls__search">
                <input type="text" class="cafeto-mobile-search-input border rounded px-2 py-1" placeholder="Search...">
            </div>
        </div>

    <?php endif; ?>
    <div class="cafeto-mobile-table-container overflow-x-auto">
        <table class="cafeto-mobile-table">
            <?php foreach ($results as $row): ?>
                <thead class="cafeto-mobile-table-header bg-white text-[#6D57C3]">
                    <tr>
                        <th colspan="2"><?php echo esc_html($row['area']); ?></th>
                    </tr>
                </thead>
                <tbody class="cafeto-mobile-table-body bg-white divide-y divide-gray-200">
                    <?php foreach ($columns as $column) : ?>
                        <?php if (strtolower($column['displayName']) !== 'area'):  ?>
                            <tr>
                                <td class="px-6 py-4"><?php echo esc_html($column['displayName']); ?></td>
                                <td class="px-6 py-4">
                                    <?php
                                    $cell_value = isset($row[$column['name']]) ? $row[$column['name']] : '';
                                    echo esc_html($cell_value);
                                    ?>
                                </td>
                            </tr>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </tbody>
            <?php endforeach; ?>
        </table>
    </div>
    <?php if ($total_entries > 5): // show pagination only if there are more than 5 entries ?>
        <div class="cafeto-mobile-pagination mt-4 flex flex-col sm:flex-row justify-between items-center">
            <div class="mb-2 sm:mb-0">
                Showing <span class="cafeto-mobile-showing-start">1</span> to <span class="cafeto-mobile-showing-end">10</span> of <span class="cafeto-mobile-total-entries"><?php echo esc_html($total_entries); ?></span> entries
            </div>
            <div class="cafeto-mobile-pagination__buttons">
                <button class="cafeto-mobile-prev-page mr-2">Previous</button>
                <button class="cafeto-mobile-next-page">Next</button>
            </div>
        </div>
    <?php endif; ?>

    <!-- Display Source Text and Link -->
    <?php if (!empty($source_text) && !empty($source_link)): ?>
        <?php if (!empty($source_text_hyperlink)): ?>
            <p class="table-source">Source: <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($source_text_hyperlink); ?></a>, <?php echo esc_html($source_text); ?> </p>
        <?php else: ?>
            <p class="table-source">Source: <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($source_text); ?></a></p>
        <?php endif; ?>

        <!-- Add the next <p> only if the $source_text is equal to "Bureau of Labor Statistics" -->
        <?php if (
            stripos(trim($source_text), "Bureau of Labor Statistics") !== false || 
            stripos(trim($source_text), "Projections Central") !== false
        ): ?>
            <p class="table-source-italics">Data based on national numbers, not school-specific information.</p>
        <?php endif; ?>

    <?php endif; ?>
</div>
