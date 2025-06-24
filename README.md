# Ventrix Gutenberg Blocks

A comprehensive WordPress plugin providing custom Gutenberg blocks for Ventrix projects. This plugin includes specialized blocks for rankings, salary information, accordions, and more.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Development](#development)
- [Deployment](#deployment)
- [GitHub Releases & Tags](#github-releases--tags)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Overview

Ventrix Gutenberg Blocks is a WordPress plugin that extends the Gutenberg editor with custom blocks designed specifically for Ventrix projects. The plugin provides blocks for displaying rankings, salary information, accordions, and other content types commonly used across Ventrix websites.

### Key Benefits

- ✅ **Custom Blocks**: Specialized blocks for Ventrix content needs
- ✅ **GitHub Updates**: Automatic updates via GitHub releases
- ✅ **Modern Development**: ES6+, SCSS, Webpack build system
- ✅ **Performance Optimized**: Lightweight and fast loading
- ✅ **WordPress Standards**: Follows WordPress coding standards

## ✨ Features

### Available Blocks

#### 📊 **Rankings Blocks**
- **PSD Rankings**: Professional school rankings with detailed information
- **EduMed Rankings**: Educational institution rankings
- **Interactive features**: Expandable details, star ratings, mobile optimization

#### 💰 **Salary & Career Blocks**
- **Salary Table**: Display salary information with filtering
- **Salaries Careers**: Career and salary data visualization
- **API Integration**: Real-time data from external sources

#### 📝 **Content Blocks**
- **Accordion**: Collapsible content sections
- **Accordion Item**: Individual accordion items
- **Accordions**: Container for multiple accordions
- **Multipurpose Card**: Flexible content cards

### Technical Features

- **WordPress 6.1+ Compatibility**
- **PHP 7.0+ Support**
- **GitHub-based Updates**
- **Webhook Integration**
- **ACF Integration**
- **Responsive Design**
- **Accessibility Features**

## 🚀 Installation

### Method 1: WordPress Admin (Recommended)

1. **Download the plugin ZIP** from GitHub releases
2. **Go to WordPress Admin** → Plugins → Add New
3. **Click "Upload Plugin"** and select the ZIP file
4. **Activate the plugin**

### Method 2: Manual Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ventrixdevops/ventrix-gutenberg-blocks.git
   ```

2. **Install dependencies**:
   ```bash
   cd ventrix-gutenberg-blocks
   npm install
   ```

3. **Build the plugin**:
   ```bash
   npm run build
   ```

4. **Copy to WordPress**:
   ```bash
   cp -r . /path/to/wordpress/wp-content/plugins/cafeto-gutenberg-blocks/
   ```

5. **Activate in WordPress Admin**

## ⚙️ Configuration

### Required Configuration

#### 1. **GitHub Token Setup**

Add your GitHub token to `wp-config.php`:

```php
// GitHub token for plugin updates
define('VENTRIX_GITHUB_TOKEN', 'your_github_token_here');

// GitHub webhook secret for update notifications
define('VENTRIX_GITHUB_WEBHOOK_SECRET', 'your_webhook_secret_here');
```

#### 2. **GitHub Token Permissions**

Your GitHub token needs these permissions:
- `repo` - Full control of private repositories
- `read:packages` - Download packages
- `workflow` - Update GitHub Actions workflows

#### 3. **Webhook Configuration**

Set up a GitHub webhook:
- **URL**: `https://your-site.com/wp-json/ventrix/v1/github-webhook`
- **Content Type**: `application/json`
- **Secret**: Use the same secret as in `wp-config.php`
- **Events**: `Push` and `Release`

### Optional Configuration

#### ACF Integration

If using Advanced Custom Fields:

```php
// In your theme's functions.php or a custom plugin
function get_select_current_site(): string {
    if (!class_exists('ACF') || !function_exists('get_field')) {
        return 'edumed'; // Default fallback
    }
    
    $select_current_site = get_field('select_current_site', 'option');
    return !empty($select_current_site) ? sanitize_text_field($select_current_site) : 'edumed';
}
```

## 📖 Usage

### Using Blocks in Gutenberg

1. **Open the Gutenberg Editor** on any post or page
2. **Click the "+" button** to add a new block
3. **Search for "Cafeto"** in the block library
4. **Select your desired block** and configure it

### Block Categories

All Ventrix blocks are organized under the **"Cafeto Blocks"** category in the Gutenberg editor.

### Block-Specific Usage

#### Accordion Blocks

```html
<!-- Basic accordion structure -->
<wp:accordions>
  <wp:accordion-item title="Section 1">
    Content for section 1
  </wp:accordion-item>
  <wp:accordion-item title="Section 2">
    Content for section 2
  </wp:accordion-item>
</wp:accordions>
```

#### Rankings Blocks

```html
<!-- PSD Rankings -->
<wp:psd-rankings>
  <!-- Rankings data will be populated via API -->
</wp:psd-rankings>

<!-- EduMed Rankings -->
<wp:edumed-rankings>
  <!-- Rankings data will be populated via API -->
</wp:edumed-rankings>
```

#### Salary Table

```html
<!-- Salary information table -->
<wp:salary-table>
  <!-- Salary data will be populated via API -->
</wp:salary-table>
```

## 🛠 Development

### Prerequisites

- **Node.js 16+**
- **npm or yarn**
- **PHP 7.0+**
- **WordPress 6.1+**
- **Git**

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ventrixdevops/ventrix-gutenberg-blocks.git
   cd ventrix-gutenberg-blocks
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

### Project Structure

```
cafeto-gutenberg-blocks/
├── src/
│   ├── blocks/              # Block source code
│   │   ├── accordion/       # Accordion block
│   │   ├── rankings/        # Rankings blocks
│   │   ├── salary_table/    # Salary table block
│   │   └── ...
│   └── assets/              # Shared assets
├── build/                   # Compiled assets
├── scripts/                 # Build and deployment scripts
├── cafeto-gutenberg-blocks.php  # Main plugin file
├── package.json             # Dependencies and scripts
├── webpack.config.js        # Webpack configuration
└── README.md               # This file
```

### Available Scripts

```bash
# Development
npm run dev          # Start development mode with hot reload
npm run build        # Build for production
npm run watch        # Watch for changes and rebuild

# Deployment
npm run build-deploy # Build and create deployment ZIP
npm run verify-zip   # Verify ZIP contents
npm run deploy       # Complete deployment process

# Testing
npm run test         # Run tests (if configured)
npm run lint         # Lint code
```

### Creating New Blocks

1. **Create block directory**:
   ```bash
   mkdir src/blocks/your-block-name
   ```

2. **Create block files**:
   ```
   your-block-name/
   ├── block.json        # Block metadata
   ├── index.js          # Block registration
   ├── edit.js           # Editor component
   ├── save.js           # Save component
   ├── style.scss        # Frontend styles
   ├── editor.scss       # Editor styles
   └── view.js           # Frontend JavaScript
   ```

3. **Register the block** in `cafeto-gutenberg-blocks.php`

### Block Development Guidelines

#### File Naming Convention
- Use **kebab-case** for file names
- Use **PascalCase** for component names
- Use **camelCase** for functions and variables

#### Code Standards
- Follow **WordPress coding standards**
- Use **ES6+ features** for JavaScript
- Use **SCSS** for styling
- Include **proper documentation**

#### Block Structure
```javascript
// index.js
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    edit: Edit,
    save: Save,
});
```

## 🚀 Deployment

### GitHub Releases & Tags

This plugin uses **GitHub releases with tags** for deployment and updates.

#### Release Process

1. **Create a new tag**:
   ```bash
   git tag -a v3.0.3 -m "Release version 3.0.3"
   git push origin v3.0.3
   ```

2. **GitHub Actions will automatically**:
   - Build the plugin
   - Create a deployment ZIP
   - Create a GitHub release
   - Attach the ZIP file

3. **WordPress will detect the update** and notify users

#### Tag Naming Convention

- **Format**: `vX.Y.Z` (e.g., `v3.0.3`)
- **Semantic Versioning**: Major.Minor.Patch
- **Examples**:
  - `v3.0.0` - Initial release
  - `v3.0.1` - Bug fixes
  - `v3.1.0` - New features
  - `v4.0.0` - Breaking changes

#### Release Notes

Each release should include:
- **Version number**
- **Release date**
- **Changes summary**
- **Migration notes** (if applicable)
- **Breaking changes** (if any)

### Manual Deployment

If you need to deploy manually:

1. **Build the plugin**:
   ```bash
   npm run build
   ```

2. **Create deployment ZIP**:
   ```bash
   npm run build-deploy
   ```

3. **Upload to GitHub**:
   - Go to GitHub releases
   - Create a new release with the appropriate tag
   - Upload the generated ZIP file

### Deployment Scripts

#### PHP Script
```bash
php scripts/create-deploy-zip.php
```

#### Node.js Script
```bash
node scripts/create-deploy-zip.js
```

#### Testing Script
```bash
php scripts/test-deployment.php
```

### GitHub Actions Workflow

The plugin includes a GitHub Actions workflow that:

1. **Triggers on tag creation**
2. **Installs dependencies**
3. **Builds the plugin**
4. **Creates deployment ZIP**
5. **Creates GitHub release**
6. **Attaches ZIP file**

#### Workflow File
```yaml
# .github/workflows/build-and-release.yml
name: Build and Release

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build-deploy
      - uses: actions/create-release@v1
      - uses: actions/upload-release-asset@v1
```

## 🔧 Troubleshooting

### Common Issues

#### 1. **Plugin Not Updating**

**Symptoms**: WordPress doesn't detect new versions

**Solutions**:
- Check GitHub token permissions
- Verify webhook is configured correctly
- Clear WordPress cache
- Check error logs

#### 2. **Blocks Not Appearing**

**Symptoms**: Blocks don't show in Gutenberg editor

**Solutions**:
- Ensure plugin is activated
- Check for JavaScript errors in browser console
- Verify block registration in main plugin file
- Clear browser cache

#### 3. **Build Errors**

**Symptoms**: `npm run build` fails

**Solutions**:
- Update Node.js to version 16+
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall
- Check for syntax errors in source files

#### 4. **GitHub API Errors**

**Symptoms**: 404 or authentication errors

**Solutions**:
- Verify GitHub token is valid
- Check token permissions
- Ensure repository is accessible
- Check rate limiting

### Debug Mode

Enable WordPress debug mode to see detailed error messages:

```php
// In wp-config.php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

### Log Files

Check these log files for errors:
- **WordPress**: `/wp-content/debug.log`
- **PHP**: `/var/log/php_errors.log`
- **Web server**: `/var/log/apache2/error.log` or `/var/log/nginx/error.log`

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Commit your changes**:
   ```bash
   git commit -m "Add feature: description"
   ```
6. **Push to your fork**
7. **Create a pull request**

### Code Standards

- Follow **WordPress coding standards**
- Use **meaningful commit messages**
- Include **tests** for new features
- Update **documentation** as needed

### Pull Request Guidelines

- **Clear description** of changes
- **Screenshots** for UI changes
- **Test instructions** for reviewers
- **Breaking changes** clearly marked

## 📄 License

This plugin is licensed under the GPL v2 or later.

## 🆘 Support

For support and questions:

- **GitHub Issues**: [Create an issue](https://github.com/ventrixdevops/ventrix-gutenberg-blocks/issues)
- **Documentation**: Check this README and related docs
- **WordPress.org**: Plugin support forum (if published)

## 🔗 Links

- **GitHub Repository**: https://github.com/ventrixdevops/ventrix-gutenberg-blocks
- **WordPress Plugin Directory**: (if published)
- **Ventrix Website**: https://ventrixadvertising.com/

---

**Made with ❤️ by the Ventrix Dev Team** 