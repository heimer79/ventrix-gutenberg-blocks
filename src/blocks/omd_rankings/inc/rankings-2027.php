<?php

/**
 * Rankings 2027 block.
 *
 * Best and Affordable share this template. Ranking Type on each school
 * chooses which stats sit in the header and whether fees get their own card.
 *
 * @package ventrix
 */

if (! function_exists('vtx_omd_2027_is_affordable')) {
  /**
   * @param string $ranking_type Spreadsheet value, usually Best or Affordable.
   * @return bool
   */
  function vtx_omd_2027_is_affordable($ranking_type)
  {
    return false !== stripos((string) $ranking_type, 'afford');
  }
}

if (! function_exists('vtx_omd_2027_location_label')) {
  /**
   * @param string $city  City.
   * @param string $state State.
   * @return string
   */
  function vtx_omd_2027_location_label($city, $state)
  {
    $place = implode(', ', array_filter(array(trim((string) $city), trim((string) $state))));

    return '' === $place ? '' : 'Location: ' . $place;
  }
}

if (! function_exists('vtx_omd_2027_render_card')) {
  /**
   * Prints a details card when it has a location line or at least one value.
   *
   * @param string $title    Card heading.
   * @param array  $rows     List of label/value pairs.
   * @param string $location Optional location chip.
   */
  function vtx_omd_2027_render_card($title, $rows, $location = '')
  {
    $rows = array_values(array_filter($rows, function ($row) {
      return isset($row['value']) && '' !== trim((string) $row['value']);
    }));

    $location = trim((string) $location);

    if ('' === $location && empty($rows)) {
      return;
    }
    ?>
    <section class="details-card">
      <h5 class="details-card__title"><?php echo esc_html($title); ?></h5>
      <?php if ('' !== $location) : ?>
        <p class="details-card__location"><?php echo esc_html($location); ?></p>
      <?php endif; ?>
      <?php if (! empty($rows)) : ?>
        <div class="details-card__rows">
          <?php foreach ($rows as $row) : ?>
            <div class="detail-row">
              <span class="detail-row__label"><?php echo esc_html($row['label']); ?></span>
              <span class="detail-row__value"><?php echo esc_html($row['value']); ?></span>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </section>
    <?php
  }
}

/**
 * Renders the Rankings 2027 layout.
 *
 * @param array  $attributes   Block attributes.
 * @param int    $post_ID      Ranking page ID.
 * @param string $block_design Design key, ranking-2027.
 */
function vtx_render_block_omd_rankings_2027($attributes, $post_ID, $block_design)
{
  $post_type = get_field('ranking_page_post_type', $post_ID) ?: 'latest_rankings';
  $program_field = get_field('ranking_page_program', $post_ID);
  $program = (is_object($program_field) && ! empty($program_field->name)) ? $program_field->name : '';
  $default_open = get_field('ranking_page_default_open', $post_ID) ?: 3;
  $methodology_version = vtx_omd_get_page_methodology_version($post_ID);
  $version = get_field('ranking_page_version', $post_ID) ?: '2027';

  $posts = vtx_get_rankings_omd_data_2027($post_type, $version, $program);
  $query_success = ! empty($posts);
  $ranking_class = vtx_omd_determine_class_name($block_design);

  $ranking_schema_items = [];
  $ranking_data_schema_json = '';
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
        <?php foreach ($posts as $post) : ?>
          <?php
          $order = $post['order'];
          $fields = $post['acf_fields'];
          $is_affordable = vtx_omd_2027_is_affordable($fields['ranking_type']);
          $link_url = ! empty($fields['program_url']) ? $fields['program_url'] : '';
          $school_cost = ! empty($fields['in_state_ft_avg_tuition']) ? $fields['in_state_ft_avg_tuition'] : 'N/A';
          $location = vtx_omd_2027_location_label($fields['city'], $fields['state']);
          $highlights = array_values(array_filter(array(
            $fields['program_highlight_1'],
            $fields['program_highlight_2'],
            $fields['program_highlight_3'],
          ), function ($highlight) {
            return '' !== trim((string) $highlight);
          }));

          $fee_rows = array(
            array('label' => __('Full-Time Fees', 'vtx-omd'), 'value' => $fields['in_state_ft_required_fees']),
            array('label' => __('Part-Time Fees', 'vtx-omd'), 'value' => $fields['in_state_pt_required_fees']),
            array('label' => __('Application Fee', 'vtx-omd'), 'value' => $fields['graduate_application_fee']),
            array('label' => __('Alt. Tuition Plan', 'vtx-omd'), 'value' => $fields['alternative_tuition_plans']),
          );

          if ($is_affordable) {
            $header_pills = array(
              array('label' => __('Avg. Tuition', 'vtx-omd'), 'value' => $fields['in_state_ft_avg_tuition']),
              array('label' => __('Avg. Cost/Credit', 'vtx-omd'), 'value' => $fields['in_state_pt_credit_charge']),
            );
            $program_rows = array(
              array('label' => __('Accreditation', 'vtx-omd'), 'value' => $fields['accreditation']),
              array('label' => __('School Type', 'vtx-omd'), 'value' => $fields['control']),
              array('label' => __('Online Enrollment', 'vtx-omd'), 'value' => $fields['online_graduate_enrollment']),
            );
          } else {
            $header_pills = array(
              array('label' => __('Online Enrollment', 'vtx-omd'), 'value' => $fields['online_graduate_enrollment']),
              array('label' => __('Avg. Tuition', 'vtx-omd'), 'value' => $fields['in_state_ft_avg_tuition']),
            );
            $program_rows = array(
              array('label' => __('Accreditation', 'vtx-omd'), 'value' => $fields['accreditation']),
              array('label' => __('School Type', 'vtx-omd'), 'value' => $fields['control']),
              array('label' => __('Avg. Cost/Credit', 'vtx-omd'), 'value' => $fields['in_state_pt_credit_charge']),
            );
            $program_rows = array_merge($program_rows, $fee_rows);
          }
          ?>

          <div class="ranking-lists__accordion-item <?php echo $is_affordable ? 'is-affordable' : 'is-best'; ?>">
            <div class="ranking-item__summary">
              <div class="ranking-item__identity">
                <span class="ranking-item__number"><?php echo esc_html($order); ?></span>
                <div class="ranking-item__heading">
                  <h4>
                    <?php if ('' !== $link_url) : ?>
                      <a href="<?php echo esc_url($link_url); ?>" target="_blank" rel="noopener noreferrer nofollow">
                        <?php echo esc_html($post['title']); ?>
                      </a>
                    <?php else : ?>
                      <?php echo esc_html($post['title']); ?>
                    <?php endif; ?>
                  </h4>
                  <?php if ('' !== trim((string) $fields['best_for'])) : ?>
                    <p class="ranking-item__best-for">
                      <span><?php esc_html_e('Best for:', 'vtx-omd'); ?></span>
                      <?php echo esc_html($fields['best_for']); ?>
                    </p>
                  <?php endif; ?>
                </div>
              </div>
              <div class="ranking-item__pills">
                <?php foreach ($header_pills as $pill) : ?>
                  <?php if ('' === trim((string) $pill['value'])) : ?>
                    <?php continue; ?>
                  <?php endif; ?>
                  <div class="ranking-pill">
                    <span class="ranking-pill__value"><?php echo esc_html($pill['value']); ?></span>
                    <span class="ranking-pill__label"><?php echo esc_html($pill['label']); ?></span>
                  </div>
                <?php endforeach; ?>
              </div>
              <button class="toggle-details" aria-expanded="false" type="button">+</button>
            </div>

            <div class="ranking-item__details" aria-hidden="true">
              <div class="ranking-item__body">
                <div class="ranking-item__description">
                  <?php echo wp_kses_post($post['content']); ?>
                </div>
                <?php if (! empty($highlights)) : ?>
                  <div class="ranking-item__why">
                    <h5><?php echo esc_html(sprintf(__('Why We Selected %s', 'vtx-omd'), $post['title'])); ?></h5>
                    <ul class="omd-list">
                      <?php foreach ($highlights as $highlight) : ?>
                        <li><?php echo esc_html($highlight); ?></li>
                      <?php endforeach; ?>
                    </ul>
                  </div>
                <?php endif; ?>
                <div class="ranking-item__aside">
                  <?php vtx_omd_2027_render_card(__('Program Details', 'vtx-omd'), $program_rows, $location); ?>
                  <?php if ($is_affordable) : ?>
                    <?php vtx_omd_2027_render_card(__('Financial Facts', 'vtx-omd'), $fee_rows); ?>
                  <?php endif; ?>
                </div>
              </div>
            </div>

            <?php
            $ranking_schema_items[] = [
            	'@type'    => 'ListItem',
            	'position' => (int) $order,
            	'item'     => [
            		'@type'      => 'CollegeOrUniversity',
            		'name'       => wp_strip_all_tags(htmlspecialchars_decode($post['title'])),
            		'url'        => esc_url_raw($link_url),
            		'makesOffer' => [
            			'@type' => 'AggregateOffer',
            			'price' => wp_strip_all_tags((string) $school_cost),
            		],
            	],
            ];
            ?>
          </div>
        <?php endforeach; ?>
      <?php endif; ?>
      <?php
// Build the JSON-LD structure with proper escaping
      $ranking_data_schema_json = $ranking_schema_items
      	? wp_json_encode([
      		'@context'        => 'https://schema.org',
      		'@type'           => 'ItemList',
      		'name'            => wp_strip_all_tags((string) $program),
      		'description'     => '',
      		'itemListElement' => $ranking_schema_items,
      	], JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
      	: '';
      ?>
    </div>

    <?php echo omd_render_popup_section($methodology_version); ?>
  </div>

  <?php
  if (! empty($ranking_data_schema_json)) {
    echo '<script type="application/ld+json">' . $ranking_data_schema_json . '</script>';
  }
}

/**
 * Loads published 2027 schools for one ranking page.
 *
 * Filters on version_2027 and the existing ranking category. Order is menu_order,
 * which Sheet Editor maps from the Rank column.
 *
 * @param string     $post_type Post type.
 * @param string|int $version   Page version, usually 2027.
 * @param string     $program   Ranking category term name.
 * @return array
 */
function vtx_get_rankings_omd_data_2027($post_type, $version, $program)
{
  if (empty($post_type) || empty($version) || empty($program) || ! class_exists('WP_Query')) {
    return array();
  }

  $cache_key = sprintf('rankings_2027_data_%s_%s_%s', $post_type, $version, sanitize_title($program));
  $posts = wp_cache_get($cache_key, 'rankings');

  if (false !== $posts) {
    return $posts;
  }

  $rankings_query = new WP_Query(array(
    'post_type' => $post_type,
    'post_status' => 'publish',
    'orderby' => 'menu_order',
    'order' => 'ASC',
    'posts_per_page' => -1,
    'no_found_rows' => true,
    'update_post_term_cache' => false,
    'meta_query' => array(
      array(
        'key' => 'version_2027',
        'value' => $version,
        'compare' => '=',
      ),
    ),
    'tax_query' => array(
      array(
        'taxonomy' => 'ranking_category',
        'field' => 'name',
        'terms' => $program,
      ),
    ),
  ));

  if (! $rankings_query->have_posts()) {
    wp_cache_set($cache_key, array(), 'rankings', DAY_IN_SECONDS);
    return array();
  }

  $posts = array();

  while ($rankings_query->have_posts()) {
    $rankings_query->the_post();
    $post_id = get_the_ID();
    $fields = function_exists('get_fields') ? (get_fields($post_id) ?: array()) : array();

    $posts[] = array(
      'ID' => $post_id,
      'title' => get_the_title(),
      'content' => apply_filters('the_content', get_the_content()),
      'order' => (int) get_post_field('menu_order', $post_id),
      'acf_fields' => array(
        'version' => $fields['version_2027'] ?? '',
        'ranking_type' => $fields['ranking_type_2027'] ?? '',
        'asset_url' => $fields['asset_url_2027'] ?? '',
        'pmastr' => $fields['pmastr_2027'] ?? '',
        'unitid' => $fields['unitid_2027'] ?? '',
        'program_url' => $fields['program_url_2027'] ?? '',
        'school_website' => $fields['school_website_2027'] ?? '',
        'city' => $fields['city_2027'] ?? '',
        'state' => $fields['state_2027'] ?? '',
        'level' => $fields['level_2027'] ?? '',
        'control' => $fields['control_2027'] ?? '',
        'academic_career_counseling' => $fields['academic_career_counseling_2027'] ?? '',
        'online_graduate_enrollment' => $fields['online_graduate_enrollment_2027'] ?? '',
        'in_state_ft_avg_tuition' => $fields['in_state_ft_avg_tuition_2027'] ?? '',
        'in_state_ft_required_fees' => $fields['in_state_ft_required_fees_2027'] ?? '',
        'in_state_pt_credit_charge' => $fields['in_state_pt_credit_charge_2027'] ?? '',
        'in_state_pt_required_fees' => $fields['in_state_pt_required_fees_2027'] ?? '',
        'graduate_application_fee' => $fields['graduate_application_fee_2027'] ?? '',
        'alternative_tuition_plans' => $fields['alternative_tuition_plans_2027'] ?? '',
        'accreditation' => $fields['accreditation_2027'] ?? '',
        'score' => $fields['score_2027'] ?? '',
        'best_for' => $fields['best_for_2027'] ?? '',
        'program_highlight_1' => $fields['program_highlight_1_2027'] ?? '',
        'program_highlight_2' => $fields['program_highlight_2_2027'] ?? '',
        'program_highlight_3' => $fields['program_highlight_3_2027'] ?? '',
      ),
    );
  }

  wp_reset_postdata();
  wp_cache_set($cache_key, $posts, 'rankings', DAY_IN_SECONDS);

  return $posts;
}
