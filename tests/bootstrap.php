<?php
/**
 * PHPUnit bootstrap for the Ventrix Gutenberg Blocks plugin.
 *
 * This repo ships only plugin source (no full WordPress install), so
 * "WP unit" tests here use WP_Mock to stub WordPress core functions
 * instead of a live WordPress + database test environment.
 */

define('VGB_PLUGIN_ROOT', dirname(__DIR__));

require_once VGB_PLUGIN_ROOT . '/vendor/autoload.php';
require_once __DIR__ . '/stubs/wp-classes.php';

if (!defined('ABSPATH')) {
    define('ABSPATH', VGB_PLUGIN_ROOT . '/');
}

WP_Mock::bootstrap();

require_once __DIR__ . '/wp-unit/VgbWpUnitTestCase.php';

/**
 * Deliberately nothing else runs here: pure unit tests (tests/unit)
 * rely on none of the WordPress core function names existing yet, so
 * plugin files that need WP_Mock stubs (e.g. proxy_api.php) are only
 * required lazily by VgbWpUnitTestCase, not from this shared bootstrap.
 */
