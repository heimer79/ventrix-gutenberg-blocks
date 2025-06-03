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
 */
(() => {
    /* ╭────────────── 0. Config — tweak if needed ─────────────╮ */
    const SAFE_PADDING = 25;            // px trimmed at the bottom edge
    const THROTTLE_MS  = 120;           // resize debounce
    const MOBILE_QUERY = '(max-width: 768px)';

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

        // Second priority: use first paragraph if no cost element found
        const firstP = inner.querySelector('p');
        if (!firstP) return 0;

        const next = firstP.nextElementSibling;
        const mt   = next ? parseFloat(getComputedStyle(next).marginTop) || 0 : 0;
        const collapsed = (next ? next.offsetTop - mt : firstP.offsetTop + firstP.offsetHeight) - SAFE_PADDING;
        return Math.max(collapsed, 0);
    };

    /** Recalculate heights for every card */
    const setInitialHeights = () => {
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
            }
        }, { once: true, capture: true });
    });
})();
