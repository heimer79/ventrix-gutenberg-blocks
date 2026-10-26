<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Register ACF field group for Site Info.
 *
 * Registered as a local field group on `acf/include_fields`; ACF gives local
 * groups priority over database copies with the same key, so nothing is deleted
 * and no domain/host check is needed.
 */
function ventrix_register_site_info_acf_fields() {
	// Check if ACF is active
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group( array(
		'key' => 'group_67d9cc842b8c8',
		'title' => 'Site Info',
		'fields' => array(
			array(
				'key' => 'field_67d9cc84fa697',
				'label' => 'Select Current Site',
				'name' => 'select_current_site',
				'aria-label' => '',
				'type' => 'select',
				'instructions' => 'Select the current site to determine which content to display.',
				'required' => 1,
				'conditional_logic' => 0,
				'wrapper' => array(
					'width' => '',
					'class' => '',
					'id' => '',
				),
				'choices' => array(
					'edumed' => 'Edumed',
					'psd' => 'Public Service Degrees or Degrees for Good',
					'omd' => 'Online Masters Degrees',
					'phds' => 'PhDs Me',
					'oc' => 'Online Colleges',
				),
				'default_value' => 'edumed',
				'return_format' => 'value',
				'multiple' => 0,
				'allow_null' => 0,
				'allow_in_bindings' => 0,
				'ui' => 1,
				'ajax' => 0,
				'placeholder' => 'Select a site...',
				'allow_custom' => 0,
				'search_placeholder' => '',
				'create_options' => 0,
				'save_options' => 0,
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'options_page',
					'operator' => '==',
					'value' => 'theme-general-settings',
				),
			),
		),
		'menu_order' => 0,
		'position' => 'normal',
		'style' => 'default',
		'label_placement' => 'left',
		'instruction_placement' => 'label',
		'hide_on_screen' => '',
		'active' => true,
		'description' => 'Configure site-specific settings for the Ventrix Gutenberg Blocks plugin.',
		'show_in_rest' => 1,
		'acfe_display_title' => '',
		'acfe_autosync' => '',
		'acfe_form' => 0,
		'acfe_meta' => '',
		'acfe_note' => '',
	) );
}

// Hook to register ACF fields
add_action( 'acf/include_fields', 'ventrix_register_site_info_acf_fields' );

