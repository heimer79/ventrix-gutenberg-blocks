<?php

/**
 * ACF Fields: PSD Rankings Spring 2026 — School Data Fields.
 *
 * Registers a local ACF field group for the Spring 2026 ranking design.
 * These fields store detailed school data points used by the
 * inc/rankings-spring-2026.php partial to build each ranking card.
 *
 * This group appears on the 'school_rankings' custom post type.
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
		// Field Group: PSD Rankings Spring 2026
		// Uses a unique 'psd_s26_' prefix to prevent key collisions with other
		// field groups registered across sites in this plugin.
		// -------------------------------------------------------------------------
		'key'                   => 'group_psd_rankings_spring_2026',
		'title'                 => 'PSD Rankings Spring 2026',
		'description'           => 'Data fields specific to the Spring 2026 ranking design. These values populate the ranking card for each school in the new layout.',
		'fields'                => array(

				// =====================================================================
				// SECTION: Enrollment & Scores
				// Core quantitative data points used in the Spring 2026 scoring model.
				// =====================================================================

				// ---------------------------------------------------------------------
				// Field: PMASTR / PTOTAL
				// Percentage of graduate students who are masters-level. Used as a
				// weight in the scoring formula.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_pmastr_ptotal',
						'label'             => 'PMASTR / PTOTAL',
						'name'              => 'rp_pmastr_ptotal',
						'aria-label'        => 'Enter the PMASTR/PTOTAL ratio for this school',
						'type'              => 'text',
						'instructions'      => 'Enter the PMASTR/PTOTAL value — the ratio of master\'s-level graduate students to total graduate enrollment. Used as a weighting factor in the Spring 2026 scoring model. Format: decimal (e.g. 0.82).',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 20,
						'placeholder'       => 'e.g. 0.82',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Non-White Enrollment
				// Percentage of enrolled students who identify as non-white. Used as
				// a diversity metric in the Spring 2026 scoring model.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_non_white_enrollment',
						'label'             => 'Non-White Enrollment',
						'name'              => 'rp_non_white_enrollment',
						'aria-label'        => 'Enter the percentage of non-white enrolled students',
						'type'              => 'text',
						'instructions'      => 'Enter the percentage of enrolled students who identify as non-white. Used as a diversity metric in the Spring 2026 scoring formula. Format: percentage without the % symbol (e.g. 45.3).',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 10,
						'placeholder'       => 'e.g. 45.3',
						'prepend'           => '',
						'append'            => '%',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Graduate Enrollment
				// Total number of graduate-level students enrolled. Used to
				// contextualize PMASTR/PTOTAL and other graduate metrics.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_graduate_enrollment',
						'label'             => 'Graduate Enrollment',
						'name'              => 'rp_graduate_enrollment',
						'aria-label'        => 'Enter the total number of graduate students enrolled',
						'type'              => 'text',
						'instructions'      => 'Enter the total number of graduate-level students enrolled at this school. Used to contextualize other graduate-level metrics. Format: whole number (e.g. 2100).',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 20,
						'placeholder'       => 'e.g. 2100',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Graduation Rate
				// The overall graduation rate for this school. Used as a quality
				// indicator in the Spring 2026 scoring model.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_graduation_rate',
						'label'             => 'Graduation Rate',
						'name'              => 'rp_graduation_rate',
						'aria-label'        => 'Enter the overall graduation rate as a percentage',
						'type'              => 'text',
						'instructions'      => 'Enter the overall graduation rate for this school as a percentage. Used as a quality indicator in the Spring 2026 scoring formula. Format: percentage without the % symbol (e.g. 68).',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 10,
						'placeholder'       => 'e.g. 68',
						'prepend'           => '',
						'append'            => '%',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Students with Disabilities
				// Percentage of enrolled students who receive accommodations for a
				// disability. Used as an accessibility/inclusivity metric.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_students_with_disabilities',
						'label'             => 'Students w/ Disabilities',
						'name'              => 'rp_students_with_disabilities',
						'aria-label'        => 'Enter the percentage of students with disabilities',
						'type'              => 'text',
						'instructions'      => 'Enter the percentage of enrolled students who receive accommodations for a disability. Used as an accessibility and inclusivity metric in the Spring 2026 ranking. Format: percentage without the % symbol (e.g. 12.4).',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 10,
						'placeholder'       => 'e.g. 12.4',
						'prepend'           => '',
						'append'            => '%',
						'allow_in_bindings' => 0,
				),

				// =====================================================================
				// SECTION: Services
				// Indicates which student support services the school provides.
				// =====================================================================

				// ---------------------------------------------------------------------
				// Field: Employment Services
				// Whether the school provides career placement / employment services
				// to its students. Shown as a badge or checkmark in the ranking card.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_employment_services',
						'label'             => 'Employment Services',
						'name'              => 'rp_employment_services',
						'aria-label'        => 'Select whether this school offers employment placement services',
						'type'              => 'text',
						'instructions'      => 'Enter whether this school offers career placement or employment services (e.g. "Yes", "No", "Partial", "Via 3rd party"). Displayed in the Services section of the Spring 2026 ranking card.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 100,
						'placeholder'       => 'e.g. Yes',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Academic / Career Counseling
				// Whether the school provides combined academic and career counseling
				// services. Separate from standalone Academic or Career Services.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_academic_career_counseling',
						'label'             => 'Academic/Career Counseling',
						'name'              => 'rp_academic_career_counseling',
						'aria-label'        => 'Select whether this school offers academic and career counseling',
						'type'              => 'text',
						'instructions'      => 'Enter whether this school provides combined academic and career counseling services (e.g. "Yes", "No", "Partial"). This is distinct from standalone Academic Services or Career Services. Displayed as a service badge in the ranking card.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 100,
						'placeholder'       => 'e.g. Yes',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Academic / Career Services
				// Whether the school provides general academic support or career
				// services (not necessarily combined counseling).
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_academic_career_services',
						'label'             => 'Academic/Career Services',
						'name'              => 'rp_academic_career_services',
						'aria-label'        => 'Select whether this school offers academic or career support services',
						'type'              => 'text',
						'instructions'      => 'Enter whether this school provides general academic support or career services such as tutoring, workshops, or resume help (e.g. "Yes", "No", "Tutoring only"). Displayed as a service badge in the Spring 2026 ranking card.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 100,
						'placeholder'       => 'e.g. Yes',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// =====================================================================
				// SECTION: Financial Data
				// Cost and aid metrics displayed in the School Details panel.
				// =====================================================================

				// ---------------------------------------------------------------------
				// Field: Net Price
				// The average annual cost after grants and scholarships are applied.
				// Represents what a typical student actually pays.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_net_price',
						'label'             => 'Net Price',
						'name'              => 'rp_net_price',
						'aria-label'        => 'Enter the average annual net price after financial aid',
						'type'              => 'text',
						'instructions'      => 'Enter the average annual net price after grants and scholarships are applied — this is what a typical student actually pays. Format: dollar amount without $ or commas (e.g. 14500). Displayed in the School Details panel.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 20,
						'placeholder'       => 'e.g. 14500',
						'prepend'           => '$',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Average Tuition
				// The published average annual tuition before financial aid is applied.
				// Used for comparison alongside Net Price.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_avg_tuition',
						'label'             => 'Avg. Tuition',
						'name'              => 'rp_avg_tuition',
						'aria-label'        => 'Enter the average annual tuition before financial aid',
						'type'              => 'text',
						'instructions'      => 'Enter the published average annual tuition (before financial aid is applied). Used alongside Net Price for cost comparisons in the ranking card. Format: dollar amount without $ or commas (e.g. 21000).',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 20,
						'placeholder'       => 'e.g. 21000',
						'prepend'           => '$',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Alternative Tuition Plans
				// Indicates whether the school offers alternative payment structures
				// (e.g. per-credit pricing, income-share, competency-based pricing).
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_alt_tuition_plans',
						'label'             => 'Alt. Tuition Plans',
						'name'              => 'rp_alt_tuition_plans',
						'aria-label'        => 'Select whether this school offers alternative tuition payment plans',
						'type'              => 'text',
						'instructions'      => 'Enter whether this school offers alternative tuition structures such as per-credit pricing, income-share agreements, or competency-based pricing (e.g. "Yes", "Per-credit", "No"). Displayed in the financial section of the ranking card.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '33.33',
						),
						'default_value'     => '',
						'maxlength'         => 100,
						'placeholder'       => 'e.g. Yes',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Pell Grant Recipients
				// Percentage of enrolled students who receive federal Pell Grants.
				// Indicates the proportion of lower-income students served.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_pell_grant_recipients',
						'label'             => 'Pell Grant Recipients',
						'name'              => 'rp_pell_grant_recipients',
						'aria-label'        => 'Enter the percentage of students receiving Pell Grants',
						'type'              => 'text',
						'instructions'      => 'Enter the percentage of enrolled students who receive federal Pell Grants. This metric indicates the proportion of lower-income students served. Format: percentage without the % symbol (e.g. 38).',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '50',
						),
						'default_value'     => '',
						'maxlength'         => 10,
						'placeholder'       => 'e.g. 38',
						'prepend'           => '',
						'append'            => '%',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Institutional Aid Recipients
				// Percentage of students who receive institutional (school-funded)
				// grant aid. A key affordability indicator.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_inst_aid_recipients',
						'label'             => 'Inst. Aid Recipients',
						'name'              => 'rp_inst_aid_recipients',
						'aria-label'        => 'Enter the percentage of students receiving institutional grant aid',
						'type'              => 'text',
						'instructions'      => 'Enter the percentage of students who receive institutional (school-funded) grant aid. This is a key affordability indicator used in the Spring 2026 ranking card. Format: percentage without the % symbol (e.g. 55).',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '50',
						),
						'default_value'     => '',
						'maxlength'         => 10,
						'placeholder'       => 'e.g. 55',
						'prepend'           => '',
						'append'            => '%',
						'allow_in_bindings' => 0,
				),

				// =====================================================================
				// SECTION: Editorial Highlights (Blurbs)
				// Short editorial bullet points written by the editorial team.
				// These appear in the "Program Highlights" section of the ranking card.
				// =====================================================================

				// ---------------------------------------------------------------------
				// Field: Blurb 1
				// First editorial highlight for this school's ranking card.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_blurb_1',
						'label'             => 'Blurb 1',
						'name'              => 'rp_blurb_1',
						'aria-label'        => 'Enter the first editorial highlight for this school',
						'type'              => 'text',
						'instructions'      => 'Enter the first editorial highlight bullet point for this school. Appears in the "Program Highlights" section of the Spring 2026 ranking card. Keep it concise — ideally under 120 characters.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '100',
						),
						'default_value'     => '',
						'maxlength'         => 300,
						'placeholder'       => 'e.g. Ranked #1 for online nursing programs three years in a row.',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Blurb 2
				// Second editorial highlight for this school's ranking card.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_blurb_2',
						'label'             => 'Blurb 2',
						'name'              => 'rp_blurb_2',
						'aria-label'        => 'Enter the second editorial highlight for this school',
						'type'              => 'text',
						'instructions'      => 'Enter the second editorial highlight bullet point for this school. Appears in the "Program Highlights" section below Blurb 1. Keep it concise — ideally under 120 characters.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '100',
						),
						'default_value'     => '',
						'maxlength'         => 300,
						'placeholder'       => 'e.g. Offers NCLEX pass rates above 95% for graduating students.',
						'prepend'           => '',
						'append'            => '',
						'allow_in_bindings' => 0,
				),

				// ---------------------------------------------------------------------
				// Field: Blurb 3
				// Third editorial highlight for this school's ranking card.
				// ---------------------------------------------------------------------
				array(
						'key'               => 'field_psd_rp26_blurb_3',
						'label'             => 'Blurb 3',
						'name'              => 'rp_blurb_3',
						'aria-label'        => 'Enter the third editorial highlight for this school',
						'type'              => 'text',
						'instructions'      => 'Enter the third and final editorial highlight bullet point for this school. Appears in the "Program Highlights" section below Blurb 2. Keep it concise — ideally under 120 characters.',
						'required'          => 0,
						'conditional_logic' => 0,
						'wrapper'           => array(
								'width' => '100',
						),
						'default_value'     => '',
						'maxlength'         => 300,
						'placeholder'       => 'e.g. Provides 24/7 online tutoring and career services for distance learners.',
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
		// Hide standard WP fields irrelevant to school ranking data entry.
		// -------------------------------------------------------------------------
		'menu_order'            => 2,
		'position'              => 'normal',
		'style'                 => 'default',
		'label_placement'       => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen'        => '',
		'active'                => true,
		'show_in_rest'          => 0,
) );