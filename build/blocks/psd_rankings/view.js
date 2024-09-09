/******/ (() => { // webpackBootstrap
/*!*****************************************!*\
  !*** ./src/blocks/psd_rankings/view.js ***!
  \*****************************************/
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
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.cafeto-psd-rankings-block').forEach(function (block) {
    // Set variables
    const hasYears = block.getAttribute('data-has-years');
    const defaultLevelYear = block.getAttribute('data-level-year');
    const twoYearButton = block.querySelector('.two-year-button');
    const fourYearButton = block.querySelector('.four-year-button');
    const aboutButton = block.querySelector('.rankings-top-bar--about');
    const popup = block.querySelector('.rankings-popup--widget');
    const closeButton = block.querySelector('.rankings-popup--widget--close');
    const overlay = block.querySelector('.rankings-popup--overlay');
    const expandAllButton = block.querySelector('.expand-all');
    const collapseAllButton = block.querySelector('.collapse-all');

    // Get defaultOpen from the data attribute
    const defaultOpen = parseInt(block.getAttribute('data-default-open')) || 3;

    // 2 year 4 year buttons
    if (hasYears === 'yes') {
      if (defaultLevelYear === 'two-year') {
        twoYearButton.classList.add('active');
      } else if (defaultLevelYear === 'four-year') {
        fourYearButton.classList.add('active');
      }
    } else {
      if (defaultLevelYear === 'two-year') {
        fourYearButton.classList.add('disabled');
        fourYearButton.setAttribute('data-tooltip', 'No 4-year Schools for this program');
        twoYearButton.classList.add('active');
      } else if (defaultLevelYear === 'four-year') {
        twoYearButton.classList.add('disabled');
        twoYearButton.setAttribute('data-tooltip', 'No 2-year Schools for this program');
        fourYearButton.classList.add('active');
      }
    }

    // // Add smooth scroll behavior with adjustment
    block.querySelectorAll('.rankings-top-bar--years a').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        if (!this.classList.contains('disabled')) {
          event.preventDefault();
          let targetId = this.getAttribute('href').substring(1);
          let targetElement = document.getElementById(targetId);
          if (targetElement) {
            let targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 150;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Popup functionality
    if (aboutButton) {
      aboutButton.addEventListener('click', function () {
        popup.classList.remove('hidden');
        overlay.classList.remove('hidden');
      });
    }
    if (closeButton) {
      closeButton.addEventListener('click', function () {
        popup.classList.add('hidden');
        overlay.classList.add('hidden');
      });
    }
    if (overlay) {
      overlay.addEventListener('click', function () {
        popup.classList.add('hidden');
        overlay.classList.add('hidden');
      });
    }
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        popup.classList.add('hidden');
        overlay.classList.add('hidden');
      }
    });

    // Accordion functionality
    block.querySelectorAll('.rankings-list--item').forEach(function (item, index) {
      var content = item.querySelector('.rankings-list--item--hidden');
      var leftToggleButton = item.querySelector('.rankings-list--item--heading--left--button');
      var rightToggleButton = item.querySelector('.rankings-list--item--heading--right--button');
      if (content) {
        item.addEventListener('click', function () {
          content.classList.toggle('hidden');
          if (content.classList.contains('hidden')) {
            if (leftToggleButton) leftToggleButton.classList.remove('expanded');
            if (rightToggleButton) rightToggleButton.classList.remove('expanded');
          } else {
            if (leftToggleButton) leftToggleButton.classList.add('expanded');
            if (rightToggleButton) rightToggleButton.classList.add('expanded');
          }
        });

        // Expand the first `defaultOpen` items
        if (index < defaultOpen) {
          content.classList.remove('hidden');
          if (leftToggleButton) leftToggleButton.classList.add('expanded');
          if (rightToggleButton) rightToggleButton.classList.add('expanded');
        }
      }
    });

    // Expand/Collapse All functionality
    if (expandAllButton) {
      expandAllButton.addEventListener('click', function () {
        block.querySelectorAll('.rankings-list--item .rankings-list--item--hidden').forEach(function (element) {
          element.classList.remove('hidden');
          const leftToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--left--button');
          const rightToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--right--button');
          if (leftToggleButton) leftToggleButton.classList.add('expanded');
          if (rightToggleButton) rightToggleButton.classList.add('expanded');
        });
      });
    }
    if (collapseAllButton) {
      collapseAllButton.addEventListener('click', function () {
        block.querySelectorAll('.rankings-list--item .rankings-list--item--hidden').forEach(function (element) {
          element.classList.add('hidden');
          const leftToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--left--button');
          const rightToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--right--button');
          if (leftToggleButton) leftToggleButton.classList.remove('expanded');
          if (rightToggleButton) rightToggleButton.classList.remove('expanded');
        });
      });
    }
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map