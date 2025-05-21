import { __ } from '@wordpress/i18n';

/**
 * ventrix-multipurpose-card.js
 *  – Dynamic collapsed height (up to “Cost”)
 *  – Smooth open and close
 *  – Safe listeners per card
 *  – All cards start collapsed
 *  – Auto-scroll on mobile only when collapsing (with offset –10 px)
 */
(() => {
    /* ╭───────────────── 1. Calculate collapsed heights ─────────────────╮ */
    const setInitialHeights = () => {
        document
            .querySelectorAll('.ventrix-multipurpose-card-block.has-view-more')
            .forEach(card => {
                const inner = card.querySelector('.wp-block-inner');
                if (!inner) return;

                // ① Locate “Cost”
                const costEl = [...inner.querySelectorAll('p, li')]
                    .find(el => el.textContent.trim().toLowerCase().startsWith('cost'));
                if (!costEl) return;

                // ② Height just before the next sibling's margin-top
                const next = costEl.nextElementSibling;
                const mt   = next ? parseFloat(getComputedStyle(next).marginTop) || 0 : 0;
                const collapsed =
                    (next ? next.offsetTop - mt : costEl.offsetTop + costEl.offsetHeight) - 25;

                // ③ Save + apply closed state
                inner.dataset.collapsed = collapsed;
                inner.style.maxHeight   = `${collapsed}px`;
                inner.classList.remove('expanded');
            });
    };

    if (document.readyState !== 'loading') {
        setInitialHeights();
    } else {
        window.addEventListener('DOMContentLoaded', setInitialHeights);
    }
    window.addEventListener('resize', setInitialHeights);

    /* ╭───────────────── 2. Toggle with smooth animation ─────────────────╮ */
    document.addEventListener('click', e => {
        const btn = e.target.closest('.view-more-button');
        if (!btn) return;

        const card  = btn.closest('.ventrix-multipurpose-card-block');
        const inner = card?.querySelector('.wp-block-inner');
        if (!inner) return;

        const collapsed = +inner.dataset.collapsed;
        const wasOpen   = inner.classList.contains('expanded'); // true → was open (View Less)

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

        /* transition cleanup + scroll */
        inner.addEventListener(
            'transitionend',
            function handler(ev) {
                if (ev.propertyName !== 'max-height') return;
                this.removeEventListener('transitionend', handler, true);

                if (wasOpen) {
                    /* ── CLOSED (View Less → View More) ── */
                    this.classList.remove('expanded');

                    /* Auto-scroll on mobile with offset –10 px */
                    if (window.matchMedia('(max-width: 768px)').matches) {
                        setTimeout(() => {
                            const { top } = btn.getBoundingClientRect();
                            const target  = window.pageYOffset + top - 75;
                            window.scrollTo({ top: target, behavior: 'smooth' });
                        }, 40);
                    }
                } else {
                    /* ── OPENED (View More → View Less) ── */
                    this.classList.add('expanded');
                    this.style.maxHeight = 'none';
                    /* No scroll when expanding */
                }
            },
            { once: true, capture: true }
        );
    });
})();
