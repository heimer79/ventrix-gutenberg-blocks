<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */


function render_cafeto_edumed_rankings_block($attributes) {
	// Output the block's front-end content
?>
	<p <?php echo get_block_wrapper_attributes(); ?>>
		<?php esc_html_e('Edumed rabkings – hello from a dynamic block!', 'cafeto-gutenberg-blocks'); ?>
	</p>
<?php

}
