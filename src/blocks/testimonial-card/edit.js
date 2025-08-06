import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	TextareaControl,
	ComboboxControl,
	Spinner,
} from "@wordpress/components";
import { useEffect, useState } from "react";

export default function Edit({ attributes, setAttributes }) {
	const { cardType, userName, userImage, testimonial, credentials } =
		attributes;
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

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
				userImage: selected.avatar_url,
				credentials: selected.credentials || "",
			});
		}
	};

	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__("Card Options", "ventrix-gutenberg-blocks")}>
					<SelectControl
						label={__("Card Type", "ventrix-gutenberg-blocks")}
						value={cardType}
						options={[
							{
								label: __("Expert Insight", "ventrix-gutenberg-blocks"),
								value: "expert",
							},
							{
								label: __("Student Tip", "ventrix-gutenberg-blocks"),
								value: "student",
							},
						]}
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
				</PanelBody>
				<PanelBody title={__("Description", "ventrix-gutenberg-blocks")}>
					<TextareaControl
						label={__("Description", "ventrix-gutenberg-blocks")}
						value={testimonial}
						onChange={(value) => setAttributes({ testimonial: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div className={`testimonial-card testimonial-card__${cardType}`}>
				<div className="testimonial-card__content">
					<div className="testimonial-card__header">
						<h5 className="testimonial-card__type">
							{cardType === "expert" ? "Expert Insight" : "Student Tip"}
						</h5>
					</div>
					<blockquote className="testimonial-card__text">
						{testimonial}
					</blockquote>
					<div className="testimonial-card__user">
						<span className="testimonial-card__user-name">
							{userName},
							{credentials && (
								<span className="testimonial-card__user-credentials">
									{" "}
									{credentials}
								</span>
							)}
						</span>

						{userImage && (
							<img
								className="testimonial-card__image"
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
