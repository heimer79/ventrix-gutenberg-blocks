import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { cardType, userName, userImage, testimonial, credentials } =
		attributes;
	return (
		<div
			{...useBlockProps.save()}
			className={`testimonial-card testimonial-card__${cardType}`}
		>
			<div className="testimonial-card__content">
				<div className="testimonial-card__header">
					<h5 className="testimonial-card__type">
						{cardType === "expert" ? "Expert Insight" : "Student Tip"}
					</h5>
				</div>
				<blockquote className="testimonial-card__text">
					{testimonial}
				</blockquote>
				<div className="testimonial-card__user hidden-mobile">
					<span className="testimonial-card__user-name">{userName}</span>
					{credentials && (
						<span className="testimonial-card__user-credentials">
							{" "}
							{credentials}
						</span>
					)}
				</div>
			</div>
			{userImage && (
				<div className="testimonial-card__image-wrapper">
					<img
						className="testimonial-card__image"
						src={userImage}
						alt={userName}
					/>
					<div className="testimonial-card__user hidden-desktop">
						<span className="testimonial-card__user-name">{userName}</span>
						{credentials && (
							<span className="testimonial-card__user-credentials">
								{" "}
								{credentials}
							</span>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
