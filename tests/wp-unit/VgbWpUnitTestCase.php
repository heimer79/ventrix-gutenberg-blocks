<?php

/**
 * Base test case for WP-unit (WP_Mock-backed) tests.
 *
 * Some plugin files perform a `function_exists()` guard on WordPress
 * core functions at the top of the file, and call add_action()/
 * register_rest_route() at load time (outside of any function). This
 * loads those files exactly once per process, inside a throwaway
 * WP_Mock cycle, so their top-level side effects run against harmless
 * stubs. The functions they define remain available as real PHP
 * functions for every test afterwards; per-test expectations are
 * layered on top of them by each test's own setUp()/tearDown().
 *
 * This is kept out of the shared PHPUnit bootstrap so that pure unit
 * tests (tests/unit) can rely on WordPress core function names NOT
 * existing yet (see SecurityChecksTest).
 */
abstract class VgbWpUnitTestCase extends WP_Mock\Tools\TestCase {

    private static bool $pluginFilesLoaded = false;

    public static function setUpBeforeClass(): void {
        parent::setUpBeforeClass();

        if (self::$pluginFilesLoaded) {
            return;
        }
        self::$pluginFilesLoaded = true;

        WP_Mock::setUp();

        WP_Mock::userFunction('add_action');
        WP_Mock::userFunction('register_rest_route');
        WP_Mock::userFunction('current_user_can')->andReturn(true);
        WP_Mock::userFunction('wp_remote_get');
        WP_Mock::userFunction('wp_send_json_error');
        WP_Mock::userFunction('wp_send_json_success');
        WP_Mock::userFunction('wp_remote_retrieve_body');
        WP_Mock::userFunction('esc_url_raw')->andReturnUsing(function ($url) {
            return $url;
        });
        WP_Mock::userFunction('register_block_type_from_metadata');

        if (!class_exists('WP_Query')) {
            eval('class WP_Query {}');
        }

        require_once VGB_PLUGIN_ROOT . '/src/blocks/salaries_careers/inc/proxy_api.php';
        require_once VGB_PLUGIN_ROOT . '/src/blocks/testimonial-card/inc/class-users-api.php';

        WP_Mock::tearDown();
    }
}
