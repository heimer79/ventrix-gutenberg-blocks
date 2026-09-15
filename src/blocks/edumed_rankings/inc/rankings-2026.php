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

/**
 * Returns whether a ranking field should be printed.
 *
 * @param mixed $value Field value.
 * @return bool
 */
if (!function_exists('vtx_edumed_ranking_value_is_filled')) {
function vtx_edumed_ranking_value_is_filled($value)
{
  if (is_array($value)) {
    return !empty(array_filter($value, 'strlen'));
  }

  return $value !== null && $value !== false && $value !== '';
}
}

/**
 * Returns the first filled value from a list of field keys.
 *
 * @param array $fields Ranking ACF fields.
 * @param array $sources Field keys to try, in order.
 * @return string
 */
if (!function_exists('vtx_edumed_ranking_first_filled')) {
function vtx_edumed_ranking_first_filled($fields, $sources)
{
  foreach ((array) $sources as $source) {
    if (isset($fields[$source]) && vtx_edumed_ranking_value_is_filled($fields[$source])) {
      return $fields[$source];
    }
  }

  return '';
}
}

/**
 * Header presets keyed by Ranking Type. Each type pins two stats in the
 * school header; remaining filled fields still print in Program Details.
 *
 * @return array<string, array<int, string>>
 */
if (!function_exists('vtx_edumed_ranking_header_layouts')) {
function vtx_edumed_ranking_header_layouts()
{
  return array(
    'best_undergraduate' => array('online_enrollment', 'net_price'),
    'best_graduate' => array('net_price', 'students_w_aid'),
    'affordable_undergraduate' => array('online_enrollment', 'tuition'),
    'affordable_graduate' => array('tuition', 'avg_cost_credit'),
  );
}
}

/**
 * Normalizes spreadsheet / ACF Ranking Type values to layout slugs.
 *
 * Accepts tab names such as "BestUndergraduate" as well as spaced or
 * snake_case variants.
 *
 * @param string $value Raw ranking type value.
 * @return string Layout slug, or an empty string if unknown.
 */
if (!function_exists('vtx_edumed_normalize_ranking_type')) {
function vtx_edumed_normalize_ranking_type($value)
{
  $compact = strtolower(preg_replace('/[^a-z0-9]+/i', '', (string) $value));

  $map = array(
    'bestundergraduate' => 'best_undergraduate',
    'bestgraduate' => 'best_graduate',
    'affordableundergraduate' => 'affordable_undergraduate',
    'affordablegraduate' => 'affordable_graduate',
  );

  return isset($map[$compact]) ? $map[$compact] : '';
}
}

/**
 * Display definitions for ranking stats.
 *
 * @return array<string, array{label: string, sources: array<int, string>}>
 */
if (!function_exists('vtx_edumed_ranking_stat_definitions')) {
function vtx_edumed_ranking_stat_definitions()
{
  return array(
    'online_enrollment' => array(
      'label' => __('Online Enrollment', 'vtx-edumed'),
      'sources' => array('online_undergrad_enroll', 'online_learning'),
    ),
    'net_price' => array(
      'label' => __('Avg. Net Price', 'vtx-edumed'),
      'sources' => array('net_price'),
    ),
    'students_w_aid' => array(
      'label' => __('Students W/ Aid', 'vtx-edumed'),
      'sources' => array('students_w_aid'),
    ),
    'tuition' => array(
      'label' => __('Avg. Tuition', 'vtx-edumed'),
      'sources' => array('tuition'),
    ),
    'avg_cost_credit' => array(
      'label' => __('Avg. Cost/Credit', 'vtx-edumed'),
      'sources' => array('avg_cost_credit'),
    ),
    'accreditation' => array(
      'label' => __('Accreditation', 'vtx-edumed'),
      'sources' => array('accreditation'),
    ),
    'counseling_services' => array(
      'label' => __('Counseling Services', 'vtx-edumed'),
      'sources' => array('academiccareer_counseling_service'),
    ),
    'school_type' => array(
      'label' => __('School Type', 'vtx-edumed'),
      'sources' => array('school_type_2027', 'school_type'),
    ),
    'avg_aid_amount' => array(
      'label' => __('Avg. Aid Amount', 'vtx-edumed'),
      'sources' => array('avg_aid_amount'),
    ),
    'studentfaculty_ratio' => array(
      'label' => __('Student/Faculty Ratio', 'vtx-edumed'),
      'sources' => array('studentfaculty_ratio_2027', 'studentfaculty_ratio'),
    ),
    'alt_tuition_plans' => array(
      'label' => __('Alt. Tuition Plan(s)', 'vtx-edumed'),
      'sources' => array('alt_tuition_plans'),
    ),
  );
}
}

/**
 * Ordered Program Details keys. Header stats are skipped at render time.
 *
 * @return array<int, string>
 */
if (!function_exists('vtx_edumed_ranking_details_order')) {
function vtx_edumed_ranking_details_order()
{
  return array(
    'accreditation',
    'counseling_services',
    'school_type',
    'students_w_aid',
    'avg_aid_amount',
    'avg_cost_credit',
    'alt_tuition_plans',
    'online_enrollment',
    'studentfaculty_ratio',
    'tuition',
    'net_price',
  );
}
}

/**
 * Resolves header stat keys for a ranking type / layout slug.
 *
 * @param string $layout Layout slug.
 * @return array<int, string>
 */
if (!function_exists('vtx_edumed_ranking_header_keys')) {
function vtx_edumed_ranking_header_keys($layout)
{
  $layouts = vtx_edumed_ranking_header_layouts();
  $layout = vtx_edumed_normalize_ranking_type($layout) ?: $layout;

  if (isset($layouts[$layout])) {
    return $layouts[$layout];
  }

  return $layouts['best_undergraduate'];
}
}

/**
 * Renders a header stat pill when the value is filled.
 *
 * @param string $label Stat label.
 * @param string $value Stat value.
 * @return string
 */
if (!function_exists('vtx_edumed_render_ranking_stat_pill')) {
function vtx_edumed_render_ranking_stat_pill($label, $value)
{
  if (!vtx_edumed_ranking_value_is_filled($value)) {
    return '';
  }

  ob_start();
  ?>
  <div class="stats-content">
    <span class="stats-content__subtitle"><?php echo esc_html($label); ?></span>
    <span class="stats-content__title"><?php echo esc_html($value); ?></span>
  </div>
  <?php
  return ob_get_clean();
}
}

/**
 * Renders the Program Details list: location first, then filled fields
 * that are not already shown in the header.
 *
 * @param array $fields Ranking ACF fields.
 * @param array $header_keys Stat keys pinned in the header.
 * @return string
 */
if (!function_exists('vtx_edumed_render_ranking_program_details')) {
function vtx_edumed_render_ranking_program_details($fields, $header_keys)
{
  $definitions = vtx_edumed_ranking_stat_definitions();
  $header_keys = (array) $header_keys;
  $rows = '';

  $city = isset($fields['city']) ? $fields['city'] : '';
  $state = isset($fields['state']) ? $fields['state'] : '';
  $location_parts = array_filter(array($city, $state), 'vtx_edumed_ranking_value_is_filled');
  $location = implode(', ', $location_parts);

  if (vtx_edumed_ranking_value_is_filled($location)) {
    $rows .= '<li class="has-location">' . esc_html__('Location', 'vtx-edumed') . ': ' . esc_html($location) . '</li>';
  }

  foreach (vtx_edumed_ranking_details_order() as $key) {
    if (in_array($key, $header_keys, true) || !isset($definitions[$key])) {
      continue;
    }

    $value = vtx_edumed_ranking_first_filled($fields, $definitions[$key]['sources']);

    if (!vtx_edumed_ranking_value_is_filled($value)) {
      continue;
    }

    $rows .= '<li>' . esc_html($value) . '<span>' . esc_html($definitions[$key]['label']) . '</span></li>';
  }

  if ($rows === '') {
    return '';
  }

  ob_start();
  ?>
  <div class="box-apply">
    <h5><?php esc_html_e('Program Details', 'vtx-edumed'); ?></h5>
    <ul>
      <?php echo $rows; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- rows are escaped above. ?>
    </ul>
  </div>
  <?php
  return ob_get_clean();
}
}

/**
 * Collects program highlights, preferring the new fields over legacy blurbs.
 *
 * @param array $fields Ranking ACF fields.
 * @return array<int, string>
 */
if (!function_exists('vtx_edumed_ranking_highlights')) {
function vtx_edumed_ranking_highlights($fields)
{
  $highlights = array();

  for ($i = 1; $i <= 3; $i++) {
    $value = vtx_edumed_ranking_first_filled($fields, array("program_highlight_{$i}", "blurb_{$i}"));

    if (vtx_edumed_ranking_value_is_filled($value)) {
      $highlights[] = $value;
    }
  }

  return $highlights;
}
}

function vtx_render_block_rankings_2026($attributes, $post_ID, $block_design)
{

  // Extract attributes with defaults
  $post_type = get_field('post_type', $post_ID) ?: 'school_ranking';
  $program_field = get_field('program', $post_ID);
  $program = ($program_field && is_object($program_field) && isset($program_field->name)) ? $program_field->name : 'CNA';
  $default_open = get_field('default_open', $post_ID) ?: 3;
  $version = get_field('version', $post_ID) ?: '2027';
  $stat_definitions = vtx_edumed_ranking_stat_definitions();

  // Get ranking data.
  $posts = vtx_get_rankings_data_2026($post_type, $version, $program);

  // Check if the query was successful.
  $query_success = !empty($posts);

  // Determine the class based on the block design.
  $ranking_class = vtx_determine_class_name($block_design);

  // Build the ItemList JSON-LD structured data for the rankings.
  $schema_list_name = vtx_get_schema_list_name($post_ID, $program);
  $schema_items = array();

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

    <!-- Rankings Accordion -->

    <div class="ranking-lists__accordion">
      <?php if ($query_success) : ?>
        <?php foreach ($posts as $index => $post): ?>
          <?php $order = get_post_field('menu_order', $post['ID']); ?>
          <?php
            // Prepare link URL for JSON-LD schema
            $link_url = vtx_edumed_ranking_first_filled($post['acf_fields'], array('program_url', 'online_program_url'));
            if ($link_url === '') {
              $link_url = get_permalink($post['ID']);
            }
          ?>

          <div class="ranking-lists__accordion-item">
            <?php
              $fields = $post['acf_fields'];
              $ranking_type = vtx_edumed_ranking_first_filled($fields, array('ranking_type'));
              $header_keys = vtx_edumed_ranking_header_keys($ranking_type);
              $best_for = vtx_edumed_ranking_first_filled($fields, array('best_for'));
              $board_approved = vtx_edumed_ranking_first_filled($fields, array('board_approved_tags'));
              $highlights = vtx_edumed_ranking_highlights($fields);
              $program_details = vtx_edumed_render_ranking_program_details($fields, $header_keys);
              $header_pills = '';

              foreach ($header_keys as $stat_key) {
                if (!isset($stat_definitions[$stat_key])) {
                  continue;
                }

                $header_pills .= vtx_edumed_render_ranking_stat_pill(
                  $stat_definitions[$stat_key]['label'],
                  vtx_edumed_ranking_first_filled($fields, $stat_definitions[$stat_key]['sources'])
                );
              }
            ?>

            <!-- Summary row -->
            <div class="ranking-item__summary">
              <span class="ranking-item__number hidden-mobile"><?php echo esc_html($order); ?></span>
              <div class="ranking-item__school">
                <span class="ranking-item__number hidden-desktop"><?php echo esc_html($order); ?></span>
                <div class="ranking-item__school-info">
                  <h4>
                    <a href="<?php echo esc_url(vtx_edumed_ranking_first_filled($fields, array('program_url', 'online_program_url'))); ?>"
                        target="_blank" rel="noopener noreferrer nofollow">
                        <?php echo esc_html($post['title']); ?>
                    </a>
                  </h4>
                  <?php if (vtx_edumed_ranking_value_is_filled($best_for) || vtx_edumed_ranking_value_is_filled($board_approved)) : ?>
                  <div class="ranking-item__meta">
                    <?php if (vtx_edumed_ranking_value_is_filled($best_for)) : ?>
                      <span class="ranking-item__best-for"><?php echo esc_html__('Best for:', 'vtx-edumed'); ?> <?php echo esc_html($best_for); ?></span>
                    <?php endif; ?>
                    <?php if (vtx_edumed_ranking_value_is_filled($best_for) && vtx_edumed_ranking_value_is_filled($board_approved)) : ?>
                      <span class="ranking-item__meta-separator" aria-hidden="true"></span>
                    <?php endif; ?>
                    <?php if (vtx_edumed_ranking_value_is_filled($board_approved)) : ?>
                      <span class="ranking-item__board-approved">
                        <span class="ranking-item__board-approved-icon" aria-hidden="true"></span>
                        <?php echo esc_html__('Board Approved', 'vtx-edumed'); ?>
                      </span>
                    <?php endif; ?>
                  </div>
                  <?php endif; ?>
                </div>
              </div>
              <?php if ($header_pills !== '') : ?>
              <div class="ranking-item__stats">
                <?php echo $header_pills; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- pills are escaped in the helper. ?>
              </div>
              <?php endif; ?>
              <button class="toggle-details" aria-expanded="false">+</button>
            </div>

            <!-- Hidden details -->
            <div class="ranking-item__details" aria-hidden="true">
              <div class="ranking-item__content">
                <?php echo wp_kses_post($post['content']); ?>
                <?php echo $program_details; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- helper escapes its output. ?>
                <?php if (!empty($highlights)) : ?>
                <h5 class="subtitle"><?php echo esc_html(sprintf(__('Why We Selected %s', 'vtx-edumed'), $post['title'])); ?></h5>
                <ul class="edumed-list">
                  <?php foreach ($highlights as $highlight) : ?>
                    <li><?php echo esc_html($highlight); ?></li>
                  <?php endforeach; ?>
                </ul>
                <?php endif; ?>
              </div>
              <div class="ranking-item__program-details">
                <?php echo $program_details; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- helper escapes its output. ?>
              </div>
            </div>

            <?php
              $schema_items[] = vtx_build_rankings_schema_item(
                  $order,
                  $post['title'],
                  $link_url,
                  vtx_get_first_body_paragraph($post['content'])
              );
            ?>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
    </div>

    <!-- Render Popup Section -->
    <?php echo edumed_render_popup_section($posts, true, $post_ID); ?>
  </div>

<?php

  // Insert JSON-LD schema script
  echo vtx_render_rankings_schema_script($schema_list_name, $schema_items);
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
  $cache_key = "rankings_data_{$post_type}_{$version}_{$program}_v2027_fields";
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
          'relation' => 'OR',
          array(
            'key'     => 'version_2027',
            'value'   => $version,
            'compare' => '='
          ),
          array(
            'key'     => 'version',
            'value'   => $version,
            'compare' => '='
          ),
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
            'version' => vtx_edumed_ranking_first_filled(array(
              'version_2027' => get_field('version_2027'),
              'version' => get_field('version'),
            ), array('version_2027', 'version')),
            'ranking_type' => get_field('ranking_type'),
            'asset_url' => get_field('asset_url'),
            'program' => get_field('program') ? get_field('program')->name : null,
            'ptotal' => get_field('ptotal'),
            'unitid' => vtx_edumed_ranking_first_filled(array(
              'unitid_2027' => get_field('unitid_2027'),
              'unitid' => get_field('unitid'),
            ), array('unitid_2027', 'unitid')),
            'program_url' => get_field('program_url'),
            'online_program_url' => get_field('online_program_url'),
            'website' => get_field('website'),
            'web_address' => get_field('web_address'),
            'city' => get_field('city'),
            'state' => get_field('state'),
            'school_type_2027' => get_field('school_type_2027'),
            'school_type' => get_field('school_type'),
            'school_level' => get_field('school_level'),
            'academiccareer_counseling_service' => get_field('academiccareer_counseling_service'),
            'tuition' => get_field('tuition'),
            'online_learning' => get_field('online_learning'),
            'online_undergrad_enroll' => get_field('online_undergrad_enroll'),
            'net_price' => get_field('net_price'),
            'avg_cost_credit' => get_field('avg_cost_credit'),
            'alt_tuition_plans' => get_field('alt_tuition_plans'),
            'best_for' => get_field('best_for'),
            'board_approved_tags' => get_field('board_approved_tags'),
            'studentfaculty_ratio_2027' => get_field('studentfaculty_ratio_2027'),
            'studentfaculty_ratio' => get_field('studentfaculty_ratio'),
            'students_w_aid' => get_field('students_w_aid'),
            'avg_aid_amount' => get_field('avg_aid_amount'),
            'graduation_rate' => get_field('graduation_rate'),
            'accreditation' => get_field('accreditation'),
            'methodology_text_version' => get_field('methodology_text_version'),
            'score' => get_field('score'),
            'program_highlight_1' => get_field('program_highlight_1'),
            'program_highlight_2' => get_field('program_highlight_2'),
            'program_highlight_3' => get_field('program_highlight_3'),
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
