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

    $posts = get_rankings_data($post_type, $level_year_value, $version, $program);
    $rankings_count = count($posts);

    // Verificar si la consulta fue exitosa
    $query_success = !empty($posts);

    // Set default open based on the number of schools
    $default_open = $rankings_count >= 6 ? 3 : $rankings_count;

    ob_start();

    $level_year_id = $default_level_year === 'two-year' ? 'two-year-rankings' : 'four-year-rankings';
    ?>
    <span id="rankings-<?php echo esc_attr($default_level_year); ?>"></span>
    <div class="cafeto-edumed-rankings-block" data-query-status="<?php echo esc_attr($query_success ? 'success' : 'error'); ?>" data-level-year="<?php echo esc_attr($default_level_year); ?>" data-has-years="<?php echo esc_attr($has_two_and_four_years); ?>" data-default-open="<?php echo esc_attr($default_open); ?>" id="<?php echo esc_attr($level_year_id); ?>">

        <!-- Render Top Bar -->
        <?php echo render_top_bar(); ?>

        <!-- Render Rankings List -->
        <section class="rankings-list">
            <?php if ($query_success) : ?>
                <?php foreach ($posts as $post) : 
                    $order = get_post_field('menu_order', $post['ID']); 
                    echo render_rankings_item($post, $order);
                endforeach; ?>
            <?php else : ?>
                <p><?php esc_html_e('No rankings found.', 'text-domain'); ?></p>
            <?php endif; ?>
        </section>

        <!-- Render Popup Section -->
        <?php echo render_popup_section($posts); ?>

    </div>
    <?php
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
function get_rankings_data($post_type, $level_year_value, $version, $program) {
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
function render_top_bar() {
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
function render_rankings_item($post, $order) {
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
                    <?php echo render_svg_icons($post['acf_fields']['online_programs']); ?>
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
                        <?php echo render_acf_fields($post['acf_fields']); ?>
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
function render_svg_icons($number_of_icons) {
    $svg_icon = '<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5091 10.2439H16.6909V1.87805C16.6909 1.37996 16.5013 0.90227 16.1637 0.550068C15.8261 0.197865 15.3683 0 14.8909 0H3.10909C2.6317 0 2.17386 0.197865 1.8363 0.550068C1.49873 0.90227 1.30909 1.37996 1.30909 1.87805V10.2439H0.490909C0.360712 10.2439 0.235847 10.2979 0.143784 10.3939C0.0517206 10.49 0 10.6203 0 10.7561V12.122C0 12.62 0.189642 13.0977 0.527208 13.4499C0.864773 13.8021 1.32261 14 1.8 14H16.2C16.6774 14 17.1352 13.8021 17.4728 13.4499C17.8104 13.0977 18 12.62 18 12.122V10.7561C18 10.6203 17.9483 10.49 17.8562 10.3939C17.7642 10.2979 17.6393 10.2439 17.5091 10.2439ZM2.29091 1.87805C2.29091 1.65164 2.37711 1.43451 2.53055 1.27442C2.68399 1.11433 2.8921 1.02439 3.10909 1.02439H14.8909C15.1079 1.02439 15.316 1.11433 15.4695 1.27442C15.6229 1.43451 15.7091 1.65164 15.7091 1.87805V10.2439H2.29091V1.87805ZM17.0182 12.122C17.0182 12.3484 16.932 12.5655 16.7785 12.7256C16.6251 12.8857 16.417 12.9756 16.2 12.9756H1.8C1.583 12.9756 1.3749 12.8857 1.22146 12.7256C1.06802 12.5655 0.981818 12.3484 0.981818 12.122V11.2683H17.0182V12.122ZM10.8 3.2439C10.8 3.37975 10.7483 3.51002 10.6562 3.60608C10.5642 3.70213 10.4393 3.7561 10.3091 3.7561H7.69091C7.56071 3.7561 7.43585 3.70213 7.34378 3.60608C7.25172 3.51002 7.2 3.37975 7.2 3.2439C7.2 3.10806 7.25172 2.97778 7.34378 2.88173C7.43585 2.78567 7.56071 2.73171 7.69091 2.73171H10.3091C10.4393 2.73171 10.5642 2.78567 10.6562 2.88173C10.7483 2.97778 10.8 3.10806 10.8 3.2439Z" fill="#6D57C3"/>
    </svg>';

    $output = '';
    for ($i = 0; $i < intval($number_of_icons); $i++) {
        $output .= $svg_icon;
    }
    return $output;
}

/**
 * Renders the stars based on the number provided.
 *
 * @param int $stars The number of full stars to display.
 * @return string The HTML content of the stars.
 */
function render_stars($stars) {
    $full_star = '<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.09415 0.371435C8.04178 0.260545 7.95799 0.166632 7.85269 0.100807C7.7474 0.034982 7.62501 0 7.5 0C7.37499 0 7.2526 0.034982 7.14731 0.100807C7.04201 0.166632 6.95822 0.260545 6.90585 0.371435L5.02786 4.3477L0.577622 4.86359C0.453459 4.87791 0.336095 4.92669 0.23942 5.00414C0.142745 5.08159 0.0708065 5.18448 0.0321177 5.30063C-0.00657102 5.41678 -0.01039 5.54132 0.0211128 5.65953C0.0526155 5.77773 0.118121 5.88464 0.209877 5.96761L3.50126 8.94022L2.6277 13.2361C2.60344 13.3559 2.61478 13.4799 2.66039 13.5936C2.70599 13.7072 2.78395 13.8057 2.88505 13.8775C2.98615 13.9492 3.10616 13.9912 3.2309 13.9984C3.35564 14.0056 3.47988 13.9778 3.58894 13.9182L7.5 11.7792L11.4111 13.9182C11.5202 13.978 11.6446 14.0061 11.7695 13.9989C11.8944 13.9918 12.0147 13.9498 12.1159 13.8779C12.2171 13.8061 12.2952 13.7073 12.3407 13.5935C12.3863 13.4796 12.3975 13.3554 12.373 13.2355L11.4994 8.94086L14.7901 5.96761C14.8819 5.88464 14.9474 5.77773 14.9789 5.65953C15.0104 5.54132 15.0066 5.41678 14.9679 5.30063C14.9292 5.18448 14.8573 5.08159 14.7606 5.00414C14.6639 4.92669 14.5465 4.87791 14.4224 4.86359L9.97148 4.34706L8.09415 0.371435Z" fill="#6D57C3"/>
</svg>';
    
    $empty_star = '<svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.9538 4.8967C13.8992 4.73046 13.7941 4.58386 13.652 4.47592C13.51 4.36798 13.3375 4.30369 13.1571 4.29139L9.32311 3.99272L7.84553 0.546089C7.77659 0.384537 7.6594 0.246373 7.50882 0.149142C7.35825 0.0519113 7.18109 0 6.99984 0C6.81859 0 6.64143 0.0519113 6.49085 0.149142C6.34028 0.246373 6.22308 0.384537 6.15414 0.546089L4.67656 3.9915L0.842617 4.29139C0.662007 4.30378 0.489442 4.36825 0.347358 4.47642C0.205274 4.58459 0.100243 4.73146 0.0459198 4.89793C-0.0107067 5.06395 -0.0150598 5.24241 0.033409 5.41082C0.0818778 5.57922 0.180998 5.73003 0.318273 5.84422L3.24543 8.27342L2.35456 11.9071C2.31276 12.0772 2.32424 12.2553 2.38756 12.4191C2.45088 12.5828 2.56319 12.7248 2.71027 12.827C2.85554 12.9307 3.02992 12.9898 3.21058 12.9963C3.39123 13.0029 3.56973 12.9567 3.72269 12.8638L6.99984 10.9222L10.2821 12.8669C10.435 12.9598 10.6135 13.006 10.7942 12.9994C10.9748 12.9928 11.1492 12.9338 11.2945 12.8301C11.4416 12.7279 11.5539 12.5859 11.6172 12.4222C11.6805 12.2584 11.692 12.0802 11.6502 11.9102L10.7593 8.27649L13.6814 5.84422C13.8189 5.72993 13.9182 5.57892 13.9667 5.41026C14.0151 5.24161 14.0107 5.06289 13.9538 4.8967ZM13.1812 5.28736L10.0829 7.86314C10.03 7.9071 9.99069 7.96419 9.96915 8.02821C9.94761 8.09222 9.94469 8.1607 9.96072 8.2262L10.9076 12.077C10.9159 12.106 10.9145 12.1369 10.9037 12.1652C10.8928 12.1934 10.8731 12.2177 10.8471 12.2346C10.8237 12.2521 10.7951 12.2621 10.7654 12.2632C10.7358 12.2643 10.7065 12.2564 10.6817 12.2407L7.19965 10.1789C7.13954 10.1433 7.07038 10.1245 6.99984 10.1245C6.9293 10.1245 6.86014 10.1433 6.80003 10.1789L3.31798 12.2401C3.29317 12.2558 3.26389 12.2637 3.23423 12.2626C3.20457 12.2615 3.17601 12.2515 3.15253 12.234C3.12604 12.2175 3.10563 12.1934 3.0942 12.1651C3.08277 12.1368 3.08092 12.1058 3.08889 12.0764L4.03577 8.22558C4.0518 8.16009 4.04888 8.09161 4.02734 8.02759C4.0058 7.96358 3.96646 7.90649 3.91359 7.86252L0.815254 5.28675C0.790946 5.26767 0.77341 5.24177 0.765084 5.21264C0.756759 5.18351 0.758058 5.15261 0.768801 5.12423C0.777101 5.09625 0.794253 5.07146 0.817865 5.05332C0.841476 5.03518 0.870372 5.02459 0.900524 5.02303L4.96801 4.70658C5.03809 4.7011 5.10525 4.67706 5.16206 4.63713C5.21888 4.5972 5.26315 4.54292 5.28999 4.48028L6.8573 0.825132C6.86822 0.798074 6.88737 0.774829 6.91224 0.758439C6.93711 0.742049 6.96653 0.73328 6.99666 0.73328C7.02678 0.73328 7.0562 0.742049 7.08107 0.758439C7.10594 0.774829 7.12509 0.798074 7.13601 0.825132L8.70332 4.48028C8.73016 4.54292 8.77443 4.5972 8.83125 4.63713C8.88806 4.67706 8.95522 4.7011 9.0253 4.70658L13.0928 5.02303C13.1229 5.02459 13.1518 5.03518 13.1754 5.05332C13.1991 5.07146 13.2162 5.09625 13.2245 5.12423C13.2358 5.15238 13.2376 5.18321 13.2299 5.21245C13.2221 5.24168 13.2051 5.26786 13.1812 5.28736Z" fill="#6D57C3"/>
</svg>';

    $output = '';

    for ($i = 0; $i < intval($stars); $i++) {
        $output .= $full_star;
    }
    
    for ($i = 0; $i < (5 - intval($stars)); $i++) {
        $output .= $empty_star;
    }
    
    return $output;
}

/**
 * Renders the ACF fields for the rankings item.
 *
 * @param array $acf_fields The ACF fields.
 * @return string The HTML content of the ACF fields.
 */
function render_acf_fields($acf_fields) {
    ob_start();

    if (!empty($acf_fields['accreditation'])) {
        echo '<li><span>' . esc_html__('Accreditation', 'text-domain') . '</span>' . esc_html($acf_fields['accreditation']) . '</li>';
    }

    if (isset($acf_fields['avg_inst_aid_stars']) && is_numeric($acf_fields['avg_inst_aid_stars']) && $acf_fields['avg_inst_aid_stars'] > 0) {
        echo '<li><span>' . esc_html__('Avg. Inst. Aid', 'text-domain') . '</span>' . '<span>' . render_stars($acf_fields['avg_inst_aid_stars']) . '</span>' . '</li>';
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
function render_popup_section($posts) {
    ob_start();
    ?>
    <section class="rankings-popup">
        <div class="rankings-popup--widget rankings-popup--2024 hidden">
            <span class="rankings-popup--widget--close">X</span>
            <?php 
            if (!empty($posts)) {
                $first_post = $posts[0];
                $methodology_text_option = isset($first_post['acf_fields']['methodology_text_option']) ? $first_post['acf_fields']['methodology_text_option'] : '1';
                echo get_methodology_text($methodology_text_option);
            }
            ?>
        </div>
        <div class="rankings-popup--overlay hidden"></div>
    </section>
    <?php
    return ob_get_clean();
}

