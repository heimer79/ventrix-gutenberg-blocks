<?php

/**
 * Tradicional Rankings Block.
 *
 * @package EduMed
 */

/**
 * Retrieves rankings data from the database, with caching.
 *
 * @param string $post_type The post type.
 * @param string $level_year_value The level year value.
 * @param string $version The version value.
 * @param string $program The program taxonomy term.
 * @return array The array of posts data.
 */
function edumed_get_rankings_data($post_type, $level_year_value, $version, $program)
{
  // Cache key
  $cache_key = "rankings_data_{$post_type}_{$level_year_value}_{$version}_{$program}";
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
          'key'     => 'year',
          'value'   => $level_year_value,
          'compare' => '='
        ),
        array(
          'key'     => 'version_acf',
          'value'   => $version,
          'compare' => '='
        ),
      ),
      'tax_query'           => array(
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
            'year' => get_field('year'),
            'actual_program' => get_field('actual_program'),
            'version' => get_field('version_acf'),
            'city_location_of_institution' => get_field('city_location_of_institution'),
            'state_abbreviation' => get_field('state_abbreviation'),
            'web_address' => get_field('web_address'),
            'online_program_url' => get_field('online_program_url'),
            'online_programs' => get_field('online_programs'),
            'control_of_institution' => get_field('control_of_institution'),
            'accreditation' => get_field('accreditation'),
            'avg_inst_aid' => get_field('avg_inst_aid'),
            'avg_inst_aid_stars' => get_field('avg_inst_aid_stars'),
            'percentage_in_online_ed' => get_field('percentage_in_online_ed'),
            'percentage_receiving_award' => get_field('percentage_receiving_award'),
            'tuition_gutenberg' => get_field('tuition_gutenberg'),
            'studentfaculty_ratio' => get_field('studentfaculty_ratio'),
            'asset_url' => get_field('asset_url'),
            'methodology_text_option' => get_field('methodology_text'),
          ),
        );
      }
    }

    wp_reset_postdata();
    wp_cache_set($cache_key, $posts);
  }

  return $posts;
}

/**
 * Renders the top bar section of the rankings block.
 *
 * @return string The HTML content of the top bar.
 */
function edumed_render_top_bar_school_ranking() {
  ob_start();
?>
  <section class="rankings-top-bar">
    <div class="rankings-top-bar--years">
      <a href="#two-year-rankings" class="two-year-button"><?php esc_html_e('2-year Schools', 'text-domain'); ?></a>
      <a href="#four-year-rankings" class="four-year-button"><?php esc_html_e('4-year Schools', 'text-domain'); ?></a>
    </div>
    <button class="rankings-top-bar--about"><?php esc_html_e('About the Rankings', 'text-domain'); ?></button>
    <div class="rankings-top-bar--expand-collapse">
      <button class="expand-all"><?php esc_html_e('Expand All', 'text-domain'); ?></button>
      <button class="collapse-all"><?php esc_html_e('Collapse All', 'text-domain'); ?></button>
    </div>
  </section>
<?php
  return ob_get_clean();
}

/**
 * Renders the individual rankings item.
 *
 * @param array $post The post data.
 * @param int $order The menu order.
 * @return string The HTML content of the rankings item.
 */
function edumed_render_rankings_item($post, $order) {
  ob_start();
  ?>
  <div class="rankings-list--item">
    <div class="rankings-list--item--heading">
      <div class="rankings-list--item--heading--left">
        <span class="rankings-list--item--heading--left--rank"><?php echo esc_html($order); ?></span>
        <div class="rankings-list--item--heading--left--title">
          <h4><a href="<?php echo esc_url($post['acf_fields']['online_program_url']); ?>" target="_blank" rel="noopener noreferrer nofollow"><?php echo esc_html($post['title']); ?></a></h4>
          <p><?php echo esc_html($post['acf_fields']['city_location_of_institution']) . ', ' . esc_html($post['acf_fields']['state_abbreviation']); ?></p>
        </div>
        <span class="rankings-list--item--heading--left--button"></span>
      </div>
      <div class="rankings-list--item--heading--right">
        <p>
          <?php echo edumed_render_svg_icons($post['acf_fields']['online_programs']); ?>
        </p>
        <p><?php echo esc_html($post['acf_fields']['control_of_institution']); ?></p>
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
            <?php echo edumed_render_traditional_rankings_acf_fields($post['acf_fields']); ?>
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
function edumed_render_traditional_rankings_acf_fields($acf_fields) {
  ob_start();

  if (!empty($acf_fields['accreditation'])) {
      echo '<li><span>' . esc_html__('Accreditation', 'text-domain') . '</span>' . esc_html($acf_fields['accreditation']) . '</li>';
  }

  if (isset($acf_fields['avg_inst_aid_stars']) && is_numeric($acf_fields['avg_inst_aid_stars']) && $acf_fields['avg_inst_aid_stars'] > 0) {
      echo '<li><span>' . esc_html__('Avg. Inst. Aid', 'text-domain') . '</span>' . '<span>' . edumed_render_stars($acf_fields['avg_inst_aid_stars']) . '</span>' . '</li>';
  } else {
      echo '<li><span>' . esc_html__('Avg. Inst. Aid', 'text-domain') . '</span>' . '<span class="avg-default">' . esc_html__('N/A', 'text-domain') . '</span>' . '</li>';
  }

  if (!empty($acf_fields['percentage_in_online_ed'])) {
      echo '<li><span>' . esc_html__('% in Online Ed.', 'text-domain') . '</span>' . esc_html($acf_fields['percentage_in_online_ed']) . '</li>';
  }

  if (!empty($acf_fields['percentage_receiving_award'])) {
      echo '<li><span>' . esc_html__('% Receiving Award', 'text-domain') . '</span>' . esc_html($acf_fields['percentage_receiving_award']) . '</li>';
  }

  if (!empty($acf_fields['tuition_gutenberg'])) {
      echo '<li><span>' . esc_html__('Tuition', 'text-domain') . '</span>' . esc_html($acf_fields['tuition_gutenberg']) . '</li>';
  }

  if (!empty($acf_fields['studentfaculty_ratio'])) {
      echo '<li><span>' . esc_html__('Student/Faculty Ratio', 'text-domain') . '</span>' . esc_html($acf_fields['studentfaculty_ratio']) . '</li>';
  }

  return ob_get_clean();
}