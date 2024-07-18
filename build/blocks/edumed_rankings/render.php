<?php

/**
 * Renders the custom Gutenberg block for Edumed rankings.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 *
 * @param array $attributes The block attributes.
 * @return string The block content.
 */
function render_cafeto_edumed_rankings_block($attributes) {
    // Extract attributes
    $post_type = isset($attributes['postType']) ? $attributes['postType'] : 'school_ranking';
    $program = isset($attributes['program']) ? $attributes['program'] : '';
    $default_open = isset($attributes['defaultOpen']) ? $attributes['defaultOpen'] : 0;
    $has_two_and_four_years = isset($attributes['hasTwoAndFourYears']) ? $attributes['hasTwoAndFourYears'] : 'no';
    $default_level_year = isset($attributes['defaultLevelYear']) ? $attributes['defaultLevelYear'] : 'four-year';
    $version = isset($attributes['version']) ? $attributes['version'] : '';
    $rankings_from_other_page = isset($attributes['rankingsFromOtherPage']) ? $attributes['rankingsFromOtherPage'] : false;
    $current_url = isset($attributes['currentUrl']) ? $attributes['currentUrl'] : '';

    // Fetch posts based on attributes
    $rankings_args = array(
        'post_type'           => $post_type,
        'post_status'         => 'publish',
        'orderby'             => 'menu_order',
        'order'               => 'ASC',
        'posts_per_page'      => -1,
        'tax_query'           => array(
            array(
                'taxonomy' => 'school_ranking_category',
                'field'    => 'term_id',
                'terms'    => $program,
            ),
        ),
    );

    $rankings_query = new WP_Query($rankings_args);

    $posts = array();

    if ($rankings_query->have_posts()) {
        while ($rankings_query->have_posts()) {
            $rankings_query->the_post();
            $posts[] = array(
                'title' => get_the_title(),
                'content' => get_the_content(),
            );
        }
    }

    wp_reset_postdata();

    // Render the block with the attributes and posts
    ob_start();
    ?>
    <div class="cafeto-edumed-rankings-block">
        <section class="rankings-top-bar">
            <div class="rankings-top-bar--years">
				<button><?php esc_html_e('2-year Schools', 'text-domain'); ?></button>
				<button><?php esc_html_e('4-year Schools', 'text-domain'); ?></button>
            </div>
            <button class="rankings-top-bar--about"><?php esc_html_e('About the Rankings', 'text-domain'); ?></button>
            <div class="rankings-top-bar--expand-collapse">
                <button><?php esc_html_e('Expand All', 'text-domain'); ?></button>
                <button><?php esc_html_e('Collapse All', 'text-domain'); ?></button>
            </div>
        </section>
        
        <section class="rankings-list">
            <?php if (!empty($posts)) : ?>
                <?php foreach ($posts as $post) : ?>
                    <div class="ranking-item">
                        <h3><?php echo esc_html($post['title']); ?></h3>
                        <div><?php echo wp_kses_post($post['content']); ?></div>
                    </div>
                <?php endforeach; ?>
            <?php else : ?>
                <p><?php esc_html_e('No rankings found.', 'text-domain'); ?></p>
            <?php endif; ?>
        </section>
    </div>
    <?php
    return ob_get_clean();
}
