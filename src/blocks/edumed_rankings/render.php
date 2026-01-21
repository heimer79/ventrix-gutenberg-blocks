<?php
require_once 'methodology_texts.php';
require_once 'inc/feature-rankings.php';
require_once 'inc/tradicional-rankings.php';
require_once 'inc/rankings-2026.php';
require_once 'inc/rankings-2026-v2.php';

/**
 * Renders the custom Gutenberg block for Edumed rankings.
 *
 * @param array $attributes The block attributes.
 * @return string The block content.
 */
function render_cafeto_edumed_rankings_block($attributes)
{
    // Get the current post ID.
    $post_ID = get_the_ID();

    ob_start();


    if (!function_exists('get_field')) {
        $block_design = isset($attributes['blockDesign']) ? $attributes['blockDesign'] : 'school_ranking';

        // Call the appropriate render function based on block design.
        vtx_determine_block_render($block_design, $attributes, $post_ID);
    } else {
        $block_design = get_field('block_design', $post_ID) ?: 'school_ranking';

        // Call the appropriate render function based on block design.
        vtx_determine_block_render($block_design, $attributes, $post_ID);
    }

    return ob_get_clean();
}

/**
 * Determines and calls the appropriate render function based on block design.
 *
 * @param string $block_design The design type of the block.
 * @param array $attributes The block attributes.
 * @param int $post_ID The current post ID.
 * @return string The rendered block content.
 */
function vtx_determine_block_render($block_design, $attributes, $post_ID)
{
    switch ($block_design) {
        case 'school_ranking':
            return vtx_render_block_traditional_rankings(
                $attributes,
                $post_ID,
                $block_design
            );
        case 'ranking_2026':
            return vtx_render_block_rankings_2026(
                $attributes,
                $post_ID,
                $block_design
            );
        case 'rankings_2026_v2':
            return vtx_render_block_rankings_2026_v2(
                $attributes,
                $post_ID,
                $block_design
            );
        case 'feature_ranking':
            return vtx_render_block_feature_rankings(
                $attributes,
                $post_ID,
                $block_design
            );
        default:
            return vtx_render_block_traditional_rankings(
                $attributes,
                $post_ID,
                $block_design
            ); // Default render function if none match
    }
}

/**
 * Determines the appropriate class name based on the block design.
 *
 * @param string $block_design The design type of the block.
 * @return string The corresponding class name.
 */
function vtx_determine_class_name($block_design)
{
    switch ($block_design) {
        case 'school_ranking':
            return 'traditional-rankings';
        case 'ranking_2026':
            return 'rankings-2026';
        case 'rankings_2026_v2':
            return 'rankings-2026-v2';
        case 'feature_ranking':
            return 'featured-rankings';
        default:
            return 'traditional-rankings'; // Default class if none match
    }
}

/**
 * Renders the stars based on the number provided.
 *
 * @param int $stars The number of full stars to display.
 * @return string The HTML content of the stars.
 */
function edumed_render_stars($stars)
{
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
 * @param bool $methodology_option Whether to use the methodology option repeater.
 * @param int|null $post_ID The post/page ID where the block is placed (for reading methodology_text_version field).
 * @return string The HTML content of the popup section.
 */
function edumed_render_popup_section($posts, $methodology_option = false, $post_ID = null)
{
    $first_post = null;
    $methodology_text_option = '';

    if (empty($posts) || !is_array($posts)) {
        return ''; // Return empty string or handle error as needed
    }

    // Get the post ID from the page where the block is placed, not from ranking posts
    if ($post_ID === null) {
        $post_ID = get_the_ID();
    }

    ob_start();
    ?>
    <section class="rankings-popup">
        <div class="rankings-popup--widget rankings-popup--2024 hidden">
            <span class="rankings-popup--widget--close">X</span>
            <?php

            // Safely access the first post and its ACF fields
            $first_post = $posts[0];

            if ($methodology_option) {
                // Ensure 'acf_fields' exists and is an array.
                $methodology_options = get_field('ranking_metodology_options', 'option');

                // Get the methodology text version from the PAGE/POST where the block is placed, not from ranking posts
                // Using the existing 'metodology_text' field for backward compatibility
                $methodology_text_option = get_field('metodology_text', $post_ID);
                
                // If empty, default to '1'
                if (empty($methodology_text_option)) {
                    $methodology_text_option = '1';
                }

                // Debug: Check what we're actually getting
                $raw_value = get_field('metodology_text', $post_ID);
                $debug_info = array(
                    'post_id' => $post_ID,
                    'requested_version_raw' => $raw_value,
                    'requested_version_type' => gettype($raw_value),
                    'requested_version_processed' => $methodology_text_option,
                    'options_count' => is_array($methodology_options) ? count($methodology_options) : 'NOT ARRAY',
                    'options_keys' => is_array($methodology_options) ? array_keys($methodology_options) : 'N/A',
                );
                error_log('DEBUG Methodology: ' . print_r($debug_info, true));

                // Convert to integer and adjust for zero-based index.
                $option = (int)$methodology_text_option - 1;
                
                // Additional debug: Check the actual structure of methodology_options
                if (is_array($methodology_options)) {
                    error_log('DEBUG Methodology - First option structure: ' . print_r($methodology_options[0] ?? 'NO FIRST OPTION', true));
                    error_log('DEBUG Methodology - Requested option structure: ' . print_r($methodology_options[$option] ?? 'OPTION NOT FOUND', true));
                }
                
                // Check if the calculated index is valid
                if (is_array($methodology_options) && isset($methodology_options[$option]) && isset($methodology_options[$option]['content_version'])) {
                    error_log('DEBUG Methodology - SUCCESS: Using index ' . $option . ' (version ' . $methodology_text_option . ')');
                    echo $methodology_options[$option]['content_version'];
                } else {
                    $available_indices = is_array($methodology_options) ? implode(', ', array_keys($methodology_options)) : 'N/A';
                    error_log('DEBUG Methodology - FAILED: Index ' . $option . ' not found or invalid. Requested version: ' . $methodology_text_option . '. Available indices: ' . $available_indices);
                    // Show debug info in HTML comment for easier debugging
                    echo '<!-- DEBUG: Post ID=' . esc_html($post_ID) . ', Requested version=' . esc_html($methodology_text_option) . ', Calculated index=' . esc_html($option) . ', Available indices=' . esc_html($available_indices) . ' -->';
                }

            } else {

                // Ensure 'acf_fields' exists and is an array
                $methodology_text_option = isset($first_post['acf_fields']['methodology_text_option']) ? $first_post['acf_fields']['methodology_text_option'] : '1';

                // Render the methodology text based on the option.
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
function edumed_leveling_year_value($post_type, $default_level_year)
{
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
