<?php
/**
 * Feature Rankings block.
 *
 * @package EduMed
 */

/**
 * Security check: Verify that ACF is active and functions exist
 */
if (!function_exists('get_field')) {
    // ACF is not active, return error message
    function edumed_get_feature_rankings_data($post_type, $level_year_value, $version, $program) {
        return array(); // Return empty array to prevent errors
    }
    
    function edumed_render_top_bar_feature_ranking() {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Advanced Custom Fields (ACF) plugin is required for this block to function properly. 
            Please install and activate ACF plugin.
        </div>';
    }
    
    function edumed_render_feature_ranking_item($post, $order) {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Advanced Custom Fields (ACF) plugin is required for this block to function properly.
        </div>';
    }
    
    function edumed_render_feature_rankings_acf_fields($acf_fields) {
        return '';
    }
    
    return;
}

/**
 * Security check: Verify WordPress core functions exist
 */
if (!function_exists('wp_cache_get') || !function_exists('wp_cache_set') || 
    !function_exists('get_the_ID') || !function_exists('get_the_title') || 
    !function_exists('get_the_content') || !function_exists('wp_reset_postdata') ||
    !function_exists('esc_html') || !function_exists('esc_html__') || 
    !function_exists('esc_url') || !function_exists('wp_kses_post')) {
    
    function edumed_get_feature_rankings_data($post_type, $level_year_value, $version, $program) {
        return array(); // Return empty array to prevent errors
    }
    
    function edumed_render_top_bar_feature_ranking() {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Required WordPress functions are not available. 
            This may indicate a WordPress installation issue.
        </div>';
    }
    
    function edumed_render_feature_ranking_item($post, $order) {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Required WordPress functions are not available.
        </div>';
    }
    
    function edumed_render_feature_rankings_acf_fields($acf_fields) {
        return '';
    }
    
    return;
}

/**
 * Security check: Verify WP_Query class exists
 */
if (!class_exists('WP_Query')) {
    function edumed_get_feature_rankings_data($post_type, $level_year_value, $version, $program) {
        return array(); // Return empty array to prevent errors
    }
    
    function edumed_render_top_bar_feature_ranking() {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> WordPress query functionality is not available. 
            This may indicate a WordPress installation issue.
        </div>';
    }
    
    function edumed_render_feature_ranking_item($post, $order) {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> WordPress query functionality is not available.
        </div>';
    }
    
    function edumed_render_feature_rankings_acf_fields($acf_fields) {
        return '';
    }
    
    return;
}

function vtx_render_block_feature_rankings($attributes, $post_ID, $block_design)
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
    $posts = edumed_get_feature_rankings_data($post_type, $level_year_value, $version, $program);

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
            echo edumed_render_top_bar_feature_ranking($program, $level_year_value, $version);
        ?>

        <!-- Render Rankings List -->
        <section class="rankings-list">
            <?php if ($query_success) : ?>
                <?php foreach ($posts as $post) :
                    $order = get_post_field('menu_order', $post['ID']);

                    echo edumed_render_feature_ranking_item($post, $order);
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
}

/**
 * Retrieves feature rankings data based on the specified parameters.
 *
 * @param string $post_type The type of post for which to retrieve rankings.
 * @param string $level_year_value The year level to filter the rankings.
 * @param string $version The version of the rankings to be retrieved.
 * @param string $program The program associated with the rankings.
 * @return array Returns an array of feature rankings data.
 */
function edumed_get_feature_rankings_data($post_type, $level_year_value, $version, $program) {
    // Cache key
    $taxonomy = 'ranking_program';
    $cache_key = "rankings_data_{$post_type}_{$level_year_value}_{$version}_{$program}";
    $posts = wp_cache_get($cache_key);

    // Return cached posts if available
    if ($posts !== false) {
        return $posts;
    }

    // Prepare query arguments
    $rankings_args = [
        'post_type'      => $post_type,
        'post_status'    => 'publish',
        'orderby'        => 'menu_order',
        'order'          => 'ASC',
        'posts_per_page' => -1,
        'meta_query'     => [
            [
                'key'     => 'level_of_institution',
                'value'   => $level_year_value,
                'compare' => '='
            ],
        ],
        'tax_query'      => [
            [
                'taxonomy' => $taxonomy,
                'field'    => 'slug',
                'terms'    => $program,
            ],
        ],
    ];

    // Execute query
    $rankings_query = new WP_Query($rankings_args);
    $posts = [];

    if ($rankings_query->have_posts()) {
        while ($rankings_query->have_posts()) {
            $rankings_query->the_post();

            // Use a single call to get_field to fetch ACF fields
            $acf_fields = [
                'unit_id' => get_field('unit_id'),
                'school_type' => get_field('school_type'),
                'city' => get_field('city'),
                'state' => get_field('state'),
                'web_address' => get_field('web_address'),
                'level_of_institution' => get_field('level_of_institution'),
                'academic_career_counseling_service' => get_field('academic_career_counseling_service'),
                'employment_services_for_students' => get_field('employment_services_for_students'),
                'placement_services_for_completers' => get_field('placement_services_for_completers'),
                'undergraduate_level_programs_or_courses' => get_field('undergraduate_level_programs_or_courses'),
                'alternative_tuition_plans' => get_field('alternative_tuition_plans'),
                'affordability_score' => get_field('affordability_score'),
                'affordability' => get_field('affordability'),
                'outcomes_score' => get_field('outcomes_score'),
                'outcomes' => get_field('outcomes'),
                'representation_score' => get_field('representation_score'),
                'representation' => get_field('representation'),
                'online_learning_score' => get_field('online_learning_score'),
                'online_learning' => get_field('online_learning'),
            ];

            $posts[] = [
                'ID' => get_the_ID(),
                'title' => get_the_title(),
                'content' => get_the_content(),
                'acf_fields' => $acf_fields,
            ];
        }
    } else {
        // Handle the case where no posts were found
        error_log('No rankings found for the given criteria: ' . json_encode($rankings_args));
    }

    wp_reset_postdata();
    wp_cache_set($cache_key, $posts);

    return $posts;
}


/**
 * Renders the top bar feature ranking for the education module.
 * This function is responsible for generating and displaying
 * the ranking of features related to education within the top bar.
 * 
 * * @return string The HTML content of the top bar.
 */
function edumed_render_top_bar_feature_ranking() {
    ob_start();
    
    // Check if output buffering is successful
    if (ob_get_level() === 0) {
        error_log('Output buffering is not active.');
        return '';
    }
    
    ?>
    <section class="rankings-top-bar">
        <div class="rankings-top-bar--years">
            <a href="#two-year-rankings" class="two-year-button"><?php esc_html_e('2-year Schools', 'text-domain'); ?></a>
            <a href="#four-year-rankings" class="four-year-button"><?php esc_html_e('4-year Schools', 'text-domain'); ?></a>
        </div>
        <div class="rankings-top-bar--expand-collapse">
            <button class="expand-all"><?php esc_html_e('Expand All', 'text-domain'); ?></button>
            <button class="collapse-all"><?php esc_html_e('Collapse All', 'text-domain'); ?></button>
        </div>
    </section>
    <?php

    return ob_get_clean();
}


/**
 * Renders a feature ranking item for the given post with the specified order.
 *
 * This function is responsible for displaying the ranking information of 
 * specific features related to an educational post within the context of 
 * the application. It takes in a post object and an order to determine how 
 * the information should be presented.
 *
 * @param object $post The post object containing the feature information.
 * @param int $order The order in which to display the ranking item.
 * @return void
 */
function edumed_render_feature_ranking_item($post, $order) {
  ob_start();
?>
  <div class="rankings-list--item">
    <div class="rankings-list--item--heading">
      <div class="rankings-list--item--heading--left">
        <span class="rankings-list--item--heading--left--rank"><?php echo esc_html($order); ?></span>
        <div class="rankings-list--item--heading--left--title">
          <h4><a href="<?php echo esc_url($post['acf_fields']['web_address']); ?>" target="_blank" rel="noopener noreferrer nofollow"><?php echo esc_html($post['title']); ?></a></h4>
          <p><?php echo esc_html($post['acf_fields']['city']) . ', ' . esc_html($post['acf_fields']['state']); ?></p>
        </div>
        <span class="rankings-list--item--heading--left--button"></span>
      </div>
      <div class="rankings-list--item--heading--right">
        <p><?php echo esc_html($post['acf_fields']['school_type']); ?></p>
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
            <?php echo edumed_render_feature_rankings_acf_fields($post['acf_fields']); ?>
          </ul>
        </div>
      <?php endif; ?>
    </div>
  </div>
<?php
  return ob_get_clean();
}

/**
 * Renders the ACF fields for the rankings item.
 *
 * @param array $acf_fields The ACF fields.
 * @return string The HTML content of the ACF fields.
 */
/**
 * Renders the ACF fields for the feature rankings in the education module.
 *
 * @param array $acf_fields An array of ACF fields to be rendered.
 * @return void
 */
function edumed_render_feature_rankings_acf_fields($acf_fields) {
  ob_start();

  $features = [
      'affordability' => esc_html__('Affordability', 'text-domain'),
      'outcomes' => esc_html__('Outcomes', 'text-domain'),
      'representation' => esc_html__('Representation', 'text-domain'),
      'online_learning' => esc_html__('Online Learning', 'text-domain'),
  ];

  foreach ($features as $key => $label) {
      if (!empty($acf_fields[$key])) {
          echo '<li><span>' . $label . '</span>' . '<span>' . edumed_render_stars($acf_fields[$key]) . '</span></li>';
      }
  }

  return ob_get_clean();
}
