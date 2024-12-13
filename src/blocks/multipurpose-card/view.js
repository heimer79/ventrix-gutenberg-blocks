
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
// document.addEventListener('DOMContentLoaded', () => {
//     const blocks = document.querySelectorAll('.ventrix-multipurpose-card-block.has-view-more');

//     blocks.forEach((block) => {
//         const button = block.querySelector('.view-more-button');
//         if (button) {
//             button.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 block.style.height = 'auto'; // Expand block
//                 button.style.display = 'none'; // Hide button after expanding
//             });
//         }
//     });
// });
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

/**
 * Script to handle the "View More" functionality on mobile.
 */
const viewMore = () => {
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('view-more-button')) {
            const card = event.target.closest('.ventrix-multipurpose-card-block');
            if (card) {
                card.querySelector('.wp-block-inner').classList.toggle('expanded');
            }
        }
    });
};

viewMore();
