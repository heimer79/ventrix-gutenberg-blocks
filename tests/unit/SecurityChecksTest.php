<?php

use PHPUnit\Framework\TestCase;

/**
 * Regression tests for audit finding #9 (LOW): inverted logic in
 * src/includes/security-checks.php meant the "required WordPress
 * functions/classes are missing" checks always reported success, so
 * the admin failure notice never fired even when ACF/WP core pieces
 * were absent.
 */
final class SecurityChecksTest extends TestCase {

    /**
     * In a bare PHP process none of the WordPress functions the checks
     * look for are defined, so the checks must now correctly report
     * failure (they used to always report success). Runs isolated so
     * that other tests in the suite (which use WP_Mock to define real
     * stand-ins for some of these same function names) can't leak into
     * this process and make the "missing" scenario impossible to
     * reproduce.
     *
     * @runInSeparateProcess
     */
    public function test_reports_failure_when_wordpress_functions_are_missing(): void {
        require_once VGB_PLUGIN_ROOT . '/src/includes/security-checks.php';

        $this->assertFalse(ventrix_check_wordpress_core_functions());
        $this->assertFalse(ventrix_check_wordpress_core_classes());

        $status = ventrix_comprehensive_security_check();

        $this->assertFalse($status['overall_status']);
        $this->assertNotEmpty($status['errors']);
    }

    /**
     * When every required function/class is available, the checks
     * must report success and overall_status must be true.
     *
     * Runs in a separate process so the stub functions/classes
     * defined here (which mimic WordPress core being loaded) never
     * leak into other tests in the suite.
     *
     * @runInSeparateProcess
     */
    public function test_reports_success_when_wordpress_is_fully_available(): void {
        $required_functions = [
            'get_field',
            'wp_cache_get', 'wp_cache_set', 'get_the_ID', 'get_the_title',
            'get_the_content', 'wp_reset_postdata', 'get_post_field',
            'esc_attr', 'esc_url', 'esc_html', 'esc_html__', 'esc_html_e',
            'wp_kses_post', 'wp_is_mobile', 'htmlspecialchars_decode',
            'register_rest_route', 'add_action', 'current_user_can',
            'wp_remote_get', 'wp_send_json_error', 'wp_send_json_success',
            'wp_remote_retrieve_body', 'is_wp_error', 'esc_url_raw',
            'register_block_type_from_metadata', 'plugin_dir_url',
            'plugin_dir_path',
        ];

        foreach ($required_functions as $function) {
            if (!function_exists($function)) {
                eval("function {$function}() { return true; }");
            }
        }

        if (!class_exists('WP_Query')) {
            eval('class WP_Query {}');
        }

        require_once VGB_PLUGIN_ROOT . '/src/includes/security-checks.php';

        $this->assertTrue(ventrix_check_wordpress_core_functions());
        $this->assertTrue(ventrix_check_wordpress_core_classes());

        $status = ventrix_comprehensive_security_check();

        $this->assertTrue($status['overall_status']);
        $this->assertEmpty($status['errors']);
    }
}
