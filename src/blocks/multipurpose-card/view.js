/*
 * ventrix-multipurpose-card.js — v2
 * ────────────────────────────────────────────────────────────
 * • Applies requested improvements:
 *      – throttled resize recalculation
 *      – robust Number() conversion for dataset values
 *      – optional data‑attribute anchor instead of hard‑coded text
 *      – removes "magic" 25 px into a constant
 *      – basic a11y (aria‑expanded / aria-hidden)
 *      – scrolls back to the <h3> when collapsing on mobile
 *      – uses character count for text truncation with ellipsis
 */
(() => {
    /* ╭────────────── 0. Config — tweak if needed ─────────────╮ */
    const SAFE_PADDING = 25;            // px trimmed at the bottom edge
    const THROTTLE_MS  = 120;           // resize debounce
    const MOBILE_QUERY = '(max-width: 768px)';
    const MAX_CHARS = 700;              // maximum characters before truncation

    // IMMEDIATE Google detection - execute before anything else
    (function() {
        // Detect if user comes from Google (any domain)
        function isFromGoogle() {
            const referrer = document.referrer;
            // Detect any domain that contains 'google' before the first dot
            return referrer.includes('google') && 
                   (referrer.includes('google.com') || 
                    referrer.includes('google.co.') || 
                    referrer.includes('google.'));
        }

        // Function to completely disable collapse
        function disableViewMoreForGoogle() {
            console.log('User comes from Google - Disabling collapse...');
            
            const cards = document.querySelectorAll('.ventrix-multipurpose-card-block.has-view-more');
            
            cards.forEach(card => {
                // Remove has-view-more class
                card.classList.remove('has-view-more');
                
                // Expand content
                const inner = card.querySelector('.wp-block-inner');
                if (inner) {
                    inner.classList.add('expanded');
                    inner.style.maxHeight = 'none';
                    inner.removeAttribute('aria-hidden');
                }
                
                // Hide View More button (don't show it for Google users)
                const btn = card.querySelector('.view-more-button');
                if (btn) {
                    btn.style.display = 'none';
                    // Don't add js-enabled class for Google users
                }
            });
            
            console.log('Collapse disabled in', cards.length, 'cards');
        }

        // Execute immediately if comes from Google
        if (isFromGoogle()) {
            console.log('🚨 User detected from Google - Applying special configuration');
            
            // Execute immediately if DOM is ready
            if (document.readyState !== 'loading') {
                disableViewMoreForGoogle();
            } else {
                // Execute as soon as DOM is ready
                document.addEventListener('DOMContentLoaded', disableViewMoreForGoogle, { once: true });
            }
            
            // Also execute after a small delay to catch any late-rendered elements
            setTimeout(disableViewMoreForGoogle, 100);
        }
    })();

    /* ╭────────────── 1. Helpers ──────────────────────────────╮ */
    /**
     * Truncate HTML content and add ellipsis if needed, preserving HTML tags
     * @param {string} html
     * @param {number} maxLength
     * @returns {string}
     */
    const truncateText = (html, maxLength) => {
        if (html.length <= maxLength) return html;
        
        // Truncate HTML at exactly the character limit, preserving HTML tags
        // No ellipsis added - just cut at the limit
        return html.slice(0, maxLength).trim();
    };

    /**
     * Calculate the collapsed height for one inner container.
     * @param  {HTMLElement} inner
     * @return {number}
     */
    const getCollapsedHeight = (inner) => {
        // First priority: look for cost text
        const costEl = inner.querySelector('[data-cost-anchor]') ||
            [...inner.querySelectorAll('p, li')]
                .find(el => el.textContent.trim().toLowerCase().startsWith('cost'));
        
        // If cost element exists, use it
        if (costEl) {
            const next = costEl.nextElementSibling;
            const mt   = next ? parseFloat(getComputedStyle(next).marginTop) || 0 : 0;
            const collapsed = (next ? next.offsetTop - mt : costEl.offsetTop + costEl.offsetHeight) - SAFE_PADDING;
            return Math.max(collapsed, 0);
        }

        // Second priority: use character count
        let totalChars = 0;
        let lastElement = null;
        let currentElement = inner.firstElementChild;
        let elementsToTruncate = [];

        // Count characters from all text elements and identify which ones need truncation
        while (currentElement && totalChars < MAX_CHARS) {
            if (currentElement.textContent) {
                const elementChars = currentElement.textContent.trim().length;
                totalChars += elementChars;
                
                // If we're approaching the limit, mark this element for potential truncation
                if (totalChars > MAX_CHARS) {
                    elementsToTruncate.push({
                        element: currentElement,
                        originalText: currentElement.innerHTML,
                        excessChars: totalChars - MAX_CHARS
                    });
                }
            }
            lastElement = currentElement;
            currentElement = currentElement.nextElementSibling;
        }

        if (!lastElement) return 0;

        // If we have elements that exceed the limit, apply truncation
        if (elementsToTruncate.length > 0) {
            // Store original HTML for all elements that need truncation
            elementsToTruncate.forEach(({ element, originalText }) => {
                element.dataset.originalText = originalText;
            });
            
            // Apply truncation to the first element that exceeds the limit
            const firstExcessElement = elementsToTruncate[0];
            const htmlContent = firstExcessElement.originalText;
            const truncatedHtml = truncateText(htmlContent, MAX_CHARS - (totalChars - firstExcessElement.excessChars));
            firstExcessElement.element.innerHTML = truncatedHtml;
        }

        const collapsed = lastElement.offsetTop + lastElement.offsetHeight - SAFE_PADDING;
        return Math.max(collapsed, 0);
    };

    /** Recalculate heights for every card */
    const setInitialHeights = () => {
        // Check if user comes from Google before applying collapse
        const isFromGoogle = () => {
            const referrer = document.referrer;
            return referrer.includes('google') && 
                   (referrer.includes('google.com') || 
                    referrer.includes('google.co.') || 
                    referrer.includes('google.'));
        };

        const cards = document.querySelectorAll('.ventrix-multipurpose-card-block.has-view-more');
        
        cards.forEach(card => {
            const inner = card.querySelector('.wp-block-inner');
            const btn = card.querySelector('.view-more-button');
            
            if (!inner) return;

            // Handle buttons based on user source only
            if (btn) {
                if (isFromGoogle()) {
                    // Hide button for Google users
                    btn.style.display = 'none';
                } else {
                    // Show button for non-Google users (always show if user enabled it)
                    btn.classList.add('js-enabled');
                }
            }

            // If user comes from Google, don't apply collapse
            if (isFromGoogle()) {
                console.log('User from Google detected in setInitialHeights - Skipping collapse');
                return;
            }

            // For non-Google users, apply collapse logic
            const collapsed = getCollapsedHeight(inner);
            inner.dataset.collapsed = String(collapsed);

            if (!inner.classList.contains('expanded')) {
                // Apply collapsed height and styling
                inner.style.maxHeight = `${collapsed}px`;
                inner.setAttribute('aria-hidden', 'true');
            }
        });
    };

    /* ╭────────────── 2. Init & responsive recalculation ──────╮ */
    if (document.readyState !== 'loading') {
        setInitialHeights();
    } else {
        window.addEventListener('DOMContentLoaded', setInitialHeights);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setInitialHeights, THROTTLE_MS);
    });

    /* ╭────────────── 3. Toggle (event delegation) ────────────╮ */
    
    // Simple click event handler
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.view-more-button');
        if (!btn) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const card  = btn.closest('.ventrix-multipurpose-card-block');
        const inner = card?.querySelector('.wp-block-inner');
        if (!inner) return;

        const collapsed = Number(inner.dataset.collapsed ?? 0);
        const wasOpen = inner.classList.contains('expanded');

        /* a11y */
        btn.setAttribute('aria-expanded', String(!wasOpen));

        if (wasOpen) {
            /* CLOSING */
            inner.style.maxHeight = `${collapsed}px`;
            inner.classList.remove('expanded');
            inner.setAttribute('aria-hidden', 'true');
            
            /* Button label + icon */
            const txt = btn.querySelector('.view-more-text');
            const icon = btn.querySelector('.view-more-icon');
            txt.textContent = 'View More';
            icon?.classList.remove('rotate');
            
            // Scroll to the card heading when closing (both mobile and desktop)
            const heading = card.querySelector('h3.wp-block-heading');
            const anchor = heading || btn; // fallback to button
            const { top } = anchor.getBoundingClientRect();
            window.scrollTo({
                top: window.pageYOffset + top - 75,
                behavior: 'auto',
            });
            
        } else {
            /* OPENING */
            inner.style.maxHeight = `${inner.scrollHeight}px`;
            inner.classList.add('expanded');
            inner.removeAttribute('aria-hidden');
            
            /* Button label + icon */
            const txt = btn.querySelector('.view-more-text');
            const icon = btn.querySelector('.view-more-icon');
            txt.textContent = 'View Less';
            icon?.classList.add('rotate');
            
            // Restore original text for all elements that were truncated
            inner.querySelectorAll('[data-original-text]').forEach(el => {
                el.innerHTML = el.dataset.originalText;
                delete el.dataset.originalText;
            });
            
            // Set to none after a brief delay to allow transition
            setTimeout(() => {
                if (inner.classList.contains('expanded')) {
                    inner.style.maxHeight = 'none';
                }
            }, 300);
        }
    });

    // Touch events for iOS compatibility
    document.addEventListener('touchstart', (e) => {
        const btn = e.target.closest('.view-more-button');
        if (btn) {
            e.preventDefault();
            btn.style.opacity = '0.7';
        }
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
        const btn = e.target.closest('.view-more-button');
        if (btn) {
            btn.style.opacity = '1';
            // Trigger click event
            btn.click();
        }
    });
})();
