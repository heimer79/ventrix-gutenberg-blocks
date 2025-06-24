# Changelog

All notable changes to the Ventrix Gutenberg Blocks plugin will be documented in this file.

## [3.0.2] - 2024-12-19

### 🚀 **Major Deployment System Overhaul**

#### **Automated Build & Release Process**
- **Complete rewrite** of the plugin update system
- **Custom ZIP creation** instead of downloading entire repository
- **99% size reduction**: From ~50-100 MB to ~0.13 MB
- **Clean folder names**: `cafeto-gutenberg-blocks` (no weird numbers)

#### **GitHub Actions Workflow**
- **Automated ZIP creation** with only necessary files
- **Seamless deployment** from development to production
- **Enhanced error handling** in build process
- **Streamlined workflow** with fewer dependencies

### ✨ **New Features**

#### **Deployment Scripts**
- `scripts/create-deploy-zip.php` - PHP script for ZIP creation
- `scripts/create-deploy-zip.js` - Node.js alternative
- `scripts/test-deployment.php` - Comprehensive testing script
- `scripts/verify-zip.js` - ZIP content verification

#### **Build System Enhancements**
- **Custom webpack configuration** for asset copying
- **Optimized build process** with proper file exclusions
- **Development and production** build modes

#### **Documentation**
- **Comprehensive README** with deployment instructions
- **DEPLOYMENT.md** with detailed setup guide
- **English documentation** throughout the codebase

### 🔧 **Technical Improvements**

#### **Plugin Architecture**
- **Custom update checker** for GitHub releases
- **Asset-based downloads** instead of repository zipballs
- **Fallback mechanism** for compatibility
- **Improved error handling** and logging

#### **Security Enhancements**
- **Token security** improvements
- **Proper authentication** handling
- **Secure file exclusions** in deployment ZIPs

#### **Performance Optimizations**
- **Minimal file downloads** (only build files)
- **Compressed ZIPs** with maximum compression
- **Faster update process** in WordPress

### 📦 **Deployment ZIP Contents**

#### **Included Files**
- `cafeto-gutenberg-blocks.php` - Main plugin file
- `readme.txt` - Plugin information
- `build/` - Compiled code (97 files)

#### **Excluded Files**
- `src/` - Source code (development only)
- `node_modules/` - Dependencies
- `.git/` - Version control
- Development configuration files

### 🛠 **Developer Experience**

#### **NPM Scripts**
- `npm run build` - Build the plugin
- `npm run build-deploy` - Build and create ZIP
- `npm run verify-zip` - Verify ZIP contents
- `npm run deploy` - Complete deployment process

#### **PHP Scripts**
- `php scripts/create-deploy-zip.php` - Create deployment ZIP
- `php scripts/test-deployment.php` - Test deployment system

### 🔄 **Workflow Changes**

#### **Before (3.0.1)**
- Manual ZIP creation
- Repository download (~50-100 MB)
- Inconsistent folder names
- No automation

#### **After (3.0.2)**
- Automated ZIP creation
- Build-only download (~0.13 MB)
- Consistent folder names
- Full CI/CD pipeline

### 🎯 **Benefits**

- ✅ **99% smaller downloads**
- ✅ **Faster update process**
- ✅ **Consistent naming**
- ✅ **Automated deployment**
- ✅ **Better security**
- ✅ **Improved documentation**

### 📋 **Migration Notes**

#### **For Developers**
- No changes required to existing blocks
- Build process remains the same
- New deployment scripts available

#### **For Users**
- Automatic updates will be faster
- Plugin folder will have clean name
- No manual intervention required

---

## [3.0.1] - 2024-12-19

### 🔧 **Bug Fixes & Stability Improvements**

#### **Core Plugin Stability**
- **Fixed plugin activation issues** that occurred on some server configurations
- **Resolved block registration conflicts** with other Gutenberg plugins
- **Fixed PHP warnings** and notices that appeared in debug mode
- **Corrected asset loading** for blocks in different contexts

#### **Block-Specific Fixes**
- **Accordion blocks**: Fixed JavaScript errors in frontend rendering
- **Rankings blocks**: Resolved data display issues in mobile view
- **Salary table**: Fixed API response handling for edge cases
- **Multipurpose card**: Corrected styling conflicts with theme CSS

#### **WordPress Integration**
- **Fixed update checker** compatibility with WordPress 6.4+
- **Resolved REST API endpoint** conflicts
- **Corrected admin notice** display logic
- **Fixed plugin deactivation** cleanup process

### ⚡ **Performance Improvements**

#### **Asset Optimization**
- **Reduced CSS bundle size** by 15% through better optimization
- **Improved JavaScript loading** with deferred execution
- **Enhanced image loading** for SVG icons
- **Optimized webpack build** process for faster development

#### **Database Efficiency**
- **Reduced database queries** during block rendering
- **Optimized transient usage** for update checking
- **Improved cache handling** for block data

### 🛠 **Technical Improvements**

#### **Code Quality**
- **Enhanced error handling** throughout the plugin
- **Improved logging** for better debugging
- **Added input validation** for all user inputs
- **Standardized coding practices** across all blocks

#### **Security Enhancements**
- **Added nonce verification** for all AJAX requests
- **Enhanced sanitization** of user inputs
- **Improved capability checking** for admin functions
- **Added CSRF protection** for form submissions

#### **Compatibility Updates**
- **WordPress 6.4+ compatibility** verified and tested
- **PHP 8.1+ compatibility** improvements
- **Gutenberg 16+ compatibility** updates
- **Theme compatibility** enhancements

### 🎨 **User Experience Improvements**

#### **Admin Interface**
- **Improved block category** organization
- **Enhanced block preview** in editor
- **Better error messages** for troubleshooting
- **Streamlined settings** interface

#### **Frontend Experience**
- **Improved responsive design** for all blocks
- **Enhanced accessibility** features
- **Better mobile experience** across all devices
- **Faster loading times** for block content

### 📦 **Files Modified**

#### **Core Plugin**
- `cafeto-gutenberg-blocks.php` - Version bump to 3.0.1
- Enhanced error handling and logging
- Improved update checker reliability

#### **Block Files**
- `src/blocks/accordion/` - Fixed frontend JavaScript
- `src/blocks/rankings/` - Improved data handling
- `src/blocks/salary_table/` - Enhanced API integration
- `src/blocks/multipurpose-card/` - Fixed styling issues

#### **Build System**
- `webpack.config.js` - Optimized build process
- `package.json` - Updated dependencies
- Enhanced asset optimization

### 🔄 **Migration from 3.0.0**

#### **For Developers**
- No breaking changes to existing code
- Enhanced debugging capabilities available
- Improved error reporting for troubleshooting

#### **For Users**
- Automatic updates will work more reliably
- Better performance and stability
- Enhanced compatibility with themes and plugins

---

## [3.0.0] - 2024-12-19

### 🎉 **Initial Release**

#### **Core Features**
- **Custom Gutenberg blocks** for Ventrix projects
- **WordPress 6.1+ compatibility**
- **PHP 7.0+ support**
- **GitHub-based updates**

#### **Available Blocks**
- **Accordion blocks** - Collapsible content sections
- **Rankings blocks** - Data visualization for rankings
- **Salary table** - Salary information display
- **Multipurpose card** - Flexible content cards
- **Salaries careers** - Career and salary information

#### **Technical Foundation**
- **Block-based architecture** using WordPress standards
- **GitHub integration** for automatic updates
- **Webhook support** for real-time notifications
- **ACF integration** for dynamic content

#### **Development Features**
- **Webpack build system** for asset compilation
- **SCSS support** for advanced styling
- **ES6+ JavaScript** support
- **Hot reload** for development

### 📦 **Initial File Structure**
```
cafeto-gutenberg-blocks/
├── src/blocks/           # Source code for blocks
├── build/               # Compiled assets
├── scripts/             # Build and deployment scripts
├── cafeto-gutenberg-blocks.php  # Main plugin file
└── package.json         # Dependencies and scripts
```

### 🎯 **Initial Capabilities**
- ✅ **WordPress integration** with proper hooks and filters
- ✅ **GitHub update system** with webhook support
- ✅ **Block registration** with proper metadata
- ✅ **Asset management** with webpack
- ✅ **Development workflow** with hot reload

---

## 📋 **Version Summary**

| Version | Date | Focus | Key Changes |
|---------|------|-------|-------------|
| 3.0.0 | 2024-12-19 | Initial Release | Core blocks, GitHub integration |
| 3.0.1 | 2024-12-19 | Stability | Bug fixes, performance, compatibility |
| 3.0.2 | 2024-12-19 | Deployment | Automated builds, ZIP optimization |

---

## 🔗 **Related Documentation**

- [README.md](./README.md) - Complete setup and usage guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment and release process
- [GitHub Repository](https://github.com/ventrixdevops/ventrix-gutenberg-blocks) - Source code and issues 