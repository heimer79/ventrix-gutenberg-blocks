<?php



/**
 * A minimal stand-in for $wpdb that records every query it receives,
 * so tests can assert *how* a query was built (parameterized via
 * prepare(), never raw string interpolation) rather than depending on
 * a real database connection.
 */
final class Fake_Wpdb_For_Columns_Test {
    public string $prefix = 'wp_';

    /** @var string[] */
    public array $queries = [];

    public bool $prepare_was_called = false;

    private $table_exists;

    public function __construct(bool $table_exists = true) {
        $this->table_exists = $table_exists;
    }

    public function prepare($query, ...$args) {
        $this->prepare_was_called = true;

        // Mimic $wpdb->prepare()'s %s handling closely enough to prove
        // that a malicious value can no longer break out of the string
        // literal: it gets escaped and wrapped in quotes as literal data.
        $escaped = array_map(static function ($arg) {
            return "'" . addslashes((string) $arg) . "'";
        }, $args);

        $prepared = preg_replace('/%s/', '%s', $query);
        foreach ($escaped as $value) {
            $prepared = preg_replace('/%s/', $value, $prepared, 1);
        }

        $this->queries[] = $prepared;

        return $prepared;
    }

    public function get_var($query) {
        $this->queries[] = $query;

        if (!$this->table_exists) {
            return null;
        }

        // Only report the table as existing if the query is asking
        // about the exact, safely-quoted table name — a query whose
        // structure was altered by injection would not match this.
        if (preg_match("/SHOW TABLES LIKE '([^']*)'/", $query, $m)) {
            return $m[1];
        }

        return null;
    }

    public function get_col($query) {
        $this->queries[] = $query;

        return ['id', 'state', 'value'];
    }
}

/**
 * WP unit tests for audit finding #3 (HIGH): SQL injection in
 * get_table_columns() via the unsanitized `table` REST parameter.
 */
final class ProxyApiSqlInjectionTest extends VgbWpUnitTestCase {

    public function test_uses_prepared_statement_to_check_table_existence(): void {
        global $wpdb;
        $wpdb = new Fake_Wpdb_For_Columns_Test(true);

        WP_Mock::userFunction('sanitize_text_field')->andReturnUsing(function ($v) {
            return $v;
        });
        WP_Mock::userFunction('esc_sql')->andReturnUsing(function ($v) {
            return addslashes($v);
        });

        $request = new WP_REST_Request(['table' => 'salary_standard']);

        $response = get_table_columns($request);

        $this->assertTrue($wpdb->prepare_was_called);
        $this->assertInstanceOf(WP_REST_Response::class, $response);
        $this->assertSame(['id', 'state', 'value'], $response->get_data());
    }

    /**
     * The core regression case from the audit: a `table` value crafted
     * to break out of the SQL string (`salary_standard' OR '1'='1`) is
     * rejected by the table allow-list before any query is built.
     */
    public function test_sql_injection_payload_is_rejected(): void {
        global $wpdb;
        $wpdb = new Fake_Wpdb_For_Columns_Test(true);

        WP_Mock::userFunction('sanitize_text_field')->andReturnUsing(function ($v) {
            return $v;
        });

        $request = new WP_REST_Request(['table' => "salary_standard' OR '1'='1"]);

        $response = get_table_columns($request);

        $this->assertInstanceOf(WP_Error::class, $response);
        $this->assertSame('invalid_table', $response->get_error_code());
        $this->assertSame([], $wpdb->queries);
    }

    /**
     * Audit S1: tables outside salary/career (users, options, ...) must
     * never be introspected, and no query may reach the database.
     */
    public function test_rejects_tables_outside_salary_and_career(): void {
        global $wpdb;
        $wpdb = new Fake_Wpdb_For_Columns_Test(true);

        WP_Mock::userFunction('sanitize_text_field')->andReturnUsing(function ($v) {
            return $v;
        });

        foreach (['users', 'usermeta', 'options', 'posts'] as $table) {
            $response = get_table_columns(new WP_REST_Request(['table' => $table]));

            $this->assertInstanceOf(WP_Error::class, $response, $table);
            $this->assertSame('invalid_table', $response->get_error_code());
        }

        $this->assertSame([], $wpdb->queries);
    }

    public function test_allow_list_matches_salary_and_career_names(): void {
        foreach (['salary_standard', 'salary_geo', 'career_bridge', 'salarybls', 'careerpc'] as $table) {
            $this->assertTrue(cafeto_salaries_is_allowed_table($table), $table);
        }
        foreach (['users', 'options', 'salary-x', '', 'x`; DROP'] as $table) {
            $this->assertFalse(cafeto_salaries_is_allowed_table($table), $table);
        }
    }

    public function test_sensitive_columns_are_detected(): void {
        foreach (['user_pass', 'user_email', 'api_key', 'password', 'auth_token'] as $column) {
            $this->assertTrue(cafeto_salaries_is_sensitive_column($column), $column);
        }
        foreach (['area', 'occupation', 'median', 'n_90th_percentile', 'asset_url', 'relevant_degree_link'] as $column) {
            $this->assertFalse(cafeto_salaries_is_sensitive_column($column), $column);
        }
    }

    public function test_returns_error_for_nonexistent_table(): void {
        global $wpdb;
        $wpdb = new Fake_Wpdb_For_Columns_Test(false);

        WP_Mock::userFunction('sanitize_text_field')->andReturnUsing(function ($v) {
            return $v;
        });

        $request = new WP_REST_Request(['table' => 'salary_missing']);

        $response = get_table_columns($request);

        $this->assertInstanceOf(WP_Error::class, $response);
        $this->assertSame('invalid_table', $response->get_error_code());
    }
}
