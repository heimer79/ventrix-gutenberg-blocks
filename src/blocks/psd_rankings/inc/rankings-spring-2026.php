<?php
/**
 * PSD Rankings - Spring 2026 Render
 *
 * Partial template for the "Rankings Spring 2026" design.
 * This file will contain the rendering logic for the Spring 2026 version of the PSD rankings block.
 */

/**
 * Renders the PSD Rankings block using the Spring 2026 design.
 *
 * @param array $attributes The block attributes.
 * @return string The block HTML content.
 */
function psd_render_block_rankings_spring_2026( $attributes, $post_ID, $block_design ) {

    // Get the attributes with default values.
    $post_type              = get_field('post_type', $post_ID) ?: 'school_ranking';
    $program                = isset( $attributes['program'] ) ? $attributes['program'] : '';
    $has_two_and_four_years = isset( $attributes['hasTwoAndFourYears'] ) ? $attributes['hasTwoAndFourYears'] : '';
    $default_level_year     = isset( $attributes['defaultLevelYear'] ) ? $attributes['defaultLevelYear'] : '';
    $version                = isset( $attributes['version'] ) ? $attributes['version'] : '';

    // Reuse the shared data-fetching function from rankings-2025.php
    $posts = vtx_get_rankings_spring_data_2026( $post_type, $version, $program );

    if ( ! is_array( $posts ) ) {
        $posts = array();
    }

    $rankings_count = count( $posts );
    $query_success  = ! empty( $posts );
    $default_open   = $rankings_count >= 6 ? 3 : $rankings_count;
    $level_year_id  = $default_level_year === 'two-year' ? 'two-year-rankings' : 'four-year-rankings';

    ob_start();
    ?>
    <span id="rankings-<?php echo esc_attr( $default_level_year ); ?>"></span>
    <div class="cafeto-rankings-block cafeto-rankings-block--spring-2026"
        data-query-status="<?php echo esc_attr( $query_success ? 'success' : 'error' ); ?>"
        data-level-year="<?php echo esc_attr( $default_level_year ); ?>"
        data-has-years="<?php echo esc_attr( $has_two_and_four_years ); ?>"
        data-default-open="<?php echo esc_attr( $default_open ); ?>"
        id="<?php echo esc_attr( $level_year_id ); ?>"
    >

        <!-- TODO: Implement Spring 2026 layout -->
        <?php if ( $query_success ) : ?>
            <?php foreach ( $posts as $post ) : ?>
                <p><?php echo esc_html( $post['title'] ); ?></p>
            <?php endforeach; ?>
        <?php else : ?>
            <p><?php esc_html_e( 'No rankings found.', 'text-domain' ); ?></p>
        <?php endif; ?>

    </div>
    <?php

    return ob_get_clean();
}

function vtx_get_rankings_spring_data_2026($post_type, $version, $program) {
// Cache key
  $cache_key = "rankings_spring_2026_data_{$post_type}_{$version}_{$program}";
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
                    // Core Data Default Fields.
                    'version' => get_field('version_acf'),
                    'asset_url' => get_field('asset_url'),
                    'program' => get_field('program_category'),
                    'online_program_url' => get_field('online_program_url'),
                    'subject' => get_field('ranking_subject'),
                    'unitid' => get_field('ranking_unitid'),
                    'city' => get_field('ranking_city'),
                    'state' => get_field('ranking_state'),
                    'online_enrollment' => get_field('ranking_online_enrollment'),
                    'school_type' => get_field('ranking_school_type'),
                    'score' => get_field('ranking_score'),

                    // Core Data Ranking Spring 2026 Fields.
                    'pmastr_ptotal' => get_field('rp_pmastr_ptotal'),
                    'non_white_enrollment' => get_field('rp_non_white_enrollment'),
                    'graduate_enrollment' => get_field('rp_graduate_enrollment'),
                    'graduation_rate' => get_field('rp_graduation_rate'),
                    'students_with_disabilities' => get_field('rp_students_with_disabilities'),
                    'employment_services' => get_field('rp_employment_services'),
                    'academic_career_counseling' => get_field('rp_academic_career_counseling'),
                    'academic_career_services' => get_field('rp_academic_career_services'),
                    'net_price' => get_field('rp_net_price'),
                    'avg_tuition' => get_field('rp_avg_tuition'),
                    'alt_tuition_plans' => get_field('rp_alt_tuition_plans'),
                    'pell_grant_recipients' => get_field('rp_pell_grant_recipients'),
                    'inst_aid_recipients' => get_field('rp_inst_aid_recipients'),
                    'blurb_1' => get_field('rp_blurb_1'),
                    'blurb_2' => get_field('rp_blurb_2'),
                    'blurb_3' => get_field('rp_blurb_3'),
                ),
            );
        }
    }

    wp_cache_set($cache_key, $posts);
  }

  return $posts;
}
