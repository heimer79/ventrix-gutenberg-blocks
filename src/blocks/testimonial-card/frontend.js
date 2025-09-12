/**
 * Frontend script to update testimonial card classes based on ACF value
 */

(function() {
    'use strict';
    
    // Function to update testimonial card classes
    function updateTestimonialCardClasses() {
        // Get current site from REST API
        fetch('/wp-json/ventrix/v1/current-site')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success && data.currentSite) {
                    const currentSite = data.currentSite;
                    const allowedSites = ['edumed', 'psd', 'omd', 'phd', 'oc'];
                    
                    // Validate the site value
                    if (allowedSites.includes(currentSite)) {
                        // Find all testimonial card blocks
                        const testimonialCards = document.querySelectorAll('.testimonial-card');
                        
                        console.log(`Ventrix: Found ${testimonialCards.length} testimonial cards, updating to ${currentSite}`);
                        
                        testimonialCards.forEach(card => {
                            // Remove existing site classes
                            allowedSites.forEach(site => {
                                card.classList.remove(`testimonial-card--${site}`);
                            });
                            
                            // Add current site class
                            card.classList.add(`testimonial-card--${currentSite}`);
                            
                            console.log(`Ventrix: Updated card classes:`, card.className);
                        });
                        
                        console.log(`Ventrix: Successfully updated testimonial card classes to ${currentSite}`);
                    } else {
                        console.warn(`Ventrix: Invalid site value: ${currentSite}`);
                    }
                } else {
                    console.warn('Ventrix: No valid site data received');
                }
            })
            .catch(error => {
                console.error('Ventrix: Error fetching current site:', error);
                // Fallback: try to use window.ventrixSiteConfig if available
                if (window.ventrixSiteConfig && window.ventrixSiteConfig.currentSite) {
                    const currentSite = window.ventrixSiteConfig.currentSite;
                    const allowedSites = ['edumed', 'psd', 'omd', 'phd', 'oc'];
                    
                    if (allowedSites.includes(currentSite)) {
                        const testimonialCards = document.querySelectorAll('.testimonial-card');
                        testimonialCards.forEach(card => {
                            allowedSites.forEach(site => {
                                card.classList.remove(`testimonial-card--${site}`);
                            });
                            card.classList.add(`testimonial-card--${currentSite}`);
                        });
                        console.log(`Ventrix: Updated using fallback config to ${currentSite}`);
                    }
                }
            });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateTestimonialCardClasses);
    } else {
        updateTestimonialCardClasses();
    }
    
    // Also run when page is fully loaded (for dynamic content)
    window.addEventListener('load', updateTestimonialCardClasses);
    
    // Run when ACF fields are updated (if ACF is available)
    if (typeof acf !== 'undefined' && acf.addAction) {
        acf.addAction('ready', updateTestimonialCardClasses);
        acf.addAction('change', updateTestimonialCardClasses);
    }
    
    // Expose function globally for manual testing
    window.ventrixUpdateTestimonialCards = updateTestimonialCardClasses;
})();
