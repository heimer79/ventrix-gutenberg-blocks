<?php
/**
 * PSD Rankings - Spring 2026 Render
 *
 * Partial template for the "Rankings Spring 2026" design.
 * This file will contain the rendering logic for the Spring 2026 version of the PSD rankings block.
 */

/**
 * Renders the PSD Rankings block using the Spring 2026 design.
 *
 * @param array $attributes The block attributes.
 * @return string The block HTML content.
 */
function psd_render_block_rankings_spring_2026( $attributes, $post_ID, $block_design ) {

		// Get the attributes with default values.
		$post_type          = get_field('post_type', $post_ID) ?: 'school_ranking';
		$program            = get_field('program_category', $post_ID)->name ?: 'CNA';
		$default_open       = 3;
		$metodology_version = get_field('ranking_metodology_text', $post_ID) ?: 1;
		$version            = get_field('version', $post_ID) ?: '2025';

		// Reuse the shared data-fetching function from rankings-2025.php
		$posts = vtx_get_rankings_spring_data_2026( $post_type, $version, $program );

		if ( ! is_array( $posts ) ) {
				$posts = array();
		}

		$rankings_count = count( $posts );
		$query_success  = ! empty( $posts );
		$default_open   = $rankings_count >= 6 ? 3 : $rankings_count;

		// Determine the class based on the block design.
		$ranking_class = vtx_determine_psd_class_name($block_design);
			// Initialize JSON-LD schema structure.
		$ranking_data_schema_json = '';
		if ($query_success) {
				$ranking_data_schema_json .= '{
						"@context":"https://schema.org",
						"@type":"ItemList",
						"name":"' . esc_attr($program) . '",
						"description":"",
						"itemListElement":[';
		}

		?>
		<span id="rankings-<?php echo esc_attr( $program ); ?>"></span>
		<div class="cafeto-rankings-block <?php echo esc_attr( $ranking_class ); ?>"
				data-query-status="<?php echo esc_attr( $query_success ? 'success' : 'error' ); ?>"
				data-default-open="<?php echo esc_attr( $default_open ); ?>"
		>

			<!-- Rankings Top Bar -->
			<div class="rankings-top-bar">

				<!-- Rankings About the Ranking -->
				<button class="rankings-top-bar__about"><?php esc_html_e('About the Ranking', 'vtx-psd'); ?></button>

				<!-- Rankings Expand Collapse buttons -->
				<div class="rankings-top-bar__expand-collapse">
					<button class="expand-all"><?php esc_html_e('Expand All', 'vtx-psd'); ?></button>
					<button class="collapse-all"><?php esc_html_e('Collapse All', 'vtx-psd'); ?></button>
				</div>
			</div>
		
			<!-- Rankings Accordion -->
			<div class="ranking-lists__accordion">
				<!-- TODO: Implement Spring 2026 layout -->
				<?php if ( $query_success ) : ?>
						<?php foreach ( $posts as $post ) : ?>
								<?php $order = $post['order']; ?>
								<div class="ranking-lists__accordion-item" data-order="<?php echo esc_attr( $order ); ?>">
									<?php
									$fields = $post['acf_fields'];

									// Prepare link URL and school cost for JSON-LD schema
									$online_program_url = !empty($fields['online_program_url']) ? $fields['online_program_url'] : get_permalink($post['ID']);
									?>

									<!-- Summary row -->
									 <div class="ranking-item__summary">
										<div class="ranking-item__school">
											<span class="ranking-item__number"><?php echo $order; ?></span>
											<div class="item__school-info">
												<h4>
													<a href="<?php echo esc_url($online_program_url); ?>"
														target="_blank" rel="noopener noreferrer nofollow">
														<?php echo esc_html($post['title']); ?>
													</a>
												</h4>
												<span class="item__location"><?php echo $fields['city'] . ', ' . $fields['state']; ?></span>
											</div>
										</div>
										<div class="ranking-item__stats">
											<button class="toggle-details" aria-expanded="false">+</button>
										</div>
									 </div>

									 <!-- Hidden details -->
									 <div class="ranking-item__details">
										
									 </div>
								</div>
						<?php endforeach; ?>
				<?php else : ?>
						<p><?php esc_html_e( 'No rankings found.', 'text-domain' ); ?></p>
				<?php endif; ?>
			</div>
		</div>
		<?php
}


function vtx_get_rankings_spring_data_2026($post_type, $version, $program) {

	if (empty($post_type) || empty($version) || empty($program)) {
		return [];
	}
	// ✅ Cache key per combination
	$cache_key = sprintf('rankings_data_%s_%s_%s', $post_type, $version, sanitize_title($program));

	$posts = wp_cache_get($cache_key);

	// Try to fetch cached data first
	$posts = wp_cache_get($cache_key, 'rankings');
	if ($posts !== false) {
		return $posts;
	}

	$rankings_args = [
		'post_type'           => $post_type,
		'post_status'         => 'publish',
		'orderby'             => 'menu_order',
		'order'               => 'ASC',
		'posts_per_page'      => -1,
		'no_found_rows'       => true, // Performance optimization
		'update_post_term_cache' => false,
		'update_post_meta_cache' => false,
		'meta_query' => [
			[
				'key'     => 'version',
				'value'   => $version,
				'compare' => '=',
			],
		],
		'tax_query' => [
			[
				'taxonomy' => 'school_ranking_category',
				'field'    => 'name',
				'terms'    => $program,
			],
		],
	];

	$rankings_query = new WP_Query($rankings_args);

	if (! $rankings_query->have_posts()) {
		wp_cache_set($cache_key, [], 'rankings', DAY_IN_SECONDS);
		return [];
	}
		
	$posts = [];

	while ($rankings_query->have_posts()) {
		$rankings_query->the_post();
		$post_id = get_the_ID();

		// ✅ Retrieve ACF fields in one go (more efficient)
		$fields = get_fields($post_id) ?: [];

		// ✅ Defensive code: safely access program_category name
		$program_category = $fields['program_category'] ?? null;
		$program_name = is_object($program_category) ? $program_category->name : '';

		$posts[] = [
			'ID' => $post_id,
			'title' => get_the_title(),
			'content' => apply_filters('the_content', get_the_content()), // ensure content filters apply
			'order'   => (int) get_post_field('menu_order', $post_id),
			'acf_fields' => [
				// Core Data Default Fields.
				'version'            => $fields['version'],
				'asset_url'          => $fields['asset_url'],
				'program'            => $program_name,
				'online_program_url' => $fields['online_program_url'],
				'subject'            => $fields['ranking_subject'],
				'unitid'             => $fields['ranking_unitid'],
				'city'               => $fields['city'],
				'state'              => $fields['state'],
				'online_enrollment'  => $fields['ranking_online_enrollment'],
				'school_type'        => $fields['ranking_school_type'],
				'score'              => $fields['ranking_score'],

				// Core Data Ranking Spring 2026 Fields.
				'pmastr_ptotal'               => $fields['rp_pmastr_ptotal'],
				'non_white_enrollment'        => $fields['rp_non_white_enrollment'],
				'graduate_enrollment'         => $fields['rp_graduate_enrollment'],
				'graduation_rate'             => $fields['rp_graduation_rate'],
				'students_with_disabilities'  => $fields['rp_students_with_disabilities'],
				'employment_services'         => $fields['rp_employment_services'],
				'academic_career_counseling'  => $fields['rp_academic_career_counseling'],
				'academic_career_services'    => $fields['rp_academic_career_services'],
				'net_price'                   => $fields['rp_net_price'],
				'avg_tuition'                 => $fields['rp_avg_tuition'],
				'alt_tuition_plans'           => $fields['rp_alt_tuition_plans'],
				'pell_grant_recipients'       => $fields['rp_pell_grant_recipients'],
				'inst_aid_recipients'         => $fields['rp_inst_aid_recipients'],
				'blurb_1'                     => $fields['rp_blurb_1'],
				'blurb_2'                     => $fields['rp_blurb_2'],
				'blurb_3'                     => $fields['rp_blurb_3'],
			],
		];
	}

	wp_reset_postdata();

	// ✅ Cache for 24 hours for performance
	wp_cache_set($cache_key, $posts, 'rankings', DAY_IN_SECONDS);

	return $posts;
}
