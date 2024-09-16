/******/ (() => { // webpackBootstrap
/*!****************************************************!*\
  !*** ./src/blocks/accordion/accordion-frontend.js ***!
  \****************************************************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./accordion-frontend.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

jQuery(document).ready(function ($) {
  // Toggle accordion item when its title is clicked
  $('.accordion-title').click(function () {
    $(this).next('.accordion-content').slideToggle(); // Toggle content visibility
    $(this).toggleClass('active'); // Toggle active class on title
  });

  // Expand all accordion items when "Expand All" button is clicked
  $('.accordion__buttons-wrap #expand-all').click(function () {
    var $container = $(this).closest('.accordion-container');
    $container.find('.accordion-content').slideDown(); // Expand all accordion content
    $container.find('.accordion-title').addClass('active'); // Add active class to all titles
    $(this).addClass('active'); // Set expand button to active
    $container.find('#collapse-all').removeClass('active'); // Remove active class from collapse button
  });

  // Collapse all accordion items when "Collapse All" button is clicked
  $('.accordion__buttons-wrap #collapse-all').click(function () {
    var $container = $(this).closest('.accordion-container');
    $container.find('.accordion-content').slideUp(); // Collapse all accordion content
    $container.find('.accordion-title').removeClass('active'); // Remove active class from all titles
    $(this).addClass('active'); // Set collapse button to active
    $container.find('#expand-all').removeClass('active'); // Remove active class from expand button
  });

  // Open specific accordion item when external button is clicked
  $('.open-accordion-item').click(function () {
    var target = $(this).attr('xlink:href');
    if (target) {
      // Remove the leading '#' character from the target
      target = target.substring(1);
      openAccordionItemFromOutside(target);
    } else {
      console.error('xlink:href attribute is missing or incorrect');
    }
  });

  // Initialize accordion states on page load
  $('.accordion').each(function () {
    // Get all accordion items within the current accordion
    var $items = $(this).find('.accordion-item');

    // Set display:block for the first accordion-content and display:none for others
    $items.each(function (index) {
      var $content = $(this).find('.accordion-content');
      var $title = $(this).find('.accordion-title');
      if (index === 0) {
        $content.css('display', 'block'); // Show first accordion content
        $title.addClass('active'); // Set first title to active
      } else {
        $content.css('display', 'none'); // Hide other accordion content
      }
    });
  });
});

// Function to open specific accordion item from an external link/button
const openAccordionItemFromOutside = target => {
  var $targetAccordion = $('#' + target);

  // Close other accordion items
  $('.accordion-item').not($targetAccordion).find('.accordion-title').removeClass('active');
  $('.accordion-item').not($targetAccordion).find('.accordion-content').slideUp();
  // $('.accordion-item').not($targetAccordion).removeClass('is-open');

  // Open the target accordion item if not already open
  if (!$targetAccordion.find('.accordion-title').hasClass('active')) {
    $targetAccordion.find('.accordion-title').addClass('active');
    $targetAccordion.find('.accordion-content').slideDown();
  }
};
/******/ })()
;
//# sourceMappingURL=accordion-frontend.js.map