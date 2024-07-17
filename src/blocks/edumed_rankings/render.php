<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */


function render_cafeto_edumed_rankings_block($attributes) {
	// Output the block's front-end content

	return '<div class="cafeto-edumed-rankings-block">' . $attributes['content'] . '</div>';

}
