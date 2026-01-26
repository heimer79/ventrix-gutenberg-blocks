<?php

/**
 * Render.
 */

// Requires
require_once 'inc/rankings-working-professionals.php';
require_once 'inc/rankings-geo.php';

/**
 * Renders the custom Gutenberg block for PhDs rankings.
 *
 * @param array $attributes The block attributes.
 * @return string The block content.
 */
function render_cafeto_phds_rankings_block($attributes)
{
  // Get the current post ID.
  $post_ID = get_the_ID();
  $block_design = 'ranking-2026';

  ob_start();

  if (function_exists('get_field')) {
    $block_design = get_field('ranking_page_block_design', $post_ID);

    if ($block_design == 'ranking-working-professionals') {

      // Call the appropriate render function based on block design.
      vtx_render_block_phds_rankings_working_professionals(
        $attributes,
        $post_ID,
        $block_design
      );
    } elseif ($block_design == 'ranking-geo') {

      // Call the appropriate render function based on block design.
      vtx_render_block_phds_rankings_geo(
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
function vtx_phds_determine_class_name($block_design)
{
  switch ($block_design) {
    case 'ranking-working-professionals':
      return 'rankings-working-professionals';
    case 'ranking-geo':
      return 'rankings-geo';
    case 'ranking-2026':
      return 'rankings-2026';
    default:
      return 'phds-rankings'; // Default class if none match
  }
}

/**
 * Renders the popup section with methodology text.
 *
 * @param array $posts The posts data.
 * @return string The HTML content of the popup section.
 */
function phds_render_popup_section($page_popup, $posts, $methodology_option = false)
{
  $first_post = null;
  $methodology_text_option = '';

  if (empty($posts) || !is_array($posts)) {
    return ''; // Return empty string or handle error as needed
  }

  ob_start();
?>
  <section class="rankings-popup">
    <div class="rankings-popup--widget rankings-popup--2024 hidden">
      <span class="rankings-popup--widget--close">X</span>
      <?php

      // Safely access the first post and its ACF fields
      $first_post = $posts;

      if ($page_popup && $methodology_option) {
        // Ensure 'acf_fields' exists and is an array.
        $methodology_options = get_field('rankings_text_2024', 'option');

        // Get the methodology text version from the first post's ACF fields.
        $methodology_text_option = isset($first_post['acf_fields']['ranking_methodology_version']) ? $first_post['acf_fields']['ranking_methodology_version'] : '1';

        // Convert to integer and adjust for zero-based index.
        $option = (int)$methodology_text_option - 1;

        echo $methodology_options ?? '';
      } else {

        // Ensure 'acf_fields' exists and is an array
        $methodology_text_option = isset($first_post['acf_fields']['methodology_text_option']) ? $first_post['acf_fields']['methodology_text_option'] : '1';

        // Render the methodology text based on the option.
        echo edumed_get_methodology_text($methodology_text_option);
      }
      ?>
    </div>
    <div class="rankings-popup--overlay hidden"></div>
  </section>
<?php

  return ob_get_clean();
}
