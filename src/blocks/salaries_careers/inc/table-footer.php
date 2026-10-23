<?php
/**
 * Desktop table footer: source and disclaimer.
 * Long tables scroll inside the table, so this footer has no page controls.
 *
 * Expects: $source_text, $source_link, $source_text_hyperlink, $desktop_template.
 */

$is_career_desktop_template = !empty($desktop_template) && strpos($desktop_template, 'career-') === 0;
$source_label = $is_career_desktop_template
    ? trim((string) ($source_text ?? ''))
    : trim((string) ($source_text_hyperlink ?? ''));

$has_source = !empty($source_link) || $source_label !== '';
$show_disclaimer = $source_label === ''
    || (
        stripos($source_label, 'Bureau of Labor Statistics') === false
        && stripos($source_label, 'Projections Central') === false
    );

if (!$has_source && !$show_disclaimer) {
    return;
}
?>
<div class="ventrix-pagination">
    <div class="ventrix-pagination__left">
        <?php if ($has_source) : ?>
            <?php include __DIR__ . '/table-source.php'; ?>
        <?php endif; ?>

        <?php if ($show_disclaimer) : ?>
            <p class="ventrix-pagination-info">
                Data does not reflect school-specific information.
            </p>
        <?php endif; ?>
    </div>
</div>
