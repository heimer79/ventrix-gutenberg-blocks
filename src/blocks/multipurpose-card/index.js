/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

// Import edit and save components
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
    
    attributes: {
        borderColor: {
            type: 'string',
            default: '#E3DBFF', // Default is #E3DBFF color
        },
        backgroundColor: {
            type: 'string',
            default: '#F8F7FF', // Default is #F8F7FF color
        },
        paddingInline: {
            type: 'string',
            default: '50px', // Default inline padding
        },
        paddingBlock: {
            type: 'string',
            default: '40px', // Default block padding
        },
        borderRadiusTopLeft: {
            type: 'string',
            default: '30px', // Default border-radius for top-left
        },
        borderRadiusTopRight: {
            type: 'string',
            default: '30px', // Default border-radius for top-right
        },
        borderRadiusBottomLeft: {
            type: 'string',
            default: '30px', // Default border-radius for bottom-left
        },
        borderRadiusBottomRight: {
            type: 'string',
            default: '30px', // Default border-radius for bottom-right
        },
        showViewMoreButton: { 
            type: 'boolean', default: false 
        },
        minHeight: { 
            type: 'string', default: '' 
        },
    },
    supports: {
        className: true, // Enables the "Additional CSS Classes" field
    },
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	save: Save,
} );