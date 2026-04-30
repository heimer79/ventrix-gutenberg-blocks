---
name: code-comments
description: >
  Global coding standard for the ventrix-gutenberg-blocks plugin.
  ALL code comments (inline, docblocks, SCSS, JS) must be written in English.
  This applies to every file in the project: PHP, SCSS, JS, JSON, and block templates.
  Use this skill when writing, reviewing, or refactoring any file in this plugin.
triggers:
  - new file
  - new function
  - write comment
  - review code
  - add comment
  - inline comment
  - docblock
  - phpdoc
  - scss comment
  - js comment
---

# Code Comments Standard

## Rule: All Comments Must Be in English

Every comment in this project — regardless of file type — **must be written in English**.
This includes inline comments, block comments, PHPDoc/JSDoc, and SCSS comments.

The team communicates in Spanish, but **the codebase is the source of truth** and must be
readable by any developer, tool, or AI agent regardless of their language.

---

## PHP Comments

### Inline
```php
// Get the current post ID.
$post_ID = get_the_ID();

// Bail early if ACF is not available.
if ( ! function_exists( 'get_field' ) ) {
    return;
}
```

### PHPDoc — Functions
```php
/**
 * Retrieves rankings data for a given post type and program.
 *
 * @param string $post_type        The custom post type slug.
 * @param string $level_year_value The level-year combination (e.g., 'graduate-2026').
 * @param int    $version          Methodology version (1 or 2).
 * @param string $program          Program slug for filtering.
 *
 * @return WP_Post[]|false Array of post objects, or false on failure.
 */
function vtx_get_rankings_data_2026( $post_type, $version, $program ) { ... }
```

### PHPDoc — Files
```php
<?php
/**
 * Rankings block render — Spring 2026 design.
 *
 * Renders the PSD rankings block using the Spring 2026 layout variant.
 * Loaded by vtx_determine_psd_block_render() when block_design === 'rankings_spring_2026'.
 *
 * @package ventrix-gutenberg-blocks
 */
```

---

## SCSS Comments

```scss
// Block wrapper — Spring 2026 layout.
.vtx-psd-rankings-block {

    // Use flex column so the top bar stacks above the list.
    display: flex;
    flex-direction: column;

    // Responsive: collapse to single column on mobile.
    @include breakpoint(mobile) {
        flex-direction: column;
    }
}
```

---

## JavaScript Comments

```js
// Fetch rankings data from the REST endpoint.
const fetchRankings = async ( postType ) => {
    const response = await fetch( `/wp-json/vtx/v1/rankings?type=${postType}` );
    return response.json();
};
```

---

## ❌ What to Avoid

```php
// ❌ Spanish inline comment
// Obtiene el ID del post actual.
$post_ID = get_the_ID();

// ❌ Mixed language docblock
/**
 * Renderiza el bloque de rankings.
 * Returns the HTML output for the block.
 */
```

```scss
// ❌ Spanish SCSS comment
// Contenedor principal del bloque
.vtx-psd-rankings-block { ... }
```

---

## When Reviewing or Writing Code

1. **Before writing a comment** → write it in English.
2. **If you encounter a Spanish comment** while editing a file → translate it to English in the same edit.
3. **Do not translate comments in a separate PR** unless that is the explicit task — fix them inline.
