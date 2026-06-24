<?php
/**
 * Template: What the Experts Say
 *
 * Variables available from render.php:
 * @var string $card_type
 * @var string $user_name
 * @var string $user_link
 * @var string $user_image
 * @var string $testimonial
 * @var string $credentials
 * @var string $topic
 * @var string $current_site
 * @var string $class_string
 */
?>
<div class="<?php echo esc_attr($class_string); ?>">
    <div class="testimonial-card--<?php echo $current_site; ?>__content">

        <?php if ($topic): ?>
            <div class="testimonial-card--<?php echo $current_site; ?>__topic-tag">
                <h5><?php echo esc_html($topic); ?></h5>
            </div>
        <?php endif; ?>

        <blockquote class="testimonial-card--<?php echo $current_site; ?>__text">
            <?php echo wp_kses_post($testimonial); ?>
        </blockquote>

        <div class="testimonial-card--<?php echo $current_site; ?>__user">
            <a href="<?php echo esc_url($user_link); ?>" class="testimonial-card--<?php echo $current_site; ?>__user-name" target="_blank" rel="noopener noreferrer">
                <?php if ($credentials): ?>
                    <?php echo esc_html($user_name); ?>,
                    <span class="testimonial-card--<?php echo $current_site; ?>__user-credentials">
                        <?php echo esc_html($credentials); ?>
                    </span>
                <?php else: ?>
                    <?php echo esc_html($user_name); ?>
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
