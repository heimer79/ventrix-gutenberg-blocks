import { __ } from '@wordpress/i18n';

/**
 * ventrix-multipurpose-card.js
 * – Calculates the collapsed height (up to “Cost”)
 * – Smooth open/close animation
 * – Delegated listener: only the button
 * – Scroll on mobile only when collapsing (offset –10 px)
 * – **FIX**: a resize (e.g. hiding/showing browser bar) no longer
 *            collapses a card that was open → stays consistent
 */
(() => {
    /* ╭───────────────── 1. Collapsed heights ─────────────────╮ */
    const setInitialHeights = () => {
        document
            .querySelectorAll('.ventrix-multipurpose-card-block.has-view-more')
            .forEach(card => {
                const inner = card.querySelector('.wp-block-inner');
                if (!inner) return;

                /* (a) locate “Cost” */
                const costEl = [...inner.querySelectorAll('p, li')]
                    .find(el => el.textContent.trim().toLowerCase().startsWith('cost'));
                if (!costEl) return;

                /* (b) calculate collapsed height */
                const next = costEl.nextElementSibling;
                const mt   = next ? parseFloat(getComputedStyle(next).marginTop) || 0 : 0;
                const collapsed =
                    (next ? next.offsetTop - mt : costEl.offsetTop + costEl.offsetHeight) - 25;

                /* (c) save the new value */
                inner.dataset.collapsed = collapsed;

                /* (d) apply only if the card was ALREADY collapsed */
                if (!inner.classList.contains('expanded')) {
                    inner.style.maxHeight = `${Math.max(collapsed, 0)}px`;
                }
                /* if it was open, leave maxHeight:'none' and don't touch the button */
            });
    };

    /* Run on load (or immediately if already loaded) */
    if (document.readyState !== 'loading') {
        setInitialHeights();
    } else {
        window.addEventListener('DOMContentLoaded', setInitialHeights);
    }
    window.addEventListener('resize', setInitialHeights);

    /* ╭───────────────── 2. Toggle with delegation ─────────────╮ */
    document.addEventListener('click', e => {
        const btn = e.target.closest('.view-more-button');
        if (!btn) return; // click outside the button ⇒ ignore

        const card  = btn.closest('.ventrix-multipurpose-card-block');
        const inner = card?.querySelector('.wp-block-inner');
        if (!inner) return;

        const collapsed = +inner.dataset.collapsed || 0;
        const wasOpen   = inner.classList.contains('expanded'); // true = open

        /* starting point */
        inner.style.maxHeight = wasOpen
            ? `${inner.scrollHeight}px`
            : `${collapsed}px`;
        inner.offsetHeight; // reflow

        /* destination */
        inner.style.maxHeight = wasOpen
            ? `${collapsed}px`
            : `${inner.scrollHeight}px`;

        /* text / icon */
        const txt  = btn.querySelector('.view-more-text');
        const icon = btn.querySelector('.view-more-icon');
        if (wasOpen) {
            txt.textContent = 'View More';
            icon?.classList.remove('rotate');
        } else {
            txt.textContent = 'View Less';
            icon?.classList.add('rotate');
        }

        /* cleanup + scroll on mobile (only when collapsing) */
        inner.addEventListener(
            'transitionend',
            function handler(ev) {
                if (ev.propertyName !== 'max-height') return;
                this.removeEventListener('transitionend', handler, true);

                if (wasOpen) {
                    /* just CLOSED */
                    this.classList.remove('expanded');

                    if (window.matchMedia('(max-width: 768px)').matches) {
                        const { top } = btn.getBoundingClientRect();
                        window.scrollTo({
                            top: window.pageYOffset + top - 75,
                            behavior: 'auto',
                        });
                    }
                } else {
                    /* just OPENED */
                    this.classList.add('expanded');
                    this.style.maxHeight = 'none';
                }
            },
            { once: true, capture: true },
        );
    });
})();