/**
 * PSD Rankings — Block editor component.
 *
 * Renders the block settings panel in the Gutenberg sidebar and a
 * placeholder preview in the editor canvas.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl, RangeControl } from '@wordpress/components';
import './editor.scss';
import metadata from './block.json';

export default function Edit( { attributes, setAttributes } ) {
	const {
		blockDesign    = 'rankings_2025',
		postType       = 'school_rankings',
		program        = '',
		defaultOpen    = 3,
		hasTwoAndFourYears = '',
		defaultLevelYear   = '',
		version        = '',
	} = attributes;

	const blockProps = useBlockProps();

	return (
		<div className="vtx-psd-rankings-block" { ...blockProps }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Rankings Settings', metadata.textdomain ) }
					initialOpen={ true }
				>
					{ /* ── Design ──────────────────────────────────── */ }
					<SelectControl
						label={ __( 'Block Design', metadata.textdomain ) }
						help={ __( 'Choose which render template to use. Must match the "Block Design" ACF field on this page.', metadata.textdomain ) }
						value={ blockDesign }
						options={ [
							{ label: 'Rankings 2025',        value: 'rankings_2025' },
							{ label: 'Rankings Spring 2026', value: 'rankings_spring_2026' },
						] }
						onChange={ ( value ) => setAttributes( { blockDesign: value } ) }
					/>

					{ /* ── Post Type ─────────────────────────────────── */ }
					<SelectControl
						label={ __( 'Post Type', metadata.textdomain ) }
						help={ __( 'Custom post type that holds the ranking data.', metadata.textdomain ) }
						value={ postType }
						options={ [
							{ label: 'School Rankings', value: 'school_rankings' },
						] }
						onChange={ ( value ) => setAttributes( { postType: value } ) }
					/>

					{ /* ── Program ──────────────────────────────────── */ }
					<TextControl
						label={ __( 'Program', metadata.textdomain ) }
						help={ __( 'Taxonomy term name used to filter rankings (e.g. "Nursing").', metadata.textdomain ) }
						value={ program }
						onChange={ ( value ) => setAttributes( { program: value } ) }
					/>

					{ /* ── Version ──────────────────────────────────── */ }
					<SelectControl
						label={ __( 'Version (Data Year)', metadata.textdomain ) }
						help={ __( 'Filters ranking posts by the "version_acf" meta field.', metadata.textdomain ) }
						value={ version }
						options={ [
							{ label: 'Choose a year', value: '' },
							{ label: '2027', value: '2027' },
							{ label: '2026', value: '2026' },
							{ label: '2025', value: '2025' },
							{ label: '2024', value: '2024' },
						] }
						onChange={ ( value ) => setAttributes( { version: value } ) }
					/>

					{ /* ── Default open items ───────────────────────── */ }
					<RangeControl
						label={ __( 'Default Open Items', metadata.textdomain ) }
						help={ __( 'Number of accordion items expanded on page load.', metadata.textdomain ) }
						value={ defaultOpen }
						min={ 0 }
						max={ 10 }
						onChange={ ( value ) => setAttributes( { defaultOpen: value } ) }
					/>

					{ /* ── 2-year / 4-year toggle ────────────────────── */ }
					<SelectControl
						label={ __( 'Has 2-year and 4-year Schools?', metadata.textdomain ) }
						help={ __( 'Shows a level-year tab switcher when enabled.', metadata.textdomain ) }
						value={ hasTwoAndFourYears }
						options={ [
							{ label: 'Choose an option', value: '' },
							{ label: 'Yes',              value: 'yes' },
							{ label: 'No',               value: 'no' },
						] }
						onChange={ ( value ) => setAttributes( { hasTwoAndFourYears: value } ) }
					/>

					{ /* ── Default level year ───────────────────────── */ }
					<SelectControl
						label={ __( 'Default Level Year', metadata.textdomain ) }
						help={ __( 'Which school level is shown by default when the page loads.', metadata.textdomain ) }
						value={ defaultLevelYear }
						options={ [
							{ label: 'Choose an option', value: '' },
							{ label: '4-year',           value: 'four-year' },
							{ label: '2-year',           value: 'two-year' },
						] }
						onChange={ ( value ) => setAttributes( { defaultLevelYear: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<section className="rankings-editor">
				<p>
					{ blockDesign === 'rankings_spring_2026'
						? __( 'Rankings — Spring 2026', metadata.textdomain )
						: __( 'Rankings — 2025', metadata.textdomain )
					}
				</p>
			</section>
		</div>
	);
}
