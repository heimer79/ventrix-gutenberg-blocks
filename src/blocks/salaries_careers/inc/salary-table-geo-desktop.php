<?php
// inc/desktop-table.php

$current_site = function_exists('get_select_current_site') ? get_select_current_site() : '';
$block_id = isset($block_id) ? $block_id : '';

?>
<div class="<?php echo $current_site; ?>-salaries-table-geo-desktop salaries-table-geo-desktop salaries-careers-table-desktop cafeto-salaries-careers-table-desktop"
    data-entries-per-page="<?php echo esc_attr($entries_per_page); ?>"
	id="<?php echo esc_attr($block_id); ?>">
    <?php if ($show_title): ?>
        <!-- Display table title if $show_title is true -->
        <h2><?php echo esc_html($table_title); ?></h2>
    <?php endif; ?>
    <?php if ($total_entries > $entries_per_page): ?>
        <div class="ventrix-table-controls mb-4">
            <div class="show-search-input">
                Search: <input type="text" class="cafeto-search-input border rounded px-2 py-1">
            </div>
        </div>
    <?php endif; ?>

    <div class="ventrix-table-container <?php echo ($total_entries > $entries_per_page ? 'height-fixed-desktop' : ''); ?>">
        <table class="ventrix-table">
            <thead class="bg-white text-[#6D57C3]">
                <tr>
                    <?php foreach ($columns as $column) : ?>
                        <?php if ($column['name'] === 'relevant_degree_link') continue; ?>
                        <!-- Table header with sortable columns -->
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer whitespace-nowrap">
                            <?php echo esc_html($column['displayName']); ?>
                            <span class="ml-1 cafeto-sort-icon">&#x2195;&#xFE0E;</span>
                        </th>
                    <?php endforeach; ?>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($results as $row) : ?>
                    <?php
                    // Determine if the row is a US or statewide pinned row based on the 'area' value
                    $area_raw = isset($row['area']) ? trim((string) $row['area']) : '';
                    $row_class = cafeto_salaries_pinned_row_classes(
                        $area_raw,
                        !empty($pinned_us),
                        !empty($pinned_state),
                        isset($statewide_area_label) ? $statewide_area_label : null
                    );
                    ?>
                    <tr class="<?php echo esc_attr($row_class); ?>">
                        <?php foreach ($columns as $column) : ?>
                            <?php if ($column['name'] === 'relevant_degree_link') continue; ?>
                            <!-- Table cell with data -->
                            <?php
                            $is_median_col = isset($column['name']) && $column['name'] === 'median';
                            $td_classes = 'px-6 py-4 whitespace-nowrap';
                            if ($is_median_col) {
                                $td_classes .= ' is-col-median';
                            }
                            ?>
                            <td class="<?php echo esc_attr($td_classes); ?>">
                                <?php
                                if ($column['name'] === 'relevant_degree_text') {
                                    $text_value = isset($row['relevant_degree_text']) ? $row['relevant_degree_text'] : '';
                                    $link_value = isset($row['relevant_degree_link']) ? $row['relevant_degree_link'] : '';
                                    if (!empty($link_value)) {
                                        echo '<a class="table-geo-link" href="' . esc_url($link_value) . '" target="_blank" rel="noopener noreferrer">' . esc_html($text_value) . '</a>';
                                    } else {
                                        echo esc_html($text_value);
                                    }
                                } else {
                                    $cell_value = isset($row[$column['name']]) ? $row[$column['name']] : '';
                                    echo esc_html($cell_value);
                                }
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
