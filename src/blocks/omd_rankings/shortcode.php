<?php
/**
 * Shortcode for rendering the OMD Rankings block outside Gutenberg.
 *
 * This shortcode allows you to reuse the Gutenberg block functionality
 * on classic pages, PHP templates, or any other non-Gutenberg context.
 *
 * Usage example:
 * [omd_rankings version="2026" design="ranking-2026"]
 */

add_shortcode('omd_rankings', function ($atts) {

  // Define default shortcode attributes.
  $atts = shortcode_atts(array(
    'version' => '2026',
    'design'  => 'ranking-2026',
  ), $atts, 'omd_rankings');

  // Build the same attributes array used by the Gutenberg block.
  $attributes = array(
    'version'     => $atts['version'],
    'blockDesign' => $atts['design'],
  );

  // Get the current post ID.
  $post_ID = get_the_ID();

  // Load the same file used by the block renderer to keep logic consistent.
  $inc_path = plugin_dir_path(__FILE__) . 'inc/rankings-2026.php';
  if (file_exists($inc_path)) {
    require_once $inc_path;
  }

  // Enqueue the same CSS and JS assets that the block uses.
  // Adjust paths if necessary depending on your plugin folder structure.
  $plugin_url = plugin_dir_url(__FILE__);

  wp_enqueue_style(
    'ventrix-omd-rankings-style',
    $plugin_url . 'style-index.css',
    array(),
    '1.0'
  );

  wp_enqueue_script(
    'ventrix-omd-rankings-view',
    $plugin_url . 'view.js',
    array(),
    '1.0',
    true
  );

  // Start output buffering.
  ob_start();

  // Call the same render function used in the Gutenberg block.
  if (function_exists('vtx_render_block_omd_rankings_2026')) {
    vtx_render_block_omd_rankings_2026(
      $attributes,
      $post_ID,
      $atts['design']
    );
  } else {
    echo '<p class="error-message">OMD Rankings render function not found.</p>';
  }

  // Return the buffered output.
  return ob_get_clean();
});