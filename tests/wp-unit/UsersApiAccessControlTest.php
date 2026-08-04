<?php



/**
 * WP unit tests for audit finding #2 (HIGH): the /wp-json/cafeto/v1/users
 * REST route used permission_callback => '__return_true', letting any
 * anonymous visitor enumerate every WordPress user (including admins).
 *
 * The fix requires the edit_posts capability, since this endpoint is
 * only ever consumed by the block editor (src/blocks/testimonial-card/edit.js),
 * never by the public-facing frontend.
 */
final class UsersApiAccessControlTest extends VgbWpUnitTestCase {

    public function test_users_route_permission_callback_requires_edit_posts_capability(): void {
        $captured_args = null;

        // VG_Users_API is a singleton; get_instance() only runs the
        // constructor (which calls add_action()) the first time it's
        // ever invoked in this process.
        WP_Mock::userFunction('add_action');

        WP_Mock::userFunction('register_rest_route')
            ->once()
            ->with('cafeto/v1', '/users', WP_Mock\Functions::type('array'))
            ->andReturnUsing(function ($namespace, $route, $args) use (&$captured_args) {
                $captured_args = $args;
                return true;
            });

        $api = VG_Users_API::get_instance();
        $api->register_routes();

        $this->assertIsArray($captured_args);
        $this->assertArrayHasKey('permission_callback', $captured_args);
        $this->assertIsCallable($captured_args['permission_callback']);
        $this->assertNotSame('__return_true', $captured_args['permission_callback']);

        WP_Mock::userFunction('current_user_can')->once()->with('edit_posts')->andReturn(false);
        $this->assertFalse(call_user_func($captured_args['permission_callback']));

        WP_Mock::userFunction('current_user_can')->once()->with('edit_posts')->andReturn(true);
        $this->assertTrue(call_user_func($captured_args['permission_callback']));
    }
}
