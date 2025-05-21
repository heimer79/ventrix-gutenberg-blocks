import { __ } from '@wordpress/i18n';


/**
 * ventrix-multipurpose-card.js
 *  – Dynamic collapsed height (up to “Cost”)
 *  – Smooth open and close
 *  – Safe listeners per card
 *  – All cards start collapsed
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

                // ③ Save in dataset + apply closed state
                inner.dataset.collapsed = collapsed;
                inner.style.maxHeight   = `${collapsed}px`;
                inner.classList.remove('expanded'); // in case a resize occurs after opening
            });
    };

    window.addEventListener('DOMContentLoaded', setInitialHeights);
    window.addEventListener('resize',         setInitialHeights);

    /* ╭───────────────── 2. Toggle with smooth animation ─────────────────╮ */
    document.addEventListener('click', e => {
        const btn = e.target.closest('.view-more-button');
        if (!btn) return;

        const card  = btn.closest('.ventrix-multipurpose-card-block');
        const inner = card?.querySelector('.wp-block-inner');
        if (!inner) return;

        const collapsed = +inner.dataset.collapsed;
        const openNow   = inner.classList.contains('expanded');

        /* starting point → force current value */
        inner.style.maxHeight = openNow
            ? `${inner.scrollHeight}px`
            : `${collapsed}px`;

        /* reflow */
        inner.offsetHeight;

        /* destination value */
        inner.style.maxHeight = openNow
            ? `${collapsed}px`
            : `${inner.scrollHeight}px`;

        /* text / icon */
        const txt  = btn.querySelector('.view-more-text');
        const icon = btn.querySelector('.view-more-icon');

        if (openNow) {
            txt.textContent = 'View More';
            icon?.classList.remove('rotate');
        } else {
            txt.textContent = 'View Less';
            icon?.classList.add('rotate');
        }

        /* Unique listener to clear inline style when left open */
        inner.addEventListener('transitionend', function handler (ev) {
            if (ev.propertyName !== 'max-height') return;
            this.removeEventListener('transitionend', handler, true);

            if (openNow) {
                // closed → open? no, it was the other way, so do nothing
                this.classList.remove('expanded');
            } else {
                // open → stays open: let it grow freely
                this.classList.add('expanded');
                this.style.maxHeight = 'none';
            }
        }, { once: true, capture: true });
    });
})();
