<?php

/**
 * ACF Fields: Ranking Methodology
 *
 * @package Edumed
 */

if (! defined('ABSPATH')) {
  exit; // Prevent direct access.
}

if (function_exists('acf_add_local_field_group')) {
  acf_add_local_field_group(array(
    'key' => 'group_ranking_methodology',
    'title' => 'Ranking Methodology',
    'fields' => array(
      array(
        'key' => 'field_methodology_repeater_options',
        'label' => 'Methodology',
        'name' => 'ranking_methodology_options',
        'aria-label' => '',
        'type' => 'repeater',
        'instructions' => '',
        'required' => 0,
        'conditional_logic' => 0,
        'layout' => 'block',
        'min' => 1,
        'button_label' => 'Add Content',
        'sub_fields' => array(
          array(
            'key' => 'field_content_version',
            'label' => 'Content',
            'name' => 'content_version',
            'type' => 'wysiwyg',
            'tabs' => 'all',
            'toolbar' => 'full',
            'media_upload' => 1,
          ),
        ),
      ),
    ),
    'location' => array(
      array(
        array(
          'param' => 'options_page',
          'operator' => '==',
          'value' => 'acf-options-rankings',
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
