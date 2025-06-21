<?php
/**
 * Server-side rendering of the salary table block
 */

if (!function_exists('render_cafeto_salary_table_block')) {
    function render_cafeto_salary_table_block($attributes) {
        $selected_state = isset($attributes['selectedState']) ? $attributes['selectedState'] : '';
        $table_data = isset($attributes['tableData']) ? $attributes['tableData'] : [];

        if (empty($selected_state) || empty($table_data)) {
            return '';
        }

        ob_start();
        ?>
        <div class="wp-block-em-multipurpose-block is-block-center topic-block table-center-columns" style="background-color:#ffffff;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;margin-top:20px;margin-bottom:20px;border-top-style:solid;border-top-width:5px;border-top-color:#6d57c3;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#6d57c3;border-right-style:solid;border-right-width:1px;border-right-color:#6d57c3;border-left-style:solid;border-left-width:1px;border-left-color:#6d57c3">
            <figure class="wp-block-table edumed-table mobile-friendly-table-type1 singlerow-header">
                <table>
                    <thead>
                        <tr>
                            <th><strong>Area</strong></th>
                            <th><strong>Occupation</strong></th>
                            <th><strong>10th Percentile</strong></th>
                            <th><strong>Median</strong></th>
                            <th><strong>90th Percentile</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($table_data as $row): ?>
                            <tr>
                                <td><?php echo esc_html($row['area']); ?></td>
                                <td><?php echo esc_html($row['occupation']); ?></td>
                                <td><?php echo esc_html($row['n_10th_percentile']); ?></td>
                                <td><?php echo esc_html($row['median']); ?></td>
                                <td><?php echo esc_html($row['n_90th_percentile']); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </figure>
        </div>
        <?php
        return ob_get_clean();
    }
} 