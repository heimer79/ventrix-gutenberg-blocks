import { useBlockProps } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { cardType, userName, userImage, testimonial, credentials } =
		attributes;
	
	// Get the current site from ACF options (fallback to edumed)
	const getCurrentSite = () => {
		// Check if window and config exist
		if (typeof window === 'undefined' || !window.ventrixSiteConfig) {
			return 'edumed'; // Default fallback
		}
		
		// Check if config is properly configured
		if (!window.ventrixSiteConfig.isConfigured) {
			return 'edumed'; // Default fallback
		}
		
		// Get current site with validation
		const currentSite = window.ventrixSiteConfig.currentSite;
		const allowedSites = ['edumed', 'psd', 'omd', 'phd', 'oc'];
		
		// Validate the site value
		if (!currentSite || !allowedSites.includes(currentSite)) {
			return 'edumed'; // Default fallback
		}
		
		return currentSite;
	};
	
	const currentSite = getCurrentSite();
	
	return (
		<div
			{...useBlockProps.save()}
			className={`testimonial-card testimonial-card__${cardType} heimer testimonial-card--${currentSite}`}
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
	);
}
