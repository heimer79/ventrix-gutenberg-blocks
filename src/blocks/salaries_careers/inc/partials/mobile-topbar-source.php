<?php
/**
 * Mobile topbar source link or plain text.
 *
 * Expects: $source_link, $source_text, $mobile_source_text, $mobile_template.
 */

$mobile_source_label = cafeto_get_mobile_source_label(
    $source_text ?? '',
    $mobile_source_text ?? '',
    $mobile_template ?? ''
);

if (empty($source_link) && $mobile_source_label === '') {
    return;
}
?>
<p class="cafeto-mobile-source">
    <?php if (!empty($source_link)) : ?>
        <?php
        $link_label = $mobile_source_label !== '' ? $mobile_source_label : $source_link;
        ?>
        <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($link_label); ?></a>
    <?php else : ?>
        <?php echo esc_html($mobile_source_label); ?>
    <?php endif; ?>
</p>
