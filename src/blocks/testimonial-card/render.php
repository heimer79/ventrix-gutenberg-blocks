<?php
/**
 * Render callback for testimonial-card block
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

// Include the site helper functions
require_once plugin_dir_path(__FILE__) . 'inc/site-helper.php';

/**
 * Render testimonial card block
 */
function render_cafeto_testimonial_card_block($attributes, $content, $block) {
    // Get attributes
    $card_type   = isset($attributes['cardType'])    ? $attributes['cardType']    : 'expert';
    $user_name   = isset($attributes['userName'])    ? $attributes['userName']    : '';
    $user_link   = isset($attributes['userLink'])    ? $attributes['userLink']    : '';
    $user_image  = isset($attributes['userImage'])   ? $attributes['userImage']   : '';
    $testimonial = isset($attributes['testimonial']) ? $attributes['testimonial'] : '';
    $credentials = isset($attributes['credentials']) ? $attributes['credentials'] : '';
    $topic       = isset($attributes['topic'])       ? $attributes['topic']       : '';

    // Get current site safely using helper function
    $current_site = ventrix_get_current_site();

    // Allowed templates — maps cardType value to its template file
    $allowed_templates = array(
        'expert'           => 'expert-insight',
        'student'          => 'student-tip',
        'what-experts-say' => 'what-experts-say',
    );

    // Fall back to 'expert' if an unknown cardType is received
    if (!array_key_exists($card_type, $allowed_templates)) {
        $card_type = 'expert';
    }

    $template_slug = $allowed_templates[$card_type];

    // Build CSS classes
    $classes = array(
        'testimonial-card',
        'testimonial-card__' . $card_type,
        'testimonial-card--' . $current_site,
    );

    $class_string = implode(' ', $classes);

    // Resolve template path
    $template_path = __DIR__ . '/inc/templates/' . $template_slug . '.php';

    // Safety check — fall back to expert-insight if the template file is missing
    if (!file_exists($template_path)) {
        $template_path = __DIR__ . '/inc/templates/expert-insight.php';
    }

    // Render via output buffering (same pattern as salaries_careers block)
    ob_start();
    include $template_path;
    return ob_get_clean();
}
