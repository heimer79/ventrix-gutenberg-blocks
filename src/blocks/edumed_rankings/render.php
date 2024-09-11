<?php

require_once 'methodology_texts.php';

/**
 * Renders the custom Gutenberg block for Edumed rankings.
 *
 * @param array $attributes The block attributes.
 * @return string The block content.
 */
function render_cafeto_edumed_rankings_block($attributes) {
    $post_type = isset($attributes['postType']) ? $attributes['postType'] : 'school_ranking';
    $program = isset($attributes['program']) ? $attributes['program'] : '';
    $has_two_and_four_years = isset($attributes['hasTwoAndFourYears']) ? $attributes['hasTwoAndFourYears'] : '';
    $default_level_year = isset($attributes['defaultLevelYear']) ? $attributes['defaultLevelYear'] : '';
    $level_year_value = ($default_level_year === 'two-year') ? '2-year Schools' : '4-year Schools';
    $version = isset($attributes['version']) ? $attributes['version'] : '';

    $posts = edumed_get_rankings_data($post_type, $level_year_value, $version, $program);
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
    <div class="cafeto-edumed-rankings-block" data-query-status="<?php echo esc_attr($query_success ? 'success' : 'error'); ?>" data-level-year="<?php echo esc_attr($default_level_year); ?>" data-has-years="<?php echo esc_attr($has_two_and_four_years); ?>" data-default-open="<?php echo esc_attr($default_open); ?>" id="<?php echo esc_attr($level_year_id); ?>">

        <!-- Render Top Bar -->
        <?php echo edumed_render_top_bar(); ?>

        <!-- Render Rankings List -->
        <section class="rankings-list">
            <?php if ($query_success) : ?>
                <?php foreach ($posts as $post) : 
                    $order = get_post_field('menu_order', $post['ID']); 

                    $school_cost = !empty($post['acf_fields']['tuition_gutenberg']) ? $post['acf_fields']['tuition_gutenberg'] : 'N/A';
                    $link_url = esc_url($post['acf_fields']['online_program_url']);

                    echo edumed_render_rankings_item($post, $order);

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
        <?php echo edumed_render_popup_section($posts); ?>

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
function edumed_get_rankings_data($post_type, $level_year_value, $version, $program) {
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
                    'key'     => 'year',
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
                        'year' => get_field('year'),
                        'actual_program' => get_field('actual_program'),
                        'version' => get_field('version_acf'),
                        'city_location_of_institution' => get_field('city_location_of_institution'),
                        'state_abbreviation' => get_field('state_abbreviation'),
                        'web_address' => get_field('web_address'),
                        'online_program_url' => get_field('online_program_url'),
                        'online_programs' => get_field('online_programs'),
                        'control_of_institution' => get_field('control_of_institution'),
                        'accreditation' => get_field('accreditation'),
                        'avg_inst_aid' => get_field('avg_inst_aid'),
                        'avg_inst_aid_stars' => get_field('avg_inst_aid_stars'), 
                        'percentage_in_online_ed' => get_field('percentage_in_online_ed'),
                        'percentage_receiving_award' => get_field('percentage_receiving_award'),
                        'tuition_gutenberg' => get_field('tuition_gutenberg'),
                        'studentfaculty_ratio' => get_field('studentfaculty_ratio'),
                        'asset_url' => get_field('asset_url'),
                        'methodology_text_option' => get_field('methodology_text'),
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
function edumed_render_top_bar() {
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
function edumed_render_rankings_item($post, $order) {
    ob_start();
    ?>
    <div class="rankings-list--item">
        <div class="rankings-list--item--heading">
            <div class="rankings-list--item--heading--left">
                <span class="rankings-list--item--heading--left--rank"><?php echo esc_html($order); ?></span>
                <div class="rankings-list--item--heading--left--title">
                    <h4><a href="<?php echo esc_url($post['acf_fields']['online_program_url']); ?>" target="_blank" rel="noopener noreferrer nofollow"><?php echo esc_html($post['title']); ?></a></h4>
                    <p><?php echo esc_html($post['acf_fields']['city_location_of_institution']) . ', ' . esc_html($post['acf_fields']['state_abbreviation']); ?></p>
                </div>
                <span class="rankings-list--item--heading--left--button"></span>
            </div>
            <div class="rankings-list--item--heading--right">
                <p>
                    <?php echo edumed_render_svg_icons($post['acf_fields']['online_programs']); ?>
                </p>
                <p><?php echo esc_html($post['acf_fields']['control_of_institution']); ?></p>
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
                        <?php echo edumed_render_acf_fields($post['acf_fields']); ?>
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
function edumed_render_svg_icons($number_of_icons) {
    $block_dir = plugin_dir_url(__FILE__); // Get the URL of the block directory
    $svg_url = $block_dir . 'assets/icons-svg/icons.svg'; // Construct the URL to the SVG file

    // Check if the file exists
    if (!file_exists(plugin_dir_path(__FILE__) . 'assets/icons-svg/icons.svg')) {
        error_log('SVG file not found or path is invalid: ' . $svg_url);
        return '<script>console.error("SVG file not found or path is invalid: ' . esc_js($svg_url) . '");</script>';
    }

    $output = '';
    for ($i = 0; $i < intval($number_of_icons); $i++) {
        $output .= '<img src="' . esc_url($svg_url) . '" alt="Icon" />';
    }

    return $output;
}

/**
 * Renders the stars based on the number provided.
 *
 * @param int $stars The number of full stars to display.
 * @return string The HTML content of the stars.
 */
function edumed_render_stars($stars) {
    $block_dir = plugin_dir_url(__FILE__); // Get the URL of the block directory
    $svg_dir = $block_dir . 'assets/icons-svg/';

    $full_star_url = $svg_dir . 'full_star.svg';
    $empty_star_url = $svg_dir . 'empty_star.svg';

    // Check if the files exist
    if (!file_exists(plugin_dir_path(__FILE__) . 'assets/icons-svg/full_star.svg')) {
        error_log('Full star SVG file not found or path is invalid: ' . $full_star_url);
        return '<script>console.error("Full star SVG file not found or path is invalid: ' . esc_js($full_star_url) . '");</script>';
    }

    if (!file_exists(plugin_dir_path(__FILE__) . 'assets/icons-svg/empty_star.svg')) {
        error_log('Empty star SVG file not found or path is invalid: ' . $empty_star_url);
        return '<script>console.error("Empty star SVG file not found or path is invalid: ' . esc_js($empty_star_url) . '");</script>';
    }

    $output = '';

    for ($i = 0; $i < intval($stars); $i++) {
        $output .= '<img src="' . esc_url($full_star_url) . '" alt="Full Star" />';
    }

    for ($i = 0; $i < (5 - intval($stars)); $i++) {
        $output .= '<img src="' . esc_url($empty_star_url) . '" alt="Empty Star" />';
    }

    return $output;
}

/**
 * Renders the ACF fields for the rankings item.
 *
 * @param array $acf_fields The ACF fields.
 * @return string The HTML content of the ACF fields.
 */
function edumed_render_acf_fields($acf_fields) {
    ob_start();

    if (!empty($acf_fields['accreditation'])) {
        echo '<li><span>' . esc_html__('Accreditation', 'text-domain') . '</span>' . esc_html($acf_fields['accreditation']) . '</li>';
    }

    if (isset($acf_fields['avg_inst_aid_stars']) && is_numeric($acf_fields['avg_inst_aid_stars']) && $acf_fields['avg_inst_aid_stars'] > 0) {
        echo '<li><span>' . esc_html__('Avg. Inst. Aid', 'text-domain') . '</span>' . '<span>' . edumed_render_stars($acf_fields['avg_inst_aid_stars']) . '</span>' . '</li>';
    } else {
        echo '<li><span>' . esc_html__('Avg. Inst. Aid', 'text-domain') . '</span>' . '<span class="avg-default">' . esc_html__('N/A', 'text-domain') . '</span>' . '</li>';
    }
    
    if (!empty($acf_fields['percentage_in_online_ed'])) {
        echo '<li><span>' . esc_html__('% in Online Ed.', 'text-domain') . '</span>' . esc_html($acf_fields['percentage_in_online_ed']) . '</li>';
    }

    if (!empty($acf_fields['percentage_receiving_award'])) {
        echo '<li><span>' . esc_html__('% Receiving Award', 'text-domain') . '</span>' . esc_html($acf_fields['percentage_receiving_award']) . '</li>';
    }

    if (!empty($acf_fields['tuition_gutenberg'])) {
        echo '<li><span>' . esc_html__('Tuition', 'text-domain') . '</span>' . esc_html($acf_fields['tuition_gutenberg']) . '</li>';
    }

    if (!empty($acf_fields['studentfaculty_ratio'])) {
        echo '<li><span>' . esc_html__('Student/Faculty Ratio', 'text-domain') . '</span>' . esc_html($acf_fields['studentfaculty_ratio']) . '</li>';
    }

    return ob_get_clean();
}

/**
 * Renders the popup section with methodology text.
 *
 * @param array $posts The posts data.
 * @return string The HTML content of the popup section.
 */
function edumed_render_popup_section($posts) {
    ob_start();
    ?>
    <section class="rankings-popup">
        <div class="rankings-popup--widget rankings-popup--2024 hidden">
            <span class="rankings-popup--widget--close">X</span>
            <?php 
            if (!empty($posts)) {
                $first_post = $posts[0];
                $methodology_text_option = isset($first_post['acf_fields']['methodology_text_option']) ? $first_post['acf_fields']['methodology_text_option'] : '1';
                echo edumed_get_methodology_text($methodology_text_option);
            }
            ?>
        </div>
        <div class="rankings-popup--overlay hidden"></div>
    </section>
    <?php
    return ob_get_clean();
}