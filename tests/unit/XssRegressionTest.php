<?php

use PHPUnit\Framework\TestCase;

/**
 * Regression tests for audit findings #4, #5 and #6 (MEDIUM): stored
 * XSS via unescaped ranking post content, ACF methodology content, and
 * city/state fields.
 *
 * Rendering these templates requires a full WordPress + ACF + loop
 * context, which isn't available in this plugin-only repo, so these
 * tests statically assert the vulnerable `echo` patterns identified by
 * the audit have been replaced with the escaping calls WordPress
 * recommends. This locks in the fix and fails loudly if a future edit
 * reintroduces raw output.
 */
final class XssRegressionTest extends TestCase {

    /**
     * @return array<string, array{0: string}>
     */
    public static function city_state_files(): array {
        $root = VGB_PLUGIN_ROOT;

        return [
            'omd_rankings/rankings-2026.php' => ["{$root}/src/blocks/omd_rankings/inc/rankings-2026.php"],
            'phds_rankings/rankings-geo.php' => ["{$root}/src/blocks/phds_rankings/inc/rankings-geo.php"],
            'phds_rankings/rankings-working-professionals.php' => ["{$root}/src/blocks/phds_rankings/inc/rankings-working-professionals.php"],
            'psd_rankings/rankings-spring-2026.php' => ["{$root}/src/blocks/psd_rankings/inc/rankings-spring-2026.php"],
            'edumed_rankings/rankings-2026-v2.php' => ["{$root}/src/blocks/edumed_rankings/inc/rankings-2026-v2.php"],
        ];
    }

    /**
     * @dataProvider city_state_files
     */
    public function test_city_state_are_escaped(string $file): void {
        $source = file_get_contents($file);

        $this->assertStringNotContainsString(
            "echo \$fields['city'] . ', ' . \$fields['state']",
            $source,
            "Raw, unescaped city/state output found in {$file}"
        );
        $this->assertMatchesRegularExpression(
            "/echo esc_html\\(\\\$fields\\['city'\\]\\) \\. ', ' \\. esc_html\\(\\\$fields\\['state'\\]\\)/",
            $source,
            "Expected esc_html()-wrapped city/state output in {$file}"
        );
    }

    /**
     * @return array<string, array{0: string}>
     */
    public static function post_content_files(): array {
        $root = VGB_PLUGIN_ROOT;

        return [
            'omd_rankings/rankings-2026.php' => ["{$root}/src/blocks/omd_rankings/inc/rankings-2026.php"],
            'phds_rankings/rankings-geo.php' => ["{$root}/src/blocks/phds_rankings/inc/rankings-geo.php"],
            'phds_rankings/rankings-working-professionals.php' => ["{$root}/src/blocks/phds_rankings/inc/rankings-working-professionals.php"],
        ];
    }

    /**
     * @dataProvider post_content_files
     */
    public function test_post_content_is_sanitized(string $file): void {
        $source = file_get_contents($file);

        $this->assertStringNotContainsString(
            "echo \$post['content']; ?>",
            $source,
            "Raw, unescaped post content output found in {$file}"
        );
        $this->assertStringContainsString(
            "echo wp_kses_post(wpautop(\$post['content']));",
            $source,
            "Expected wp_kses_post(wpautop()) content output in {$file}"
        );
    }

    public function test_edumed_methodology_content_is_sanitized(): void {
        $file = VGB_PLUGIN_ROOT . '/src/blocks/edumed_rankings/render.php';
        $source = file_get_contents($file);

        $this->assertStringNotContainsString(
            "echo \$methodology_options[\$option]['content_version'];",
            $source
        );
        $this->assertStringContainsString(
            "echo wp_kses_post(\$methodology_options[\$option]['content_version']);",
            $source
        );
    }

    public function test_omd_methodology_content_is_sanitized(): void {
        $file = VGB_PLUGIN_ROOT . '/src/blocks/omd_rankings/render.php';
        $source = file_get_contents($file);

        $this->assertStringNotContainsString(
            "echo \$methodology_content;",
            $source
        );
        $this->assertStringContainsString(
            "echo wp_kses_post(\$methodology_content);",
            $source
        );
    }

    /**
     * Also covers the logic bug from audit finding #5: $option was
     * computed but never used to index $methodology_options before
     * being echoed wholesale.
     */
    public function test_phds_methodology_content_uses_the_computed_option_index(): void {
        $file = VGB_PLUGIN_ROOT . '/src/blocks/phds_rankings/render.php';
        $source = file_get_contents($file);

        $this->assertStringNotContainsString(
            "echo \$methodology_options ?? '';",
            $source,
            'The unindexed dump of the whole ACF field should no longer be present'
        );
        $this->assertStringContainsString(
            "isset(\$methodology_options[\$option])",
            $source,
            'The computed $option index must actually be used'
        );
        $this->assertStringContainsString(
            "echo wp_kses_post(\$methodology_options[\$option]);",
            $source
        );
    }
}
