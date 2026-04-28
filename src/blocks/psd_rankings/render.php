<?php
/**
 * DFG Rankings - Render Dispatcher
 *
 * This file acts as a dispatcher for the dgf_rankings block.
 * It loads partial render files from the inc/ directory and calls
 * the appropriate render function based on the 'blockDesign' ACF field
 * set on the current page.
 *
 * Available designs:
 *  - rankings_2025        → inc/rankings-2025.php
 *  - rankings_spring_2026 → inc/rankings-spring-2026.php
 */

require_once 'methodology-texts.php';
require_once 'inc/rankings-2025.php';
require_once 'inc/rankings-spring-2026.php';

/**
 * Security check: Verify that ACF is active and functions exist.
 */
if ( ! function_exists( 'get_field' ) ) {
		if ( ! function_exists( 'render_cafeto_psd_rankings_block' ) ) {
				function render_cafeto_psd_rankings_block( $attributes ) {
						return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
								<strong>Error:</strong> Advanced Custom Fields (ACF) plugin is required for this block to function properly.
								Please install and activate ACF plugin.
						</div>';
				}
		}
		return;
}

/**
 * Security check: Verify WordPress core functions exist.
 */
if ( ! function_exists( 'wp_cache_get' ) || ! function_exists( 'wp_cache_set' ) ||
		! function_exists( 'get_the_ID' ) || ! function_exists( 'get_the_title' ) ||
		! function_exists( 'get_the_content' ) || ! function_exists( 'wp_reset_postdata' ) ||
		! function_exists( 'get_post_field' ) || ! function_exists( 'esc_attr' ) ||
		! function_exists( 'esc_url' ) || ! function_exists( 'esc_html' ) ||
		! function_exists( 'esc_html_e' ) || ! function_exists( 'wp_kses_post' ) ||
		! function_exists( 'wp_is_mobile' ) || ! function_exists( 'htmlspecialchars_decode' ) ) {

		if ( ! function_exists( 'render_cafeto_psd_rankings_block' ) ) {
				function render_cafeto_psd_rankings_block( $attributes ) {
						return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
								<strong>Error:</strong> Required WordPress functions are not available.
								This may indicate a WordPress installation issue.
						</div>';
				}
		}
		return;
}

/**
 * Security check: Verify WP_Query class exists.
 */
if ( ! class_exists( 'WP_Query' ) ) {
		if ( ! function_exists( 'render_cafeto_psd_rankings_block' ) ) {
				function render_cafeto_psd_rankings_block( $attributes ) {
						return '<div class="error-message" style="background: #f8d7da; color: #721c24; padding: 15px; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">
								<strong>Error:</strong> WordPress query functionality is not available.
								This may indicate a WordPress installation issue.
						</div>';
				}
		}
		return;
}

/**
 * Renders the custom Gutenberg block for PSD rankings.
 *
 * Reads the 'block_design' ACF field from the current page to determine
 * which partial to render. Falls back to the Gutenberg 'blockDesign' attribute
 * if ACF is unavailable, and ultimately defaults to 'rankings_2025' for full
 * backward compatibility with existing blocks.
 *
 * @param array $attributes The block attributes.
 * @return string The block HTML content.
 */
function render_cafeto_psd_rankings_block( $attributes ) {
		// Get the current post ID.
		$post_ID = get_the_ID();

		ob_start();

		if ( ! function_exists( 'get_field' ) ) {
				// ACF unavailable — fall back to the Gutenberg block attribute.
				$block_design = isset( $attributes['blockDesign'] ) ? $attributes['blockDesign'] : 'rankings_2025';

				// Call the appropriate render function based on block design.
				vtx_determine_psd_block_render( $block_design, $attributes, $post_ID );
		} else {
				// Read the design from the ACF field on the current page.
				// Falls back to the Gutenberg attribute, then to 'rankings_2025'.
				$block_design = get_field( 'block_design', $post_ID )
						?: ( isset( $attributes['blockDesign'] ) ? $attributes['blockDesign'] : 'rankings_2025' );

				// Call the appropriate render function based on block design.
				vtx_determine_psd_block_render( $block_design, $attributes, $post_ID );
		}

		return ob_get_clean();
}

/**
 * Determines and calls the appropriate render function based on block design.
 *
 * @param string $block_design The design key (e.g. 'rankings_2025', 'rankings_spring_2026').
 * @param array  $attributes   The block attributes passed from Gutenberg.
 * @param int    $post_ID      The current post/page ID.
 */
function vtx_determine_psd_block_render( $block_design, $attributes, $post_ID ) {
		switch ( $block_design ) {
				case 'rankings_spring_2026':
						return psd_render_block_rankings_spring_2026( $attributes, $post_ID, $block_design );

				case 'rankings_2025':
				default:
						return psd_render_block_rankings_2025( $attributes );
		}
}

/**
 * Determines the appropriate CSS class name based on the block design.
 *
 * Used by partials to apply a design-specific modifier class to the
 * root wrapper element of the ranking block.
 *
 * @param string $block_design The design key.
 * @return string The corresponding CSS class name.
 */
function vtx_determine_psd_class_name( $block_design ) {
		switch ( $block_design ) {
				case 'rankings_spring_2026':
						return 'rankings-spring-2026';

				case 'rankings_2025':
				default:
						return 'rankings-2025';
		}
}

/**
 * Determines the level year value string used in WP_Query arguments
 * for site-wide filtering of school rankings by academic level (2-year vs 4-year).
 *
 * @param string $default_level_year The level slug from the block attributes ('two-year' or 'four-year').
 * @return string The human-readable level year value used in the meta query.
 */
function psd_leveling_year_value( $default_level_year ) {
		$level_names = array(
				'two-year'  => '2-year Schools',
				'four-year' => '4-year Schools',
		);

		return isset( $level_names[ $default_level_year ] )
				? $level_names[ $default_level_year ]
				: '4-year Schools'; // Safe default.
}

/**
 * Renders the "About the Ranking" popup with the methodology text for a given version.
 *
 * Reads the `psd_ranking_methodology_options` repeater field registered on the
 * PSD Ranking Methodology options page (ranking-methodology.php). Each row in
 * the repeater corresponds to a methodology version (row 1 = version 1, etc.).
 *
 * @param int $version Methodology version number to display. Defaults to 1.
 * @return string HTML markup for the popup section.
 */
function dfg_render_methodology_popup_section( $version = 1 ) {
	// Ensure $version is a valid positive integer.
	$version = max( 1, (int) $version );

	// Guard: only call get_field() if ACF is active.
	// If ACF is deactivated, the popup renders with an empty state
	// instead of causing a fatal "Call to undefined function" error.
	if ( ! function_exists( 'get_field' ) ) {
		$methodology_rows = array();
	} else {
		// Fetch all rows of the methodology repeater from the ACF options page.
		$methodology_rows = get_field( 'psd_ranking_methodology_options', 'option' );
	}

	// Resolve the content for the requested version (1-indexed → 0-indexed).
	$methodology_content = '';
	if ( ! empty( $methodology_rows ) && isset( $methodology_rows[ $version - 1 ] ) ) {
		$row                 = $methodology_rows[ $version - 1 ];
		$methodology_content = isset( $row['psd_content_version'] ) ? $row['psd_content_version'] : '';
	}

	ob_start();
	?>
	<section class="rankings-popup">
		<div class="rankings-popup--widget hidden">
			<span class="rankings-popup--widget--close">X</span>
			<?php if ( ! empty( $methodology_content ) ) : ?>
				<div class="rankings-popup--widget--content">
					<?php echo wp_kses_post( $methodology_content ); ?>
				</div>
			<?php else : ?>
				<p><?php esc_html_e( 'Methodology information is not available.', 'psd' ); ?></p>
			<?php endif; ?>
		</div>
		<div class="rankings-popup--overlay hidden"></div>
	</section>
	<?php
	return ob_get_clean();
}
