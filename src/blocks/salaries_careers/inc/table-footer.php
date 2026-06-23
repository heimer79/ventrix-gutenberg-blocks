<?php
/**
 * Combined table footer: source, entry info, disclaimer, and pagination controls.
 *
 * Expects: $source_text, $source_link, $source_text_hyperlink, $desktop_template,
 *          $total_entries, $entries_per_page.
 */

$is_career_desktop_template = !empty($desktop_template) && strpos($desktop_template, 'career-') === 0;
$source_label = $is_career_desktop_template
    ? trim((string) ($source_text ?? ''))
    : trim((string) ($source_text_hyperlink ?? ''));

$has_source = !empty($source_link) || $source_label !== '';
$show_pagination = $total_entries > $entries_per_page;
$show_disclaimer = $source_label === ''
    || (
        stripos($source_label, 'Bureau of Labor Statistics') === false
        && stripos($source_label, 'Projections Central') === false
    );

if (!$has_source && !$show_pagination && !$show_disclaimer) {
    return;
}
?>
<div class="ventrix-pagination">
    <div class="ventrix-pagination__left">
        <?php if ($has_source) : ?>
            <?php include __DIR__ . '/table-source.php'; ?>
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
