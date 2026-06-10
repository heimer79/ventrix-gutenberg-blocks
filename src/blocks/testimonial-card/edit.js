import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	TextareaControl,
	TextControl,
	ComboboxControl,
	Spinner,
} from "@wordpress/components";
import { useEffect, useState } from "react";

/**
 * Central template registry.
 *
 * To add a new card type:
 * 1. Add an entry here with its label, fields and previewLabel.
 * 2. Create the PHP file in inc/templates/.
 * 3. Register the value in block.json (cardType enum).
 *
 * No changes to the Edit component JSX are required.
 */
const CARD_TYPE_CONFIG = {
	expert: {
		label: __("Expert Insight", "ventrix-gutenberg-blocks"),
		previewLabel: "Expert Insight",
		fields: [],
	},
	student: {
		label: __("Student Tip", "ventrix-gutenberg-blocks"),
		previewLabel: "Student Tip",
		fields: [],
	},
	"what-experts-say": {
		label: __("What the Experts Say", "ventrix-gutenberg-blocks"),
		previewLabel: "What the Experts Say",
		fields: [
			{
				key: "topic",
				component: "TextControl",
				label: __("Topic Tag", "ventrix-gutenberg-blocks"),
				help: __("e.g. Budget, Scheduling, Clinical Hours", "ventrix-gutenberg-blocks"),
			},
		],
	},
};

/** Builds the SelectControl options from the registry. */
const CARD_TYPE_OPTIONS = Object.entries(CARD_TYPE_CONFIG).map(
	([value, config]) => ({ label: config.label, value })
);

/**
 * Renders the extra fields defined in the registry for the active cardType.
 */
function TemplateFields({ cardType, attributes, setAttributes }) {
	const config = CARD_TYPE_CONFIG[cardType];
	if (!config || !config.fields.length) return null;

	return config.fields.map(({ key, component, label, help }) => {
		if (component === "TextControl") {
			return (
				<TextControl
					key={key}
					label={label}
					help={help}
					value={attributes[key] || ""}
					onChange={(value) => setAttributes({ [key]: value })}
				/>
			);
		}
		return null;
	});
}

export default function Edit({ attributes, setAttributes }) {
	const { cardType, userName, userImage, testimonial, credentials } =
		attributes;
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [currentSite, setCurrentSite] = useState("edumed");

	useEffect(() => {
		setIsLoading(true);
		setError(null);
		wp.apiFetch({
			path: "cafeto/v1/users",
		})
			.then((data) => {
				setUsers(data);
				setIsLoading(false);
			})
			.catch((err) => {
				setError("Error loading users: " + (err.message || err));
				setIsLoading(false);
			});
	}, []);

	// Read the active site from the window config injected by site-config.php
	useEffect(() => {
		if (window.ventrixSiteConfig && window.ventrixSiteConfig.currentSite) {
			setCurrentSite(window.ventrixSiteConfig.currentSite);
		}
	}, []);

	const userOptions = users.map((user) => ({
		label: user.credentials
			? `${user.display_name}, ${user.credentials}`
			: user.display_name,
		value: user.id,
		avatar: user.avatar_url,
	}));

	const handleUserSelect = (userId) => {
		const selected = users.find((u) => u.id === userId);
		if (selected) {
			setAttributes({
				userName: selected.display_name,
				userLink: selected.user_link,
				userImage: selected.avatar_url,
				credentials: selected.credentials || "",
			});
		}
	};

	// Resolve the preview label from the registry; fall back to the raw cardType value.
	const previewLabel =
		CARD_TYPE_CONFIG[cardType]?.previewLabel ?? cardType;

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__("Card Options", "ventrix-gutenberg-blocks")}>
					<SelectControl
						label={__("Card Type", "ventrix-gutenberg-blocks")}
						value={cardType}
						options={CARD_TYPE_OPTIONS}
						onChange={(value) => setAttributes({ cardType: value })}
					/>
					{isLoading ? (
						<Spinner />
					) : error ? (
						<div style={{ color: "red", margin: "8px 0" }}>{error}</div>
					) : (
						<ComboboxControl
							label={__("Select User", "ventrix-gutenberg-blocks")}
							options={userOptions}
							onChange={handleUserSelect}
							value={
								userOptions.find(
									(u) => u.label === `${userName}, ${credentials}`,
								)?.value || ""
							}
						/>
					)}
					<TemplateFields
						cardType={cardType}
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				</PanelBody>
				<PanelBody title={__("Description", "ventrix-gutenberg-blocks")}>
					<TextareaControl
						label={__("Description", "ventrix-gutenberg-blocks")}
						value={testimonial}
						onChange={(value) => setAttributes({ testimonial: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div className={`testimonial-card testimonial-card__${cardType} testimonial-card--${currentSite}`}>
				<div className={`testimonial-card--${currentSite}__content`}>
					<div className={`testimonial-card--${currentSite}__header`}>
						<h5 className={`testimonial-card--${currentSite}__type`}>
							{previewLabel}
						</h5>
					</div>
					<blockquote className={`testimonial-card--${currentSite}__text`}>
						{testimonial}
					</blockquote>
					<div className={`testimonial-card--${currentSite}__user`}>
						<span className="testimonial-card__user-name">
							{userName},
							{credentials && (
								<span className={`testimonial-card--${currentSite}__user-credentials`}>
									{" "}
									{credentials}
								</span>
							)}
						</span>

						{userImage && (
							<img
								className={`testimonial-card--${currentSite}__image`}
								src={userImage}
								alt={userName}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
