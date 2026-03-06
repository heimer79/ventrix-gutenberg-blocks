<?php

/**
 * ACF Fields: PSD Ranking Page Settings.
 *
 * Registers a local ACF field group for configuring the PSD Rankings block
 * on individual pages. Each page can define which ranking design, program,
 * version, and level year to display.
 *
 * @package Ventrix.
 */

// Prevent direct file access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'acf_add_local_field_group' ) ) {
	return;
}

acf_add_local_field_group( array(
	// -------------------------------------------------------------------------
	// Field Group: PSD Ranking Page Settings
	// Use a unique key with a 'psd_' prefix to avoid collisions with other
	// site field groups that share the same field names (e.g. edumed).
	// -------------------------------------------------------------------------
	'key'                   => 'group_psd_ranking_page_settings',
	'title'                 => 'PSD Ranking Settings',
	'description'           => 'Configure the rankings block displayed on this page. These settings control which data, design, and program are loaded.',
	'fields'                => array(

		// ---------------------------------------------------------------------
		// Field: Post Type
		// Determines which WordPress custom post type is queried for rankings.
		// For PSD, the only valid value is "school_rankings".
		// ---------------------------------------------------------------------
		array(
			'key'               => 'field_psd_ranking_post_type',
			'label'             => 'Post Type',
			'name'              => 'post_type',
			'aria-label'        => 'Select the custom post type used for rankings data',
			'type'              => 'select',
			'instructions'      => 'Select the custom post type that holds the rankings data. For PSD, this should always be "School Rankings".',
			'required'          => 0,
			'conditional_logic' => 0,
			'wrapper'           => array(
				'width' => '33',
			),
			'choices'           => array(
				'school_rankings' => 'School Rankings',
			),
			'default_value'     => 'school_rankings',
			'return_format'     => 'value',
			'multiple'          => 0,
			'allow_custom'      => 0,
			'allow_null'        => 0,
			'placeholder'       => '',
			'search_placeholder' => '',
			'ui'                => 0,
			'ajax'              => 0,
			'allow_in_bindings' => 1,
		),

		// ---------------------------------------------------------------------
		// Field: Block Design
		// Selects which PHP partial/template is used to render the block.
		// Maps directly to the 'blockDesign' attribute in the Gutenberg block
		// and to the switch() in render.php.
		// ---------------------------------------------------------------------
		array(
			'key'               => 'field_psd_ranking_block_design',
			'label'             => 'Block Design',
			'name'              => 'block_design',
			'aria-label'        => 'Select the visual design template for this rankings block',
			'type'              => 'select',
			'instructions'      => 'Choose the visual layout for this rankings block. "Rankings 2025" uses the current design. "Rankings Spring 2026" uses the new Spring 2026 design. This value must match the Block Design selected in the Gutenberg block\'s sidebar settings.',
			'required'          => 0,
			'conditional_logic' => 0,
			'wrapper'           => array(
				'width' => '33',
			),
			'choices'           => array(
				'rankings_2025'        => 'Rankings 2025',
				'rankings_spring_2026' => 'Rankings Spring 2026',
			),
			'default_value'    => 'rankings_2025',
			'return_format'    => 'value',
			'multiple'         => 0,
			'allow_custom'     => 0,
			'allow_null'       => 0,
			'placeholder'      => '',
			'search_placeholder' => '',
			'ui'               => 0,
			'ajax'             => 0,
			'allow_in_bindings' => 1,
		),

		// ---------------------------------------------------------------------
		// Field: Program
		// Taxonomy selector. Filters the rankings query to show only schools
		// belonging to the selected program category.
		// ---------------------------------------------------------------------
		array(
			'key'               => 'field_psd_ranking_program',
			'label'             => 'Program',
			'name'              => 'program',
			'aria-label'        => 'Select the program category to display rankings for',
			'type'              => 'taxonomy',
			'instructions'      => 'Select the program category (e.g. "Nursing", "Education") to filter which schools appear in the rankings list. Only one program can be selected per block.',
			'required'          => 0,
			'conditional_logic' => 0,
			'wrapper'           => array(
				'width' => '33',
			),
			'taxonomy'          => 'school_ranking_category',
			'add_term'          => 0,
			'save_terms'        => 0,
			'load_terms'        => 0,
			'return_format'     => 'id',
			'field_type'        => 'select',
			'allow_null'        => 0,
			'multiple'          => 0,
		),

		// ---------------------------------------------------------------------
		// Field: Methodology Text Version
		// Controls which methodology text is shown in the "About the Rankings"
		// popup. The value corresponds to the index in the methodology repeater
		// stored in the global ACF options.
		// ---------------------------------------------------------------------
		array(
			'key'               => 'field_psd_ranking_methodology_text',
			'label'             => 'Methodology Text Version',
			'name'              => 'ranking_metodology_text',
			'aria-label'        => 'Enter the methodology text version number to display in the About the Rankings popup',
			'type'              => 'text',
			'instructions'      => 'Enter a version number (e.g. 1, 2, 3) that corresponds to an entry in the Ranking Methodology repeater (in global settings). This controls which explanation text appears in the "About the Rankings" popup. Leave empty or enter "1" to use the default.',
			'required'          => 0,
			'conditional_logic' => 0,
			'wrapper'           => array(
				'width' => '50',
			),
			'default_value'     => '1',
			'placeholder'       => '1',
			'prepend'           => '',
			'append'            => '',
			'maxlength'         => 5,
		),

		// ---------------------------------------------------------------------
		// Field: Default Level Year
		// Used when the page shows a single level (2-year or 4-year) ranking.
		// It controls the initial tab/view shown when the page loads.
		// Leave blank if the block shows both levels.
		// ---------------------------------------------------------------------
		array(
			'key'               => 'field_psd_ranking_default_level_year',
			'label'             => 'Default Level Year',
			'name'              => 'default_level_year',
			'aria-label'        => 'Select which school level year is shown by default',
			'type'              => 'select',
			'instructions'      => 'If the ranking list separates schools by level (2-year vs 4-year), choose which level is displayed by default when the page first loads. Leave empty if the block does not use level-year filtering.',
			'required'          => 0,
			'conditional_logic' => 0,
			'wrapper'           => array(
				'width' => '50',
			),
			'choices'           => array(
				'four-year' => '4-year Schools',
				'two-year'  => '2-year Schools',
			),
			'default_value'     => false,
			'return_format'     => 'value',
			'multiple'          => 0,
			'allow_null'        => 1,
			'placeholder'       => '— Select a level (optional) —',
		),

		// ---------------------------------------------------------------------
		// Field: Version (Data Version)
		// Corresponds to the 'version_acf' meta field stored on each school
		// ranking post. Controls which annual dataset is used for this page.
		// ---------------------------------------------------------------------
		array(
			'key'               => 'field_psd_ranking_version',
			'label'             => 'Version (Data Year)',
			'name'              => 'version',
			'aria-label'        => 'Select the data year version for the rankings to display',
			'type'              => 'select',
			'instructions'      => 'Select the data year to display. This filters rankings by the "version_acf" meta value on each school ranking post. Use the most recent year unless this page is intentionally showing historical data.',
			'required'          => 0,
			'conditional_logic' => 0,
			'wrapper'           => array(
				'width' => '50',
			),
			'choices'           => array(
				'2027' => '2027',
				'2026' => '2026',
				'2025' => '2025',
				'2024' => '2024',
			),
			'default_value'     => '2025',
			'return_format'     => 'value',
			'multiple'          => 0,
			'allow_null'        => 0,
			'placeholder'       => '',
		),
	),

	// -------------------------------------------------------------------------
	// Location Rules
	// Show this field group only on Pages (post_type == page).
	// -------------------------------------------------------------------------
	'location'              => array(
		array(
			array(
				'param'    => 'post_type',
				'operator' => '==',
				'value'    => 'page',
			),
		),
	),

	// -------------------------------------------------------------------------
	// Display Options
	// -------------------------------------------------------------------------
	'menu_order'            => 0,
	'position'              => 'normal',
	'style'                 => 'default',
	'label_placement'       => 'top',
	'instruction_placement' => 'label',
	'hide_on_screen'        => '',
	'active'                => true,
	'show_in_rest'          => 0,
) );
