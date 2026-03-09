/**
 * Rankings 2025 — Front-end JS module.
 *
 * Handles accordion, expand/collapse all, popup, and
 * collapsed-height adjustment for the PSD Rankings 2025 design.
 *
 * Exported entry point: applyRankings2025(block)
 *
 * @see view.js — this module is imported and dispatched from there.
 */

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns true if the viewport is considered "mobile" (≤ 767 px).
 *
 * @returns {boolean}
 */
function isMobileViewport() {
	return window.matchMedia( '(max-width: 767px)' ).matches;
}

// ─── Popup ────────────────────────────────────────────────────────────────────

/**
 * Initialises the "About the Ranking" popup.
 * Returns a cleanup function that removes all added listeners.
 *
 * @param {Element} block - Root block element.
 * @returns {Function|null} Cleanup function, or null if popup elements not found.
 */
function createPopupManager( block ) {
	const aboutButton  = block.querySelector( '.rankings-top-bar--about' );
	const popup        = block.querySelector( '.rankings-popup--widget' );
	const closeButton  = block.querySelector( '.rankings-popup--widget--close' );
	const overlay      = block.querySelector( '.rankings-popup--overlay' );

	if ( ! popup || ! overlay ) return null;

	const showPopup = () => {
		popup.classList.remove( 'hidden' );
		overlay.classList.remove( 'hidden' );
	};

	const hidePopup = () => {
		popup.classList.add( 'hidden' );
		overlay.classList.add( 'hidden' );
	};

	const handleEscapeKey = ( event ) => {
		if ( event.key === 'Escape' ) hidePopup();
	};

	if ( aboutButton ) aboutButton.addEventListener( 'click', showPopup );
	if ( closeButton ) closeButton.addEventListener( 'click', hidePopup );
	overlay.addEventListener( 'click', hidePopup );
	document.addEventListener( 'keydown', handleEscapeKey );

	return () => {
		if ( aboutButton ) aboutButton.removeEventListener( 'click', showPopup );
		if ( closeButton ) closeButton.removeEventListener( 'click', hidePopup );
		overlay.removeEventListener( 'click', hidePopup );
		document.removeEventListener( 'keydown', handleEscapeKey );
	};
}

// ─── Accordion ────────────────────────────────────────────────────────────────

/**
 * Initialises the per-item accordion toggle for the Rankings 2025 layout.
 * Handles different behaviour for mobile vs desktop viewports.
 *
 * @param {Element} block - Root block element.
 */
function initAccordion( block ) {
	const mobile = isMobileViewport();

	block.querySelectorAll( '.rankings-list__left-toggle-btn' ).forEach( ( button ) => {
		const item         = button.closest( '.rankings-list__item' );
		const toggleContent = button.previousElementSibling;
		const rightSection  = item ? item.querySelector( '.rankings-list__right' ) : null;

		button.addEventListener( 'click', function () {
			if ( mobile ) {
				if ( item ) {
					item.classList.toggle( 'collapsed' );

					if ( item.classList.contains( 'collapsed' ) ) {
						const height = item.style.getPropertyValue( '--collapsed-max-height' );
						item.style.maxHeight = height;
					} else {
						item.style.maxHeight = '';
					}
				}

				this.classList.toggle( 'expanded' );
			} else {
				if ( toggleContent ) toggleContent.classList.toggle( 'expanded' );
				this.classList.toggle( 'expanded' );

				if ( rightSection ) {
					rightSection.classList.toggle(
						'collapsed',
						! ( toggleContent && toggleContent.classList.contains( 'expanded' ) )
					);
				}

				if ( item ) {
					item.classList.toggle(
						'collapsed',
						! ( toggleContent && toggleContent.classList.contains( 'expanded' ) )
					);
				}

				this.textContent = ( toggleContent && toggleContent.classList.contains( 'expanded' ) )
					? 'Less'
					: 'More';
			}
		} );
	} );
}

// ─── Expand / Collapse All ───────────────────────────────────────────────────

/**
 * Expands all ranking items.
 *
 * @param {Element} block  - Root block element.
 * @param {boolean} mobile - Whether the viewport is currently mobile-sized.
 */
function expandAllItems( block, mobile ) {
	block.querySelectorAll( '.rankings-list__item .rankings-list__item--hidden' ).forEach( ( el ) => {
		el.classList.remove( 'hidden' );
	} );

	if ( mobile ) {
		block.querySelectorAll( '.rankings-list__left-toggle-btn' ).forEach( ( button ) => {
			button.classList.add( 'expanded' );
			const item = button.closest( '.rankings-list__item' );
			if ( item ) {
				item.classList.remove( 'collapsed' );
				item.style.maxHeight = '';
			}
		} );
	} else {
		block.querySelectorAll( '.rankings-list__left-toggle' ).forEach( ( toggleContent ) => {
			toggleContent.classList.add( 'expanded' );
		} );

		block.querySelectorAll( '.rankings-list__left-toggle-btn' ).forEach( ( button ) => {
			button.classList.add( 'expanded' );
			button.textContent = 'Less';
		} );

		block.querySelectorAll( '.rankings-list__right' ).forEach( ( rightSection ) => {
			rightSection.classList.remove( 'collapsed' );
		} );
	}

	block.querySelectorAll( '.rankings-list__item' ).forEach( ( item ) => {
		item.classList.remove( 'collapsed' );
		if ( mobile ) item.style.maxHeight = '';
	} );
}

/**
 * Collapses all ranking items.
 *
 * @param {Element} block  - Root block element.
 * @param {boolean} mobile - Whether the viewport is currently mobile-sized.
 */
function collapseAllItems( block, mobile ) {
	block.querySelectorAll( '.rankings-list__item .rankings-list__item--hidden' ).forEach( ( el ) => {
		el.classList.add( 'hidden' );
	} );

	if ( mobile ) {
		block.querySelectorAll( '.rankings-list__left-toggle-btn' ).forEach( ( button ) => {
			button.classList.remove( 'expanded' );
			const item = button.closest( '.rankings-list__item' );
			if ( item ) {
				item.classList.add( 'collapsed' );
				const height = item.style.getPropertyValue( '--collapsed-max-height' );
				item.style.maxHeight = height;
			}
		} );
	} else {
		block.querySelectorAll( '.rankings-list__left-toggle' ).forEach( ( toggleContent ) => {
			toggleContent.classList.remove( 'expanded' );
		} );

		block.querySelectorAll( '.rankings-list__left-toggle-btn' ).forEach( ( button ) => {
			button.classList.remove( 'expanded' );
			button.textContent = 'More';
		} );

		block.querySelectorAll( '.rankings-list__right' ).forEach( ( rightSection ) => {
			rightSection.classList.add( 'collapsed' );
		} );
	}

	block.querySelectorAll( '.rankings-list__item' ).forEach( ( item ) => {
		item.classList.add( 'collapsed' );
		if ( mobile ) {
			const height = item.style.getPropertyValue( '--collapsed-max-height' );
			item.style.maxHeight = height;
		}
	} );
}

/**
 * Syncs the active / inactive visual state of Expand All / Collapse All buttons.
 *
 * @param {Element} expandButton   - The "Expand All" button element.
 * @param {Element} collapseButton - The "Collapse All" button element.
 * @param {boolean} isExpanded     - Whether the action was "expand".
 */
function updateButtonStates( expandButton, collapseButton, isExpanded ) {
	expandButton.classList.toggle( 'active', isExpanded );
	expandButton.classList.toggle( 'inactive', ! isExpanded );
	collapseButton.classList.toggle( 'active', ! isExpanded );
	collapseButton.classList.toggle( 'inactive', isExpanded );
}

/**
 * Wires up the Expand All / Collapse All buttons.
 *
 * @param {Element} block - Root block element.
 */
function createExpandCollapseManager( block ) {
	const expandAllButton   = block.querySelector( '.expand-all' );
	const collapseAllButton = block.querySelector( '.collapse-all' );

	if ( ! expandAllButton || ! collapseAllButton ) return;

	const mobile = isMobileViewport();

	expandAllButton.addEventListener( 'click', () => {
		expandAllItems( block, mobile );
		updateButtonStates( expandAllButton, collapseAllButton, true );
	} );

	collapseAllButton.addEventListener( 'click', () => {
		collapseAllItems( block, mobile );
		updateButtonStates( expandAllButton, collapseAllButton, false );
	} );
}

// ─── Collapsed-height adjustment ─────────────────────────────────────────────

/**
 * Calculates and sets the `--collapsed-max-height` CSS custom property
 * for each ranking item, so mobile items collapse to just above their
 * "Highlights" heading. Also caps `maxHeight` on already-collapsed items.
 *
 * Should be called on init and on window resize.
 *
 * @param {Element} block - Root block element.
 */
function adjustCollapsedHeights( block ) {
	const mobile = isMobileViewport();
	const buffer = mobile ? 60 : 120; // Breathing room below the visible fold.

	block.querySelectorAll( '.rankings-list__item' ).forEach( ( item ) => {
		const highlightsHeading = item.querySelector( '.rankings-list__left-toggle h5' );
		if ( ! highlightsHeading ) return;

		const itemTop    = item.getBoundingClientRect().top;
		const headingTop = highlightsHeading.getBoundingClientRect().top;
		const finalHeight = ( headingTop - itemTop ) + buffer;

		item.style.setProperty( '--collapsed-max-height', `${ finalHeight }px` );

		if ( item.classList.contains( 'collapsed' ) ) {
			item.style.maxHeight = `${ finalHeight }px`;
		} else {
			item.style.maxHeight = '';
		}
	} );
}

// ─── Exported entry point ─────────────────────────────────────────────────────

/**
 * Initialises all Rankings 2025 interactions for a given block element.
 * Returns a cleanup function that removes all added event listeners.
 *
 * @param {Element} block - Root `.vtx-psd-rankings-block.rankings-2025` element.
 * @returns {Function} Cleanup function.
 */
export function applyRankings2025( block ) {
	if ( ! block ) return () => {};

	const popupCleanup = createPopupManager( block );

	initAccordion( block );
	createExpandCollapseManager( block );
	adjustCollapsedHeights( block );

	const onResize = () => adjustCollapsedHeights( block );
	window.addEventListener( 'resize', onResize );

	// Return a cleanup function for external use if desired.
	return () => {
		if ( popupCleanup ) popupCleanup();
		window.removeEventListener( 'resize', onResize );
	};
}
