import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import {
    RichText,
    useBlockProps,
    InnerBlocks,
    InspectorControls
} from '@wordpress/block-editor';
import {
    Button,
    TextControl,
    PanelBody,
    SelectControl
} from '@wordpress/components'; // ✅ Added SelectControl import
import Chevron from './components/Chevron';
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
    const { isOpen, headingText, headingLink, headingLevel, numberPrefix, amountSuffix } = attributes;
    const [accordionOpen, setAccordionOpen] = useState(isOpen);

    // Toggle accordion open/close state
    const toggleOpen = () => {
        const newOpenedState = !accordionOpen;
        setAccordionOpen(newOpenedState);
    };

    const blockProps = useBlockProps({
        className: 'accordion-item',
    });

    return (
        <div {...blockProps}>
            {/* Inspector controls for accordion settings */}
            <InspectorControls>
                <PanelBody title={__('Accordion Settings', 'ventrix')}>
                    <SelectControl
                        label={__('Heading Level', 'ventrix')}
                        value={headingLevel}
                        options={[
                            { label: 'H2', value: 'h2' },
                            { label: 'H3', value: 'h3' },
                            { label: 'H4', value: 'h4' },
                            { label: 'H5', value: 'h5' },
                        ]}
                        onChange={(value) => setAttributes({ headingLevel: value })}
                    />
                    <TextControl
                        label={__('Accordion Title Link', 'ventrix')}
                        value={headingLink}
                        onChange={(newLink) => setAttributes({ headingLink: newLink })}
                        placeholder={__('Add link here', 'ventrix')}
                    />
                    <TextControl
                        label={__('Prefix Number', 'ventrix')}
                        value={numberPrefix}
                        onChange={(newNumberPrefix) => setAttributes({ numberPrefix: newNumberPrefix })}
                        placeholder={__('Add number prefix (e.g., "#1:")', 'ventrix')}
                    />
                    <TextControl
                        label={__('Amount Suffix', 'ventrix')}
                        value={amountSuffix}
                        onChange={(newAmountSuffix) => setAttributes({ amountSuffix: newAmountSuffix })}
                        placeholder={__('Add amount suffix (e.g., "— $27,662")', 'ventrix')}
                    />
                </PanelBody>
            </InspectorControls>

            {/* Accordion heading section */}
            <div className="accordion-title">
                <Button
                    className="accordion-toggle"
                    onClick={toggleOpen}
                    aria-expanded={accordionOpen}
                    aria-label={__('Toggle Accordion', 'ventrix')}
                >
                    <Chevron orientation={accordionOpen ? 'up' : 'down'} />
                </Button>

                {/* Clean RichText without formatting */}
                <RichText
                    tagName={headingLevel}
                    className="accordion-heading"
                    value={headingText}
                    onChange={(newTitle) => setAttributes({ headingText: newTitle })}
                    placeholder={__('Accordion Title', 'ventrix')}
                    allowedFormats={[]} // 🚫 Prevents <strong>, <em>, <a>, etc.
                />
            </div>

            {/* Accordion content section */}
            {accordionOpen && (
                <div className="accordion-content">
                    <InnerBlocks />
                </div>
            )}
        </div>
    );
};

export default Edit;