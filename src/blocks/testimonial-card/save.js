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
			className={`testimonial-card testimonial-card__${cardType} testimonial-card--${currentSite}`}
		>
			<div className={`testimonial-card--${currentSite}__content`}>
				<div className={`testimonial-card--${currentSite}__header`}>
					<h5 className={`testimonial-card--${currentSite}__type`}>
						{cardType === "expert" ? "Expert Insight" : "Student Tip"}
					</h5>
				</div>
				<blockquote className={`testimonial-card--${currentSite}__text`}>
					{testimonial}
				</blockquote>
				<div className={`testimonial-card--${currentSite}__user`}>
					<span className={`testimonial-card--${currentSite}__user-name`}>
						{userName}
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
	);
}
