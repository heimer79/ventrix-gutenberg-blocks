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
    $card_type = isset($attributes['cardType']) ? $attributes['cardType'] : 'expert';
    $user_name = isset($attributes['userName']) ? $attributes['userName'] : '';
    $user_link = isset($attributes['userLink']) ? $attributes['userLink'] : '';
    $user_image = isset($attributes['userImage']) ? $attributes['userImage'] : '';
    $testimonial = isset($attributes['testimonial']) ? $attributes['testimonial'] : '';
    $credentials = isset($attributes['credentials']) ? $attributes['credentials'] : '';
    
    // Get current site safely using helper function
    $current_site = ventrix_get_current_site();
    
    // Build CSS classes
    $classes = array(
        'testimonial-card',
        'testimonial-card__' . $card_type,
        'testimonial-card--' . $current_site
    );
    
    $class_string = implode(' ', $classes);
    
    // Build the HTML
    ob_start();
    ?>
    <div class="<?php echo esc_attr($class_string); ?>">
        <div class="testimonial-card--<?php echo $current_site; ?>__content">
            <div class="testimonial-card--<?php echo $current_site; ?>__header">
                <h5 class="testimonial-card--<?php echo $current_site; ?>__type">
                    <?php echo $card_type === 'expert' ? 'Expert Insight' : 'Student Tip'; ?>
                </h5>
            </div>
            <blockquote class="testimonial-card--<?php echo $current_site; ?>__text">
                <?php echo wp_kses_post($testimonial); ?>
            </blockquote>
            <div class="testimonial-card--<?php echo $current_site; ?>__user">
                <a href="<?php echo esc_url($user_link); ?>" class="testimonial-card__user-name">
                    <?php echo esc_html($user_name); ?>
                    <?php if ($credentials): ?>
                        <span class="testimonial-card--<?php echo $current_site; ?>__user-credentials">
                            <?php echo esc_html($credentials); ?>
                        </span>
                    <?php endif; ?>
                </a>
                
                <?php if ($user_image): ?>
                    <img
                        class="testimonial-card--<?php echo $current_site; ?>__image"
                        src="<?php echo esc_url($user_image); ?>"
                        alt="<?php echo esc_attr($user_name); ?>"
                    />
                <?php endif; ?>
            </div>
        </div>
    </div>
    <?php
    
    return ob_get_clean();
}
