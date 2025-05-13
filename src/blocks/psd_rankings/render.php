<?php

require_once 'methodology-texts.php';

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
    // $posts = psd_get_rankings_data($post_type, $version, $program);
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
                        'graduation_rate_total_cohort' => get_field('graduation_rate_total_cohort'),
                        'full_time_retention_rate' => get_field('full_time_retention_rate'),
                        'tuition_gutenberg' => get_field('tuition_gutenberg'),
                        'percent_of_total_students_enrolled_exclusively_in_distance_education_courses' => get_field('percent_of_total_students_enrolled_exclusively_in_distance_education_courses'),
                        'percent_of_total_students_enrolled_in_some_but_not_all_distance_education_courses' => get_field('percent_of_total_students_enrolled_in_some_but_not_all_distance_education_courses'),
                        'online_programs' => get_field('online_programs'),
                        'online_program_url' => get_field('online_program_url'),
                        'methodology_version' => get_field('methodology_version'),
                        'version' => get_field('version_acf'),
                        'blurb_1' => get_field('blurb_1'),
                        'blurb_2' => get_field('blurb_2'),
                        'blurb_3' => get_field('blurb_3'),
                        'ptotal' => get_field('ptotal'),
                        'accreditation' => get_field('accreditation'),
                        'average_tuition' => get_field('average_tuition'),
                        'avg_grant_aid' => get_field('avg_grant_aid'),
                        'percentage_of_students_awarded_institutional_grant_aid' => get_field('percentage_of_students_awarded_institutional_grant_aid'),
                        'percentage_of_students_awarded_any_financial_aid' => get_field('percentage_of_students_awarded_any_financial_aid'),
                        'student_to_faculty_ratio_gutenberg' => get_field('student_to_faculty_ratio_gutenberg'),
                        'percentage_of_students_in_one_or_more_online_course' => get_field('percentage_of_students_in_one_or_more_online_course'),
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
        <button class="rankings-top-bar--about"><?php esc_html_e('About the Rankings', 'text-domain'); ?></button>
        <div class="rankings-top-bar--expand-collapse">
            <button class="expand-all inactive"><?php esc_html_e('Expand All', 'text-domain'); ?></button>
            <button class="collapse-all inactive"><?php esc_html_e('Collapse All', 'text-domain'); ?></button>
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

    <!-- Rankings Item DESKTOP -->
    <?php if (!wp_is_mobile()) : ?>
    <div class="rankings-list__item">

        <!-- Left Section (Heading & Content) -->
        <div class="rankings-list__left">

            <!-- Heading & Content -->
            <div class="rankings-list__left-heading">

                <!-- Rank -->
                <span class="rankings-list__left-heading--rank"><?php echo esc_html($order); ?></span>

                <!-- Title & Location -->
                <div class="rankings-list__left-heading--title">
                    <h4><a href="<?php echo esc_url($post['acf_fields']['online_program_url']); ?>" target="_blank" rel="noopener noreferrer nofollow"><?php echo esc_html($post['title']); ?></a></h4>
                    <p><?php echo esc_html($post['acf_fields']['city']) . ', ' . esc_html($post['acf_fields']['state']); ?></p>
                </div>
            </div>

            <!-- Content -->
            <div class="rankings-list__left-content">

                <h5 class="rankings-list__left-title">Why We Selected <?php echo esc_html($post['title']); ?>:</h5>

                <?php if (!empty($post['content'])): ?>
                    <div class="rankings-list__left-text">
                        <?php echo wp_kses_post($post['content']); ?>
                    </div>
                <?php endif; ?>
                
            </div>

            <!-- Toggle Section (Initially Collapsed) -->
            <div class="rankings-list__left-toggle expanded">
                <h5>Program Highlights</h5>

                <!-- Blurbs -->
                <div class="rankings-list__left-blurbs">
                    <ul>
                        <?php if (!empty($post['acf_fields']['blurb_1'])): ?>
                            <li><?php echo esc_html($post['acf_fields']['blurb_1']); ?></li>
                        <?php endif; ?>
                        <?php if (!empty($post['acf_fields']['blurb_2'])): ?>
                            <li><?php echo esc_html($post['acf_fields']['blurb_2']); ?></li>
                        <?php endif; ?>
                        <?php if (!empty($post['acf_fields']['blurb_3'])): ?>
                            <li><?php echo esc_html($post['acf_fields']['blurb_3']); ?></li>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>

            <!-- Toggle Button -->
            <button class="rankings-list__left-toggle-btn expanded">Less</button>

        </div>

        <!-- School Details (Desktop Sidebar) -->
        <?php if (!empty($post['acf_fields'])) : ?>
        <div class="rankings-list__right">
            <div class="rankings-list__right-data">
                <h5 class="rankings-list__right-title">School Details</h5>
                <ul><?php echo psd_render_acf_fields($post['acf_fields']); ?></ul>
            </div>
        </div>
        <?php endif; ?>

    </div>
    <?php endif; ?>

    <!-- Rankings Item MOBILE -->
    <?php if (wp_is_mobile()) : ?>
    <div class="rankings-list__item">

        <!-- Left Section (Heading & Content) -->
        <div class="rankings-list__left">

            <!-- Order 1 - Heading & Content -->
            <div class="rankings-list__left-heading">

                <!-- Rank -->
                <span class="rankings-list__left-heading--rank"><?php echo esc_html($order); ?></span>

                <!-- Title & Location -->
                <div class="rankings-list__left-heading--title">
                    <h4>
                        <a href="<?php echo esc_url($post['acf_fields']['online_program_url']); ?>" 
                        target="_blank" rel="noopener noreferrer nofollow">
                            <?php echo esc_html($post['title']); ?>
                        </a>
                    </h4>
                    <p><?php echo esc_html($post['acf_fields']['city']) . ', ' . esc_html($post['acf_fields']['state']); ?></p>
                </div>

            </div>

            <!-- Order 2 - Content -->
            <div class="rankings-list__left-content">

                <h5 class="rankings-list__left-title">Why We Selected <?php echo esc_html($post['title']); ?>:</h5>

                <?php if (!empty($post['content'])): ?>
                    <div class="rankings-list__left-text">
                        <?php echo wp_kses_post($post['content']); ?>
                    </div>
                <?php endif; ?>
                
            </div>

            <!-- Order 3 - Blurbs -->
            <div class="rankings-list__left-toggle expanded">
            <div class="rankings-list__left-blurbs">
                <h5 class="rankings-list__left-blurbs__title">Program Highlights</h5>
                <ul>
                    <?php if (!empty($post['acf_fields']['blurb_1'])): ?>
                        <li><?php echo esc_html($post['acf_fields']['blurb_1']); ?></li>
                    <?php endif; ?>
                    <?php if (!empty($post['acf_fields']['blurb_2'])): ?>
                        <li><?php echo esc_html($post['acf_fields']['blurb_2']); ?></li>
                    <?php endif; ?>
                    <?php if (!empty($post['acf_fields']['blurb_3'])): ?>
                        <li><?php echo esc_html($post['acf_fields']['blurb_3']); ?></li>
                    <?php endif; ?>
                </ul>
            </div>
            </div>

            <!-- Order 4 - School Details -->
            <?php if (!empty($post['acf_fields'])): ?>
            <div class="rankings-list__right">
                <div class="rankings-list__right-data">
                    <h5 class="rankings-list__right-title">School Details</h5>
                    <ul><?php echo psd_render_acf_fields($post['acf_fields']); ?></ul>
                </div>
            </div>
            <?php endif; ?>

            <!-- Order 5 - Toggle Button -->
            <button class="rankings-list__left-toggle-btn expanded">Less</button>
        </div>

    </div>
    <?php endif; ?>

    <?php
    return ob_get_clean();
}


/**
 * Renders the ACF fields for the rankings item.
 *
 * @param array $acf_fields The ACF fields.
 * @return string The HTML content of the ACF fields.
 */

function psd_render_acf_fields($acf_fields) {
    ob_start();

    // Accreditation
    if (!empty($acf_fields['accreditation'])) {
        echo '<li><span>' . esc_html__('Accreditation', 'text-domain') . '</span>' . esc_html($acf_fields['accreditation']) . '</li>';
    }

    // Average Tuition
    if (!empty($acf_fields['average_tuition'])) {
        echo '<li><span>' . esc_html__('Average Tuition', 'text-domain') . '</span>' . esc_html($acf_fields['average_tuition']) . '</li>';
    }
    
    // Average Grant Aid
    if (!empty($acf_fields['avg_grant_aid'])) {
        echo '<li><span>' . esc_html__('Average Grant Aid', 'text-domain') . '</span>' . esc_html($acf_fields['avg_grant_aid']) . '</li>';
    }
    
    // % of Students Awarded Grant Aid
    if (!empty($acf_fields['percentage_of_students_awarded_institutional_grant_aid'])) {
        echo '<li><span>' . esc_html__('% of Students Awarded Grant Aid', 'text-domain') . '</span>' . esc_html($acf_fields['percentage_of_students_awarded_institutional_grant_aid']) . '</li>';
    }

    // % of Students Awarded Any Financial Aid
    if (!empty($acf_fields['percentage_of_students_awarded_any_financial_aid'])) {
        echo '<li><span>' . esc_html__('% of Students Awarded Any Financial Aid', 'text-domain') . '</span>' . esc_html($acf_fields['percentage_of_students_awarded_any_financial_aid']) . '</li>';
    }

    // Student/Faculty Ratio
    if (!empty($acf_fields['student_to_faculty_ratio_gutenberg'])) {
        echo '<li><span>' . esc_html__('Student/Faculty Ratio', 'text-domain') . '</span>' . esc_html($acf_fields['student_to_faculty_ratio_gutenberg']) . '</li>';
    }

    // % of Students in ≥1 Online Course
    if (!empty($acf_fields['percentage_of_students_in_one_or_more_online_course'])) {
        echo '<li><span>' . esc_html__('% of Students in ≥1 Online Course', 'text-domain') . '</span>' . esc_html($acf_fields['percentage_of_students_in_one_or_more_online_course']) . '</li>';
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