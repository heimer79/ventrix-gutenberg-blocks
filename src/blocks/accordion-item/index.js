/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

// Define the block's attributes
const attributes = {
    isOpen: {
        type: 'boolean',
        default: true,
    },
    headingText: {
        type: 'string',
        default: '',
    },
    headingLink: {
        type: 'string',
        default: '',
    },
    headingLevel: {
        type: 'string',
        default: 'h3',
    },

    numberPrefix: {
        type: 'string',
        default: '',
    },

    amountSuffix: {
        type: 'string',
        default: '',
    },
};

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
    parent: ['cafeto/accordion'], // Specify that this block is a child of the accordion block
    attributes,
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: Save,
} );
