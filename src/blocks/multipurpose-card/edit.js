import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import {
	ColorPicker,
	TextControl,
	ToggleControl,
	PanelBody,
	PanelRow,
	SelectControl,
	RangeControl,
	__experimentalUnitControl as UnitControl,
	Button,
} from "@wordpress/components";
import "./editor.scss";

// Default inner block template: h2 heading and paragraph
const TEMPLATE = [
	["core/heading", { level: 2 }], // Preloaded heading block (level 2)
	["core/paragraph", {}], // Preloaded paragraph block
];

/**
 * The edit function handles the block's behavior and interface in the editor.
 *
 * @param {Object} props - The block properties.
 * @param {Object} props.attributes - Attributes of the block.
 * @param {Function} props.setAttributes - Function to update attributes.
 *
 * @returns {JSX.Element} - The block's editor interface.
 */
const Edit = ({ attributes, setAttributes }) => {
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

	// Update attribute handlers
	const onChangeBaseColor = (newColor) =>
		setAttributes({ baseColor: newColor });
	const onChangeBorderColor = (newColor) =>
		setAttributes({ borderColor: newColor });
	const onChangeBorderStyle = (value) => setAttributes({ borderStyle: value });
	const onChangeBorderWidth = (value) => {
		setAttributes({
			borderWidth: value,
			borderTopWidth: value,
			borderRightWidth: value,
			borderBottomWidth: value,
			borderLeftWidth: value,
		});
	};
	const onChangeBorderTopWidth = (value) =>
		setAttributes({ borderTopWidth: value });
	const onChangeBorderRightWidth = (value) =>
		setAttributes({ borderRightWidth: value });
	const onChangeBorderBottomWidth = (value) =>
		setAttributes({ borderBottomWidth: value });
	const onChangeBorderLeftWidth = (value) =>
		setAttributes({ borderLeftWidth: value });
	const onChangeBackgroundColor = (newColor) =>
		setAttributes({ backgroundColor: newColor });
	const onChangePaddingInline = (value) =>
		setAttributes({ paddingInline: value });
	const onChangePaddingBlock = (value) =>
		setAttributes({ paddingBlock: value });
	const onChangeBorderRadiusTopLeft = (value) =>
		setAttributes({ borderRadiusTopLeft: value });
	const onChangeBorderRadiusTopRight = (value) =>
		setAttributes({ borderRadiusTopRight: value });
	const onChangeBorderRadiusBottomLeft = (value) =>
		setAttributes({ borderRadiusBottomLeft: value });
	const onChangeBorderRadiusBottomRight = (value) =>
		setAttributes({ borderRadiusBottomRight: value });
	const onToggleBoxShadow = (value) =>
		setAttributes({ enableBoxShadow: value });

	// Common units configuration for border widths
	const borderUnits = [
		{
			value: "px",
			label: "px",
			default: 1,
			step: 1,
			min: 0,
			max: 10,
		},
		{
			value: "rem",
			label: "rem",
			default: 0.1,
			step: 0.1,
			min: 0,
			max: 2,
		},
		{
			value: "em",
			label: "em",
			default: 0.1,
			step: 0.1,
			min: 0,
			max: 2,
		},
	];

	// Generate block props with dynamic background color
	const blockProps = useBlockProps({
		className: `${enableBoxShadow ? "has-box-shadow" : ""}`,
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
			"--base-color": baseColor ? baseColor : undefined, // Apply base-color if it has a value
			"--max-height": "none", // Force no max-height
		},
	});

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title="Base Color" initialOpen={false}>
					<ColorPicker
						color={baseColor}
						onChangeComplete={(color) => onChangeBaseColor(color.hex)}
						disableAlpha
					/>
				</PanelBody>
				<PanelBody title="Border Settings" initialOpen={false}>
					{/* Color and Style Section */}
					<PanelRow>
						<div style={{ width: "100%" }}>
							<h3
								className="components-base-control__label"
								style={{ marginBottom: "8px" }}
							>
								Border Color
							</h3>
							<ColorPicker
								color={borderColor}
								onChangeComplete={(color) => onChangeBorderColor(color.hex)}
								disableAlpha
							/>
						</div>
					</PanelRow>

					<PanelRow>
						<div style={{ width: "100%" }}>
							<SelectControl
								label="Border Style"
								value={borderStyle}
								options={[
									{ label: "Solid", value: "solid" },
									{ label: "Dashed", value: "dashed" },
									{ label: "Dotted", value: "dotted" },
									{ label: "Double", value: "double" },
								]}
								onChange={onChangeBorderStyle}
							/>
						</div>
					</PanelRow>

					{/* Border Width Section */}
					<div style={{ marginBottom: "16px", marginTop: "16px", width: "100%" }}>
						<h3 className="components-base-control__label">Border Width</h3>
						<PanelRow>
							<Button
								variant="secondary"
								isSmall
								onClick={() => onChangeBorderWidth(borderTopWidth)}
								style={{ marginBottom: "8px" }}
							>
								Unify all borders
							</Button>
						</PanelRow>

						<PanelRow>
							<UnitControl
								label="Top Width"
								value={borderTopWidth}
								onChange={onChangeBorderTopWidth}
								units={borderUnits}
							/>
						</PanelRow>

						<PanelRow>
							<UnitControl
								label="Right Width"
								value={borderRightWidth}
								onChange={onChangeBorderRightWidth}
								units={borderUnits}
							/>
						</PanelRow>

						<PanelRow>
							<UnitControl
								label="Bottom Width"
								value={borderBottomWidth}
								onChange={onChangeBorderBottomWidth}
								units={borderUnits}
							/>
						</PanelRow>

						<PanelRow>
							<UnitControl
								label="Left Width"
								value={borderLeftWidth}
								onChange={onChangeBorderLeftWidth}
								units={borderUnits}
							/>
						</PanelRow>
					</div>

					{/* Border Radius Section */}
					<div>
						<h3 className="components-base-control__label">Border Radius</h3>
						<PanelRow>
							<TextControl
								label="Top Left Radius"
								value={borderRadiusTopLeft}
								onChange={onChangeBorderRadiusTopLeft}
							/>
						</PanelRow>

						<PanelRow>
							<TextControl
								label="Top Right Radius"
								value={borderRadiusTopRight}
								onChange={onChangeBorderRadiusTopRight}
							/>
						</PanelRow>

						<PanelRow>
							<TextControl
								label="Bottom Left Radius"
								value={borderRadiusBottomLeft}
								onChange={onChangeBorderRadiusBottomLeft}
							/>
						</PanelRow>

						<PanelRow>
							<TextControl
								label="Bottom Right Radius"
								value={borderRadiusBottomRight}
								onChange={onChangeBorderRadiusBottomRight}
							/>
						</PanelRow>
					</div>
				</PanelBody>
				<PanelBody title="Background Color" initialOpen={false}>
					<ColorPicker
						color={backgroundColor}
						onChangeComplete={(color) => onChangeBackgroundColor(color.hex)}
						disableAlpha
					/>
				</PanelBody>
				<PanelBody title="Padding" initialOpen={false}>
					<TextControl
						label="Inline Padding (e.g., 20px)"
						value={paddingInline}
						onChange={onChangePaddingInline}
					/>
					<TextControl
						label="Block Padding (e.g., 10px)"
						value={paddingBlock}
						onChange={onChangePaddingBlock}
					/>
				</PanelBody>
				<PanelBody title="Box Shadow" initialOpen={false}>
					<ToggleControl
						label="Enable Box Shadow"
						checked={enableBoxShadow}
						onChange={onToggleBoxShadow}
					/>
				</PanelBody>
			</InspectorControls>

			<InnerBlocks template={TEMPLATE} />
		</div>
	);
};

export default Edit;
