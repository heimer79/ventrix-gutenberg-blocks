import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { RichText, useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { Button, TextControl, PanelBody } from '@wordpress/components';
import Chevron from './components/Chevron';
import './editor.scss';

const Edit = ({ attributes, setAttributes }) => {
    const { isOpen, headingText, headingLink, headingLevel,numberPrefix, amountSuffix } = attributes;
    const [accordionOpen, setAccordionOpen] = useState(isOpen);

    // Toggle function to handle open/close state
    const toggleOpen = () => {
        const newOpenedState = !accordionOpen;
        setAccordionOpen(newOpenedState);
    };

    const blockProps = useBlockProps({
        className: `accordion-item`,
    });

    return (
        <div {...blockProps}>

            {/* Block Inspector for link input */}
            <InspectorControls>
                <PanelBody title={__('Accordion Settings', 'text-domain')}>
                    <TextControl
                        label={__('Accordion Title Link', 'text-domain')}
                        value={headingLink}
                        onChange={(newLink) => setAttributes({ headingLink: newLink })}
                        placeholder={__('Add link here', 'text-domain')}
                    />
                    <TextControl
                        label={__('Prefix Number', 'text-domain')}
                        value={numberPrefix}
                        onChange={(newNumberPrefix) => setAttributes({ numberPrefix: newNumberPrefix })}
                        placeholder={__('Add number prefix (e.g., "#1:")', 'text-domain')}
                    />
                    <TextControl
                        label={__('Amount Suffix', 'text-domain')}
                        value={amountSuffix}
                        onChange={(newAmountSuffix) => setAttributes({ amountSuffix: newAmountSuffix })}
                        placeholder={__('Add amount suffix (e.g., "— $27,662")', 'text-domain')}
                    />
                </PanelBody>
            </InspectorControls>

            <div className="accordion-title">
                <Button
                    className="accordion-toggle"
                    onClick={toggleOpen}
                    aria-expanded={accordionOpen}
                    aria-label={__('Toggle Accordion', 'text-domain')}
                >
                    <Chevron orientation={accordionOpen ? 'up' : 'down'} />
                </Button>
                <RichText
                    tagName={headingLevel}
                    className="accordion-heading"
                    value={headingText}
                    onChange={(newTitle) => setAttributes({ headingText: newTitle })}
                    placeholder={__('Accordion Title', 'text-domain')}
                    allowedFormats={[]}
                />
            </div>

            {accordionOpen && (
                <div className="accordion-content">
                    <InnerBlocks />
                </div>
            )}
        </div>
    );
};

export default Edit;
