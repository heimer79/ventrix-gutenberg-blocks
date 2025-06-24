# Deployment Guide - Ventrix Gutenberg Blocks

This guide explains the complete deployment process for the Ventrix Gutenberg Blocks plugin, including GitHub releases, tags, and automated workflows.

## 📋 Table of Contents

- [Overview](#overview)
- [Release Process](#release-process)
- [GitHub Tags](#github-tags)
- [GitHub Releases](#github-releases)
- [Automated Workflow](#automated-workflow)
- [Manual Deployment](#manual-deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The Ventrix Gutenberg Blocks plugin uses a sophisticated deployment system that combines:

- **GitHub Tags** for version control
- **GitHub Releases** for distribution
- **GitHub Actions** for automation
- **Custom ZIP creation** for optimized downloads

### Deployment Flow

```Development → Tag Creation → GitHub Actions → Build → ZIP Creation → Release → WordPress Update
```

## 🚀 Release Process

### Step-by-Step Release Process

#### 1. **Prepare for Release**

```bash
# Ensure you're on the main branch
git checkout main

# Pull latest changes
git pull origin main

# Update version in main plugin file
# Edit cafeto-gutenberg-blocks.php and update VENTRIX_PLUGIN_VERSION
```

#### 2. **Create and Push Tag**

```bash
# Create an annotated tag
git tag -a v3.0.3 -m "Release version 3.0.3"

# Push the tag to GitHub
git push origin v3.0.3
```

#### 3. **GitHub Actions Automation**

Once the tag is pushed, GitHub Actions will automatically:

1. **Trigger the workflow** based on the tag
2. **Install dependencies** (Node.js, npm)
3. **Build the plugin** using webpack
4. **Create deployment ZIP** with only necessary files
5. **Create GitHub release** with the tag
6. **Attach ZIP file** to the release

#### 4. **WordPress Update Detection**

WordPress will automatically detect the new release and notify users of available updates.

### Version Numbering

We use **Semantic Versioning** (SemVer):

- **Major** (X.0.0): Breaking changes
- **Minor** (0.X.0): New features, backward compatible
- **Patch** (0.0.X): Bug fixes, backward compatible

#### Examples

| Version | Type | Description |
|---------|------|-------------|
| `v3.0.0` | Major | Initial release |
| `v3.0.1` | Patch | Bug fixes |
| `v3.1.0` | Minor | New features |
| `v4.0.0` | Major | Breaking changes |

## 🏷️ GitHub Tags

### Tag Creation Methods

#### Method 1: Command Line (Recommended)

```bash
# Create annotated tag with message
git tag -a v3.0.3 -m "Release version 3.0.3"

# Push tag to GitHub
git push origin v3.0.3
```

#### Method 2: GitHub Web Interface

1. Go to **Releases** tab on GitHub
2. Click **"Create a new release"**
3. Choose **"Create a new tag"**
4. Enter tag name (e.g., `v3.0.3`)
5. Add release title and description
6. Click **"Publish release"**

#### Method 3: GitHub CLI

```bash
# Install GitHub CLI if not installed
# brew install gh (macOS)
# apt install gh (Ubuntu)

# Create release with tag
gh release create v3.0.3 --title "Release v3.0.3" --notes "Release notes here"
```

### Tag Best Practices

#### Naming Convention

- **Format**: `vX.Y.Z` (e.g., `v3.0.3`)
- **Always use 'v' prefix**
- **Use semantic versioning**
- **Be consistent across releases**

#### Tag Messages

```bash
# Good tag messages
git tag -a v3.0.3 -m "Release version 3.0.3 - Bug fixes and performance improvements"

# Include key changes
git tag -a v3.1.0 -m "Release version 3.1.0 - Added new accordion block and improved rankings"

# Breaking changes
git tag -a v4.0.0 -m "Release version 4.0.0 - Breaking changes: Updated API endpoints"
```

#### Tag Management

```bash
# List all tags
git tag -l

# Delete local tag
git tag -d v3.0.3

# Delete remote tag
git push origin --delete v3.0.3

# Checkout specific tag
git checkout v3.0.3
```

## 📦 GitHub Releases

### Release Structure

Each GitHub release includes:

- **Tag**: Version identifier (e.g., `v3.0.3`)
- **Title**: Human-readable title
- **Description**: Detailed release notes
- **Assets**: Deployment ZIP file
- **Metadata**: Release date, author, etc.

### Release Notes Template

```markdown
# Release v3.0.3

## 🚀 New Features
- Added new accordion block
- Improved rankings display
- Enhanced mobile responsiveness

## 🔧 Bug Fixes
- Fixed JavaScript errors in salary table
- Resolved CSS conflicts with themes
- Corrected API response handling

## ⚡ Performance Improvements
- Reduced bundle size by 15%
- Optimized asset loading
- Improved caching

## 🛠 Technical Changes
- Updated webpack configuration
- Enhanced error handling
- Improved logging

## 📋 Migration Notes
- No breaking changes
- Automatic updates will work seamlessly
- No manual intervention required

## 🔗 Download
- [cafeto-gutenberg-blocks-v3.0.3.zip](link-to-zip)
```

### Release Assets

#### ZIP File Contents

The deployment ZIP contains only the necessary files:

```
cafeto-gutenberg-blocks-v3.0.3.zip
├── cafeto-gutenberg-blocks.php    # Main plugin file
├── readme.txt                     # Plugin information
├── build/                         # Compiled assets
│   ├── blocks/                    # Block files
│   ├── assets/                    # Shared assets
│   └── ...
└── ...
```

#### Excluded Files

The following files are **NOT** included in the ZIP:

- `src/` - Source code (development only)
- `node_modules/` - Dependencies
- `.git/` - Version control
- `package.json` - Development dependencies
- `webpack.config.js` - Build configuration
- Development scripts and tools

## ⚙️ Automated Workflow

### GitHub Actions Workflow

The plugin uses GitHub Actions for automated deployment:

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
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm ci

      - name: Build plugin
        run: npm run build

      - name: Create deployment ZIP
        run: npm run build-deploy

      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: |
            Automated release for ${{ github.ref }}
            
            ## Changes
            - Built from tag: ${{ github.ref }}
            - Build date: ${{ github.event.head_commit.timestamp }}
            
            ## Download
            The ZIP file below contains the complete plugin ready for WordPress installation.
          draft: false
          prerelease: false

      - name: Upload Release Asset
        uses: actions/upload-release-asset@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./cafeto-gutenberg-blocks.zip
          asset_name: cafeto-gutenberg-blocks-${{ github.ref_name }}.zip
          asset_content_type: application/zip
```

### Workflow Triggers

The workflow is triggered by:

- **Tag pushes**: `git push origin v3.0.3`
- **Tag pattern**: `v*` (any tag starting with 'v')

### Workflow Steps

1. **Checkout**: Get the latest code
2. **Setup Node.js**: Install Node.js 16+
3. **Install Dependencies**: Run `npm ci`
4. **Build Plugin**: Run `npm run build`
5. **Create ZIP**: Run `npm run build-deploy`
6. **Create Release**: Create GitHub release
7. **Upload Asset**: Attach ZIP file

### Workflow Output

After successful execution:

- ✅ **GitHub Release** created with tag
- ✅ **ZIP file** attached to release
- ✅ **Release notes** populated
- ✅ **WordPress update** notification triggered

## 🛠 Manual Deployment

### When to Use Manual Deployment

- **Testing releases** before automation
- **Hotfixes** that need immediate deployment
- **Debugging** deployment issues
- **Custom builds** for specific clients

### Manual Deployment Steps

#### 1. **Build the Plugin**

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Create deployment ZIP
npm run build-deploy
```

#### 2. **Create GitHub Release**

1. Go to **GitHub repository**
2. Click **"Releases"** tab
3. Click **"Create a new release"**
4. Choose **existing tag** or create new one
5. Add **release title** and **description**
6. **Upload ZIP file** manually
7. Click **"Publish release"**

#### 3. **Verify Release**

- Check ZIP file is attached
- Verify download link works
- Test WordPress update detection

### Manual ZIP Creation

If you need to create the ZIP manually:

```bash
# Using PHP script
php scripts/create-deploy-zip.php

# Using Node.js script
node scripts/create-deploy-zip.js

# Using npm script
npm run build-deploy
```

## 🧪 Testing

### Pre-Release Testing

#### 1. **Local Testing**

```bash
# Build locally
npm run build

# Test ZIP creation
npm run build-deploy

# Verify ZIP contents
npm run verify-zip
```

#### 2. **Staging Environment**

- Deploy to staging site
- Test all blocks functionality
- Verify update process works
- Check for any issues

#### 3. **Automated Testing**

```bash
# Run deployment test script
php scripts/test-deployment.php

# Test ZIP download
php scripts/test-zip-download.php
```

### Post-Release Testing

#### 1. **WordPress Update Test**

- Install previous version
- Check for update notification
- Test automatic update process
- Verify plugin activation

#### 2. **Block Functionality Test**

- Test all blocks in editor
- Verify frontend rendering
- Check responsive design
- Test API integrations

#### 3. **Performance Testing**

- Check bundle size
- Test loading times
- Verify caching works
- Monitor error logs

## 🔧 Troubleshooting

### Common Deployment Issues

#### 1. **GitHub Actions Failures**

**Symptoms**: Workflow fails to complete

**Solutions**:
- Check Node.js version compatibility
- Verify npm dependencies
- Check for syntax errors in source code
- Review workflow logs for specific errors

#### 2. **ZIP Creation Issues**

**Symptoms**: ZIP file not created or corrupted

**Solutions**:
- Ensure all build files exist
- Check disk space availability
- Verify file permissions
- Test ZIP creation manually

#### 3. **Release Creation Failures**

**Symptoms**: GitHub release not created

**Solutions**:
- Check GitHub token permissions
- Verify repository access
- Ensure tag exists
- Check for duplicate releases

#### 4. **WordPress Update Issues**

**Symptoms**: WordPress doesn't detect updates

**Solutions**:
- Verify GitHub token in wp-config.php
- Check webhook configuration
- Clear WordPress cache
- Test update checker manually

### Debug Commands

```bash
# Check tag exists
git tag -l | grep v3.0.3

# Verify remote tag
git ls-remote --tags origin | grep v3.0.3

# Test ZIP creation
php scripts/create-deploy-zip.php --debug

# Check GitHub API
curl -H "Authorization: token YOUR_TOKEN" \
     https://api.github.com/repos/ventrixdevops/ventrix-gutenberg-blocks/releases
```

### Log Analysis

#### GitHub Actions Logs

1. Go to **Actions** tab on GitHub
2. Click on **failed workflow**
3. Review **step logs** for errors
4. Check **environment variables**

#### WordPress Debug Logs

```php
// Enable debug logging
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);

// Check logs at /wp-content/debug.log
```

## 📋 Deployment Checklist

### Pre-Deployment

- [ ] **Code review** completed
- [ ] **Tests passed** locally
- [ ] **Version updated** in main plugin file
- [ ] **Changelog updated** with new version
- [ ] **Dependencies checked** for updates

### Deployment

- [ ] **Tag created** and pushed
- [ ] **GitHub Actions** workflow completed
- [ ] **Release created** with ZIP file
- [ ] **Release notes** added
- [ ] **Download link** verified

### Post-Deployment

- [ ] **WordPress update** detected
- [ ] **Plugin activation** tested
- [ ] **All blocks** functional
- [ ] **Performance** verified
- [ ] **Documentation** updated

## 🔗 Related Documentation

- [README.md](./README.md) - Complete plugin documentation
- [CHANGELOG.md](./CHANGELOG.md) - Version history and changes
- [GitHub Repository](https://github.com/ventrixdevops/ventrix-gutenberg-blocks) - Source code and issues

---

**For questions about deployment, contact the Ventrix Dev Team** 