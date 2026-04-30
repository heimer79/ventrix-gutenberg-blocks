<?php

/**
 * ACF Fields: PSD School Rankings — Default Fields.
 *
 * Registers a local ACF field group for the 'school_rankings' custom post type.
 * These fields store the core data for each school ranking entry (version, URL,
 * program, location, scores, etc.) and are displayed in the post edit screen.
 *
 * @package Ventrix
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
		// Field Group: PSD School Rankings — Default Fields
		// Uses a unique 'psd_' prefix to prevent key collisions with other sites
		// (e.g. edumed, omd) that may register groups with the same field names.
		// -------------------------------------------------------------------------
		'key'                   => 'group_psd_default_ranking_fields',
		'title'                 => 'Default School Ranking Fields',
		'description'           => 'Core data fields for each school ranking post. These values are pulled by the PSD Rankings block to build the rankings list.',
		'fields'                => array(

				// ---------------------------------------------------------------------
				// Field: Version (ACF)
				// Stored as 'version_acf' and used as a filter in WP_Query to separate
				// different data sets (e.g. 2025 vs 2026 rankings data).
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_version_acf',
						'label'             => 'Version General',
						'name'              => 'version',
						'aria-label'        => 'Enter the data year version this school ranking belongs to',
						'type'              => 'text',
						'instructions'      => 'Enter the data year this school ranking belongs to (e.g. "2025", "2026"). This value is used to filter rankings by year when the block is rendered on a page.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '50',
						),
						'default_value'     => '',
						'maxlength'         => 4,
						'placeholder'       => 'e.g. 2025',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Asset URL
				// URL to the school's logo or image asset used in the ranking card.
				// Should be an absolute URL (https://...).
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_asset_url',
						'label'             => 'Asset URL',
						'name'              => 'asset_url',
						'aria-label'        => 'Enter the URL to the school logo or image asset',
						'type'              => 'text',
						'instructions'      => 'Enter the absolute URL to the school\'s logo image (e.g. https://cdn.example.com/logo.png). This image is displayed in the ranking card header.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '50',
						),
						'default_value'     => '',
						'maxlength'         => 500,
						'placeholder'       => 'https://...',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Program Category (Taxonomy)
				// Associates this school ranking post with a program (taxonomy term)
				// such as "Nursing" or "Education". Used as a filter in WP_Query.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_program_category',
						'label'             => 'Program Category',
						'name'              => 'program_category',
						'aria-label'        => 'Select the program this school ranking belongs to',
						'type'              => 'taxonomy',
						'instructions'      => 'Select the program category this school ranking belongs to (e.g. "Nursing", "Business"). This links the post to the correct taxonomy term used to filter rankings on the page.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '50',
						),
						'taxonomy'          => 'school_ranking_category',
						'add_term'          => 0,
						'save_terms'        => 1,
						'load_terms'        => 1,
						'return_format'     => 'object',
						'field_type'        => 'select',
						'allow_null'        => 0,
						'multiple'          => 0,
						'allow_in_bindings' => 1,
						'bidirectional'     => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Online Program URL
				// The affiliate/tracking link to the school's online program page.
				// Used as the href on the school name and CTA button.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_online_program_url',
						'label'             => 'Online Program URL',
						'name'              => 'online_program_url',
						'aria-label'        => 'Enter the affiliate or tracking URL for the online program',
						'type'              => 'text',
						'instructions'      => 'Enter the affiliate or tracking URL for this school\'s online program page. This is used as the link on the school name and any CTA buttons in the ranking card.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '50',
						),
						'default_value'     => '',
						'maxlength'         => 1000,
						'placeholder'       => 'https://...',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Subject
				// A specific subject or discipline within the broader program category
				// (e.g. "Pediatric Nursing" within "Nursing").
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_subject',
						'label'             => 'Subject',
						'name'              => 'ranking_subject',
						'aria-label'        => 'Enter the specific subject or discipline for this ranking',
						'type'              => 'text',
						'instructions'      => 'Enter the specific subject or discipline within the broader program (e.g. "Pediatric Nursing" within "Nursing"). Used for more granular filtering or display.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '50',
						),
						'default_value'     => '',
						'maxlength'         => 255,
						'placeholder'       => '',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Unit ID
				// The IPEDS Unit ID (or similar institutional identifier) for this
				// school. Used for data reconciliation and import/export matching.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_unitid',
						'label'             => 'Unit ID',
						'name'              => 'ranking_unitid',
						'aria-label'        => 'Enter the IPEDS Unit ID or institutional identifier for this school',
						'type'              => 'text',
						'instructions'      => 'Enter the IPEDS Unit ID (or other institutional identifier) for this school. This is used for data reconciliation when importing or updating rankings data.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '50',
						),
						'default_value'     => '',
						'maxlength'         => 50,
						'placeholder'       => '',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: City
				// The city where the school is physically located.
				// Displayed in the ranking card below the school name.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_city',
						'label'             => 'City',
						'name'              => 'city',
						'aria-label'        => 'Enter the city where this school is located',
						'type'              => 'text',
						'instructions'      => 'Enter the city where the school\'s main campus is located. Displayed in the ranking card below the school name (e.g. "Austin").',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '50',
						),
						'default_value'     => '',
						'maxlength'         => 100,
						'placeholder'       => 'e.g. Austin',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: State
				// The two-letter US state abbreviation for the school's location.
				// Displayed alongside City in the ranking card.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_state',
						'label'             => 'State',
						'name'              => 'state',
						'aria-label'        => 'Enter the two-letter state abbreviation where this school is located',
						'type'              => 'text',
						'instructions'      => 'Enter the two-letter US state abbreviation for this school\'s location (e.g. "TX", "CA"). Displayed alongside the city in the ranking card.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '50',
						),
						'default_value'     => '',
						'maxlength'         => 2,
						'placeholder'       => 'e.g. TX',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),


				// ---------------------------------------------------------------------
				// Field: Online Enrollment
				// The total number of students enrolled in at least one online course.
				// Used as a ranking data point displayed in the School Details panel.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_online_enrollment',
						'label'             => 'Online Enrollment',
						'name'              => 'ranking_online_enrollment',
						'aria-label'        => 'Enter the number of students enrolled in online courses',
						'type'              => 'text',
						'instructions'      => 'Enter the total number of students enrolled in at least one online course. This is a key data point used in the rankings methodology and displayed in the School Details panel.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 20,
						'placeholder'       => '',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: School Type
				// Indicates whether the school is public, private non-profit, or
				// private for-profit. Used for display in the "School Details" panel.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_school_type',
						'label'             => 'School Type',
						'name'              => 'ranking_school_type',
						'aria-label'        => 'Enter the school type (e.g. Public, Private Non-Profit)',
						'type'              => 'text',
						'instructions'      => 'Enter the school type, such as "Public", "Private Non-Profit", or "Private For-Profit". Displayed in the School Details sidebar of the ranking card.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 100,
						'placeholder'       => 'e.g. Public',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Score
				// The calculated composite score used to determine ranking position.
				// Higher scores rank better. Exact formula depends on methodology version.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_ranking_score',
						'label'             => 'Score',
						'name'              => 'ranking_score',
						'aria-label'        => 'Enter the calculated composite ranking score for this school',
						'type'              => 'text',
						'instructions'      => 'Enter the calculated composite score for this school (e.g. "87.4"). This score determines the order schools appear in the rankings list. The exact calculation depends on the methodology version used.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 20,
						'placeholder'       => 'e.g. 87.4',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),
		),

		// -------------------------------------------------------------------------
		// Location Rules
		// Show this field group only on the 'school_rankings' custom post type.
		// -------------------------------------------------------------------------
		'location'              => array(
				array(
						array(
								'param'    => 'post_type',
								'operator' => '==',
								'value'    => 'school_rankings',
						),
				),
		),

		// -------------------------------------------------------------------------
		// Display Options
		// -------------------------------------------------------------------------
		'menu_order'            => 1,
		'position'              => 'normal',
		'style'                 => 'default',
		'label_placement'       => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen'        => '',
		'active'                => true,
		'show_in_rest'          => 0,
) );
