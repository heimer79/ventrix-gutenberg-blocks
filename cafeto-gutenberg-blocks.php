<?php

/**
 * Plugin Name:       Cafeto Gutenberg Blocks
 * Description:       Gutenberg blocks created by Cafeto Team.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Cafeto Team
 * Author URI:        https://cafeto.co/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       cafeto-gutenberg-blocks
 * Domain Path:       cafeto
 *
 * @package Cafeto
 */

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

/**
 * Initializes the Cafeto Gutenberg Blocks plugin.
 */
function cafeto_gutenberg_blocks_init() {
	$blocks_directory = __DIR__ . '/build/blocks';
	$blocks = scandir($blocks_directory);

	foreach ($blocks as $block) {
		if ($block !== '.' && $block !== '..') {
			$block_path = $blocks_directory . '/' . $block;
			if (is_dir($block_path)) {
				// Check if the block has a PHP render file
				$render_callback = null;
				$render_file = __DIR__ . "/build/blocks/{$block}/render.php";

				if (file_exists($render_file)) {
					require_once $render_file;
					$render_callback = "render_cafeto_{$block}_block";
				}

				// Register the block with attributes and render callback if available
				register_block_type($block_path, array(
					'render_callback' => $render_callback,
					'attributes' => array(
						'postType' => array(
							'type' => 'string',
							'default' => 'school_ranking',
						),
						'program' => array(
							'type' => 'string',
						),
						'defaultOpen' => array(
							'type' => 'number',
							'default' => 5,
						),
						'hasTwoAndFourYears' => array(
							'type' => 'string',
							'default' => '',
						),
						'defaultLevelYear' => array(
							'type' => 'string',
						),
						'version' => array(
							'type' => 'string',
							'default' => '',
						),
						'rankingsFromOtherPage' => array(
							'type' => 'boolean',
						),
						'currentUrl' => array(
							'type' => 'string',
						),
						'rankings' => array(
							'type' => 'array',
							'default' => array(),
						),
					),
				));
			}
		}
	}
}
add_action('init', 'cafeto_gutenberg_blocks_init');

/**
 * Registers the Cafeto block category.
 *
 * @param array $categories The existing block categories.
 * @return array The modified block categories.
 */
function cafeto_register_block_categories($categories) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'cafeto-category',
				'title' => __('Cafeto Blocks', 'cafeto'),
				'icon'  => 'coffee', // You can use any Dashicons icon
			),
		)
	);
}

add_filter('block_categories_all', 'cafeto_register_block_categories', 10, 2);

/**
 * Registers the REST API endpoint for school rankings.
 */
function cafeto_register_rest_routes() {
    register_rest_route('cafeto/v1', '/school-rankings', array(
        'methods' => 'GET',
        'callback' => 'get_school_rankings',
    ));
}
add_action('rest_api_init', 'cafeto_register_rest_routes');

function get_school_rankings() {
    $rankings_args = array(
        'post_type'           => 'school_ranking',
        'post_status'         => 'publish',
        'orderby'             => 'menu_order',
        'order'               => 'ASC',
        'posts_per_page'      => -1,
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

    return rest_ensure_response($posts);
}
