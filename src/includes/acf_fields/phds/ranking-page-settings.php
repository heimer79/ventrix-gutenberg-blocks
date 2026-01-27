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
        'label' => 'Post type',
        'name' => 'ranking_page_post_type',
        'aria-label' => '',
        'type' => 'select',
        'instructions' => '',
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
        'label' => 'Block Design',
        'name' => 'ranking_page_block_design',
        'aria-label' => '',
        'type' => 'select',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '33.33',
        ),
        'choices' => array(
          '' => 'Choose an option',
          'ranking-2026' => 'Rankings 2026',
          'ranking-working-professionals' => 'Rankings Working Professionals',
          'ranking-geo' => 'Rankings Geo',
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
        'label' => 'Actual Program',
        'name' => 'ranking_page_program',
        'aria-label' => '',
        'type' => 'taxonomy',
        'instructions' => '',
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
        'label' => 'Default Open',
        'name' => 'ranking_page_default_open',
        'aria-label' => '',
        'type' => 'range',
        'instructions' => '',
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
        'key' => 'field_ranking_page_methodology_popup',
        'label' => 'Methodology popup',
        'name' => 'ranking_page_methodology_popup',
        'aria-label' => '',
        'type' => 'text',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '33.33',
        ),
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'maxlength' => '',
      ),
      array(
        'key' => 'field_ranking_page_version',
        'label' => 'Version',
        'name' => 'ranking_page_version',
        'aria-label' => '',
        'type' => 'select',
        'instructions' => '',
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
