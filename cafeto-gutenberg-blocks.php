<?php

/**
 * Plugin Name:       Cafeto Gutenberg Blocks
 * Description:       Block for displaying the school rankings on Edumed
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Cafeto Team
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
function cafeto_gutenberg_blocks_init() {
	$blocks_directory = __DIR__ . '/build/blocks';
	$blocks = scandir($blocks_directory);

	foreach ($blocks as $block) {
		if ($block !== '.' && $block !== '..') {
			$block_path = $blocks_directory . '/' . $block;
			if (is_dir($block_path)) {
				// Verificar si el bloque tiene un archivo de renderizado PHP
				$render_callback = null;
				$render_file = __DIR__ . "/build/blocks/{$block}/render.php";

				if (file_exists($render_file)) {
					require_once $render_file;
					$render_callback = "render_cafeto_{$block}_block";
				}

				// Registrar el bloque
				register_block_type($block_path, array(
					'render_callback' => $render_callback
				));
			}
		}
	}
}
add_action('init', 'cafeto_gutenberg_blocks_init');
