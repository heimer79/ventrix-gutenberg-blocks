---
name: acf-block-patterns
description: >
  ACF (Advanced Custom Fields) integration patterns for the ventrix-gutenberg-blocks plugin.
  Covers ACF field registration in PHP, repeater access, options pages, object field casting,
  and the block_design pattern for swapping designs without new blocks.
  Use when registering new ACF field groups or accessing ACF data in render functions.
triggers:
  - acf_fields
  - get_field
  - get_fields
  - acf repeater
  - block design
  - block_design
  - options page
  - acf registration
---

# ACF Integration Patterns — PSD Plugin

## File Location for ACF Registration

All ACF field groups for this plugin live in:
```
src/includes/acf_fields/psd/{group-slug}.php
```

They are auto-loaded from the main plugin file or an includes loader.

## Registering Page-Level Fields (block_design pattern)

The plugin uses a **`block_design` ACF field** on pages to switch which design variant renders:

```php
// src/includes/acf_fields/psd/rankings-spring-2026.php

if ( function_exists( 'acf_add_local_field_group' ) ) {
    acf_add_local_field_group([
        'key'      => 'group_psd_rankings_page_settings',
        'title'    => 'PSD Rankings — Page Settings',
        'fields'   => [
            [
                'key'           => 'field_block_design',
                'label'         => 'Block Design',
                'name'          => 'block_design',
                'type'          => 'select',
                'choices'       => [
                    'rankings_2025'        => 'Rankings 2025',
                    'rankings_spring_2026' => 'Rankings Spring 2026',
                ],
                'default_value' => 'rankings_2025',
                'required'      => 0,
            ],
        ],
        'location' => [
            [['param' => 'post_type', 'operator' => '==', 'value' => 'page']],
        ],
    ]);
}
```

## Accessing ACF Fields in Render Partials

```php
// Single field — with safe fallback
$block_design        = get_field( 'block_design', $post_ID ) ?: 'rankings_2025';
$post_type           = get_field( 'post_type', $post_ID )    ?: 'school_ranking';
$methodology_version = get_field( 'ranking_methodology_text', $post_ID ) ?: 1;

// Object field (taxonomy term, post object) — must check with is_object()
$program_term  = get_field( 'program_category', $post_ID );
$program_name  = is_object( $program_term ) ? $program_term->name : '';

// Bulk fetch (preferred for performance when many fields needed)
$fields       = get_fields( $post_ID ) ?: [];
$program_term = $fields['program_category'] ?? null;
$program_name = is_object( $program_term ) ? $program_term->name : '';
```

## ACF Options Page Fields

The methodology popup uses an ACF options page repeater:

```php
// Read from options page (second arg = 'option')
$methodology_rows = get_field( 'psd_ranking_methodology_options', 'option' );

if ( ! empty( $methodology_rows ) && isset( $methodology_rows[ $version - 1 ] ) ) {
    $row     = $methodology_rows[ $version - 1 ];
    $content = isset( $row['psd_content_version'] ) ? $row['psd_content_version'] : '';
}
```

## Registering ACF Options Pages

```php
if ( function_exists( 'acf_add_options_page' ) ) {
    acf_add_options_page([
        'page_title'  => 'Ranking Methodology',
        'menu_title'  => 'Ranking Methodology',
        'menu_slug'   => 'ranking-methodology',
        'capability'  => 'edit_posts',
        'redirect'    => false,
    ]);
}
```

## ACF Field Registration Conventions

| Convention | Rule |
|---|---|
| Field key prefix | `field_psd_` for psd block fields, `field_vtx_` for global/shared fields |
| Field group key | `group_psd_{block}_{context}` |
| Field names | snake_case, descriptive (e.g., `ranking_methodology_text`) |
| Choices keys | snake_case matching render dispatcher `case` values |
| Required fields | Only set `'required' => 1` on truly mandatory fields |

## New Design Variant Checklist

When adding a new design variant to an existing block:

1. **Add** the new slug as a `choices` entry in the `block_design` select field registration
2. **Create** `src/blocks/{block_slug}/inc/{design-variant}.php` partial
3. **Add** a `case '{design_variant}':` in `vtx_determine_{block_slug}_render()`
4. **Add** a new return value in `vtx_determine_{block_slug}_class_name()`
5. **Create** `src/blocks/{block_slug}/scss/_{design-variant}.scss` partial
6. Register any **new ACF fields** in `src/includes/acf_fields/psd/{design-variant}.php`
7. **Update** `render.php` doc comment to list the new variant and file mapping
