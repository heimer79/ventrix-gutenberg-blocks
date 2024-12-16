
// /**
//  * Use this file for JavaScript code that you want to run in the front-end
//  * on posts/pages that contain this block.
//  *
//  * When this file is defined as the value of the `viewScript` property
//  * in `block.json` it will be enqueued on the front end of the site.
//  *
//  * Example:
//  *
//  * ```js
//  * {
//  *   "viewScript": "file:./view.js"
//  * }
//  * ```
//  *
//  * If you're not making any changes to this file because your project doesn't need any
//  * JavaScript running in the front-end, then you should delete this file and remove
//  * the `viewScript` property from `block.json`.
//  *
//  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
//  */

// /* eslint-disable no-console */
// console.log( 'Hello World! (from cafeto-cafeto-gutenberg-blocks block)' );
// /* eslint-enable no-console */

import { __ } from '@wordpress/i18n';

/**
 * Script to handle the "View More" functionality on mobile.
 */
const viewMore = () => {
    document.addEventListener('click', (event) => {
        // Check if the click is inside a .view-more-button or its children
        const button = event.target.closest('.view-more-button');
        if (button) {
            const card = button.closest('.ventrix-multipurpose-card-block');
            if (card) {
                const innerBlock = card.querySelector('.wp-block-inner');
                innerBlock.classList.toggle('expanded');

                // Toggle text and icon rotation
                const text = button.querySelector('.view-more-text');
                const icon = button.querySelector('.view-more-icon');

                if (innerBlock.classList.contains('expanded')) {
                    text.textContent = 'View Less';
                    icon.classList.add('rotate'); // Add the rotation class
                } else {
                    text.textContent = 'View More';
                    icon.classList.remove('rotate'); // Remove the rotation class
                }
            }
        }
    });
};

viewMore();
