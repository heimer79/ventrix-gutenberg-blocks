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
        borderColor,
        backgroundColor,
        paddingInline,
        paddingBlock,
        borderRadiusTopLeft,
        borderRadiusTopRight,
        borderRadiusBottomLeft,
        borderRadiusBottomRight,
        showViewMoreButton,
        minHeight,
    } = attributes;

    // Generate block props with dynamic background color
    const blockProps = useBlockProps.save({
        className: 'ventrix-multipurpose-card-block', // Permanent class
        style: {
            borderColor: borderColor || undefined,
            backgroundColor: backgroundColor || undefined,
            paddingInline: paddingInline || undefined,
            paddingBlock: paddingBlock || undefined,
            borderTopLeftRadius: borderRadiusTopLeft || undefined,
            borderTopRightRadius: borderRadiusTopRight || undefined,
            borderBottomLeftRadius: borderRadiusBottomLeft || undefined,
            borderBottomRightRadius: borderRadiusBottomRight || undefined,
        },
        
    });

    return (
        <div {...blockProps} style={{ minHeight: minHeight || undefined }}>
            <InnerBlocks.Content />
            {showViewMoreButton && (
                <a
                    className="view-more-button"
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        const container = e.target.parentElement;
                        container.style.height = 'auto';
                        e.target.style.display = 'none';
                    }}
                >
                    View More
                </a>
            )}
        </div>
    );
};

export default Save;
