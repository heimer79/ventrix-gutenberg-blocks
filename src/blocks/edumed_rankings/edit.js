/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n'; // Import the localization function from WordPress for translating text

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor'; // Import hooks and components for working with Gutenberg blocks

/**
 * WordPress components for block settings.
 */
import { PanelBody, TextControl, SelectControl, RangeControl } from '@wordpress/components'; // Import WordPress UI components for block controls

import './editor.scss'; // Import custom styles for the block editor
import metadata from './block.json'; // Import block metadata, including the text domain for translations

export default function Edit({ attributes, setAttributes }) {
    // Destructure the attributes object to get or set block attributes with default values
    const { postType = 'school_ranking', program, defaultOpen = 3, hasTwoAndFourYears = '', defaultLevelYear, version } = attributes;
    const blockProps = useBlockProps(); // Get the block props that apply necessary class names and attributes

    return (
        <div className="cafeto-edumed-rankings-block" {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Rankings Settings', metadata.textdomain)} initialOpen={true}>
                    {/* Control for selecting the post type */}
                    <SelectControl
                        label={__('Post Type', metadata.textdomain)}
                        value={postType}
                        options={[
                            { label: 'School Ranking', value: 'school_ranking' },
                            // Add other post types here if needed
                        ]}
                        onChange={(value) => setAttributes({ postType: value })} // Update the postType attribute when changed
                    />
                    {/* Custom select control for selecting a program */}
                    <TextControl    
                        label={__('Program', metadata.textdomain)}
                        value={program}
                        onChange={(value) => setAttributes({ program: value })} // Update the program attribute when changed
                    />
                    {/* Control for selecting the default number of open items */}
                    <RangeControl
                        label={__('Default Open', metadata.textdomain)}
                        value={defaultOpen}
                        onChange={(value) => setAttributes({ defaultOpen: value })} // Update the defaultOpen attribute when changed
                        min={0}
                        max={10} // Set the range for the control
                    />
                    {/* Control for selecting whether the block has 2 and 4-year programs */}
                    <SelectControl
                        label={__('Has 2 and 4 Years?', metadata.textdomain)}
                        value={hasTwoAndFourYears}
                        options={[
                            { label: 'Choose an option', value: '' },
                            { label: 'Yes', value: 'yes' },
                            { label: 'No', value: 'no' },
                        ]}
                        onChange={(value) => setAttributes({ hasTwoAndFourYears: value })} // Update the hasTwoAndFourYears attribute when changed
                    />
                    {/* Control for selecting the default level year */}
                    <SelectControl
                        label={__('Default Level Year', metadata.textdomain)}
                        value={defaultLevelYear}
                        options={[
                            { label: 'Choose an option', value: '' },
                            { label: '4-year', value: 'four-year' },
                            { label: '2-year', value: 'two-year' },
                        ]}
                        onChange={(value) => setAttributes({ defaultLevelYear: value })} // Update the defaultLevelYear attribute when changed
                    />
                    {/* Control for selecting the version */}
                    <SelectControl
                        label={__('Version', metadata.textdomain)}
                        value={version}
                        options={[
                            { label: 'Choose an option', value: '' },
                            { label: '2025', value: '2025' },
                        ]}
                        onChange={(value) => setAttributes({ version: value })} // Update the version attribute when changed
                    />
                </PanelBody>
            </InspectorControls>

            <section className="rankings-editor">
                {/* Add specific content for the block here */
                
                    <p>Rankings</p>
                
                }
            </section>
        </div>
    );
}
