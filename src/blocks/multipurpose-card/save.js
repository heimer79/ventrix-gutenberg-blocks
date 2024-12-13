import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './style.scss';

/**
 * The save function handles how the block's content is saved to the database.
 * 
 * @param {Object} props - The block properties.
 * @param {Object} props.attributes - Attributes of the block.
 * 
 * @returns {JSX.Element} - The block's saved HTML structure.
 */
const Save = ({ attributes }) => {
    const {
        baseColor,
        borderColor,
        backgroundColor,
        paddingInline,
        paddingBlock,
        borderRadiusTopLeft,
        borderRadiusTopRight,
        borderRadiusBottomLeft,
        borderRadiusBottomRight,
        showViewMoreButton,
        maxHeight
    } = attributes;

    // Generate block props with dynamic background color
    const blockProps = useBlockProps.save({
        className: `ventrix-multipurpose-card-block ${
            showViewMoreButton ? 'has-view-more' : ''
        }`,
        style: {
            borderColor: borderColor || undefined,
            backgroundColor: backgroundColor || undefined,
            paddingInline: paddingInline || undefined,
            paddingBlock: paddingBlock || undefined,
            borderTopLeftRadius: borderRadiusTopLeft || undefined,
            borderTopRightRadius: borderRadiusTopRight || undefined,
            borderBottomLeftRadius: borderRadiusBottomLeft || undefined,
            borderBottomRightRadius: borderRadiusBottomRight || undefined,
            '--max-height': showViewMoreButton && maxHeight ? maxHeight : undefined, // Apply max-height if it's mobile and the attribute has a value
            '--base-color': baseColor ? baseColor : undefined, // Apply base-color if it's attribute has a value
        },
    });

    return (
        <div {...blockProps}>
            {showViewMoreButton ? (
                <div className="wp-block-inner">
                    <InnerBlocks.Content />
                </div>
            ) : (
                <InnerBlocks.Content />
            )}
            {showViewMoreButton && (
                <a className="view-more-button" href="#">
                    View More
                </a>
            )}
        </div>
    );
};

export default Save;
