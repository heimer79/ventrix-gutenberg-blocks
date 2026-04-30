---
name: wordpress-gutenberg
description: >
  WordPress & Gutenberg block development standards for the ventrix-gutenberg-blocks plugin.
  Covers PHP security rules (sanitization, escaping, nonces), ACF integration patterns,
  naming conventions (vtx_/psd_/edumed_/omd_/phds_ prefixes), CSS class standards, and performance patterns.
  Use for any PHP render file, ACF field registration, block.json, or SCSS in this plugin.
triggers:
  - render.php
  - block.json
  - acf_fields
  - gutenberg block
  - acf block
  - new block
  - rankings block
  - psd block
  - edumed block
  - omd block
  - phds block
  - vtx function
---

# WordPress & Gutenberg Block Standards — Plugin

## 🏗️ Block Families Overview

This plugin contains **4 rankings block families**, each with its own namespace:

| Block Dir | Block Callback | Dispatcher | Render Helpers | ACF Fields |
|---|---|---|---|---|
| `psd_rankings` | `render_cafeto_psd_rankings_block()` | `vtx_determine_psd_block_render()` | `psd_render_block_*()` | `src/includes/acf_fields/psd/` |
| `edumed_rankings` | `render_cafeto_edumed_rankings_block()` | `vtx_determine_block_render()` | `vtx_render_block_*()` / `edumed_render_*()` | `src/includes/acf_fields/edumed/` |
| `omd_rankings` | `render_cafeto_omd_rankings_block()` | direct `if` branch | `vtx_render_block_omd_*()` / `omd_render_*()` | `src/includes/acf_fields/omd/` |
| `phds_rankings` | `render_cafeto_phds_rankings_block()` | direct `if/elseif` | `vtx_render_block_phds_*()` / `phds_render_*()` | `src/includes/acf_fields/phds/` |

### Design Variants per Block Family

| Family | `block_design` / ACF key | `inc/` partial | vtx render function |
|---|---|---|---|
| **psd** | `rankings_2025` | `inc/rankings-2025.php` | `psd_render_block_rankings_2025()` |
| **psd** | `rankings_spring_2026` | `inc/rankings-spring-2026.php` | `psd_render_block_rankings_spring_2026()` |
| **edumed** | `school_ranking` | `inc/tradicional-rankings.php` | `vtx_render_block_traditional_rankings()` |
| **edumed** | `ranking_2026` | `inc/rankings-2026.php` | `vtx_render_block_rankings_2026()` |
| **edumed** | `rankings_2026_v2` | `inc/rankings-2026-v2.php` | `vtx_render_block_rankings_2026_v2()` |
| **edumed** | `feature_ranking` | `inc/feature-rankings.php` | `vtx_render_block_feature_rankings()` |
| **omd** | `ranking-2026` | `inc/rankings-2026.php` | `vtx_render_block_omd_rankings_2026()` |
| **phds** | `ranking-2026` | *(default / fallback)* | *(direct render)* |
| **phds** | `ranking-working-professionals` | `inc/rankings-working-professionals.php` | `vtx_render_block_phds_rankings_working_professionals()` |
| **phds** | `ranking-geo` | `inc/rankings-geo.php` | `vtx_render_block_phds_rankings_geo()` |

---

## 🔒 Security: PHP Output Escaping (REQUIRED)

**ALWAYS escape before echoing.** No raw `echo $variable` ever.

| Context | Function |
|---|---|
| Plain text (HTML) | `esc_html( $var )` |
| HTML attribute value | `esc_attr( $var )` |
| URL (href, src) | `esc_url( $var )` |
| HTML with allowed tags | `wp_kses_post( $var )` |
| Translated string + echo | `esc_html_e( 'Text', 'vtx-psd' )` |

```php
// ✅ Correct
<a href="<?php echo esc_url( $url ); ?>"><?php echo esc_html( $title ); ?></a>
echo wp_kses_post( $rich_text_content );

// ❌ Never
echo $url;
echo $title;
```

## 🧼 Security: Input Sanitization

Sanitize when **reading** from POST, GET, or external sources:

```php
$text  = sanitize_text_field( $_POST['field'] ?? '' );
$url   = esc_url_raw( $_POST['url'] ?? '' );
$html  = wp_kses_post( $_POST['content'] ?? '' );
$int   = (int) ( $_POST['count'] ?? 0 );
$key   = sanitize_key( $_GET['key'] ?? '' );
$slug  = sanitize_title( $raw_string );
```

ACF fields are pre-sanitized by ACF — but **still escape on output**.

if ( ! function_exists( 'get_field' ) ) {
    // Return early or render a graceful error state.
    return;
}

// Then use ACF safely
$value = get_field( 'field_name', $post_id );
// Null-safe access for object fields (e.g., term objects from ACF)
$program = get_field( 'program_category', $post_id );
$program_name = is_object( $program ) ? $program->name : '';
```

**Guard for `get_fields()` bulk fetch (performance pattern):**
```php
$fields = get_fields( $post_id ) ?: [];
$value  = $fields['field_key'] ?? 'default_value';
```

## 📛 Naming Conventions

### PHP Functions
| Prefix | Use for |
|---|---|
| `vtx_` | Global utility/helper functions (e.g., `vtx_determine_psd_block_render`) |
| `psd_` | Block-specific render functions (e.g., `psd_render_block_rankings_spring_2026`) |
| `render_cafeto_` | Main block render callback registered in `block.json` |

```php
// ✅ Correct prefixes
function vtx_get_rankings_spring_data_2026( $post_type, $version, $program ) { ... }
function psd_render_block_rankings_spring_2026( $attributes, $post_ID, $block_design ) { ... }
function render_cafeto_psd_rankings_block( $attributes ) { ... }

// ❌ No generic or missing prefix
function get_rankings_data( ... ) { ... }
function render_block( ... ) { ... }
```

### CSS Classes (HTML output)
- Block wrapper: `vtx-psd-{block-name}-block` (e.g., `vtx-psd-rankings-block`)
- Design variant modifier: `rankings-{design-key}` (e.g., `rankings-spring-2026`, `rankings-2025`)
- Component elements: BEM with block wrapper as root (e.g., `ranking-item__school`, `rankings-top-bar__about`)

```html
<!-- ✅ Correct wrapper pattern -->
<div class="vtx-psd-rankings-block rankings-spring-2026"
     data-query-status="<?php echo esc_attr( $query_success ? 'success' : 'error' ); ?>"
     data-default-open="<?php echo esc_attr( $default_open ); ?>"
>
```

### Text Domain
Always use `'vtx-psd'` as the text domain for `__()`, `_e()`, `esc_html_e()`:
```php
esc_html_e( 'About the Ranking', 'vtx-psd' );
__( 'Expand All', 'vtx-psd' );
```

## ⚡ Performance: WP Object Cache

For queries used inside blocks, **always implement WP object cache**:

```php
$cache_key = sprintf( 'rankings_data_%s_%s_%s', $post_type, $version, sanitize_title( $program ) );
$posts     = wp_cache_get( $cache_key, 'rankings' );

if ( false === $posts ) {
    // Run WP_Query here...
    $posts = vtx_run_rankings_query( $args );
    wp_reset_postdata();
    wp_cache_set( $cache_key, $posts, 'rankings', DAY_IN_SECONDS );
}

return $posts;
```

**WP_Query performance flags for read-only queries:**
```php
$args = [
    'no_found_rows'          => true,  // Skip SQL_CALC_FOUND_ROWS
    'update_post_term_cache' => false, // Skip term cache if not needed
    'update_post_meta_cache' => false, // Skip meta cache if not needed
];
```

## 🧱 Block Render File Structure

Every block render file (`render.php`) follows this pattern:

```php
<?php
/**
 * Block Name - Render Dispatcher
 *
 * Brief description of what this block does and how it dispatches.
 *
 * @param array $attributes The block attributes from Gutenberg.
 */

// 1. require_once for partials
require_once 'inc/design-variant-a.php';

// 2. Guard: ACF active check
if ( ! function_exists( 'get_field' ) ) {
    // Optionally define the callback with a graceful error message
    return;
}

// 3. Guard: WP_Query available
if ( ! class_exists( 'WP_Query' ) ) {
    return;
}

// 4. Main render callback — name matches block.json "render_callback"
function render_cafeto_{block_slug}_block( $attributes ) {
    $post_ID      = get_the_ID();
    $block_design = get_field( 'block_design', $post_ID ) ?: 'default_design';

    ob_start();
    vtx_determine_{block_slug}_render( $block_design, $attributes, $post_ID );
    return ob_get_clean();
}

// 5. Dispatcher helper
function vtx_determine_{block_slug}_render( $block_design, $attributes, $post_ID ) {
    switch ( $block_design ) {
        case 'design_variant_a':
            return psd_render_block_{block_slug}_variant_a( $attributes, $post_ID, $block_design );
        default:
            return psd_render_block_{block_slug}_default( $attributes );
    }
}
```

## 🗂️ New Block Checklist

When creating a new block in this plugin:

- [ ] Create `src/blocks/{block_slug}/block.json` with typed attributes
- [ ] Create `src/blocks/{block_slug}/render.php` following the dispatcher pattern above
- [ ] If it has design variants, create partials in `src/blocks/{block_slug}/inc/`
- [ ] Create `src/blocks/{block_slug}/editor.scss` for block editor styles
- [ ] Create `src/blocks/{block_slug}/scss/_main.scss` for frontend styles
- [ ] Register block in `cafeto-gutenberg-blocks.php`
- [ ] Register ACF fields in `src/includes/acf_fields/psd/{block_slug}.php`
- [ ] All functions prefixed with `vtx_` or `psd_` or `render_cafeto_`
- [ ] All echo'd output escaped with appropriate function
- [ ] All ACF calls wrapped in `function_exists('get_field')` guard

## 🔎 WP_Query: Always Use ORM Methods

```php
// ✅ Correct: use WP_Query with $wpdb->prepare() or taxonomy/meta_query
$query = new WP_Query([
    'post_type'  => $post_type,
    'meta_query' => [
        ['key' => 'version', 'value' => $version, 'compare' => '='],
    ],
    'tax_query' => [
        ['taxonomy' => 'school_ranking_category', 'field' => 'name', 'terms' => $program],
    ],
]);

// If raw SQL is unavoidable, ALWAYS use $wpdb->prepare():
$results = $wpdb->get_results(
    $wpdb->prepare( "SELECT * FROM {$wpdb->posts} WHERE post_type = %s AND post_status = %s", $post_type, 'publish' )
);

// ❌ Never raw SQL without prepare
$results = $wpdb->get_results( "SELECT * FROM ... WHERE type = '$post_type'" );
```
