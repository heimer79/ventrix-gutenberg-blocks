---
name: scss-conventions
description: >
  SCSS coding conventions for the ventrix-gutenberg-blocks plugin.
  Covers file structure, BEM with SCSS nesting, CSS custom properties, media queries,
  hardcoded values, and transitions. Use when writing or reviewing any .scss file in this plugin.
triggers:
  - new scss file
  - write scss
  - add styles
  - edit styles
  - add media query
  - add transition
  - review scss
  - css variable
  - new partial
---

# SCSS Conventions

## 1. File Structure

Each block follows this structure:

```
src/blocks/<block_name>/
├── style.scss          ← entry point, imports all partials
├── editor.scss         ← editor-only styles (kept minimal)
└── scss/               ← partials folder (psd) — OR — partials/ OR css/
    ├── _helpers.scss   ← shared utilities (display helpers, etc.)
    └── _<design>.scss  ← one file per block design variant
```

**Entry point (`style.scss`)** only contains `@import` statements — no styles directly:

```scss
@import './scss/helpers';
@import './scss/rankings-spring-2026';
@import './scss/rankings-2025';
```

**Partials** are prefixed with `_` (SCSS convention). Import them without the underscore or extension.

---

## 2. Root Selector & BEM Nesting

Every block stylesheet must have **one root selector** that matches the block wrapper class.
All styles are scoped inside it using SCSS nesting + `&`.

### Root selector pattern
```scss
// Root matches the PHP wrapper class.
.vtx-psd-rankings-block {

    // Design variant is a modifier on the root — never a separate rule.
    &.rankings-spring-2026 {

        // BEM element
        .rankings-top-bar {
            display: flex;

            // BEM element modifier via &__
            &__about {
                font-weight: 400;
            }

            &__expand-collapse {
                display: flex;
            }
        }
    }
}
```

### Root selector names by block family

| Block      | Root class                   |
|------------|------------------------------|
| `psd`      | `.vtx-psd-rankings-block`    |
| `edumed`   | `.vtx-edumed-rankings-block` |
| `omd`      | `.vtx-omd-rankings-block`    |
| `phds`     | `.vtx-phds-rankings-block`   |

### Design variant class
The PHP render file adds a class like `rankings-spring-2026` (value of `block_design` ACF field)
to the root element. Use it as a nested modifier:

```scss
.vtx-psd-rankings-block {
    &.rankings-spring-2026 { ... }
    &.rankings-2025        { ... }
}
```

---

## 3. CSS Custom Properties (do NOT use hardcoded brand colors)

The theme provides these CSS variables. Use them instead of hardcoded hex values for **brand colors**:

| Variable                 | Purpose                        |
|--------------------------|--------------------------------|
| `--vtx-primary-color`    | Main brand color (text, borders, icons) |
| `--vtx-hover-color`      | Hover/interactive state color  |
| `--vtx-link-color`       | Link color                     |
| `--vtx-text-color`       | Body text color                |

```scss
// ✅ Correct — uses CSS variable.
color: var(--vtx-primary-color);
border: 1px solid var(--vtx-primary-color);

// ❌ Avoid — hardcoded brand color.
color: #1A237E;
```

**Neutral / utility colors** (backgrounds, borders, shadows) may still use hex literals
when the value is structural, not brand-related:

```scss
// Acceptable — structural background, not a brand color.
background-color: #F9FAFC;
border: 1px solid #E3E3E3;
box-shadow: 0px 3px 5px 0px #0000001A;
```

---

## 4. Media Queries

Use **inline media queries** directly inside the selector that changes — do not group all
responsive rules at the bottom of the file.

```scss
.ranking-item {
    &__number {
        font-size: 26px;
        width: 44px;
        height: 44px;

        // Mobile — inline with the element it modifies.
        @media screen and (max-width: 768px) {
            font-size: 16px;
            width: 33px;
            height: 33px;
        }
    }
}
```

### Breakpoints used in this project

| Name        | Value   | Usage                    |
|-------------|---------|--------------------------|
| Mobile      | `768px` | Main mobile breakpoint   |
| Tablet      | `991px` | Popup / modal narrowing  |

Always write: `@media screen and (max-width: <value>px)` — no shorthand, no mixins currently.

---

## 5. Transitions

Multi-property transitions use the **comma-split format** for readability:

```scss
// ✅ One property per line when there are 2+.
transition:
    max-height 0.4s ease,
    opacity 0.3s ease;

// Add will-change when animating max-height or transform.
will-change: max-height, opacity;
```

```scss
// ✅ Single property — one liner is fine.
transition: opacity 0.3s ease;
```

---

## 6. CSS Property Declaration Order

Write properties in this order inside every selector. This matches
`stylelint-config-standard` and makes diff reviews easier:

```scss
.elemento {
    // 1. Positioning
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;

    // 2. Display / Box model
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    width: 44px;
    height: 44px;
    padding: 20px;
    margin: 0;
    overflow: hidden;

    // 3. Typography
    font-family: 'Lexend Deca', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    text-decoration: none;
    text-align: left;

    // 4. Color / Visual
    color: var(--vtx-primary-color);
    background-color: #F9FAFC;
    border: 1px solid #E3E3E3;
    border-radius: 10px;
    box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;

    // 5. Transitions / Animation
    transition: opacity 0.3s ease;
    will-change: opacity;
}
```

---

## 7. Utility / Helper Classes

Place shared display helpers in `_helpers.scss`:

```scss
// Visibility helpers — mobile/desktop toggle.
.hidden-desktop {
    display: none;

    @media screen and (max-width: 768px) {
        display: inline-block;
    }
}

.hidden-mobile {
    display: inline-block;

    @media screen and (max-width: 768px) {
        display: none;
    }
}
```

---

## 8. What to Avoid

```scss
// ❌ Hex alpha notation — use rgba() for readability.
box-shadow: 0px 3px 5px 0px #0000001A;  // ❌ What is this opacity?
box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);  // ✅ Clear.

// ❌ Styles outside the root block selector (causes CSS leaks).
.rankings-top-bar { ... }

// ❌ !important except for overriding theme typography on h-tags.
color: red !important;

// ❌ Hardcoded brand color instead of CSS variable.
color: #1A237E;

// ❌ All responsive rules grouped at the bottom.
@media screen and (max-width: 768px) {
    .ranking-item__number { ... }
    .ranking-item__school { ... }
    // ... 40 more selectors
}

// ❌ Spanish comments.
// Color primario del bloque
color: var(--vtx-primary-color);
```

---

## 9. Acceptable Use of `!important`

Only for overriding theme-injected typography on heading elements,
where WordPress theme styles are impossible to beat with specificity alone:

```scss
h3 {
    font-size: 20px !important;
    line-height: 30px !important;
}
```
