<?php

use PHPUnit\Framework\TestCase;

require_once VGB_PLUGIN_ROOT . '/src/blocks/salaries_careers/inc/helpers.php';

/**
 * Regression tests for the inline SVG sanitizer (audit finding #7, LOW).
 *
 * cafeto_sanitize_inline_svg() strips <script>/<foreignObject> elements
 * and on* event handler attributes from state-icon SVG markup before it
 * is echoed on salaries/careers mobile tables.
 */
final class SvgSanitizeTest extends TestCase {

    public function test_strips_script_tag(): void {
        $svg = '<svg><script>alert(1)</script><path d="M0 0"/></svg>';

        $result = cafeto_sanitize_inline_svg($svg);

        $this->assertStringNotContainsString('<script', $result);
        $this->assertStringContainsString('<path d="M0 0"/>', $result);
    }

    public function test_strips_onload_event_handler(): void {
        $svg = '<svg onload="alert(document.cookie)"><circle r="5"/></svg>';

        $result = cafeto_sanitize_inline_svg($svg);

        $this->assertStringNotContainsString('onload', $result);
        $this->assertStringContainsString('<circle r="5"/>', $result);
    }

    public function test_strips_onclick_with_single_quotes(): void {
        $svg = "<svg onclick='alert(1)'><rect/></svg>";

        $result = cafeto_sanitize_inline_svg($svg);

        $this->assertStringNotContainsString('onclick', $result);
    }

    public function test_strips_foreign_object(): void {
        $svg = '<svg><foreignObject><script>alert(1)</script></foreignObject><path/></svg>';

        $result = cafeto_sanitize_inline_svg($svg);

        $this->assertStringNotContainsString('foreignObject', $result);
        $this->assertStringNotContainsString('<script', $result);
    }

    public function test_neutralizes_javascript_uri(): void {
        $svg = '<svg><a href="javascript:alert(1)"><path/></a></svg>';

        $result = cafeto_sanitize_inline_svg($svg);

        $this->assertStringNotContainsString('javascript:', $result);
    }

    public function test_leaves_benign_svg_untouched(): void {
        $svg = '<svg viewBox="0 0 24 24"><path d="M12 2L2 22h20z" fill="#000"/></svg>';

        $result = cafeto_sanitize_inline_svg($svg);

        $this->assertSame($svg, $result);
    }

    public function test_handles_empty_input(): void {
        $this->assertSame('', cafeto_sanitize_inline_svg(''));
    }
}
