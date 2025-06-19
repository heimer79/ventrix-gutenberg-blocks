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
                
                // Hide View More button
                const btn = card.querySelector('.view-more-button');
                if (btn) {
                    btn.style.display = 'none';
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
     * Truncate text and add ellipsis if needed
     * @param {string} text
     * @param {number} maxLength
     * @returns {string}
     */
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trim() + '...';
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

        while (currentElement && totalChars < MAX_CHARS) {
            if (currentElement.textContent) {
                totalChars += currentElement.textContent.length;
            }
            lastElement = currentElement;
            currentElement = currentElement.nextElementSibling;
        }

        if (!lastElement) return 0;

        // Store original text and add ellipsis if needed
        if (totalChars > MAX_CHARS) {
            const originalText = lastElement.textContent;
            lastElement.dataset.originalText = originalText;
            lastElement.textContent = truncateText(originalText, MAX_CHARS - (totalChars - originalText.length));
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

        // If user comes from Google, don't apply collapse
        if (isFromGoogle()) {
            console.log('User from Google detected in setInitialHeights - Skipping collapse');
            return;
        }

        document.querySelectorAll('.ventrix-multipurpose-card-block.has-view-more')
            .forEach(card => {
                const inner = card.querySelector('.wp-block-inner');
                if (!inner) return;

                const collapsed = getCollapsedHeight(inner);
                inner.dataset.collapsed = String(collapsed);

                if (!inner.classList.contains('expanded')) {
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
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.view-more-button');
        if (!btn) return; // click outside → ignore

        const card  = btn.closest('.ventrix-multipurpose-card-block');
        const inner = card?.querySelector('.wp-block-inner');
        if (!inner) return;

        const collapsed = Number(inner.dataset.collapsed ?? 0);
        const wasOpen   = inner.classList.contains('expanded');

        /* a11y */
        btn.setAttribute('aria-expanded', String(!wasOpen));

        /* Starting point → forces reflow before transition */
        inner.style.maxHeight = wasOpen ? `${inner.scrollHeight}px` : `${collapsed}px`;
        inner.offsetHeight; // reflow

        /* Destination */
        inner.style.maxHeight = wasOpen ? `${collapsed}px` : `${inner.scrollHeight}px`;

        /* Button label + icon */
        const txt  = btn.querySelector('.view-more-text');
        const icon = btn.querySelector('.view-more-icon');
        if (wasOpen) {
            txt.textContent = 'View More';
            icon?.classList.remove('rotate');
        } else {
            txt.textContent = 'View Less';
            icon?.classList.add('rotate');
        }

        /* ─── Wait for the transition to finish ─── */
        inner.addEventListener('transitionend', function handler(ev) {
            if (ev.propertyName !== 'max-height') return;
            this.removeEventListener('transitionend', handler, true);

            if (wasOpen) {
                /* just CLOSED */
                this.classList.remove('expanded');
                this.setAttribute('aria-hidden', 'true');

                if (window.matchMedia(MOBILE_QUERY).matches) {
                    // Scroll so that the card heading is visible
                    const heading = card.querySelector('h3.wp-block-heading');
                    const anchor  = heading || btn; // fallback to button
                    const { top } = anchor.getBoundingClientRect();
                    window.scrollTo({
                        top: window.pageYOffset + top - 75,
                        behavior: 'auto',
                    });
                }
            } else {
                /* just OPENED */
                this.classList.add('expanded');
                this.removeAttribute('aria-hidden');
                this.style.maxHeight = 'none';

                // Restore original text for all elements that were truncated
                this.querySelectorAll('[data-original-text]').forEach(el => {
                    el.textContent = el.dataset.originalText;
                    delete el.dataset.originalText;
                });
            }
        }, { once: true, capture: true });
    });
})();
