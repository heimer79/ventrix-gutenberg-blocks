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

// Helper function for slide animations
const slideToggle = (element, duration = 300) => {
    if (element.style.display === 'none' || !element.style.display) {
        slideDown(element, duration);
    } else {
        slideUp(element, duration);
    }
};

const slideDown = (element, duration = 300) => {
    element.style.display = 'block';
    const height = element.scrollHeight;
    element.style.height = '0px';
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms ease`;
    
    setTimeout(() => {
        element.style.height = height + 'px';
    }, 10);
    
    setTimeout(() => {
        element.style.height = '';
        element.style.overflow = '';
        element.style.transition = '';
    }, duration);
};

const slideUp = (element, duration = 300) => {
    const height = element.scrollHeight;
    element.style.height = height + 'px';
    element.style.overflow = 'hidden';
    element.style.transition = `height ${duration}ms ease`;
    
    setTimeout(() => {
        element.style.height = '0px';
    }, 10);
    
    setTimeout(() => {
        element.style.display = 'none';
        element.style.height = '';
        element.style.overflow = '';
        element.style.transition = '';
    }, duration);
};

document.addEventListener('DOMContentLoaded', function () {
    // Toggle accordion item when its title is clicked
    const accordionTitles = document.querySelectorAll('.accordion-title');
    accordionTitles.forEach(title => {
        title.addEventListener('click', function () {
            const content = this.nextElementSibling;
            if (content && content.classList.contains('accordion-content')) {
                slideToggle(content); // Toggle content visibility
                this.classList.toggle('active'); // Toggle active class on title
            }
        });
    });

    // Expand all accordion items when "Expand All" button is clicked
    const expandButtons = document.querySelectorAll('.accordion__buttons-wrap #expand-all');
    expandButtons.forEach(button => {
        button.addEventListener('click', function () {
            const container = this.closest('.accordion-container');
            if (container) {
                const contents = container.querySelectorAll('.accordion-content');
                const titles = container.querySelectorAll('.accordion-title');
                const collapseButton = container.querySelector('#collapse-all');
                
                contents.forEach(content => slideDown(content)); // Expand all accordion content
                titles.forEach(title => title.classList.add('active')); // Add active class to all titles
                this.classList.add('active'); // Set expand button to active
                if (collapseButton) {
                    collapseButton.classList.remove('active'); // Remove active class from collapse button
                }
            }
        });
    });

    // Collapse all accordion items when "Collapse All" button is clicked
    const collapseButtons = document.querySelectorAll('.accordion__buttons-wrap #collapse-all');
    collapseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const container = this.closest('.accordion-container');
            if (container) {
                const contents = container.querySelectorAll('.accordion-content');
                const titles = container.querySelectorAll('.accordion-title');
                const expandButton = container.querySelector('#expand-all');
                
                contents.forEach(content => slideUp(content)); // Collapse all accordion content
                titles.forEach(title => title.classList.remove('active')); // Remove active class from all titles
                this.classList.add('active'); // Set collapse button to active
                if (expandButton) {
                    expandButton.classList.remove('active'); // Remove active class from expand button
                }
            }
        });
    });

    // Open specific accordion item when external button is clicked
    const openButtons = document.querySelectorAll('.open-accordion-item');
    openButtons.forEach(button => {
        button.addEventListener('click', function () {
            const target = this.getAttribute('xlink:href');
            if (target) {
                // Remove the leading '#' character from the target
                const targetId = target.substring(1);
                openAccordionItemFromOutside(targetId);
            } else {
                console.error('xlink:href attribute is missing or incorrect');
            }
        });
    });

    // Initialize accordion states on page load
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        // Get all accordion items within the current accordion
        const items = accordion.querySelectorAll('.accordion-item');

        // Set display:block for the first accordion-content and display:none for others
        items.forEach((item, index) => {
            const content = item.querySelector('.accordion-content');
            const title = item.querySelector('.accordion-title');

            if (content && title) {
                if (index === 0) {
                    content.style.display = 'block'; // Show first accordion content
                    title.classList.add('active'); // Set first title to active
                } else {
                    content.style.display = 'none'; // Hide other accordion content
                }
            }
        });
    });
});

// Function to open specific accordion item from an external link/button
const openAccordionItemFromOutside = (target) => {
    const targetAccordion = document.getElementById(target);
    
    if (!targetAccordion) return;

    // Close other accordion items
    const allAccordionItems = document.querySelectorAll('.accordion-item');
    allAccordionItems.forEach(item => {
        if (item !== targetAccordion) {
            const title = item.querySelector('.accordion-title');
            const content = item.querySelector('.accordion-content');
            
            if (title) title.classList.remove('active');
            if (content) slideUp(content);
        }
    });

    // Open the target accordion item if not already open
    const targetTitle = targetAccordion.querySelector('.accordion-title');
    const targetContent = targetAccordion.querySelector('.accordion-content');
    
    if (targetTitle && targetContent && !targetTitle.classList.contains('active')) {
        targetTitle.classList.add('active');
        slideDown(targetContent);
    }
};

