/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n"; // Import the localization function from WordPress for translating text

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor"; // Import hooks and components for working with Gutenberg blocks

/**
 * WordPress components for block settings.
 */
import {
	PanelBody,
	SelectControl,
} from "@wordpress/components"; // Import WordPress UI components for block controls

import "./editor.scss"; // Import custom styles for the block editor
import metadata from "./block.json"; // Import block metadata, including the text domain for translations

export default function Edit({ attributes, setAttributes }) {
	// Destructure the attributes object to get or set block attributes with default values
	const {
		postType = "latest_ranking",
		version,
	} = attributes;
	const blockProps = useBlockProps(); // Get the block props that apply necessary class names and attributes

	return (
		<div className="vtx-omd-rankings-block" {...blockProps}>
			<InspectorControls>
				<PanelBody
					title={__("Rankings Settings", metadata.textdomain)}
					initialOpen={true}
				>
					{/* Control for selecting the post type */}
					<SelectControl
						label={__("Post Type", metadata.textdomain)}
						value={postType}
						options={[
							{ label: "Choose an option", value: "" },
							{ label: "Latest Ranking", value: "latest_ranking" },
							// Add other post types here if needed
						]}
						onChange={(value) => setAttributes({ postType: value })} // Update the postType attribute when changed
					/>
					{/* Control for selecting the version */}
					<SelectControl
						label={__("Version", metadata.textdomain)}
						value={version}
						options={[
							{ label: "Choose an option", value: "" },
							{ label: "2027", value: "2027" },
							{ label: "2026", value: "2026" },
							{ label: "2025", value: "2025" },
							{ label: "2024", value: "2024" },
						]}
						onChange={(value) => setAttributes({ version: value })} // Update the version attribute when changed
					/>
				</PanelBody>
			</InspectorControls>

			<section className="rankings-editor">
				{/* Add specific content for the block here */}
				{postType === "latest_ranking" && <p>Latest Rankings</p>}
			</section>
		</div>
	);
}
