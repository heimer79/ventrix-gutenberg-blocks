<?php



/**
 * WP unit tests for audit finding #1 (CRITICAL): unauthenticated SSRF
 * through the salaries_careers AJAX proxy (proxy_request_to_api()).
 *
 * The fix adds a login + capability check, a nonce check, and a strict
 * destination host whitelist, and removes the wp_ajax_nopriv_* hook.
 */
final class ProxyApiSsrfTest extends VgbWpUnitTestCase {

    public function setUp(): void {
        parent::setUp();
        WP_Mock::passthruFunction('esc_url_raw');
        WP_Mock::passthruFunction('wp_unslash');
        WP_Mock::passthruFunction('sanitize_text_field');
        WP_Mock::userFunction('wp_parse_url')->andReturnUsing(function ($url, $component = -1) {
            return parse_url($url, $component);
        });
    }

    public function tearDown(): void {
        unset($_GET['api_url'], $_GET['nonce']);
        parent::tearDown();
    }

    public function test_rejects_unauthenticated_requests(): void {
        WP_Mock::userFunction('is_user_logged_in')->once()->andReturn(false);
        WP_Mock::userFunction('wp_send_json_error')
            ->once()
            ->with('Insufficient permissions.', 403);
        WP_Mock::userFunction('wp_remote_get')->never();

        $_GET['api_url'] = 'http://169.254.169.254/latest/meta-data/iam/security-credentials/';

        proxy_request_to_api();

        $this->assertConditionsMet();
    }

    public function test_rejects_logged_in_users_without_edit_posts_capability(): void {
        WP_Mock::userFunction('is_user_logged_in')->once()->andReturn(true);
        WP_Mock::userFunction('current_user_can')->once()->with('edit_posts')->andReturn(false);
        WP_Mock::userFunction('wp_send_json_error')
            ->once()
            ->with('Insufficient permissions.', 403);
        WP_Mock::userFunction('wp_remote_get')->never();

        $_GET['api_url'] = 'https://api.bls.gov/some-endpoint';

        proxy_request_to_api();

        $this->assertConditionsMet();
    }

    public function test_rejects_invalid_nonce(): void {
        WP_Mock::userFunction('is_user_logged_in')->once()->andReturn(true);
        WP_Mock::userFunction('current_user_can')->once()->with('edit_posts')->andReturn(true);
        WP_Mock::userFunction('wp_verify_nonce')->once()->andReturn(false);
        WP_Mock::userFunction('wp_send_json_error')->once()->with('Invalid nonce.', 403);
        WP_Mock::userFunction('wp_remote_get')->never();

        $_GET['nonce'] = 'bad-nonce';
        $_GET['api_url'] = 'https://api.bls.gov/some-endpoint';

        proxy_request_to_api();

        $this->assertConditionsMet();
    }

    /**
     * This is the core SSRF regression case from the audit: even with a
     * valid nonce and edit_posts capability, a request targeting the
     * cloud metadata endpoint (or any non-whitelisted host) must be
     * rejected before wp_remote_get() is ever called.
     */
    public function test_rejects_urls_outside_the_domain_whitelist(): void {
        WP_Mock::userFunction('is_user_logged_in')->once()->andReturn(true);
        WP_Mock::userFunction('current_user_can')->once()->with('edit_posts')->andReturn(true);
        WP_Mock::userFunction('wp_verify_nonce')->once()->andReturn(true);
        WP_Mock::userFunction('wp_send_json_error')->once()->with('URL not allowed.', 403);
        WP_Mock::userFunction('wp_remote_get')->never();

        $_GET['nonce'] = 'valid-nonce';
        $_GET['api_url'] = 'http://169.254.169.254/latest/meta-data/iam/security-credentials/';

        proxy_request_to_api();

        $this->assertConditionsMet();
    }

    public function test_rejects_internal_network_targets(): void {
        WP_Mock::userFunction('is_user_logged_in')->once()->andReturn(true);
        WP_Mock::userFunction('current_user_can')->once()->with('edit_posts')->andReturn(true);
        WP_Mock::userFunction('wp_verify_nonce')->once()->andReturn(true);
        WP_Mock::userFunction('wp_send_json_error')->once()->with('URL not allowed.', 403);
        WP_Mock::userFunction('wp_remote_get')->never();

        $_GET['nonce'] = 'valid-nonce';
        $_GET['api_url'] = 'http://10.0.0.5/internal-api';

        proxy_request_to_api();

        $this->assertConditionsMet();
    }

    public function test_allows_whitelisted_host_and_forwards_response(): void {
        WP_Mock::userFunction('is_user_logged_in')->once()->andReturn(true);
        WP_Mock::userFunction('current_user_can')->once()->with('edit_posts')->andReturn(true);
        WP_Mock::userFunction('wp_verify_nonce')->once()->andReturn(true);
        WP_Mock::userFunction('wp_remote_get')->once()->andReturn(['body' => '{"ok":true}']);
        WP_Mock::userFunction('wp_remote_retrieve_body')->once()->andReturn('{"ok":true}');
        WP_Mock::userFunction('wp_send_json_success')->once()->with('{"ok":true}');
        WP_Mock::userFunction('wp_send_json_error')->never();

        $_GET['nonce'] = 'valid-nonce';
        $_GET['api_url'] = 'https://api.bls.gov/publicAPI/v2/timeseries/data/SUUR0000SA0';

        proxy_request_to_api();

        $this->assertConditionsMet();
    }

    public function test_missing_api_url_returns_error_without_network_call(): void {
        WP_Mock::userFunction('is_user_logged_in')->once()->andReturn(true);
        WP_Mock::userFunction('current_user_can')->once()->with('edit_posts')->andReturn(true);
        WP_Mock::userFunction('wp_verify_nonce')->once()->andReturn(true);
        WP_Mock::userFunction('wp_send_json_error')->once()->with('API URL is missing.');
        WP_Mock::userFunction('wp_remote_get')->never();

        $_GET['nonce'] = 'valid-nonce';

        proxy_request_to_api();

        $this->assertConditionsMet();
    }

    /**
     * Locks in the removal of wp_ajax_nopriv_proxy_request_to_api: the
     * proxy must not be reachable by unauthenticated visitors.
     */
    public function test_nopriv_ajax_hook_is_not_registered(): void {
        $source = file_get_contents(VGB_PLUGIN_ROOT . '/src/blocks/salaries_careers/inc/proxy_api.php');

        $this->assertDoesNotMatchRegularExpression(
            '/^\s*add_action\(\s*[\'"]wp_ajax_nopriv_proxy_request_to_api[\'"]/m',
            $source
        );
        $this->assertStringContainsString(
            "add_action('wp_ajax_proxy_request_to_api', 'proxy_request_to_api');",
            $source
        );
    }
}
