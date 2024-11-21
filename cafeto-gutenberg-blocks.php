<?php

/**
 * Plugin Name:       Ventrix Gutenberg Blocks
 * Description:       Gutenberg blocks created by Ventrix Team.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.9.0
 * Author:            Ventrix Team
 * Author URI:        https://ventrixadvertising.com/
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

                // Load block.json file
                $block_json_file = $block_path . '/block.json';
                $block_data = [];
                if (file_exists($block_json_file)) {
                    $block_json = file_get_contents($block_json_file);
                    $block_data = json_decode($block_json, true);
                }

                // Register the block with attributes and render callback if available
                register_block_type($block_path, array(
                    'render_callback' => $render_callback,
                    'attributes' => isset($block_data['attributes']) ? $block_data['attributes'] : [],
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