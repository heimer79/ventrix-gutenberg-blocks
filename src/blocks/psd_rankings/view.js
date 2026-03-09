/**
 * PSD Rankings — Front-end view script.
 *
 * This file is registered as `viewScript` in block.json and is automatically
 * enqueued on any page that contains the PSD Rankings block.
 *
 * Pattern: import design-specific modules from ./js/ and dispatch to the
 * correct initialiser based on the CSS class added by render.php
 * (via vtx_determine_psd_class_name()).
 *
 * To add a new design:
 *  1. Create ./js/rankings-<name>.js and export applyRankings<Name>(block).
 *  2. Import it here.
 *  3. Add a `classList.contains()` branch in the forEach below.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

import { applyRankings2025 }      from './js/rankings-2025.js';
import { applyRankingsSpring2026 } from './js/rankings-spring-2026.js';

document.addEventListener( 'DOMContentLoaded', function () {
	const blocks = document.querySelectorAll( '.vtx-psd-rankings-block' );

	// No block elements found on this page — bail early.
	if ( blocks.length === 0 ) {
		return;
	}

	blocks.forEach( function ( block ) {
		if ( ! block ) return; // Extra safeguard against null entries.

		if ( block.classList.contains( 'rankings-2025' ) ) {
			applyRankings2025( block );
		}

		if ( block.classList.contains( 'rankings-spring-2026' ) ) {
			applyRankingsSpring2026( block );
		}
	} );
} );