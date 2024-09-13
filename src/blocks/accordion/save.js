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
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';


import metadata from './block.json';
/**
 * The save function defines the way in which the different attributes should be combined
 * into the final markup, which is then serialized by the block editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
const Save = ({ attributes }) => {
    const { backgroundColor, textColor, padding } = attributes;
    const blockProps = useBlockProps.save({
        className: 'accordion',
        style: { backgroundColor, color: textColor, padding },
    });

    return (
        <div className="accordion-container">
            {/* Buttons to control all accordion items */}
            <div className="accordion__buttons-wrap">
                <button id="expand-all" type="button" className="accordion-control">
                    Expand All
                </button>
                <button id="collapse-all" type="button" className="accordion-control">
                    Collapse All
                </button>
            </div>

            {/* Accordion items */}
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default Save;
