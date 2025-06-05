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
 
// Popup functionality
function initializePopup(block) {
    const aboutButton = block.querySelector('.rankings-top-bar--about');
    const popup = block.querySelector('.rankings-popup--widget');
    const closeButton = block.querySelector('.rankings-popup--widget--close');
    const overlay = block.querySelector('.rankings-popup--overlay');

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
}

// Accordion functionality
function initializeAccordion(block) {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    block.querySelectorAll(".rankings-list__left-toggle-btn").forEach(function (button) {
        const item = button.closest(".rankings-list__item");
        const toggleContent = button.previousElementSibling;
        const rightSection = item.querySelector(".rankings-list__right");

        button.addEventListener("click", function () {
            if (isMobile) {
                if (item) {
                    item.classList.toggle("collapsed");
                // Update max-height when toggling
                if (item.classList.contains("collapsed")) {
                    const height = item.style.getPropertyValue('--collapsed-max-height');
                    item.style.maxHeight = height;
                } else {
                    item.style.maxHeight = '';
                }
            }
                this.classList.toggle("expanded");
        } else {
                toggleContent.classList.toggle("expanded");
                this.classList.toggle("expanded");
                
                if (rightSection) {
                    rightSection.classList.toggle("collapsed", !toggleContent.classList.contains("expanded"));
                }

                if (item) {
                    item.classList.toggle("collapsed", !toggleContent.classList.contains("expanded"));
                }
    
                this.textContent = toggleContent.classList.contains("expanded") ? "Less" : "More";
            }
        });
    });
}

// Expand/Collapse All functionality
function initializeExpandCollapse(block) {
    const expandAllButton = block.querySelector('.expand-all');
    const collapseAllButton = block.querySelector('.collapse-all');
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (!expandAllButton || !collapseAllButton) return;

            expandAllButton.addEventListener('click', function () {
        expandAllItems(block, isMobile);
        updateButtonStates(expandAllButton, collapseAllButton, true);
    });

    collapseAllButton.addEventListener('click', function () {
        collapseAllItems(block, isMobile);
        updateButtonStates(expandAllButton, collapseAllButton, false);
    });
}

function expandAllItems(block, isMobile) {
    block.querySelectorAll('.rankings-list__item .rankings-list__item--hidden').forEach(function (element) {
        element.classList.remove('hidden');
    });

    if (isMobile) {
        block.querySelectorAll(".rankings-list__left-toggle-btn").forEach(function (button) {
            button.classList.add("expanded");
            const item = button.closest(".rankings-list__item");
            if (item) {
                item.classList.remove("collapsed");
                item.style.maxHeight = ''; // Remove max-height when expanding
            }
        });
    } else {
        block.querySelectorAll(".rankings-list__left-toggle").forEach(function (toggleContent) {
            toggleContent.classList.add("expanded");
        });

        block.querySelectorAll(".rankings-list__left-toggle-btn").forEach(function (button) {
            button.classList.add("expanded");
            button.textContent = "Less";
        });

        block.querySelectorAll(".rankings-list__right").forEach(function (rightSection) {
            rightSection.classList.remove("collapsed");
        });
    }

    block.querySelectorAll(".rankings-list__item").forEach(function (item) {
        item.classList.remove("collapsed");
        if (isMobile) {
            item.style.maxHeight = ''; // Remove max-height when expanding
        }
    });
}

function collapseAllItems(block, isMobile) {
    block.querySelectorAll('.rankings-list__item .rankings-list__item--hidden').forEach(function (element) {
        element.classList.add('hidden');
    });

    if (isMobile) {
        block.querySelectorAll(".rankings-list__left-toggle-btn").forEach(function (button) {
            button.classList.remove("expanded");
            const item = button.closest(".rankings-list__item");
            if (item) {
                item.classList.add("collapsed");
                const height = item.style.getPropertyValue('--collapsed-max-height');
                item.style.maxHeight = height; // Set max-height when collapsing
            }
        });
    } else {
        block.querySelectorAll(".rankings-list__left-toggle").forEach(function (toggleContent) {
            toggleContent.classList.remove("expanded");
        });

        block.querySelectorAll(".rankings-list__left-toggle-btn").forEach(function (button) {
            button.classList.remove("expanded");
            button.textContent = "More";
        });

        block.querySelectorAll(".rankings-list__right").forEach(function (rightSection) {
            rightSection.classList.add("collapsed");
        });
    }

    block.querySelectorAll(".rankings-list__item").forEach(function (item) {
        item.classList.add("collapsed");
        if (isMobile) {
            const height = item.style.getPropertyValue('--collapsed-max-height');
            item.style.maxHeight = height; // Set max-height when collapsing
        }
    });
}

function updateButtonStates(expandButton, collapseButton, isExpanded) {
    if (isExpanded) {
        expandButton.classList.remove('inactive');
        expandButton.classList.add('active');
        collapseButton.classList.add('inactive');
        collapseButton.classList.remove('active');
    } else {
        collapseButton.classList.remove('inactive');
        collapseButton.classList.add('active');
        expandButton.classList.add('inactive');
        expandButton.classList.remove('active');
    }
}

// Height adjustment functionality
    function adjustCollapsedHeights(block) {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const buffer = isMobile ? 60 : 120; // 60px for mobile, 120px for desktop

        block.querySelectorAll('.rankings-list__item').forEach(function (item) {
            const highlightsHeading = item.querySelector('.rankings-list__left-toggle h5');

            if (highlightsHeading) {
                const itemTop = item.getBoundingClientRect().top;
                const headingTop = highlightsHeading.getBoundingClientRect().top;
                const visibleHeight = headingTop - itemTop;
                const finalHeight = visibleHeight + buffer;

            // Always set the CSS custom property for reference
                item.style.setProperty('--collapsed-max-height', `${finalHeight}px`);
            
            // Only set max-height if the item is collapsed
                if (item.classList.contains('collapsed')) {
                    item.style.maxHeight = `${finalHeight}px`;
            } else {
                item.style.maxHeight = ''; // Remove max-height when expanded
                }
            }
        });
    }

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cafeto-rankings-block').forEach(function(block) {
        // Initialize all functionalities
        initializePopup(block);
        initializeAccordion(block);
        initializeExpandCollapse(block);
        
        // Run initial height adjustment
        adjustCollapsedHeights(block);

        // Update heights on resize
        window.addEventListener('resize', () => adjustCollapsedHeights(block));
    });
});