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
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';

import './editor.scss';
import metadata from './block.json';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object} props The block properties.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
    const { postType = 'school_ranking', program, defaultOpen = 5, hasTwoAndFourYears = '', defaultLevelYear, version, rankings } = attributes;
    const blockProps = useBlockProps();
    const [programTerms, setProgramTerms] = useState([]);

    console.log(attributes);

    useEffect(() => {
        // Function to fetch all terms with pagination
        const fetchAllTerms = async (path) => {
            let page = 1;
            let allTerms = [];
            let hasMore = true;
    
            while (hasMore) {
                const terms = await apiFetch({ path: `${path}&page=${page}` });
                if (terms.length > 0) {
                    allTerms = [...allTerms, ...terms];
                    page++;
                } else {
                    hasMore = false;
                }
            }
    
            return allTerms;
        };
    
        // Fetch school ranking category taxonomy terms
        fetchAllTerms('/wp/v2/school_ranking_category?per_page=100').then((terms) => {
            const options = [{ label: 'Choose an option', value: '' }, ...terms.map((term) => ({ label: term.name, value: term.id }))];
            setProgramTerms(options);
        });
    
        // Fetch rankings
        apiFetch({ path: '/cafeto/v1/school-rankings' })
            .then((posts) => {
                // Filter out any empty objects
                const filteredPosts = posts.filter(post => post.title && post.content);
                setAttributes({ rankings: filteredPosts });
                console.log('Fetched rankings:', filteredPosts);
            })
            .catch((err) => {
                console.error('Error fetching school rankings:', err);
            });
    }, []);

    return (
        <div {...blockProps}>
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
                    {/* <SelectControl
                        label={__('Program', metadata.textdomain)}
                        value={program}
                        options={programTerms}
                        onChange={(value) => setAttributes({ program: value })}
                    /> */}
                    <SelectControl
                        label={__('Program', metadata.textdomain)}
                        value={program}
                        options={programTerms}
                        onChange={(value) => {
                            console.log('Selected Program:', value);
                            setAttributes({ program: value });
                        }}
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

            <section className="rankings-top-bar">
                <div className="rankings-top-bar--years">
                    <a href="#two-year-rankings" className="two-year-button">{__('2-year Schools', metadata.textdomain)}</a>
                    <a href="#four-year-rankings" className="four-year-button">{__('4-year Schools', metadata.textdomain)}</a>
                </div>
                <button className="rankings-top-bar--about">{__('About the Rankings', metadata.textdomain)}</button>
                <div className="rankings-top-bar--expand-collapse">
                    <button>{__('Expand All', metadata.textdomain)}</button>
                    <button>{__('Collapse All', metadata.textdomain)}</button>
                </div>
            </section>

            <section className="rankings-list">
                {rankings.length === 0 ? (
                    <p>{__('No rankings found.', metadata.textdomain)}</p>
                ) : (
                    <p>{__('Rankings found.', metadata.textdomain)}</p>
                )}
            </section>
        </div>
    );
}
