<?php
/**
 * PSD Rankings - Render Dispatcher
 *
 * This file acts as a dispatcher for the psd_rankings block.
 * It loads partial render files from the inc/ directory and calls
 * the appropriate render function based on the 'blockDesign' attribute.
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
 * Dispatches to the appropriate partial based on the 'blockDesign' attribute.
 *
 * @param array $attributes The block attributes.
 * @return string The block HTML content.
 */
if ( ! function_exists( 'render_cafeto_psd_rankings_block' ) ) {
    function render_cafeto_psd_rankings_block( $attributes ) {
        // Default to 'rankings_2025' for full backward compatibility with existing blocks.
        $block_design = isset( $attributes['blockDesign'] ) && ! empty( $attributes['blockDesign'] )
            ? $attributes['blockDesign']
            : 'rankings_2025';

        switch ( $block_design ) {
            case 'rankings_spring_2026':
                return psd_render_block_rankings_spring_2026( $attributes );

            case 'rankings_2025':
            default:
                return psd_render_block_rankings_2025( $attributes );
        }
    }
}