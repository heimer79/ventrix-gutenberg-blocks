# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WordPress plugin providing custom Gutenberg blocks for Ventrix educational websites (edumed, psd, omd, phds, oc). Main plugin file: `cafeto-gutenberg-blocks.php`. Requires WordPress 6.1+, PHP 7.0+, ACF plugin, and the `ventrix-tools` plugin.

## Build & Development Commands

```bash
npm run start          # Dev mode with watch (--webpack-copy-php)
npm run build          # Production build (--webpack-copy-php)
npm run lint:js        # Lint JavaScript
npm run lint:css       # Lint SCSS/CSS
npm run format         # Format code via wp-scripts
npm run plugin-zip     # Create plugin ZIP for distribution
```

Build uses `@wordpress/scripts` with a custom webpack config that copies `assets/` and `inc/` directories from certain blocks into `build/`. No test suite is configured.

## Architecture

### Multi-Site System

A single plugin codebase serves 5 sites. The active site is stored as an ACF option field (`select_current_site`) and exposed via the `VENTRIX_CURRENT_SITE` constant and `ventrix_get_current_site()` helper. Allowed values: `edumed`, `psd`, `omd`, `phds`, `oc` (defaults to `edumed`). Site-specific ACF field groups are loaded dynamically from `src/includes/acf_fields/{site}/`.

### Block Registration

Blocks live in `src/blocks/{block-name}/`. On `init`, `ventrix_gutenberg_blocks_init()` scans `build/blocks/`, reads each `block.json`, and calls `register_block_type()`. For blocks with `"render": "file:./render.php"`, it auto-derives a PHP render callback named `render_cafeto_{block_name}_block` (hyphens converted to underscores).

### Two Block Patterns

1. **Pure JS blocks** (e.g., accordion): `block.json` + `index.js` + `edit.js` + `save.js` + `style.scss` + optional `*-frontend.js` (viewScript)
2. **Server-rendered blocks** (e.g., rankings, testimonial-card): `block.json` + `index.js` + `edit.js` + `render.php` + `style.scss` + optional `view.js` + `inc/` directory for PHP helpers

### REST API Endpoints

- `GET /ventrix/v1/current-site` — public, returns site config
- `GET /cafeto/v1/users` — user data for testimonial-card (`VG_Users_API` singleton)
- `GET /cafeto/v1/salary-data?state={STATE}` — salary data from `wp_salary_mbc_page` table (`Salary_API` singleton)
- `POST /cafeto/v1/salary-data/refresh` — requires `manage_options`

### Key Conventions

- Block category slug: `cafeto-category`
- Block names: `cafeto/{block-name}` or `ventrix-gutenberg-blocks/{block-name}` or `ventrix/{block-name}`
- PHP files in `src/includes/` are copied to `build/includes/` and required from there
- Site-specific CSS uses modifier classes: `.block-name--{site}` (e.g., `.testimonial-card--edumed`)
- Frontend JS fetches site config from REST API with fallback to `window.ventrixSiteConfig`
- WordPress coding standards: tab indentation, kebab-case files, PascalCase components, camelCase variables

## Deployment

Tag-based releases via GitHub Actions. Create annotated tag `vX.Y.Z`, push to origin, and the workflow builds and publishes a GitHub Release with the plugin ZIP.
