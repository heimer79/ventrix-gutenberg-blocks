<?php

/**
 * Register ACF field group for Site Info
 * This function ensures the field group always overwrites existing ones in the database
 */
function ventrix_register_site_info_acf_fields() {
	// Check if ACF is active
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	// Check if the field 'select_current_site' already exists and remove its group to ensure overwrite
	if ( function_exists( 'acf_get_field' ) && function_exists( 'acf_delete_field_group' ) ) {
		$field = acf_get_field( 'select_current_site' );
		if ( $field && ! empty( $field['parent'] ) ) {
			acf_delete_field_group( $field['parent'] );
		}
	}

    // Validate if the actual site contains any of the allowed sites: 'edumed' 'onlinemastersdegrees' 'publicservicedegrees' 'phds' 'oc'
    $current_domain = $_SERVER['HTTP_HOST'] ?? '';
    $allowed_sites = array( 'edumed', 'onlinemastersdegrees', 'publicservicedegrees', 'phds', 'onlinecolleges' );
    
    // Check if current domain contains any of the allowed site words
    $is_valid_domain = false;
    foreach ( $allowed_sites as $site ) {
        if ( strpos( $current_domain, $site ) !== false ) {
            $is_valid_domain = true;
            break;
        }
    }
    
    // Only register ACF field group if domain is valid
    if ( ! $is_valid_domain ) {
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
					'psd' => 'Public Service Degrees',
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

