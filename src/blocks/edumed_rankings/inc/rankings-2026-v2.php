<?php

/**
 * Rankings 2026 V2 Block.
 *
 * @package EduMed
 */

/**
 * Security check: Verify that ACF is active and functions exist
 */

if (!function_exists('get_field')) {
    // ACF is not active, return error message
    if (!function_exists('edumed_get_rankings_data')) {
        function edumed_get_rankings_data($post_type, $level_year_value, $version, $program) {
            return array(); // Return empty array to prevent errors
        }
    }   

    if (!function_exists('edumed_render_top_bar_school_ranking')) {
        function edumed_render_top_bar_school_ranking($program, $level_year_value, $version) {
            return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
                    <strong>Error:</strong> Advanced Custom Fields (ACF) plugin is required for this block to function properly. 
                    Please install and activate ACF plugin.
                </div>';
        }
    }

    if (!function_exists('edumed_render_rankings_item')) {
        function edumed_render_rankings_item($post, $order) {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
                <strong>Error:</strong> Advanced Custom Fields (ACF) plugin is required for this block to function properly.
            </div>';
        }
    }

    if (!function_exists('edumed_render_traditional_rankings_acf_fields')) {
        function edumed_render_traditional_rankings_acf_fields($acf_fields) {
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
        function edumed_get_rankings_data($post_type, $level_year_value, $version, $program) {
        return array(); // Return empty array to prevent errors
        }
    }

    function edumed_render_top_bar_school_ranking($program, $level_year_value, $version) {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
                <strong>Error:</strong> WordPress query functionality is not available. 
                This may indicate a WordPress installation issue.
            </div>';
    }

    function edumed_render_rankings_item($post, $order) {
        return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
                <strong>Error:</strong> WordPress query functionality is not available.
            </div>';
    }

    function edumed_render_traditional_rankings_acf_fields($acf_fields) {
        return '';
    }

    return;
}

function vtx_render_block_rankings_2026_v2($attributes, $post_ID, $block_design) {

  // Extract attributes with defaults
  $post_type = get_field('post_type', $post_ID) ?: 'school_ranking';
  $program_field = get_field('program', $post_ID);
  $program = ($program_field && is_object($program_field) && isset($program_field->name)) ? $program_field->name : 'CNA';
  $default_open = get_field('default_open', $post_ID) ?: 3;
  $version = get_field('version', $post_ID) ?: '2026';

  // Get ranking data.
  $posts = vtx_get_rankings_data_2026($post_type, $version, $program);

  // Check if the query was successful.
  $query_success = !empty($posts);

  // Set header columns to 3 columns layout.
  $header_columns = 'ranking-header__columns-3';

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

    <!-- Rankings Header -->
    <div class="ranking-lists__header <?php echo $header_columns; ?>">
      <span class="ranking-lists__header-item">#</span>
      <span class="ranking-lists__header-item">School Name</span>
      <span class="ranking-lists__header-item">Acceptance Rate</span>
    </div>

    <!-- Rankings Accordion -->

    <div class="ranking-lists__accordion">
      <?php if ($query_success) : ?>
        <?php foreach ($posts as $index => $post): ?>
          <?php $order = get_post_field('menu_order', $post['ID']); ?>
          <?php
            // Prepare link URL for JSON-LD schema
            $link_url = !empty($post['acf_fields']['online_program_url']) ? $post['acf_fields']['online_program_url'] : get_permalink($post['ID']);
          ?>

          <div class="ranking-lists__accordion-item">
            <?php $fields = $post['acf_fields'] ?>

            <!-- Summary row -->
            <div class="ranking-item__summary">
                <!-- Order mobile -->
                <span class="ranking-item__number hidden-mobile"><?php echo $order; ?></span>
                
                <!-- School info -->
                <div class="ranking-item__school">
                    <!-- Order desktop -->
                    <span class="ranking-item__number hidden-desktop"><?php echo $order; ?></span>
                    <div>
                        <!-- School Name -->
                        <h4>
                            <a href="<?php echo esc_url($fields['online_program_url']); ?>"
                                target="_blank" rel="noopener noreferrer nofollow">
                                <?php echo esc_html($post['title']); ?>
                            </a>
                        </h4>
                        <!-- Location -->
                        <span class="ranking-item__location"><?php echo esc_html($fields['city']) . ', ' . esc_html($fields['state']); ?></span>
                    </div>
                </div>

                <!-- Acceptance Rate -->
                <div class="ranking-item__stats">
                    <div class="stats-content">
                        <span class="stats-content__title">
                            <?php echo esc_html($fields['acceptance_rate'] ?? 'N/A'); ?>
                        </span>
                        <span class="stats-content__subtitle">
                            Acceptance Rate
                        </span>
                    </div>
                </div>

              <!-- Toggle -->
                <button class="toggle-details" aria-expanded="false">+</button>
            </div>

            <!-- Hidden details -->
            <div class="ranking-item__details" aria-hidden="true">

                <!-- Program Details - Mobile -->
                <div class="ranking-item__content">
                    <?php echo wp_kses_post($post['content']); ?>
                    <div class="box-apply">
                        <ul>
                            <?php if (!empty($fields['acceptance_rate'])): ?>
                            <li>
                                <span>Acceptance Rate</span>
                                <?php echo esc_html($fields['acceptance_rate']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['secondary_school_gpa'])): ?>
                            <li>
                                <span>Secondary School GPA</span>
                                <?php echo esc_html($fields['secondary_school_gpa']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['secondary_school_rank'])): ?>
                            <li>
                                <span>Secondary School Rank</span>
                                <?php echo esc_html($fields['secondary_school_rank']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['secondary_school_record'])): ?>
                            <li>
                                <span>Secondary School Record</span>
                                <?php echo esc_html($fields['secondary_school_record']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['recommendations'])): ?>
                            <li>
                                <span>Recommendations</span>
                                <?php echo esc_html($fields['recommendations']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['formal_demonstration_of_competencies'])): ?>
                            <li>
                                <span>Formal Demonstration of Competencies</span>
                                <?php echo esc_html($fields['formal_demonstration_of_competencies']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['personal_statement_or_essay'])): ?>
                            <li>
                                <span>Personal Statement or Essay</span>
                                <?php echo esc_html($fields['personal_statement_or_essay']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['admission_test_scores'])): ?>
                            <li>
                                <span>Admission Test Scores</span>
                                <?php echo esc_html($fields['admission_test_scores']); ?>
                            </li>
                            <?php endif; ?>
                        </ul>
                    </div>
                    
                </div>

                <!-- Program Details - Desktop -->
                <div class="ranking-item__program-details">
                    <div class="box-apply">
                        <ul>
                            <?php if (!empty($fields['secondary_school_gpa'])): ?>
                            <li>
                                <span>Secondary School GPA</span>
                                <?php echo esc_html($fields['secondary_school_gpa']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['secondary_school_rank'])): ?>
                            <li>
                                <span>Secondary School Rank</span>
                                <?php echo esc_html($fields['secondary_school_rank']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['secondary_school_record'])): ?>
                            <li>
                                <span>Secondary School Record</span>
                                <?php echo esc_html($fields['secondary_school_record']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['recommendations'])): ?>
                            <li>
                                <span>Recommendations</span>
                                <?php echo esc_html($fields['recommendations']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['formal_demonstration_of_competencies'])): ?>
                            <li>
                                <span>Formal Demonstration of Competencies</span>
                                <?php echo esc_html($fields['formal_demonstration_of_competencies']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['personal_statement_or_essay'])): ?>
                            <li>
                                <span>Personal Statement or Essay</span>
                                <?php echo esc_html($fields['personal_statement_or_essay']); ?>
                            </li>
                            <?php endif; ?>
                            <?php if (!empty($fields['admission_test_scores'])): ?>
                            <li>
                                <span>Admission Test Scores</span>
                                <?php echo esc_html($fields['admission_test_scores']); ?>
                            </li>
                            <?php endif; ?>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Schema -->
            <?php
                $schema_items[] = vtx_build_rankings_schema_item(
                    $order,
                    $post['title'],
                    $link_url,
                    $fields['schema_description']
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
