/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import metadata from './block.json';


const ALLOWED_BLOCKS = ['cafeto/accordion-item']; // Specify allowed child blocks

// set default items
const TEMPLATE_BLOCKS = [
	['cafeto/accordion-item'],
	['cafeto/accordion-item'],
	['cafeto/accordion-item']]; 


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
const Edit = ({ attributes, setAttributes }) => {

	const { backgroundColor, textColor, padding } = attributes;
    const blockProps = useBlockProps({
        className: 'accordion',
        style: { backgroundColor, color: textColor, padding },
    });
	
	return (
        <>
            <InspectorControls>
                <PanelBody title="Block Styling">
                    <PanelColorSettings
                        title="Color Settings"
                        colorSettings={[
                            {
                                label: 'Background Color',
                                value: backgroundColor,
                                onChange: (color) => setAttributes({ backgroundColor: color }),
                            },
                            {
                                label: 'Text Color',
                                value: textColor,
                                onChange: (color) => setAttributes({ textColor: color }),
                            },
                        ]}
                    />
                    <RangeControl
                        label="Padding"
                        value={parseInt(padding)}
                        onChange={(value) => setAttributes({ padding: `${value}px` })}
                        min={0}
                        max={100}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE_BLOCKS} renderAppender={InnerBlocks.ButtonBlockAppender}/>
            </div>
        </>
    );
}

export default Edit;
