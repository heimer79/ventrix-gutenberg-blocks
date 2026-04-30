---
name: scss-bem-conventions
description: >
  SCSS/BEM naming conventions for the ventrix-gutenberg-blocks plugin.
  Covers block wrapper naming, element/modifier rules, SCSS partial organization,
  and scoping patterns to avoid CSS collisions. Use when writing or reviewing
  SCSS files in src/blocks/.
triggers:
  - editor.scss
  - _rankings
  - scss partial
  - css class
  - bem modifier
  - block styles
---

# SCSS / BEM Conventions — PSD Plugin

## Block CSS Namespace

Every block is scoped under its BEM root class:

- **Block root (wrapper):** `vtx-psd-{block-name}-block`
- **Design modifier:** `{block-name}-{design-key}` (BEM modifier at root level)

```scss
// Root wrapper = namespace for all block styles
.vtx-psd-rankings-block {
  // All block styles nested here

  // Design variant - applied as sibling class on root element
  &.rankings-spring-2026 {
    // Spring 2026 specific overrides
  }

  &.rankings-2025 {
    // 2025 specific overrides
  }
}
```

## BEM Naming Rules

```
Block:    .vtx-psd-rankings-block
Element:  .vtx-psd-rankings-block__summary
          .ranking-item__school
          .ranking-item__stats
Modifier: .ranking-item--highlighted
          .rankings-top-bar__about--active
```

**Shorthand usage inside SCSS blocks** — use `&` nesting:

```scss
.vtx-psd-rankings-block {
  .ranking-item {
    &__summary { ... }   // .vtx-psd-rankings-block .ranking-item__summary
    &__school  { ... }
    &__stats   { ... }

    &--highlighted { ... }  // .vtx-psd-rankings-block .ranking-item--highlighted
  }

  .rankings-top-bar {
    &__about  { ... }
    &__expand-collapse { ... }
  }
}
```

## Import Pattern

This project uses `@import` (not `@use`). The entry point `style.scss` only contains imports:

```scss
// style.scss — imports only, no styles here.
@import './scss/helpers';
@import './scss/rankings-spring-2026';
@import './scss/rankings-2025';
```

For the full file structure (partials, editor vs frontend separation) see the
**scss-conventions** skill.

## Editor Styles (`editor.scss`)

Only block-level **editor panel** styles go here. Do not duplicate frontend styles:

```scss
// editor.scss — only for Gutenberg editor context
.wp-block-vtx-psd-rankings-block {
  // Editor-only representation
  border: 2px dashed #999;
  padding: 16px;
}
```

## Common Class Patterns Used in This Plugin

```
.vtx-psd-rankings-block          → Root block wrapper
.rankings-top-bar                → Bar at the top of the block
.rankings-top-bar__about         → "About the Ranking" button
.rankings-top-bar__expand-collapse → Expand/Collapse container
.ranking-lists__accordion        → Accordion container
.ranking-lists__accordion-item   → Single accordion item
.ranking-item__summary           → Always-visible row
.ranking-item__school            → School name + rank section
.ranking-item__number            → Rank number span
.item__school-info               → School name + location wrapper
.item__location                  → City, State span
.ranking-item__stats             → Stats + toggle button area
.item__stats                     → Individual stat badge/span
.toggle-details                  → Expand/collapse toggle button
.ranking-item__details           → Collapsible details panel
.ranking-item__content           → "Why We Selected" text area
.ranking-item__program-details   → Program details list
.item-detail                     → Single detail list item
.item-detail__label              → Label inside detail item
.hidden-desktop                  → Mobile-only visibility class
.rankings-popup                  → Methodology popup section
.rankings-popup--widget          → Popup inner widget
.rankings-popup--widget--close   → Close button inside popup
.rankings-popup--widget--content → Popup content area
.rankings-popup--overlay         → Dimmed overlay behind popup
```
