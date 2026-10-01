<?php

/**
 * ACF Fields: Ranking Page Settings.
 *
 * @package Ventrix.
 */

if (! defined('ABSPATH')) {
  exit; // Prevent direct access.
}

if (function_exists('acf_add_local_field_group')) {
  acf_add_local_field_group(array(
    'key' => 'group_ranking_pages_settings',
    'title' => 'Ranking Setting',
    'fields' => array(
      array(
        'key' => 'field_ranking_page_post_type',
        'label' => 'Ranking Post type',
        'name' => 'ranking_page_post_type',
        'aria-label' => '',
        'type' => 'select',
        'instructions' => 'Sheet Editor stores the key, not the dropdown label. Use latest_rankings.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '33.33',
        ),
        'choices' => array(
          '' => 'Choose an option',
          'latest_rankings' => 'Latest Rankings',
        ),
        'default_value' => 'latest_rankings',
        'return_format' => 'value',
        'multiple' => 0,
        'allow_custom' => 0,
        'placeholder' => '',
        'search_placeholder' => '',
        'allow_null' => 0,
        'allow_in_bindings' => 1,
        'ui' => 0,
        'ajax' => 0,
      ),
      array(
        'key' => 'field_ranking_page_block_design',
        'label' => 'Ranking Block Design',
        'name' => 'ranking_page_block_design',
        'aria-label' => '',
        'type' => 'select',
        'instructions' => 'Sheet Editor stores the key, not the dropdown label. Use ranking-2027, ranking-2026, or featured-rankings-2026.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '33.33',
        ),
        'choices' => array(
          '' => 'Choose an option',
          'ranking-2026' => 'Rankings 2026',
          'featured-rankings-2026' => 'Featured Rankings 2026',
          'ranking-2027' => 'Rankings 2027',
        ),
        'default_value' => '',
        'return_format' => 'value',
        'multiple' => 0,
        'allow_custom' => 0,
        'placeholder' => '',
        'search_placeholder' => '',
        'allow_null' => 0,
        'allow_in_bindings' => 1,
        'ui' => 0,
        'ajax' => 0,
      ),
      array(
        'key' => 'field_ranking_page_program',
        'label' => 'Ranking Actual Program',
        'name' => 'ranking_page_program',
        'aria-label' => '',
        'type' => 'taxonomy',
        'instructions' => 'Ranking category. Sheet Editor should use the term name, such as Applied Behavior Analysis, not the slug.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '33.33',
        ),
        'taxonomy' => 'ranking_category',
        'add_term' => 0,
        'save_terms' => 1,
        'load_terms' => 1,
        'return_format' => 'object',
        'field_type' => 'select',
      ),
      array(
        'key' => 'field_ranking_page_default_open',
        'label' => 'Ranking Default Open',
        'name' => 'ranking_page_default_open',
        'aria-label' => '',
        'type' => 'range',
        'instructions' => 'How many school cards start open. Use a number from 0 to 10.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '33.33',
        ),
        'default_value' => 0,
        'min' => '0',
        'max' => '10',
      ),
      array(
        'key' => 'field_ranking_page_methodology_version',
        'label' => 'Methodology Version',
        'name' => 'ranking_page_methodology_version',
        'aria-label' => '',
        'type' => 'select',
        'instructions' => 'Which methodology text the "About the Ranking" popup shows. Manage the versions under Theme OMD Settings &rarr; Rankings &rarr; Methodology. Sheet Editor stores the version number, such as 1.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '33.33',
        ),
        'choices' => array(),
        'default_value' => '',
        'return_format' => 'value',
        'multiple' => 0,
        'allow_custom' => 0,
        'placeholder' => '',
        'search_placeholder' => '',
        'allow_null' => 1,
        'allow_in_bindings' => 1,
        'ui' => 0,
        'ajax' => 0,
      ),
      array(
        'key' => 'field_ranking_page_version',
        'label' => 'Ranking Version',
        'name' => 'ranking_page_version',
        'aria-label' => '',
        'type' => 'select',
        'instructions' => 'Sheet Editor value matches the label: 2027, 2026, 2025, or 2024. Schools are matched on this version.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '33.33',
        ),
        'choices' => array(
          2027 => '2027',
          2026 => '2026',
          2025 => '2025',
          2024 => '2024',
        ),
        'default_value' => false,
        'return_format' => 'value',
        'multiple' => 0,
        'placeholder' => '',
        'allow_null' => 1,
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'page',
        ),
      ),
    ),
    'menu_order' => 0,
    'position' => 'normal',
    'style' => 'default',
    'label_placement' => 'top',
    'instruction_placement' => 'label',
    'hide_on_screen' => '',
    'active' => true,
    'description' => '',
    'show_in_rest' => 0,
    'acfe_display_title' => '',
    'acfe_autosync' => '',
    'acfe_form' => 0,
    'acfe_meta' => '',
    'acfe_note' => '',
  ));
}

/**
 * Builds the Methodology Version choices from the methodology repeater.
 *
 * Row 1 of the repeater is version 1, row 2 is version 2, and so on, matching
 * how omd_render_popup_section() resolves a version number to a row.
 *
 * @param array $field The ACF field being loaded.
 * @return array The field with its choices populated.
 */
function vtx_omd_load_methodology_version_choices($field)
{
  $field['choices'] = array();

  if (! function_exists('get_field')) {
    return $field;
  }

  $rows = get_field('ranking_methodology_options', 'option');

  if (! is_array($rows)) {
    return $field;
  }

  foreach ($rows as $index => $row) {
    $version = $index + 1;
    $preview = isset($row['content_version']) ? wp_strip_all_tags($row['content_version']) : '';
    $preview = trim(preg_replace('/\s+/', ' ', $preview));

    $field['choices'][$version] = '' !== $preview
      ? sprintf('%d — %s', $version, wp_html_excerpt($preview, 60, '…'))
      : sprintf('%d', $version);
  }

  return $field;
}
add_filter('acf/load_field/key=field_ranking_page_methodology_version', 'vtx_omd_load_methodology_version_choices');
