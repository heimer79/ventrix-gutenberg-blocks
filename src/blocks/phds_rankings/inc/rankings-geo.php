<?php

/**
 * Rankings Geo 2026 Block.
 *
 * @package EduMed
 */

/**
 * Security check: Verify that ACF is active and functions exist
 */
if (!function_exists('get_field')) {
  // ACF is not active, return error message
  if (!function_exists('vtx_get_rankings_phds_data_geo')) {
    function vtx_get_rankings_phds_data_geo($post_type, $version, $program)
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

  if (!function_exists('vtx_get_rankings_phds_data_geo')) {
    function vtx_get_rankings_phds_data_geo($post_type, $version, $program)
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
  if (!function_exists('vtx_get_rankings_phds_data_geo')) {
    function vtx_get_rankings_phds_data_geo($post_type, $version, $program)
    {
      return array(); // Return empty array to prevent errors
    }
  }
  return;
}

function vtx_render_block_phds_rankings_geo($attributes, $post_ID, $block_design)
{
  // Block rendering logic would go here

  // Extract attributes with defaults
  $post_type = get_field('ranking_page_post_type', $post_ID) ?: 'latest_ranking';
  $program = get_field('ranking_page_program', $post_ID)->name ?: 'CNA';
  $default_open = get_field('ranking_page_default_open', $post_ID) ?: 3;
  $methodology_popup = get_field('ranking_page_methodology_popup', $post_ID) ?: 1;
  $version = get_field('ranking_page_version', $post_ID) ?: '2026';

  // Get ranking data.
  $posts = vtx_get_rankings_phds_data_geo($post_type, $version, $program);

  // Check if the query was successful.
  $query_success = !empty($posts);

  // Determine the class based on the block design.
  $ranking_class = vtx_phds_determine_class_name($block_design);

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

  <div class="vtx-phds-rankings-block  <?php echo esc_attr($ranking_class); ?>"
    id="ranking-grid-<?php echo esc_attr(uniqid()); ?>"
    data-query-status="<?php echo esc_attr($query_success ? 'success' : 'error'); ?>"
    data-default-open="<?php echo esc_attr($default_open); ?>">

    <!-- Rankings Top Bar -->
    <div class="rankings-top-bar">
      <!-- Rankings About the Ranking -->
      <div class="rankings-top-bar__button-tooltip">
        <button class="rankings-top-bar__about"><?php esc_html_e('About the Data', 'vtx-edumed'); ?></button>
        <div class="rankings-top-bar__tooltip-content">
          <p>
            All school data is drawn from the U.S. Department of Education’s Integrated Post secondary Education Data System (IPEDS). Schools are ordered from largest to smallest doctoral graduate population to provide a clear view of which institutions have the most established doctoral-level presence and capacity. This ordering does not imply program quality, but rather highlights relative size and reach within doctoral education.
          </p>
        </div>
      </div>

      <!-- Rankings Expand Collapse buttons -->
      <div class="rankings-top-bar__expand-collapse">
        <button class="expand-all"><?php esc_html_e('Expand All', 'vtx-phds'); ?></button>
        <button class="collapse-all"><?php esc_html_e('Collapse All', 'vtx-phds'); ?></button>
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
                <!-- <span class="ranking-item__number"><?php echo $order; ?></span> -->
                <div class="item__school-info">
                  <h3>
                    <a href="<?php echo esc_url($link_url); ?>"
                      target="_blank" rel="noopener noreferrer nofollow">
                      <?php echo esc_html($post['title']); ?>
                    </a>
                    </h4>
                    <span class="item__location"><?php echo $fields['city'] . ', ' . $fields['state']; ?></span>
                </div>
              </div>
              <div class="ranking-item__doctoral-graduates hidden-mobile">
                <span class="ranking-item__doctoral-graduates__label">Doctoral Graduates</span>
                <span class="ranking-item__doctoral-graduates__value"><?php echo esc_html($fields['geo_doctoral_graduates']); ?></span>
              </div>
              <div class="ranking-item__online-students hidden-mobile">
                <span class="ranking-item__online-students__label">Online Students</span>
                <span class="ranking-item__online-students__value"><?php echo esc_html($fields['geo_online_student']); ?></span>
              </div>
              <button class="toggle-details" aria-expanded="false">+</button>
            </div>

            <div class="ranking-item__distance-cost-mobile hidden-desktop">
              <div class="ranking-item__doctoral-graduates">
                <span class="ranking-item__doctoral-graduates__value"><?php echo esc_html($fields['geo_doctoral_graduates']); ?></span>
                <span class="ranking-item__doctoral-graduates__label">Doctoral Graduates</span>
              </div>
              <div class="ranking-item__online-students">
                <span class="ranking-item__online-students__value"><?php echo esc_html($fields['geo_online_student']); ?></span>
                <span class="ranking-item__online-students__label">Online Students</span>
              </div>
            </div>

            <!-- Hidden details -->
            <div class="ranking-item__details" aria-hidden="true">
              <div class="ranking-item__content">
                <p class="description"><?php echo $post['content']; ?></p>
              </div>
              <div class="ranking-item__program-details">
                <ul class="ranking-item__program-details__list">
                  <li><span>School Type</span> <?php echo esc_html($fields['school_type']); ?></li>
                  <li><span>Age 25-64 Enrollment</span> <?php echo esc_html($fields['geo_age_enrollment']); ?></li>
                  <li><span>FT Enrollment</span> <?php echo esc_html($fields['geo_ft_enrollment']); ?></li>
                  <li><span>PT Enrollment</span> <?php echo esc_html($fields['geo_pt_enrollment']); ?></li>
                  <li><span>In-State Tuition</span> <?php echo esc_html($fields['geo_in_state_tuition']); ?></li>
                  <li><span>Out-of-State Tuition</span> <?php echo esc_html($fields['geo_out_of_state_tuition']); ?></li>
                  <li><span>Application Fee</span> <?php echo esc_html($fields['geo_application_fee']); ?></li>
                  <li><span>Alt. Tuition Plan(s)</span> <?php echo esc_html($fields['geo_alt_tuition_plans']); ?></li>
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

    <!-- Show More Button -->
    <?php if ($query_success && count($posts) > 25) : ?>
      <div class="ranking-show-more-wrapper">
        <button
          class="ranking-show-more-btn"
          data-visible-count="25"
          aria-expanded="false">
          Show more
        </button>
      </div>
    <?php endif; ?>

  </div>

<?php
}
/**
 * Retrieves and caches ranking data for OMD.
 *
 * @param string $post_type The post type to query (e.g., 'ranking').
 * @param string|int $version The ranking version (e.g., '2026').
 * @param string $program The taxonomy term (program name).
 * @return array The list of ranking posts with ACF fields.
 */
function vtx_get_rankings_phds_data_geo($post_type, $version, $program)
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
        'version'               => $fields['version'] ?? '',
        'asset_url'             => $fields['asset_url'] ?? '',
        'program'               => $program_name,
        'program_url'           => $fields['program_category_url'] ?? '',
        'unitid'                => $fields['ranking_unitid'] ?? '',
        'city'                  => $fields['ranking_city'] ?? '',
        'state'                 => $fields['ranking_state'] ?? '',
        'school_type'           => $fields['ranking_school_type'] ?? '',
        'geo_out_of_state_tuition'  => $fields['ranking_geo_out_of_state_tuition'] ?? '',
        'geo_alt_tuition_plans'     => $fields['ranking_geo_alt_tuition_plans'] ?? '',
        'geo_age_enrollment'        => $fields['ranking_geo_age_enrollment'] ?? '',
        'geo_distance_ed_students'  => $fields['ranking_geo_distance_ed_students'] ?? '',
        'geo_ft_enrollment'         => $fields['ranking_geo_ft_enrollment'] ?? '',
        'geo_doctoral_graduates'    => $fields['ranking_geo_doctoral_graduates'] ?? '',
        'geo_pt_enrollment'         => $fields['ranking_geo_pt_enrollment'] ?? '',
        'geo_online_student'        => $fields['ranking_geo_online_students'] ?? '',
        'geo_in_state_tuition'      => $fields['ranking_geo_in_State_tuition'] ?? '',
        'geo_application_fee'       => $fields['ranking_geo_application_fee'] ?? '',
        'geo_score'                 => $fields['ranking_geo_score'] ?? '',
      ],
    ];
  }

  wp_reset_postdata();

  // ✅ Cache for 24 hours for performance
  wp_cache_set($cache_key, $posts, 'rankings', DAY_IN_SECONDS);

  return $posts;
}
