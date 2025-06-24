import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import "./style.scss";

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
		borderStyle,
		borderWidth,
		borderTopWidth,
		borderRightWidth,
		borderBottomWidth,
		borderLeftWidth,
		backgroundColor,
		paddingInline,
		paddingBlock,
		borderRadiusTopLeft,
		borderRadiusTopRight,
		borderRadiusBottomLeft,
		borderRadiusBottomRight,
		showViewMoreButton,
		enableBoxShadow,
	} = attributes;

	// Clean any existing maxHeight attribute to prevent --max-height CSS injection
	const cleanAttributes = { ...attributes };
	delete cleanAttributes.maxHeight;

	// Generate block props with dynamic background color
	const blockProps = useBlockProps.save({
		className: `ventrix-multipurpose-card-block ${
			showViewMoreButton ? "has-view-more" : ""
		} ${enableBoxShadow ? "has-box-shadow" : ""}`,
		style: {
			borderColor: borderColor || undefined,
			borderStyle: borderStyle || undefined,
			borderTopWidth: borderTopWidth || undefined,
			borderRightWidth: borderRightWidth || undefined,
			borderBottomWidth: borderBottomWidth || undefined,
			borderLeftWidth: borderLeftWidth || undefined,
			backgroundColor: backgroundColor || undefined,
			paddingInline: paddingInline || undefined,
			paddingBlock: paddingBlock || undefined,
			borderTopLeftRadius: borderRadiusTopLeft || undefined,
			borderTopRightRadius: borderRadiusTopRight || undefined,
			borderBottomLeftRadius: borderRadiusBottomLeft || undefined,
			borderBottomRightRadius: borderRadiusBottomRight || undefined,
			"--base-color": baseColor ? baseColor : undefined,
			"--max-height": "none", // Force no max-height
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
			{/* {showViewMoreButton && (
                <a className="view-more-button" href="#">
                    View More
                </a>
            )} */}
			{showViewMoreButton && (
				<button className="view-more-button">
					<span className="view-more-text">View More</span>
					<span className="view-more-icon"></span>
				</button>
			)}
		</div>
	);
};

export default Save;
