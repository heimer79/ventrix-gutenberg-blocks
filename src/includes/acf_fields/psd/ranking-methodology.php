<?php
/**
 * ACF Fields: PSD Ranking Methodology
 *
 * Registers a repeater field group for the Ranking Methodology Options Page.
 * Each row in the repeater holds a WYSIWYG block of methodology copy keyed
 * to a specific version, allowing editors to manage multiple methodology texts
 * without touching code.
 *
 * Field group key : group_psd_ranking_methodology
 * Location        : Options Page → 'ranking-methodology-settings'
 *
 * @package VentrixGutenbergBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Prevent direct file access.
}

if ( function_exists( 'acf_add_local_field_group' ) ) {

	acf_add_local_field_group( array(
		'key'                   => 'group_psd_ranking_methodology',
		'title'                 => 'PSD Ranking Methodology',
		'fields'                => array(

			// ── Methodology Repeater ─────────────────────────────────────────────
			array(
				'key'               => 'field_psd_methodology_repeater_options',
				'label'             => 'Methodology Versions',
				'name'              => 'psd_ranking_methodology_options',
				'aria-label'        => 'Manage PSD ranking methodology content versions',
				'type'              => 'repeater',
				'instructions'      => 'Add one row per methodology version. Each row contains the full methodology text for a specific ranking edition. The order of rows determines which text is loaded by version number (row 1 = version 1, row 2 = version 2, etc.).',
				'required'          => 0,
				'conditional_logic' => 0,
				'layout'            => 'block',
				'min'               => 1,
				'button_label'      => 'Add Methodology Version',
				'sub_fields'        => array(

					// Content (WYSIWYG)
					array(
						'key'          => 'field_psd_methodology_content_version',
						'label'        => 'Methodology Content',
						'name'         => 'psd_content_version',
						'aria-label'   => 'Enter the full methodology text for this ranking version',
						'type'         => 'wysiwyg',
						'instructions' => 'Enter the complete methodology description for this ranking version. This text will appear inside the "About the Ranking" popup on the front end. Use headings, lists, and bold text as needed.',
						'required'     => 0,
						'tabs'         => 'all',
						'toolbar'      => 'full',
						'media_upload' => 0,
					),

				),
			),
		),

		// ── Location ─────────────────────────────────────────────────────────────
		'location'              => array(
			array(
				array(
					'param'    => 'options_page',
					'operator' => '==',
					'value'    => 'ranking-methodology-settings',
				),
			),
		),

		// ── Display Settings ─────────────────────────────────────────────────────
		'menu_order'            => 0,
		'position'              => 'normal',
		'style'                 => 'default',
		'label_placement'       => 'top',
		'instruction_placement' => 'label',
		'active'                => true,
		'description'           => 'Manages the methodology popup content shown on PSD ranking pages. Add a new row for each ranking edition.',
		'show_in_rest'          => 0,
	) );

}
