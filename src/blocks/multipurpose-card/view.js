/*
 * ventrix-multipurpose-card.js — v2.6
 * ────────────────────────────────────────────────────────────
 * • Applies requested improvements:
 *      – CSS-first collapsed state (600px desktop, 550px mobile)
 *      – JS refines CSS height to exact calculated value
 *      – throttled resize recalculation
 *      – robust Number() conversion for dataset values
 *      – optional data‑attribute anchor instead of hard‑coded text
 *      – removes "magic" 25 px into a constant
 *      – basic a11y (aria‑expanded / aria-hidden)
 *      – scrolls back to the <h3> when collapsing on mobile
 *      – enhanced detection for text fragments, Google referrer, and 'frag' param
 *      – disables collapse when accessed via text fragment/Google/special param
 *      – Safari iOS optimizations for button hiding and multiple execution strategies
 */
(() => {
    /* ╭────────────── 0. Config — tweak if needed ─────────────╮ */
    const SAFE_PADDING = 25;            // px trimmed at the bottom edge
    const THROTTLE_MS  = 120;           // resize debounce
    const MOBILE_QUERY = '(max-width: 768px)';

    // Check for multiple conditions that should disable collapse
    const SHOULD_DISABLE_COLLAPSE = (() => {
        try {
            // 1. Check if accessed via text fragment (Performance API)
            let hasFragmentInPerf = false;
            if (window.performance && typeof performance.getEntriesByType === 'function') {
                const entries = performance.getEntriesByType('navigation');
                hasFragmentInPerf = entries.length > 0 && entries[0].name && entries[0].name.includes(':~:text=');
            }
            
            // 2. Check if comes from Google (multiple variations for Safari iOS)
            const referrer = document.referrer || '';
            const fromGoogle = referrer.toLowerCase().includes('google.') || 
                             referrer.toLowerCase().includes('google.com') ||
                             referrer.toLowerCase().includes('google.es') ||
                             referrer.toLowerCase().includes('google.mx');
            
            // 3. Check if has 'frag' query parameter
            let hasQueryFrag = false;
            try {
                hasQueryFrag = new URLSearchParams(window.location.search).has('frag');
            } catch (e) {
                // Fallback for older browsers
                hasQueryFrag = window.location.search.includes('frag');
            }
            
            // 4. Check URL hash for text fragment (Safari iOS fallback)
            const hasTextFragmentInHash = window.location.hash && window.location.hash.includes(':~:text=');
            
            // Log detection for debugging (especially useful for Safari iOS)
            const result = hasFragmentInPerf || fromGoogle || hasQueryFrag || hasTextFragmentInHash;
            if (result) {
                console.log('🔍 Detection details:', {
                    hasFragmentInPerf,
                    fromGoogle,
                    hasQueryFrag,
                    hasTextFragmentInHash,
                    referrer: referrer.substring(0, 50),
                    userAgent: navigator.userAgent.substring(0, 50)
                });
            }
            
            return result;
        } catch (e) {
            console.error('Error in collapse detection:', e);
            return false; // In case of security restrictions or API not available
        }
    })();

    // IMMEDIATE detection - execute before anything else
    (function() {
        // Function to completely disable collapse
        function disableViewMoreForSpecialAccess() {
            console.log('Probable acceso con text fragment o desde Google - Disabling collapse...');
            
            const cards = document.querySelectorAll('.ventrix-multipurpose-card-block.has-view-more');
            
            if (cards.length === 0) {
                console.log('No cards found to disable collapse.');
                return false; // Return false to indicate no cards were processed
            }

            let processedCount = 0;
            cards.forEach((card, index) => {
                try {
                    console.log(`Processing card ${index + 1}/${cards.length}`);
                    
                    // Remove has-view-more class
                    card.classList.remove('has-view-more');
                    
                    // Expand content
                    const inner = card.querySelector('.wp-block-inner');
                    if (inner) {
                        inner.classList.add('expanded');
                        inner.style.maxHeight = 'none';
                        inner.style.height = 'auto'; // Safari iOS fix
                        inner.removeAttribute('aria-hidden');
                        console.log(`  ✓ Content expanded for card ${index + 1}`);
                    } else {
                        console.warn(`  ⚠️ No .wp-block-inner found in card ${index + 1}`);
                    }
                    
                    // Hide View More button - multiple strategies for Safari iOS
                    const btn = card.querySelector('.view-more-button');
                    if (btn) {
                        btn.style.display = 'none';
                        btn.style.visibility = 'hidden'; // Extra Safari iOS fix
                        btn.setAttribute('aria-hidden', 'true');
                        // Remove js-enabled class if it exists
                        btn.classList.remove('js-enabled');
                        console.log(`  ✓ Button hidden for card ${index + 1}`);
                    } else {
                        console.warn(`  ⚠️ No .view-more-button found in card ${index + 1}`);
                    }
                    
                    processedCount++;
                } catch (e) {
                    console.error(`Error processing card ${index + 1}:`, e);
                }
            });
            
            console.log(`✅ Collapse disabled in ${processedCount}/${cards.length} cards`);
            return true; // Return true to indicate cards were processed
        }

        // Execute immediately if any condition is met
        if (SHOULD_DISABLE_COLLAPSE) {
            console.log('🚨 Special access detected (text fragment/Google/frag param) - Disabling collapse');
            
            const runDisable = () => {
                // Try to disable multiple times to catch late-rendered elements
                // Safari iOS needs more attempts due to rendering timing
                let attempts = 0;
                const maxAttempts = 10; // Increased for Safari iOS
                const interval = 150; // Shorter interval for faster response

                function attemptDisable() {
                    attempts++;
                    const cards = document.querySelectorAll('.ventrix-multipurpose-card-block.has-view-more');
                    
                    if (cards.length > 0) {
                        console.log(`✅ Found ${cards.length} cards on attempt ${attempts}, disabling...`);
                        disableViewMoreForSpecialAccess();
                        // Continue trying a few more times to catch any lazy-loaded cards
                        if (attempts < 3) {
                            setTimeout(attemptDisable, interval);
                        }
                    } else if (attempts < maxAttempts) {
                        console.log(`🔄 Attempt ${attempts}: No cards found yet, retrying...`);
                        setTimeout(attemptDisable, interval);
                    } else {
                        console.log('⚠️ Max attempts reached, no cards found');
                    }
                }
                attemptDisable();
            };

            // Multiple execution strategies for Safari iOS
            // 1. Execute immediately (works if script loads late)
            runDisable();
            
            // 2. DOMContentLoaded (standard)
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', runDisable, { once: true });
            }
            
            // 3. window.load (for Safari iOS - ensures all resources loaded)
            window.addEventListener('load', () => {
                console.log('🍎 Window loaded - running final disable check for Safari iOS');
                setTimeout(runDisable, 100);
            }, { once: true });
        }
    })();

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
            // Use the global SHOULD_DISABLE_COLLAPSE check
            const collapsed = SHOULD_DISABLE_COLLAPSE ? null : getCollapsedHeight(inner);

            updates.push({ card, inner, btn, wasExpanded, collapsed });
        });

        // Phase 2: WRITES (batch DOM writes to minimize reflows)
        requestAnimationFrame(() => {
            updates.forEach(({ inner, btn, wasExpanded, collapsed }) => {
                // Handle buttons based on special access detection
                if (btn) {
                    if (SHOULD_DISABLE_COLLAPSE) {
                        // Hide button for special access (text fragment/Google/frag param)
                        btn.style.display = 'none';
                    } else {
                        // Show button for normal users
                        btn.classList.add('js-enabled');
                    }
                }

                // If special access detected, don't apply collapse
                if (SHOULD_DISABLE_COLLAPSE) {
                    return;
                }

                // For normal users, apply collapsed height and styling
                // CSS already provides initial collapsed state (600px desktop, 550px mobile)
                // JS refines it to the exact calculated height
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
