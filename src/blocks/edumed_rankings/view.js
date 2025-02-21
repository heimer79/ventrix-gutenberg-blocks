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

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cafeto-edumed-rankings-block').forEach(function(block) {

        // Set variables
        const aboutButton = block.querySelector('.rankings-top-bar--about');
        const popup = block.querySelector('.rankings-popup--widget');
        const closeButton = block.querySelector('.rankings-popup--widget--close');
        const overlay = block.querySelector('.rankings-popup--overlay');
        const expandAllButton = block.querySelector('.expand-all');
        const collapseAllButton = block.querySelector('.collapse-all');

        // Add smooth scroll behavior with adjustment
        block.querySelectorAll('.rankings-top-bar--years a').forEach(function(anchor) {
            anchor.addEventListener('click', function(event) {
                if (!this.classList.contains('disabled')) {
                    event.preventDefault();
                    let targetId = this.getAttribute('href').substring(1);
                    let targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        let targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 150;
                        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    }
                }
            });
        });

        // Popup functionality
        if (aboutButton) {
            aboutButton.addEventListener('click', function() {
                popup.classList.remove('hidden');
                overlay.classList.remove('hidden');
            });
        }

        if (closeButton) {
            closeButton.addEventListener('click', function() {
                popup.classList.add('hidden');
                overlay.classList.add('hidden');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', function() {
                popup.classList.add('hidden');
                overlay.classList.add('hidden');
            });
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                popup.classList.add('hidden');
                overlay.classList.add('hidden');
            }
        });

        // Accordion Toggle Functionality
        block.querySelectorAll(".rankings-list__item-toggle-btn").forEach(function (button) {
            button.addEventListener("click", function () {
                let toggleContent = this.previousElementSibling;
                let rightSection = this.closest(".rankings-list__item").querySelector(".rankings-list__item-right");
                
                toggleContent.classList.toggle("expanded");
                this.classList.toggle("expanded");
                
                if (rightSection) {
                    rightSection.classList.toggle("collapsed", !toggleContent.classList.contains("expanded"));
                }

                this.textContent = toggleContent.classList.contains("expanded") ? "Less Details" : "More Details";
            });
        });

        // Expand/Collapse All functionality
        if (expandAllButton && collapseAllButton) {
            expandAllButton.classList.add('collapsed');
            collapseAllButton.classList.add('collapsed');

            expandAllButton.addEventListener('click', function () {
                block.querySelectorAll('.rankings-list--item .rankings-list--item--hidden').forEach(function (element) {
                    element.classList.remove('hidden');
                    const leftToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--left--button');
                    const rightToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--right--button');
                    if (leftToggleButton) leftToggleButton.classList.add('expanded');
                    if (rightToggleButton) rightToggleButton.classList.add('expanded');
                });

                block.querySelectorAll(".rankings-list__item-toggle").forEach(function (toggleContent) {
                    toggleContent.classList.add("expanded");
                });
                block.querySelectorAll(".rankings-list__item-toggle-btn").forEach(function (button) {
                    button.classList.add("expanded");
                    button.textContent = "Less Details";
                });
                block.querySelectorAll(".rankings-list__item-right").forEach(function (rightSection) {
                    rightSection.classList.remove("collapsed");
                });

                expandAllButton.classList.remove('collapsed');
                collapseAllButton.classList.add('collapsed');
            });

            collapseAllButton.addEventListener('click', function () {
                block.querySelectorAll('.rankings-list--item .rankings-list--item--hidden').forEach(function (element) {
                    element.classList.add('hidden');
                    const leftToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--left--button');
                    const rightToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--right--button');
                    if (leftToggleButton) leftToggleButton.classList.remove('expanded');
                    if (rightToggleButton) rightToggleButton.classList.remove('expanded');
                });

                block.querySelectorAll(".rankings-list__item-toggle").forEach(function (toggleContent) {
                    toggleContent.classList.remove("expanded");
                });
                block.querySelectorAll(".rankings-list__item-toggle-btn").forEach(function (button) {
                    button.classList.remove("expanded");
                    button.textContent = "More Details";
                });
                block.querySelectorAll(".rankings-list__item-right").forEach(function (rightSection) {
                    rightSection.classList.add("collapsed");
                });

                collapseAllButton.classList.remove('collapsed');
                expandAllButton.classList.add('collapsed');
            });
        }

    });
});