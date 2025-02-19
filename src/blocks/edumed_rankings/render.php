<?php

require_once 'methodology_texts.php';
require_once 'inc/feature-rankings.php';
require_once 'inc/tradicional-rankings.php';

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
    $level_year_value = edumed_leveling_year_value($post_type, $default_level_year);
    $version = isset($attributes['version']) ? $attributes['version'] : '';

    if ($post_type === 'school_ranking') {
        $posts = edumed_get_rankings_data($post_type, $level_year_value, $version, $program);
        $rankings_count = count($posts);

        // Set default open based on the number of schools
        $default_open = $rankings_count >= 6 ? 3 : $rankings_count;
    } else {
        $posts = edumed_get_feature_rankings_data($post_type, $level_year_value, $version, $program);
        $default_open = isset($attributes['defaultOpen']) ? $attributes['defaultOpen'] : '';
    }

    // Verificar si la consulta fue exitosa
    $query_success = !empty($posts);

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
    <div 
        class="cafeto-edumed-rankings-block" 
        data-query-status="<?php echo esc_attr($query_success ? 'success' : 'error'); ?>" 
        data-level-year="<?php echo esc_attr($default_level_year); ?>" 
        data-has-years="<?php echo esc_attr($has_two_and_four_years); ?>" 
        data-default-open="<?php echo esc_attr($default_open); ?>" 
        id="<?php echo esc_attr($level_year_id); ?>"
    >

        <!-- Render Top Bar -->
        <?php
        if ($post_type === 'school_ranking') {
            echo edumed_render_top_bar_school_ranking($program, $level_year_value, $version);
        } else {
            echo edumed_render_top_bar_feature_ranking($program, $level_year_value, $version);
        }
        ?>

        <!-- Render Rankings List -->
        <section class="rankings-list">
            <?php if ($query_success) : ?>
                <?php foreach ($posts as $post) :
                    $order = get_post_field('menu_order', $post['ID']);

                    if ($post_type === 'school_ranking') :
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
                    else :
                        echo edumed_render_feature_ranking_item($post, $order);
                    endif;
                endforeach;

                // Remove trailing comma and close JSON-LD structure
                if (!empty($ranking_data_schema_json)) {
                    $ranking_data_schema_json = rtrim($ranking_data_schema_json, ',');
                    $ranking_data_schema_json .= ']}';
                }
                ?>
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

    $full_star_url = $svg_dir . 'full-star-black.svg';
    $empty_star_url = $svg_dir . 'empty-star-black.svg';

    // Check if the files exist
    if (!file_exists(plugin_dir_path(__FILE__) . 'assets/icons-svg/full-star-black.svg')) {
        error_log('Full star SVG file not found or path is invalid: ' . $full_star_url);
        return '<script>console.error("Full star SVG file not found or path is invalid: ' . esc_js($full_star_url) . '");</script>';
    }

    if (!file_exists(plugin_dir_path(__FILE__) . 'assets/icons-svg/empty-star-black.svg')) {
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

/**
 * Retrieves the leveling year value based on the post type and a default level year.
 *
 * @param string $post_type The type of post for which the leveling year value is retrieved.
 * @param int $default_level_year The default leveling year to be used if no specific value is found.
 *
 * @return mixed The leveling year value corresponding to the post type or the default level year.
 */ 
function edumed_leveling_year_value($post_type, $default_level_year) {
    // Validate inputs
    if (!in_array($post_type, ['school_ranking', 'feature_ranking'])) {
        error_log('Invalid post type: ' . esc_html($post_type));
        return null; // or throw an Exception
    }

    if (!in_array($default_level_year, ['two-year', 'four-year'])) {
        error_log('Invalid default level year: ' . esc_html($default_level_year));
        return null; // or throw an Exception
    }

    // Determine the return value based on post type and default level year
    $level_names = ($post_type === 'school_ranking') 
        ? ['two-year' => '2-year Schools', 'four-year' => '4-year Schools'] 
        : ['two-year' => '2 Year', 'four-year' => '4 Year'];

    return $level_names[$default_level_year];
}

