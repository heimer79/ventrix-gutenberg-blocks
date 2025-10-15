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


    // Detect if user comes from Google (any domain)
    function isFromGoogle() {
        const referrer = document.referrer;
        // Detect any domain that contains 'google'
        return referrer.includes('google');
    }

    // Function to completely disable collapse
    function disableViewMoreForGoogle() {
        console.log('User comes from Google - Disabling collapse...');
        
        const cards = document.querySelectorAll('.ventrix-multipurpose-card-block.has-view-more');
        
        cards.forEach(card => {
            // Remove has-view-more class to prevent other scripts from acting on it
            card.classList.remove('has-view-more');
            
            // Expand content
            const inner = card.querySelector('.wp-block-inner');
            if (inner) {
                inner.style.maxHeight = 'none'; // Expand fully
                inner.classList.add('expanded');
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

    // IMMEDIATE Google detection - execute before anything else
    if (isFromGoogle()) {
        console.log('🚨 User detected from Google - Applying special configuration');
        
        // If from Google, disable the feature and do nothing else.
        if (document.readyState !== 'loading') {
            disableViewMoreForGoogle();
        } else {
            document.addEventListener('DOMContentLoaded', disableViewMoreForGoogle, { once: true });
        }
        // Also execute after a small delay to catch any late-rendered elements
        setTimeout(disableViewMoreForGoogle, 100);

        // Stop further execution of this script for Google users.
        return;
    }


    /* ╭────────────── 1. Helpers ──────────────────────────────╮ */




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

        // Default: use a reasonable collapsed height (e.g., first 3-4 paragraphs)
        const elements = inner.children;
        let collapsedHeight = 0;
        let visibleElements = 0;
        const maxVisibleElements = 3; // Show first 3 elements when collapsed

        for (let i = 0; i < elements.length && visibleElements < maxVisibleElements; i++) {
            const element = elements[i];
            collapsedHeight = element.offsetTop + element.offsetHeight;
            visibleElements++;
        }

        return Math.max(collapsedHeight - SAFE_PADDING, 200); // Minimum 200px
    };

    /** Recalculate heights for every card */
    const setInitialHeights = () => {
        const cards = document.querySelectorAll('.ventrix-multipurpose-card-block.has-view-more');

        // Phase 1: READS (compute collapsed heights and state without writing)
        const updates = [];
        cards.forEach(card => {
            const inner = card.querySelector('.wp-block-inner');
            const btn = card.querySelector('.view-more-button');
            if (!inner) return;

            const wasExpanded = inner.classList.contains('expanded');
            const collapsed = getCollapsedHeight(inner);

            updates.push({ card, inner, btn, wasExpanded, collapsed });
        });

        // Phase 2: WRITES (batch DOM writes to minimize reflows)
        requestAnimationFrame(() => {
            updates.forEach(({ inner, btn, wasExpanded, collapsed }) => {
                // Show button for non-Google users
                if (btn) {
                    btn.classList.add('js-enabled');
                }

                // Apply collapsed height and styling
                inner.dataset.collapsed = String(collapsed);
                if (!wasExpanded) {
                    inner.style.maxHeight = `${collapsed}px`;
                    inner.setAttribute('aria-hidden', 'true');
                }
            });
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
            // First set current height to enable smooth transition
            inner.style.maxHeight = `${inner.scrollHeight}px`;
            
            // Force a reflow to apply the height
            inner.offsetHeight;
            
            // Then animate to collapsed height
            requestAnimationFrame(() => {
                inner.style.maxHeight = `${collapsed}px`;
                inner.classList.remove('expanded');
                inner.setAttribute('aria-hidden', 'true');
            });
            
            /* Button label + icon */
            const txt = btn.querySelector('.view-more-text');
            const icon = btn.querySelector('.view-more-icon');
            txt.textContent = 'View More';
            icon?.classList.remove('rotate');
            
            // Scroll to the card heading when closing (mobile only)
            const isMobile = window.matchMedia(MOBILE_QUERY).matches;
            if (isMobile) {
                const heading = card.querySelector('h3.wp-block-heading');
                const anchor = heading || btn; // fallback to button
                const { top } = anchor.getBoundingClientRect();
                window.scrollTo({
                    top: window.pageYOffset + top - 75,
                    behavior: 'smooth',
                });
            }
            
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
            
            // Set to none after transition completes (500ms)
            setTimeout(() => {
                if (inner.classList.contains('expanded')) {
                    inner.style.maxHeight = 'none';
                }
            }, 500);
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
