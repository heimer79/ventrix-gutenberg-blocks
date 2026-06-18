<?php
/**
 * Desktop table source citation.
 *
 * Expects: $source_link, $source_label (set by table-footer.php).
 */

if (empty($source_link) && empty($source_label)) {
    return;
}
?>
<p class="table-source">
    <strong>Source:</strong>
    <?php if (!empty($source_link) && !empty($source_label)) : ?>
        <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($source_label); ?></a>
    <?php elseif (!empty($source_label)) : ?>
        <?php echo esc_html($source_label); ?>
    <?php else : ?>
        <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($source_link); ?></a>
    <?php endif; ?>
</p>
