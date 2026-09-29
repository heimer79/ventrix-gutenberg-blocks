<?php

/**
 * ACF Fields: Ranking 2027.
 *
 * New meta keys only. Rankings 2026 and the Default Fields group are unchanged.
 *
 * Sheet columns that are not fields in this group:
 * - Institution Name is the post title.
 * - Program Description is the post content.
 * - Rank is the Order field (menu_order), from Page Attributes.
 * - Ranking is Actual Program in Default Fields (ranking_category).
 *
 * @package ventrix
 */

if (! defined('ABSPATH')) {
  exit;
}

if (! function_exists('vtx_omd_2027_text_field')) {
  /**
   * Builds a text field whose label is prefixed for Sheet Editor.
   *
   * @param string $key          Unique field-key suffix.
   * @param string $label        Spreadsheet column name.
   * @param string $name         Meta key. Must not match a 2026 field.
   * @param string $width        Admin column width.
   * @param string $instructions Optional helper text.
   * @return array
   */
  function vtx_omd_2027_text_field($key, $label, $name, $width = '25', $instructions = '')
  {
    return array(
      'key' => 'field_omd_2027_' . $key,
      'label' => '2027 | ' . $label,
      'name' => $name,
      'aria-label' => '',
      'type' => 'text',
      'instructions' => $instructions,
      'required' => 0,
      'conditional_logic' => 0,
      'wrapper' => array(
        'width' => $width,
        'class' => '',
        'id' => '',
      ),
      'default_value' => '',
      'maxlength' => '',
      'allow_in_bindings' => 0,
      'placeholder' => '',
      'prepend' => '',
      'append' => '',
    );
  }
}

if (function_exists('acf_add_local_field_group')) {
  acf_add_local_field_group(array(
    'key' => 'group_omd_latest_ranking_2027',
    'title' => 'Rankings 2027',
    'fields' => array(
      vtx_omd_2027_text_field(
        'version',
        'Version',
        'version_2027',
        '25',
        'Spreadsheet "Version". Use 2027. Must match the ranking page Version setting. Separate from the older Version field.'
      ),
      array(
        'key' => 'field_omd_2027_ranking_type',
        'label' => '2027 | Ranking Type',
        'name' => 'ranking_type_2027',
        'aria-label' => '',
        'type' => 'select',
        'instructions' => 'Spreadsheet "Ranking Type". Best keeps fees in Program Details. Affordable moves them into Financial Facts and changes the header pills.',
        'required' => 0,
        'conditional_logic' => 0,
        'wrapper' => array(
          'width' => '25',
          'class' => '',
          'id' => '',
        ),
        'choices' => array(
          'Best' => 'Best',
          'Affordable' => 'Affordable',
        ),
        'default_value' => '',
        'return_format' => 'value',
        'multiple' => 0,
        'allow_null' => 1,
        'ui' => 0,
        'ajax' => 0,
        'placeholder' => '',
        'allow_in_bindings' => 1,
      ),
      vtx_omd_2027_text_field('pmastr', 'PMASTR', 'pmastr_2027', '25', 'Spreadsheet "PMASTR". Stored only.'),
      vtx_omd_2027_text_field('unitid', 'UnitID', 'unitid_2027', '25', 'Spreadsheet "UnitID". Stored only.'),
      vtx_omd_2027_text_field('asset_url', 'Asset URL', 'asset_url_2027', '50', 'Spreadsheet "Asset URL". Stored only.'),
      vtx_omd_2027_text_field('program_url', 'Program URL', 'program_url_2027', '50', 'Spreadsheet "Program URL". Link on the school name.'),
      vtx_omd_2027_text_field('school_website', 'School Website', 'school_website_2027', '50', 'Spreadsheet "School Website". Stored only.'),
      vtx_omd_2027_text_field('city', 'City', 'city_2027', '25', 'Spreadsheet "City". Shown in the location line.'),
      vtx_omd_2027_text_field('state', 'State', 'state_2027', '25', 'Spreadsheet "State". Shown in the location line.'),
      vtx_omd_2027_text_field('level', 'Level', 'level_2027', '25', 'Spreadsheet "Level". Stored only.'),
      vtx_omd_2027_text_field('control', 'Control', 'control_2027', '25', 'Spreadsheet "Control". Shown as School Type.'),
      vtx_omd_2027_text_field(
        'academic_career_counseling',
        'Academic/Career Counseling',
        'academic_career_counseling_2027',
        '50',
        'Spreadsheet "Academic/Career Counseling". Stored only.'
      ),
      vtx_omd_2027_text_field('accreditation', 'Accreditation', 'accreditation_2027', '50', 'Spreadsheet "Accreditation".'),
      vtx_omd_2027_text_field(
        'online_graduate_enrollment',
        'Online Graduate Enrollment',
        'online_graduate_enrollment_2027',
        '25',
        'Spreadsheet "Online Graduate Enrollment". Best header pill, and an Affordable Program Details row.'
      ),
      vtx_omd_2027_text_field(
        'in_state_ft_avg_tuition',
        'In-State FT Avg. Tuition',
        'in_state_ft_avg_tuition_2027',
        '25',
        'Spreadsheet "In-State FT Avg. Tuition". Shown as Avg. Tuition.'
      ),
      vtx_omd_2027_text_field(
        'in_state_pt_credit_charge',
        'In-State PT Credit Charge',
        'in_state_pt_credit_charge_2027',
        '25',
        'Spreadsheet "In-State PT Credit Charge". Shown as Avg. Cost/Credit.'
      ),
      vtx_omd_2027_text_field(
        'in_state_ft_required_fees',
        'In-State FT Required Fees',
        'in_state_ft_required_fees_2027',
        '25',
        'Spreadsheet "In-State FT Required Fees". Shown as FT Fees.'
      ),
      vtx_omd_2027_text_field(
        'in_state_pt_required_fees',
        'In-State PT Required Fees',
        'in_state_pt_required_fees_2027',
        '25',
        'Spreadsheet "In-State PT Required Fees". Shown as PT Fees.'
      ),
      vtx_omd_2027_text_field(
        'graduate_application_fee',
        'Graduate Application Fee',
        'graduate_application_fee_2027',
        '25',
        'Spreadsheet "Graduate Application Fee". Shown as Application Fee.'
      ),
      vtx_omd_2027_text_field(
        'alternative_tuition_plans',
        'Alternative Tuition Plan(s)',
        'alternative_tuition_plans_2027',
        '25',
        'Spreadsheet "Alternative Tuition Plan(s)". Shown as Alt. Tuition Plan.'
      ),
      vtx_omd_2027_text_field('score', 'Score', 'score_2027', '25', 'Spreadsheet "Score". Stored only. Rank order uses the Order field.'),
      vtx_omd_2027_text_field('best_for', 'Best For', 'best_for_2027', '75', 'Spreadsheet "Best For". Shown as "Best for: …".'),
      vtx_omd_2027_text_field('program_highlight_1', 'Program Highlight 1', 'program_highlight_1_2027', '100', 'Spreadsheet "Program Highlight 1".'),
      vtx_omd_2027_text_field('program_highlight_2', 'Program Highlight 2', 'program_highlight_2_2027', '100', 'Spreadsheet "Program Highlight 2".'),
      vtx_omd_2027_text_field('program_highlight_3', 'Program Highlight 3', 'program_highlight_3_2027', '100', 'Spreadsheet "Program Highlight 3".'),
    ),
    'location' => array(
      array(
        array(
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'latest_rankings',
        ),
      ),
    ),
    'menu_order' => 3,
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
