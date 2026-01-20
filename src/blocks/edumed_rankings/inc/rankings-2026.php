<?php

/**
 * Rankings 2026 Block.
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
    return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Advanced Custom Fields (ACF) plugin is required for this block to function properly. 
            Please install and activate ACF plugin.
        </div>';
  }
  }

  if (!function_exists('edumed_render_rankings_item')) {
  function edumed_render_rankings_item($post, $order)
  {
    return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Advanced Custom Fields (ACF) plugin is required for this block to function properly.
        </div>';
  }
  }

  if (!function_exists('edumed_render_traditional_rankings_acf_fields')) {
  function edumed_render_traditional_rankings_acf_fields($acf_fields)
  {
    return '';
  }
  }

  return;
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

  if (!function_exists('edumed_render_top_bar_school_ranking')) {
    function edumed_render_top_bar_school_ranking($program, $level_year_value, $version)
    {
      return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Required WordPress functions are not available. 
            This may indicate a WordPress installation issue.
        </div>';
    }
  }

  if (!function_exists('edumed_render_rankings_item')) {
    function edumed_render_rankings_item($post, $order)
    {
      return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
            <strong>Error:</strong> Required WordPress functions are not available.
        </div>';
    }
  }

  if (!function_exists('edumed_render_traditional_rankings_acf_fields')) {
    function edumed_render_traditional_rankings_acf_fields($acf_fields)
    {
      return '';
    }
  }

  return;
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

  return;
}

function vtx_render_block_rankings_2026($attributes, $post_ID, $block_design)
{

  // Extract attributes with defaults
  $post_type = get_field('post_type', $post_ID) ?: 'school_ranking';
  $program = get_field('program', $post_ID)->name ?: 'CNA';
  $default_open = get_field('default_open', $post_ID) ?: 3;
  $version = get_field('version', $post_ID) ?: '2025';

  // Get ranking data.
  $posts = vtx_get_rankings_data_2026($post_type, $version, $program);

  // Determine header and stats columns based on presence of 'students_w_aid' field.
  $header_columns = !empty($posts[0]['acf_fields']['students_w_aid']) ? 'ranking-header__columns-5' : 'ranking-header__columns-4';
  $stats_columns = !empty($posts[0]['acf_fields']['students_w_aid']) ? 'ranking-stats__with-aid' : 'ranking-stats__without-aid';

  // Check if the query was successful.
  $query_success = !empty($posts);

  // Determine the class based on the block design.
  $ranking_class = vtx_determine_class_name($block_design);

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

?>

  <div class="cafeto-edumed-rankings-block  <?php echo esc_attr($ranking_class); ?>"
    id="ranking-grid-<?php echo esc_attr(uniqid()); ?>"
    data-query-status="<?php echo esc_attr($query_success ? 'success' : 'error'); ?>"
    data-default-open="<?php echo esc_attr($default_open); ?>">

    <!-- Rankings Top Bar -->
    <div class="rankings-top-bar">

      <!-- Rankings About the Ranking -->
      <button class="rankings-top-bar__about"><?php esc_html_e('About the Ranking', 'vtx-edumed'); ?></button>

      <!-- Rankings Expand Collapse buttons -->
      <div class="rankings-top-bar__expand-collapse">
        <button class="expand-all"><?php esc_html_e('Expand All', 'vtx-edumed'); ?></button>
        <button class="collapse-all"><?php esc_html_e('Collapse All', 'vtx-edumed'); ?></button>
      </div>
    </div>

    <!-- Rankings Header -->
    <div class="ranking-lists__header <?php echo $header_columns; ?>">
      <span class="ranking-lists__header-item">#</span>
      <span class="ranking-lists__header-item">School Name</span>
      <span class="ranking-lists__header-item">Online Enrollment</span>
      <span class="ranking-lists__header-item">Tuition</span>
      <?php if (!empty($posts[0]['acf_fields']['students_w_aid'])): ?>
        <span class="ranking-lists__header-item">Students w/ Aid</span>
      <?php endif; ?>
    </div>

    <!-- Rankings Accordion -->

    <div class="ranking-lists__accordion">
      <?php if ($query_success) : ?>
        <?php foreach ($posts as $index => $post): ?>
          <?php $order = get_post_field('menu_order', $post['ID']); ?>
          <?php
            // Prepare link URL and school cost for JSON-LD schema
            $link_url = !empty($post['acf_fields']['online_program_url']) ? $post['acf_fields']['online_program_url'] : get_permalink($post['ID']);
            $school_cost = !empty($post['acf_fields']['tuition']) ? $post['acf_fields']['tuition'] : 'N/A';
          ?>

          <div class="ranking-lists__accordion-item">
            <?php $fields = $post['acf_fields'] ?>

            <!-- Summary row -->
            <div class="ranking-item__summary">
              <span class="ranking-item__number hidden-mobile"><?php echo $order; ?></span>
              <div class="ranking-item__school">
                <span class="ranking-item__number hidden-desktop"><?php echo $order; ?></span>
                <div>
                  <h4>
                    <a href="<?php echo esc_url($fields['online_program_url']); ?>"
                        target="_blank" rel="noopener noreferrer nofollow">
                        <?php echo esc_html($post['title']); ?>
                    </a>
                  </h4>
                  <span class="ranking-item__location"><?php echo $fields['city'] . ', ' . $fields['state']; ?></span>
                </div>
              </div>
              <div class="ranking-item__stats <?php echo $stats_columns; ?>">
                <?php if (empty($posts[0]['acf_fields']['students_w_aid'])): ?>
                  <div class="stats-content">
                  </div>
                <?php endif; ?>
                <div class="stats-content">
                  <span class="stats-content__title">
                    <?php echo $fields['online_learning']; ?>
                  </span>
                  <span class="stats-content__subtitle">
                    Online Enrollment
                  </span>
                </div>
                <div class="stats-content">
                  <span class="stats-content__title">
                    <?php echo $fields['tuition']; ?>
                  </span>
                  <span class="stats-content__subtitle">
                    Tuition
                  </span>
                </div>
                <?php if (!empty($posts[0]['acf_fields']['students_w_aid'])): ?>
                  <div class="stats-content">
                    <span class="stats-content__title">
                      <?php echo $fields['students_w_aid']; ?>
                    </span>
                    <span class="stats-content__subtitle">
                      Students w/ Aid
                    </span>
                  </div>
                <?php endif; ?>
              </div>
              <button class="toggle-details" aria-expanded="false">+</button>
            </div>

            <!-- Hidden details -->
            <div class="ranking-item__details" aria-hidden="true">
              <div class="ranking-item__content">
                <?php echo wp_kses_post($post['content']); ?>
                <div class="box-apply">
                  <h5>Program Details</h5>
                  <ul>
                    <?php if (!empty($fields['accreditation'])): ?>
                    <li>
                      <?php echo esc_html($fields['accreditation']); ?>
                      <span>Accreditation</span>
                    </li>
                    <?php endif; ?>
                    <?php if (!empty($fields['avg_aid_amount'])): ?>
                    <li>
                      <?php echo esc_html($fields['avg_aid_amount']); ?>
                      <span>Avg. Aid Amount</span>
                    </li>
                    <?php endif; ?>
                    <?php if (!empty($fields['graduation_rate'])): ?>
                    <li>
                      <?php echo esc_html($fields['graduation_rate']); ?>
                      <span>Graduation Rate</span>
                    </li>
                    <?php endif; ?>
                    <?php if (!empty($fields['school_type'])): ?>
                    <li>
                      <?php echo esc_html($fields['school_type']); ?>
                      <span>School Type</span>
                    </li>
                    <?php endif; ?>
                    <?php if (!empty($fields['studentfaculty_ratio'])): ?>
                    <li>
                      <?php echo esc_html($fields['studentfaculty_ratio']); ?>
                      <span>Student/Faculty Ratio</span>
                    </li>
                    <?php endif; ?>
                  </ul>
                </div>
                <h5 class="subtitle">Why We Selected <?php echo esc_html($post['title']); ?></h5>
                <ul class="edumed-list__check">
                  <li><?php echo esc_html($fields['blurb_1']); ?></li>
                  <li><?php echo esc_html($fields['blurb_2']); ?></li>
                  <li><?php echo esc_html($fields['blurb_3']); ?></li>
                </ul>
              </div>
              <div class="ranking-item__program-details">
                <div class="box-apply">
                  <h5>Program Details</h5>
                  <ul>
                    <?php if (!empty($fields['accreditation'])): ?>
                    <li>
                      <?php echo esc_html($fields['accreditation']); ?>
                      <span>Accreditation</span>
                    </li>
                    <?php endif; ?>
                    <?php if (!empty($fields['avg_aid_amount'])): ?>
                    <li>
                      <?php echo esc_html($fields['avg_aid_amount']); ?>
                      <span>Avg. Aid Amount</span>
                    </li>
                    <?php endif; ?>
                    <?php if (!empty($fields['graduation_rate'])): ?>
                    <li>
                      <?php echo esc_html($fields['graduation_rate']); ?>
                      <span>Graduation Rate</span>
                    </li>
                    <?php endif; ?>
                    <?php if (!empty($fields['school_type'])): ?>
                    <li>
                      <?php echo esc_html($fields['school_type']); ?>
                      <span>School Type</span>
                    </li>
                    <?php endif; ?>
                    <?php if (!empty($fields['studentfaculty_ratio'])): ?>
                    <li>
                      <?php echo esc_html($fields['studentfaculty_ratio']); ?>
                      <span>Student/Faculty Ratio</span>
                    </li>
                    <?php endif; ?>
                  </ul>
                </div>
              </div>
            </div>

            <?php
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
            ?>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
      <?php
        // Remove trailing comma and close JSON-LD structure
        if (!empty($ranking_data_schema_json)) {
            $ranking_data_schema_json = rtrim($ranking_data_schema_json, ',');
            $ranking_data_schema_json .= ']}';
        }
      ?>
    </div>

    <!-- Render Popup Section -->
    <?php echo edumed_render_popup_section($posts, true); ?>
  </div>

<?php

  // Insert JSON-LD schema script
  if (!empty($ranking_data_schema_json)) {
      echo '<script type="application/ld+json">' . wp_kses_post($ranking_data_schema_json) . '</script>';
  }
}

/**
 * Retrieves rankings data from the database, with caching.
 *
 * @param string $post_type The post type.
 * @param string $version The version value.
 * @param string $program The program taxonomy term.
 * @return array The array of posts data.
 */
function vtx_get_rankings_data_2026($post_type, $version, $program)
{
  // Cache key
  $cache_key = "rankings_data_{$post_type}_{$version}_{$program}";
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
          'key'     => 'version',
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
            'version' => get_field('version'),
            'asset_url' => get_field('asset_url'),
            'program' => get_field('program')->name,
            'ptotal' => get_field('ptotal'),
            'unitid' => get_field('unitid'),
            'online_program_url' => get_field('online_program_url'),
            'city' => get_field('city'),
            'state' => get_field('state'),
            'school_type' => get_field('school_type'),
            'academiccareer_counseling_service' => get_field('academiccareer_counseling_service'),
            'tuition' => get_field('tuition'),
            'online_learning' => get_field('online_learning'),
            'studentfaculty_ratio' => get_field('studentfaculty_ratio'),
            'students_w_aid' => get_field('students_w_aid'),
            'avg_aid_amount' => get_field('avg_aid_amount'),
            'graduation_rate' => get_field('graduation_rate'),
            'accreditation' => get_field('accreditation'),
            'methodology_text_version' => get_field('methodology_text_version'),
            'score' => get_field('score'),
            'blurb_1' => get_field('blurb_1'),
            'blurb_2' => get_field('blurb_2'),
            'blurb_3' => get_field('blurb_3'),
            'acceptance_rate' => get_field('acceptance_rate'),
            'secondary_school_gpa' => get_field('secondary_school_gpa'),
            'secondary_school_rank' => get_field('secondary_school_rank'),
            'secondary_school_record' => get_field('secondary_school_record'),
            'recommendations' => get_field('recommendations'),
            'formal_demonstration_of_competencies' => get_field('formal_demonstration_of_competencies'),
            'personal_statement_or_essay' => get_field('personal_statement_or_essay'),
            'admission_test_scores' => get_field('admission_test_scores'),
            'control_of_institution_2026' => get_field('control_of_institution_2026'),
          ),
        );
      }
    }

    wp_reset_postdata();
    wp_cache_set($cache_key, $posts);
  }

  return $posts;
}
