<?php

/**
 * Tradicional Rankings Block.
 *
 * @package EduMed
 */

/**
 * Security check: Verify that ACF is active and functions exist
 */
if (!function_exists('get_field')) {
    // ACF is not active, return error message
    if (!function_exists('edumed_get_rankings_data')) {
        function edumed_get_rankings_data($post_type, $level_year_value, $version, $program)
        {
            return array(); // Return empty array to prevent errors
        }
    }

    if (!function_exists('edumed_render_top_bar_school_ranking')) {
        function edumed_render_top_bar_school_ranking($program, $level_year_value, $version)
        {
            return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">\n            <strong>Error:</strong> Advanced Custom Fields (ACF) plugin is required for this block to function properly. \n            Please install and activate ACF plugin.\n        </div>';
        }
    }

    if (!function_exists('edumed_render_rankings_item')) {
        function edumed_render_rankings_item($post, $order)
        {
            return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">\n            <strong>Error:</strong> Advanced Custom Fields (ACF) plugin is required for this block to function properly.\n        </div>';
        }
    }

    if (!function_exists('edumed_render_traditional_rankings_acf_fields')) {
        function edumed_render_traditional_rankings_acf_fields($acf_fields)
        {
            return '';
        }
    }

    
}

/**
 * Security check: Verify WordPress core functions exist
 */
if (
    !function_exists('wp_cache_get') || !function_exists('wp_cache_set') ||
    !function_exists('get_the_ID') || !function_exists('get_the_title') ||
    !function_exists('get_the_content') || !function_exists('wp_reset_postdata') ||
    !function_exists('esc_html') || !function_exists('esc_html__') ||
    !function_exists('esc_url') || !function_exists('wp_kses_post') ||
    !function_exists('wp_is_mobile')
) {

    if (!function_exists('edumed_get_rankings_data')) {
        function edumed_get_rankings_data($post_type, $level_year_value, $version, $program)
        {
            return array(); // Return empty array to prevent errors
        }
    }

    function edumed_render_top_bar_school_ranking($program, $level_year_value, $version)
    {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Required WordPress functions are not available. 
            This may indicate a WordPress installation issue.
        </div>';
    }

    function edumed_render_rankings_item($post, $order)
    {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Required WordPress functions are not available.
        </div>';
    }

    function edumed_render_traditional_rankings_acf_fields($acf_fields)
    {
        return '';
    }

    
}

/**
 * Security check: Verify WP_Query class exists
 */
if (!class_exists('WP_Query')) {
    if (!function_exists('edumed_get_rankings_data')) {
        function edumed_get_rankings_data($post_type, $level_year_value, $version, $program)
        {
            return array(); // Return empty array to prevent errors
        }
    }

    function edumed_render_top_bar_school_ranking($program, $level_year_value, $version)
    {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> WordPress query functionality is not available. 
            This may indicate a WordPress installation issue.
        </div>';
    }

    function edumed_render_rankings_item($post, $order)
    {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> WordPress query functionality is not available.
        </div>';
    }

    function edumed_render_traditional_rankings_acf_fields($acf_fields)
    {
        return '';
    }

    
}

if (!function_exists('vtx_render_block_traditional_rankings')) {
function vtx_render_block_traditional_rankings($attributes, $post_ID, $block_design)
{

    // Extract attributes with defaults
    $post_type = isset($attributes['postType']) ? $attributes['postType'] : 'school_ranking';
    $program = isset($attributes['program']) ? $attributes['program'] : '';
    $has_two_and_four_years = isset($attributes['hasTwoAndFourYears']) ? $attributes['hasTwoAndFourYears'] : '';
    $default_level_year = isset($attributes['defaultLevelYear']) ? $attributes['defaultLevelYear'] : '';
    $version = isset($attributes['version']) ? $attributes['version'] : '';

    // Determine the level year value based on the post type and default level year.
    $level_year_value = edumed_leveling_year_value($post_type, $default_level_year);

    // Get ranking data.
    $posts = edumed_get_rankings_data($post_type, $level_year_value, $version, $program);

    // Count the number of rankings retrieved.
    $rankings_count = count($posts);

    // Set default open based on the number of schools
    $default_open = $rankings_count >= 6 ? 3 : $rankings_count;

    // Check if the query was successful.
    $query_success = !empty($posts);

    // Initialize JSON-LD schema structure.
    $ranking_data_schema_json = '';
    if ($query_success) {
        $ranking_data_schema_json .= '{
            "@context":"https://schema.org",
            "@type":"ItemList",
            "name":"' . esc_attr($program) . '",
            "description":"",
            "itemListElement":[';
    }

    // Determine the ID for the level year.
    $level_year_id = $default_level_year === 'two-year' ? 'two-year-rankings' : 'four-year-rankings';

    // Determine the class based on the block design.
    $ranking_class = vtx_determine_class_name($block_design);

    ?>
    <span id="rankings-<?php echo esc_attr($default_level_year); ?>"></span>
    <div
        class="cafeto-edumed-rankings-block  <?php echo esc_attr($ranking_class); ?>"
        data-query-status="<?php echo esc_attr($query_success ? 'success' : 'error'); ?>"
        data-level-year="<?php echo esc_attr($default_level_year); ?>"
        data-has-years="<?php echo esc_attr($has_two_and_four_years); ?>"
        data-default-open="<?php echo esc_attr($default_open); ?>"
        id="<?php echo esc_attr($level_year_id); ?>">

        <!-- Render Top Bar -->
        <?php
            echo edumed_render_top_bar_school_ranking($program, $level_year_value, $version);
        ?>

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
                if (!empty($ranking_data_schema_json)) {
                    $ranking_data_schema_json = rtrim($ranking_data_schema_json, ',');
                    $ranking_data_schema_json .= ']}';
                }
                ?>
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
}
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
if (!function_exists('edumed_get_rankings_data')) {
function edumed_get_rankings_data($post_type, $level_year_value, $version, $program)
{
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
            'tax_query'    => array(
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
                        'blurb_1' => get_field('blurb_1'),
                        'blurb_2' => get_field('blurb_2'),
                        'blurb_3' => get_field('blurb_3'),
                    ),
                );
            }
        }

        wp_reset_postdata();
        wp_cache_set($cache_key, $posts);
    }

    return $posts;
}
}

/**
 * Renders the top bar section of the rankings block.
 *
 * @return string The HTML content of the top bar.
 */
// function edumed_render_top_bar_school_ranking() {
function edumed_render_top_bar_school_ranking($program, $level_year_value, $version)
{

    ob_start();
    ?>
    <!-- Rankings Top Bar -->
    <section class="rankings-top-bar">

        <!-- Rankings Year -->
        <div class="rankings-top-bar--years">
            <?php if ($level_year_value === '2-year Schools') : ?>
                <a href="#two-year-rankings" class="two-year-button"><?php esc_html_e('2-year Schools', 'edumed'); ?></a>
            <?php elseif ($level_year_value === '4-year Schools') : ?>
                <a href="#four-year-rankings" class="four-year-button"><?php esc_html_e('4-year Schools', 'edumed'); ?></a>
            <?php endif; ?>
        </div>

        <!-- Rankings About the Ranking -->
        <button class="rankings-top-bar--about"><?php esc_html_e('About the Ranking', 'edumed'); ?></button>

        <!-- Rankings Expand Collapse buttons -->
        <div class="rankings-top-bar--expand-collapse">
            <button class="expand-all"><?php esc_html_e('Expand All', 'edumed'); ?></button>
            <button class="collapse-all"><?php esc_html_e('Collapse All', 'edumed'); ?></button>
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
function edumed_render_rankings_item($post, $order)
{
    ob_start();
?>

    <!-- Rankings Item DESKTOP -->
    <?php if (!wp_is_mobile()) : ?>
        <div class="rankings-list__item">

            <!-- Left Section (Heading & Content) -->
            <div class="rankings-list__item-left">

                <!-- Heading & Content -->
                <div class="rankings-list__item-heading">
                    <div class="rankings-list__item-heading__top">
                        <!-- Rank -->
                        <span class="rankings-list__item-heading__top-rank"><?php echo esc_html($order); ?></span>

                        <!-- Title & Location -->
                        <div class="rankings-list__item-heading__top-title">
                            <h4>
                                <a href="<?php echo esc_url($post['acf_fields']['online_program_url']); ?>"
                                    target="_blank" rel="noopener noreferrer nofollow">
                                    <?php echo esc_html($post['title']); ?>
                                </a>
                            </h4>
                            <p><?php echo esc_html($post['acf_fields']['city_location_of_institution']) . ', ' . esc_html($post['acf_fields']['state_abbreviation']); ?></p>
                        </div>
                    </div>

                    <!-- Content -->
                    <?php if (!empty($post['content'])): ?>
                        <div class="rankings-list__item-heading__content">
                            <?php echo wp_kses_post($post['content']); ?>
                        </div>
                    <?php endif; ?>

                    <p class="rankings-list__item-blurbs__title">Why We Selected <?php echo esc_html($post['title']); ?>:</p>
                </div>


                <!-- Toggle Section (Initially Collapsed) -->
                <div class="rankings-list__item-toggle expanded">
                    <!-- Blurbs -->
                    <div class="rankings-list__item-blurbs">

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
                <button class="rankings-list__item-toggle-btn expanded">Less Details</button>
            </div>

            <!-- Program Details (Desktop Sidebar) -->
            <?php if (!empty($post['acf_fields'])) : ?>
                <div class="rankings-list__item-right">
                    <div class="rankings-list__item-data">
                        <p class="rankings-list__item-data__title">Program Details</p>
                        <ul><?php echo edumed_render_traditional_rankings_acf_fields($post['acf_fields']); ?></ul>
                    </div>
                </div>
            <?php endif; ?>

        </div>
    <?php endif; ?>

    <!-- Rankings Item MOBILE -->
    <?php if (wp_is_mobile()) : ?>
        <div class="rankings-list__item">

            <!-- Left Section (Heading & Content) -->
            <div class="rankings-list__item-left">

                <!-- Heading & Content -->
                <div class="rankings-list__item-heading">
                    <div class="rankings-list__item-heading__top">

                        <!-- Rank -->
                        <span class="rankings-list__item-heading__top-rank"><?php echo esc_html($order); ?></span>

                        <!-- Title & Location -->
                        <div class="rankings-list__item-heading__top-title">
                            <h4>
                                <a href="<?php echo esc_url($post['acf_fields']['online_program_url']); ?>"
                                    target="_blank" rel="noopener noreferrer nofollow">
                                    <?php echo esc_html($post['title']); ?>
                                </a>
                            </h4>
                            <p><?php echo esc_html($post['acf_fields']['city_location_of_institution']) . ', ' . esc_html($post['acf_fields']['state_abbreviation']); ?></p>
                        </div>

                        <!-- Toggle Button -->
                        <button class="rankings-list__item-toggle-btn expanded"></button>
                    </div>

                    <!-- Content -->
                    <?php if (!empty($post['content'])): ?>
                        <div class="rankings-list__item-heading__content">
                            <?php echo wp_kses_post($post['content']); ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Toggle Section (Initially Collapsed) -->
                <div class="rankings-list__item-toggle">
                    <!-- Program Details -->
                    <?php if (!empty($post['acf_fields'])): ?>
                        <div class="rankings-list__item-right">
                            <div class="rankings-list__item-data">
                                <p class="rankings-list__item-data__title">Program Details</p>
                                <ul><?php echo edumed_render_traditional_rankings_acf_fields($post['acf_fields']); ?></ul>
                            </div>
                        </div>
                    <?php endif; ?>

                    <!-- Blurbs -->
                    <div class="rankings-list__item-blurbs">
                        <p class="rankings-list__item-blurbs__title">Why We Selected <?php echo esc_html($post['title']); ?>:</p>
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
function edumed_render_traditional_rankings_acf_fields($acf_fields)
{
    ob_start();

    // Accreditation
    if (!empty($acf_fields['accreditation'])) {
        echo '<li><span>' . esc_html__('Accreditation', 'edumed') . '</span>' . esc_html($acf_fields['accreditation']) . '</li>';
    }

    // Average In-State Tuition
    if (!empty($acf_fields['tuition_gutenberg'])) {
        echo '<li><span>' . esc_html__('Average In-State Tuition', 'edumed') . '</span>' . esc_html($acf_fields['tuition_gutenberg']) . '</li>';
    }

    // Average Institutional Aid
    if (!empty($acf_fields['avg_inst_aid'])) {
        echo '<li><span>' . esc_html__('Average Institutional Aid', 'edumed') . '</span>' . esc_html($acf_fields['avg_inst_aid']) . '</li>';
    }

    // % of Students in ≥1 Online Course
    if (!empty($acf_fields['percentage_in_online_ed'])) {
        echo '<li><span>' . esc_html__('% of Students in ≥1 Online Course', 'edumed') . '</span>' . esc_html($acf_fields['percentage_in_online_ed']) . '</li>';
    }

    // % of Students Receiving an Award
    if (!empty($acf_fields['percentage_receiving_award'])) {
        echo '<li><span>' . esc_html__('% of Students Receiving an Award', 'edumed') . '</span>' . esc_html($acf_fields['percentage_receiving_award']) . '</li>';
    }

    // Student/Faculty Ratio
    if (!empty($acf_fields['studentfaculty_ratio'])) {
        echo '<li><span>' . esc_html__('Student/Faculty Ratio', 'edumed') . '</span>' . esc_html($acf_fields['studentfaculty_ratio']) . '</li>';
    }

    return ob_get_clean();
}
