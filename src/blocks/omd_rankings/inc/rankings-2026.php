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
  if (!function_exists('vtx_get_rankings_omd_data_2026')) {
    function vtx_get_rankings_omd_data_2026($post_type, $version, $program)
    {
      return array(); // Return empty array to prevent errors
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

  if (!function_exists('vtx_get_rankings_omd_data_2026')) {
    function vtx_get_rankings_omd_data_2026($post_type, $version, $program)
    {
      return array(); // Return empty array to prevent errors
    }
  }

  return;
}

/**
 * Security check: Verify WP_Query class exists
 */
if (!class_exists('WP_Query')) {
  if (!function_exists('vtx_get_rankings_omd_data_2026')) {
    function vtx_get_rankings_omd_data_2026($post_type, $version, $program)
    {
      return array(); // Return empty array to prevent errors
    }
  }
  return;
}

function vtx_render_block_omd_rankings_2026($attributes, $post_ID, $block_design)
{

  // Extract attributes with defaults
  $post_type = get_field('ranking_page_post_type', $post_ID) ?: 'latest_ranking';
  $program = get_field('ranking_page_program', $post_ID)->name ?: 'CNA';
  $default_open = get_field('ranking_page_default_open', $post_ID) ?: 3;
  $methodology_popup = get_field('ranking_page_methodology_popup', $post_ID) ?: 1;
  $version = get_field('ranking_page_version', $post_ID) ?: '2026';

  // Get ranking data.
  $posts = vtx_get_rankings_omd_data_2026($post_type, $version, $program);

  // Check if the query was successful.
  $query_success = !empty($posts);

  // Determine the class based on the block design.
  $ranking_class = vtx_omd_determine_class_name($block_design);

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

  <div class="vtx-omd-rankings-block  <?php echo esc_attr($ranking_class); ?>"
    id="ranking-grid-<?php echo esc_attr(uniqid()); ?>"
    data-query-status="<?php echo esc_attr($query_success ? 'success' : 'error'); ?>"
    data-default-open="<?php echo esc_attr($default_open); ?>">

    <!-- Rankings Top Bar -->
    <div class="rankings-top-bar">

      <!-- Rankings About the Ranking -->
      <button class="rankings-top-bar__about"><?php esc_html_e('About the Ranking', 'vtx-omd'); ?></button>

      <!-- Rankings Expand Collapse buttons -->
      <div class="rankings-top-bar__expand-collapse">
        <button class="expand-all"><?php esc_html_e('Expand All', 'vtx-omd'); ?></button>
        <button class="collapse-all"><?php esc_html_e('Collapse All', 'vtx-omd'); ?></button>
      </div>
    </div>

    <!-- Rankings Accordion -->
    <div class="ranking-lists__accordion">
      <?php if ($query_success) : ?>
        <?php foreach ($posts as $index => $post): ?>
          <?php $order = $post['order']; ?>

          <div class="ranking-lists__accordion-item">
            <?php
            $fields = $post['acf_fields'];

            // Prepare link URL and school cost for JSON-LD schema
            $link_url = !empty($fields['program_url']) ? $fields['program_url'] : get_permalink($post['ID']);
            $school_cost = !empty($fields['tuition']) ? $fields['tuition'] : 'N/A';
            ?>

            <!-- Summary row -->
            <div class="ranking-item__summary">
              <div class="ranking-item__school">
                <span class="ranking-item__number"><?php echo $order; ?></span>
                <div class="item__school-info">
                  <h4>
                    <a href="<?php echo esc_url($link_url); ?>"
                      target="_blank" rel="noopener noreferrer nofollow">
                      <?php echo esc_html($post['title']); ?>
                    </a>
                  </h4>
                  <span class="item__location"><?php echo $fields['city'] . ', ' . $fields['state']; ?></span>
                </div>
              </div>
              <div class="ranking-item__stats">
                <span class="ranking-item__stats-school-type"><?php echo esc_html($fields['school_type']); ?></span>
                <span class="ranking-item__stats-separator">·</span>
                <span class="ranking-item__stats-accreditation"><?php echo esc_html($fields['accreditation']); ?></span>
              </div>
              <button class="toggle-details" aria-expanded="false">+</button>
            </div>

            <!-- Hidden details -->
            <div class="ranking-item__details" aria-hidden="true">
              <div class="ranking-item__content">
                <p class="description"><?php echo $post['content']; ?></p>
                <h5 class="subtitle">Program Highlights:</h5>
                <ul class="omd-list">
                  <li><?php echo esc_html($fields['blurb_1']); ?></li>
                  <li><?php echo esc_html($fields['blurb_2']); ?></li>
                  <li><?php echo esc_html($fields['blurb_3']); ?></li>
                </ul>
              </div>
              <div class="ranking-item__program-details">
                <ul>
                  <?php if (!empty($fields['school_type'])): ?>
                    <li class="item-detail hidden-desktop">
                      <span class="item-detail__label">School Type</span>
                      <?php echo esc_html($fields['school_type']); ?>
                    </li>
                  <?php endif; ?>
                  <?php if (!empty($fields['application_fee'])): ?>
                    <li class="item-detail">
                      <span class="item-detail__label">Application Fee</span>
                      <?php echo esc_html($fields['application_fee']); ?>
                    </li>
                  <?php endif; ?>
                  <?php if (!empty($fields['tuition'])): ?>
                    <li class="item-detail">
                      <span class="item-detail__label">Tuition</span>
                      <?php echo esc_html($fields['tuition']); ?>
                    </li>
                  <?php endif; ?>
                  <?php if (!empty($fields['accreditation'])): ?>
                    <li class="item-detail hidden-desktop">
                      <span class="item-detail__label">Accreditation</span>
                      <?php echo esc_html($fields['accreditation']); ?>
                    </li>
                  <?php endif; ?>
                  <?php if (!empty($fields['students_course'])): ?>
                    <li class="item-detail">
                      <span class="item-detail__label">Students in Course</span>
                      <?php echo esc_html($fields['students_course']); ?>
                    </li>
                  <?php endif; ?>
                </ul>
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
    <?php echo omd_render_popup_section($methodology_popup, $posts[0], true); ?>
  </div>

<?php

  // Insert JSON-LD schema script
  if (!empty($ranking_data_schema_json)) {
    echo '<script type="application/ld+json">' . wp_kses_post($ranking_data_schema_json) . '</script>';
  }
}

/**
 * Retrieves and caches ranking data for OMD.
 *
 * @param string $post_type The post type to query (e.g., 'ranking').
 * @param string|int $version The ranking version (e.g., '2026').
 * @param string $program The taxonomy term (program name).
 * @return array The list of ranking posts with ACF fields.
 */
function vtx_get_rankings_omd_data_2026($post_type, $version, $program)
{
  if (empty($post_type) || empty($version) || empty($program)) {
    return [];
  }

  // ✅ Cache key per combination
  $cache_key = sprintf('rankings_data_%s_%s_%s', $post_type, $version, sanitize_title($program));

  // Try to fetch cached data first
  $posts = wp_cache_get($cache_key, 'rankings');
  if ($posts !== false) {
    return $posts;
  }

  // ✅ Build query args efficiently
  $rankings_args = [
    'post_type'      => $post_type,
    'post_status'    => 'publish',
    'orderby'        => 'menu_order',
    'order'          => 'ASC',
    'posts_per_page' => -1,
    'no_found_rows'  => true, // Performance optimization
    'update_post_term_cache' => false,
    'update_post_meta_cache' => false,
    'meta_query' => [
      [
        'key'     => 'version',
        'value'   => $version,
        'compare' => '=',
      ],
    ],
    'tax_query' => [
      [
        'taxonomy' => 'ranking_category',
        'field'    => 'name',
        'terms'    => $program,
      ],
    ],
  ];

  $rankings_query = new WP_Query($rankings_args);

  if (! $rankings_query->have_posts()) {
    wp_cache_set($cache_key, [], 'rankings', DAY_IN_SECONDS);
    return [];
  }

  $posts = [];

  while ($rankings_query->have_posts()) {
    $rankings_query->the_post();
    $post_id = get_the_ID();

    // ✅ Retrieve ACF fields in one go (more efficient)
    $fields = get_fields($post_id) ?: [];

    // ✅ Defensive code: safely access program_category name
    $program_category = $fields['program_category'] ?? null;
    $program_name = is_object($program_category) ? $program_category->name : '';

    // ✅ Prepare structured response
    $posts[] = [
      'ID'      => $post_id,
      'title'   => get_the_title(),
      'content' => apply_filters('the_content', get_the_content()), // ensure content filters apply
      'order'   => (int) get_post_field('menu_order', $post_id),
      'acf_fields' => [
        'version'             => $fields['version'] ?? '',
        'asset_url'           => $fields['asset_url'] ?? '',
        'program'             => $program_name,
        'program_url'         => $fields['program_category_url'] ?? '',
        'unitid'              => $fields['ranking_unitid'] ?? '',
        'city'                => $fields['ranking_city'] ?? '',
        'state'               => $fields['ranking_state'] ?? '',
        'school_type'         => $fields['ranking_school_type'] ?? '',
        'tuition'             => $fields['ranking_tuition'] ?? '',
        'accreditation'       => $fields['ranking_accreditation'] ?? '',
        'pmastr'              => $fields['ranking_2026_pmastr'] ?? '',
        'academic'            => $fields['ranking_2026_academic'] ?? '',
        'application_fee'     => $fields['ranking_2026_application_fee'] ?? '',
        'online_students'     => $fields['ranking_2026_online_students'] ?? '',
        'some_distance'       => $fields['ranking_2026_some_distance'] ?? '',
        'students_course'     => $fields['ranking_2026_students_course'] ?? '',
        'score'               => $fields['score'] ?? '',
        'blurb_1'             => $fields['ranking_2026_blurb_1'] ?? '',
        'blurb_2'             => $fields['ranking_2026_blurb_2'] ?? '',
        'blurb_3'             => $fields['ranking_2026_blurb_3'] ?? '',
      ],
    ];
  }

  wp_reset_postdata();

  // ✅ Cache for 24 hours for performance
  wp_cache_set($cache_key, $posts, 'rankings', DAY_IN_SECONDS);

  return $posts;
}
