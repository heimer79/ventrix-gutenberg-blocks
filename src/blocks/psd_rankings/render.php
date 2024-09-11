<?php

require_once 'methodology_texts.php';

/**
 * Renders the custom Gutenberg block for PSD rankings.
 *
 * @param array $attributes The block attributes.
 * @return string The block content.
 * 
 */

function render_cafeto_psd_rankings_block($attributes) {
    $post_type = isset($attributes['postType']) ? $attributes['postType'] : 'school_rankings';
    $program = isset($attributes['program']) ? $attributes['program'] : '';
    $has_two_and_four_years = isset($attributes['hasTwoAndFourYears']) ? $attributes['hasTwoAndFourYears'] : '';
    $default_level_year = isset($attributes['defaultLevelYear']) ? $attributes['defaultLevelYear'] : '';
    $level_year_value = ($default_level_year === 'two-year') ? '2-year Schools' : '4-year Schools';
    $version = isset($attributes['version']) ? $attributes['version'] : '';

    $posts = psd_get_rankings_data($post_type, $level_year_value, $version, $program);
    $rankings_count = count($posts);

    // Verificar si la consulta fue exitosa
    $query_success = !empty($posts);

    // Set default open based on the number of schools
    $default_open = $rankings_count >= 6 ? 3 : $rankings_count;

    // Initialize JSON-LD schema structure
    $ranking_data_schema_json = '';
    if ($query_success) {
        $ranking_data_schema_json .= '{
            "@context":"https://schema.org",
            "@type":"ItemList",
            "name":"' . esc_attr($program) . '",
            "description":"",
            "itemListElement":[';
    }

    ob_start();

    $level_year_id = $default_level_year === 'two-year' ? 'two-year-rankings' : 'four-year-rankings';
    ?>
    <span id="rankings-<?php echo esc_attr($default_level_year); ?>"></span>
    <div class="cafeto-rankings-block" data-query-status="<?php echo esc_attr($query_success ? 'success' : 'error'); ?>" data-level-year="<?php echo esc_attr($default_level_year); ?>" data-has-years="<?php echo esc_attr($has_two_and_four_years); ?>" data-default-open="<?php echo esc_attr($default_open); ?>" id="<?php echo esc_attr($level_year_id); ?>">

        <!-- Render Top Bar -->
        <?php echo psd_render_top_bar(); ?>

        <!-- Render Rankings List -->
        <section class="rankings-list">
            <?php if ($query_success) : ?>
                <?php foreach ($posts as $post) : 
                    $order = get_post_field('menu_order', $post['ID']); 

                    $school_cost = !empty($post['acf_fields']['tuition_gutenberg']) ? $post['acf_fields']['tuition_gutenberg'] : 'N/A';
                    $link_url = esc_url($post['acf_fields']['online_program_url']);

                    echo psd_render_rankings_item($post, $order);

                    // Append to JSON-LD schema
                    $ranking_data_schema_json .= '{
                        "@type":"ListItem",
                        "position":' . esc_attr($order) . ',
                        "item":{
                            "@type":"CollegeOrUniversity",
                            "name":"' . esc_attr(htmlspecialchars_decode($post['title'])) . '",
                            "url":"' . esc_url($link_url) . '",
                            "makesOffer": {
                                "@type": "AggregateOffer",
                                "price": "' . esc_attr($school_cost) . '"
                            }
                        }
                    },';

                endforeach; 

                // Remove trailing comma and close JSON-LD structure
                $ranking_data_schema_json = rtrim($ranking_data_schema_json, ',');
                $ranking_data_schema_json .= ']}'; ?>
            <?php else : ?>
                <p><?php esc_html_e('No rankings found.', 'text-domain'); ?></p>
            <?php endif; ?>
        </section>

        <!-- Render Popup Section -->
        <?php echo psd_render_popup_section($posts); ?>

    </div>

    <?php
    // Insert JSON-LD schema script
    if (!empty($ranking_data_schema_json)) {
        echo '<script type="application/ld+json">' . wp_kses_post($ranking_data_schema_json) . '</script>';
    }

    return ob_get_clean();
}

/**
 * Retrieves rankings data from the database, with caching.
 *
 * @param string $post_type The post type.
 * @param string $level_year_value The level year value.
 * @param string $version The version value.
 * @param string $program The program taxonomy term.
 * @return array The array of posts data.
 */

function psd_get_rankings_data($post_type, $level_year_value, $version, $program) {
    // Cache key
    $cache_key = "rankings_data_{$post_type}_{$level_year_value}_{$version}_{$program}";
    $posts = wp_cache_get($cache_key);

    if ($posts === false) {
        $rankings_args = array(
            'post_type'           => $post_type,
            'post_status'         => 'publish',
            'orderby'             => 'menu_order',
            'order'               => 'ASC',
            'posts_per_page'      => -1,
            'meta_query'          => array(
                'relation' => 'AND',
                array(
                    'key'     => 'school_level',
                    'value'   => $level_year_value,
                    'compare' => '='
                ),
                array(
                    'key'     => 'version_acf',
                    'value'   => $version,
                    'compare' => '='
                ),
            ),
            'tax_query'           => array(
                array(
                    'taxonomy' => 'school_ranking_category',
                    'field'    => 'name',
                    'terms'    => $program,
                ),
            ),
        );

        $rankings_query = new WP_Query($rankings_args);
        $posts = array();

        if ($rankings_query->have_posts()) {
            while ($rankings_query->have_posts()) {
                $rankings_query->the_post();

                $posts[] = array(
                    'ID' => get_the_ID(),
                    'title' => get_the_title(),
                    'content' => get_the_content(),
                    'acf_fields' => array(
                        'asset_url' => get_field('asset_url'),
                        'city' => get_field('city'),
                        'state' => get_field('state'),
                        'web_address' => get_field('web_address'),
                        'control_of_institution_gutenberg' => get_field('control_of_institution_gutenberg'),
                        'school_level' => get_field('school_level'),
                        'accreditation' => get_field('accreditation'),
                        'avg_grant_aid' => get_field('avg_grant_aid'),
                        'graduation_rate_total_cohort' => get_field('graduation_rate_total_cohort'),
                        'full_time_retention_rate' => get_field('full_time_retention_rate'),
                        'student_to_faculty_ratio_gutenberg' => get_field('student_to_faculty_ratio_gutenberg'),
                        'tuition_gutenberg' => get_field('tuition_gutenberg'),
                        'percent_of_total_students_enrolled_exclusively_in_distance_education_courses' => get_field('percent_of_total_students_enrolled_exclusively_in_distance_education_courses'),
                        'percent_of_total_students_enrolled_in_some_but_not_all_distance_education_courses' => get_field('percent_of_total_students_enrolled_in_some_but_not_all_distance_education_courses'),
                        'online_programs' => get_field('online_programs'),
                        'online_program_url' => get_field('online_program_url'),
                        'methodology_version' => get_field('methodology_version'),
                        'version' => get_field('version_acf'),

                        // 'actual_program' => get_field('actual_program'),
                        // 'avg_inst_aid' => get_field('avg_inst_aid'),
                        // 'avg_inst_aid_stars' => get_field('avg_inst_aid_stars'), 
                        // 'percentage_in_online_ed' => get_field('percentage_in_online_ed'),
                        // 'percentage_receiving_award' => get_field('percentage_receiving_award'),
                    ),
                );
            }
        }

        wp_reset_postdata();
        wp_cache_set($cache_key, $posts);
    }

    return $posts;
}

/**
 * Renders the top bar section of the rankings block.
 *
 * @return string The HTML content of the top bar.
 */

function psd_render_top_bar() {
    ob_start();
    ?>
    <section class="rankings-top-bar">
        <div class="rankings-top-bar--years">
            <a href="#two-year-rankings" class="two-year-button"><?php esc_html_e('2-year Schools', 'text-domain'); ?></a>
            <a href="#four-year-rankings" class="four-year-button"><?php esc_html_e('4-year Schools', 'text-domain'); ?></a>
        </div>
        <button class="rankings-top-bar--about"><?php esc_html_e('About the Rankings', 'text-domain'); ?></button>
        <div class="rankings-top-bar--expand-collapse">
            <button class="expand-all"><?php esc_html_e('Expand All', 'text-domain'); ?></button>
            <button class="collapse-all"><?php esc_html_e('Collapse All', 'text-domain'); ?></button>
        </div>
    </section>
    <?php
    return ob_get_clean();
}

/**
 * Renders the individual rankings item.
 *
 * @param array $post The post data.
 * @param int $order The menu order.
 * @return string The HTML content of the rankings item.
 */

function psd_render_rankings_item($post, $order) {
    ob_start();
    ?>
    <div class="rankings-list--item">
        <div class="rankings-list--item--heading">
            <div class="rankings-list--item--heading--left">
                <span class="rankings-list--item--heading--left--rank"><?php echo esc_html($order); ?></span>
                <div class="rankings-list--item--heading--left--title">
                    <h4><a href="<?php echo esc_url($post['acf_fields']['online_program_url']); ?>" target="_blank" rel="noopener noreferrer nofollow"><?php echo esc_html($post['title']); ?></a></h4>
                    <p><?php echo esc_html($post['acf_fields']['city']) . ', ' . esc_html($post['acf_fields']['state']); ?></p>
                </div>
                <span class="rankings-list--item--heading--left--button"></span>
            </div>
            <div class="rankings-list--item--heading--right">
                <p><?php echo esc_html($post['acf_fields']['control_of_institution_gutenberg']); ?></p>
                <p><?php echo psd_render_svg_icons($post['acf_fields']['online_programs']); ?></p>
                <span class="rankings-list--item--heading--right--button"></span>
            </div>
        </div>

        <div class="rankings-list--item--hidden hidden">
            <?php if (!empty($post['content'])): ?>
                <div class="rankings-list--item--content">
                    <?php echo wp_kses_post($post['content']); ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($post['acf_fields'])): ?>
                <div class="rankings-list--item--data">
                    <ul>
                        <?php echo psd_render_acf_fields($post['acf_fields']); ?>
                    </ul>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * Renders the SVG icons based on the number provided.
 *
 * @param int $number_of_icons The number of icons to display.
 * @return string The HTML content of the SVG icons.
 */

function psd_render_svg_icons($number_of_icons) {
    $block_dir = plugin_dir_url(__FILE__); // Get the URL of the block directory
    $svg_url = $block_dir . 'assets/icons-svg/rankings-laptop.svg'; // Construct the URL to the SVG file

    // Check if the file exists
    if (!file_exists(plugin_dir_path(__FILE__) . 'assets/icons-svg/rankings-laptop.svg')) {
        error_log('SVG file not found or path is invalid: ' . $svg_url);
        return '<script>console.error("SVG file not found or path is invalid: ' . esc_js($svg_url) . '");</script>';
    }

    $output = '';
    for ($i = 0; $i < intval($number_of_icons); $i++) {
        $output .= '<img src="' . esc_url($svg_url) . '" alt="Online Programs" />';
    }

    return $output;
}

/**
 * Renders the stars based on the number provided.
 *
 * @param int $stars The number of full stars to display.
 * @return string The HTML content of the stars.
 */

function psd_render_stars($stars) {
    $block_dir = plugin_dir_url(__FILE__); // Get the URL of the block directory
    $svg_dir = $block_dir . 'assets/icons-svg/';

    $full_star_url = $svg_dir . 'rankings-full-star.svg';
    $empty_star_url = $svg_dir . 'rankings-empty-star.svg';

    // Check if the files exist
    if (!file_exists(plugin_dir_path(__FILE__) . 'assets/icons-svg/rankings-full-star.svg')) {
        error_log('Full star SVG file not found or path is invalid: ' . $full_star_url);
        return '<script>console.error("Full star SVG file not found or path is invalid: ' . esc_js($full_star_url) . '");</script>';
    }

    if (!file_exists(plugin_dir_path(__FILE__) . 'assets/icons-svg/rankings-empty-star.svg')) {
        error_log('Empty star SVG file not found or path is invalid: ' . $empty_star_url);
        return '<script>console.error("Empty star SVG file not found or path is invalid: ' . esc_js($empty_star_url) . '");</script>';
    }

    $output = '';

    for ($i = 0; $i < intval($stars); $i++) {
        $output .= '<img src="' . esc_url($full_star_url) . '" alt="Avg. Grant Aid" />';
    }

    for ($i = 0; $i < (5 - intval($stars)); $i++) {
        $output .= '<img src="' . esc_url($empty_star_url) . '" alt="Avg. Grant Aid" />';
    }

    return $output;
}

/**
 * Renders the ACF fields for the rankings item.
 *
 * @param array $acf_fields The ACF fields.
 * @return string The HTML content of the ACF fields.
 */

function psd_render_acf_fields($acf_fields) {
    ob_start();

    if (!empty($acf_fields['accreditation'])) {
        echo '<li><span>' . esc_html__('Accreditation', 'text-domain') . '</span>' . esc_html($acf_fields['accreditation']) . '</li>';
    }
    
    if (isset($acf_fields['avg_grant_aid']) && is_numeric($acf_fields['avg_grant_aid']) && $acf_fields['avg_grant_aid'] > 0) {
        echo '<li><span>' . esc_html__('Avg. Grant Aid', 'text-domain') . '</span>' . '<span>' . psd_render_stars($acf_fields['avg_grant_aid']) . '</span>' . '</li>';
    } else {
        echo '<li><span>' . esc_html__('Avg. Grant Aid', 'text-domain') . '</span>' . '<span class="avg-default">' . esc_html__('N/A', 'text-domain') . '</span>' . '</li>';
    }
    
    if (!empty($acf_fields['graduation_rate_total_cohort'])) {
        echo '<li><span>' . esc_html__('Graduation Rate', 'text-domain') . '</span>' . esc_html($acf_fields['graduation_rate_total_cohort']) . '</li>';
    }

    if (!empty($acf_fields['full_time_retention_rate'])) {
        echo '<li><span>' . esc_html__('Retention Rate', 'text-domain') . '</span>' . esc_html($acf_fields['full_time_retention_rate']) . '</li>';
    }

    if (!empty($acf_fields['student_to_faculty_ratio_gutenberg'])) {
        echo '<li><span>' . esc_html__('Student/Faculty Ratio', 'text-domain') . '</span>' . esc_html($acf_fields['student_to_faculty_ratio_gutenberg']) . '</li>';
    }

    if (!empty($acf_fields['tuition_gutenberg'])) {
        echo '<li><span>' . esc_html__('Tuition', 'text-domain') . '</span>' . esc_html($acf_fields['tuition_gutenberg']) . '</li>';
    }

    if (!empty($acf_fields['percent_of_total_students_enrolled_exclusively_in_distance_education_courses'])) {
        echo '<li><span>' . esc_html__('% Excl. Online', 'text-domain') . '</span>' . esc_html($acf_fields['percent_of_total_students_enrolled_exclusively_in_distance_education_courses']) . '</li>';
    }

    if (!empty($acf_fields['percent_of_total_students_enrolled_in_some_but_not_all_distance_education_courses'])) {
        echo '<li><span>' . esc_html__('% Part. Online', 'text-domain') . '</span>' . esc_html($acf_fields['percent_of_total_students_enrolled_in_some_but_not_all_distance_education_courses']) . '</li>';
    }
    
    return ob_get_clean();
}

/**
 * Renders the popup section with methodology text.
 *
 * @param array $posts The posts data.
 * @return string The HTML content of the popup section.
 */

function psd_render_popup_section($posts) {
    ob_start();
    ?>
    <section class="rankings-popup">
        <div class="rankings-popup--widget rankings-popup--2024 hidden">
            <span class="rankings-popup--widget--close">X</span>
            <?php 
            if (!empty($posts)) {
                $first_post = $posts[0];
                $methodology_version = isset($first_post['acf_fields']['methodology_version']) ? $first_post['acf_fields']['methodology_version'] : '1';
                echo psd_get_methodology_text($methodology_version);
            }
            ?>
        </div>
        <div class="rankings-popup--overlay hidden"></div>
    </section>
    <?php
    return ob_get_clean();
}