<?php
/**
 * PSD Rankings - Spring 2026 Render
 *
 * Partial template for the "Rankings Spring 2026" design.
 * This file will contain the rendering logic for the Spring 2026 version of the PSD rankings block.
 */

/**
 * Renders the PSD Rankings block using the Spring 2026 design.
 *
 * @param array $attributes The block attributes.
 * @return string The block HTML content.
 */
function psd_render_block_rankings_spring_2026( $attributes ) {
    $post_type              = isset( $attributes['postType'] ) ? $attributes['postType'] : 'school_rankings';
    $program                = isset( $attributes['program'] ) ? $attributes['program'] : '';
    $has_two_and_four_years = isset( $attributes['hasTwoAndFourYears'] ) ? $attributes['hasTwoAndFourYears'] : '';
    $default_level_year     = isset( $attributes['defaultLevelYear'] ) ? $attributes['defaultLevelYear'] : '';
    $level_year_value       = ( $default_level_year === 'two-year' ) ? '2-year Schools' : '4-year Schools';
    $version                = isset( $attributes['version'] ) ? $attributes['version'] : '';

    // Reuse the shared data-fetching function from rankings-2025.php
    $posts = psd_get_rankings_data( $post_type, $level_year_value, $version, $program );

    if ( ! is_array( $posts ) ) {
        $posts = array();
    }

    $rankings_count = count( $posts );
    $query_success  = ! empty( $posts );
    $default_open   = $rankings_count >= 6 ? 3 : $rankings_count;
    $level_year_id  = $default_level_year === 'two-year' ? 'two-year-rankings' : 'four-year-rankings';

    ob_start();
    ?>
    <span id="rankings-<?php echo esc_attr( $default_level_year ); ?>"></span>
    <div class="cafeto-rankings-block cafeto-rankings-block--spring-2026"
        data-query-status="<?php echo esc_attr( $query_success ? 'success' : 'error' ); ?>"
        data-level-year="<?php echo esc_attr( $default_level_year ); ?>"
        data-has-years="<?php echo esc_attr( $has_two_and_four_years ); ?>"
        data-default-open="<?php echo esc_attr( $default_open ); ?>"
        id="<?php echo esc_attr( $level_year_id ); ?>"
    >

        <!-- TODO: Implement Spring 2026 layout -->
        <?php if ( $query_success ) : ?>
            <?php foreach ( $posts as $post ) : ?>
                <p><?php echo esc_html( $post['title'] ); ?></p>
            <?php endforeach; ?>
        <?php else : ?>
            <p><?php esc_html_e( 'No rankings found.', 'text-domain' ); ?></p>
        <?php endif; ?>

    </div>
    <?php

    return ob_get_clean();
}
