import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { ColorPicker,TextControl, PanelBody } from '@wordpress/components';
import './editor.scss';

// Default inner block template: h2 heading and paragraph
const TEMPLATE = [
    ['core/heading', { level: 2 }], // Preloaded heading block (level 2)
    ['core/paragraph', {}], // Preloaded paragraph block
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
        borderColor,
        backgroundColor,
        paddingInline,
        paddingBlock,
        borderRadiusTopLeft,
        borderRadiusTopRight,
        borderRadiusBottomLeft,
        borderRadiusBottomRight,
    } = attributes;

    // Update attribute handlers
    const onChangeBorderColor = (newColor) => setAttributes({ borderColor: newColor });
    const onChangeBackgroundColor = (newColor) => setAttributes({ backgroundColor: newColor });
    const onChangePaddingInline = (value) => setAttributes({ paddingInline: value });
    const onChangePaddingBlock = (value) => setAttributes({ paddingBlock: value });
    const onChangeBorderRadiusTopLeft = (value) => setAttributes({ borderRadiusTopLeft: value });
    const onChangeBorderRadiusTopRight = (value) => setAttributes({ borderRadiusTopRight: value });
    const onChangeBorderRadiusBottomLeft = (value) =>
        setAttributes({ borderRadiusBottomLeft: value });
    const onChangeBorderRadiusBottomRight = (value) =>
        setAttributes({ borderRadiusBottomRight: value });

    // Generate block props with dynamic background color
    const blockProps = useBlockProps({
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
        <Fragment>
            {/* Inspector controls for block settings */}
            <InspectorControls>
                <PanelBody title="Border Color">
                    <ColorPicker
                        color={borderColor}
                        onChangeComplete={(color) => onChangeBorderColor(color.hex)}
                        disableAlpha
                    />
                </PanelBody>
                <PanelBody title="Background Color">
                    <ColorPicker
                        color={backgroundColor}
                        onChangeComplete={(color) => onChangeBackgroundColor(color.hex)}
                        disableAlpha
                    />
                </PanelBody>
                <PanelBody title="Padding">
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
                <PanelBody title="Rounded Borders">
                    <TextControl
                        label="Top Left Radius (e.g., 5px)"
                        value={borderRadiusTopLeft}
                        onChange={onChangeBorderRadiusTopLeft}
                    />
                    <TextControl
                        label="Top Right Radius (e.g., 5px)"
                        value={borderRadiusTopRight}
                        onChange={onChangeBorderRadiusTopRight}
                    />
                    <TextControl
                        label="Bottom Left Radius (e.g., 5px)"
                        value={borderRadiusBottomLeft}
                        onChange={onChangeBorderRadiusBottomLeft}
                    />
                    <TextControl
                        label="Bottom Right Radius (e.g., 5px)"
                        value={borderRadiusBottomRight}
                        onChange={onChangeBorderRadiusBottomRight}
                    />
                </PanelBody>
            </InspectorControls>

            {/* Block content area */}
            <div {...blockProps}>
                <InnerBlocks template={TEMPLATE} />
            </div>
        </Fragment>
    );
};

export default Edit;
