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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * WordPress components for block settings.
 */
import { PanelBody, TextControl, SelectControl, RangeControl } from '@wordpress/components';

import './editor.scss';
import metadata from './block.json';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object} props The block properties.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const { postType = 'school_ranking', program, defaultOpen = 3, hasTwoAndFourYears = '', defaultLevelYear, version } = attributes;
    const blockProps = useBlockProps();

    return (
        <div className="cafeto-edumed-rankings-block" {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Rankings Settings', metadata.textdomain)} initialOpen={true}>
                    <SelectControl
                        label={__('Post Type', metadata.textdomain)}
                        value={postType}
                        options={[
                            { label: 'School Ranking', value: 'school_ranking' },
                            // Add other post types here if needed
                        ]}
                        onChange={(value) => setAttributes({ postType: value })}
                    />
                    <TextControl
                        label={__('Program', metadata.textdomain)}
                        value={program}
                        onChange={(value) => setAttributes({ program: value })}
                    />
                    <RangeControl
                        label={__('Default Open', metadata.textdomain)}
                        value={defaultOpen}
                        onChange={(value) => setAttributes({ defaultOpen: value })}
                        min={0}
                        max={10}
                    />
                    <SelectControl
                        label={__('Has 2 and 4 Years?', metadata.textdomain)}
                        value={hasTwoAndFourYears}
                        options={[
                            { label: 'Choose an option', value: '' },
                            { label: 'Yes', value: 'yes' },
                            { label: 'No', value: 'no' },
                        ]}
                        onChange={(value) => setAttributes({ hasTwoAndFourYears: value })}
                    />
                    <SelectControl
                        label={__('Default Level Year', metadata.textdomain)}
                        value={defaultLevelYear}
                        options={[
                            { label: 'Choose an option', value: '' },
                            { label: '4-year', value: 'four-year' },
                            { label: '2-year', value: 'two-year' },
                        ]}
                        onChange={(value) => setAttributes({ defaultLevelYear: value })}
                    />
                    <SelectControl
                        label={__('Version', metadata.textdomain)}
                        value={version}
                        options={[
                            { label: 'Choose an option', value: '' },
                            { label: '2025', value: '2025' },
                        ]}
                        onChange={(value) => setAttributes({ version: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <section className="rankings-editor">
                {/* Print here "Rankings found" or "Rankings not found" */}
            </section>

        </div>
    );
}
