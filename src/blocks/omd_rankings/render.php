<?php

/**
 * Render.
 */

// Requires
require_once 'inc/rankings-2026.php';
require_once 'inc/featured-rankings-2026.php';
require_once 'inc/rankings-2027.php';

/**
 * Renders the custom Gutenberg block for Edumed rankings.
 *
 * @param array $attributes The block attributes.
 * @return string The block content.
 */
function render_cafeto_omd_rankings_block($attributes)
{
  // Get the current post ID.
  $post_ID = get_the_ID();
  $block_design = 'ranking-2026';

  ob_start();

  if (function_exists('get_field')) {
    $block_design = get_field('ranking_page_block_design', $post_ID);

    if ($block_design == 'ranking-2026') {
      vtx_render_block_omd_rankings_2026(
        $attributes,
        $post_ID,
        $block_design
      );
    } elseif ($block_design == 'featured-rankings-2026') {
      vtx_render_block_omd_featured_rankings_2026(
        $attributes,
        $post_ID,
        $block_design
      );
    } elseif ($block_design == 'ranking-2027') {
      vtx_render_block_omd_rankings_2027(
        $attributes,
        $post_ID,
        $block_design
      );
    }
  }

  return ob_get_clean();
}

/**
 * Determines the appropriate class name based on the block design.
 *
 * @param string $block_design The design type of the block.
 * @return string The corresponding class name.
 */
function vtx_omd_determine_class_name($block_design)
{
  switch ($block_design) {
    case 'ranking-2026':
      return 'rankings-2026';
    case 'featured-rankings-2026':
      return 'featured-rankings-2026';
    case 'ranking-2027':
      return 'rankings-2027';
    default:
      return 'omd-rankings'; // Default class if none match
  }
}

/**
 * Resolves the methodology version configured on a ranking page.
 *
 * @param int $post_ID The ranking page ID.
 * @return int The version number, never lower than 1.
 */
function vtx_omd_get_page_methodology_version($post_ID)
{
  $version = function_exists('get_field')
    ? get_field('ranking_page_methodology_version', $post_ID)
    : '';

  // Before this field existed the version was typed into the old
  // "RankingMethodology popup" text field, so honour that value too.
  if ('' === $version || null === $version || false === $version) {
    $version = get_post_meta($post_ID, 'ranking_page_methodology_popup', true);
  }

  return max(1, (int) $version);
}

/**
 * Renders the popup section with methodology text.
 *
 * Reads the `ranking_methodology_options` repeater from the Rankings options
 * page, where row 1 is version 1, row 2 is version 2, and so on. A version
 * with no matching row falls back to the first one.
 *
 * @param int $methodology_version The methodology version to display.
 * @return string The HTML content of the popup section.
 */
function omd_render_popup_section($methodology_version = 1)
{
  $methodology_rows = function_exists('get_field')
    ? get_field('ranking_methodology_options', 'option')
    : array();

  if (!is_array($methodology_rows)) {
    $methodology_rows = array();
  }

  $index = max(1, (int) $methodology_version) - 1;

  if (!isset($methodology_rows[$index])) {
    $index = 0;
  }

  $methodology_content = isset($methodology_rows[$index]['content_version'])
    ? $methodology_rows[$index]['content_version']
    : '';

  ob_start();
?>
  <section class="rankings-popup">
    <div class="rankings-popup--widget rankings-popup--2024 hidden">
      <span class="rankings-popup--widget--close">X</span>
      <?php if ('' !== $methodology_content) : ?>
        <?php echo wp_kses_post($methodology_content); ?>
      <?php else : ?>
        <p><?php esc_html_e('Methodology information is not available.', 'vtx-omd'); ?></p>
      <?php endif; ?>
    </div>
    <div class="rankings-popup--overlay hidden"></div>
  </section>
<?php

  return ob_get_clean();
}
