<?php

/**
 * Featured Rankings 2026 Block.
 *
 * @package OMD
 */

if (!function_exists('get_field')) {
  if (!function_exists('vtx_get_rankings_omd_data_featured_2026')) {
    function vtx_get_rankings_omd_data_featured_2026($post_type, $version, $program)
    {
      return array();
    }
  }

  return;
}

if (
  !function_exists('wp_cache_get') || !function_exists('wp_cache_set') ||
  !function_exists('get_the_ID') || !function_exists('get_the_title') ||
  !function_exists('get_the_content') || !function_exists('wp_reset_postdata') ||
  !function_exists('esc_html') || !function_exists('esc_html__') ||
  !function_exists('esc_url') || !function_exists('wp_kses_post') ||
  !function_exists('wp_is_mobile')
) {
  if (!function_exists('vtx_get_rankings_omd_data_featured_2026')) {
    function vtx_get_rankings_omd_data_featured_2026($post_type, $version, $program)
    {
      return array();
    }
  }

  return;
}

if (!class_exists('WP_Query')) {
  if (!function_exists('vtx_get_rankings_omd_data_featured_2026')) {
    function vtx_get_rankings_omd_data_featured_2026($post_type, $version, $program)
    {
      return array();
    }
  }

  return;
}

/**
 * Renders a single featured ranking stat row.
 *
 * @param string $label Stat label.
 * @param string $value Stat value.
 * @param bool   $featured Whether the row uses featured styling.
 * @return string
 */
function omd_render_featured_ranking_stat_row($label, $value, $featured = false)
{
  if ($value === '' || $value === null) {
    return '';
  }

  $classes = 'item-detail' . ($featured ? ' item-detail--featured' : '');

  ob_start();
  ?>
  <li class="<?php echo esc_attr($classes); ?>">
    <span class="item-detail__label"><?php echo esc_html($label); ?></span>
    <span class="item-detail__value"><?php echo esc_html($value); ?></span>
  </li>
  <?php

  return ob_get_clean();
}

/**
 * Renders a secondary grid stat card for desktop.
 *
 * @param string $label Stat label.
 * @param string $value Stat value.
 * @return string
 */
function omd_render_featured_ranking_stat_card($label, $value)
{
  if ($value === '' || $value === null) {
    return '';
  }

  ob_start();
  ?>
  <li class="item-detail item-detail--card">
    <span class="item-detail__label"><?php echo esc_html($label); ?></span>
    <span class="item-detail__value"><?php echo esc_html($value); ?></span>
  </li>
  <?php

  return ob_get_clean();
}

function vtx_render_block_omd_featured_rankings_2026($attributes, $post_ID, $block_design)
{
  $program_field = get_field('ranking_page_program', $post_ID);
  $post_type = get_field('ranking_page_post_type', $post_ID) ?: 'latest_ranking';
  $program = ($program_field && is_object($program_field) && isset($program_field->name)) ? $program_field->name : 'CNA';
  $default_open = get_field('ranking_page_default_open', $post_ID) ?: 3;
  $methodology_popup = get_field('ranking_page_methodology_popup', $post_ID) ?: 1;
  $version = get_field('ranking_page_version', $post_ID) ?: '2026';

  $posts = vtx_get_rankings_omd_data_featured_2026($post_type, $version, $program);
  $query_success = !empty($posts);
  $ranking_class = vtx_omd_determine_class_name($block_design);

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

  <div class="vtx-omd-rankings-block <?php echo esc_attr($ranking_class); ?>"
    id="ranking-grid-<?php echo esc_attr(uniqid()); ?>"
    data-query-status="<?php echo esc_attr($query_success ? 'success' : 'error'); ?>"
    data-default-open="<?php echo esc_attr($default_open); ?>">

    <div class="rankings-top-bar">
      <button class="rankings-top-bar__about"><?php esc_html_e('About the Ranking', 'vtx-omd'); ?></button>

      <div class="rankings-top-bar__expand-collapse">
        <button class="expand-all"><?php esc_html_e('Expand All', 'vtx-omd'); ?></button>
        <button class="collapse-all"><?php esc_html_e('Collapse All', 'vtx-omd'); ?></button>
      </div>
    </div>

    <div class="ranking-lists__accordion">
      <?php if ($query_success) : ?>
        <?php foreach ($posts as $index => $post): ?>
          <?php
          $order = $post['order'];
          $fields = $post['acf_fields'];
          $link_url = !empty($fields['program_url']) ? $fields['program_url'] : get_permalink($post['ID']);
          $school_cost = !empty($fields['cost_credit_in_state']) ? $fields['cost_credit_in_state'] : (!empty($fields['tuition']) ? $fields['tuition'] : 'N/A');

          $featured_stats = array(
            array(
              'label' => __('PT Enrollment', 'vtx-omd'),
              'value' => $fields['pt_enrollment'] ?? '',
            ),
            array(
              'label' => __('Cost/Credit (In-State)', 'vtx-omd'),
              'value' => $fields['cost_credit_in_state'] ?? '',
            ),
            array(
              'label' => __('Cost/Credit (Out-of-State)', 'vtx-omd'),
              'value' => $fields['cost_credit_out_state'] ?? '',
            ),
          );

          $secondary_stats = array(
            array(
              'label' => __('Online Enrollment', 'vtx-omd'),
              'value' => $fields['online_enrollment'] ?? '',
            ),
            array(
              'label' => __('Required Fees (In-State)', 'vtx-omd'),
              'value' => $fields['required_fees_in_state'] ?? '',
            ),
            array(
              'label' => __('Required Fees (Out-of-State)', 'vtx-omd'),
              'value' => $fields['required_fees_out_state'] ?? '',
            ),
            array(
              'label' => __('School Type', 'vtx-omd'),
              'value' => $fields['school_type'] ?? '',
            ),
            array(
              'label' => __('Application Fee', 'vtx-omd'),
              'value' => $fields['application_fee'] ?? '',
            ),
            array(
              'label' => __('Alt. Tuition Plan(s)', 'vtx-omd'),
              'value' => $fields['alt_tuition_plans'] ?? '',
            ),
          );
          ?>

          <div class="ranking-lists__accordion-item">
            <div class="ranking-item__summary">
              <div class="ranking-item__school">
                <span class="ranking-item__number"><?php echo esc_html($order); ?></span>
                <div class="item__school-info">
                  <h4>
                    <a href="<?php echo esc_url($link_url); ?>"
                      target="_blank" rel="noopener noreferrer nofollow">
                      <?php echo esc_html($post['title']); ?>
                    </a>
                  </h4>
                  <span class="item__location"><?php echo esc_html($fields['city']) . ', ' . esc_html($fields['state']); ?></span>
                </div>
              </div>

              <?php if (!empty($fields['pt_enrollment'])) : ?>
                <div class="ranking-item__stats hidden-mobile">
                  <span class="ranking-item__stats-enrollment">
                    <?php esc_html_e('PT Enrollment:', 'vtx-omd'); ?>
                    <?php echo esc_html($fields['pt_enrollment']); ?>
                  </span>
                </div>
              <?php endif; ?>

              <button class="toggle-details" aria-expanded="false">+</button>
            </div>

            <div class="ranking-item__details" aria-hidden="true">
              <div class="ranking-item__content">
                <div class="description"><?php echo wp_kses_post(wpautop($post['content'])); ?></div>
              </div>

              <div class="ranking-item__program-details">
                <?php
                $mobile_rows = '';
                foreach ($featured_stats as $stat) {
                  $mobile_rows .= omd_render_featured_ranking_stat_row($stat['label'], $stat['value'], true);
                }
                foreach ($secondary_stats as $stat) {
                  $mobile_rows .= omd_render_featured_ranking_stat_row($stat['label'], $stat['value'], false);
                }

                if (!empty($mobile_rows)) :
                ?>
                  <ul class="item-detail-list item-detail-list--mobile hidden-desktop">
                    <?php echo $mobile_rows; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                  </ul>
                <?php endif; ?>

                <?php
                $featured_cost_rows = '';
                $featured_cost_rows .= omd_render_featured_ranking_stat_row(__('Cost/Credit (In-State)', 'vtx-omd'), $fields['cost_credit_in_state'] ?? '', true);
                $featured_cost_rows .= omd_render_featured_ranking_stat_row(__('Cost/Credit (Out-of-State)', 'vtx-omd'), $fields['cost_credit_out_state'] ?? '', true);

                if (!empty($featured_cost_rows)) :
                ?>
                  <ul class="item-detail-list item-detail-list--featured-cost hidden-mobile">
                    <?php echo $featured_cost_rows; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                  </ul>
                <?php endif; ?>

                <?php
                $secondary_cards = '';
                foreach ($secondary_stats as $stat) {
                  $secondary_cards .= omd_render_featured_ranking_stat_card($stat['label'], $stat['value']);
                }

                if (!empty($secondary_cards)) :
                ?>
                  <ul class="item-detail-list item-detail-list--secondary hidden-mobile">
                    <?php echo $secondary_cards; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
                  </ul>
                <?php endif; ?>
              </div>
            </div>

            <?php
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
      if (!empty($ranking_data_schema_json)) {
        $ranking_data_schema_json = rtrim($ranking_data_schema_json, ',');
        $ranking_data_schema_json .= ']}';
      }
      ?>
    </div>

    <?php if ($query_success && !empty($posts[0])) : ?>
      <?php echo omd_render_popup_section($methodology_popup, $posts[0], true); ?>
    <?php endif; ?>
  </div>

<?php
  if (!empty($ranking_data_schema_json)) {
    echo '<script type="application/ld+json">' . wp_kses_post($ranking_data_schema_json) . '</script>';
  }
}

/**
 * Retrieves and caches featured ranking data for OMD.
 *
 * @param string       $post_type Post type.
 * @param string|int   $version Ranking version.
 * @param string       $program Program taxonomy term.
 * @return array
 */
function vtx_get_rankings_omd_data_featured_2026($post_type, $version, $program)
{
  if (empty($post_type) || empty($version) || empty($program)) {
    return [];
  }

  $cache_key = sprintf('rankings_featured_data_%s_%s_%s', $post_type, $version, sanitize_title($program));
  $posts = wp_cache_get($cache_key, 'rankings');

  if ($posts !== false) {
    return $posts;
  }

  $rankings_args = [
    'post_type'      => $post_type,
    'post_status'    => 'publish',
    'orderby'        => 'menu_order',
    'order'          => 'ASC',
    'posts_per_page' => -1,
    'no_found_rows'  => true,
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

  if (!$rankings_query->have_posts()) {
    wp_cache_set($cache_key, [], 'rankings', DAY_IN_SECONDS);
    return [];
  }

  $posts = [];

  while ($rankings_query->have_posts()) {
    $rankings_query->the_post();
    $post_id = get_the_ID();
    $fields = get_fields($post_id) ?: [];

    $program_category = $fields['program_category'] ?? null;
    $program_name = is_object($program_category) ? $program_category->name : '';

    $posts[] = [
      'ID'      => $post_id,
      'title'   => get_the_title(),
      'content' => apply_filters('the_content', get_the_content()),
      'order'   => (int) get_post_field('menu_order', $post_id),
      'acf_fields' => [
        'version'                 => $fields['version'] ?? '',
        'asset_url'               => $fields['asset_url'] ?? '',
        'program'                 => $program_name,
        'program_url'             => $fields['program_category_url'] ?? '',
        'unitid'                  => $fields['ranking_unitid'] ?? '',
        'city'                    => $fields['ranking_city'] ?? '',
        'state'                   => $fields['ranking_state'] ?? '',
        'school_type'             => $fields['ranking_school_type'] ?? '',
        'tuition'                 => $fields['ranking_tuition'] ?? '',
        'accreditation'           => $fields['ranking_accreditation'] ?? '',
        'application_fee'         => $fields['ranking_2026_application_fee'] ?? '',
        'pt_enrollment'           => $fields['ranking_2026_pt_enrollment'] ?? '',
        'cost_credit_in_state'    => $fields['ranking_2026_cost_credit_in_state'] ?? '',
        'cost_credit_out_state'   => $fields['ranking_2026_cost_credit_out_state'] ?? '',
        'online_enrollment'       => $fields['ranking_2026_online_enrollment'] ?? ($fields['ranking_2026_online_students'] ?? ''),
        'required_fees_in_state'  => $fields['ranking_2026_required_fees_in_state'] ?? '',
        'required_fees_out_state' => $fields['ranking_2026_required_fees_out_state'] ?? '',
        'alt_tuition_plans'       => $fields['ranking_2026_alt_tuition_plans'] ?? '',
        'score'                   => $fields['score'] ?? '',
      ],
    ];
  }

  wp_reset_postdata();
  wp_cache_set($cache_key, $posts, 'rankings', DAY_IN_SECONDS);

  return $posts;
}
