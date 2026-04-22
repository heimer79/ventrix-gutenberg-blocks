import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

const v1 = {
	attributes: {
		baseColor: { type: "string", default: "#5C44BB" },
		borderColor: { type: "string", default: "#E3DBFF" },
		borderStyle: { type: "string", default: "solid" },
		borderWidth: { type: "string", default: "1px" },
		borderTopWidth: { type: "string", default: "1px" },
		borderRightWidth: { type: "string", default: "1px" },
		borderBottomWidth: { type: "string", default: "1px" },
		borderLeftWidth: { type: "string", default: "1px" },
		backgroundColor: { type: "string", default: "#F8F7FF" },
		paddingInline: { type: "string", default: "50px" },
		paddingBlock: { type: "string", default: "40px" },
		borderRadiusTopLeft: { type: "string", default: "30px" },
		borderRadiusTopRight: { type: "string", default: "30px" },
		borderRadiusBottomLeft: { type: "string", default: "30px" },
		borderRadiusBottomRight: { type: "string", default: "30px" },
		showViewMoreButton: { type: "boolean", default: false },
		enableBoxShadow: { type: "boolean", default: false },
	},
	migrate( attributes ) {
		const { showViewMoreButton, ...rest } = attributes;
		return rest;
	},
	save( { attributes } ) {
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
			showViewMoreButton,
			enableBoxShadow,
		} = attributes;

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
				"--max-height": "none",
			},
		});

		return (
			<div { ...blockProps }>
				{ showViewMoreButton ? (
					<div className="wp-block-inner">
						<InnerBlocks.Content />
					</div>
				) : (
					<InnerBlocks.Content />
				) }
				{ showViewMoreButton && (
					<button className="view-more-button">
						<span className="view-more-text">View More</span>
						<span className="view-more-icon"></span>
					</button>
				) }
			</div>
		);
	},
};

export default [ v1 ];
