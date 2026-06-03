<?php
// inc/mobile-table.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';
?>
<div class="<?php echo $current_site; ?>-salaries-careers-table-mobile salaries-careers-table-mobile cafeto-salaries-careers-table-mobile is-template-career-basic-table-mobile"
    data-entries-per-page="<?php echo esc_attr($entries_per_page); ?>" id="<?php echo esc_attr($block_id); ?>">
    <?php if ($show_title): ?>
        <h2><?php echo esc_html($table_title); ?></h2>
    <?php endif; ?>
    <?php if ($total_entries > $entries_per_page): // show filters and pagination only if there are more than 5 entries 
    ?>
        <div class="ventrix-table-controls">
            <div class="ventrix-table-controls__filters show-entries">
                Show
                <select class="cafeto-mobile-entries-select">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                entries
                <div class="cafeto-mobile-filter-options">
                    Filters <span class="cafeto-sort-icon">↕</span>
                    <div class="cafeto-options-panel">
                        <ul>
                            <?php foreach ($columns as $column) : ?>
                                <li class="cafeto-mobile-column-header">
                                    <?php echo esc_html($column['displayName']); ?>
                                    <span class="cafeto-sort-icon">↕</span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="ventrix-table-controls__search show-search-input">
                <input type="text" class="cafeto-mobile-search-input" placeholder="Search...">
            </div>
        </div>

    <?php endif; ?>
    <div class="ventrix-mobile-table-container <?php echo ((($total_entries > $entries_per_page) && ( $table_name === 'salary_standard'))  ? 'height-fixed-mobile-salary-standard' : ''); ?>
    <?php echo ((($total_entries > $entries_per_page) && ( $table_name === 'career_bridge'))  ? 'height-fixed-mobile-career-bridge' : ''); ?>
        <?php echo ((($total_entries > $entries_per_page) && ( $table_name === 'career_standard'))  ? 'height-fixed-mobile-career-standard' : ''); ?>">
        <table class="cafeto-mobile-table">
            <?php foreach ($results as $row): ?>
                <thead class="cafeto-mobile-table-header">
                    <tr>
                        <th colspan="2"><?php echo esc_html($row['area']); ?></th>
                    </tr>
                </thead>
                <tbody class="cafeto-mobile-table-body">
                    <?php foreach ($columns as $column) : ?>
                        <?php if (strtolower($column['displayName']) !== 'area'):  ?>
                            <tr>
                                <td><?php echo esc_html($column['displayName']); ?></td>
                                <td>
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
    <?php if ($total_entries > $entries_per_page): // show pagination only if there are more than 5 entries 
    ?>
        <div class="cafeto-mobile-pagination mt-4 flex flex-col sm:flex-row justify-between items-center">
            <div class="showing-entries mb-2 sm:mb-0">
                Showing <span class="cafeto-mobile-showing-start">1</span> to <span class="cafeto-mobile-showing-end">10</span> of <span class="cafeto-mobile-total-entries"><?php echo esc_html($total_entries); ?></span> entries
            </div>
            <div class="cafeto-mobile-pagination__buttons">
                <button class="cafeto-mobile-prev-page mr-2">Previous</button>
                <button class="cafeto-mobile-next-page">Next</button>
            </div>
        </div>
    <?php endif; ?>

    <?php include __DIR__ . '/table-source.php'; ?>
</div>