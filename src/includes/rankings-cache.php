<?php
/**
 * Persistent cache for the rankings blocks (edumed, omd, phds, psd).
 *
 * Results are stored as transients (object cache when available, wp_options
 * otherwise) under a versioned key. Bumping the version invalidates every
 * cached ranking at once without scanning the options table.
 *
 * @package Ventrix
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! defined( 'VTX_RANKINGS_CACHE_TTL' ) ) {
	// Safety net for changes made outside WordPress hooks (direct SQL, bulk meta imports).
	define( 'VTX_RANKINGS_CACHE_TTL', 12 * HOUR_IN_SECONDS );
}

/**
 * Current rankings cache version.
 *
 * @return int
 */
function vtx_rankings_cache_version() {
	return (int) get_option( 'vtx_rankings_cache_ver', 1 );
}

/**
 * Builds the transient name for a rankings cache key.
 *
 * Hashed so long program names never exceed the transient key length limit.
 *
 * @param string $key Logical cache key.
 * @return string
 */
function vtx_rankings_cache_name( $key ) {
	return 'vtx_rk_' . md5( vtx_rankings_cache_version() . '|' . $key );
}

/**
 * Reads cached rankings.
 *
 * @param string $key Logical cache key.
 * @return array|false Cached posts, or false on a miss.
 */
function vtx_rankings_cache_get( $key ) {
	$cached = get_transient( vtx_rankings_cache_name( $key ) );

	return is_array( $cached ) ? $cached : false;
}

/**
 * Stores rankings in the persistent cache.
 *
 * @param string $key   Logical cache key.
 * @param array  $posts Rankings data.
 */
function vtx_rankings_cache_set( $key, $posts ) {
	set_transient( vtx_rankings_cache_name( $key ), $posts, VTX_RANKINGS_CACHE_TTL );
}

/**
 * Invalidates every cached ranking.
 *
 * Also available as `do_action( 'vtx_rankings_flush_cache' )`.
 */
function vtx_rankings_flush_cache() {
	update_option( 'vtx_rankings_cache_ver', vtx_rankings_cache_version() + 1 );
}
add_action( 'vtx_rankings_flush_cache', 'vtx_rankings_flush_cache' );

/**
 * Flushes the cache when a post is saved or deleted.
 *
 * Runs late so ACF has already stored the post's fields.
 *
 * @param int $post_id Post ID.
 */
function vtx_rankings_flush_cache_on_post_change( $post_id ) {
	if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
		return;
	}

	vtx_rankings_flush_cache();
}
add_action( 'save_post', 'vtx_rankings_flush_cache_on_post_change', 999 );
add_action( 'deleted_post', 'vtx_rankings_flush_cache_on_post_change', 999 );
add_action( 'trashed_post', 'vtx_rankings_flush_cache_on_post_change', 999 );

// Program (taxonomy) changes affect which posts belong to a ranking.
add_action( 'created_term', 'vtx_rankings_flush_cache', 999 );
add_action( 'edited_term', 'vtx_rankings_flush_cache', 999 );
add_action( 'delete_term', 'vtx_rankings_flush_cache', 999 );
add_action( 'set_object_terms', 'vtx_rankings_flush_cache', 999 );
