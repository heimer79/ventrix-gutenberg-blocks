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
  if (!function_exists('vtx_get_rankings_phds_data_working_professionals')) {
    function vtx_get_rankings_phds_data_working_professionals($post_type, $version, $program)
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

  if (!function_exists('vtx_get_rankings_phds_data_working_professionals')) {
    function vtx_get_rankings_phds_data_working_professionals($post_type, $version, $program)
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
  if (!function_exists('vtx_get_rankings_phds_data_working_professionals')) {
    function vtx_get_rankings_phds_data_working_professionals($post_type, $version, $program)
    {
      return array(); // Return empty array to prevent errors
    }
  }
  return;
}

function vtx_render_block_phds_rankings_working_professionals($attributes, $post_ID, $block_design)
{

  // Extract attributes with defaults
  $post_type = get_field('ranking_page_post_type', $post_ID) ?: 'latest_ranking';
  $program = get_field('ranking_page_program', $post_ID)->name ?: 'CNA';
  $default_open = get_field('ranking_page_default_open', $post_ID) ?: 3;
  $methodology_popup = get_field('ranking_page_methodology_popup', $post_ID) ?: 1;
  $version = get_field('ranking_page_version', $post_ID) ?: '2026';

  // Get ranking data.
  $posts = vtx_get_rankings_phds_data_working_professionals($post_type, $version, $program);

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

    <div class="ranking-methodology" data-methodology>
      <div class="ranking-methodology__label" aria-expanded="false">
        <span class="ranking-methodology__text">
          <?php esc_html_e('Read the Ranking Methodology', 'vtx-phds'); ?>
        </span>

        <!-- Absolute icon -->
        <span class="ranking-methodology__icon" style="transform: rotate(0deg);"></span>
      </div>

      <div class="ranking-methodology__content" hidden>
        <p>To identify the best online doctoral programs for working professionals, we focused on the factors that matter most to you: flexibility, affordability, and support.</p>

        <p>To qualify for ranking consideration, each school had to:</p>
        <ul>
          <li>Offer at least one doctoral program available through distance education</li>
          <li>Provide academic and career counseling services for students</li>
          <li>Offer an alternative tuition plan, such as tuition guarantees, prepaid tuition, or payment plans</li>
        </ul>

        <p>After narrowing the list to qualifying schools, we ranked them using a weighted methodology based on the following key metrics:</p>

        <ol>
          <li>Percent of graduate students enrolled in distance education courses</li>
          <li>Adult (ages 25-64) part-time graduate enrollment</li>
          <li>Overall part-time graduate enrollment</li>
          <li>Per-credit cost for in-state graduate students</li>
          <li>Total price for in-state students living off campus (not with family)</li>
          <li>Number of students earning a doctoral degree</li>
        </ol>
      </div>
    </div>

    <!-- Rankings Top Bar -->
    <div class="rankings-top-bar">
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
              <div class="ranking-item__distance-students hidden-mobile">
                <span class="ranking-item__distance-students__value"><?php echo esc_html($fields['distance_ed_students']); ?></span>
                <span class="ranking-item__distance-students__label">Distance Ed. Students</span>
              </div>
              <div class="ranking-item__cost-credit hidden-mobile">
                <span class="ranking-item__cost-credit__value"><?php echo esc_html($fields['cost_per_credit']); ?></span>
                <span class="ranking-item__cost-credit__label">Cost per Credit</span>
              </div>
              <button class="toggle-details" aria-expanded="false">+</button>
            </div>

            <div class="ranking-item__distance-cost-mobile hidden-desktop">
              <div class="ranking-item__distance-students">
                <span class="ranking-item__distance-students__value"><?php echo esc_html($fields['distance_ed_students']); ?></span>
                <span class="ranking-item__distance-students__label">Distance Ed. Students</span>
              </div>
              <div class="ranking-item__cost-credit">
                <span class="ranking-item__cost-credit__value"><?php echo esc_html($fields['cost_per_credit']); ?></span>
                <span class="ranking-item__cost-credit__label">Cost per Credit</span>
              </div>
            </div>

            <!-- Hidden details -->
            <div class="ranking-item__details" aria-hidden="true">
              <div class="ranking-item__content">
                <p class="description"><?php echo $post['content']; ?></p>
              </div>
              <div class="ranking-item__program-details">
                <ul class="ranking-item__program-details__list">
                  <li><span>Doctoral Graduates</span> <?php echo esc_html($fields['doctoral_graduates']); ?></li>
                  <li><span>Total Price (In-State)</span> <?php echo esc_html($fields['total_price_in_state']); ?></li>
                  <li><span>Adults (25-64) Enrolled PT</span> <?php echo esc_html($fields['adults_enrolled_pt']); ?></li>
                  <li><span>Total PT Enrollment</span> <?php echo esc_html($fields['total_pt_enrollment']); ?></li>
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
    <!-- <?php echo phds_render_popup_section($methodology_popup, $posts[0], true); ?> -->
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
function vtx_get_rankings_phds_data_working_professionals($post_type, $version, $program)
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
        'pdocrs'              => $fields['ranking_worp_pdocrs'] ?? '',
        'distance_ed_students' => $fields['ranking_worp_distance_ed_students'] ?? '',
        'cost_per_credit'      => $fields['ranking_worp_cost_per_credit'] ?? '',
        'doctoral_graduates'   => $fields['ranking_worp_doctoral_graduates'] ?? '',
        'total_price_in_state' => $fields['ranking_worp_total_price_in_state'] ?? '',
        'adults_enrolled_pt'   => $fields['ranking_worp_adults_enrolled_pt'] ?? '',
        'total_pt_enrollment'  => $fields['ranking_worp_total_pt_enrollment'] ?? '',
        'score'                => $fields['ranking_worp_score'] ?? '',
      ],
    ];
  }

  wp_reset_postdata();

  // ✅ Cache for 24 hours for performance
  wp_cache_set($cache_key, $posts, 'rankings', DAY_IN_SECONDS);

  return $posts;
}
