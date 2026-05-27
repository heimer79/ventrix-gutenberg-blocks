<?php
/**
 * Table source block (mobile templates).
 *
 * Expects: $source_text, $source_link, $source_text_hyperlink, $total_entries.
 */

$has_source = !empty($source_text) || !empty($source_link) || !empty($source_text_hyperlink);

if (!$has_source) {
    return;
}
?>
<div class="source">
    <?php if (!empty($source_link)) : ?>
        <?php if (!empty($source_text_hyperlink)) : ?>
            <p class="table-source"><strong>Source:</strong> <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($source_text_hyperlink); ?></a><?php if (!empty($source_text)) : ?>, <?php echo esc_html($source_text); ?><?php endif; ?></p>
        <?php elseif (!empty($source_text)) : ?>
            <p class="table-source"><strong>Source:</strong> <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($source_text); ?></a></p>
        <?php else : ?>
            <p class="table-source"><strong>Source:</strong> <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($source_link); ?></a></p>
        <?php endif; ?>
    <?php elseif (!empty($source_text)) : ?>
        <p class="table-source"><strong>Source:</strong> <?php echo esc_html($source_text); ?></p>
    <?php endif; ?>

    <?php if (
        !empty($source_text)
        && stripos(trim($source_text), 'Bureau of Labor Statistics') === false
        && stripos(trim($source_text), 'Projections Central') === false
    ) : ?>
        <p class="table-source-italics">Data based on national numbers, not school-specific information.</p>
    <?php endif; ?>
</div>
