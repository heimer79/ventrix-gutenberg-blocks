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
		enableBoxShadow,
	} = attributes;

	// Clean any existing maxHeight attribute to prevent --max-height CSS injection
	const cleanAttributes = { ...attributes };
	delete cleanAttributes.maxHeight;

	// Generate block props with dynamic background color
	const blockProps = useBlockProps.save({
		className: `ventrix-multipurpose-card-block ${enableBoxShadow ? "has-box-shadow" : ""}`,
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
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
