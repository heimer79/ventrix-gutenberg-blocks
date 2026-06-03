<?php
/**
 * Combined table footer: source, entry info, disclaimer, and pagination controls.
 *
 * Expects: $source_text, $source_link, $source_text_hyperlink, $total_entries.
 */

$has_source = !empty($source_text) || !empty($source_link) || !empty($source_text_hyperlink);
$show_pagination = $total_entries > 10;
$show_disclaimer = empty($source_text)
    || (
        stripos(trim($source_text), 'Bureau of Labor Statistics') === false
        && stripos(trim($source_text), 'Projections Central') === false
    );

if (!$has_source && !$show_pagination && !$show_disclaimer) {
    return;
}
?>
<div class="ventrix-pagination">
    <div class="ventrix-pagination__left">
        <?php if ($has_source) : ?>
            <?php if (!empty($source_link)) : ?>
                <?php if (!empty($source_text_hyperlink)) : ?>
                    <p class="table-source"><strong>Source:</strong> <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($source_text_hyperlink); ?></a><?php if (!empty($source_text)) : ?>, <?php echo esc_html($source_text); ?><?php endif; ?></p>
                <?php elseif (!empty($source_text)) : ?>
                    <p class="table-source"><strong>Source:</strong> <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($source_text); ?></a></p>
                <?php else : ?>
                    <p class="table-source"><strong>Source:</strong> <a href="<?php echo esc_url($source_link); ?>" target="_blank" rel="noreferrer noopener"><?php echo esc_html($source_link); ?></a></p>
                <?php endif; ?>
            <?php elseif (!empty($source_text_hyperlink)) : ?>
                <p class="table-source"><strong>Source:</strong> <?php echo esc_html($source_text_hyperlink); ?><?php if (!empty($source_text)) : ?>, <?php echo esc_html($source_text); ?><?php endif; ?></p>
            <?php elseif (!empty($source_text)) : ?>
                <p class="table-source"><strong>Source:</strong> <?php echo esc_html($source_text); ?></p>
            <?php endif; ?>
        <?php endif; ?>

        <?php if ($show_pagination || $show_disclaimer) : ?>
            <p class="ventrix-pagination-info">
                <?php if ($show_pagination) : ?>
                    Showing <span class="cafeto-showing-start">1</span> - <span class="cafeto-showing-end">10</span> of <span class="cafeto-total-entries"><?php echo esc_html($total_entries); ?></span> entries
                <?php endif; ?>
                <?php if ($show_disclaimer) : ?>
                    <?php if ($show_pagination) : ?> | <?php endif; ?>
                    Data reflects national numbers, not school-specific information.
                <?php endif; ?>
            </p>
        <?php endif; ?>
    </div>

    <?php if ($show_pagination) : ?>
        <div class="ventrix-pagination__actions">
            <div class="cafeto-pagination__buttons">
                <button type="button" class="cafeto-prev-page">Previous</button>
                <button type="button" class="cafeto-next-page">Next</button>
            </div>
        </div>
    <?php endif; ?>
</div>
