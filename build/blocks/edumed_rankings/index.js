/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/edumed_rankings/apolloClient.js":
/*!****************************************************!*\
  !*** ./src/blocks/edumed_rankings/apolloClient.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   client: () => (/* binding */ client)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/core/ApolloClient.js");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/cache/inmemory/inMemoryCache.js");
 // Import Apollo Client and InMemoryCache from Apollo Client package

const client = new _apollo_client__WEBPACK_IMPORTED_MODULE_0__.ApolloClient({
  uri: '/graphql',
  // Set the URI for the GraphQL endpoint. Replace with the correct endpoint URI for your server
  cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_1__.InMemoryCache() // Initialize a new in-memory cache to store query results and manage cache normalization
});

/***/ }),

/***/ "./src/blocks/edumed_rankings/edit.js":
/*!********************************************!*\
  !*** ./src/blocks/edumed_rankings/edit.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @apollo/client */ "./node_modules/@apollo/client/react/context/ApolloProvider.js");
/* harmony import */ var _apolloClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apolloClient */ "./src/blocks/edumed_rankings/apolloClient.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/edumed_rankings/editor.scss");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./block.json */ "./src/blocks/edumed_rankings/block.json");

 // Import the ApolloProvider component to wrap the React tree and provide Apollo Client

 // Import the Apollo Client instance configured for GraphQL requests

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
 // Import the localization function from WordPress for translating text

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
 // Import hooks and components for working with Gutenberg blocks

/**
 * WordPress components for block settings.
 */
 // Import WordPress UI components for block controls

 // Import custom styles for the block editor
 // Import block metadata, including the text domain for translations

function Edit({
  attributes,
  setAttributes
}) {
  // Destructure the attributes object to get or set block attributes with default values
  const {
    postType = 'school_ranking',
    program,
    defaultOpen = 3,
    hasTwoAndFourYears = '',
    defaultLevelYear,
    version
  } = attributes;
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)(); // Get the block props that apply necessary class names and attributes

  return (
    // Wrap the block content with ApolloProvider to give access to Apollo Client throughout the component tree
    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_apollo_client__WEBPACK_IMPORTED_MODULE_7__.ApolloProvider, {
      client: _apolloClient__WEBPACK_IMPORTED_MODULE_1__.client
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "cafeto-edumed-rankings-block",
      ...blockProps
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Rankings Settings', _block_json__WEBPACK_IMPORTED_MODULE_6__.textdomain),
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Post Type', _block_json__WEBPACK_IMPORTED_MODULE_6__.textdomain),
      value: postType,
      options: [{
        label: 'School Ranking',
        value: 'school_ranking'
      }
      // Add other post types here if needed
      ],
      onChange: value => setAttributes({
        postType: value
      }) // Update the postType attribute when changed
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Program', _block_json__WEBPACK_IMPORTED_MODULE_6__.textdomain),
      value: program,
      onChange: value => setAttributes({
        program: value
      }) // Update the program attribute when changed
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default Open', _block_json__WEBPACK_IMPORTED_MODULE_6__.textdomain),
      value: defaultOpen,
      onChange: value => setAttributes({
        defaultOpen: value
      }) // Update the defaultOpen attribute when changed
      ,
      min: 0,
      max: 10 // Set the range for the control
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Has 2 and 4 Years?', _block_json__WEBPACK_IMPORTED_MODULE_6__.textdomain),
      value: hasTwoAndFourYears,
      options: [{
        label: 'Choose an option',
        value: ''
      }, {
        label: 'Yes',
        value: 'yes'
      }, {
        label: 'No',
        value: 'no'
      }],
      onChange: value => setAttributes({
        hasTwoAndFourYears: value
      }) // Update the hasTwoAndFourYears attribute when changed
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default Level Year', _block_json__WEBPACK_IMPORTED_MODULE_6__.textdomain),
      value: defaultLevelYear,
      options: [{
        label: 'Choose an option',
        value: ''
      }, {
        label: '4-year',
        value: 'four-year'
      }, {
        label: '2-year',
        value: 'two-year'
      }],
      onChange: value => setAttributes({
        defaultLevelYear: value
      }) // Update the defaultLevelYear attribute when changed
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Version', _block_json__WEBPACK_IMPORTED_MODULE_6__.textdomain),
      value: version,
      options: [{
        label: 'Choose an option',
        value: ''
      }, {
        label: '2025',
        value: '2025'
      }],
      onChange: value => setAttributes({
        version: value
      }) // Update the version attribute when changed
    }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("section", {
      className: "rankings-editor"
    }, /* Add specific content for the block here */

    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "Rankings"))))
  );
}

/***/ }),

/***/ "./src/blocks/edumed_rankings/index.js":
/*!*********************************************!*\
  !*** ./src/blocks/edumed_rankings/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/edumed_rankings/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/edumed_rankings/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/blocks/edumed_rankings/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */



/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/blocks/edumed_rankings/editor.scss":
/*!************************************************!*\
  !*** ./src/blocks/edumed_rankings/editor.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/edumed_rankings/style.scss":
/*!***********************************************!*\
  !*** ./src/blocks/edumed_rankings/style.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/rehackt/index.js":
/*!***************************************!*\
  !*** ./node_modules/rehackt/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if (false) {}
// We don't want bundlers to error when they encounter usage of any of these exports.
// It's up to the package author to ensure that if they access React internals,
// they do so in a safe way that won't break if React changes how they use these internals.
// (e.g. only access them in development, and only in an optional way that won't
// break if internals are not there or do not have the expected structure)
// @ts-ignore
module.exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = undefined;
// @ts-ignore
module.exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = undefined;
// @ts-ignore
module.exports.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = undefined;
// Here we actually pull in the React library and add everything
// it exports to our own `module.exports`.
// If React suddenly were to add one of the above "polyfilled" exports,
// the React version would overwrite our version, so this should be
// future-proof.
Object.assign(module.exports, __webpack_require__(/*! react */ "react"));


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@apollo/client/cache/core/cache.js":
/*!*********************************************************!*\
  !*** ./node_modules/@apollo/client/cache/core/cache.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApolloCache: () => (/* binding */ ApolloCache)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! optimism */ "./node_modules/optimism/lib/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/fragments.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/caching/sizes.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/zen-observable-ts/module.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/mergeDeep.js");
/* harmony import */ var _wry_caches__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wry/caches */ "./node_modules/@wry/caches/lib/weak.js");
/* harmony import */ var _utilities_caching_getMemoryInternals_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utilities/caching/getMemoryInternals.js */ "./node_modules/@apollo/client/utilities/caching/getMemoryInternals.js");
/* harmony import */ var _core_equalByQuery_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../core/equalByQuery.js */ "./node_modules/@apollo/client/core/equalByQuery.js");






var ApolloCache = /** @class */ (function () {
    function ApolloCache() {
        this.assumeImmutableResults = false;
        // Make sure we compute the same (===) fragment query document every
        // time we receive the same fragment in readFragment.
        this.getFragmentDoc = (0,optimism__WEBPACK_IMPORTED_MODULE_0__.wrap)(_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.getFragmentQueryDocument, {
            max: _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.cacheSizes["cache.fragmentQueryDocuments"] ||
                1000 /* defaultCacheSizes["cache.fragmentQueryDocuments"] */,
            cache: _wry_caches__WEBPACK_IMPORTED_MODULE_3__.WeakCache,
        });
    }
    // Transactional API
    // The batch method is intended to replace/subsume both performTransaction
    // and recordOptimisticTransaction, but performTransaction came first, so we
    // provide a default batch implementation that's just another way of calling
    // performTransaction. Subclasses of ApolloCache (such as InMemoryCache) can
    // override the batch method to do more interesting things with its options.
    ApolloCache.prototype.batch = function (options) {
        var _this = this;
        var optimisticId = typeof options.optimistic === "string" ? options.optimistic
            : options.optimistic === false ? null
                : void 0;
        var updateResult;
        this.performTransaction(function () { return (updateResult = options.update(_this)); }, optimisticId);
        return updateResult;
    };
    ApolloCache.prototype.recordOptimisticTransaction = function (transaction, optimisticId) {
        this.performTransaction(transaction, optimisticId);
    };
    // Optional API
    // Called once per input document, allowing the cache to make static changes
    // to the query, such as adding __typename fields.
    ApolloCache.prototype.transformDocument = function (document) {
        return document;
    };
    // Called before each ApolloLink request, allowing the cache to make dynamic
    // changes to the query, such as filling in missing fragment definitions.
    ApolloCache.prototype.transformForLink = function (document) {
        return document;
    };
    ApolloCache.prototype.identify = function (object) {
        return;
    };
    ApolloCache.prototype.gc = function () {
        return [];
    };
    ApolloCache.prototype.modify = function (options) {
        return false;
    };
    // DataProxy API
    ApolloCache.prototype.readQuery = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = !!options.optimistic; }
        return this.read((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, options), { rootId: options.id || "ROOT_QUERY", optimistic: optimistic }));
    };
    /** {@inheritDoc @apollo/client!ApolloClient#watchFragment:member(1)} */
    ApolloCache.prototype.watchFragment = function (options) {
        var _this = this;
        var fragment = options.fragment, fragmentName = options.fragmentName, from = options.from, _a = options.optimistic, optimistic = _a === void 0 ? true : _a, otherOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__rest)(options, ["fragment", "fragmentName", "from", "optimistic"]);
        var query = this.getFragmentDoc(fragment, fragmentName);
        var diffOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, otherOptions), { returnPartialData: true, id: typeof from === "string" ? from : this.identify(from), query: query, optimistic: optimistic });
        var latestDiff;
        return new _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.Observable(function (observer) {
            return _this.watch((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, diffOptions), { immediate: true, callback: function (diff) {
                    if (
                    // Always ensure we deliver the first result
                    latestDiff &&
                        (0,_core_equalByQuery_js__WEBPACK_IMPORTED_MODULE_6__.equalByQuery)(query, { data: latestDiff === null || latestDiff === void 0 ? void 0 : latestDiff.result }, { data: diff.result })) {
                        return;
                    }
                    var result = {
                        data: diff.result,
                        complete: !!diff.complete,
                    };
                    if (diff.missing) {
                        result.missing = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.mergeDeepArray)(diff.missing.map(function (error) { return error.missing; }));
                    }
                    latestDiff = diff;
                    observer.next(result);
                } }));
        });
    };
    ApolloCache.prototype.readFragment = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = !!options.optimistic; }
        return this.read((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, options), { query: this.getFragmentDoc(options.fragment, options.fragmentName), rootId: options.id, optimistic: optimistic }));
    };
    ApolloCache.prototype.writeQuery = function (_a) {
        var id = _a.id, data = _a.data, options = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__rest)(_a, ["id", "data"]);
        return this.write(Object.assign(options, {
            dataId: id || "ROOT_QUERY",
            result: data,
        }));
    };
    ApolloCache.prototype.writeFragment = function (_a) {
        var id = _a.id, data = _a.data, fragment = _a.fragment, fragmentName = _a.fragmentName, options = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__rest)(_a, ["id", "data", "fragment", "fragmentName"]);
        return this.write(Object.assign(options, {
            query: this.getFragmentDoc(fragment, fragmentName),
            dataId: id,
            result: data,
        }));
    };
    ApolloCache.prototype.updateQuery = function (options, update) {
        return this.batch({
            update: function (cache) {
                var value = cache.readQuery(options);
                var data = update(value);
                if (data === void 0 || data === null)
                    return value;
                cache.writeQuery((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, options), { data: data }));
                return data;
            },
        });
    };
    ApolloCache.prototype.updateFragment = function (options, update) {
        return this.batch({
            update: function (cache) {
                var value = cache.readFragment(options);
                var data = update(value);
                if (data === void 0 || data === null)
                    return value;
                cache.writeFragment((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, options), { data: data }));
                return data;
            },
        });
    };
    return ApolloCache;
}());

if (globalThis.__DEV__ !== false) {
    ApolloCache.prototype.getMemoryInternals = _utilities_caching_getMemoryInternals_js__WEBPACK_IMPORTED_MODULE_8__.getApolloCacheMemoryInternals;
}
//# sourceMappingURL=cache.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/cache/core/types/common.js":
/*!****************************************************************!*\
  !*** ./node_modules/@apollo/client/cache/core/types/common.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MissingFieldError: () => (/* binding */ MissingFieldError)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");

var MissingFieldError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(MissingFieldError, _super);
    function MissingFieldError(message, path, query, variables) {
        var _a;
        // 'Error' breaks prototype chain here
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.path = path;
        _this.query = query;
        _this.variables = variables;
        if (Array.isArray(_this.path)) {
            _this.missing = _this.message;
            for (var i = _this.path.length - 1; i >= 0; --i) {
                _this.missing = (_a = {}, _a[_this.path[i]] = _this.missing, _a);
            }
        }
        else {
            _this.missing = _this.path;
        }
        // We're not using `Object.setPrototypeOf` here as it isn't fully supported
        // on Android (see issue #3236).
        _this.__proto__ = MissingFieldError.prototype;
        return _this;
    }
    return MissingFieldError;
}(Error));

//# sourceMappingURL=common.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/cache/inmemory/entityStore.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apollo/client/cache/inmemory/entityStore.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EntityStore: () => (/* binding */ EntityStore),
/* harmony export */   maybeDependOnExistenceOfEntity: () => (/* binding */ maybeDependOnExistenceOfEntity),
/* harmony export */   supportsResultCaching: () => (/* binding */ supportsResultCaching)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! optimism */ "./node_modules/optimism/lib/index.js");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/index.js");
/* harmony import */ var _wry_trie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wry/trie */ "./node_modules/@wry/trie/lib/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/mergeDeep.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/objects.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/cache/inmemory/helpers.js");







var DELETE = Object.create(null);
var delModifier = function () { return DELETE; };
var INVALIDATE = Object.create(null);
var EntityStore = /** @class */ (function () {
    function EntityStore(policies, group) {
        var _this = this;
        this.policies = policies;
        this.group = group;
        this.data = Object.create(null);
        // Maps root entity IDs to the number of times they have been retained, minus
        // the number of times they have been released. Retained entities keep other
        // entities they reference (even indirectly) from being garbage collected.
        this.rootIds = Object.create(null);
        // Lazily tracks { __ref: <dataId> } strings contained by this.data[dataId].
        this.refs = Object.create(null);
        // Bound function that can be passed around to provide easy access to fields
        // of Reference objects as well as ordinary objects.
        this.getFieldValue = function (objectOrReference, storeFieldName) {
            return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.maybeDeepFreeze)((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isReference)(objectOrReference) ?
                _this.get(objectOrReference.__ref, storeFieldName)
                : objectOrReference && objectOrReference[storeFieldName]);
        };
        // Returns true for non-normalized StoreObjects and non-dangling
        // References, indicating that readField(name, objOrRef) has a chance of
        // working. Useful for filtering out dangling references from lists.
        this.canRead = function (objOrRef) {
            return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isReference)(objOrRef) ?
                _this.has(objOrRef.__ref)
                : typeof objOrRef === "object";
        };
        // Bound function that converts an id or an object with a __typename and
        // primary key fields to a Reference object. If called with a Reference object,
        // that same Reference object is returned. Pass true for mergeIntoStore to persist
        // an object into the store.
        this.toReference = function (objOrIdOrRef, mergeIntoStore) {
            if (typeof objOrIdOrRef === "string") {
                return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.makeReference)(objOrIdOrRef);
            }
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isReference)(objOrIdOrRef)) {
                return objOrIdOrRef;
            }
            var id = _this.policies.identify(objOrIdOrRef)[0];
            if (id) {
                var ref = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.makeReference)(id);
                if (mergeIntoStore) {
                    _this.merge(id, objOrIdOrRef);
                }
                return ref;
            }
        };
    }
    // Although the EntityStore class is abstract, it contains concrete
    // implementations of the various NormalizedCache interface methods that
    // are inherited by the Root and Layer subclasses.
    EntityStore.prototype.toObject = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, this.data);
    };
    EntityStore.prototype.has = function (dataId) {
        return this.lookup(dataId, true) !== void 0;
    };
    EntityStore.prototype.get = function (dataId, fieldName) {
        this.group.depend(dataId, fieldName);
        if (_helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(this.data, dataId)) {
            var storeObject = this.data[dataId];
            if (storeObject && _helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(storeObject, fieldName)) {
                return storeObject[fieldName];
            }
        }
        if (fieldName === "__typename" &&
            _helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(this.policies.rootTypenamesById, dataId)) {
            return this.policies.rootTypenamesById[dataId];
        }
        if (this instanceof Layer) {
            return this.parent.get(dataId, fieldName);
        }
    };
    EntityStore.prototype.lookup = function (dataId, dependOnExistence) {
        // The has method (above) calls lookup with dependOnExistence = true, so
        // that it can later be invalidated when we add or remove a StoreObject for
        // this dataId. Any consumer who cares about the contents of the StoreObject
        // should not rely on this dependency, since the contents could change
        // without the object being added or removed.
        if (dependOnExistence)
            this.group.depend(dataId, "__exists");
        if (_helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(this.data, dataId)) {
            return this.data[dataId];
        }
        if (this instanceof Layer) {
            return this.parent.lookup(dataId, dependOnExistence);
        }
        if (this.policies.rootTypenamesById[dataId]) {
            return Object.create(null);
        }
    };
    EntityStore.prototype.merge = function (older, newer) {
        var _this = this;
        var dataId;
        // Convert unexpected references to ID strings.
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isReference)(older))
            older = older.__ref;
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isReference)(newer))
            newer = newer.__ref;
        var existing = typeof older === "string" ? this.lookup((dataId = older)) : older;
        var incoming = typeof newer === "string" ? this.lookup((dataId = newer)) : newer;
        // If newer was a string ID, but that ID was not defined in this store,
        // then there are no fields to be merged, so we're done.
        if (!incoming)
            return;
        (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(typeof dataId === "string", 1);
        var merged = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.DeepMerger(storeObjectReconciler).merge(existing, incoming);
        // Even if merged === existing, existing may have come from a lower
        // layer, so we always need to set this.data[dataId] on this level.
        this.data[dataId] = merged;
        if (merged !== existing) {
            delete this.refs[dataId];
            if (this.group.caching) {
                var fieldsToDirty_1 = Object.create(null);
                // If we added a new StoreObject where there was previously none, dirty
                // anything that depended on the existence of this dataId, such as the
                // EntityStore#has method.
                if (!existing)
                    fieldsToDirty_1.__exists = 1;
                // Now invalidate dependents who called getFieldValue for any fields
                // that are changing as a result of this merge.
                Object.keys(incoming).forEach(function (storeFieldName) {
                    if (!existing ||
                        existing[storeFieldName] !== merged[storeFieldName]) {
                        // Always dirty the full storeFieldName, which may include
                        // serialized arguments following the fieldName prefix.
                        fieldsToDirty_1[storeFieldName] = 1;
                        // Also dirty fieldNameFromStoreName(storeFieldName) if it's
                        // different from storeFieldName and this field does not have
                        // keyArgs configured, because that means the cache can't make
                        // any assumptions about how field values with the same field
                        // name but different arguments might be interrelated, so it
                        // must err on the side of invalidating all field values that
                        // share the same short fieldName, regardless of arguments.
                        var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_7__.fieldNameFromStoreName)(storeFieldName);
                        if (fieldName !== storeFieldName &&
                            !_this.policies.hasKeyArgs(merged.__typename, fieldName)) {
                            fieldsToDirty_1[fieldName] = 1;
                        }
                        // If merged[storeFieldName] has become undefined, and this is the
                        // Root layer, actually delete the property from the merged object,
                        // which is guaranteed to have been created fresh in this method.
                        if (merged[storeFieldName] === void 0 && !(_this instanceof Layer)) {
                            delete merged[storeFieldName];
                        }
                    }
                });
                if (fieldsToDirty_1.__typename &&
                    !(existing && existing.__typename) &&
                    // Since we return default root __typename strings
                    // automatically from store.get, we don't need to dirty the
                    // ROOT_QUERY.__typename field if merged.__typename is equal
                    // to the default string (usually "Query").
                    this.policies.rootTypenamesById[dataId] === merged.__typename) {
                    delete fieldsToDirty_1.__typename;
                }
                Object.keys(fieldsToDirty_1).forEach(function (fieldName) {
                    return _this.group.dirty(dataId, fieldName);
                });
            }
        }
    };
    EntityStore.prototype.modify = function (dataId, fields) {
        var _this = this;
        var storeObject = this.lookup(dataId);
        if (storeObject) {
            var changedFields_1 = Object.create(null);
            var needToMerge_1 = false;
            var allDeleted_1 = true;
            var sharedDetails_1 = {
                DELETE: DELETE,
                INVALIDATE: INVALIDATE,
                isReference: _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isReference,
                toReference: this.toReference,
                canRead: this.canRead,
                readField: function (fieldNameOrOptions, from) {
                    return _this.policies.readField(typeof fieldNameOrOptions === "string" ?
                        {
                            fieldName: fieldNameOrOptions,
                            from: from || (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.makeReference)(dataId),
                        }
                        : fieldNameOrOptions, { store: _this });
                },
            };
            Object.keys(storeObject).forEach(function (storeFieldName) {
                var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_7__.fieldNameFromStoreName)(storeFieldName);
                var fieldValue = storeObject[storeFieldName];
                if (fieldValue === void 0)
                    return;
                var modify = typeof fields === "function" ? fields : (fields[storeFieldName] || fields[fieldName]);
                if (modify) {
                    var newValue = modify === delModifier ? DELETE : (modify((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.maybeDeepFreeze)(fieldValue), (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, sharedDetails_1), { fieldName: fieldName, storeFieldName: storeFieldName, storage: _this.getStorage(dataId, storeFieldName) })));
                    if (newValue === INVALIDATE) {
                        _this.group.dirty(dataId, storeFieldName);
                    }
                    else {
                        if (newValue === DELETE)
                            newValue = void 0;
                        if (newValue !== fieldValue) {
                            changedFields_1[storeFieldName] = newValue;
                            needToMerge_1 = true;
                            fieldValue = newValue;
                            if (globalThis.__DEV__ !== false) {
                                var checkReference = function (ref) {
                                    if (_this.lookup(ref.__ref) === undefined) {
                                        globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(2, ref);
                                        return true;
                                    }
                                };
                                if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isReference)(newValue)) {
                                    checkReference(newValue);
                                }
                                else if (Array.isArray(newValue)) {
                                    // Warn about writing "mixed" arrays of Reference and non-Reference objects
                                    var seenReference = false;
                                    var someNonReference = void 0;
                                    for (var _i = 0, newValue_1 = newValue; _i < newValue_1.length; _i++) {
                                        var value = newValue_1[_i];
                                        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isReference)(value)) {
                                            seenReference = true;
                                            if (checkReference(value))
                                                break;
                                        }
                                        else {
                                            // Do not warn on primitive values, since those could never be represented
                                            // by a reference. This is a valid (albeit uncommon) use case.
                                            if (typeof value === "object" && !!value) {
                                                var id = _this.policies.identify(value)[0];
                                                // check if object could even be referenced, otherwise we are not interested in it for this warning
                                                if (id) {
                                                    someNonReference = value;
                                                }
                                            }
                                        }
                                        if (seenReference && someNonReference !== undefined) {
                                            globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(3, someNonReference);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (fieldValue !== void 0) {
                    allDeleted_1 = false;
                }
            });
            if (needToMerge_1) {
                this.merge(dataId, changedFields_1);
                if (allDeleted_1) {
                    if (this instanceof Layer) {
                        this.data[dataId] = void 0;
                    }
                    else {
                        delete this.data[dataId];
                    }
                    this.group.dirty(dataId, "__exists");
                }
                return true;
            }
        }
        return false;
    };
    // If called with only one argument, removes the entire entity
    // identified by dataId. If called with a fieldName as well, removes all
    // fields of that entity whose names match fieldName according to the
    // fieldNameFromStoreName helper function. If called with a fieldName
    // and variables, removes all fields of that entity whose names match fieldName
    // and whose arguments when cached exactly match the variables passed.
    EntityStore.prototype.delete = function (dataId, fieldName, args) {
        var _a;
        var storeObject = this.lookup(dataId);
        if (storeObject) {
            var typename = this.getFieldValue(storeObject, "__typename");
            var storeFieldName = fieldName && args ?
                this.policies.getStoreFieldName({ typename: typename, fieldName: fieldName, args: args })
                : fieldName;
            return this.modify(dataId, storeFieldName ? (_a = {},
                _a[storeFieldName] = delModifier,
                _a) : delModifier);
        }
        return false;
    };
    EntityStore.prototype.evict = function (options, limit) {
        var evicted = false;
        if (options.id) {
            if (_helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(this.data, options.id)) {
                evicted = this.delete(options.id, options.fieldName, options.args);
            }
            if (this instanceof Layer && this !== limit) {
                evicted = this.parent.evict(options, limit) || evicted;
            }
            // Always invalidate the field to trigger rereading of watched
            // queries, even if no cache data was modified by the eviction,
            // because queries may depend on computed fields with custom read
            // functions, whose values are not stored in the EntityStore.
            if (options.fieldName || evicted) {
                this.group.dirty(options.id, options.fieldName || "__exists");
            }
        }
        return evicted;
    };
    EntityStore.prototype.clear = function () {
        this.replace(null);
    };
    EntityStore.prototype.extract = function () {
        var _this = this;
        var obj = this.toObject();
        var extraRootIds = [];
        this.getRootIdSet().forEach(function (id) {
            if (!_helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(_this.policies.rootTypenamesById, id)) {
                extraRootIds.push(id);
            }
        });
        if (extraRootIds.length) {
            obj.__META = { extraRootIds: extraRootIds.sort() };
        }
        return obj;
    };
    EntityStore.prototype.replace = function (newData) {
        var _this = this;
        Object.keys(this.data).forEach(function (dataId) {
            if (!(newData && _helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(newData, dataId))) {
                _this.delete(dataId);
            }
        });
        if (newData) {
            var __META = newData.__META, rest_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__rest)(newData, ["__META"]);
            Object.keys(rest_1).forEach(function (dataId) {
                _this.merge(dataId, rest_1[dataId]);
            });
            if (__META) {
                __META.extraRootIds.forEach(this.retain, this);
            }
        }
    };
    EntityStore.prototype.retain = function (rootId) {
        return (this.rootIds[rootId] = (this.rootIds[rootId] || 0) + 1);
    };
    EntityStore.prototype.release = function (rootId) {
        if (this.rootIds[rootId] > 0) {
            var count = --this.rootIds[rootId];
            if (!count)
                delete this.rootIds[rootId];
            return count;
        }
        return 0;
    };
    // Return a Set<string> of all the ID strings that have been retained by
    // this layer/root *and* any layers/roots beneath it.
    EntityStore.prototype.getRootIdSet = function (ids) {
        if (ids === void 0) { ids = new Set(); }
        Object.keys(this.rootIds).forEach(ids.add, ids);
        if (this instanceof Layer) {
            this.parent.getRootIdSet(ids);
        }
        else {
            // Official singleton IDs like ROOT_QUERY and ROOT_MUTATION are
            // always considered roots for garbage collection, regardless of
            // their retainment counts in this.rootIds.
            Object.keys(this.policies.rootTypenamesById).forEach(ids.add, ids);
        }
        return ids;
    };
    // The goal of garbage collection is to remove IDs from the Root layer of the
    // store that are no longer reachable starting from any IDs that have been
    // explicitly retained (see retain and release, above). Returns an array of
    // dataId strings that were removed from the store.
    EntityStore.prototype.gc = function () {
        var _this = this;
        var ids = this.getRootIdSet();
        var snapshot = this.toObject();
        ids.forEach(function (id) {
            if (_helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(snapshot, id)) {
                // Because we are iterating over an ECMAScript Set, the IDs we add here
                // will be visited in later iterations of the forEach loop only if they
                // were not previously contained by the Set.
                Object.keys(_this.findChildRefIds(id)).forEach(ids.add, ids);
                // By removing IDs from the snapshot object here, we protect them from
                // getting removed from the root store layer below.
                delete snapshot[id];
            }
        });
        var idsToRemove = Object.keys(snapshot);
        if (idsToRemove.length) {
            var root_1 = this;
            while (root_1 instanceof Layer)
                root_1 = root_1.parent;
            idsToRemove.forEach(function (id) { return root_1.delete(id); });
        }
        return idsToRemove;
    };
    EntityStore.prototype.findChildRefIds = function (dataId) {
        if (!_helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(this.refs, dataId)) {
            var found_1 = (this.refs[dataId] = Object.create(null));
            var root = this.data[dataId];
            if (!root)
                return found_1;
            var workSet_1 = new Set([root]);
            // Within the store, only arrays and objects can contain child entity
            // references, so we can prune the traversal using this predicate:
            workSet_1.forEach(function (obj) {
                if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isReference)(obj)) {
                    found_1[obj.__ref] = true;
                    // In rare cases, a { __ref } Reference object may have other fields.
                    // This often indicates a mismerging of References with StoreObjects,
                    // but garbage collection should not be fooled by a stray __ref
                    // property in a StoreObject (ignoring all the other fields just
                    // because the StoreObject looks like a Reference). To avoid this
                    // premature termination of findChildRefIds recursion, we fall through
                    // to the code below, which will handle any other properties of obj.
                }
                if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.isNonNullObject)(obj)) {
                    Object.keys(obj).forEach(function (key) {
                        var child = obj[key];
                        // No need to add primitive values to the workSet, since they cannot
                        // contain reference objects.
                        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.isNonNullObject)(child)) {
                            workSet_1.add(child);
                        }
                    });
                }
            });
        }
        return this.refs[dataId];
    };
    EntityStore.prototype.makeCacheKey = function () {
        return this.group.keyMaker.lookupArray(arguments);
    };
    return EntityStore;
}());

// A single CacheGroup represents a set of one or more EntityStore objects,
// typically the Root store in a CacheGroup by itself, and all active Layer
// stores in a group together. A single EntityStore object belongs to only
// one CacheGroup, store.group. The CacheGroup is responsible for tracking
// dependencies, so store.group is helpful for generating unique keys for
// cached results that need to be invalidated when/if those dependencies
// change. If we used the EntityStore objects themselves as cache keys (that
// is, store rather than store.group), the cache would become unnecessarily
// fragmented by all the different Layer objects. Instead, the CacheGroup
// approach allows all optimistic Layer objects in the same linked list to
// belong to one CacheGroup, with the non-optimistic Root object belonging
// to another CacheGroup, allowing resultCaching dependencies to be tracked
// separately for optimistic and non-optimistic entity data.
var CacheGroup = /** @class */ (function () {
    function CacheGroup(caching, parent) {
        if (parent === void 0) { parent = null; }
        this.caching = caching;
        this.parent = parent;
        this.d = null;
        this.resetCaching();
    }
    CacheGroup.prototype.resetCaching = function () {
        this.d = this.caching ? (0,optimism__WEBPACK_IMPORTED_MODULE_1__.dep)() : null;
        this.keyMaker = new _wry_trie__WEBPACK_IMPORTED_MODULE_3__.Trie(_utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.canUseWeakMap);
    };
    CacheGroup.prototype.depend = function (dataId, storeFieldName) {
        if (this.d) {
            this.d(makeDepKey(dataId, storeFieldName));
            var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_7__.fieldNameFromStoreName)(storeFieldName);
            if (fieldName !== storeFieldName) {
                // Fields with arguments that contribute extra identifying
                // information to the fieldName (thus forming the storeFieldName)
                // depend not only on the full storeFieldName but also on the
                // short fieldName, so the field can be invalidated using either
                // level of specificity.
                this.d(makeDepKey(dataId, fieldName));
            }
            if (this.parent) {
                this.parent.depend(dataId, storeFieldName);
            }
        }
    };
    CacheGroup.prototype.dirty = function (dataId, storeFieldName) {
        if (this.d) {
            this.d.dirty(makeDepKey(dataId, storeFieldName), 
            // When storeFieldName === "__exists", that means the entity identified
            // by dataId has either disappeared from the cache or was newly added,
            // so the result caching system would do well to "forget everything it
            // knows" about that object. To achieve that kind of invalidation, we
            // not only dirty the associated result cache entry, but also remove it
            // completely from the dependency graph. For the optimism implementation
            // details, see https://github.com/benjamn/optimism/pull/195.
            storeFieldName === "__exists" ? "forget" : "setDirty");
        }
    };
    return CacheGroup;
}());
function makeDepKey(dataId, storeFieldName) {
    // Since field names cannot have '#' characters in them, this method
    // of joining the field name and the ID should be unambiguous, and much
    // cheaper than JSON.stringify([dataId, fieldName]).
    return storeFieldName + "#" + dataId;
}
function maybeDependOnExistenceOfEntity(store, entityId) {
    if (supportsResultCaching(store)) {
        // We use this pseudo-field __exists elsewhere in the EntityStore code to
        // represent changes in the existence of the entity object identified by
        // entityId. This dependency gets reliably dirtied whenever an object with
        // this ID is deleted (or newly created) within this group, so any result
        // cache entries (for example, StoreReader#executeSelectionSet results) that
        // depend on __exists for this entityId will get dirtied as well, leading to
        // the eventual recomputation (instead of reuse) of those result objects the
        // next time someone reads them from the cache.
        store.group.depend(entityId, "__exists");
    }
}
(function (EntityStore) {
    // Refer to this class as EntityStore.Root outside this namespace.
    var Root = /** @class */ (function (_super) {
        (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__extends)(Root, _super);
        function Root(_a) {
            var policies = _a.policies, _b = _a.resultCaching, resultCaching = _b === void 0 ? true : _b, seed = _a.seed;
            var _this = _super.call(this, policies, new CacheGroup(resultCaching)) || this;
            _this.stump = new Stump(_this);
            _this.storageTrie = new _wry_trie__WEBPACK_IMPORTED_MODULE_3__.Trie(_utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.canUseWeakMap);
            if (seed)
                _this.replace(seed);
            return _this;
        }
        Root.prototype.addLayer = function (layerId, replay) {
            // Adding an optimistic Layer on top of the Root actually adds the Layer
            // on top of the Stump, so the Stump always comes between the Root and
            // any Layer objects that we've added.
            return this.stump.addLayer(layerId, replay);
        };
        Root.prototype.removeLayer = function () {
            // Never remove the root layer.
            return this;
        };
        Root.prototype.getStorage = function () {
            return this.storageTrie.lookupArray(arguments);
        };
        return Root;
    }(EntityStore));
    EntityStore.Root = Root;
})(EntityStore || (EntityStore = {}));
// Not exported, since all Layer instances are created by the addLayer method
// of the EntityStore.Root class.
var Layer = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__extends)(Layer, _super);
    function Layer(id, parent, replay, group) {
        var _this = _super.call(this, parent.policies, group) || this;
        _this.id = id;
        _this.parent = parent;
        _this.replay = replay;
        _this.group = group;
        replay(_this);
        return _this;
    }
    Layer.prototype.addLayer = function (layerId, replay) {
        return new Layer(layerId, this, replay, this.group);
    };
    Layer.prototype.removeLayer = function (layerId) {
        var _this = this;
        // Remove all instances of the given id, not just the first one.
        var parent = this.parent.removeLayer(layerId);
        if (layerId === this.id) {
            if (this.group.caching) {
                // Dirty every ID we're removing. Technically we might be able to avoid
                // dirtying fields that have values in higher layers, but we don't have
                // easy access to higher layers here, and we're about to recreate those
                // layers anyway (see parent.addLayer below).
                Object.keys(this.data).forEach(function (dataId) {
                    var ownStoreObject = _this.data[dataId];
                    var parentStoreObject = parent["lookup"](dataId);
                    if (!parentStoreObject) {
                        // The StoreObject identified by dataId was defined in this layer
                        // but will be undefined in the parent layer, so we can delete the
                        // whole entity using this.delete(dataId). Since we're about to
                        // throw this layer away, the only goal of this deletion is to dirty
                        // the removed fields.
                        _this.delete(dataId);
                    }
                    else if (!ownStoreObject) {
                        // This layer had an entry for dataId but it was undefined, which
                        // means the entity was deleted in this layer, and it's about to
                        // become undeleted when we remove this layer, so we need to dirty
                        // all fields that are about to be reexposed.
                        _this.group.dirty(dataId, "__exists");
                        Object.keys(parentStoreObject).forEach(function (storeFieldName) {
                            _this.group.dirty(dataId, storeFieldName);
                        });
                    }
                    else if (ownStoreObject !== parentStoreObject) {
                        // If ownStoreObject is not exactly the same as parentStoreObject,
                        // dirty any fields whose values will change as a result of this
                        // removal.
                        Object.keys(ownStoreObject).forEach(function (storeFieldName) {
                            if (!(0,_wry_equality__WEBPACK_IMPORTED_MODULE_2__.equal)(ownStoreObject[storeFieldName], parentStoreObject[storeFieldName])) {
                                _this.group.dirty(dataId, storeFieldName);
                            }
                        });
                    }
                });
            }
            return parent;
        }
        // No changes are necessary if the parent chain remains identical.
        if (parent === this.parent)
            return this;
        // Recreate this layer on top of the new parent.
        return parent.addLayer(this.id, this.replay);
    };
    Layer.prototype.toObject = function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, this.parent.toObject()), this.data);
    };
    Layer.prototype.findChildRefIds = function (dataId) {
        var fromParent = this.parent.findChildRefIds(dataId);
        return _helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(this.data, dataId) ? (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, fromParent), _super.prototype.findChildRefIds.call(this, dataId)) : fromParent;
    };
    Layer.prototype.getStorage = function () {
        var p = this.parent;
        while (p.parent)
            p = p.parent;
        return p.getStorage.apply(p, 
        // @ts-expect-error
        arguments);
    };
    return Layer;
}(EntityStore));
// Represents a Layer permanently installed just above the Root, which allows
// reading optimistically (and registering optimistic dependencies) even when
// no optimistic layers are currently active. The stump.group CacheGroup object
// is shared by any/all Layer objects added on top of the Stump.
var Stump = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__extends)(Stump, _super);
    function Stump(root) {
        return _super.call(this, "EntityStore.Stump", root, function () { }, new CacheGroup(root.group.caching, root.group)) || this;
    }
    Stump.prototype.removeLayer = function () {
        // Never remove the Stump layer.
        return this;
    };
    Stump.prototype.merge = function (older, newer) {
        // We never want to write any data into the Stump, so we forward any merge
        // calls to the Root instead. Another option here would be to throw an
        // exception, but the toReference(object, true) function can sometimes
        // trigger Stump writes (which used to be Root writes, before the Stump
        // concept was introduced).
        return this.parent.merge(older, newer);
    };
    return Stump;
}(Layer));
function storeObjectReconciler(existingObject, incomingObject, property) {
    var existingValue = existingObject[property];
    var incomingValue = incomingObject[property];
    // Wherever there is a key collision, prefer the incoming value, unless
    // it is deeply equal to the existing value. It's worth checking deep
    // equality here (even though blindly returning incoming would be
    // logically correct) because preserving the referential identity of
    // existing data can prevent needless rereading and rerendering.
    return (0,_wry_equality__WEBPACK_IMPORTED_MODULE_2__.equal)(existingValue, incomingValue) ? existingValue : incomingValue;
}
function supportsResultCaching(store) {
    // When result caching is disabled, store.depend will be null.
    return !!(store instanceof EntityStore && store.group.caching);
}
//# sourceMappingURL=entityStore.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/cache/inmemory/helpers.js":
/*!***************************************************************!*\
  !*** ./node_modules/@apollo/client/cache/inmemory/helpers.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypeOrFieldNameRegExp: () => (/* binding */ TypeOrFieldNameRegExp),
/* harmony export */   defaultDataIdFromObject: () => (/* binding */ defaultDataIdFromObject),
/* harmony export */   extractFragmentContext: () => (/* binding */ extractFragmentContext),
/* harmony export */   fieldNameFromStoreName: () => (/* binding */ fieldNameFromStoreName),
/* harmony export */   getTypenameFromStoreObject: () => (/* binding */ getTypenameFromStoreObject),
/* harmony export */   hasOwn: () => (/* binding */ hasOwn),
/* harmony export */   isArray: () => (/* reexport safe */ _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.isArray),
/* harmony export */   isNullish: () => (/* binding */ isNullish),
/* harmony export */   makeProcessedFieldsMerger: () => (/* binding */ makeProcessedFieldsMerger),
/* harmony export */   normalizeConfig: () => (/* binding */ normalizeConfig),
/* harmony export */   selectionSetMatchesResult: () => (/* binding */ selectionSetMatchesResult),
/* harmony export */   shouldCanonizeResults: () => (/* binding */ shouldCanonizeResults),
/* harmony export */   storeValueIsStoreObject: () => (/* binding */ storeValueIsStoreObject)
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/compact.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/objects.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/directives.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/mergeDeep.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/fragments.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");

var hasOwn = Object.prototype.hasOwnProperty;
function isNullish(value) {
    return value === null || value === void 0;
}

function defaultDataIdFromObject(_a, context) {
    var __typename = _a.__typename, id = _a.id, _id = _a._id;
    if (typeof __typename === "string") {
        if (context) {
            context.keyObject =
                !isNullish(id) ? { id: id }
                    : !isNullish(_id) ? { _id: _id }
                        : void 0;
        }
        // If there is no object.id, fall back to object._id.
        if (isNullish(id) && !isNullish(_id)) {
            id = _id;
        }
        if (!isNullish(id)) {
            return "".concat(__typename, ":").concat(typeof id === "number" || typeof id === "string" ?
                id
                : JSON.stringify(id));
        }
    }
}
var defaultConfig = {
    dataIdFromObject: defaultDataIdFromObject,
    addTypename: true,
    resultCaching: true,
    // Thanks to the shouldCanonizeResults helper, this should be the only line
    // you have to change to reenable canonization by default in the future.
    canonizeResults: false,
};
function normalizeConfig(config) {
    return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.compact)(defaultConfig, config);
}
function shouldCanonizeResults(config) {
    var value = config.canonizeResults;
    return value === void 0 ? defaultConfig.canonizeResults : value;
}
function getTypenameFromStoreObject(store, objectOrReference) {
    return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(objectOrReference) ?
        store.get(objectOrReference.__ref, "__typename")
        : objectOrReference && objectOrReference.__typename;
}
var TypeOrFieldNameRegExp = /^[_a-z][_0-9a-z]*/i;
function fieldNameFromStoreName(storeFieldName) {
    var match = storeFieldName.match(TypeOrFieldNameRegExp);
    return match ? match[0] : storeFieldName;
}
function selectionSetMatchesResult(selectionSet, result, variables) {
    if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.isNonNullObject)(result)) {
        return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(result) ?
            result.every(function (item) {
                return selectionSetMatchesResult(selectionSet, item, variables);
            })
            : selectionSet.selections.every(function (field) {
                if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isField)(field) && (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.shouldInclude)(field, variables)) {
                    var key = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.resultKeyNameFromField)(field);
                    return (hasOwn.call(result, key) &&
                        (!field.selectionSet ||
                            selectionSetMatchesResult(field.selectionSet, result[key], variables)));
                }
                // If the selection has been skipped with @skip(true) or
                // @include(false), it should not count against the matching. If
                // the selection is not a field, it must be a fragment (inline or
                // named). We will determine if selectionSetMatchesResult for that
                // fragment when we get to it, so for now we return true.
                return true;
            });
    }
    return false;
}
function storeValueIsStoreObject(value) {
    return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.isNonNullObject)(value) && !(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isReference)(value) && !(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(value);
}
function makeProcessedFieldsMerger() {
    return new _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.DeepMerger();
}
function extractFragmentContext(document, fragments) {
    // FragmentMap consisting only of fragments defined directly in document, not
    // including other fragments registered in the FragmentRegistry.
    var fragmentMap = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_6__.createFragmentMap)((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.getFragmentDefinitions)(document));
    return {
        fragmentMap: fragmentMap,
        lookupFragment: function (name) {
            var def = fragmentMap[name];
            if (!def && fragments) {
                def = fragments.lookup(name);
            }
            return def || null;
        },
    };
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/cache/inmemory/inMemoryCache.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@apollo/client/cache/inmemory/inMemoryCache.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InMemoryCache: () => (/* binding */ InMemoryCache)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! optimism */ "./node_modules/optimism/lib/index.js");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/index.js");
/* harmony import */ var _core_cache_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../core/cache.js */ "./node_modules/@apollo/client/cache/core/cache.js");
/* harmony import */ var _core_types_common_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/types/common.js */ "./node_modules/@apollo/client/cache/core/types/common.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/DocumentTransform.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/transform.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/caching/sizes.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canonicalStringify.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/print.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _readFromStore_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./readFromStore.js */ "./node_modules/@apollo/client/cache/inmemory/readFromStore.js");
/* harmony import */ var _writeToStore_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./writeToStore.js */ "./node_modules/@apollo/client/cache/inmemory/writeToStore.js");
/* harmony import */ var _entityStore_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./entityStore.js */ "./node_modules/@apollo/client/cache/inmemory/entityStore.js");
/* harmony import */ var _reactiveVars_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reactiveVars.js */ "./node_modules/@apollo/client/cache/inmemory/reactiveVars.js");
/* harmony import */ var _policies_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./policies.js */ "./node_modules/@apollo/client/cache/inmemory/policies.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/cache/inmemory/helpers.js");
/* harmony import */ var _utilities_caching_getMemoryInternals_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../utilities/caching/getMemoryInternals.js */ "./node_modules/@apollo/client/utilities/caching/getMemoryInternals.js");


// Make builtins like Map and Set safe to use with non-extensible objects.













var InMemoryCache = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(InMemoryCache, _super);
    function InMemoryCache(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.watches = new Set();
        _this.addTypenameTransform = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.DocumentTransform(_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.addTypenameToDocument);
        // Override the default value, since InMemoryCache result objects are frozen
        // in development and expected to remain logically immutable in production.
        _this.assumeImmutableResults = true;
        _this.makeVar = _reactiveVars_js__WEBPACK_IMPORTED_MODULE_6__.makeVar;
        _this.txCount = 0;
        _this.config = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_7__.normalizeConfig)(config);
        _this.addTypename = !!_this.config.addTypename;
        _this.policies = new _policies_js__WEBPACK_IMPORTED_MODULE_8__.Policies({
            cache: _this,
            dataIdFromObject: _this.config.dataIdFromObject,
            possibleTypes: _this.config.possibleTypes,
            typePolicies: _this.config.typePolicies,
        });
        _this.init();
        return _this;
    }
    InMemoryCache.prototype.init = function () {
        // Passing { resultCaching: false } in the InMemoryCache constructor options
        // will completely disable dependency tracking, which will improve memory
        // usage but worsen the performance of repeated reads.
        var rootStore = (this.data = new _entityStore_js__WEBPACK_IMPORTED_MODULE_9__.EntityStore.Root({
            policies: this.policies,
            resultCaching: this.config.resultCaching,
        }));
        // When no optimistic writes are currently active, cache.optimisticData ===
        // cache.data, so there are no additional layers on top of the actual data.
        // When an optimistic update happens, this.optimisticData will become a
        // linked list of EntityStore Layer objects that terminates with the
        // original this.data cache object.
        this.optimisticData = rootStore.stump;
        this.resetResultCache();
    };
    InMemoryCache.prototype.resetResultCache = function (resetResultIdentities) {
        var _this = this;
        var previousReader = this.storeReader;
        var fragments = this.config.fragments;
        // The StoreWriter is mostly stateless and so doesn't really need to be
        // reset, but it does need to have its writer.storeReader reference updated,
        // so it's simpler to update this.storeWriter as well.
        this.storeWriter = new _writeToStore_js__WEBPACK_IMPORTED_MODULE_10__.StoreWriter(this, (this.storeReader = new _readFromStore_js__WEBPACK_IMPORTED_MODULE_11__.StoreReader({
            cache: this,
            addTypename: this.addTypename,
            resultCacheMaxSize: this.config.resultCacheMaxSize,
            canonizeResults: (0,_helpers_js__WEBPACK_IMPORTED_MODULE_7__.shouldCanonizeResults)(this.config),
            canon: resetResultIdentities ? void 0 : (previousReader && previousReader.canon),
            fragments: fragments,
        })), fragments);
        this.maybeBroadcastWatch = (0,optimism__WEBPACK_IMPORTED_MODULE_1__.wrap)(function (c, options) {
            return _this.broadcastWatch(c, options);
        }, {
            max: this.config.resultCacheMaxSize ||
                _utilities_index_js__WEBPACK_IMPORTED_MODULE_12__.cacheSizes["inMemoryCache.maybeBroadcastWatch"] ||
                5000 /* defaultCacheSizes["inMemoryCache.maybeBroadcastWatch"] */,
            makeCacheKey: function (c) {
                // Return a cache key (thus enabling result caching) only if we're
                // currently using a data store that can track cache dependencies.
                var store = c.optimistic ? _this.optimisticData : _this.data;
                if ((0,_entityStore_js__WEBPACK_IMPORTED_MODULE_9__.supportsResultCaching)(store)) {
                    var optimistic = c.optimistic, id = c.id, variables = c.variables;
                    return store.makeCacheKey(c.query, 
                    // Different watches can have the same query, optimistic
                    // status, rootId, and variables, but if their callbacks are
                    // different, the (identical) result needs to be delivered to
                    // each distinct callback. The easiest way to achieve that
                    // separation is to include c.callback in the cache key for
                    // maybeBroadcastWatch calls. See issue #5733.
                    c.callback, (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.canonicalStringify)({ optimistic: optimistic, id: id, variables: variables }));
                }
            },
        });
        // Since we have thrown away all the cached functions that depend on the
        // CacheGroup dependencies maintained by EntityStore, we should also reset
        // all CacheGroup dependency information.
        new Set([this.data.group, this.optimisticData.group]).forEach(function (group) {
            return group.resetCaching();
        });
    };
    InMemoryCache.prototype.restore = function (data) {
        this.init();
        // Since calling this.init() discards/replaces the entire StoreReader, along
        // with the result caches it maintains, this.data.replace(data) won't have
        // to bother deleting the old data.
        if (data)
            this.data.replace(data);
        return this;
    };
    InMemoryCache.prototype.extract = function (optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return (optimistic ? this.optimisticData : this.data).extract();
    };
    InMemoryCache.prototype.read = function (options) {
        var 
        // Since read returns data or null, without any additional metadata
        // about whether/where there might have been missing fields, the
        // default behavior cannot be returnPartialData = true (like it is
        // for the diff method), since defaulting to true would violate the
        // integrity of the T in the return type. However, partial data may
        // be useful in some cases, so returnPartialData:true may be
        // specified explicitly.
        _a = options.returnPartialData, 
        // Since read returns data or null, without any additional metadata
        // about whether/where there might have been missing fields, the
        // default behavior cannot be returnPartialData = true (like it is
        // for the diff method), since defaulting to true would violate the
        // integrity of the T in the return type. However, partial data may
        // be useful in some cases, so returnPartialData:true may be
        // specified explicitly.
        returnPartialData = _a === void 0 ? false : _a;
        try {
            return (this.storeReader.diffQueryAgainstStore((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, options), { store: options.optimistic ? this.optimisticData : this.data, config: this.config, returnPartialData: returnPartialData })).result || null);
        }
        catch (e) {
            if (e instanceof _core_types_common_js__WEBPACK_IMPORTED_MODULE_14__.MissingFieldError) {
                // Swallow MissingFieldError and return null, so callers do not need to
                // worry about catching "normal" exceptions resulting from incomplete
                // cache data. Unexpected errors will be re-thrown. If you need more
                // information about which fields were missing, use cache.diff instead,
                // and examine diffResult.missing.
                return null;
            }
            throw e;
        }
    };
    InMemoryCache.prototype.write = function (options) {
        try {
            ++this.txCount;
            return this.storeWriter.writeToStore(this.data, options);
        }
        finally {
            if (!--this.txCount && options.broadcast !== false) {
                this.broadcastWatches();
            }
        }
    };
    InMemoryCache.prototype.modify = function (options) {
        if (_helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(options, "id") && !options.id) {
            // To my knowledge, TypeScript does not currently provide a way to
            // enforce that an optional property?:type must *not* be undefined
            // when present. That ability would be useful here, because we want
            // options.id to default to ROOT_QUERY only when no options.id was
            // provided. If the caller attempts to pass options.id with a
            // falsy/undefined value (perhaps because cache.identify failed), we
            // should not assume the goal was to modify the ROOT_QUERY object.
            // We could throw, but it seems natural to return false to indicate
            // that nothing was modified.
            return false;
        }
        var store = ((options.optimistic) // Defaults to false.
        ) ?
            this.optimisticData
            : this.data;
        try {
            ++this.txCount;
            return store.modify(options.id || "ROOT_QUERY", options.fields);
        }
        finally {
            if (!--this.txCount && options.broadcast !== false) {
                this.broadcastWatches();
            }
        }
    };
    InMemoryCache.prototype.diff = function (options) {
        return this.storeReader.diffQueryAgainstStore((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, options), { store: options.optimistic ? this.optimisticData : this.data, rootId: options.id || "ROOT_QUERY", config: this.config }));
    };
    InMemoryCache.prototype.watch = function (watch) {
        var _this = this;
        if (!this.watches.size) {
            // In case we previously called forgetCache(this) because
            // this.watches became empty (see below), reattach this cache to any
            // reactive variables on which it previously depended. It might seem
            // paradoxical that we're able to recall something we supposedly
            // forgot, but the point of calling forgetCache(this) is to silence
            // useless broadcasts while this.watches is empty, and to allow the
            // cache to be garbage collected. If, however, we manage to call
            // recallCache(this) here, this cache object must not have been
            // garbage collected yet, and should resume receiving updates from
            // reactive variables, now that it has a watcher to notify.
            (0,_reactiveVars_js__WEBPACK_IMPORTED_MODULE_6__.recallCache)(this);
        }
        this.watches.add(watch);
        if (watch.immediate) {
            this.maybeBroadcastWatch(watch);
        }
        return function () {
            // Once we remove the last watch from this.watches, cache.broadcastWatches
            // no longer does anything, so we preemptively tell the reactive variable
            // system to exclude this cache from future broadcasts.
            if (_this.watches.delete(watch) && !_this.watches.size) {
                (0,_reactiveVars_js__WEBPACK_IMPORTED_MODULE_6__.forgetCache)(_this);
            }
            // Remove this watch from the LRU cache managed by the
            // maybeBroadcastWatch OptimisticWrapperFunction, to prevent memory
            // leaks involving the closure of watch.callback.
            _this.maybeBroadcastWatch.forget(watch);
        };
    };
    InMemoryCache.prototype.gc = function (options) {
        var _a;
        _utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.canonicalStringify.reset();
        _utilities_index_js__WEBPACK_IMPORTED_MODULE_15__.print.reset();
        this.addTypenameTransform.resetCache();
        (_a = this.config.fragments) === null || _a === void 0 ? void 0 : _a.resetCaches();
        var ids = this.optimisticData.gc();
        if (options && !this.txCount) {
            if (options.resetResultCache) {
                this.resetResultCache(options.resetResultIdentities);
            }
            else if (options.resetResultIdentities) {
                this.storeReader.resetCanon();
            }
        }
        return ids;
    };
    // Call this method to ensure the given root ID remains in the cache after
    // garbage collection, along with its transitive child entities. Note that
    // the cache automatically retains all directly written entities. By default,
    // the retainment persists after optimistic updates are removed. Pass true
    // for the optimistic argument if you would prefer for the retainment to be
    // discarded when the top-most optimistic layer is removed. Returns the
    // resulting (non-negative) retainment count.
    InMemoryCache.prototype.retain = function (rootId, optimistic) {
        return (optimistic ? this.optimisticData : this.data).retain(rootId);
    };
    // Call this method to undo the effect of the retain method, above. Once the
    // retainment count falls to zero, the given ID will no longer be preserved
    // during garbage collection, though it may still be preserved by other safe
    // entities that refer to it. Returns the resulting (non-negative) retainment
    // count, in case that's useful.
    InMemoryCache.prototype.release = function (rootId, optimistic) {
        return (optimistic ? this.optimisticData : this.data).release(rootId);
    };
    // Returns the canonical ID for a given StoreObject, obeying typePolicies
    // and keyFields (and dataIdFromObject, if you still use that). At minimum,
    // the object must contain a __typename and any primary key fields required
    // to identify entities of that type. If you pass a query result object, be
    // sure that none of the primary key fields have been renamed by aliasing.
    // If you pass a Reference object, its __ref ID string will be returned.
    InMemoryCache.prototype.identify = function (object) {
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_16__.isReference)(object))
            return object.__ref;
        try {
            return this.policies.identify(object)[0];
        }
        catch (e) {
            globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(e);
        }
    };
    InMemoryCache.prototype.evict = function (options) {
        if (!options.id) {
            if (_helpers_js__WEBPACK_IMPORTED_MODULE_7__.hasOwn.call(options, "id")) {
                // See comment in modify method about why we return false when
                // options.id exists but is falsy/undefined.
                return false;
            }
            options = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, options), { id: "ROOT_QUERY" });
        }
        try {
            // It's unlikely that the eviction will end up invoking any other
            // cache update operations while it's running, but {in,de}crementing
            // this.txCount still seems like a good idea, for uniformity with
            // the other update methods.
            ++this.txCount;
            // Pass this.data as a limit on the depth of the eviction, so evictions
            // during optimistic updates (when this.data is temporarily set equal to
            // this.optimisticData) do not escape their optimistic Layer.
            return this.optimisticData.evict(options, this.data);
        }
        finally {
            if (!--this.txCount && options.broadcast !== false) {
                this.broadcastWatches();
            }
        }
    };
    InMemoryCache.prototype.reset = function (options) {
        var _this = this;
        this.init();
        _utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.canonicalStringify.reset();
        if (options && options.discardWatches) {
            // Similar to what happens in the unsubscribe function returned by
            // cache.watch, applied to all current watches.
            this.watches.forEach(function (watch) { return _this.maybeBroadcastWatch.forget(watch); });
            this.watches.clear();
            (0,_reactiveVars_js__WEBPACK_IMPORTED_MODULE_6__.forgetCache)(this);
        }
        else {
            // Calling this.init() above unblocks all maybeBroadcastWatch caching, so
            // this.broadcastWatches() triggers a broadcast to every current watcher
            // (letting them know their data is now missing). This default behavior is
            // convenient because it means the watches do not have to be manually
            // reestablished after resetting the cache. To prevent this broadcast and
            // cancel all watches, pass true for options.discardWatches.
            this.broadcastWatches();
        }
        return Promise.resolve();
    };
    InMemoryCache.prototype.removeOptimistic = function (idToRemove) {
        var newOptimisticData = this.optimisticData.removeLayer(idToRemove);
        if (newOptimisticData !== this.optimisticData) {
            this.optimisticData = newOptimisticData;
            this.broadcastWatches();
        }
    };
    InMemoryCache.prototype.batch = function (options) {
        var _this = this;
        var update = options.update, _a = options.optimistic, optimistic = _a === void 0 ? true : _a, removeOptimistic = options.removeOptimistic, onWatchUpdated = options.onWatchUpdated;
        var updateResult;
        var perform = function (layer) {
            var _a = _this, data = _a.data, optimisticData = _a.optimisticData;
            ++_this.txCount;
            if (layer) {
                _this.data = _this.optimisticData = layer;
            }
            try {
                return (updateResult = update(_this));
            }
            finally {
                --_this.txCount;
                _this.data = data;
                _this.optimisticData = optimisticData;
            }
        };
        var alreadyDirty = new Set();
        if (onWatchUpdated && !this.txCount) {
            // If an options.onWatchUpdated callback is provided, we want to call it
            // with only the Cache.WatchOptions objects affected by options.update,
            // but there might be dirty watchers already waiting to be broadcast that
            // have nothing to do with the update. To prevent including those watchers
            // in the post-update broadcast, we perform this initial broadcast to
            // collect the dirty watchers, so we can re-dirty them later, after the
            // post-update broadcast, allowing them to receive their pending
            // broadcasts the next time broadcastWatches is called, just as they would
            // if we never called cache.batch.
            this.broadcastWatches((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, options), { onWatchUpdated: function (watch) {
                    alreadyDirty.add(watch);
                    return false;
                } }));
        }
        if (typeof optimistic === "string") {
            // Note that there can be multiple layers with the same optimistic ID.
            // When removeOptimistic(id) is called for that id, all matching layers
            // will be removed, and the remaining layers will be reapplied.
            this.optimisticData = this.optimisticData.addLayer(optimistic, perform);
        }
        else if (optimistic === false) {
            // Ensure both this.data and this.optimisticData refer to the root
            // (non-optimistic) layer of the cache during the update. Note that
            // this.data could be a Layer if we are currently executing an optimistic
            // update function, but otherwise will always be an EntityStore.Root
            // instance.
            perform(this.data);
        }
        else {
            // Otherwise, leave this.data and this.optimisticData unchanged and run
            // the update with broadcast batching.
            perform();
        }
        if (typeof removeOptimistic === "string") {
            this.optimisticData = this.optimisticData.removeLayer(removeOptimistic);
        }
        // Note: if this.txCount > 0, then alreadyDirty.size === 0, so this code
        // takes the else branch and calls this.broadcastWatches(options), which
        // does nothing when this.txCount > 0.
        if (onWatchUpdated && alreadyDirty.size) {
            this.broadcastWatches((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, options), { onWatchUpdated: function (watch, diff) {
                    var result = onWatchUpdated.call(this, watch, diff);
                    if (result !== false) {
                        // Since onWatchUpdated did not return false, this diff is
                        // about to be broadcast to watch.callback, so we don't need
                        // to re-dirty it with the other alreadyDirty watches below.
                        alreadyDirty.delete(watch);
                    }
                    return result;
                } }));
            // Silently re-dirty any watches that were already dirty before the update
            // was performed, and were not broadcast just now.
            if (alreadyDirty.size) {
                alreadyDirty.forEach(function (watch) { return _this.maybeBroadcastWatch.dirty(watch); });
            }
        }
        else {
            // If alreadyDirty is empty or we don't have an onWatchUpdated
            // function, we don't need to go to the trouble of wrapping
            // options.onWatchUpdated.
            this.broadcastWatches(options);
        }
        return updateResult;
    };
    InMemoryCache.prototype.performTransaction = function (update, optimisticId) {
        return this.batch({
            update: update,
            optimistic: optimisticId || optimisticId !== null,
        });
    };
    InMemoryCache.prototype.transformDocument = function (document) {
        return this.addTypenameToDocument(this.addFragmentsToDocument(document));
    };
    InMemoryCache.prototype.broadcastWatches = function (options) {
        var _this = this;
        if (!this.txCount) {
            this.watches.forEach(function (c) { return _this.maybeBroadcastWatch(c, options); });
        }
    };
    InMemoryCache.prototype.addFragmentsToDocument = function (document) {
        var fragments = this.config.fragments;
        return fragments ? fragments.transform(document) : document;
    };
    InMemoryCache.prototype.addTypenameToDocument = function (document) {
        if (this.addTypename) {
            return this.addTypenameTransform.transformDocument(document);
        }
        return document;
    };
    // This method is wrapped by maybeBroadcastWatch, which is called by
    // broadcastWatches, so that we compute and broadcast results only when
    // the data that would be broadcast might have changed. It would be
    // simpler to check for changes after recomputing a result but before
    // broadcasting it, but this wrapping approach allows us to skip both
    // the recomputation and the broadcast, in most cases.
    InMemoryCache.prototype.broadcastWatch = function (c, options) {
        var lastDiff = c.lastDiff;
        // Both WatchOptions and DiffOptions extend ReadOptions, and DiffOptions
        // currently requires no additional properties, so we can use c (a
        // WatchOptions object) as DiffOptions, without having to allocate a new
        // object, and without having to enumerate the relevant properties (query,
        // variables, etc.) explicitly. There will be some additional properties
        // (lastDiff, callback, etc.), but cache.diff ignores them.
        var diff = this.diff(c);
        if (options) {
            if (c.optimistic && typeof options.optimistic === "string") {
                diff.fromOptimisticTransaction = true;
            }
            if (options.onWatchUpdated &&
                options.onWatchUpdated.call(this, c, diff, lastDiff) === false) {
                // Returning false from the onWatchUpdated callback will prevent
                // calling c.callback(diff) for this watcher.
                return;
            }
        }
        if (!lastDiff || !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_2__.equal)(lastDiff.result, diff.result)) {
            c.callback((c.lastDiff = diff), lastDiff);
        }
    };
    return InMemoryCache;
}(_core_cache_js__WEBPACK_IMPORTED_MODULE_17__.ApolloCache));

if (globalThis.__DEV__ !== false) {
    InMemoryCache.prototype.getMemoryInternals = _utilities_caching_getMemoryInternals_js__WEBPACK_IMPORTED_MODULE_18__.getInMemoryCacheMemoryInternals;
}
//# sourceMappingURL=inMemoryCache.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/cache/inmemory/key-extractor.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@apollo/client/cache/inmemory/key-extractor.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   collectSpecifierPaths: () => (/* binding */ collectSpecifierPaths),
/* harmony export */   extractKeyPath: () => (/* binding */ extractKeyPath),
/* harmony export */   getSpecifierPaths: () => (/* binding */ getSpecifierPaths),
/* harmony export */   keyArgsFnFromSpecifier: () => (/* binding */ keyArgsFnFromSpecifier),
/* harmony export */   keyFieldsFnFromSpecifier: () => (/* binding */ keyFieldsFnFromSpecifier)
/* harmony export */ });
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/mergeDeep.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/objects.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/cache/inmemory/helpers.js");



// Mapping from JSON-encoded KeySpecifier strings to associated information.
var specifierInfoCache = Object.create(null);
function lookupSpecifierInfo(spec) {
    // It's safe to encode KeySpecifier arrays with JSON.stringify, since they're
    // just arrays of strings or nested KeySpecifier arrays, and the order of the
    // array elements is important (and suitably preserved by JSON.stringify).
    var cacheKey = JSON.stringify(spec);
    return (specifierInfoCache[cacheKey] ||
        (specifierInfoCache[cacheKey] = Object.create(null)));
}
function keyFieldsFnFromSpecifier(specifier) {
    var info = lookupSpecifierInfo(specifier);
    return (info.keyFieldsFn || (info.keyFieldsFn = function (object, context) {
            var extract = function (from, key) {
                return context.readField(key, from);
            };
            var keyObject = (context.keyObject = collectSpecifierPaths(specifier, function (schemaKeyPath) {
                var extracted = extractKeyPath(context.storeObject, schemaKeyPath, 
                // Using context.readField to extract paths from context.storeObject
                // allows the extraction to see through Reference objects and respect
                // custom read functions.
                extract);
                if (extracted === void 0 &&
                    object !== context.storeObject &&
                    _helpers_js__WEBPACK_IMPORTED_MODULE_1__.hasOwn.call(object, schemaKeyPath[0])) {
                    // If context.storeObject fails to provide a value for the requested
                    // path, fall back to the raw result object, if it has a top-level key
                    // matching the first key in the path (schemaKeyPath[0]). This allows
                    // key fields included in the written data to be saved in the cache
                    // even if they are not selected explicitly in context.selectionSet.
                    // Not being mentioned by context.selectionSet is convenient here,
                    // since it means these extra fields cannot be affected by field
                    // aliasing, which is why we can use extractKey instead of
                    // context.readField for this extraction.
                    extracted = extractKeyPath(object, schemaKeyPath, extractKey);
                }
                (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(extracted !== void 0, 4, schemaKeyPath.join("."), object);
                return extracted;
            }));
            return "".concat(context.typename, ":").concat(JSON.stringify(keyObject));
        }));
}
// The keyArgs extraction process is roughly analogous to keyFields extraction,
// but there are no aliases involved, missing fields are tolerated (by merely
// omitting them from the key), and drawing from field.directives or variables
// is allowed (in addition to drawing from the field's arguments object).
// Concretely, these differences mean passing a different key path extractor
// function to collectSpecifierPaths, reusing the shared extractKeyPath helper
// wherever possible.
function keyArgsFnFromSpecifier(specifier) {
    var info = lookupSpecifierInfo(specifier);
    return (info.keyArgsFn ||
        (info.keyArgsFn = function (args, _a) {
            var field = _a.field, variables = _a.variables, fieldName = _a.fieldName;
            var collected = collectSpecifierPaths(specifier, function (keyPath) {
                var firstKey = keyPath[0];
                var firstChar = firstKey.charAt(0);
                if (firstChar === "@") {
                    if (field && (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isNonEmptyArray)(field.directives)) {
                        var directiveName_1 = firstKey.slice(1);
                        // If the directive appears multiple times, only the first
                        // occurrence's arguments will be used. TODO Allow repetition?
                        // TODO Cache this work somehow, a la aliasMap?
                        var d = field.directives.find(function (d) { return d.name.value === directiveName_1; });
                        // Fortunately argumentsObjectFromField works for DirectiveNode!
                        var directiveArgs = d && (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.argumentsObjectFromField)(d, variables);
                        // For directives without arguments (d defined, but directiveArgs ===
                        // null), the presence or absence of the directive still counts as
                        // part of the field key, so we return null in those cases. If no
                        // directive with this name was found for this field (d undefined and
                        // thus directiveArgs undefined), we return undefined, which causes
                        // this value to be omitted from the key object returned by
                        // collectSpecifierPaths.
                        return (directiveArgs &&
                            extractKeyPath(directiveArgs, 
                            // If keyPath.length === 1, this code calls extractKeyPath with an
                            // empty path, which works because it uses directiveArgs as the
                            // extracted value.
                            keyPath.slice(1)));
                    }
                    // If the key started with @ but there was no corresponding directive,
                    // we want to omit this value from the key object, not fall through to
                    // treating @whatever as a normal argument name.
                    return;
                }
                if (firstChar === "$") {
                    var variableName = firstKey.slice(1);
                    if (variables && _helpers_js__WEBPACK_IMPORTED_MODULE_1__.hasOwn.call(variables, variableName)) {
                        var varKeyPath = keyPath.slice(0);
                        varKeyPath[0] = variableName;
                        return extractKeyPath(variables, varKeyPath);
                    }
                    // If the key started with $ but there was no corresponding variable, we
                    // want to omit this value from the key object, not fall through to
                    // treating $whatever as a normal argument name.
                    return;
                }
                if (args) {
                    return extractKeyPath(args, keyPath);
                }
            });
            var suffix = JSON.stringify(collected);
            // If no arguments were passed to this field, and it didn't have any other
            // field key contributions from directives or variables, hide the empty
            // :{} suffix from the field key. However, a field passed no arguments can
            // still end up with a non-empty :{...} suffix if its key configuration
            // refers to directives or variables.
            if (args || suffix !== "{}") {
                fieldName += ":" + suffix;
            }
            return fieldName;
        }));
}
function collectSpecifierPaths(specifier, extractor) {
    // For each path specified by specifier, invoke the extractor, and repeatedly
    // merge the results together, with appropriate ancestor context.
    var merger = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.DeepMerger();
    return getSpecifierPaths(specifier).reduce(function (collected, path) {
        var _a;
        var toMerge = extractor(path);
        if (toMerge !== void 0) {
            // This path is not expected to contain array indexes, so the toMerge
            // reconstruction will not contain arrays. TODO Fix this?
            for (var i = path.length - 1; i >= 0; --i) {
                toMerge = (_a = {}, _a[path[i]] = toMerge, _a);
            }
            collected = merger.merge(collected, toMerge);
        }
        return collected;
    }, Object.create(null));
}
function getSpecifierPaths(spec) {
    var info = lookupSpecifierInfo(spec);
    if (!info.paths) {
        var paths_1 = (info.paths = []);
        var currentPath_1 = [];
        spec.forEach(function (s, i) {
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(s)) {
                getSpecifierPaths(s).forEach(function (p) { return paths_1.push(currentPath_1.concat(p)); });
                currentPath_1.length = 0;
            }
            else {
                currentPath_1.push(s);
                if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(spec[i + 1])) {
                    paths_1.push(currentPath_1.slice(0));
                    currentPath_1.length = 0;
                }
            }
        });
    }
    return info.paths;
}
function extractKey(object, key) {
    return object[key];
}
function extractKeyPath(object, path, extract) {
    // For each key in path, extract the corresponding child property from obj,
    // flattening arrays if encountered (uncommon for keyFields and keyArgs, but
    // possible). The final result of path.reduce is normalized so unexpected leaf
    // objects have their keys safely sorted. That final result is difficult to
    // type as anything other than any. You're welcome to try to improve the
    // return type, but keep in mind extractKeyPath is not a public function
    // (exported only for testing), so the effort may not be worthwhile unless the
    // limited set of actual callers (see above) pass arguments that TypeScript
    // can statically type. If we know only that path is some array of strings
    // (and not, say, a specific tuple of statically known strings), any (or
    // possibly unknown) is the honest answer.
    extract = extract || extractKey;
    return normalize(path.reduce(function reducer(obj, key) {
        return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(obj) ?
            obj.map(function (child) { return reducer(child, key); })
            : obj && extract(obj, key);
    }, object));
}
function normalize(value) {
    // Usually the extracted value will be a scalar value, since most primary
    // key fields are scalar, but just in case we get an object or an array, we
    // need to do some normalization of the order of (nested) keys.
    if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isNonNullObject)(value)) {
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(value)) {
            return value.map(normalize);
        }
        return collectSpecifierPaths(Object.keys(value).sort(), function (path) {
            return extractKeyPath(value, path);
        });
    }
    return value;
}
//# sourceMappingURL=key-extractor.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/cache/inmemory/object-canon.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apollo/client/cache/inmemory/object-canon.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ObjectCanon: () => (/* binding */ ObjectCanon)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _wry_trie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/trie */ "./node_modules/@wry/trie/lib/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/objects.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");




function shallowCopy(value) {
    if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isNonNullObject)(value)) {
        return (0,_helpers_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(value) ?
            value.slice(0)
            : (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({ __proto__: Object.getPrototypeOf(value) }, value);
    }
    return value;
}
// When programmers talk about the "canonical form" of an object, they
// usually have the following meaning in mind, which I've copied from
// https://en.wiktionary.org/wiki/canonical_form:
//
// 1. A standard or normal presentation of a mathematical entity [or
//    object]. A canonical form is an element of a set of representatives
//    of equivalence classes of forms such that there is a function or
//    procedure which projects every element of each equivalence class
//    onto that one element, the canonical form of that equivalence
//    class. The canonical form is expected to be simpler than the rest of
//    the forms in some way.
//
// That's a long-winded way of saying any two objects that have the same
// canonical form may be considered equivalent, even if they are !==,
// which usually means the objects are structurally equivalent (deeply
// equal), but don't necessarily use the same memory.
//
// Like a literary or musical canon, this ObjectCanon class represents a
// collection of unique canonical items (JavaScript objects), with the
// important property that canon.admit(a) === canon.admit(b) if a and b
// are deeply equal to each other. In terms of the definition above, the
// canon.admit method is the "function or procedure which projects every"
// object "onto that one element, the canonical form."
//
// In the worst case, the canonicalization process may involve looking at
// every property in the provided object tree, so it takes the same order
// of time as deep equality checking. Fortunately, already-canonicalized
// objects are returned immediately from canon.admit, so the presence of
// canonical subtrees tends to speed up canonicalization.
//
// Since consumers of canonical objects can check for deep equality in
// constant time, canonicalizing cache results can massively improve the
// performance of application code that skips re-rendering unchanged
// results, such as "pure" UI components in a framework like React.
//
// Of course, since canonical objects may be shared widely between
// unrelated consumers, it's important to think of them as immutable, even
// though they are not actually frozen with Object.freeze in production,
// due to the extra performance overhead that comes with frozen objects.
//
// Custom scalar objects whose internal class name is neither Array nor
// Object can be included safely in the admitted tree, but they will not
// be replaced with a canonical version (to put it another way, they are
// assumed to be canonical already).
//
// If we ignore custom objects, no detection of cycles or repeated object
// references is currently required by the StoreReader class, since
// GraphQL result objects are JSON-serializable trees (and thus contain
// neither cycles nor repeated subtrees), so we can avoid the complexity
// of keeping track of objects we've already seen during the recursion of
// the admit method.
//
// In the future, we may consider adding additional cases to the switch
// statement to handle other common object types, such as "[object Date]"
// objects, as needed.
var ObjectCanon = /** @class */ (function () {
    function ObjectCanon() {
        // Set of all canonical objects this ObjectCanon has admitted, allowing
        // canon.admit to return previously-canonicalized objects immediately.
        this.known = new (_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.canUseWeakSet ? WeakSet : Set)();
        // Efficient storage/lookup structure for canonical objects.
        this.pool = new _wry_trie__WEBPACK_IMPORTED_MODULE_0__.Trie(_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.canUseWeakMap);
        // Make the ObjectCanon assume this value has already been
        // canonicalized.
        this.passes = new WeakMap();
        // Arrays that contain the same elements in a different order can share
        // the same SortedKeysInfo object, to save memory.
        this.keysByJSON = new Map();
        // This has to come last because it depends on keysByJSON.
        this.empty = this.admit({});
    }
    ObjectCanon.prototype.isKnown = function (value) {
        return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isNonNullObject)(value) && this.known.has(value);
    };
    ObjectCanon.prototype.pass = function (value) {
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isNonNullObject)(value)) {
            var copy = shallowCopy(value);
            this.passes.set(copy, value);
            return copy;
        }
        return value;
    };
    ObjectCanon.prototype.admit = function (value) {
        var _this = this;
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isNonNullObject)(value)) {
            var original = this.passes.get(value);
            if (original)
                return original;
            var proto = Object.getPrototypeOf(value);
            switch (proto) {
                case Array.prototype: {
                    if (this.known.has(value))
                        return value;
                    var array = value.map(this.admit, this);
                    // Arrays are looked up in the Trie using their recursively
                    // canonicalized elements, and the known version of the array is
                    // preserved as node.array.
                    var node = this.pool.lookupArray(array);
                    if (!node.array) {
                        this.known.add((node.array = array));
                        // Since canonical arrays may be shared widely between
                        // unrelated consumers, it's important to regard them as
                        // immutable, even if they are not frozen in production.
                        if (globalThis.__DEV__ !== false) {
                            Object.freeze(array);
                        }
                    }
                    return node.array;
                }
                case null:
                case Object.prototype: {
                    if (this.known.has(value))
                        return value;
                    var proto_1 = Object.getPrototypeOf(value);
                    var array_1 = [proto_1];
                    var keys = this.sortedKeys(value);
                    array_1.push(keys.json);
                    var firstValueIndex_1 = array_1.length;
                    keys.sorted.forEach(function (key) {
                        array_1.push(_this.admit(value[key]));
                    });
                    // Objects are looked up in the Trie by their prototype (which
                    // is *not* recursively canonicalized), followed by a JSON
                    // representation of their (sorted) keys, followed by the
                    // sequence of recursively canonicalized values corresponding to
                    // those keys. To keep the final results unambiguous with other
                    // sequences (such as arrays that just happen to contain [proto,
                    // keys.json, value1, value2, ...]), the known version of the
                    // object is stored as node.object.
                    var node = this.pool.lookupArray(array_1);
                    if (!node.object) {
                        var obj_1 = (node.object = Object.create(proto_1));
                        this.known.add(obj_1);
                        keys.sorted.forEach(function (key, i) {
                            obj_1[key] = array_1[firstValueIndex_1 + i];
                        });
                        // Since canonical objects may be shared widely between
                        // unrelated consumers, it's important to regard them as
                        // immutable, even if they are not frozen in production.
                        if (globalThis.__DEV__ !== false) {
                            Object.freeze(obj_1);
                        }
                    }
                    return node.object;
                }
            }
        }
        return value;
    };
    // It's worthwhile to cache the sorting of arrays of strings, since the
    // same initial unsorted arrays tend to be encountered many times.
    // Fortunately, we can reuse the Trie machinery to look up the sorted
    // arrays in linear time (which is faster than sorting large arrays).
    ObjectCanon.prototype.sortedKeys = function (obj) {
        var keys = Object.keys(obj);
        var node = this.pool.lookupArray(keys);
        if (!node.keys) {
            keys.sort();
            var json = JSON.stringify(keys);
            if (!(node.keys = this.keysByJSON.get(json))) {
                this.keysByJSON.set(json, (node.keys = { sorted: keys, json: json }));
            }
        }
        return node.keys;
    };
    return ObjectCanon;
}());

//# sourceMappingURL=object-canon.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/cache/inmemory/policies.js":
/*!****************************************************************!*\
  !*** ./node_modules/@apollo/client/cache/inmemory/policies.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Policies: () => (/* binding */ Policies),
/* harmony export */   normalizeReadFieldOptions: () => (/* binding */ normalizeReadFieldOptions)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/stringifyForDisplay.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/objects.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/cache/inmemory/helpers.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");
/* harmony import */ var _reactiveVars_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reactiveVars.js */ "./node_modules/@apollo/client/cache/inmemory/reactiveVars.js");
/* harmony import */ var _key_extractor_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./key-extractor.js */ "./node_modules/@apollo/client/cache/inmemory/key-extractor.js");






function argsFromFieldSpecifier(spec) {
    return (spec.args !== void 0 ? spec.args
        : spec.field ? (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.argumentsObjectFromField)(spec.field, spec.variables)
            : null);
}
var nullKeyFieldsFn = function () { return void 0; };
var simpleKeyArgsFn = function (_args, context) { return context.fieldName; };
// These merge functions can be selected by specifying merge:true or
// merge:false in a field policy.
var mergeTrueFn = function (existing, incoming, _a) {
    var mergeObjects = _a.mergeObjects;
    return mergeObjects(existing, incoming);
};
var mergeFalseFn = function (_, incoming) { return incoming; };
var Policies = /** @class */ (function () {
    function Policies(config) {
        this.config = config;
        this.typePolicies = Object.create(null);
        this.toBeAdded = Object.create(null);
        // Map from subtype names to sets of supertype names. Note that this
        // representation inverts the structure of possibleTypes (whose keys are
        // supertypes and whose values are arrays of subtypes) because it tends
        // to be much more efficient to search upwards than downwards.
        this.supertypeMap = new Map();
        // Any fuzzy subtypes specified by possibleTypes will be converted to
        // RegExp objects and recorded here. Every key of this map can also be
        // found in supertypeMap. In many cases this Map will be empty, which
        // means no fuzzy subtype checking will happen in fragmentMatches.
        this.fuzzySubtypes = new Map();
        this.rootIdsByTypename = Object.create(null);
        this.rootTypenamesById = Object.create(null);
        this.usingPossibleTypes = false;
        this.config = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({ dataIdFromObject: _helpers_js__WEBPACK_IMPORTED_MODULE_3__.defaultDataIdFromObject }, config);
        this.cache = this.config.cache;
        this.setRootTypename("Query");
        this.setRootTypename("Mutation");
        this.setRootTypename("Subscription");
        if (config.possibleTypes) {
            this.addPossibleTypes(config.possibleTypes);
        }
        if (config.typePolicies) {
            this.addTypePolicies(config.typePolicies);
        }
    }
    Policies.prototype.identify = function (object, partialContext) {
        var _a;
        var policies = this;
        var typename = (partialContext &&
            (partialContext.typename || ((_a = partialContext.storeObject) === null || _a === void 0 ? void 0 : _a.__typename))) ||
            object.__typename;
        // It should be possible to write root Query fields with writeFragment,
        // using { __typename: "Query", ... } as the data, but it does not make
        // sense to allow the same identification behavior for the Mutation and
        // Subscription types, since application code should never be writing
        // directly to (or reading directly from) those root objects.
        if (typename === this.rootTypenamesById.ROOT_QUERY) {
            return ["ROOT_QUERY"];
        }
        // Default context.storeObject to object if not otherwise provided.
        var storeObject = (partialContext && partialContext.storeObject) || object;
        var context = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, partialContext), { typename: typename, storeObject: storeObject, readField: (partialContext && partialContext.readField) ||
                function () {
                    var options = normalizeReadFieldOptions(arguments, storeObject);
                    return policies.readField(options, {
                        store: policies.cache["data"],
                        variables: options.variables,
                    });
                } });
        var id;
        var policy = typename && this.getTypePolicy(typename);
        var keyFn = (policy && policy.keyFn) || this.config.dataIdFromObject;
        while (keyFn) {
            var specifierOrId = keyFn((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, object), storeObject), context);
            if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(specifierOrId)) {
                keyFn = (0,_key_extractor_js__WEBPACK_IMPORTED_MODULE_5__.keyFieldsFnFromSpecifier)(specifierOrId);
            }
            else {
                id = specifierOrId;
                break;
            }
        }
        id = id ? String(id) : void 0;
        return context.keyObject ? [id, context.keyObject] : [id];
    };
    Policies.prototype.addTypePolicies = function (typePolicies) {
        var _this = this;
        Object.keys(typePolicies).forEach(function (typename) {
            var _a = typePolicies[typename], queryType = _a.queryType, mutationType = _a.mutationType, subscriptionType = _a.subscriptionType, incoming = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__rest)(_a, ["queryType", "mutationType", "subscriptionType"]);
            // Though {query,mutation,subscription}Type configurations are rare,
            // it's important to call setRootTypename as early as possible,
            // since these configurations should apply consistently for the
            // entire lifetime of the cache. Also, since only one __typename can
            // qualify as one of these root types, these three properties cannot
            // be inherited, unlike the rest of the incoming properties. That
            // restriction is convenient, because the purpose of this.toBeAdded
            // is to delay the processing of type/field policies until the first
            // time they're used, allowing policies to be added in any order as
            // long as all relevant policies (including policies for supertypes)
            // have been added by the time a given policy is used for the first
            // time. In other words, since inheritance doesn't matter for these
            // properties, there's also no need to delay their processing using
            // the this.toBeAdded queue.
            if (queryType)
                _this.setRootTypename("Query", typename);
            if (mutationType)
                _this.setRootTypename("Mutation", typename);
            if (subscriptionType)
                _this.setRootTypename("Subscription", typename);
            if (_helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(_this.toBeAdded, typename)) {
                _this.toBeAdded[typename].push(incoming);
            }
            else {
                _this.toBeAdded[typename] = [incoming];
            }
        });
    };
    Policies.prototype.updateTypePolicy = function (typename, incoming) {
        var _this = this;
        var existing = this.getTypePolicy(typename);
        var keyFields = incoming.keyFields, fields = incoming.fields;
        function setMerge(existing, merge) {
            existing.merge =
                typeof merge === "function" ? merge
                    // Pass merge:true as a shorthand for a merge implementation
                    // that returns options.mergeObjects(existing, incoming).
                    : merge === true ? mergeTrueFn
                        // Pass merge:false to make incoming always replace existing
                        // without any warnings about data clobbering.
                        : merge === false ? mergeFalseFn
                            : existing.merge;
        }
        // Type policies can define merge functions, as an alternative to
        // using field policies to merge child objects.
        setMerge(existing, incoming.merge);
        existing.keyFn =
            // Pass false to disable normalization for this typename.
            keyFields === false ? nullKeyFieldsFn
                // Pass an array of strings to use those fields to compute a
                // composite ID for objects of this typename.
                : (0,_helpers_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(keyFields) ? (0,_key_extractor_js__WEBPACK_IMPORTED_MODULE_5__.keyFieldsFnFromSpecifier)(keyFields)
                    // Pass a function to take full control over identification.
                    : typeof keyFields === "function" ? keyFields
                        // Leave existing.keyFn unchanged if above cases fail.
                        : existing.keyFn;
        if (fields) {
            Object.keys(fields).forEach(function (fieldName) {
                var existing = _this.getFieldPolicy(typename, fieldName, true);
                var incoming = fields[fieldName];
                if (typeof incoming === "function") {
                    existing.read = incoming;
                }
                else {
                    var keyArgs = incoming.keyArgs, read = incoming.read, merge = incoming.merge;
                    existing.keyFn =
                        // Pass false to disable argument-based differentiation of
                        // field identities.
                        keyArgs === false ? simpleKeyArgsFn
                            // Pass an array of strings to use named arguments to
                            // compute a composite identity for the field.
                            : (0,_helpers_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(keyArgs) ? (0,_key_extractor_js__WEBPACK_IMPORTED_MODULE_5__.keyArgsFnFromSpecifier)(keyArgs)
                                // Pass a function to take full control over field identity.
                                : typeof keyArgs === "function" ? keyArgs
                                    // Leave existing.keyFn unchanged if above cases fail.
                                    : existing.keyFn;
                    if (typeof read === "function") {
                        existing.read = read;
                    }
                    setMerge(existing, merge);
                }
                if (existing.read && existing.merge) {
                    // If we have both a read and a merge function, assume
                    // keyArgs:false, because read and merge together can take
                    // responsibility for interpreting arguments in and out. This
                    // default assumption can always be overridden by specifying
                    // keyArgs explicitly in the FieldPolicy.
                    existing.keyFn = existing.keyFn || simpleKeyArgsFn;
                }
            });
        }
    };
    Policies.prototype.setRootTypename = function (which, typename) {
        if (typename === void 0) { typename = which; }
        var rootId = "ROOT_" + which.toUpperCase();
        var old = this.rootTypenamesById[rootId];
        if (typename !== old) {
            (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(!old || old === which, 5, which);
            // First, delete any old __typename associated with this rootId from
            // rootIdsByTypename.
            if (old)
                delete this.rootIdsByTypename[old];
            // Now make this the only __typename that maps to this rootId.
            this.rootIdsByTypename[typename] = rootId;
            // Finally, update the __typename associated with this rootId.
            this.rootTypenamesById[rootId] = typename;
        }
    };
    Policies.prototype.addPossibleTypes = function (possibleTypes) {
        var _this = this;
        this.usingPossibleTypes = true;
        Object.keys(possibleTypes).forEach(function (supertype) {
            // Make sure all types have an entry in this.supertypeMap, even if
            // their supertype set is empty, so we can return false immediately
            // from policies.fragmentMatches for unknown supertypes.
            _this.getSupertypeSet(supertype, true);
            possibleTypes[supertype].forEach(function (subtype) {
                _this.getSupertypeSet(subtype, true).add(supertype);
                var match = subtype.match(_helpers_js__WEBPACK_IMPORTED_MODULE_3__.TypeOrFieldNameRegExp);
                if (!match || match[0] !== subtype) {
                    // TODO Don't interpret just any invalid typename as a RegExp.
                    _this.fuzzySubtypes.set(subtype, new RegExp(subtype));
                }
            });
        });
    };
    Policies.prototype.getTypePolicy = function (typename) {
        var _this = this;
        if (!_helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(this.typePolicies, typename)) {
            var policy_1 = (this.typePolicies[typename] = Object.create(null));
            policy_1.fields = Object.create(null);
            // When the TypePolicy for typename is first accessed, instead of
            // starting with an empty policy object, inherit any properties or
            // fields from the type policies of the supertypes of typename.
            //
            // Any properties or fields defined explicitly within the TypePolicy
            // for typename will take precedence, and if there are multiple
            // supertypes, the properties of policies whose types were added
            // later via addPossibleTypes will take precedence over those of
            // earlier supertypes. TODO Perhaps we should warn about these
            // conflicts in development, and recommend defining the property
            // explicitly in the subtype policy?
            //
            // Field policy inheritance is atomic/shallow: you can't inherit a
            // field policy and then override just its read function, since read
            // and merge functions often need to cooperate, so changing only one
            // of them would be a recipe for inconsistency.
            //
            // Once the TypePolicy for typename has been accessed, its properties can
            // still be updated directly using addTypePolicies, but future changes to
            // inherited supertype policies will not be reflected in this subtype
            // policy, because this code runs at most once per typename.
            var supertypes_1 = this.supertypeMap.get(typename);
            if (!supertypes_1 && this.fuzzySubtypes.size) {
                // To make the inheritance logic work for unknown typename strings that
                // may have fuzzy supertypes, we give this typename an empty supertype
                // set and then populate it with any fuzzy supertypes that match.
                supertypes_1 = this.getSupertypeSet(typename, true);
                // This only works for typenames that are directly matched by a fuzzy
                // supertype. What if there is an intermediate chain of supertypes?
                // While possible, that situation can only be solved effectively by
                // specifying the intermediate relationships via possibleTypes, manually
                // and in a non-fuzzy way.
                this.fuzzySubtypes.forEach(function (regExp, fuzzy) {
                    if (regExp.test(typename)) {
                        // The fuzzy parameter is just the original string version of regExp
                        // (not a valid __typename string), but we can look up the
                        // associated supertype(s) in this.supertypeMap.
                        var fuzzySupertypes = _this.supertypeMap.get(fuzzy);
                        if (fuzzySupertypes) {
                            fuzzySupertypes.forEach(function (supertype) {
                                return supertypes_1.add(supertype);
                            });
                        }
                    }
                });
            }
            if (supertypes_1 && supertypes_1.size) {
                supertypes_1.forEach(function (supertype) {
                    var _a = _this.getTypePolicy(supertype), fields = _a.fields, rest = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__rest)(_a, ["fields"]);
                    Object.assign(policy_1, rest);
                    Object.assign(policy_1.fields, fields);
                });
            }
        }
        var inbox = this.toBeAdded[typename];
        if (inbox && inbox.length) {
            // Merge the pending policies into this.typePolicies, in the order they
            // were originally passed to addTypePolicy.
            inbox.splice(0).forEach(function (policy) {
                _this.updateTypePolicy(typename, policy);
            });
        }
        return this.typePolicies[typename];
    };
    Policies.prototype.getFieldPolicy = function (typename, fieldName, createIfMissing) {
        if (typename) {
            var fieldPolicies = this.getTypePolicy(typename).fields;
            return (fieldPolicies[fieldName] ||
                (createIfMissing && (fieldPolicies[fieldName] = Object.create(null))));
        }
    };
    Policies.prototype.getSupertypeSet = function (subtype, createIfMissing) {
        var supertypeSet = this.supertypeMap.get(subtype);
        if (!supertypeSet && createIfMissing) {
            this.supertypeMap.set(subtype, (supertypeSet = new Set()));
        }
        return supertypeSet;
    };
    Policies.prototype.fragmentMatches = function (fragment, typename, result, variables) {
        var _this = this;
        if (!fragment.typeCondition)
            return true;
        // If the fragment has a type condition but the object we're matching
        // against does not have a __typename, the fragment cannot match.
        if (!typename)
            return false;
        var supertype = fragment.typeCondition.name.value;
        // Common case: fragment type condition and __typename are the same.
        if (typename === supertype)
            return true;
        if (this.usingPossibleTypes && this.supertypeMap.has(supertype)) {
            var typenameSupertypeSet = this.getSupertypeSet(typename, true);
            var workQueue_1 = [typenameSupertypeSet];
            var maybeEnqueue_1 = function (subtype) {
                var supertypeSet = _this.getSupertypeSet(subtype, false);
                if (supertypeSet &&
                    supertypeSet.size &&
                    workQueue_1.indexOf(supertypeSet) < 0) {
                    workQueue_1.push(supertypeSet);
                }
            };
            // We need to check fuzzy subtypes only if we encountered fuzzy
            // subtype strings in addPossibleTypes, and only while writing to
            // the cache, since that's when selectionSetMatchesResult gives a
            // strong signal of fragment matching. The StoreReader class calls
            // policies.fragmentMatches without passing a result object, so
            // needToCheckFuzzySubtypes is always false while reading.
            var needToCheckFuzzySubtypes = !!(result && this.fuzzySubtypes.size);
            var checkingFuzzySubtypes = false;
            // It's important to keep evaluating workQueue.length each time through
            // the loop, because the queue can grow while we're iterating over it.
            for (var i = 0; i < workQueue_1.length; ++i) {
                var supertypeSet = workQueue_1[i];
                if (supertypeSet.has(supertype)) {
                    if (!typenameSupertypeSet.has(supertype)) {
                        if (checkingFuzzySubtypes) {
                            globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(6, typename, supertype);
                        }
                        // Record positive results for faster future lookup.
                        // Unfortunately, we cannot safely cache negative results,
                        // because new possibleTypes data could always be added to the
                        // Policies class.
                        typenameSupertypeSet.add(supertype);
                    }
                    return true;
                }
                supertypeSet.forEach(maybeEnqueue_1);
                if (needToCheckFuzzySubtypes &&
                    // Start checking fuzzy subtypes only after exhausting all
                    // non-fuzzy subtypes (after the final iteration of the loop).
                    i === workQueue_1.length - 1 &&
                    // We could wait to compare fragment.selectionSet to result
                    // after we verify the supertype, but this check is often less
                    // expensive than that search, and we will have to do the
                    // comparison anyway whenever we find a potential match.
                    (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.selectionSetMatchesResult)(fragment.selectionSet, result, variables)) {
                    // We don't always need to check fuzzy subtypes (if no result
                    // was provided, or !this.fuzzySubtypes.size), but, when we do,
                    // we only want to check them once.
                    needToCheckFuzzySubtypes = false;
                    checkingFuzzySubtypes = true;
                    // If we find any fuzzy subtypes that match typename, extend the
                    // workQueue to search through the supertypes of those fuzzy
                    // subtypes. Otherwise the for-loop will terminate and we'll
                    // return false below.
                    this.fuzzySubtypes.forEach(function (regExp, fuzzyString) {
                        var match = typename.match(regExp);
                        if (match && match[0] === typename) {
                            maybeEnqueue_1(fuzzyString);
                        }
                    });
                }
            }
        }
        return false;
    };
    Policies.prototype.hasKeyArgs = function (typename, fieldName) {
        var policy = this.getFieldPolicy(typename, fieldName, false);
        return !!(policy && policy.keyFn);
    };
    Policies.prototype.getStoreFieldName = function (fieldSpec) {
        var typename = fieldSpec.typename, fieldName = fieldSpec.fieldName;
        var policy = this.getFieldPolicy(typename, fieldName, false);
        var storeFieldName;
        var keyFn = policy && policy.keyFn;
        if (keyFn && typename) {
            var context = {
                typename: typename,
                fieldName: fieldName,
                field: fieldSpec.field || null,
                variables: fieldSpec.variables,
            };
            var args = argsFromFieldSpecifier(fieldSpec);
            while (keyFn) {
                var specifierOrString = keyFn(args, context);
                if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(specifierOrString)) {
                    keyFn = (0,_key_extractor_js__WEBPACK_IMPORTED_MODULE_5__.keyArgsFnFromSpecifier)(specifierOrString);
                }
                else {
                    // If the custom keyFn returns a falsy value, fall back to
                    // fieldName instead.
                    storeFieldName = specifierOrString || fieldName;
                    break;
                }
            }
        }
        if (storeFieldName === void 0) {
            storeFieldName =
                fieldSpec.field ?
                    (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.storeKeyNameFromField)(fieldSpec.field, fieldSpec.variables)
                    : (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.getStoreKeyName)(fieldName, argsFromFieldSpecifier(fieldSpec));
        }
        // Returning false from a keyArgs function is like configuring
        // keyArgs: false, but more dynamic.
        if (storeFieldName === false) {
            return fieldName;
        }
        // Make sure custom field names start with the actual field.name.value
        // of the field, so we can always figure out which properties of a
        // StoreObject correspond to which original field names.
        return fieldName === (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName) ? storeFieldName
            : fieldName + ":" + storeFieldName;
    };
    Policies.prototype.readField = function (options, context) {
        var objectOrReference = options.from;
        if (!objectOrReference)
            return;
        var nameOrField = options.field || options.fieldName;
        if (!nameOrField)
            return;
        if (options.typename === void 0) {
            var typename = context.store.getFieldValue(objectOrReference, "__typename");
            if (typename)
                options.typename = typename;
        }
        var storeFieldName = this.getStoreFieldName(options);
        var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName);
        var existing = context.store.getFieldValue(objectOrReference, storeFieldName);
        var policy = this.getFieldPolicy(options.typename, fieldName, false);
        var read = policy && policy.read;
        if (read) {
            var readOptions = makeFieldFunctionOptions(this, objectOrReference, options, context, context.store.getStorage((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isReference)(objectOrReference) ?
                objectOrReference.__ref
                : objectOrReference, storeFieldName));
            // Call read(existing, readOptions) with cacheSlot holding this.cache.
            return _reactiveVars_js__WEBPACK_IMPORTED_MODULE_6__.cacheSlot.withValue(this.cache, read, [
                existing,
                readOptions,
            ]);
        }
        return existing;
    };
    Policies.prototype.getReadFunction = function (typename, fieldName) {
        var policy = this.getFieldPolicy(typename, fieldName, false);
        return policy && policy.read;
    };
    Policies.prototype.getMergeFunction = function (parentTypename, fieldName, childTypename) {
        var policy = this.getFieldPolicy(parentTypename, fieldName, false);
        var merge = policy && policy.merge;
        if (!merge && childTypename) {
            policy = this.getTypePolicy(childTypename);
            merge = policy && policy.merge;
        }
        return merge;
    };
    Policies.prototype.runMergeFunction = function (existing, incoming, _a, context, storage) {
        var field = _a.field, typename = _a.typename, merge = _a.merge;
        if (merge === mergeTrueFn) {
            // Instead of going to the trouble of creating a full
            // FieldFunctionOptions object and calling mergeTrueFn, we can
            // simply call mergeObjects, as mergeTrueFn would.
            return makeMergeObjectsFunction(context.store)(existing, incoming);
        }
        if (merge === mergeFalseFn) {
            // Likewise for mergeFalseFn, whose implementation is even simpler.
            return incoming;
        }
        // If cache.writeQuery or cache.writeFragment was called with
        // options.overwrite set to true, we still call merge functions, but
        // the existing data is always undefined, so the merge function will
        // not attempt to combine the incoming data with the existing data.
        if (context.overwrite) {
            existing = void 0;
        }
        return merge(existing, incoming, makeFieldFunctionOptions(this, 
        // Unlike options.readField for read functions, we do not fall
        // back to the current object if no foreignObjOrRef is provided,
        // because it's not clear what the current object should be for
        // merge functions: the (possibly undefined) existing object, or
        // the incoming object? If you think your merge function needs
        // to read sibling fields in order to produce a new value for
        // the current field, you might want to rethink your strategy,
        // because that's a recipe for making merge behavior sensitive
        // to the order in which fields are written into the cache.
        // However, readField(name, ref) is useful for merge functions
        // that need to deduplicate child objects and references.
        void 0, {
            typename: typename,
            fieldName: field.name.value,
            field: field,
            variables: context.variables,
        }, context, storage || Object.create(null)));
    };
    return Policies;
}());

function makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context, storage) {
    var storeFieldName = policies.getStoreFieldName(fieldSpec);
    var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.fieldNameFromStoreName)(storeFieldName);
    var variables = fieldSpec.variables || context.variables;
    var _a = context.store, toReference = _a.toReference, canRead = _a.canRead;
    return {
        args: argsFromFieldSpecifier(fieldSpec),
        field: fieldSpec.field || null,
        fieldName: fieldName,
        storeFieldName: storeFieldName,
        variables: variables,
        isReference: _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isReference,
        toReference: toReference,
        storage: storage,
        cache: policies.cache,
        canRead: canRead,
        readField: function () {
            return policies.readField(normalizeReadFieldOptions(arguments, objectOrReference, variables), context);
        },
        mergeObjects: makeMergeObjectsFunction(context.store),
    };
}
function normalizeReadFieldOptions(readFieldArgs, objectOrReference, variables) {
    var fieldNameOrOptions = readFieldArgs[0], from = readFieldArgs[1], argc = readFieldArgs.length;
    var options;
    if (typeof fieldNameOrOptions === "string") {
        options = {
            fieldName: fieldNameOrOptions,
            // Default to objectOrReference only when no second argument was
            // passed for the from parameter, not when undefined is explicitly
            // passed as the second argument.
            from: argc > 1 ? from : objectOrReference,
        };
    }
    else {
        options = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, fieldNameOrOptions);
        // Default to objectOrReference only when fieldNameOrOptions.from is
        // actually omitted, rather than just undefined.
        if (!_helpers_js__WEBPACK_IMPORTED_MODULE_3__.hasOwn.call(options, "from")) {
            options.from = objectOrReference;
        }
    }
    if (globalThis.__DEV__ !== false && options.from === void 0) {
        globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(7, (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.stringifyForDisplay)(Array.from(readFieldArgs)));
    }
    if (void 0 === options.variables) {
        options.variables = variables;
    }
    return options;
}
function makeMergeObjectsFunction(store) {
    return function mergeObjects(existing, incoming) {
        if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(existing) || (0,_helpers_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(incoming)) {
            throw (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(8);
        }
        // These dynamic checks are necessary because the parameters of a
        // custom merge function can easily have the any type, so the type
        // system cannot always enforce the StoreObject | Reference parameter
        // types of options.mergeObjects.
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.isNonNullObject)(existing) && (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.isNonNullObject)(incoming)) {
            var eType = store.getFieldValue(existing, "__typename");
            var iType = store.getFieldValue(incoming, "__typename");
            var typesDiffer = eType && iType && eType !== iType;
            if (typesDiffer) {
                return incoming;
            }
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isReference)(existing) && (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.storeValueIsStoreObject)(incoming)) {
                // Update the normalized EntityStore for the entity identified by
                // existing.__ref, preferring/overwriting any fields contributed by the
                // newer incoming StoreObject.
                store.merge(existing.__ref, incoming);
                return existing;
            }
            if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.storeValueIsStoreObject)(existing) && (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.isReference)(incoming)) {
                // Update the normalized EntityStore for the entity identified by
                // incoming.__ref, taking fields from the older existing object only if
                // those fields are not already present in the newer StoreObject
                // identified by incoming.__ref.
                store.merge(existing, incoming.__ref);
                return incoming;
            }
            if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.storeValueIsStoreObject)(existing) &&
                (0,_helpers_js__WEBPACK_IMPORTED_MODULE_3__.storeValueIsStoreObject)(incoming)) {
                return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, existing), incoming);
            }
        }
        return incoming;
    };
}
//# sourceMappingURL=policies.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/cache/inmemory/reactiveVars.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apollo/client/cache/inmemory/reactiveVars.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cacheSlot: () => (/* binding */ cacheSlot),
/* harmony export */   forgetCache: () => (/* binding */ forgetCache),
/* harmony export */   makeVar: () => (/* binding */ makeVar),
/* harmony export */   recallCache: () => (/* binding */ recallCache)
/* harmony export */ });
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! optimism */ "./node_modules/optimism/lib/index.js");

// Contextual Slot that acquires its value when custom read functions are
// called in Policies#readField.
var cacheSlot = new optimism__WEBPACK_IMPORTED_MODULE_0__.Slot();
var cacheInfoMap = new WeakMap();
function getCacheInfo(cache) {
    var info = cacheInfoMap.get(cache);
    if (!info) {
        cacheInfoMap.set(cache, (info = {
            vars: new Set(),
            dep: (0,optimism__WEBPACK_IMPORTED_MODULE_0__.dep)(),
        }));
    }
    return info;
}
function forgetCache(cache) {
    getCacheInfo(cache).vars.forEach(function (rv) { return rv.forgetCache(cache); });
}
// Calling forgetCache(cache) serves to silence broadcasts and allows the
// cache to be garbage collected. However, the varsByCache WeakMap
// preserves the set of reactive variables that were previously associated
// with this cache, which makes it possible to "recall" the cache at a
// later time, by reattaching it to those variables. If the cache has been
// garbage collected in the meantime, because it is no longer reachable,
// you won't be able to call recallCache(cache), and the cache will
// automatically disappear from the varsByCache WeakMap.
function recallCache(cache) {
    getCacheInfo(cache).vars.forEach(function (rv) { return rv.attachCache(cache); });
}
function makeVar(value) {
    var caches = new Set();
    var listeners = new Set();
    var rv = function (newValue) {
        if (arguments.length > 0) {
            if (value !== newValue) {
                value = newValue;
                caches.forEach(function (cache) {
                    // Invalidate any fields with custom read functions that
                    // consumed this variable, so query results involving those
                    // fields will be recomputed the next time we read them.
                    getCacheInfo(cache).dep.dirty(rv);
                    // Broadcast changes to any caches that have previously read
                    // from this variable.
                    broadcast(cache);
                });
                // Finally, notify any listeners added via rv.onNextChange.
                var oldListeners = Array.from(listeners);
                listeners.clear();
                oldListeners.forEach(function (listener) { return listener(value); });
            }
        }
        else {
            // When reading from the variable, obtain the current cache from
            // context via cacheSlot. This isn't entirely foolproof, but it's
            // the same system that powers varDep.
            var cache = cacheSlot.getValue();
            if (cache) {
                attach(cache);
                getCacheInfo(cache).dep(rv);
            }
        }
        return value;
    };
    rv.onNextChange = function (listener) {
        listeners.add(listener);
        return function () {
            listeners.delete(listener);
        };
    };
    var attach = (rv.attachCache = function (cache) {
        caches.add(cache);
        getCacheInfo(cache).vars.add(rv);
        return rv;
    });
    rv.forgetCache = function (cache) { return caches.delete(cache); };
    return rv;
}
function broadcast(cache) {
    if (cache.broadcastWatches) {
        cache.broadcastWatches();
    }
}
//# sourceMappingURL=reactiveVars.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/cache/inmemory/readFromStore.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@apollo/client/cache/inmemory/readFromStore.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoreReader: () => (/* binding */ StoreReader)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/kinds.mjs");
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! optimism */ "./node_modules/optimism/lib/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/compact.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/caching/sizes.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canonicalStringify.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/mergeDeep.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/directives.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/transform.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/fragments.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/objects.js");
/* harmony import */ var _entityStore_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./entityStore.js */ "./node_modules/@apollo/client/cache/inmemory/entityStore.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/cache/inmemory/helpers.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");
/* harmony import */ var _core_types_common_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../core/types/common.js */ "./node_modules/@apollo/client/cache/core/types/common.js");
/* harmony import */ var _object_canon_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./object-canon.js */ "./node_modules/@apollo/client/cache/inmemory/object-canon.js");









function execSelectionSetKeyArgs(options) {
    return [
        options.selectionSet,
        options.objectOrReference,
        options.context,
        // We split out this property so we can pass different values
        // independently without modifying options.context itself.
        options.context.canonizeResults,
    ];
}
var StoreReader = /** @class */ (function () {
    function StoreReader(config) {
        var _this = this;
        this.knownResults = new (_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.canUseWeakMap ? WeakMap : Map)();
        this.config = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.compact)(config, {
            addTypename: config.addTypename !== false,
            canonizeResults: (0,_helpers_js__WEBPACK_IMPORTED_MODULE_4__.shouldCanonizeResults)(config),
        });
        this.canon = config.canon || new _object_canon_js__WEBPACK_IMPORTED_MODULE_5__.ObjectCanon();
        // memoized functions in this class will be "garbage-collected"
        // by recreating the whole `StoreReader` in
        // `InMemoryCache.resetResultsCache`
        // (triggered from `InMemoryCache.gc` with `resetResultCache: true`)
        this.executeSelectionSet = (0,optimism__WEBPACK_IMPORTED_MODULE_1__.wrap)(function (options) {
            var _a;
            var canonizeResults = options.context.canonizeResults;
            var peekArgs = execSelectionSetKeyArgs(options);
            // Negate this boolean option so we can find out if we've already read
            // this result using the other boolean value.
            peekArgs[3] = !canonizeResults;
            var other = (_a = _this.executeSelectionSet).peek.apply(_a, peekArgs);
            if (other) {
                if (canonizeResults) {
                    return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, other), { 
                        // If we previously read this result without canonizing it, we can
                        // reuse that result simply by canonizing it now.
                        result: _this.canon.admit(other.result) });
                }
                // If we previously read this result with canonization enabled, we can
                // return that canonized result as-is.
                return other;
            }
            (0,_entityStore_js__WEBPACK_IMPORTED_MODULE_7__.maybeDependOnExistenceOfEntity)(options.context.store, options.enclosingRef.__ref);
            // Finally, if we didn't find any useful previous results, run the real
            // execSelectionSetImpl method with the given options.
            return _this.execSelectionSetImpl(options);
        }, {
            max: this.config.resultCacheMaxSize ||
                _utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.cacheSizes["inMemoryCache.executeSelectionSet"] ||
                50000 /* defaultCacheSizes["inMemoryCache.executeSelectionSet"] */,
            keyArgs: execSelectionSetKeyArgs,
            // Note that the parameters of makeCacheKey are determined by the
            // array returned by keyArgs.
            makeCacheKey: function (selectionSet, parent, context, canonizeResults) {
                if ((0,_entityStore_js__WEBPACK_IMPORTED_MODULE_7__.supportsResultCaching)(context.store)) {
                    return context.store.makeCacheKey(selectionSet, (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.isReference)(parent) ? parent.__ref : parent, context.varString, canonizeResults);
                }
            },
        });
        this.executeSubSelectedArray = (0,optimism__WEBPACK_IMPORTED_MODULE_1__.wrap)(function (options) {
            (0,_entityStore_js__WEBPACK_IMPORTED_MODULE_7__.maybeDependOnExistenceOfEntity)(options.context.store, options.enclosingRef.__ref);
            return _this.execSubSelectedArrayImpl(options);
        }, {
            max: this.config.resultCacheMaxSize ||
                _utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.cacheSizes["inMemoryCache.executeSubSelectedArray"] ||
                10000 /* defaultCacheSizes["inMemoryCache.executeSubSelectedArray"] */,
            makeCacheKey: function (_a) {
                var field = _a.field, array = _a.array, context = _a.context;
                if ((0,_entityStore_js__WEBPACK_IMPORTED_MODULE_7__.supportsResultCaching)(context.store)) {
                    return context.store.makeCacheKey(field, array, context.varString);
                }
            },
        });
    }
    StoreReader.prototype.resetCanon = function () {
        this.canon = new _object_canon_js__WEBPACK_IMPORTED_MODULE_5__.ObjectCanon();
    };
    /**
     * Given a store and a query, return as much of the result as possible and
     * identify if any data was missing from the store.
     */
    StoreReader.prototype.diffQueryAgainstStore = function (_a) {
        var store = _a.store, query = _a.query, _b = _a.rootId, rootId = _b === void 0 ? "ROOT_QUERY" : _b, variables = _a.variables, _c = _a.returnPartialData, returnPartialData = _c === void 0 ? true : _c, _d = _a.canonizeResults, canonizeResults = _d === void 0 ? this.config.canonizeResults : _d;
        var policies = this.config.cache.policies;
        variables = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.getDefaultValues)((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.getQueryDefinition)(query))), variables);
        var rootRef = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.makeReference)(rootId);
        var execResult = this.executeSelectionSet({
            selectionSet: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.getMainDefinition)(query).selectionSet,
            objectOrReference: rootRef,
            enclosingRef: rootRef,
            context: (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({ store: store, query: query, policies: policies, variables: variables, varString: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_11__.canonicalStringify)(variables), canonizeResults: canonizeResults }, (0,_helpers_js__WEBPACK_IMPORTED_MODULE_4__.extractFragmentContext)(query, this.config.fragments)),
        });
        var missing;
        if (execResult.missing) {
            // For backwards compatibility we still report an array of
            // MissingFieldError objects, even though there will only ever be at most
            // one of them, now that all missing field error messages are grouped
            // together in the execResult.missing tree.
            missing = [
                new _core_types_common_js__WEBPACK_IMPORTED_MODULE_12__.MissingFieldError(firstMissing(execResult.missing), execResult.missing, query, variables),
            ];
            if (!returnPartialData) {
                throw missing[0];
            }
        }
        return {
            result: execResult.result,
            complete: !missing,
            missing: missing,
        };
    };
    StoreReader.prototype.isFresh = function (result, parent, selectionSet, context) {
        if ((0,_entityStore_js__WEBPACK_IMPORTED_MODULE_7__.supportsResultCaching)(context.store) &&
            this.knownResults.get(result) === selectionSet) {
            var latest = this.executeSelectionSet.peek(selectionSet, parent, context, 
            // If result is canonical, then it could only have been previously
            // cached by the canonizing version of executeSelectionSet, so we can
            // avoid checking both possibilities here.
            this.canon.isKnown(result));
            if (latest && result === latest.result) {
                return true;
            }
        }
        return false;
    };
    // Uncached version of executeSelectionSet.
    StoreReader.prototype.execSelectionSetImpl = function (_a) {
        var _this = this;
        var selectionSet = _a.selectionSet, objectOrReference = _a.objectOrReference, enclosingRef = _a.enclosingRef, context = _a.context;
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.isReference)(objectOrReference) &&
            !context.policies.rootTypenamesById[objectOrReference.__ref] &&
            !context.store.has(objectOrReference.__ref)) {
            return {
                result: this.canon.empty,
                missing: "Dangling reference to missing ".concat(objectOrReference.__ref, " object"),
            };
        }
        var variables = context.variables, policies = context.policies, store = context.store;
        var typename = store.getFieldValue(objectOrReference, "__typename");
        var objectsToMerge = [];
        var missing;
        var missingMerger = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.DeepMerger();
        if (this.config.addTypename &&
            typeof typename === "string" &&
            !policies.rootIdsByTypename[typename]) {
            // Ensure we always include a default value for the __typename
            // field, if we have one, and this.config.addTypename is true. Note
            // that this field can be overridden by other merged objects.
            objectsToMerge.push({ __typename: typename });
        }
        function handleMissing(result, resultName) {
            var _a;
            if (result.missing) {
                missing = missingMerger.merge(missing, (_a = {},
                    _a[resultName] = result.missing,
                    _a));
            }
            return result.result;
        }
        var workSet = new Set(selectionSet.selections);
        workSet.forEach(function (selection) {
            var _a, _b;
            // Omit fields with directives @skip(if: <truthy value>) or
            // @include(if: <falsy value>).
            if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_14__.shouldInclude)(selection, variables))
                return;
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.isField)(selection)) {
                var fieldValue = policies.readField({
                    fieldName: selection.name.value,
                    field: selection,
                    variables: context.variables,
                    from: objectOrReference,
                }, context);
                var resultName = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.resultKeyNameFromField)(selection);
                if (fieldValue === void 0) {
                    if (!_utilities_index_js__WEBPACK_IMPORTED_MODULE_15__.addTypenameToDocument.added(selection)) {
                        missing = missingMerger.merge(missing, (_a = {},
                            _a[resultName] = "Can't find field '".concat(selection.name.value, "' on ").concat((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.isReference)(objectOrReference) ?
                                objectOrReference.__ref + " object"
                                : "object " + JSON.stringify(objectOrReference, null, 2)),
                            _a));
                    }
                }
                else if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_16__.isArray)(fieldValue)) {
                    if (fieldValue.length > 0) {
                        fieldValue = handleMissing(_this.executeSubSelectedArray({
                            field: selection,
                            array: fieldValue,
                            enclosingRef: enclosingRef,
                            context: context,
                        }), resultName);
                    }
                }
                else if (!selection.selectionSet) {
                    // If the field does not have a selection set, then we handle it
                    // as a scalar value. To keep this.canon from canonicalizing
                    // this value, we use this.canon.pass to wrap fieldValue in a
                    // Pass object that this.canon.admit will later unwrap as-is.
                    if (context.canonizeResults) {
                        fieldValue = _this.canon.pass(fieldValue);
                    }
                }
                else if (fieldValue != null) {
                    // In this case, because we know the field has a selection set,
                    // it must be trying to query a GraphQLObjectType, which is why
                    // fieldValue must be != null.
                    fieldValue = handleMissing(_this.executeSelectionSet({
                        selectionSet: selection.selectionSet,
                        objectOrReference: fieldValue,
                        enclosingRef: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.isReference)(fieldValue) ? fieldValue : enclosingRef,
                        context: context,
                    }), resultName);
                }
                if (fieldValue !== void 0) {
                    objectsToMerge.push((_b = {}, _b[resultName] = fieldValue, _b));
                }
            }
            else {
                var fragment = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_17__.getFragmentFromSelection)(selection, context.lookupFragment);
                if (!fragment && selection.kind === graphql__WEBPACK_IMPORTED_MODULE_18__.Kind.FRAGMENT_SPREAD) {
                    throw (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(9, selection.name.value);
                }
                if (fragment && policies.fragmentMatches(fragment, typename)) {
                    fragment.selectionSet.selections.forEach(workSet.add, workSet);
                }
            }
        });
        var result = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.mergeDeepArray)(objectsToMerge);
        var finalResult = { result: result, missing: missing };
        var frozen = context.canonizeResults ?
            this.canon.admit(finalResult)
            // Since this.canon is normally responsible for freezing results (only in
            // development), freeze them manually if canonization is disabled.
            : (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_19__.maybeDeepFreeze)(finalResult);
        // Store this result with its selection set so that we can quickly
        // recognize it again in the StoreReader#isFresh method.
        if (frozen.result) {
            this.knownResults.set(frozen.result, selectionSet);
        }
        return frozen;
    };
    // Uncached version of executeSubSelectedArray.
    StoreReader.prototype.execSubSelectedArrayImpl = function (_a) {
        var _this = this;
        var field = _a.field, array = _a.array, enclosingRef = _a.enclosingRef, context = _a.context;
        var missing;
        var missingMerger = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.DeepMerger();
        function handleMissing(childResult, i) {
            var _a;
            if (childResult.missing) {
                missing = missingMerger.merge(missing, (_a = {}, _a[i] = childResult.missing, _a));
            }
            return childResult.result;
        }
        if (field.selectionSet) {
            array = array.filter(context.store.canRead);
        }
        array = array.map(function (item, i) {
            // null value in array
            if (item === null) {
                return null;
            }
            // This is a nested array, recurse
            if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_16__.isArray)(item)) {
                return handleMissing(_this.executeSubSelectedArray({
                    field: field,
                    array: item,
                    enclosingRef: enclosingRef,
                    context: context,
                }), i);
            }
            // This is an object, run the selection set on it
            if (field.selectionSet) {
                return handleMissing(_this.executeSelectionSet({
                    selectionSet: field.selectionSet,
                    objectOrReference: item,
                    enclosingRef: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.isReference)(item) ? item : enclosingRef,
                    context: context,
                }), i);
            }
            if (globalThis.__DEV__ !== false) {
                assertSelectionSetForIdValue(context.store, field, item);
            }
            return item;
        });
        return {
            result: context.canonizeResults ? this.canon.admit(array) : array,
            missing: missing,
        };
    };
    return StoreReader;
}());

function firstMissing(tree) {
    try {
        JSON.stringify(tree, function (_, value) {
            if (typeof value === "string")
                throw value;
            return value;
        });
    }
    catch (result) {
        return result;
    }
}
function assertSelectionSetForIdValue(store, field, fieldValue) {
    if (!field.selectionSet) {
        var workSet_1 = new Set([fieldValue]);
        workSet_1.forEach(function (value) {
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_20__.isNonNullObject)(value)) {
                (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(
                    !(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.isReference)(value),
                    10,
                    (0,_helpers_js__WEBPACK_IMPORTED_MODULE_4__.getTypenameFromStoreObject)(store, value),
                    field.name.value
                );
                Object.values(value).forEach(workSet_1.add, workSet_1);
            }
        });
    }
}
//# sourceMappingURL=readFromStore.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/cache/inmemory/writeToStore.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apollo/client/cache/inmemory/writeToStore.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StoreWriter: () => (/* binding */ StoreWriter)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/index.js");
/* harmony import */ var _wry_trie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wry/trie */ "./node_modules/@wry/trie/lib/index.js");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/kinds.mjs");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canonicalStringify.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/transform.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/cloneDeep.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/directives.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/fragments.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/@apollo/client/cache/inmemory/helpers.js");
/* harmony import */ var _policies_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./policies.js */ "./node_modules/@apollo/client/cache/inmemory/policies.js");








// Since there are only four possible combinations of context.clientOnly and
// context.deferred values, we should need at most four "flavors" of any given
// WriteContext. To avoid creating multiple copies of the same context, we cache
// the contexts in the context.flavors Map (shared by all flavors) according to
// their clientOnly and deferred values (always in that order).
function getContextFlavor(context, clientOnly, deferred) {
    var key = "".concat(clientOnly).concat(deferred);
    var flavored = context.flavors.get(key);
    if (!flavored) {
        context.flavors.set(key, (flavored =
            context.clientOnly === clientOnly && context.deferred === deferred ?
                context
                : (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, context), { clientOnly: clientOnly, deferred: deferred })));
    }
    return flavored;
}
var StoreWriter = /** @class */ (function () {
    function StoreWriter(cache, reader, fragments) {
        this.cache = cache;
        this.reader = reader;
        this.fragments = fragments;
    }
    StoreWriter.prototype.writeToStore = function (store, _a) {
        var _this = this;
        var query = _a.query, result = _a.result, dataId = _a.dataId, variables = _a.variables, overwrite = _a.overwrite;
        var operationDefinition = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.getOperationDefinition)(query);
        var merger = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_5__.makeProcessedFieldsMerger)();
        variables = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.getDefaultValues)(operationDefinition)), variables);
        var context = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({ store: store, written: Object.create(null), merge: function (existing, incoming) {
                return merger.merge(existing, incoming);
            }, variables: variables, varString: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_6__.canonicalStringify)(variables) }, (0,_helpers_js__WEBPACK_IMPORTED_MODULE_5__.extractFragmentContext)(query, this.fragments)), { overwrite: !!overwrite, incomingById: new Map(), clientOnly: false, deferred: false, flavors: new Map() });
        var ref = this.processSelectionSet({
            result: result || Object.create(null),
            dataId: dataId,
            selectionSet: operationDefinition.selectionSet,
            mergeTree: { map: new Map() },
            context: context,
        });
        if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.isReference)(ref)) {
            throw (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(11, result);
        }
        // So far, the store has not been modified, so now it's time to process
        // context.incomingById and merge those incoming fields into context.store.
        context.incomingById.forEach(function (_a, dataId) {
            var storeObject = _a.storeObject, mergeTree = _a.mergeTree, fieldNodeSet = _a.fieldNodeSet;
            var entityRef = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.makeReference)(dataId);
            if (mergeTree && mergeTree.map.size) {
                var applied = _this.applyMerges(mergeTree, entityRef, storeObject, context);
                if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.isReference)(applied)) {
                    // Assume References returned by applyMerges have already been merged
                    // into the store. See makeMergeObjectsFunction in policies.ts for an
                    // example of how this can happen.
                    return;
                }
                // Otherwise, applyMerges returned a StoreObject, whose fields we should
                // merge into the store (see store.merge statement below).
                storeObject = applied;
            }
            if (globalThis.__DEV__ !== false && !context.overwrite) {
                var fieldsWithSelectionSets_1 = Object.create(null);
                fieldNodeSet.forEach(function (field) {
                    if (field.selectionSet) {
                        fieldsWithSelectionSets_1[field.name.value] = true;
                    }
                });
                var hasSelectionSet_1 = function (storeFieldName) {
                    return fieldsWithSelectionSets_1[(0,_helpers_js__WEBPACK_IMPORTED_MODULE_5__.fieldNameFromStoreName)(storeFieldName)] ===
                        true;
                };
                var hasMergeFunction_1 = function (storeFieldName) {
                    var childTree = mergeTree && mergeTree.map.get(storeFieldName);
                    return Boolean(childTree && childTree.info && childTree.info.merge);
                };
                Object.keys(storeObject).forEach(function (storeFieldName) {
                    // If a merge function was defined for this field, trust that it
                    // did the right thing about (not) clobbering data. If the field
                    // has no selection set, it's a scalar field, so it doesn't need
                    // a merge function (even if it's an object, like JSON data).
                    if (hasSelectionSet_1(storeFieldName) &&
                        !hasMergeFunction_1(storeFieldName)) {
                        warnAboutDataLoss(entityRef, storeObject, storeFieldName, context.store);
                    }
                });
            }
            store.merge(dataId, storeObject);
        });
        // Any IDs written explicitly to the cache will be retained as
        // reachable root IDs for garbage collection purposes. Although this
        // logic includes root IDs like ROOT_QUERY and ROOT_MUTATION, their
        // retainment counts are effectively ignored because cache.gc() always
        // includes them in its root ID set.
        store.retain(ref.__ref);
        return ref;
    };
    StoreWriter.prototype.processSelectionSet = function (_a) {
        var _this = this;
        var dataId = _a.dataId, result = _a.result, selectionSet = _a.selectionSet, context = _a.context, 
        // This object allows processSelectionSet to report useful information
        // to its callers without explicitly returning that information.
        mergeTree = _a.mergeTree;
        var policies = this.cache.policies;
        // This variable will be repeatedly updated using context.merge to
        // accumulate all fields that need to be written into the store.
        var incoming = Object.create(null);
        // If typename was not passed in, infer it. Note that typename is
        // always passed in for tricky-to-infer cases such as "Query" for
        // ROOT_QUERY.
        var typename = (dataId && policies.rootTypenamesById[dataId]) ||
            (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.getTypenameFromResult)(result, selectionSet, context.fragmentMap) ||
            (dataId && context.store.get(dataId, "__typename"));
        if ("string" === typeof typename) {
            incoming.__typename = typename;
        }
        // This readField function will be passed as context.readField in the
        // KeyFieldsContext object created within policies.identify (called below).
        // In addition to reading from the existing context.store (thanks to the
        // policies.readField(options, context) line at the very bottom), this
        // version of readField can read from Reference objects that are currently
        // pending in context.incomingById, which is important whenever keyFields
        // need to be extracted from a child object that processSelectionSet has
        // turned into a Reference.
        var readField = function () {
            var options = (0,_policies_js__WEBPACK_IMPORTED_MODULE_8__.normalizeReadFieldOptions)(arguments, incoming, context.variables);
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.isReference)(options.from)) {
                var info = context.incomingById.get(options.from.__ref);
                if (info) {
                    var result_1 = policies.readField((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, options), { from: info.storeObject }), context);
                    if (result_1 !== void 0) {
                        return result_1;
                    }
                }
            }
            return policies.readField(options, context);
        };
        var fieldNodeSet = new Set();
        this.flattenFields(selectionSet, result, 
        // This WriteContext will be the default context value for fields returned
        // by the flattenFields method, but some fields may be assigned a modified
        // context, depending on the presence of @client and other directives.
        context, typename).forEach(function (context, field) {
            var _a;
            var resultFieldKey = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.resultKeyNameFromField)(field);
            var value = result[resultFieldKey];
            fieldNodeSet.add(field);
            if (value !== void 0) {
                var storeFieldName = policies.getStoreFieldName({
                    typename: typename,
                    fieldName: field.name.value,
                    field: field,
                    variables: context.variables,
                });
                var childTree = getChildMergeTree(mergeTree, storeFieldName);
                var incomingValue = _this.processFieldValue(value, field, 
                // Reset context.clientOnly and context.deferred to their default
                // values before processing nested selection sets.
                field.selectionSet ?
                    getContextFlavor(context, false, false)
                    : context, childTree);
                // To determine if this field holds a child object with a merge function
                // defined in its type policy (see PR #7070), we need to figure out the
                // child object's __typename.
                var childTypename = void 0;
                // The field's value can be an object that has a __typename only if the
                // field has a selection set. Otherwise incomingValue is scalar.
                if (field.selectionSet &&
                    ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.isReference)(incomingValue) || (0,_helpers_js__WEBPACK_IMPORTED_MODULE_5__.storeValueIsStoreObject)(incomingValue))) {
                    childTypename = readField("__typename", incomingValue);
                }
                var merge = policies.getMergeFunction(typename, field.name.value, childTypename);
                if (merge) {
                    childTree.info = {
                        // TODO Check compatibility against any existing childTree.field?
                        field: field,
                        typename: typename,
                        merge: merge,
                    };
                }
                else {
                    maybeRecycleChildMergeTree(mergeTree, storeFieldName);
                }
                incoming = context.merge(incoming, (_a = {},
                    _a[storeFieldName] = incomingValue,
                    _a));
            }
            else if (globalThis.__DEV__ !== false &&
                !context.clientOnly &&
                !context.deferred &&
                !_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.addTypenameToDocument.added(field) &&
                // If the field has a read function, it may be a synthetic field or
                // provide a default value, so its absence from the written data should
                // not be cause for alarm.
                !policies.getReadFunction(typename, field.name.value)) {
                globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.error(12, (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.resultKeyNameFromField)(field), result);
            }
        });
        // Identify the result object, even if dataId was already provided,
        // since we always need keyObject below.
        try {
            var _b = policies.identify(result, {
                typename: typename,
                selectionSet: selectionSet,
                fragmentMap: context.fragmentMap,
                storeObject: incoming,
                readField: readField,
            }), id = _b[0], keyObject = _b[1];
            // If dataId was not provided, fall back to the id just generated by
            // policies.identify.
            dataId = dataId || id;
            // Write any key fields that were used during identification, even if
            // they were not mentioned in the original query.
            if (keyObject) {
                // TODO Reverse the order of the arguments?
                incoming = context.merge(incoming, keyObject);
            }
        }
        catch (e) {
            // If dataId was provided, tolerate failure of policies.identify.
            if (!dataId)
                throw e;
        }
        if ("string" === typeof dataId) {
            var dataRef = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.makeReference)(dataId);
            // Avoid processing the same entity object using the same selection
            // set more than once. We use an array instead of a Set since most
            // entity IDs will be written using only one selection set, so the
            // size of this array is likely to be very small, meaning indexOf is
            // likely to be faster than Set.prototype.has.
            var sets = context.written[dataId] || (context.written[dataId] = []);
            if (sets.indexOf(selectionSet) >= 0)
                return dataRef;
            sets.push(selectionSet);
            // If we're about to write a result object into the store, but we
            // happen to know that the exact same (===) result object would be
            // returned if we were to reread the result with the same inputs,
            // then we can skip the rest of the processSelectionSet work for
            // this object, and immediately return a Reference to it.
            if (this.reader &&
                this.reader.isFresh(result, dataRef, selectionSet, context)) {
                return dataRef;
            }
            var previous_1 = context.incomingById.get(dataId);
            if (previous_1) {
                previous_1.storeObject = context.merge(previous_1.storeObject, incoming);
                previous_1.mergeTree = mergeMergeTrees(previous_1.mergeTree, mergeTree);
                fieldNodeSet.forEach(function (field) { return previous_1.fieldNodeSet.add(field); });
            }
            else {
                context.incomingById.set(dataId, {
                    storeObject: incoming,
                    // Save a reference to mergeTree only if it is not empty, because
                    // empty MergeTrees may be recycled by maybeRecycleChildMergeTree and
                    // reused for entirely different parts of the result tree.
                    mergeTree: mergeTreeIsEmpty(mergeTree) ? void 0 : mergeTree,
                    fieldNodeSet: fieldNodeSet,
                });
            }
            return dataRef;
        }
        return incoming;
    };
    StoreWriter.prototype.processFieldValue = function (value, field, context, mergeTree) {
        var _this = this;
        if (!field.selectionSet || value === null) {
            // In development, we need to clone scalar values so that they can be
            // safely frozen with maybeDeepFreeze in readFromStore.ts. In production,
            // it's cheaper to store the scalar values directly in the cache.
            return globalThis.__DEV__ !== false ? (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.cloneDeep)(value) : value;
        }
        if ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_11__.isArray)(value)) {
            return value.map(function (item, i) {
                var value = _this.processFieldValue(item, field, context, getChildMergeTree(mergeTree, i));
                maybeRecycleChildMergeTree(mergeTree, i);
                return value;
            });
        }
        return this.processSelectionSet({
            result: value,
            selectionSet: field.selectionSet,
            context: context,
            mergeTree: mergeTree,
        });
    };
    // Implements https://spec.graphql.org/draft/#sec-Field-Collection, but with
    // some additions for tracking @client and @defer directives.
    StoreWriter.prototype.flattenFields = function (selectionSet, result, context, typename) {
        if (typename === void 0) { typename = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.getTypenameFromResult)(result, selectionSet, context.fragmentMap); }
        var fieldMap = new Map();
        var policies = this.cache.policies;
        var limitingTrie = new _wry_trie__WEBPACK_IMPORTED_MODULE_2__.Trie(false); // No need for WeakMap, since limitingTrie does not escape.
        (function flatten(selectionSet, inheritedContext) {
            var visitedNode = limitingTrie.lookup(selectionSet, 
            // Because we take inheritedClientOnly and inheritedDeferred into
            // consideration here (in addition to selectionSet), it's possible for
            // the same selection set to be flattened more than once, if it appears
            // in the query with different @client and/or @directive configurations.
            inheritedContext.clientOnly, inheritedContext.deferred);
            if (visitedNode.visited)
                return;
            visitedNode.visited = true;
            selectionSet.selections.forEach(function (selection) {
                if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_12__.shouldInclude)(selection, context.variables))
                    return;
                var clientOnly = inheritedContext.clientOnly, deferred = inheritedContext.deferred;
                if (
                // Since the presence of @client or @defer on this field can only
                // cause clientOnly or deferred to become true, we can skip the
                // forEach loop if both clientOnly and deferred are already true.
                !(clientOnly && deferred) &&
                    (0,_helpers_js__WEBPACK_IMPORTED_MODULE_11__.isNonEmptyArray)(selection.directives)) {
                    selection.directives.forEach(function (dir) {
                        var name = dir.name.value;
                        if (name === "client")
                            clientOnly = true;
                        if (name === "defer") {
                            var args = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.argumentsObjectFromField)(dir, context.variables);
                            // The @defer directive takes an optional args.if boolean
                            // argument, similar to @include(if: boolean). Note that
                            // @defer(if: false) does not make context.deferred false, but
                            // instead behaves as if there was no @defer directive.
                            if (!args || args.if !== false) {
                                deferred = true;
                            }
                            // TODO In the future, we may want to record args.label using
                            // context.deferred, if a label is specified.
                        }
                    });
                }
                if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.isField)(selection)) {
                    var existing = fieldMap.get(selection);
                    if (existing) {
                        // If this field has been visited along another recursive path
                        // before, the final context should have clientOnly or deferred set
                        // to true only if *all* paths have the directive (hence the &&).
                        clientOnly = clientOnly && existing.clientOnly;
                        deferred = deferred && existing.deferred;
                    }
                    fieldMap.set(selection, getContextFlavor(context, clientOnly, deferred));
                }
                else {
                    var fragment = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.getFragmentFromSelection)(selection, context.lookupFragment);
                    if (!fragment && selection.kind === graphql__WEBPACK_IMPORTED_MODULE_14__.Kind.FRAGMENT_SPREAD) {
                        throw (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(13, selection.name.value);
                    }
                    if (fragment &&
                        policies.fragmentMatches(fragment, typename, result, context.variables)) {
                        flatten(fragment.selectionSet, getContextFlavor(context, clientOnly, deferred));
                    }
                }
            });
        })(selectionSet, context);
        return fieldMap;
    };
    StoreWriter.prototype.applyMerges = function (mergeTree, existing, incoming, context, getStorageArgs) {
        var _a;
        var _this = this;
        if (mergeTree.map.size && !(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.isReference)(incoming)) {
            var e_1 = 
            // Items in the same position in different arrays are not
            // necessarily related to each other, so when incoming is an array
            // we process its elements as if there was no existing data.
            (!(0,_helpers_js__WEBPACK_IMPORTED_MODULE_11__.isArray)(incoming) &&
                // Likewise, existing must be either a Reference or a StoreObject
                // in order for its fields to be safe to merge with the fields of
                // the incoming object.
                ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.isReference)(existing) || (0,_helpers_js__WEBPACK_IMPORTED_MODULE_5__.storeValueIsStoreObject)(existing))) ?
                existing
                : void 0;
            // This narrowing is implied by mergeTree.map.size > 0 and
            // !isReference(incoming), though TypeScript understandably cannot
            // hope to infer this type.
            var i_1 = incoming;
            // The options.storage objects provided to read and merge functions
            // are derived from the identity of the parent object plus a
            // sequence of storeFieldName strings/numbers identifying the nested
            // field name path of each field value to be merged.
            if (e_1 && !getStorageArgs) {
                getStorageArgs = [(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.isReference)(e_1) ? e_1.__ref : e_1];
            }
            // It's possible that applying merge functions to this subtree will
            // not change the incoming data, so this variable tracks the fields
            // that did change, so we can create a new incoming object when (and
            // only when) at least one incoming field has changed. We use a Map
            // to preserve the type of numeric keys.
            var changedFields_1;
            var getValue_1 = function (from, name) {
                return ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_11__.isArray)(from) ?
                    typeof name === "number" ?
                        from[name]
                        : void 0
                    : context.store.getFieldValue(from, String(name)));
            };
            mergeTree.map.forEach(function (childTree, storeFieldName) {
                var eVal = getValue_1(e_1, storeFieldName);
                var iVal = getValue_1(i_1, storeFieldName);
                // If we have no incoming data, leave any existing data untouched.
                if (void 0 === iVal)
                    return;
                if (getStorageArgs) {
                    getStorageArgs.push(storeFieldName);
                }
                var aVal = _this.applyMerges(childTree, eVal, iVal, context, getStorageArgs);
                if (aVal !== iVal) {
                    changedFields_1 = changedFields_1 || new Map();
                    changedFields_1.set(storeFieldName, aVal);
                }
                if (getStorageArgs) {
                    (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(getStorageArgs.pop() === storeFieldName);
                }
            });
            if (changedFields_1) {
                // Shallow clone i so we can add changed fields to it.
                incoming = ((0,_helpers_js__WEBPACK_IMPORTED_MODULE_11__.isArray)(i_1) ? i_1.slice(0) : (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, i_1));
                changedFields_1.forEach(function (value, name) {
                    incoming[name] = value;
                });
            }
        }
        if (mergeTree.info) {
            return this.cache.policies.runMergeFunction(existing, incoming, mergeTree.info, context, getStorageArgs && (_a = context.store).getStorage.apply(_a, getStorageArgs));
        }
        return incoming;
    };
    return StoreWriter;
}());

var emptyMergeTreePool = [];
function getChildMergeTree(_a, name) {
    var map = _a.map;
    if (!map.has(name)) {
        map.set(name, emptyMergeTreePool.pop() || { map: new Map() });
    }
    return map.get(name);
}
function mergeMergeTrees(left, right) {
    if (left === right || !right || mergeTreeIsEmpty(right))
        return left;
    if (!left || mergeTreeIsEmpty(left))
        return right;
    var info = left.info && right.info ? (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, left.info), right.info) : left.info || right.info;
    var needToMergeMaps = left.map.size && right.map.size;
    var map = needToMergeMaps ? new Map()
        : left.map.size ? left.map
            : right.map;
    var merged = { info: info, map: map };
    if (needToMergeMaps) {
        var remainingRightKeys_1 = new Set(right.map.keys());
        left.map.forEach(function (leftTree, key) {
            merged.map.set(key, mergeMergeTrees(leftTree, right.map.get(key)));
            remainingRightKeys_1.delete(key);
        });
        remainingRightKeys_1.forEach(function (key) {
            merged.map.set(key, mergeMergeTrees(right.map.get(key), left.map.get(key)));
        });
    }
    return merged;
}
function mergeTreeIsEmpty(tree) {
    return !tree || !(tree.info || tree.map.size);
}
function maybeRecycleChildMergeTree(_a, name) {
    var map = _a.map;
    var childTree = map.get(name);
    if (childTree && mergeTreeIsEmpty(childTree)) {
        emptyMergeTreePool.push(childTree);
        map.delete(name);
    }
}
var warnings = new Set();
// Note that this function is unused in production, and thus should be
// pruned by any well-configured minifier.
function warnAboutDataLoss(existingRef, incomingObj, storeFieldName, store) {
    var getChild = function (objOrRef) {
        var child = store.getFieldValue(objOrRef, storeFieldName);
        return typeof child === "object" && child;
    };
    var existing = getChild(existingRef);
    if (!existing)
        return;
    var incoming = getChild(incomingObj);
    if (!incoming)
        return;
    // It's always safe to replace a reference, since it refers to data
    // safely stored elsewhere.
    if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.isReference)(existing))
        return;
    // If the values are structurally equivalent, we do not need to worry
    // about incoming replacing existing.
    if ((0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(existing, incoming))
        return;
    // If we're replacing every key of the existing object, then the
    // existing data would be overwritten even if the objects were
    // normalized, so warning would not be helpful here.
    if (Object.keys(existing).every(function (key) { return store.getFieldValue(incoming, key) !== void 0; })) {
        return;
    }
    var parentType = store.getFieldValue(existingRef, "__typename") ||
        store.getFieldValue(incomingObj, "__typename");
    var fieldName = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_5__.fieldNameFromStoreName)(storeFieldName);
    var typeDotName = "".concat(parentType, ".").concat(fieldName);
    // Avoid warning more than once for the same type and field name.
    if (warnings.has(typeDotName))
        return;
    warnings.add(typeDotName);
    var childTypenames = [];
    // Arrays do not have __typename fields, and always need a custom merge
    // function, even if their elements are normalized entities.
    if (!(0,_helpers_js__WEBPACK_IMPORTED_MODULE_11__.isArray)(existing) && !(0,_helpers_js__WEBPACK_IMPORTED_MODULE_11__.isArray)(incoming)) {
        [existing, incoming].forEach(function (child) {
            var typename = store.getFieldValue(child, "__typename");
            if (typeof typename === "string" && !childTypenames.includes(typename)) {
                childTypenames.push(typename);
            }
        });
    }
    globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(14, fieldName, parentType, childTypenames.length ?
        "either ensure all objects of type " +
            childTypenames.join(" and ") +
            " have an ID or a custom merge function, or "
        : "", typeDotName, (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, existing), (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, incoming));
}
//# sourceMappingURL=writeToStore.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/core/ApolloClient.js":
/*!**********************************************************!*\
  !*** ./node_modules/@apollo/client/core/ApolloClient.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApolloClient: () => (/* binding */ ApolloClient),
/* harmony export */   mergeOptions: () => (/* reexport safe */ _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.mergeOptions)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _link_core_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../link/core/index.js */ "./node_modules/@apollo/client/link/core/ApolloLink.js");
/* harmony import */ var _link_core_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../link/core/index.js */ "./node_modules/@apollo/client/link/core/execute.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../version.js */ "./node_modules/@apollo/client/version.js");
/* harmony import */ var _link_http_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../link/http/index.js */ "./node_modules/@apollo/client/link/http/HttpLink.js");
/* harmony import */ var _QueryManager_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./QueryManager.js */ "./node_modules/@apollo/client/core/QueryManager.js");
/* harmony import */ var _LocalState_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./LocalState.js */ "./node_modules/@apollo/client/core/LocalState.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/mergeOptions.js");
/* harmony import */ var _utilities_caching_getMemoryInternals_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities/caching/getMemoryInternals.js */ "./node_modules/@apollo/client/utilities/caching/getMemoryInternals.js");







var hasSuggestedDevtools = false;
// Though mergeOptions now resides in @apollo/client/utilities, it was
// previously declared and exported from this module, and then reexported from
// @apollo/client/core. Since we need to preserve that API anyway, the easiest
// solution is to reexport mergeOptions where it was previously declared (here).



/**
 * This is the primary Apollo Client class. It is used to send GraphQL documents (i.e. queries
 * and mutations) to a GraphQL spec-compliant server over an `ApolloLink` instance,
 * receive results from the server and cache the results in a store. It also delivers updates
 * to GraphQL queries through `Observable` instances.
 */
var ApolloClient = /** @class */ (function () {
    /**
     * Constructs an instance of `ApolloClient`.
     *
     * @example
     * ```js
     * import { ApolloClient, InMemoryCache } from '@apollo/client';
     *
     * const cache = new InMemoryCache();
     *
     * const client = new ApolloClient({
     *   // Provide required constructor fields
     *   cache: cache,
     *   uri: 'http://localhost:4000/',
     *
     *   // Provide some optional constructor fields
     *   name: 'react-web-client',
     *   version: '1.3',
     *   queryDeduplication: false,
     *   defaultOptions: {
     *     watchQuery: {
     *       fetchPolicy: 'cache-and-network',
     *     },
     *   },
     * });
     * ```
     */
    function ApolloClient(options) {
        var _this = this;
        this.resetStoreCallbacks = [];
        this.clearStoreCallbacks = [];
        if (!options.cache) {
            throw (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(15);
        }
        var uri = options.uri, credentials = options.credentials, headers = options.headers, cache = options.cache, documentTransform = options.documentTransform, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, 
        // Expose the client instance as window.__APOLLO_CLIENT__ and call
        // onBroadcast in queryManager.broadcastQueries to enable browser
        // devtools, but disable them by default in production.
        connectToDevTools = options.connectToDevTools, _c = options.queryDeduplication, queryDeduplication = _c === void 0 ? true : _c, defaultOptions = options.defaultOptions, defaultContext = options.defaultContext, _d = options.assumeImmutableResults, assumeImmutableResults = _d === void 0 ? cache.assumeImmutableResults : _d, resolvers = options.resolvers, typeDefs = options.typeDefs, fragmentMatcher = options.fragmentMatcher, clientAwarenessName = options.name, clientAwarenessVersion = options.version, devtools = options.devtools;
        var link = options.link;
        if (!link) {
            link =
                uri ? new _link_http_index_js__WEBPACK_IMPORTED_MODULE_2__.HttpLink({ uri: uri, credentials: credentials, headers: headers }) : _link_core_index_js__WEBPACK_IMPORTED_MODULE_3__.ApolloLink.empty();
        }
        this.link = link;
        this.cache = cache;
        this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
        this.queryDeduplication = queryDeduplication;
        this.defaultOptions = defaultOptions || Object.create(null);
        this.typeDefs = typeDefs;
        this.devtoolsConfig = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, devtools), { enabled: (devtools === null || devtools === void 0 ? void 0 : devtools.enabled) || connectToDevTools });
        if (this.devtoolsConfig.enabled === undefined) {
            this.devtoolsConfig.enabled = globalThis.__DEV__ !== false;
        }
        if (ssrForceFetchDelay) {
            setTimeout(function () { return (_this.disableNetworkFetches = false); }, ssrForceFetchDelay);
        }
        this.watchQuery = this.watchQuery.bind(this);
        this.query = this.query.bind(this);
        this.mutate = this.mutate.bind(this);
        this.watchFragment = this.watchFragment.bind(this);
        this.resetStore = this.resetStore.bind(this);
        this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
        this.version = _version_js__WEBPACK_IMPORTED_MODULE_5__.version;
        this.localState = new _LocalState_js__WEBPACK_IMPORTED_MODULE_6__.LocalState({
            cache: cache,
            client: this,
            resolvers: resolvers,
            fragmentMatcher: fragmentMatcher,
        });
        this.queryManager = new _QueryManager_js__WEBPACK_IMPORTED_MODULE_7__.QueryManager({
            cache: this.cache,
            link: this.link,
            defaultOptions: this.defaultOptions,
            defaultContext: defaultContext,
            documentTransform: documentTransform,
            queryDeduplication: queryDeduplication,
            ssrMode: ssrMode,
            clientAwareness: {
                name: clientAwarenessName,
                version: clientAwarenessVersion,
            },
            localState: this.localState,
            assumeImmutableResults: assumeImmutableResults,
            onBroadcast: this.devtoolsConfig.enabled ?
                function () {
                    if (_this.devToolsHookCb) {
                        _this.devToolsHookCb({
                            action: {},
                            state: {
                                queries: _this.queryManager.getQueryStore(),
                                mutations: _this.queryManager.mutationStore || {},
                            },
                            dataWithOptimisticResults: _this.cache.extract(true),
                        });
                    }
                }
                : void 0,
        });
        if (this.devtoolsConfig.enabled)
            this.connectToDevTools();
    }
    ApolloClient.prototype.connectToDevTools = function () {
        if (typeof window === "undefined") {
            return;
        }
        var windowWithDevTools = window;
        var devtoolsSymbol = Symbol.for("apollo.devtools");
        (windowWithDevTools[devtoolsSymbol] =
            windowWithDevTools[devtoolsSymbol] || []).push(this);
        windowWithDevTools.__APOLLO_CLIENT__ = this;
        /**
         * Suggest installing the devtools for developers who don't have them
         */
        if (!hasSuggestedDevtools && globalThis.__DEV__ !== false) {
            hasSuggestedDevtools = true;
            if (window.document &&
                window.top === window.self &&
                /^(https?|file):$/.test(window.location.protocol)) {
                setTimeout(function () {
                    if (!window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
                        var nav = window.navigator;
                        var ua = nav && nav.userAgent;
                        var url = void 0;
                        if (typeof ua === "string") {
                            if (ua.indexOf("Chrome/") > -1) {
                                url =
                                    "https://chrome.google.com/webstore/detail/" +
                                        "apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm";
                            }
                            else if (ua.indexOf("Firefox/") > -1) {
                                url =
                                    "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/";
                            }
                        }
                        if (url) {
                            globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.log("Download the Apollo DevTools for a better development " +
                                "experience: %s", url);
                        }
                    }
                }, 10000);
            }
        }
    };
    Object.defineProperty(ApolloClient.prototype, "documentTransform", {
        /**
         * The `DocumentTransform` used to modify GraphQL documents before a request
         * is made. If a custom `DocumentTransform` is not provided, this will be the
         * default document transform.
         */
        get: function () {
            return this.queryManager.documentTransform;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Call this method to terminate any active client processes, making it safe
     * to dispose of this `ApolloClient` instance.
     */
    ApolloClient.prototype.stop = function () {
        this.queryManager.stop();
    };
    /**
     * This watches the cache store of the query according to the options specified and
     * returns an `ObservableQuery`. We can subscribe to this `ObservableQuery` and
     * receive updated results through an observer when the cache store changes.
     *
     * Note that this method is not an implementation of GraphQL subscriptions. Rather,
     * it uses Apollo's store in order to reactively deliver updates to your query results.
     *
     * For example, suppose you call watchQuery on a GraphQL query that fetches a person's
     * first and last name and this person has a particular object identifier, provided by
     * dataIdFromObject. Later, a different query fetches that same person's
     * first and last name and the first name has now changed. Then, any observers associated
     * with the results of the first query will be updated with a new result object.
     *
     * Note that if the cache does not change, the subscriber will *not* be notified.
     *
     * See [here](https://medium.com/apollo-stack/the-concepts-of-graphql-bc68bd819be3#.3mb0cbcmc) for
     * a description of store reactivity.
     */
    ApolloClient.prototype.watchQuery = function (options) {
        if (this.defaultOptions.watchQuery) {
            options = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.mergeOptions)(this.defaultOptions.watchQuery, options);
        }
        // XXX Overwriting options is probably not the best way to do this long term...
        if (this.disableNetworkFetches &&
            (options.fetchPolicy === "network-only" ||
                options.fetchPolicy === "cache-and-network")) {
            options = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, options), { fetchPolicy: "cache-first" });
        }
        return this.queryManager.watchQuery(options);
    };
    /**
     * This resolves a single query according to the options specified and
     * returns a `Promise` which is either resolved with the resulting data
     * or rejected with an error.
     *
     * @param options - An object of type `QueryOptions` that allows us to
     * describe how this query should be treated e.g. whether it should hit the
     * server at all or just resolve from the cache, etc.
     */
    ApolloClient.prototype.query = function (options) {
        if (this.defaultOptions.query) {
            options = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.mergeOptions)(this.defaultOptions.query, options);
        }
        (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(options.fetchPolicy !== "cache-and-network", 16);
        if (this.disableNetworkFetches && options.fetchPolicy === "network-only") {
            options = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, options), { fetchPolicy: "cache-first" });
        }
        return this.queryManager.query(options);
    };
    /**
     * This resolves a single mutation according to the options specified and returns a
     * Promise which is either resolved with the resulting data or rejected with an
     * error. In some cases both `data` and `errors` might be undefined, for example
     * when `errorPolicy` is set to `'ignore'`.
     *
     * It takes options as an object with the following keys and values:
     */
    ApolloClient.prototype.mutate = function (options) {
        if (this.defaultOptions.mutate) {
            options = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.mergeOptions)(this.defaultOptions.mutate, options);
        }
        return this.queryManager.mutate(options);
    };
    /**
     * This subscribes to a graphql subscription according to the options specified and returns an
     * `Observable` which either emits received data or an error.
     */
    ApolloClient.prototype.subscribe = function (options) {
        return this.queryManager.startGraphQLSubscription(options);
    };
    /**
     * Tries to read some data from the store in the shape of the provided
     * GraphQL query without making a network request. This method will start at
     * the root query. To start at a specific id returned by `dataIdFromObject`
     * use `readFragment`.
     *
     * @param optimistic - Set to `true` to allow `readQuery` to return
     * optimistic results. Is `false` by default.
     */
    ApolloClient.prototype.readQuery = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.cache.readQuery(options, optimistic);
    };
    /**
     * Watches the cache store of the fragment according to the options specified
     * and returns an `Observable`. We can subscribe to this
     * `Observable` and receive updated results through an
     * observer when the cache store changes.
     *
     * You must pass in a GraphQL document with a single fragment or a document
     * with multiple fragments that represent what you are reading. If you pass
     * in a document with multiple fragments then you must also specify a
     * `fragmentName`.
     *
     * @since 3.10.0
     * @param options - An object of type `WatchFragmentOptions` that allows
     * the cache to identify the fragment and optionally specify whether to react
     * to optimistic updates.
     */
    ApolloClient.prototype.watchFragment = function (options) {
        return this.cache.watchFragment(options);
    };
    /**
     * Tries to read some data from the store in the shape of the provided
     * GraphQL fragment without making a network request. This method will read a
     * GraphQL fragment from any arbitrary id that is currently cached, unlike
     * `readQuery` which will only read from the root query.
     *
     * You must pass in a GraphQL document with a single fragment or a document
     * with multiple fragments that represent what you are reading. If you pass
     * in a document with multiple fragments then you must also specify a
     * `fragmentName`.
     *
     * @param optimistic - Set to `true` to allow `readFragment` to return
     * optimistic results. Is `false` by default.
     */
    ApolloClient.prototype.readFragment = function (options, optimistic) {
        if (optimistic === void 0) { optimistic = false; }
        return this.cache.readFragment(options, optimistic);
    };
    /**
     * Writes some data in the shape of the provided GraphQL query directly to
     * the store. This method will start at the root query. To start at a
     * specific id returned by `dataIdFromObject` then use `writeFragment`.
     */
    ApolloClient.prototype.writeQuery = function (options) {
        var ref = this.cache.writeQuery(options);
        if (options.broadcast !== false) {
            this.queryManager.broadcastQueries();
        }
        return ref;
    };
    /**
     * Writes some data in the shape of the provided GraphQL fragment directly to
     * the store. This method will write to a GraphQL fragment from any arbitrary
     * id that is currently cached, unlike `writeQuery` which will only write
     * from the root query.
     *
     * You must pass in a GraphQL document with a single fragment or a document
     * with multiple fragments that represent what you are writing. If you pass
     * in a document with multiple fragments then you must also specify a
     * `fragmentName`.
     */
    ApolloClient.prototype.writeFragment = function (options) {
        var ref = this.cache.writeFragment(options);
        if (options.broadcast !== false) {
            this.queryManager.broadcastQueries();
        }
        return ref;
    };
    ApolloClient.prototype.__actionHookForDevTools = function (cb) {
        this.devToolsHookCb = cb;
    };
    ApolloClient.prototype.__requestRaw = function (payload) {
        return (0,_link_core_index_js__WEBPACK_IMPORTED_MODULE_8__.execute)(this.link, payload);
    };
    /**
     * Resets your entire store by clearing out your cache and then re-executing
     * all of your active queries. This makes it so that you may guarantee that
     * there is no data left in your store from a time before you called this
     * method.
     *
     * `resetStore()` is useful when your user just logged out. You’ve removed the
     * user session, and you now want to make sure that any references to data you
     * might have fetched while the user session was active is gone.
     *
     * It is important to remember that `resetStore()` *will* refetch any active
     * queries. This means that any components that might be mounted will execute
     * their queries again using your network interface. If you do not want to
     * re-execute any queries then you should make sure to stop watching any
     * active queries.
     */
    ApolloClient.prototype.resetStore = function () {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            return _this.queryManager.clearStore({
                discardWatches: false,
            });
        })
            .then(function () { return Promise.all(_this.resetStoreCallbacks.map(function (fn) { return fn(); })); })
            .then(function () { return _this.reFetchObservableQueries(); });
    };
    /**
     * Remove all data from the store. Unlike `resetStore`, `clearStore` will
     * not refetch any active queries.
     */
    ApolloClient.prototype.clearStore = function () {
        var _this = this;
        return Promise.resolve()
            .then(function () {
            return _this.queryManager.clearStore({
                discardWatches: true,
            });
        })
            .then(function () { return Promise.all(_this.clearStoreCallbacks.map(function (fn) { return fn(); })); });
    };
    /**
     * Allows callbacks to be registered that are executed when the store is
     * reset. `onResetStore` returns an unsubscribe function that can be used
     * to remove registered callbacks.
     */
    ApolloClient.prototype.onResetStore = function (cb) {
        var _this = this;
        this.resetStoreCallbacks.push(cb);
        return function () {
            _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function (c) { return c !== cb; });
        };
    };
    /**
     * Allows callbacks to be registered that are executed when the store is
     * cleared. `onClearStore` returns an unsubscribe function that can be used
     * to remove registered callbacks.
     */
    ApolloClient.prototype.onClearStore = function (cb) {
        var _this = this;
        this.clearStoreCallbacks.push(cb);
        return function () {
            _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function (c) { return c !== cb; });
        };
    };
    /**
     * Refetches all of your active queries.
     *
     * `reFetchObservableQueries()` is useful if you want to bring the client back to proper state in case of a network outage
     *
     * It is important to remember that `reFetchObservableQueries()` *will* refetch any active
     * queries. This means that any components that might be mounted will execute
     * their queries again using your network interface. If you do not want to
     * re-execute any queries then you should make sure to stop watching any
     * active queries.
     * Takes optional parameter `includeStandby` which will include queries in standby-mode when refetching.
     */
    ApolloClient.prototype.reFetchObservableQueries = function (includeStandby) {
        return this.queryManager.reFetchObservableQueries(includeStandby);
    };
    /**
     * Refetches specified active queries. Similar to "reFetchObservableQueries()" but with a specific list of queries.
     *
     * `refetchQueries()` is useful for use cases to imperatively refresh a selection of queries.
     *
     * It is important to remember that `refetchQueries()` *will* refetch specified active
     * queries. This means that any components that might be mounted will execute
     * their queries again using your network interface. If you do not want to
     * re-execute any queries then you should make sure to stop watching any
     * active queries.
     */
    ApolloClient.prototype.refetchQueries = function (options) {
        var map = this.queryManager.refetchQueries(options);
        var queries = [];
        var results = [];
        map.forEach(function (result, obsQuery) {
            queries.push(obsQuery);
            results.push(result);
        });
        var result = Promise.all(results);
        // In case you need the raw results immediately, without awaiting
        // Promise.all(results):
        result.queries = queries;
        result.results = results;
        // If you decide to ignore the result Promise because you're using
        // result.queries and result.results instead, you shouldn't have to worry
        // about preventing uncaught rejections for the Promise.all result.
        result.catch(function (error) {
            globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.debug(17, error);
        });
        return result;
    };
    /**
     * Get all currently active `ObservableQuery` objects, in a `Map` keyed by
     * query ID strings.
     *
     * An "active" query is one that has observers and a `fetchPolicy` other than
     * "standby" or "cache-only".
     *
     * You can include all `ObservableQuery` objects (including the inactive ones)
     * by passing "all" instead of "active", or you can include just a subset of
     * active queries by passing an array of query names or DocumentNode objects.
     */
    ApolloClient.prototype.getObservableQueries = function (include) {
        if (include === void 0) { include = "active"; }
        return this.queryManager.getObservableQueries(include);
    };
    /**
     * Exposes the cache's complete state, in a serializable format for later restoration.
     */
    ApolloClient.prototype.extract = function (optimistic) {
        return this.cache.extract(optimistic);
    };
    /**
     * Replaces existing state in the cache (if any) with the values expressed by
     * `serializedState`.
     *
     * Called when hydrating a cache (server side rendering, or offline storage),
     * and also (potentially) during hot reloads.
     */
    ApolloClient.prototype.restore = function (serializedState) {
        return this.cache.restore(serializedState);
    };
    /**
     * Add additional local resolvers.
     */
    ApolloClient.prototype.addResolvers = function (resolvers) {
        this.localState.addResolvers(resolvers);
    };
    /**
     * Set (override existing) local resolvers.
     */
    ApolloClient.prototype.setResolvers = function (resolvers) {
        this.localState.setResolvers(resolvers);
    };
    /**
     * Get all registered local resolvers.
     */
    ApolloClient.prototype.getResolvers = function () {
        return this.localState.getResolvers();
    };
    /**
     * Set a custom local state fragment matcher.
     */
    ApolloClient.prototype.setLocalStateFragmentMatcher = function (fragmentMatcher) {
        this.localState.setFragmentMatcher(fragmentMatcher);
    };
    /**
     * Define a new ApolloLink (or link chain) that Apollo Client will use.
     */
    ApolloClient.prototype.setLink = function (newLink) {
        this.link = this.queryManager.link = newLink;
    };
    Object.defineProperty(ApolloClient.prototype, "defaultContext", {
        get: function () {
            return this.queryManager.defaultContext;
        },
        enumerable: false,
        configurable: true
    });
    return ApolloClient;
}());

if (globalThis.__DEV__ !== false) {
    ApolloClient.prototype.getMemoryInternals = _utilities_caching_getMemoryInternals_js__WEBPACK_IMPORTED_MODULE_9__.getApolloClientMemoryInternals;
}
//# sourceMappingURL=ApolloClient.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/core/LocalState.js":
/*!********************************************************!*\
  !*** ./node_modules/@apollo/client/core/LocalState.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LocalState: () => (/* binding */ LocalState)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/visitor.mjs");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/predicates.mjs");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/mergeDeep.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/directives.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/transform.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/fragments.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _cache_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../cache/index.js */ "./node_modules/@apollo/client/cache/inmemory/reactiveVars.js");





var LocalState = /** @class */ (function () {
    function LocalState(_a) {
        var cache = _a.cache, client = _a.client, resolvers = _a.resolvers, fragmentMatcher = _a.fragmentMatcher;
        this.selectionsToResolveCache = new WeakMap();
        this.cache = cache;
        if (client) {
            this.client = client;
        }
        if (resolvers) {
            this.addResolvers(resolvers);
        }
        if (fragmentMatcher) {
            this.setFragmentMatcher(fragmentMatcher);
        }
    }
    LocalState.prototype.addResolvers = function (resolvers) {
        var _this = this;
        this.resolvers = this.resolvers || {};
        if (Array.isArray(resolvers)) {
            resolvers.forEach(function (resolverGroup) {
                _this.resolvers = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)(_this.resolvers, resolverGroup);
            });
        }
        else {
            this.resolvers = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeep)(this.resolvers, resolvers);
        }
    };
    LocalState.prototype.setResolvers = function (resolvers) {
        this.resolvers = {};
        this.addResolvers(resolvers);
    };
    LocalState.prototype.getResolvers = function () {
        return this.resolvers || {};
    };
    // Run local client resolvers against the incoming query and remote data.
    // Locally resolved field values are merged with the incoming remote data,
    // and returned. Note that locally resolved fields will overwrite
    // remote data using the same field name.
    LocalState.prototype.runResolvers = function (_a) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, arguments, void 0, function (_b) {
            var document = _b.document, remoteResult = _b.remoteResult, context = _b.context, variables = _b.variables, _c = _b.onlyRunForcedResolvers, onlyRunForcedResolvers = _c === void 0 ? false : _c;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_d) {
                if (document) {
                    return [2 /*return*/, this.resolveDocument(document, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function (localResult) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, remoteResult), { data: localResult.result })); })];
                }
                return [2 /*return*/, remoteResult];
            });
        });
    };
    LocalState.prototype.setFragmentMatcher = function (fragmentMatcher) {
        this.fragmentMatcher = fragmentMatcher;
    };
    LocalState.prototype.getFragmentMatcher = function () {
        return this.fragmentMatcher;
    };
    // Client queries contain everything in the incoming document (if a @client
    // directive is found).
    LocalState.prototype.clientQuery = function (document) {
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.hasDirectives)(["client"], document)) {
            if (this.resolvers) {
                return document;
            }
        }
        return null;
    };
    // Server queries are stripped of all @client based selection sets.
    LocalState.prototype.serverQuery = function (document) {
        return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.removeClientSetsFromDocument)(document);
    };
    LocalState.prototype.prepareContext = function (context) {
        var cache = this.cache;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, context), { cache: cache, 
            // Getting an entry's cache key is useful for local state resolvers.
            getCacheKey: function (obj) {
                return cache.identify(obj);
            } });
    };
    // To support `@client @export(as: "someVar")` syntax, we'll first resolve
    // @client @export fields locally, then pass the resolved values back to be
    // used alongside the original operation variables.
    LocalState.prototype.addExportedVariables = function (document_1) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, arguments, void 0, function (document, variables, context) {
            if (variables === void 0) { variables = {}; }
            if (context === void 0) { context = {}; }
            return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_a) {
                if (document) {
                    return [2 /*return*/, this.resolveDocument(document, this.buildRootValueFromCache(document, variables) || {}, this.prepareContext(context), variables).then(function (data) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, variables), data.exportedVariables)); })];
                }
                return [2 /*return*/, (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, variables)];
            });
        });
    };
    LocalState.prototype.shouldForceResolvers = function (document) {
        var forceResolvers = false;
        (0,graphql__WEBPACK_IMPORTED_MODULE_5__.visit)(document, {
            Directive: {
                enter: function (node) {
                    if (node.name.value === "client" && node.arguments) {
                        forceResolvers = node.arguments.some(function (arg) {
                            return arg.name.value === "always" &&
                                arg.value.kind === "BooleanValue" &&
                                arg.value.value === true;
                        });
                        if (forceResolvers) {
                            return graphql__WEBPACK_IMPORTED_MODULE_5__.BREAK;
                        }
                    }
                },
            },
        });
        return forceResolvers;
    };
    // Query the cache and return matching data.
    LocalState.prototype.buildRootValueFromCache = function (document, variables) {
        return this.cache.diff({
            query: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.buildQueryFromSelectionSet)(document),
            variables: variables,
            returnPartialData: true,
            optimistic: false,
        }).result;
    };
    LocalState.prototype.resolveDocument = function (document_1, rootValue_1) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, arguments, void 0, function (document, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
            var mainDefinition, fragments, fragmentMap, selectionsToResolve, definitionOperation, defaultOperationType, _a, cache, client, execContext, isClientFieldDescendant;
            if (context === void 0) { context = {}; }
            if (variables === void 0) { variables = {}; }
            if (fragmentMatcher === void 0) { fragmentMatcher = function () { return true; }; }
            if (onlyRunForcedResolvers === void 0) { onlyRunForcedResolvers = false; }
            return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_b) {
                mainDefinition = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_6__.getMainDefinition)(document);
                fragments = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_6__.getFragmentDefinitions)(document);
                fragmentMap = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.createFragmentMap)(fragments);
                selectionsToResolve = this.collectSelectionsToResolve(mainDefinition, fragmentMap);
                definitionOperation = mainDefinition.operation;
                defaultOperationType = definitionOperation ?
                    definitionOperation.charAt(0).toUpperCase() +
                        definitionOperation.slice(1)
                    : "Query";
                _a = this, cache = _a.cache, client = _a.client;
                execContext = {
                    fragmentMap: fragmentMap,
                    context: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, context), { cache: cache, client: client }),
                    variables: variables,
                    fragmentMatcher: fragmentMatcher,
                    defaultOperationType: defaultOperationType,
                    exportedVariables: {},
                    selectionsToResolve: selectionsToResolve,
                    onlyRunForcedResolvers: onlyRunForcedResolvers,
                };
                isClientFieldDescendant = false;
                return [2 /*return*/, this.resolveSelectionSet(mainDefinition.selectionSet, isClientFieldDescendant, rootValue, execContext).then(function (result) { return ({
                        result: result,
                        exportedVariables: execContext.exportedVariables,
                    }); })];
            });
        });
    };
    LocalState.prototype.resolveSelectionSet = function (selectionSet, isClientFieldDescendant, rootValue, execContext) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function () {
            var fragmentMap, context, variables, resultsToMerge, execute;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_a) {
                fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
                resultsToMerge = [rootValue];
                execute = function (selection) { return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(_this, void 0, void 0, function () {
                    var fragment, typeCondition;
                    return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_a) {
                        if (!isClientFieldDescendant &&
                            !execContext.selectionsToResolve.has(selection)) {
                            // Skip selections without @client directives
                            // (still processing if one of the ancestors or one of the child fields has @client directive)
                            return [2 /*return*/];
                        }
                        if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.shouldInclude)(selection, variables)) {
                            // Skip this entirely.
                            return [2 /*return*/];
                        }
                        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.isField)(selection)) {
                            return [2 /*return*/, this.resolveField(selection, isClientFieldDescendant, rootValue, execContext).then(function (fieldResult) {
                                    var _a;
                                    if (typeof fieldResult !== "undefined") {
                                        resultsToMerge.push((_a = {},
                                            _a[(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.resultKeyNameFromField)(selection)] = fieldResult,
                                            _a));
                                    }
                                })];
                        }
                        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.isInlineFragment)(selection)) {
                            fragment = selection;
                        }
                        else {
                            // This is a named fragment.
                            fragment = fragmentMap[selection.name.value];
                            (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(fragment, 18, selection.name.value);
                        }
                        if (fragment && fragment.typeCondition) {
                            typeCondition = fragment.typeCondition.name.value;
                            if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                                return [2 /*return*/, this.resolveSelectionSet(fragment.selectionSet, isClientFieldDescendant, rootValue, execContext).then(function (fragmentResult) {
                                        resultsToMerge.push(fragmentResult);
                                    })];
                            }
                        }
                        return [2 /*return*/];
                    });
                }); };
                return [2 /*return*/, Promise.all(selectionSet.selections.map(execute)).then(function () {
                        return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.mergeDeepArray)(resultsToMerge);
                    })];
            });
        });
    };
    LocalState.prototype.resolveField = function (field, isClientFieldDescendant, rootValue, execContext) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__awaiter)(this, void 0, void 0, function () {
            var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;
            var _this = this;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__generator)(this, function (_a) {
                if (!rootValue) {
                    return [2 /*return*/, null];
                }
                variables = execContext.variables;
                fieldName = field.name.value;
                aliasedFieldName = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.resultKeyNameFromField)(field);
                aliasUsed = fieldName !== aliasedFieldName;
                defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
                resultPromise = Promise.resolve(defaultResult);
                // Usually all local resolvers are run when passing through here, but
                // if we've specifically identified that we only want to run forced
                // resolvers (that is, resolvers for fields marked with
                // `@client(always: true)`), then we'll skip running non-forced resolvers.
                if (!execContext.onlyRunForcedResolvers ||
                    this.shouldForceResolvers(field)) {
                    resolverType = rootValue.__typename || execContext.defaultOperationType;
                    resolverMap = this.resolvers && this.resolvers[resolverType];
                    if (resolverMap) {
                        resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];
                        if (resolve) {
                            resultPromise = Promise.resolve(
                            // In case the resolve function accesses reactive variables,
                            // set cacheSlot to the current cache instance.
                            _cache_index_js__WEBPACK_IMPORTED_MODULE_9__.cacheSlot.withValue(this.cache, resolve, [
                                rootValue,
                                (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.argumentsObjectFromField)(field, variables),
                                execContext.context,
                                { field: field, fragmentMap: execContext.fragmentMap },
                            ]));
                        }
                    }
                }
                return [2 /*return*/, resultPromise.then(function (result) {
                        var _a, _b;
                        if (result === void 0) { result = defaultResult; }
                        // If an @export directive is associated with the current field, store
                        // the `as` export variable name and current result for later use.
                        if (field.directives) {
                            field.directives.forEach(function (directive) {
                                if (directive.name.value === "export" && directive.arguments) {
                                    directive.arguments.forEach(function (arg) {
                                        if (arg.name.value === "as" && arg.value.kind === "StringValue") {
                                            execContext.exportedVariables[arg.value.value] = result;
                                        }
                                    });
                                }
                            });
                        }
                        // Handle all scalar types here.
                        if (!field.selectionSet) {
                            return result;
                        }
                        // From here down, the field has a selection set, which means it's trying
                        // to query a GraphQLObjectType.
                        if (result == null) {
                            // Basically any field in a GraphQL response can be null, or missing
                            return result;
                        }
                        var isClientField = (_b = (_a = field.directives) === null || _a === void 0 ? void 0 : _a.some(function (d) { return d.name.value === "client"; })) !== null && _b !== void 0 ? _b : false;
                        if (Array.isArray(result)) {
                            return _this.resolveSubSelectedArray(field, isClientFieldDescendant || isClientField, result, execContext);
                        }
                        // Returned value is an object, and the query has a sub-selection. Recurse.
                        if (field.selectionSet) {
                            return _this.resolveSelectionSet(field.selectionSet, isClientFieldDescendant || isClientField, result, execContext);
                        }
                    })];
            });
        });
    };
    LocalState.prototype.resolveSubSelectedArray = function (field, isClientFieldDescendant, result, execContext) {
        var _this = this;
        return Promise.all(result.map(function (item) {
            if (item === null) {
                return null;
            }
            // This is a nested array, recurse.
            if (Array.isArray(item)) {
                return _this.resolveSubSelectedArray(field, isClientFieldDescendant, item, execContext);
            }
            // This is an object, run the selection set on it.
            if (field.selectionSet) {
                return _this.resolveSelectionSet(field.selectionSet, isClientFieldDescendant, item, execContext);
            }
        }));
    };
    // Collect selection nodes on paths from document root down to all @client directives.
    // This function takes into account transitive fragment spreads.
    // Complexity equals to a single `visit` over the full document.
    LocalState.prototype.collectSelectionsToResolve = function (mainDefinition, fragmentMap) {
        var isSingleASTNode = function (node) { return !Array.isArray(node); };
        var selectionsToResolveCache = this.selectionsToResolveCache;
        function collectByDefinition(definitionNode) {
            if (!selectionsToResolveCache.has(definitionNode)) {
                var matches_1 = new Set();
                selectionsToResolveCache.set(definitionNode, matches_1);
                (0,graphql__WEBPACK_IMPORTED_MODULE_5__.visit)(definitionNode, {
                    Directive: function (node, _, __, ___, ancestors) {
                        if (node.name.value === "client") {
                            ancestors.forEach(function (node) {
                                if (isSingleASTNode(node) && (0,graphql__WEBPACK_IMPORTED_MODULE_10__.isSelectionNode)(node)) {
                                    matches_1.add(node);
                                }
                            });
                        }
                    },
                    FragmentSpread: function (spread, _, __, ___, ancestors) {
                        var fragment = fragmentMap[spread.name.value];
                        (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(fragment, 19, spread.name.value);
                        var fragmentSelections = collectByDefinition(fragment);
                        if (fragmentSelections.size > 0) {
                            // Fragment for this spread contains @client directive (either directly or transitively)
                            // Collect selection nodes on paths from the root down to fields with the @client directive
                            ancestors.forEach(function (node) {
                                if (isSingleASTNode(node) && (0,graphql__WEBPACK_IMPORTED_MODULE_10__.isSelectionNode)(node)) {
                                    matches_1.add(node);
                                }
                            });
                            matches_1.add(spread);
                            fragmentSelections.forEach(function (selection) {
                                matches_1.add(selection);
                            });
                        }
                    },
                });
            }
            return selectionsToResolveCache.get(definitionNode);
        }
        return collectByDefinition(mainDefinition);
    };
    return LocalState;
}());

//# sourceMappingURL=LocalState.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/core/ObservableQuery.js":
/*!*************************************************************!*\
  !*** ./node_modules/@apollo/client/core/ObservableQuery.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ObservableQuery: () => (/* binding */ ObservableQuery),
/* harmony export */   logMissingFieldErrors: () => (/* binding */ logMissingFieldErrors),
/* harmony export */   reobserveCacheFirst: () => (/* binding */ reobserveCacheFirst)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/index.js");
/* harmony import */ var _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./networkStatus.js */ "./node_modules/@apollo/client/core/networkStatus.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/compact.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/cloneDeep.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/observables/iteration.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/zen-observable-ts/module.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/observables/subclassing.js");
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../errors/index.js */ "./node_modules/@apollo/client/errors/index.js");
/* harmony import */ var _equalByQuery_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./equalByQuery.js */ "./node_modules/@apollo/client/core/equalByQuery.js");







var assign = Object.assign, hasOwnProperty = Object.hasOwnProperty;
var ObservableQuery = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(ObservableQuery, _super);
    function ObservableQuery(_a) {
        var queryManager = _a.queryManager, queryInfo = _a.queryInfo, options = _a.options;
        var _this = _super.call(this, function (observer) {
            // Zen Observable has its own error function, so in order to log correctly
            // we need to provide a custom error callback.
            try {
                var subObserver = observer._subscription._observer;
                if (subObserver && !subObserver.error) {
                    subObserver.error = defaultSubscriptionObserverErrorCallback;
                }
            }
            catch (_a) { }
            var first = !_this.observers.size;
            _this.observers.add(observer);
            // Deliver most recent error or result.
            var last = _this.last;
            if (last && last.error) {
                observer.error && observer.error(last.error);
            }
            else if (last && last.result) {
                observer.next && observer.next(last.result);
            }
            // Initiate observation of this query if it hasn't been reported to
            // the QueryManager yet.
            if (first) {
                // Blindly catching here prevents unhandled promise rejections,
                // and is safe because the ObservableQuery handles this error with
                // this.observer.error, so we're not just swallowing the error by
                // ignoring it here.
                _this.reobserve().catch(function () { });
            }
            return function () {
                if (_this.observers.delete(observer) && !_this.observers.size) {
                    _this.tearDownQuery();
                }
            };
        }) || this;
        _this.observers = new Set();
        _this.subscriptions = new Set();
        // related classes
        _this.queryInfo = queryInfo;
        _this.queryManager = queryManager;
        // active state
        _this.waitForOwnResult = skipCacheDataFor(options.fetchPolicy);
        _this.isTornDown = false;
        _this.subscribeToMore = _this.subscribeToMore.bind(_this);
        var _b = queryManager.defaultOptions.watchQuery, _c = _b === void 0 ? {} : _b, _d = _c.fetchPolicy, defaultFetchPolicy = _d === void 0 ? "cache-first" : _d;
        var _e = options.fetchPolicy, fetchPolicy = _e === void 0 ? defaultFetchPolicy : _e, 
        // Make sure we don't store "standby" as the initialFetchPolicy.
        _f = options.initialFetchPolicy, 
        // Make sure we don't store "standby" as the initialFetchPolicy.
        initialFetchPolicy = _f === void 0 ? fetchPolicy === "standby" ? defaultFetchPolicy : (fetchPolicy) : _f;
        _this.options = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, options), { 
            // Remember the initial options.fetchPolicy so we can revert back to this
            // policy when variables change. This information can also be specified
            // (or overridden) by providing options.initialFetchPolicy explicitly.
            initialFetchPolicy: initialFetchPolicy, 
            // This ensures this.options.fetchPolicy always has a string value, in
            // case options.fetchPolicy was not provided.
            fetchPolicy: fetchPolicy });
        _this.queryId = queryInfo.queryId || queryManager.generateQueryId();
        var opDef = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.getOperationDefinition)(_this.query);
        _this.queryName = opDef && opDef.name && opDef.name.value;
        return _this;
    }
    Object.defineProperty(ObservableQuery.prototype, "query", {
        // The `query` computed property will always reflect the document transformed
        // by the last run query. `this.options.query` will always reflect the raw
        // untransformed query to ensure document transforms with runtime conditionals
        // are run on the original document.
        get: function () {
            return this.lastQuery || this.options.query;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ObservableQuery.prototype, "variables", {
        // Computed shorthand for this.options.variables, preserved for
        // backwards compatibility.
        /**
         * An object containing the variables that were provided for the query.
         */
        get: function () {
            return this.options.variables;
        },
        enumerable: false,
        configurable: true
    });
    ObservableQuery.prototype.result = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // TODO: this code doesn’t actually make sense insofar as the observer
            // will never exist in this.observers due how zen-observable wraps observables.
            // https://github.com/zenparsing/zen-observable/blob/master/src/Observable.js#L169
            var observer = {
                next: function (result) {
                    resolve(result);
                    // Stop the query within the QueryManager if we can before
                    // this function returns.
                    //
                    // We do this in order to prevent observers piling up within
                    // the QueryManager. Notice that we only fully unsubscribe
                    // from the subscription in a setTimeout(..., 0)  call. This call can
                    // actually be handled by the browser at a much later time. If queries
                    // are fired in the meantime, observers that should have been removed
                    // from the QueryManager will continue to fire, causing an unnecessary
                    // performance hit.
                    _this.observers.delete(observer);
                    if (!_this.observers.size) {
                        _this.queryManager.removeQuery(_this.queryId);
                    }
                    setTimeout(function () {
                        subscription.unsubscribe();
                    }, 0);
                },
                error: reject,
            };
            var subscription = _this.subscribe(observer);
        });
    };
    /** @internal */
    ObservableQuery.prototype.resetDiff = function () {
        this.queryInfo.resetDiff();
    };
    ObservableQuery.prototype.getCurrentResult = function (saveAsLastResult) {
        if (saveAsLastResult === void 0) { saveAsLastResult = true; }
        // Use the last result as long as the variables match this.variables.
        var lastResult = this.getLastResult(true);
        var networkStatus = this.queryInfo.networkStatus ||
            (lastResult && lastResult.networkStatus) ||
            _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.ready;
        var result = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, lastResult), { loading: (0,_networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.isNetworkRequestInFlight)(networkStatus), networkStatus: networkStatus });
        var _a = this.options.fetchPolicy, fetchPolicy = _a === void 0 ? "cache-first" : _a;
        if (
        // These fetch policies should never deliver data from the cache, unless
        // redelivering a previously delivered result.
        skipCacheDataFor(fetchPolicy) ||
            // If this.options.query has @client(always: true) fields, we cannot
            // trust diff.result, since it was read from the cache without running
            // local resolvers (and it's too late to run resolvers now, since we must
            // return a result synchronously).
            this.queryManager.getDocumentInfo(this.query).hasForcedResolvers) {
            // Fall through.
        }
        else if (this.waitForOwnResult) {
            // This would usually be a part of `QueryInfo.getDiff()`.
            // which we skip in the waitForOwnResult case since we are not
            // interested in the diff.
            this.queryInfo["updateWatch"]();
        }
        else {
            var diff = this.queryInfo.getDiff();
            if (diff.complete || this.options.returnPartialData) {
                result.data = diff.result;
            }
            if ((0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(result.data, {})) {
                result.data = void 0;
            }
            if (diff.complete) {
                // Similar to setting result.partial to false, but taking advantage of the
                // falsiness of missing fields.
                delete result.partial;
                // If the diff is complete, and we're using a FetchPolicy that
                // terminates after a complete cache read, we can assume the next result
                // we receive will have NetworkStatus.ready and !loading.
                if (diff.complete &&
                    result.networkStatus === _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.loading &&
                    (fetchPolicy === "cache-first" || fetchPolicy === "cache-only")) {
                    result.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.ready;
                    result.loading = false;
                }
            }
            else {
                result.partial = true;
            }
            if (globalThis.__DEV__ !== false &&
                !diff.complete &&
                !this.options.partialRefetch &&
                !result.loading &&
                !result.data &&
                !result.error) {
                logMissingFieldErrors(diff.missing);
            }
        }
        if (saveAsLastResult) {
            this.updateLastResult(result);
        }
        return result;
    };
    // Compares newResult to the snapshot we took of this.lastResult when it was
    // first received.
    ObservableQuery.prototype.isDifferentFromLastResult = function (newResult, variables) {
        if (!this.last) {
            return true;
        }
        var resultIsDifferent = this.queryManager.getDocumentInfo(this.query).hasNonreactiveDirective ?
            !(0,_equalByQuery_js__WEBPACK_IMPORTED_MODULE_5__.equalByQuery)(this.query, this.last.result, newResult, this.variables)
            : !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(this.last.result, newResult);
        return (resultIsDifferent || (variables && !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(this.last.variables, variables)));
    };
    ObservableQuery.prototype.getLast = function (key, variablesMustMatch) {
        var last = this.last;
        if (last &&
            last[key] &&
            (!variablesMustMatch || (0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(last.variables, this.variables))) {
            return last[key];
        }
    };
    ObservableQuery.prototype.getLastResult = function (variablesMustMatch) {
        return this.getLast("result", variablesMustMatch);
    };
    ObservableQuery.prototype.getLastError = function (variablesMustMatch) {
        return this.getLast("error", variablesMustMatch);
    };
    ObservableQuery.prototype.resetLastResults = function () {
        delete this.last;
        this.isTornDown = false;
    };
    ObservableQuery.prototype.resetQueryStoreErrors = function () {
        this.queryManager.resetErrors(this.queryId);
    };
    /**
     * Update the variables of this observable query, and fetch the new results.
     * This method should be preferred over `setVariables` in most use cases.
     *
     * @param variables - The new set of variables. If there are missing variables,
     * the previous values of those variables will be used.
     */
    ObservableQuery.prototype.refetch = function (variables) {
        var _a;
        var reobserveOptions = {
            // Always disable polling for refetches.
            pollInterval: 0,
        };
        // Unless the provided fetchPolicy always consults the network
        // (no-cache, network-only, or cache-and-network), override it with
        // network-only to force the refetch for this fetchQuery call.
        var fetchPolicy = this.options.fetchPolicy;
        if (fetchPolicy === "cache-and-network") {
            reobserveOptions.fetchPolicy = fetchPolicy;
        }
        else if (fetchPolicy === "no-cache") {
            reobserveOptions.fetchPolicy = "no-cache";
        }
        else {
            reobserveOptions.fetchPolicy = "network-only";
        }
        if (globalThis.__DEV__ !== false && variables && hasOwnProperty.call(variables, "variables")) {
            var queryDef = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.getQueryDefinition)(this.query);
            var vars = queryDef.variableDefinitions;
            if (!vars || !vars.some(function (v) { return v.variable.name.value === "variables"; })) {
                globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(
                    20,
                    variables,
                    ((_a = queryDef.name) === null || _a === void 0 ? void 0 : _a.value) || queryDef
                );
            }
        }
        if (variables && !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(this.options.variables, variables)) {
            // Update the existing options with new variables
            reobserveOptions.variables = this.options.variables = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.options.variables), variables);
        }
        this.queryInfo.resetLastWrite();
        return this.reobserve(reobserveOptions, _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.refetch);
    };
    /**
     * A function that helps you fetch the next set of results for a [paginated list field](https://www.apollographql.com/docs/react/pagination/core-api/).
     */
    ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
        var _this = this;
        var combinedOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, (fetchMoreOptions.query ? fetchMoreOptions : ((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.options), { query: this.options.query }), fetchMoreOptions), { variables: (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.options.variables), fetchMoreOptions.variables) })))), { 
            // The fetchMore request goes immediately to the network and does
            // not automatically write its result to the cache (hence no-cache
            // instead of network-only), because we allow the caller of
            // fetchMore to provide an updateQuery callback that determines how
            // the data gets written to the cache.
            fetchPolicy: "no-cache" });
        combinedOptions.query = this.transformDocument(combinedOptions.query);
        var qid = this.queryManager.generateQueryId();
        // If a temporary query is passed to `fetchMore`, we don't want to store
        // it as the last query result since it may be an optimized query for
        // pagination. We will however run the transforms on the original document
        // as well as the document passed in `fetchMoreOptions` to ensure the cache
        // uses the most up-to-date document which may rely on runtime conditionals.
        this.lastQuery =
            fetchMoreOptions.query ?
                this.transformDocument(this.options.query)
                : combinedOptions.query;
        // Simulate a loading result for the original query with
        // result.networkStatus === NetworkStatus.fetchMore.
        var queryInfo = this.queryInfo;
        var originalNetworkStatus = queryInfo.networkStatus;
        queryInfo.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.fetchMore;
        if (combinedOptions.notifyOnNetworkStatusChange) {
            this.observe();
        }
        var updatedQuerySet = new Set();
        var updateQuery = fetchMoreOptions === null || fetchMoreOptions === void 0 ? void 0 : fetchMoreOptions.updateQuery;
        var isCached = this.options.fetchPolicy !== "no-cache";
        if (!isCached) {
            (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(updateQuery, 21);
        }
        return this.queryManager
            .fetchQuery(qid, combinedOptions, _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.fetchMore)
            .then(function (fetchMoreResult) {
            _this.queryManager.removeQuery(qid);
            if (queryInfo.networkStatus === _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.fetchMore) {
                queryInfo.networkStatus = originalNetworkStatus;
            }
            if (isCached) {
                // Performing this cache update inside a cache.batch transaction ensures
                // any affected cache.watch watchers are notified at most once about any
                // updates. Most watchers will be using the QueryInfo class, which
                // responds to notifications by calling reobserveCacheFirst to deliver
                // fetchMore cache results back to this ObservableQuery.
                _this.queryManager.cache.batch({
                    update: function (cache) {
                        var updateQuery = fetchMoreOptions.updateQuery;
                        if (updateQuery) {
                            cache.updateQuery({
                                query: _this.query,
                                variables: _this.variables,
                                returnPartialData: true,
                                optimistic: false,
                            }, function (previous) {
                                return updateQuery(previous, {
                                    fetchMoreResult: fetchMoreResult.data,
                                    variables: combinedOptions.variables,
                                });
                            });
                        }
                        else {
                            // If we're using a field policy instead of updateQuery, the only
                            // thing we need to do is write the new data to the cache using
                            // combinedOptions.variables (instead of this.variables, which is
                            // what this.updateQuery uses, because it works by abusing the
                            // original field value, keyed by the original variables).
                            cache.writeQuery({
                                query: combinedOptions.query,
                                variables: combinedOptions.variables,
                                data: fetchMoreResult.data,
                            });
                        }
                    },
                    onWatchUpdated: function (watch) {
                        // Record the DocumentNode associated with any watched query whose
                        // data were updated by the cache writes above.
                        updatedQuerySet.add(watch.query);
                    },
                });
            }
            else {
                // There is a possibility `lastResult` may not be set when
                // `fetchMore` is called which would cause this to crash. This should
                // only happen if we haven't previously reported a result. We don't
                // quite know what the right behavior should be here since this block
                // of code runs after the fetch result has executed on the network.
                // We plan to let it crash in the meantime.
                //
                // If we get bug reports due to the `data` property access on
                // undefined, this should give us a real-world scenario that we can
                // use to test against and determine the right behavior. If we do end
                // up changing this behavior, this may require, for example, an
                // adjustment to the types on `updateQuery` since that function
                // expects that the first argument always contains previous result
                // data, but not `undefined`.
                var lastResult = _this.getLast("result");
                var data = updateQuery(lastResult.data, {
                    fetchMoreResult: fetchMoreResult.data,
                    variables: combinedOptions.variables,
                });
                _this.reportResult((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, lastResult), { data: data }), _this.variables);
            }
            return fetchMoreResult;
        })
            .finally(function () {
            // In case the cache writes above did not generate a broadcast
            // notification (which would have been intercepted by onWatchUpdated),
            // likely because the written data were the same as what was already in
            // the cache, we still want fetchMore to deliver its final loading:false
            // result with the unchanged data.
            if (isCached && !updatedQuerySet.has(_this.query)) {
                reobserveCacheFirst(_this);
            }
        });
    };
    // XXX the subscription variables are separate from the query variables.
    // if you want to update subscription variables, right now you have to do that separately,
    // and you can only do it by stopping the subscription and then subscribing again with new variables.
    /**
     * A function that enables you to execute a [subscription](https://www.apollographql.com/docs/react/data/subscriptions/), usually to subscribe to specific fields that were included in the query.
     *
     * This function returns _another_ function that you can call to terminate the subscription.
     */
    ObservableQuery.prototype.subscribeToMore = function (options) {
        var _this = this;
        var subscription = this.queryManager
            .startGraphQLSubscription({
            query: options.document,
            variables: options.variables,
            context: options.context,
        })
            .subscribe({
            next: function (subscriptionData) {
                var updateQuery = options.updateQuery;
                if (updateQuery) {
                    _this.updateQuery(function (previous, _a) {
                        var variables = _a.variables;
                        return updateQuery(previous, {
                            subscriptionData: subscriptionData,
                            variables: variables,
                        });
                    });
                }
            },
            error: function (err) {
                if (options.onError) {
                    options.onError(err);
                    return;
                }
                globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.error(22, err);
            },
        });
        this.subscriptions.add(subscription);
        return function () {
            if (_this.subscriptions.delete(subscription)) {
                subscription.unsubscribe();
            }
        };
    };
    ObservableQuery.prototype.setOptions = function (newOptions) {
        return this.reobserve(newOptions);
    };
    ObservableQuery.prototype.silentSetOptions = function (newOptions) {
        var mergedOptions = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_6__.compact)(this.options, newOptions || {});
        assign(this.options, mergedOptions);
    };
    /**
     * Update the variables of this observable query, and fetch the new results
     * if they've changed. Most users should prefer `refetch` instead of
     * `setVariables` in order to to be properly notified of results even when
     * they come from the cache.
     *
     * Note: the `next` callback will *not* fire if the variables have not changed
     * or if the result is coming from cache.
     *
     * Note: the promise will return the old results immediately if the variables
     * have not changed.
     *
     * Note: the promise will return null immediately if the query is not active
     * (there are no subscribers).
     *
     * @param variables - The new set of variables. If there are missing variables,
     * the previous values of those variables will be used.
     */
    ObservableQuery.prototype.setVariables = function (variables) {
        if ((0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(this.variables, variables)) {
            // If we have no observers, then we don't actually want to make a network
            // request. As soon as someone observes the query, the request will kick
            // off. For now, we just store any changes. (See #1077)
            return this.observers.size ? this.result() : Promise.resolve();
        }
        this.options.variables = variables;
        // See comment above
        if (!this.observers.size) {
            return Promise.resolve();
        }
        return this.reobserve({
            // Reset options.fetchPolicy to its original value.
            fetchPolicy: this.options.initialFetchPolicy,
            variables: variables,
        }, _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.setVariables);
    };
    /**
     * A function that enables you to update the query's cached result without executing a followup GraphQL operation.
     *
     * See [using updateQuery and updateFragment](https://www.apollographql.com/docs/react/caching/cache-interaction/#using-updatequery-and-updatefragment) for additional information.
     */
    ObservableQuery.prototype.updateQuery = function (mapFn) {
        var queryManager = this.queryManager;
        var result = queryManager.cache.diff({
            query: this.options.query,
            variables: this.variables,
            returnPartialData: true,
            optimistic: false,
        }).result;
        var newResult = mapFn(result, {
            variables: this.variables,
        });
        if (newResult) {
            queryManager.cache.writeQuery({
                query: this.options.query,
                data: newResult,
                variables: this.variables,
            });
            queryManager.broadcastQueries();
        }
    };
    /**
     * A function that instructs the query to begin re-executing at a specified interval (in milliseconds).
     */
    ObservableQuery.prototype.startPolling = function (pollInterval) {
        this.options.pollInterval = pollInterval;
        this.updatePolling();
    };
    /**
     * A function that instructs the query to stop polling after a previous call to `startPolling`.
     */
    ObservableQuery.prototype.stopPolling = function () {
        this.options.pollInterval = 0;
        this.updatePolling();
    };
    // Update options.fetchPolicy according to options.nextFetchPolicy.
    ObservableQuery.prototype.applyNextFetchPolicy = function (reason, 
    // It's possible to use this method to apply options.nextFetchPolicy to
    // options.fetchPolicy even if options !== this.options, though that happens
    // most often when the options are temporary, used for only one request and
    // then thrown away, so nextFetchPolicy may not end up mattering.
    options) {
        if (options.nextFetchPolicy) {
            var _a = options.fetchPolicy, fetchPolicy = _a === void 0 ? "cache-first" : _a, _b = options.initialFetchPolicy, initialFetchPolicy = _b === void 0 ? fetchPolicy : _b;
            if (fetchPolicy === "standby") {
                // Do nothing, leaving options.fetchPolicy unchanged.
            }
            else if (typeof options.nextFetchPolicy === "function") {
                // When someone chooses "cache-and-network" or "network-only" as their
                // initial FetchPolicy, they often do not want future cache updates to
                // trigger unconditional network requests, which is what repeatedly
                // applying the "cache-and-network" or "network-only" policies would
                // seem to imply. Instead, when the cache reports an update after the
                // initial network request, it may be desirable for subsequent network
                // requests to be triggered only if the cache result is incomplete. To
                // that end, the options.nextFetchPolicy option provides an easy way to
                // update options.fetchPolicy after the initial network request, without
                // having to call observableQuery.setOptions.
                options.fetchPolicy = options.nextFetchPolicy(fetchPolicy, {
                    reason: reason,
                    options: options,
                    observable: this,
                    initialFetchPolicy: initialFetchPolicy,
                });
            }
            else if (reason === "variables-changed") {
                options.fetchPolicy = initialFetchPolicy;
            }
            else {
                options.fetchPolicy = options.nextFetchPolicy;
            }
        }
        return options.fetchPolicy;
    };
    ObservableQuery.prototype.fetch = function (options, newNetworkStatus, query) {
        // TODO Make sure we update the networkStatus (and infer fetchVariables)
        // before actually committing to the fetch.
        this.queryManager.setObservableQuery(this);
        return this.queryManager["fetchConcastWithInfo"](this.queryId, options, newNetworkStatus, query);
    };
    // Turns polling on or off based on this.options.pollInterval.
    ObservableQuery.prototype.updatePolling = function () {
        var _this = this;
        // Avoid polling in SSR mode
        if (this.queryManager.ssrMode) {
            return;
        }
        var _a = this, pollingInfo = _a.pollingInfo, pollInterval = _a.options.pollInterval;
        if (!pollInterval || !this.hasObservers()) {
            if (pollingInfo) {
                clearTimeout(pollingInfo.timeout);
                delete this.pollingInfo;
            }
            return;
        }
        if (pollingInfo && pollingInfo.interval === pollInterval) {
            return;
        }
        (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(pollInterval, 23);
        var info = pollingInfo || (this.pollingInfo = {});
        info.interval = pollInterval;
        var maybeFetch = function () {
            var _a, _b;
            if (_this.pollingInfo) {
                if (!(0,_networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.isNetworkRequestInFlight)(_this.queryInfo.networkStatus) &&
                    !((_b = (_a = _this.options).skipPollAttempt) === null || _b === void 0 ? void 0 : _b.call(_a))) {
                    _this.reobserve({
                        // Most fetchPolicy options don't make sense to use in a polling context, as
                        // users wouldn't want to be polling the cache directly. However, network-only and
                        // no-cache are both useful for when the user wants to control whether or not the
                        // polled results are written to the cache.
                        fetchPolicy: _this.options.initialFetchPolicy === "no-cache" ?
                            "no-cache"
                            : "network-only",
                    }, _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.poll).then(poll, poll);
                }
                else {
                    poll();
                }
            }
        };
        var poll = function () {
            var info = _this.pollingInfo;
            if (info) {
                clearTimeout(info.timeout);
                info.timeout = setTimeout(maybeFetch, info.interval);
            }
        };
        poll();
    };
    ObservableQuery.prototype.updateLastResult = function (newResult, variables) {
        if (variables === void 0) { variables = this.variables; }
        var error = this.getLastError();
        // Preserve this.last.error unless the variables have changed.
        if (error && this.last && !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(variables, this.last.variables)) {
            error = void 0;
        }
        return (this.last = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({ result: this.queryManager.assumeImmutableResults ?
                newResult
                : (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.cloneDeep)(newResult), variables: variables }, (error ? { error: error } : null)));
    };
    ObservableQuery.prototype.reobserveAsConcast = function (newOptions, newNetworkStatus) {
        var _this = this;
        this.isTornDown = false;
        var useDisposableConcast = 
        // Refetching uses a disposable Concast to allow refetches using different
        // options/variables, without permanently altering the options of the
        // original ObservableQuery.
        newNetworkStatus === _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.refetch ||
            // The fetchMore method does not actually call the reobserve method, but,
            // if it did, it would definitely use a disposable Concast.
            newNetworkStatus === _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.fetchMore ||
            // Polling uses a disposable Concast so the polling options (which force
            // fetchPolicy to be "network-only" or "no-cache") won't override the original options.
            newNetworkStatus === _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.poll;
        // Save the old variables, since Object.assign may modify them below.
        var oldVariables = this.options.variables;
        var oldFetchPolicy = this.options.fetchPolicy;
        var mergedOptions = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_6__.compact)(this.options, newOptions || {});
        var options = useDisposableConcast ?
            // Disposable Concast fetches receive a shallow copy of this.options
            // (merged with newOptions), leaving this.options unmodified.
            mergedOptions
            : assign(this.options, mergedOptions);
        // Don't update options.query with the transformed query to avoid
        // overwriting this.options.query when we aren't using a disposable concast.
        // We want to ensure we can re-run the custom document transforms the next
        // time a request is made against the original query.
        var query = this.transformDocument(options.query);
        this.lastQuery = query;
        if (!useDisposableConcast) {
            // We can skip calling updatePolling if we're not changing this.options.
            this.updatePolling();
            // Reset options.fetchPolicy to its original value when variables change,
            // unless a new fetchPolicy was provided by newOptions.
            if (newOptions &&
                newOptions.variables &&
                !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(newOptions.variables, oldVariables) &&
                // Don't mess with the fetchPolicy if it's currently "standby".
                options.fetchPolicy !== "standby" &&
                // If we're changing the fetchPolicy anyway, don't try to change it here
                // using applyNextFetchPolicy. The explicit options.fetchPolicy wins.
                (options.fetchPolicy === oldFetchPolicy ||
                    // A `nextFetchPolicy` function has even higher priority, though,
                    // so in that case `applyNextFetchPolicy` must be called.
                    typeof options.nextFetchPolicy === "function")) {
                this.applyNextFetchPolicy("variables-changed", options);
                if (newNetworkStatus === void 0) {
                    newNetworkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.setVariables;
                }
            }
        }
        this.waitForOwnResult && (this.waitForOwnResult = skipCacheDataFor(options.fetchPolicy));
        var finishWaitingForOwnResult = function () {
            if (_this.concast === concast) {
                _this.waitForOwnResult = false;
            }
        };
        var variables = options.variables && (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, options.variables);
        var _a = this.fetch(options, newNetworkStatus, query), concast = _a.concast, fromLink = _a.fromLink;
        var observer = {
            next: function (result) {
                if ((0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(_this.variables, variables)) {
                    finishWaitingForOwnResult();
                    _this.reportResult(result, variables);
                }
            },
            error: function (error) {
                if ((0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(_this.variables, variables)) {
                    // Coming from `getResultsFromLink`, `error` here should always be an `ApolloError`.
                    // However, calling `concast.cancel` can inject another type of error, so we have to
                    // wrap it again here.
                    if (!(0,_errors_index_js__WEBPACK_IMPORTED_MODULE_8__.isApolloError)(error)) {
                        error = new _errors_index_js__WEBPACK_IMPORTED_MODULE_8__.ApolloError({ networkError: error });
                    }
                    finishWaitingForOwnResult();
                    _this.reportError(error, variables);
                }
            },
        };
        if (!useDisposableConcast && (fromLink || !this.concast)) {
            // We use the {add,remove}Observer methods directly to avoid wrapping
            // observer with an unnecessary SubscriptionObserver object.
            if (this.concast && this.observer) {
                this.concast.removeObserver(this.observer);
            }
            this.concast = concast;
            this.observer = observer;
        }
        concast.addObserver(observer);
        return concast;
    };
    ObservableQuery.prototype.reobserve = function (newOptions, newNetworkStatus) {
        return this.reobserveAsConcast(newOptions, newNetworkStatus)
            .promise;
    };
    ObservableQuery.prototype.resubscribeAfterError = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // If `lastError` is set in the current when the subscription is re-created,
        // the subscription will immediately receive the error, which will
        // cause it to terminate again. To avoid this, we first clear
        // the last error/result from the `observableQuery` before re-starting
        // the subscription, and restore the last value afterwards so that the
        // subscription has a chance to stay open.
        var last = this.last;
        this.resetLastResults();
        var subscription = this.subscribe.apply(this, args);
        this.last = last;
        return subscription;
    };
    // (Re)deliver the current result to this.observers without applying fetch
    // policies or making network requests.
    ObservableQuery.prototype.observe = function () {
        this.reportResult(
        // Passing false is important so that this.getCurrentResult doesn't
        // save the fetchMore result as this.lastResult, causing it to be
        // ignored due to the this.isDifferentFromLastResult check in
        // this.reportResult.
        this.getCurrentResult(false), this.variables);
    };
    ObservableQuery.prototype.reportResult = function (result, variables) {
        var lastError = this.getLastError();
        var isDifferent = this.isDifferentFromLastResult(result, variables);
        // Update the last result even when isDifferentFromLastResult returns false,
        // because the query may be using the @nonreactive directive, and we want to
        // save the the latest version of any nonreactive subtrees (in case
        // getCurrentResult is called), even though we skip broadcasting changes.
        if (lastError || !result.partial || this.options.returnPartialData) {
            this.updateLastResult(result, variables);
        }
        if (lastError || isDifferent) {
            (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.iterateObserversSafely)(this.observers, "next", result);
        }
    };
    ObservableQuery.prototype.reportError = function (error, variables) {
        // Since we don't get the current result on errors, only the error, we
        // must mirror the updates that occur in QueryStore.markQueryError here
        var errorResult = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.getLastResult()), { error: error, errors: error.graphQLErrors, networkStatus: _networkStatus_js__WEBPACK_IMPORTED_MODULE_4__.NetworkStatus.error, loading: false });
        this.updateLastResult(errorResult, variables);
        (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_9__.iterateObserversSafely)(this.observers, "error", (this.last.error = error));
    };
    ObservableQuery.prototype.hasObservers = function () {
        return this.observers.size > 0;
    };
    ObservableQuery.prototype.tearDownQuery = function () {
        if (this.isTornDown)
            return;
        if (this.concast && this.observer) {
            this.concast.removeObserver(this.observer);
            delete this.concast;
            delete this.observer;
        }
        this.stopPolling();
        // stop all active GraphQL subscriptions
        this.subscriptions.forEach(function (sub) { return sub.unsubscribe(); });
        this.subscriptions.clear();
        this.queryManager.stopQuery(this.queryId);
        this.observers.clear();
        this.isTornDown = true;
    };
    ObservableQuery.prototype.transformDocument = function (document) {
        return this.queryManager.transform(document);
    };
    return ObservableQuery;
}(_utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.Observable));

// Necessary because the ObservableQuery constructor has a different
// signature than the Observable constructor.
(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_11__.fixObservableSubclass)(ObservableQuery);
// Reobserve with fetchPolicy effectively set to "cache-first", triggering
// delivery of any new data from the cache, possibly falling back to the network
// if any cache data are missing. This allows _complete_ cache results to be
// delivered without also kicking off unnecessary network requests when
// this.options.fetchPolicy is "cache-and-network" or "network-only". When
// this.options.fetchPolicy is any other policy ("cache-first", "cache-only",
// "standby", or "no-cache"), we call this.reobserve() as usual.
function reobserveCacheFirst(obsQuery) {
    var _a = obsQuery.options, fetchPolicy = _a.fetchPolicy, nextFetchPolicy = _a.nextFetchPolicy;
    if (fetchPolicy === "cache-and-network" || fetchPolicy === "network-only") {
        return obsQuery.reobserve({
            fetchPolicy: "cache-first",
            // Use a temporary nextFetchPolicy function that replaces itself with the
            // previous nextFetchPolicy value and returns the original fetchPolicy.
            nextFetchPolicy: function (currentFetchPolicy, context) {
                // Replace this nextFetchPolicy function in the options object with the
                // original this.options.nextFetchPolicy value.
                this.nextFetchPolicy = nextFetchPolicy;
                // If the original nextFetchPolicy value was a function, give it a
                // chance to decide what happens here.
                if (typeof this.nextFetchPolicy === "function") {
                    return this.nextFetchPolicy(currentFetchPolicy, context);
                }
                // Otherwise go back to the original this.options.fetchPolicy.
                return fetchPolicy;
            },
        });
    }
    return obsQuery.reobserve();
}
function defaultSubscriptionObserverErrorCallback(error) {
    globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.error(24, error.message, error.stack);
}
function logMissingFieldErrors(missing) {
    if (globalThis.__DEV__ !== false && missing) {
        globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.debug(25, missing);
    }
}
function skipCacheDataFor(fetchPolicy /* `undefined` would mean `"cache-first"` */) {
    return (fetchPolicy === "network-only" ||
        fetchPolicy === "no-cache" ||
        fetchPolicy === "standby");
}
//# sourceMappingURL=ObservableQuery.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/core/QueryInfo.js":
/*!*******************************************************!*\
  !*** ./node_modules/@apollo/client/core/QueryInfo.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryInfo: () => (/* binding */ QueryInfo),
/* harmony export */   shouldWriteResult: () => (/* binding */ shouldWriteResult)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/mergeDeep.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/incrementalResult.js");
/* harmony import */ var _ObservableQuery_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ObservableQuery.js */ "./node_modules/@apollo/client/core/ObservableQuery.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/errorHandling.js");
/* harmony import */ var _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./networkStatus.js */ "./node_modules/@apollo/client/core/networkStatus.js");







var destructiveMethodCounts = new (_utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.canUseWeakMap ? WeakMap : Map)();
function wrapDestructiveCacheMethod(cache, methodName) {
    var original = cache[methodName];
    if (typeof original === "function") {
        // @ts-expect-error this is just too generic to be typed correctly
        cache[methodName] = function () {
            destructiveMethodCounts.set(cache, 
            // The %1e15 allows the count to wrap around to 0 safely every
            // quadrillion evictions, so there's no risk of overflow. To be
            // clear, this is more of a pedantic principle than something
            // that matters in any conceivable practical scenario.
            (destructiveMethodCounts.get(cache) + 1) % 1e15);
            // @ts-expect-error this is just too generic to be typed correctly
            return original.apply(this, arguments);
        };
    }
}
function cancelNotifyTimeout(info) {
    if (info["notifyTimeout"]) {
        clearTimeout(info["notifyTimeout"]);
        info["notifyTimeout"] = void 0;
    }
}
// A QueryInfo object represents a single query managed by the
// QueryManager, which tracks all QueryInfo objects by queryId in its
// this.queries Map. QueryInfo objects store the latest results and errors
// for the given query, and are responsible for reporting those results to
// the corresponding ObservableQuery, via the QueryInfo.notify method.
// Results are reported asynchronously whenever setDiff marks the
// QueryInfo object as dirty, though a call to the QueryManager's
// broadcastQueries method may trigger the notification before it happens
// automatically. This class used to be a simple interface type without
// any field privacy or meaningful methods, which is why it still has so
// many public fields. The effort to lock down and simplify the QueryInfo
// interface is ongoing, and further improvements are welcome.
var QueryInfo = /** @class */ (function () {
    function QueryInfo(queryManager, queryId) {
        if (queryId === void 0) { queryId = queryManager.generateQueryId(); }
        this.queryId = queryId;
        this.listeners = new Set();
        this.document = null;
        this.lastRequestId = 1;
        this.stopped = false;
        this.dirty = false;
        this.observableQuery = null;
        var cache = (this.cache = queryManager.cache);
        // Track how often cache.evict is called, since we want eviction to
        // override the feud-stopping logic in the markResult method, by
        // causing shouldWrite to return true. Wrapping the cache.evict method
        // is a bit of a hack, but it saves us from having to make eviction
        // counting an official part of the ApolloCache API.
        if (!destructiveMethodCounts.has(cache)) {
            destructiveMethodCounts.set(cache, 0);
            wrapDestructiveCacheMethod(cache, "evict");
            wrapDestructiveCacheMethod(cache, "modify");
            wrapDestructiveCacheMethod(cache, "reset");
        }
    }
    QueryInfo.prototype.init = function (query) {
        var networkStatus = query.networkStatus || _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.loading;
        if (this.variables &&
            this.networkStatus !== _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.loading &&
            !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(this.variables, query.variables)) {
            networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.setVariables;
        }
        if (!(0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(query.variables, this.variables)) {
            this.lastDiff = void 0;
        }
        Object.assign(this, {
            document: query.document,
            variables: query.variables,
            networkError: null,
            graphQLErrors: this.graphQLErrors || [],
            networkStatus: networkStatus,
        });
        if (query.observableQuery) {
            this.setObservableQuery(query.observableQuery);
        }
        if (query.lastRequestId) {
            this.lastRequestId = query.lastRequestId;
        }
        return this;
    };
    QueryInfo.prototype.reset = function () {
        cancelNotifyTimeout(this);
        this.dirty = false;
    };
    QueryInfo.prototype.resetDiff = function () {
        this.lastDiff = void 0;
    };
    QueryInfo.prototype.getDiff = function () {
        var options = this.getDiffOptions();
        if (this.lastDiff && (0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(options, this.lastDiff.options)) {
            return this.lastDiff.diff;
        }
        this.updateWatch(this.variables);
        var oq = this.observableQuery;
        if (oq && oq.options.fetchPolicy === "no-cache") {
            return { complete: false };
        }
        var diff = this.cache.diff(options);
        this.updateLastDiff(diff, options);
        return diff;
    };
    QueryInfo.prototype.updateLastDiff = function (diff, options) {
        this.lastDiff =
            diff ?
                {
                    diff: diff,
                    options: options || this.getDiffOptions(),
                }
                : void 0;
    };
    QueryInfo.prototype.getDiffOptions = function (variables) {
        var _a;
        if (variables === void 0) { variables = this.variables; }
        return {
            query: this.document,
            variables: variables,
            returnPartialData: true,
            optimistic: true,
            canonizeResults: (_a = this.observableQuery) === null || _a === void 0 ? void 0 : _a.options.canonizeResults,
        };
    };
    QueryInfo.prototype.setDiff = function (diff) {
        var _this = this;
        var _a;
        var oldDiff = this.lastDiff && this.lastDiff.diff;
        // If we are trying to deliver an incomplete cache result, we avoid
        // reporting it if the query has errored, otherwise we let the broadcast try
        // and repair the partial result by refetching the query. This check avoids
        // a situation where a query that errors and another succeeds with
        // overlapping data does not report the partial data result to the errored
        // query.
        //
        // See https://github.com/apollographql/apollo-client/issues/11400 for more
        // information on this issue.
        if (diff && !diff.complete && ((_a = this.observableQuery) === null || _a === void 0 ? void 0 : _a.getLastError())) {
            return;
        }
        this.updateLastDiff(diff);
        if (!this.dirty && !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(oldDiff && oldDiff.result, diff && diff.result)) {
            this.dirty = true;
            if (!this.notifyTimeout) {
                this.notifyTimeout = setTimeout(function () { return _this.notify(); }, 0);
            }
        }
    };
    QueryInfo.prototype.setObservableQuery = function (oq) {
        var _this = this;
        if (oq === this.observableQuery)
            return;
        if (this.oqListener) {
            this.listeners.delete(this.oqListener);
        }
        this.observableQuery = oq;
        if (oq) {
            oq["queryInfo"] = this;
            this.listeners.add((this.oqListener = function () {
                var diff = _this.getDiff();
                if (diff.fromOptimisticTransaction) {
                    // If this diff came from an optimistic transaction, deliver the
                    // current cache data to the ObservableQuery, but don't perform a
                    // reobservation, since oq.reobserveCacheFirst might make a network
                    // request, and we never want to trigger network requests in the
                    // middle of optimistic updates.
                    oq["observe"]();
                }
                else {
                    // Otherwise, make the ObservableQuery "reobserve" the latest data
                    // using a temporary fetch policy of "cache-first", so complete cache
                    // results have a chance to be delivered without triggering additional
                    // network requests, even when options.fetchPolicy is "network-only"
                    // or "cache-and-network". All other fetch policies are preserved by
                    // this method, and are handled by calling oq.reobserve(). If this
                    // reobservation is spurious, isDifferentFromLastResult still has a
                    // chance to catch it before delivery to ObservableQuery subscribers.
                    (0,_ObservableQuery_js__WEBPACK_IMPORTED_MODULE_3__.reobserveCacheFirst)(oq);
                }
            }));
        }
        else {
            delete this.oqListener;
        }
    };
    QueryInfo.prototype.notify = function () {
        var _this = this;
        cancelNotifyTimeout(this);
        if (this.shouldNotify()) {
            this.listeners.forEach(function (listener) { return listener(_this); });
        }
        this.dirty = false;
    };
    QueryInfo.prototype.shouldNotify = function () {
        if (!this.dirty || !this.listeners.size) {
            return false;
        }
        if ((0,_networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.isNetworkRequestInFlight)(this.networkStatus) && this.observableQuery) {
            var fetchPolicy = this.observableQuery.options.fetchPolicy;
            if (fetchPolicy !== "cache-only" && fetchPolicy !== "cache-and-network") {
                return false;
            }
        }
        return true;
    };
    QueryInfo.prototype.stop = function () {
        if (!this.stopped) {
            this.stopped = true;
            // Cancel the pending notify timeout
            this.reset();
            this.cancel();
            // Revert back to the no-op version of cancel inherited from
            // QueryInfo.prototype.
            this.cancel = QueryInfo.prototype.cancel;
            var oq = this.observableQuery;
            if (oq)
                oq.stopPolling();
        }
    };
    // This method is a no-op by default, until/unless overridden by the
    // updateWatch method.
    QueryInfo.prototype.cancel = function () { };
    QueryInfo.prototype.updateWatch = function (variables) {
        var _this = this;
        if (variables === void 0) { variables = this.variables; }
        var oq = this.observableQuery;
        if (oq && oq.options.fetchPolicy === "no-cache") {
            return;
        }
        var watchOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_4__.__assign)({}, this.getDiffOptions(variables)), { watcher: this, callback: function (diff) { return _this.setDiff(diff); } });
        if (!this.lastWatch || !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(watchOptions, this.lastWatch)) {
            this.cancel();
            this.cancel = this.cache.watch((this.lastWatch = watchOptions));
        }
    };
    QueryInfo.prototype.resetLastWrite = function () {
        this.lastWrite = void 0;
    };
    QueryInfo.prototype.shouldWrite = function (result, variables) {
        var lastWrite = this.lastWrite;
        return !(lastWrite &&
            // If cache.evict has been called since the last time we wrote this
            // data into the cache, there's a chance writing this result into
            // the cache will repair what was evicted.
            lastWrite.dmCount === destructiveMethodCounts.get(this.cache) &&
            (0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(variables, lastWrite.variables) &&
            (0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(result.data, lastWrite.result.data));
    };
    QueryInfo.prototype.markResult = function (result, document, options, cacheWriteBehavior) {
        var _this = this;
        var merger = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.DeepMerger();
        var graphQLErrors = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_6__.isNonEmptyArray)(result.errors) ? result.errors.slice(0) : [];
        // Cancel the pending notify timeout (if it exists) to prevent extraneous network
        // requests. To allow future notify timeouts, diff and dirty are reset as well.
        this.reset();
        if ("incremental" in result && (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_6__.isNonEmptyArray)(result.incremental)) {
            var mergedData = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.mergeIncrementalData)(this.getDiff().result, result);
            result.data = mergedData;
            // Detect the first chunk of a deferred query and merge it with existing
            // cache data. This ensures a `cache-first` fetch policy that returns
            // partial cache data or a `cache-and-network` fetch policy that already
            // has full data in the cache does not complain when trying to merge the
            // initial deferred server data with existing cache data.
        }
        else if ("hasNext" in result && result.hasNext) {
            var diff = this.getDiff();
            result.data = merger.merge(diff.result, result.data);
        }
        this.graphQLErrors = graphQLErrors;
        if (options.fetchPolicy === "no-cache") {
            this.updateLastDiff({ result: result.data, complete: true }, this.getDiffOptions(options.variables));
        }
        else if (cacheWriteBehavior !== 0 /* CacheWriteBehavior.FORBID */) {
            if (shouldWriteResult(result, options.errorPolicy)) {
                // Using a transaction here so we have a chance to read the result
                // back from the cache before the watch callback fires as a result
                // of writeQuery, so we can store the new diff quietly and ignore
                // it when we receive it redundantly from the watch callback.
                this.cache.performTransaction(function (cache) {
                    if (_this.shouldWrite(result, options.variables)) {
                        cache.writeQuery({
                            query: document,
                            data: result.data,
                            variables: options.variables,
                            overwrite: cacheWriteBehavior === 1 /* CacheWriteBehavior.OVERWRITE */,
                        });
                        _this.lastWrite = {
                            result: result,
                            variables: options.variables,
                            dmCount: destructiveMethodCounts.get(_this.cache),
                        };
                    }
                    else {
                        // If result is the same as the last result we received from
                        // the network (and the variables match too), avoid writing
                        // result into the cache again. The wisdom of skipping this
                        // cache write is far from obvious, since any cache write
                        // could be the one that puts the cache back into a desired
                        // state, fixing corruption or missing data. However, if we
                        // always write every network result into the cache, we enable
                        // feuds between queries competing to update the same data in
                        // incompatible ways, which can lead to an endless cycle of
                        // cache broadcasts and useless network requests. As with any
                        // feud, eventually one side must step back from the brink,
                        // letting the other side(s) have the last word(s). There may
                        // be other points where we could break this cycle, such as
                        // silencing the broadcast for cache.writeQuery (not a good
                        // idea, since it just delays the feud a bit) or somehow
                        // avoiding the network request that just happened (also bad,
                        // because the server could return useful new data). All
                        // options considered, skipping this cache write seems to be
                        // the least damaging place to break the cycle, because it
                        // reflects the intuition that we recently wrote this exact
                        // result into the cache, so the cache *should* already/still
                        // contain this data. If some other query has clobbered that
                        // data in the meantime, that's too bad, but there will be no
                        // winners if every query blindly reverts to its own version
                        // of the data. This approach also gives the network a chance
                        // to return new data, which will be written into the cache as
                        // usual, notifying only those queries that are directly
                        // affected by the cache updates, as usual. In the future, an
                        // even more sophisticated cache could perhaps prevent or
                        // mitigate the clobbering somehow, but that would make this
                        // particular cache write even less important, and thus
                        // skipping it would be even safer than it is today.
                        if (_this.lastDiff && _this.lastDiff.diff.complete) {
                            // Reuse data from the last good (complete) diff that we
                            // received, when possible.
                            result.data = _this.lastDiff.diff.result;
                            return;
                        }
                        // If the previous this.diff was incomplete, fall through to
                        // re-reading the latest data with cache.diff, below.
                    }
                    var diffOptions = _this.getDiffOptions(options.variables);
                    var diff = cache.diff(diffOptions);
                    // In case the QueryManager stops this QueryInfo before its
                    // results are delivered, it's important to avoid restarting the
                    // cache watch when markResult is called. We also avoid updating
                    // the watch if we are writing a result that doesn't match the current
                    // variables to avoid race conditions from broadcasting the wrong
                    // result.
                    if (!_this.stopped && (0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__.equal)(_this.variables, options.variables)) {
                        // Any time we're about to update this.diff, we need to make
                        // sure we've started watching the cache.
                        _this.updateWatch(options.variables);
                    }
                    // If we're allowed to write to the cache, and we can read a
                    // complete result from the cache, update result.data to be the
                    // result from the cache, rather than the raw network result.
                    // Set without setDiff to avoid triggering a notify call, since
                    // we have other ways of notifying for this result.
                    _this.updateLastDiff(diff, diffOptions);
                    if (diff.complete) {
                        result.data = diff.result;
                    }
                });
            }
            else {
                this.lastWrite = void 0;
            }
        }
    };
    QueryInfo.prototype.markReady = function () {
        this.networkError = null;
        return (this.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.ready);
    };
    QueryInfo.prototype.markError = function (error) {
        this.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_2__.NetworkStatus.error;
        this.lastWrite = void 0;
        this.reset();
        if (error.graphQLErrors) {
            this.graphQLErrors = error.graphQLErrors;
        }
        if (error.networkError) {
            this.networkError = error.networkError;
        }
        return error;
    };
    return QueryInfo;
}());

function shouldWriteResult(result, errorPolicy) {
    if (errorPolicy === void 0) { errorPolicy = "none"; }
    var ignoreErrors = errorPolicy === "ignore" || errorPolicy === "all";
    var writeWithErrors = !(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.graphQLResultHasError)(result);
    if (!writeWithErrors && ignoreErrors && result.data) {
        writeWithErrors = true;
    }
    return writeWithErrors;
}
//# sourceMappingURL=QueryInfo.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/core/QueryManager.js":
/*!**********************************************************!*\
  !*** ./node_modules/@apollo/client/core/QueryManager.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryManager: () => (/* binding */ QueryManager)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/index.js");
/* harmony import */ var _link_core_index_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../link/core/index.js */ "./node_modules/@apollo/client/link/core/execute.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utilities/common/incrementalResult.js */ "./node_modules/@apollo/client/utilities/common/incrementalResult.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/directives.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/transform.js");
/* harmony import */ var _cache_index_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../cache/index.js */ "./node_modules/@apollo/client/utilities/common/canonicalStringify.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/DocumentTransform.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/observables/asyncMap.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/errorHandling.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/objects.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/makeUniqueId.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/zen-observable-ts/module.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/observables/Concast.js");
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../errors/index.js */ "./node_modules/@apollo/client/errors/index.js");
/* harmony import */ var _ObservableQuery_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ObservableQuery.js */ "./node_modules/@apollo/client/core/ObservableQuery.js");
/* harmony import */ var _networkStatus_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./networkStatus.js */ "./node_modules/@apollo/client/core/networkStatus.js");
/* harmony import */ var _QueryInfo_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./QueryInfo.js */ "./node_modules/@apollo/client/core/QueryInfo.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/print.js");
/* harmony import */ var _wry_trie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wry/trie */ "./node_modules/@wry/trie/lib/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/caching/caches.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/caching/sizes.js");














var hasOwnProperty = Object.prototype.hasOwnProperty;
var IGNORE = Object.create(null);


var QueryManager = /** @class */ (function () {
    function QueryManager(options) {
        var _this = this;
        this.clientAwareness = {};
        // All the queries that the QueryManager is currently managing (not
        // including mutations and subscriptions).
        this.queries = new Map();
        // Maps from queryId strings to Promise rejection functions for
        // currently active queries and fetches.
        // Use protected instead of private field so
        // @apollo/experimental-nextjs-app-support can access type info.
        this.fetchCancelFns = new Map();
        this.transformCache = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.AutoCleanedWeakCache(_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.cacheSizes["queryManager.getDocumentInfo"] ||
            2000 /* defaultCacheSizes["queryManager.getDocumentInfo"] */);
        this.queryIdCounter = 1;
        this.requestIdCounter = 1;
        this.mutationIdCounter = 1;
        // Use protected instead of private field so
        // @apollo/experimental-nextjs-app-support can access type info.
        this.inFlightLinkObservables = new _wry_trie__WEBPACK_IMPORTED_MODULE_2__.Trie(false);
        var defaultDocumentTransform = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.DocumentTransform(function (document) { return _this.cache.transformDocument(document); }, 
        // Allow the apollo cache to manage its own transform caches
        { cache: false });
        this.cache = options.cache;
        this.link = options.link;
        this.defaultOptions = options.defaultOptions;
        this.queryDeduplication = options.queryDeduplication;
        this.clientAwareness = options.clientAwareness;
        this.localState = options.localState;
        this.ssrMode = options.ssrMode;
        this.assumeImmutableResults = options.assumeImmutableResults;
        var documentTransform = options.documentTransform;
        this.documentTransform =
            documentTransform ?
                defaultDocumentTransform
                    .concat(documentTransform)
                    // The custom document transform may add new fragment spreads or new
                    // field selections, so we want to give the cache a chance to run
                    // again. For example, the InMemoryCache adds __typename to field
                    // selections and fragments from the fragment registry.
                    .concat(defaultDocumentTransform)
                : defaultDocumentTransform;
        this.defaultContext = options.defaultContext || Object.create(null);
        if ((this.onBroadcast = options.onBroadcast)) {
            this.mutationStore = Object.create(null);
        }
    }
    /**
     * Call this method to terminate any active query processes, making it safe
     * to dispose of this QueryManager instance.
     */
    QueryManager.prototype.stop = function () {
        var _this = this;
        this.queries.forEach(function (_info, queryId) {
            _this.stopQueryNoBroadcast(queryId);
        });
        this.cancelPendingFetches((0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(26));
    };
    QueryManager.prototype.cancelPendingFetches = function (error) {
        this.fetchCancelFns.forEach(function (cancel) { return cancel(error); });
        this.fetchCancelFns.clear();
    };
    QueryManager.prototype.mutate = function (_a) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__awaiter)(this, arguments, void 0, function (_b) {
            var mutationId, hasClientExports, mutationStoreValue, isOptimistic, self;
            var _c, _d;
            var mutation = _b.mutation, variables = _b.variables, optimisticResponse = _b.optimisticResponse, updateQueries = _b.updateQueries, _e = _b.refetchQueries, refetchQueries = _e === void 0 ? [] : _e, _f = _b.awaitRefetchQueries, awaitRefetchQueries = _f === void 0 ? false : _f, updateWithProxyFn = _b.update, onQueryUpdated = _b.onQueryUpdated, _g = _b.fetchPolicy, fetchPolicy = _g === void 0 ? ((_c = this.defaultOptions.mutate) === null || _c === void 0 ? void 0 : _c.fetchPolicy) || "network-only" : _g, _h = _b.errorPolicy, errorPolicy = _h === void 0 ? ((_d = this.defaultOptions.mutate) === null || _d === void 0 ? void 0 : _d.errorPolicy) || "none" : _h, keepRootFields = _b.keepRootFields, context = _b.context;
            return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__generator)(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(mutation, 27);
                        (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(fetchPolicy === "network-only" || fetchPolicy === "no-cache", 28);
                        mutationId = this.generateMutationId();
                        mutation = this.cache.transformForLink(this.transform(mutation));
                        hasClientExports = this.getDocumentInfo(mutation).hasClientExports;
                        variables = this.getVariables(mutation, variables);
                        if (!hasClientExports) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.localState.addExportedVariables(mutation, variables, context)];
                    case 1:
                        variables = (_j.sent());
                        _j.label = 2;
                    case 2:
                        mutationStoreValue = this.mutationStore &&
                            (this.mutationStore[mutationId] = {
                                mutation: mutation,
                                variables: variables,
                                loading: true,
                                error: null,
                            });
                        isOptimistic = optimisticResponse &&
                            this.markMutationOptimistic(optimisticResponse, {
                                mutationId: mutationId,
                                document: mutation,
                                variables: variables,
                                fetchPolicy: fetchPolicy,
                                errorPolicy: errorPolicy,
                                context: context,
                                updateQueries: updateQueries,
                                update: updateWithProxyFn,
                                keepRootFields: keepRootFields,
                            });
                        this.broadcastQueries();
                        self = this;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.asyncMap)(self.getObservableFromLink(mutation, (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, context), { optimisticResponse: isOptimistic ? optimisticResponse : void 0 }), variables, {}, false), function (result) {
                                    if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.graphQLResultHasError)(result) && errorPolicy === "none") {
                                        throw new _errors_index_js__WEBPACK_IMPORTED_MODULE_9__.ApolloError({
                                            graphQLErrors: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.getGraphQLErrorsFromResult)(result),
                                        });
                                    }
                                    if (mutationStoreValue) {
                                        mutationStoreValue.loading = false;
                                        mutationStoreValue.error = null;
                                    }
                                    var storeResult = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, result);
                                    if (typeof refetchQueries === "function") {
                                        refetchQueries = refetchQueries(storeResult);
                                    }
                                    if (errorPolicy === "ignore" && (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.graphQLResultHasError)(storeResult)) {
                                        delete storeResult.errors;
                                    }
                                    return self.markMutationResult({
                                        mutationId: mutationId,
                                        result: storeResult,
                                        document: mutation,
                                        variables: variables,
                                        fetchPolicy: fetchPolicy,
                                        errorPolicy: errorPolicy,
                                        context: context,
                                        update: updateWithProxyFn,
                                        updateQueries: updateQueries,
                                        awaitRefetchQueries: awaitRefetchQueries,
                                        refetchQueries: refetchQueries,
                                        removeOptimistic: isOptimistic ? mutationId : void 0,
                                        onQueryUpdated: onQueryUpdated,
                                        keepRootFields: keepRootFields,
                                    });
                                }).subscribe({
                                    next: function (storeResult) {
                                        self.broadcastQueries();
                                        // Since mutations might receive multiple payloads from the
                                        // ApolloLink chain (e.g. when used with @defer),
                                        // we resolve with a SingleExecutionResult or after the final
                                        // ExecutionPatchResult has arrived and we have assembled the
                                        // multipart response into a single result.
                                        if (!("hasNext" in storeResult) || storeResult.hasNext === false) {
                                            resolve(storeResult);
                                        }
                                    },
                                    error: function (err) {
                                        if (mutationStoreValue) {
                                            mutationStoreValue.loading = false;
                                            mutationStoreValue.error = err;
                                        }
                                        if (isOptimistic) {
                                            self.cache.removeOptimistic(mutationId);
                                        }
                                        self.broadcastQueries();
                                        reject(err instanceof _errors_index_js__WEBPACK_IMPORTED_MODULE_9__.ApolloError ? err : (new _errors_index_js__WEBPACK_IMPORTED_MODULE_9__.ApolloError({
                                            networkError: err,
                                        })));
                                    },
                                });
                            })];
                }
            });
        });
    };
    QueryManager.prototype.markMutationResult = function (mutation, cache) {
        var _this = this;
        if (cache === void 0) { cache = this.cache; }
        var result = mutation.result;
        var cacheWrites = [];
        var skipCache = mutation.fetchPolicy === "no-cache";
        if (!skipCache && (0,_QueryInfo_js__WEBPACK_IMPORTED_MODULE_10__.shouldWriteResult)(result, mutation.errorPolicy)) {
            if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_11__.isExecutionPatchIncrementalResult)(result)) {
                cacheWrites.push({
                    result: result.data,
                    dataId: "ROOT_MUTATION",
                    query: mutation.document,
                    variables: mutation.variables,
                });
            }
            if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_11__.isExecutionPatchIncrementalResult)(result) &&
                (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_12__.isNonEmptyArray)(result.incremental)) {
                var diff = cache.diff({
                    id: "ROOT_MUTATION",
                    // The cache complains if passed a mutation where it expects a
                    // query, so we transform mutations and subscriptions to queries
                    // (only once, thanks to this.transformCache).
                    query: this.getDocumentInfo(mutation.document).asQuery,
                    variables: mutation.variables,
                    optimistic: false,
                    returnPartialData: true,
                });
                var mergedData = void 0;
                if (diff.result) {
                    mergedData = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_11__.mergeIncrementalData)(diff.result, result);
                }
                if (typeof mergedData !== "undefined") {
                    // cast the ExecutionPatchResult to FetchResult here since
                    // ExecutionPatchResult never has `data` when returned from the server
                    result.data = mergedData;
                    cacheWrites.push({
                        result: mergedData,
                        dataId: "ROOT_MUTATION",
                        query: mutation.document,
                        variables: mutation.variables,
                    });
                }
            }
            var updateQueries_1 = mutation.updateQueries;
            if (updateQueries_1) {
                this.queries.forEach(function (_a, queryId) {
                    var observableQuery = _a.observableQuery;
                    var queryName = observableQuery && observableQuery.queryName;
                    if (!queryName || !hasOwnProperty.call(updateQueries_1, queryName)) {
                        return;
                    }
                    var updater = updateQueries_1[queryName];
                    var _b = _this.queries.get(queryId), document = _b.document, variables = _b.variables;
                    // Read the current query result from the store.
                    var _c = cache.diff({
                        query: document,
                        variables: variables,
                        returnPartialData: true,
                        optimistic: false,
                    }), currentQueryResult = _c.result, complete = _c.complete;
                    if (complete && currentQueryResult) {
                        // Run our reducer using the current query result and the mutation result.
                        var nextQueryResult = updater(currentQueryResult, {
                            mutationResult: result,
                            queryName: (document && (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.getOperationName)(document)) || void 0,
                            queryVariables: variables,
                        });
                        // Write the modified result back into the store if we got a new result.
                        if (nextQueryResult) {
                            cacheWrites.push({
                                result: nextQueryResult,
                                dataId: "ROOT_QUERY",
                                query: document,
                                variables: variables,
                            });
                        }
                    }
                });
            }
        }
        if (cacheWrites.length > 0 ||
            (mutation.refetchQueries || "").length > 0 ||
            mutation.update ||
            mutation.onQueryUpdated ||
            mutation.removeOptimistic) {
            var results_1 = [];
            this.refetchQueries({
                updateCache: function (cache) {
                    if (!skipCache) {
                        cacheWrites.forEach(function (write) { return cache.write(write); });
                    }
                    // If the mutation has some writes associated with it then we need to
                    // apply those writes to the store by running this reducer again with
                    // a write action.
                    var update = mutation.update;
                    // Determine whether result is a SingleExecutionResult,
                    // or the final ExecutionPatchResult.
                    var isFinalResult = !(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_11__.isExecutionPatchResult)(result) ||
                        ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_11__.isExecutionPatchIncrementalResult)(result) && !result.hasNext);
                    if (update) {
                        if (!skipCache) {
                            // Re-read the ROOT_MUTATION data we just wrote into the cache
                            // (the first cache.write call in the cacheWrites.forEach loop
                            // above), so field read functions have a chance to run for
                            // fields within mutation result objects.
                            var diff = cache.diff({
                                id: "ROOT_MUTATION",
                                // The cache complains if passed a mutation where it expects a
                                // query, so we transform mutations and subscriptions to queries
                                // (only once, thanks to this.transformCache).
                                query: _this.getDocumentInfo(mutation.document).asQuery,
                                variables: mutation.variables,
                                optimistic: false,
                                returnPartialData: true,
                            });
                            if (diff.complete) {
                                result = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, result), { data: diff.result });
                                if ("incremental" in result) {
                                    delete result.incremental;
                                }
                                if ("hasNext" in result) {
                                    delete result.hasNext;
                                }
                            }
                        }
                        // If we've received the whole response,
                        // either a SingleExecutionResult or the final ExecutionPatchResult,
                        // call the update function.
                        if (isFinalResult) {
                            update(cache, result, {
                                context: mutation.context,
                                variables: mutation.variables,
                            });
                        }
                    }
                    // TODO Do this with cache.evict({ id: 'ROOT_MUTATION' }) but make it
                    // shallow to allow rolling back optimistic evictions.
                    if (!skipCache && !mutation.keepRootFields && isFinalResult) {
                        cache.modify({
                            id: "ROOT_MUTATION",
                            fields: function (value, _a) {
                                var fieldName = _a.fieldName, DELETE = _a.DELETE;
                                return fieldName === "__typename" ? value : DELETE;
                            },
                        });
                    }
                },
                include: mutation.refetchQueries,
                // Write the final mutation.result to the root layer of the cache.
                optimistic: false,
                // Remove the corresponding optimistic layer at the same time as we
                // write the final non-optimistic result.
                removeOptimistic: mutation.removeOptimistic,
                // Let the caller of client.mutate optionally determine the refetching
                // behavior for watched queries after the mutation.update function runs.
                // If no onQueryUpdated function was provided for this mutation, pass
                // null instead of undefined to disable the default refetching behavior.
                onQueryUpdated: mutation.onQueryUpdated || null,
            }).forEach(function (result) { return results_1.push(result); });
            if (mutation.awaitRefetchQueries || mutation.onQueryUpdated) {
                // Returning a promise here makes the mutation await that promise, so we
                // include results in that promise's work if awaitRefetchQueries or an
                // onQueryUpdated function was specified.
                return Promise.all(results_1).then(function () { return result; });
            }
        }
        return Promise.resolve(result);
    };
    QueryManager.prototype.markMutationOptimistic = function (optimisticResponse, mutation) {
        var _this = this;
        var data = typeof optimisticResponse === "function" ?
            optimisticResponse(mutation.variables, { IGNORE: IGNORE })
            : optimisticResponse;
        if (data === IGNORE) {
            return false;
        }
        this.cache.recordOptimisticTransaction(function (cache) {
            try {
                _this.markMutationResult((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, mutation), { result: { data: data } }), cache);
            }
            catch (error) {
                globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.error(error);
            }
        }, mutation.mutationId);
        return true;
    };
    QueryManager.prototype.fetchQuery = function (queryId, options, networkStatus) {
        return this.fetchConcastWithInfo(queryId, options, networkStatus).concast
            .promise;
    };
    QueryManager.prototype.getQueryStore = function () {
        var store = Object.create(null);
        this.queries.forEach(function (info, queryId) {
            store[queryId] = {
                variables: info.variables,
                networkStatus: info.networkStatus,
                networkError: info.networkError,
                graphQLErrors: info.graphQLErrors,
            };
        });
        return store;
    };
    QueryManager.prototype.resetErrors = function (queryId) {
        var queryInfo = this.queries.get(queryId);
        if (queryInfo) {
            queryInfo.networkError = undefined;
            queryInfo.graphQLErrors = [];
        }
    };
    QueryManager.prototype.transform = function (document) {
        return this.documentTransform.transformDocument(document);
    };
    QueryManager.prototype.getDocumentInfo = function (document) {
        var transformCache = this.transformCache;
        if (!transformCache.has(document)) {
            var cacheEntry = {
                // TODO These three calls (hasClientExports, shouldForceResolvers, and
                // usesNonreactiveDirective) are performing independent full traversals
                // of the transformed document. We should consider merging these
                // traversals into a single pass in the future, though the work is
                // cached after the first time.
                hasClientExports: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_14__.hasClientExports)(document),
                hasForcedResolvers: this.localState.shouldForceResolvers(document),
                hasNonreactiveDirective: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_14__.hasDirectives)(["nonreactive"], document),
                clientQuery: this.localState.clientQuery(document),
                serverQuery: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_15__.removeDirectivesFromDocument)([
                    { name: "client", remove: true },
                    { name: "connection" },
                    { name: "nonreactive" },
                ], document),
                defaultVars: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.getDefaultValues)((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.getOperationDefinition)(document)),
                // Transform any mutation or subscription operations to query operations
                // so we can read/write them from/to the cache.
                asQuery: (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, document), { definitions: document.definitions.map(function (def) {
                        if (def.kind === "OperationDefinition" &&
                            def.operation !== "query") {
                            return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, def), { operation: "query" });
                        }
                        return def;
                    }) }),
            };
            transformCache.set(document, cacheEntry);
        }
        return transformCache.get(document);
    };
    QueryManager.prototype.getVariables = function (document, variables) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, this.getDocumentInfo(document).defaultVars), variables);
    };
    QueryManager.prototype.watchQuery = function (options) {
        var query = this.transform(options.query);
        // assign variable default values if supplied
        // NOTE: We don't modify options.query here with the transformed query to
        // ensure observable.options.query is set to the raw untransformed query.
        options = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, options), { variables: this.getVariables(query, options.variables) });
        if (typeof options.notifyOnNetworkStatusChange === "undefined") {
            options.notifyOnNetworkStatusChange = false;
        }
        var queryInfo = new _QueryInfo_js__WEBPACK_IMPORTED_MODULE_10__.QueryInfo(this);
        var observable = new _ObservableQuery_js__WEBPACK_IMPORTED_MODULE_16__.ObservableQuery({
            queryManager: this,
            queryInfo: queryInfo,
            options: options,
        });
        observable["lastQuery"] = query;
        this.queries.set(observable.queryId, queryInfo);
        // We give queryInfo the transformed query to ensure the first cache diff
        // uses the transformed query instead of the raw query
        queryInfo.init({
            document: query,
            observableQuery: observable,
            variables: observable.variables,
        });
        return observable;
    };
    QueryManager.prototype.query = function (options, queryId) {
        var _this = this;
        if (queryId === void 0) { queryId = this.generateQueryId(); }
        (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(options.query, 29);
        (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(options.query.kind === "Document", 30);
        (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(!options.returnPartialData, 31);
        (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(!options.pollInterval, 32);
        return this.fetchQuery(queryId, (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, options), { query: this.transform(options.query) })).finally(function () { return _this.stopQuery(queryId); });
    };
    QueryManager.prototype.generateQueryId = function () {
        return String(this.queryIdCounter++);
    };
    QueryManager.prototype.generateRequestId = function () {
        return this.requestIdCounter++;
    };
    QueryManager.prototype.generateMutationId = function () {
        return String(this.mutationIdCounter++);
    };
    QueryManager.prototype.stopQueryInStore = function (queryId) {
        this.stopQueryInStoreNoBroadcast(queryId);
        this.broadcastQueries();
    };
    QueryManager.prototype.stopQueryInStoreNoBroadcast = function (queryId) {
        var queryInfo = this.queries.get(queryId);
        if (queryInfo)
            queryInfo.stop();
    };
    QueryManager.prototype.clearStore = function (options) {
        if (options === void 0) { options = {
            discardWatches: true,
        }; }
        // Before we have sent the reset action to the store, we can no longer
        // rely on the results returned by in-flight requests since these may
        // depend on values that previously existed in the data portion of the
        // store. So, we cancel the promises and observers that we have issued
        // so far and not yet resolved (in the case of queries).
        this.cancelPendingFetches((0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(33));
        this.queries.forEach(function (queryInfo) {
            if (queryInfo.observableQuery) {
                // Set loading to true so listeners don't trigger unless they want
                // results with partial data.
                queryInfo.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_17__.NetworkStatus.loading;
            }
            else {
                queryInfo.stop();
            }
        });
        if (this.mutationStore) {
            this.mutationStore = Object.create(null);
        }
        // begin removing data from the store
        return this.cache.reset(options);
    };
    QueryManager.prototype.getObservableQueries = function (include) {
        var _this = this;
        if (include === void 0) { include = "active"; }
        var queries = new Map();
        var queryNamesAndDocs = new Map();
        var legacyQueryOptions = new Set();
        if (Array.isArray(include)) {
            include.forEach(function (desc) {
                if (typeof desc === "string") {
                    queryNamesAndDocs.set(desc, false);
                }
                else if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_18__.isDocumentNode)(desc)) {
                    queryNamesAndDocs.set(_this.transform(desc), false);
                }
                else if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_19__.isNonNullObject)(desc) && desc.query) {
                    legacyQueryOptions.add(desc);
                }
            });
        }
        this.queries.forEach(function (_a, queryId) {
            var oq = _a.observableQuery, document = _a.document;
            if (oq) {
                if (include === "all") {
                    queries.set(queryId, oq);
                    return;
                }
                var queryName = oq.queryName, fetchPolicy = oq.options.fetchPolicy;
                if (fetchPolicy === "standby" ||
                    (include === "active" && !oq.hasObservers())) {
                    return;
                }
                if (include === "active" ||
                    (queryName && queryNamesAndDocs.has(queryName)) ||
                    (document && queryNamesAndDocs.has(document))) {
                    queries.set(queryId, oq);
                    if (queryName)
                        queryNamesAndDocs.set(queryName, true);
                    if (document)
                        queryNamesAndDocs.set(document, true);
                }
            }
        });
        if (legacyQueryOptions.size) {
            legacyQueryOptions.forEach(function (options) {
                // We will be issuing a fresh network request for this query, so we
                // pre-allocate a new query ID here, using a special prefix to enable
                // cleaning up these temporary queries later, after fetching.
                var queryId = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_20__.makeUniqueId)("legacyOneTimeQuery");
                var queryInfo = _this.getQuery(queryId).init({
                    document: options.query,
                    variables: options.variables,
                });
                var oq = new _ObservableQuery_js__WEBPACK_IMPORTED_MODULE_16__.ObservableQuery({
                    queryManager: _this,
                    queryInfo: queryInfo,
                    options: (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, options), { fetchPolicy: "network-only" }),
                });
                (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(oq.queryId === queryId);
                queryInfo.setObservableQuery(oq);
                queries.set(queryId, oq);
            });
        }
        if (globalThis.__DEV__ !== false && queryNamesAndDocs.size) {
            queryNamesAndDocs.forEach(function (included, nameOrDoc) {
                if (!included) {
                    globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(typeof nameOrDoc === "string" ? 34 : 35, nameOrDoc);
                }
            });
        }
        return queries;
    };
    QueryManager.prototype.reFetchObservableQueries = function (includeStandby) {
        var _this = this;
        if (includeStandby === void 0) { includeStandby = false; }
        var observableQueryPromises = [];
        this.getObservableQueries(includeStandby ? "all" : "active").forEach(function (observableQuery, queryId) {
            var fetchPolicy = observableQuery.options.fetchPolicy;
            observableQuery.resetLastResults();
            if (includeStandby ||
                (fetchPolicy !== "standby" && fetchPolicy !== "cache-only")) {
                observableQueryPromises.push(observableQuery.refetch());
            }
            _this.getQuery(queryId).setDiff(null);
        });
        this.broadcastQueries();
        return Promise.all(observableQueryPromises);
    };
    QueryManager.prototype.setObservableQuery = function (observableQuery) {
        this.getQuery(observableQuery.queryId).setObservableQuery(observableQuery);
    };
    QueryManager.prototype.startGraphQLSubscription = function (_a) {
        var _this = this;
        var query = _a.query, fetchPolicy = _a.fetchPolicy, _b = _a.errorPolicy, errorPolicy = _b === void 0 ? "none" : _b, variables = _a.variables, _c = _a.context, context = _c === void 0 ? {} : _c, _d = _a.extensions, extensions = _d === void 0 ? {} : _d;
        query = this.transform(query);
        variables = this.getVariables(query, variables);
        var makeObservable = function (variables) {
            return _this.getObservableFromLink(query, context, variables, extensions).map(function (result) {
                if (fetchPolicy !== "no-cache") {
                    // the subscription interface should handle not sending us results we no longer subscribe to.
                    // XXX I don't think we ever send in an object with errors, but we might in the future...
                    if ((0,_QueryInfo_js__WEBPACK_IMPORTED_MODULE_10__.shouldWriteResult)(result, errorPolicy)) {
                        _this.cache.write({
                            query: query,
                            result: result.data,
                            dataId: "ROOT_SUBSCRIPTION",
                            variables: variables,
                        });
                    }
                    _this.broadcastQueries();
                }
                var hasErrors = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.graphQLResultHasError)(result);
                var hasProtocolErrors = (0,_errors_index_js__WEBPACK_IMPORTED_MODULE_9__.graphQLResultHasProtocolErrors)(result);
                if (hasErrors || hasProtocolErrors) {
                    var errors = {};
                    if (hasErrors) {
                        errors.graphQLErrors = result.errors;
                    }
                    if (hasProtocolErrors) {
                        errors.protocolErrors = result.extensions[_errors_index_js__WEBPACK_IMPORTED_MODULE_9__.PROTOCOL_ERRORS_SYMBOL];
                    }
                    // `errorPolicy` is a mechanism for handling GraphQL errors, according
                    // to our documentation, so we throw protocol errors regardless of the
                    // set error policy.
                    if (errorPolicy === "none" || hasProtocolErrors) {
                        throw new _errors_index_js__WEBPACK_IMPORTED_MODULE_9__.ApolloError(errors);
                    }
                }
                if (errorPolicy === "ignore") {
                    delete result.errors;
                }
                return result;
            });
        };
        if (this.getDocumentInfo(query).hasClientExports) {
            var observablePromise_1 = this.localState
                .addExportedVariables(query, variables, context)
                .then(makeObservable);
            return new _utilities_index_js__WEBPACK_IMPORTED_MODULE_21__.Observable(function (observer) {
                var sub = null;
                observablePromise_1.then(function (observable) { return (sub = observable.subscribe(observer)); }, observer.error);
                return function () { return sub && sub.unsubscribe(); };
            });
        }
        return makeObservable(variables);
    };
    QueryManager.prototype.stopQuery = function (queryId) {
        this.stopQueryNoBroadcast(queryId);
        this.broadcastQueries();
    };
    QueryManager.prototype.stopQueryNoBroadcast = function (queryId) {
        this.stopQueryInStoreNoBroadcast(queryId);
        this.removeQuery(queryId);
    };
    QueryManager.prototype.removeQuery = function (queryId) {
        // teardown all links
        // Both `QueryManager.fetchRequest` and `QueryManager.query` create separate promises
        // that each add their reject functions to fetchCancelFns.
        // A query created with `QueryManager.query()` could trigger a `QueryManager.fetchRequest`.
        // The same queryId could have two rejection fns for two promises
        this.fetchCancelFns.delete(queryId);
        if (this.queries.has(queryId)) {
            this.getQuery(queryId).stop();
            this.queries.delete(queryId);
        }
    };
    QueryManager.prototype.broadcastQueries = function () {
        if (this.onBroadcast)
            this.onBroadcast();
        this.queries.forEach(function (info) { return info.notify(); });
    };
    QueryManager.prototype.getLocalState = function () {
        return this.localState;
    };
    QueryManager.prototype.getObservableFromLink = function (query, context, variables, extensions, 
    // Prefer context.queryDeduplication if specified.
    deduplication) {
        var _this = this;
        var _a;
        if (deduplication === void 0) { deduplication = (_a = context === null || context === void 0 ? void 0 : context.queryDeduplication) !== null && _a !== void 0 ? _a : this.queryDeduplication; }
        var observable;
        var _b = this.getDocumentInfo(query), serverQuery = _b.serverQuery, clientQuery = _b.clientQuery;
        if (serverQuery) {
            var _c = this, inFlightLinkObservables_1 = _c.inFlightLinkObservables, link = _c.link;
            var operation = {
                query: serverQuery,
                variables: variables,
                operationName: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.getOperationName)(serverQuery) || void 0,
                context: this.prepareContext((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, context), { forceFetch: !deduplication })),
                extensions: extensions,
            };
            context = operation.context;
            if (deduplication) {
                var printedServerQuery_1 = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_22__.print)(serverQuery);
                var varJson_1 = (0,_cache_index_js__WEBPACK_IMPORTED_MODULE_23__.canonicalStringify)(variables);
                var entry = inFlightLinkObservables_1.lookup(printedServerQuery_1, varJson_1);
                observable = entry.observable;
                if (!observable) {
                    var concast = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_24__.Concast([
                        (0,_link_core_index_js__WEBPACK_IMPORTED_MODULE_25__.execute)(link, operation),
                    ]);
                    observable = entry.observable = concast;
                    concast.beforeNext(function () {
                        inFlightLinkObservables_1.remove(printedServerQuery_1, varJson_1);
                    });
                }
            }
            else {
                observable = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_24__.Concast([
                    (0,_link_core_index_js__WEBPACK_IMPORTED_MODULE_25__.execute)(link, operation),
                ]);
            }
        }
        else {
            observable = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_24__.Concast([_utilities_index_js__WEBPACK_IMPORTED_MODULE_21__.Observable.of({ data: {} })]);
            context = this.prepareContext(context);
        }
        if (clientQuery) {
            observable = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.asyncMap)(observable, function (result) {
                return _this.localState.runResolvers({
                    document: clientQuery,
                    remoteResult: result,
                    context: context,
                    variables: variables,
                });
            });
        }
        return observable;
    };
    QueryManager.prototype.getResultsFromLink = function (queryInfo, cacheWriteBehavior, options) {
        var requestId = (queryInfo.lastRequestId = this.generateRequestId());
        // Performing transformForLink here gives this.cache a chance to fill in
        // missing fragment definitions (for example) before sending this document
        // through the link chain.
        var linkDocument = this.cache.transformForLink(options.query);
        return (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.asyncMap)(this.getObservableFromLink(linkDocument, options.context, options.variables), function (result) {
            var graphQLErrors = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_8__.getGraphQLErrorsFromResult)(result);
            var hasErrors = graphQLErrors.length > 0;
            var errorPolicy = options.errorPolicy;
            // If we interrupted this request by calling getResultsFromLink again
            // with the same QueryInfo object, we ignore the old results.
            if (requestId >= queryInfo.lastRequestId) {
                if (hasErrors && errorPolicy === "none") {
                    // Throwing here effectively calls observer.error.
                    throw queryInfo.markError(new _errors_index_js__WEBPACK_IMPORTED_MODULE_9__.ApolloError({
                        graphQLErrors: graphQLErrors,
                    }));
                }
                // Use linkDocument rather than queryInfo.document so the
                // operation/fragments used to write the result are the same as the
                // ones used to obtain it from the link.
                queryInfo.markResult(result, linkDocument, options, cacheWriteBehavior);
                queryInfo.markReady();
            }
            var aqr = {
                data: result.data,
                loading: false,
                networkStatus: _networkStatus_js__WEBPACK_IMPORTED_MODULE_17__.NetworkStatus.ready,
            };
            // In the case we start multiple network requests simulatenously, we
            // want to ensure we properly set `data` if we're reporting on an old
            // result which will not be caught by the conditional above that ends up
            // throwing the markError result.
            if (hasErrors && errorPolicy === "none") {
                aqr.data = void 0;
            }
            if (hasErrors && errorPolicy !== "ignore") {
                aqr.errors = graphQLErrors;
                aqr.networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_17__.NetworkStatus.error;
            }
            return aqr;
        }, function (networkError) {
            var error = (0,_errors_index_js__WEBPACK_IMPORTED_MODULE_9__.isApolloError)(networkError) ? networkError : (new _errors_index_js__WEBPACK_IMPORTED_MODULE_9__.ApolloError({ networkError: networkError }));
            // Avoid storing errors from older interrupted queries.
            if (requestId >= queryInfo.lastRequestId) {
                queryInfo.markError(error);
            }
            throw error;
        });
    };
    QueryManager.prototype.fetchConcastWithInfo = function (queryId, options, 
    // The initial networkStatus for this fetch, most often
    // NetworkStatus.loading, but also possibly fetchMore, poll, refetch,
    // or setVariables.
    networkStatus, query) {
        var _this = this;
        if (networkStatus === void 0) { networkStatus = _networkStatus_js__WEBPACK_IMPORTED_MODULE_17__.NetworkStatus.loading; }
        if (query === void 0) { query = options.query; }
        var variables = this.getVariables(query, options.variables);
        var queryInfo = this.getQuery(queryId);
        var defaults = this.defaultOptions.watchQuery;
        var _a = options.fetchPolicy, fetchPolicy = _a === void 0 ? (defaults && defaults.fetchPolicy) || "cache-first" : _a, _b = options.errorPolicy, errorPolicy = _b === void 0 ? (defaults && defaults.errorPolicy) || "none" : _b, _c = options.returnPartialData, returnPartialData = _c === void 0 ? false : _c, _d = options.notifyOnNetworkStatusChange, notifyOnNetworkStatusChange = _d === void 0 ? false : _d, _e = options.context, context = _e === void 0 ? {} : _e;
        var normalized = Object.assign({}, options, {
            query: query,
            variables: variables,
            fetchPolicy: fetchPolicy,
            errorPolicy: errorPolicy,
            returnPartialData: returnPartialData,
            notifyOnNetworkStatusChange: notifyOnNetworkStatusChange,
            context: context,
        });
        var fromVariables = function (variables) {
            // Since normalized is always a fresh copy of options, it's safe to
            // modify its properties here, rather than creating yet another new
            // WatchQueryOptions object.
            normalized.variables = variables;
            var sourcesWithInfo = _this.fetchQueryByPolicy(queryInfo, normalized, networkStatus);
            if (
            // If we're in standby, postpone advancing options.fetchPolicy using
            // applyNextFetchPolicy.
            normalized.fetchPolicy !== "standby" &&
                // The "standby" policy currently returns [] from fetchQueryByPolicy, so
                // this is another way to detect when nothing was done/fetched.
                sourcesWithInfo.sources.length > 0 &&
                queryInfo.observableQuery) {
                queryInfo.observableQuery["applyNextFetchPolicy"]("after-fetch", options);
            }
            return sourcesWithInfo;
        };
        // This cancel function needs to be set before the concast is created,
        // in case concast creation synchronously cancels the request.
        var cleanupCancelFn = function () { return _this.fetchCancelFns.delete(queryId); };
        this.fetchCancelFns.set(queryId, function (reason) {
            cleanupCancelFn();
            // This delay ensures the concast variable has been initialized.
            setTimeout(function () { return concast.cancel(reason); });
        });
        var concast, containsDataFromLink;
        // If the query has @export(as: ...) directives, then we need to
        // process those directives asynchronously. When there are no
        // @export directives (the common case), we deliberately avoid
        // wrapping the result of this.fetchQueryByPolicy in a Promise,
        // since the timing of result delivery is (unfortunately) important
        // for backwards compatibility. TODO This code could be simpler if
        // we deprecated and removed LocalState.
        if (this.getDocumentInfo(normalized.query).hasClientExports) {
            concast = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_24__.Concast(this.localState
                .addExportedVariables(normalized.query, normalized.variables, normalized.context)
                .then(fromVariables)
                .then(function (sourcesWithInfo) { return sourcesWithInfo.sources; }));
            // there is just no way we can synchronously get the *right* value here,
            // so we will assume `true`, which is the behaviour before the bug fix in
            // #10597. This means that bug is not fixed in that case, and is probably
            // un-fixable with reasonable effort for the edge case of @export as
            // directives.
            containsDataFromLink = true;
        }
        else {
            var sourcesWithInfo = fromVariables(normalized.variables);
            containsDataFromLink = sourcesWithInfo.fromLink;
            concast = new _utilities_index_js__WEBPACK_IMPORTED_MODULE_24__.Concast(sourcesWithInfo.sources);
        }
        concast.promise.then(cleanupCancelFn, cleanupCancelFn);
        return {
            concast: concast,
            fromLink: containsDataFromLink,
        };
    };
    QueryManager.prototype.refetchQueries = function (_a) {
        var _this = this;
        var updateCache = _a.updateCache, include = _a.include, _b = _a.optimistic, optimistic = _b === void 0 ? false : _b, _c = _a.removeOptimistic, removeOptimistic = _c === void 0 ? optimistic ? (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_20__.makeUniqueId)("refetchQueries") : void 0 : _c, onQueryUpdated = _a.onQueryUpdated;
        var includedQueriesById = new Map();
        if (include) {
            this.getObservableQueries(include).forEach(function (oq, queryId) {
                includedQueriesById.set(queryId, {
                    oq: oq,
                    lastDiff: _this.getQuery(queryId).getDiff(),
                });
            });
        }
        var results = new Map();
        if (updateCache) {
            this.cache.batch({
                update: updateCache,
                // Since you can perform any combination of cache reads and/or writes in
                // the cache.batch update function, its optimistic option can be either
                // a boolean or a string, representing three distinct modes of
                // operation:
                //
                // * false: read/write only the root layer
                // * true: read/write the topmost layer
                // * string: read/write a fresh optimistic layer with that ID string
                //
                // When typeof optimistic === "string", a new optimistic layer will be
                // temporarily created within cache.batch with that string as its ID. If
                // we then pass that same string as the removeOptimistic option, we can
                // make cache.batch immediately remove the optimistic layer after
                // running the updateCache function, triggering only one broadcast.
                //
                // However, the refetchQueries method accepts only true or false for its
                // optimistic option (not string). We interpret true to mean a temporary
                // optimistic layer should be created, to allow efficiently rolling back
                // the effect of the updateCache function, which involves passing a
                // string instead of true as the optimistic option to cache.batch, when
                // refetchQueries receives optimistic: true.
                //
                // In other words, we are deliberately not supporting the use case of
                // writing to an *existing* optimistic layer (using the refetchQueries
                // updateCache function), since that would potentially interfere with
                // other optimistic updates in progress. Instead, you can read/write
                // only the root layer by passing optimistic: false to refetchQueries,
                // or you can read/write a brand new optimistic layer that will be
                // automatically removed by passing optimistic: true.
                optimistic: (optimistic && removeOptimistic) || false,
                // The removeOptimistic option can also be provided by itself, even if
                // optimistic === false, to remove some previously-added optimistic
                // layer safely and efficiently, like we do in markMutationResult.
                //
                // If an explicit removeOptimistic string is provided with optimistic:
                // true, the removeOptimistic string will determine the ID of the
                // temporary optimistic layer, in case that ever matters.
                removeOptimistic: removeOptimistic,
                onWatchUpdated: function (watch, diff, lastDiff) {
                    var oq = watch.watcher instanceof _QueryInfo_js__WEBPACK_IMPORTED_MODULE_10__.QueryInfo && watch.watcher.observableQuery;
                    if (oq) {
                        if (onQueryUpdated) {
                            // Since we're about to handle this query now, remove it from
                            // includedQueriesById, in case it was added earlier because of
                            // options.include.
                            includedQueriesById.delete(oq.queryId);
                            var result = onQueryUpdated(oq, diff, lastDiff);
                            if (result === true) {
                                // The onQueryUpdated function requested the default refetching
                                // behavior by returning true.
                                result = oq.refetch();
                            }
                            // Record the result in the results Map, as long as onQueryUpdated
                            // did not return false to skip/ignore this result.
                            if (result !== false) {
                                results.set(oq, result);
                            }
                            // Allow the default cache broadcast to happen, except when
                            // onQueryUpdated returns false.
                            return result;
                        }
                        if (onQueryUpdated !== null) {
                            // If we don't have an onQueryUpdated function, and onQueryUpdated
                            // was not disabled by passing null, make sure this query is
                            // "included" like any other options.include-specified query.
                            includedQueriesById.set(oq.queryId, { oq: oq, lastDiff: lastDiff, diff: diff });
                        }
                    }
                },
            });
        }
        if (includedQueriesById.size) {
            includedQueriesById.forEach(function (_a, queryId) {
                var oq = _a.oq, lastDiff = _a.lastDiff, diff = _a.diff;
                var result;
                // If onQueryUpdated is provided, we want to use it for all included
                // queries, even the QueryOptions ones.
                if (onQueryUpdated) {
                    if (!diff) {
                        var info = oq["queryInfo"];
                        info.reset(); // Force info.getDiff() to read from cache.
                        diff = info.getDiff();
                    }
                    result = onQueryUpdated(oq, diff, lastDiff);
                }
                // Otherwise, we fall back to refetching.
                if (!onQueryUpdated || result === true) {
                    result = oq.refetch();
                }
                if (result !== false) {
                    results.set(oq, result);
                }
                if (queryId.indexOf("legacyOneTimeQuery") >= 0) {
                    _this.stopQueryNoBroadcast(queryId);
                }
            });
        }
        if (removeOptimistic) {
            // In case no updateCache callback was provided (so cache.batch was not
            // called above, and thus did not already remove the optimistic layer),
            // remove it here. Since this is a no-op when the layer has already been
            // removed, we do it even if we called cache.batch above, since it's
            // possible this.cache is an instance of some ApolloCache subclass other
            // than InMemoryCache, and does not fully support the removeOptimistic
            // option for cache.batch.
            this.cache.removeOptimistic(removeOptimistic);
        }
        return results;
    };
    QueryManager.prototype.fetchQueryByPolicy = function (queryInfo, _a, 
    // The initial networkStatus for this fetch, most often
    // NetworkStatus.loading, but also possibly fetchMore, poll, refetch,
    // or setVariables.
    networkStatus) {
        var _this = this;
        var query = _a.query, variables = _a.variables, fetchPolicy = _a.fetchPolicy, refetchWritePolicy = _a.refetchWritePolicy, errorPolicy = _a.errorPolicy, returnPartialData = _a.returnPartialData, context = _a.context, notifyOnNetworkStatusChange = _a.notifyOnNetworkStatusChange;
        var oldNetworkStatus = queryInfo.networkStatus;
        queryInfo.init({
            document: query,
            variables: variables,
            networkStatus: networkStatus,
        });
        var readCache = function () { return queryInfo.getDiff(); };
        var resultsFromCache = function (diff, networkStatus) {
            if (networkStatus === void 0) { networkStatus = queryInfo.networkStatus || _networkStatus_js__WEBPACK_IMPORTED_MODULE_17__.NetworkStatus.loading; }
            var data = diff.result;
            if (globalThis.__DEV__ !== false && !returnPartialData && !(0,_wry_equality__WEBPACK_IMPORTED_MODULE_1__.equal)(data, {})) {
                (0,_ObservableQuery_js__WEBPACK_IMPORTED_MODULE_16__.logMissingFieldErrors)(diff.missing);
            }
            var fromData = function (data) {
                return _utilities_index_js__WEBPACK_IMPORTED_MODULE_21__.Observable.of((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({ data: data, loading: (0,_networkStatus_js__WEBPACK_IMPORTED_MODULE_17__.isNetworkRequestInFlight)(networkStatus), networkStatus: networkStatus }, (diff.complete ? null : { partial: true })));
            };
            if (data && _this.getDocumentInfo(query).hasForcedResolvers) {
                return _this.localState
                    .runResolvers({
                    document: query,
                    remoteResult: { data: data },
                    context: context,
                    variables: variables,
                    onlyRunForcedResolvers: true,
                })
                    .then(function (resolved) { return fromData(resolved.data || void 0); });
            }
            // Resolves https://github.com/apollographql/apollo-client/issues/10317.
            // If errorPolicy is 'none' and notifyOnNetworkStatusChange is true,
            // data was incorrectly returned from the cache on refetch:
            // if diff.missing exists, we should not return cache data.
            if (errorPolicy === "none" &&
                networkStatus === _networkStatus_js__WEBPACK_IMPORTED_MODULE_17__.NetworkStatus.refetch &&
                Array.isArray(diff.missing)) {
                return fromData(void 0);
            }
            return fromData(data);
        };
        var cacheWriteBehavior = fetchPolicy === "no-cache" ? 0 /* CacheWriteBehavior.FORBID */
            // Watched queries must opt into overwriting existing data on refetch,
            // by passing refetchWritePolicy: "overwrite" in their WatchQueryOptions.
            : (networkStatus === _networkStatus_js__WEBPACK_IMPORTED_MODULE_17__.NetworkStatus.refetch &&
                refetchWritePolicy !== "merge") ?
                1 /* CacheWriteBehavior.OVERWRITE */
                : 2 /* CacheWriteBehavior.MERGE */;
        var resultsFromLink = function () {
            return _this.getResultsFromLink(queryInfo, cacheWriteBehavior, {
                query: query,
                variables: variables,
                context: context,
                fetchPolicy: fetchPolicy,
                errorPolicy: errorPolicy,
            });
        };
        var shouldNotify = notifyOnNetworkStatusChange &&
            typeof oldNetworkStatus === "number" &&
            oldNetworkStatus !== networkStatus &&
            (0,_networkStatus_js__WEBPACK_IMPORTED_MODULE_17__.isNetworkRequestInFlight)(networkStatus);
        switch (fetchPolicy) {
            default:
            case "cache-first": {
                var diff = readCache();
                if (diff.complete) {
                    return {
                        fromLink: false,
                        sources: [resultsFromCache(diff, queryInfo.markReady())],
                    };
                }
                if (returnPartialData || shouldNotify) {
                    return {
                        fromLink: true,
                        sources: [resultsFromCache(diff), resultsFromLink()],
                    };
                }
                return { fromLink: true, sources: [resultsFromLink()] };
            }
            case "cache-and-network": {
                var diff = readCache();
                if (diff.complete || returnPartialData || shouldNotify) {
                    return {
                        fromLink: true,
                        sources: [resultsFromCache(diff), resultsFromLink()],
                    };
                }
                return { fromLink: true, sources: [resultsFromLink()] };
            }
            case "cache-only":
                return {
                    fromLink: false,
                    sources: [resultsFromCache(readCache(), queryInfo.markReady())],
                };
            case "network-only":
                if (shouldNotify) {
                    return {
                        fromLink: true,
                        sources: [resultsFromCache(readCache()), resultsFromLink()],
                    };
                }
                return { fromLink: true, sources: [resultsFromLink()] };
            case "no-cache":
                if (shouldNotify) {
                    return {
                        fromLink: true,
                        // Note that queryInfo.getDiff() for no-cache queries does not call
                        // cache.diff, but instead returns a { complete: false } stub result
                        // when there is no queryInfo.diff already defined.
                        sources: [resultsFromCache(queryInfo.getDiff()), resultsFromLink()],
                    };
                }
                return { fromLink: true, sources: [resultsFromLink()] };
            case "standby":
                return { fromLink: false, sources: [] };
        }
    };
    QueryManager.prototype.getQuery = function (queryId) {
        if (queryId && !this.queries.has(queryId)) {
            this.queries.set(queryId, new _QueryInfo_js__WEBPACK_IMPORTED_MODULE_10__.QueryInfo(this, queryId));
        }
        return this.queries.get(queryId);
    };
    QueryManager.prototype.prepareContext = function (context) {
        if (context === void 0) { context = {}; }
        var newContext = this.localState.prepareContext(context);
        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, this.defaultContext), newContext), { clientAwareness: this.clientAwareness });
    };
    return QueryManager;
}());

//# sourceMappingURL=QueryManager.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/core/equalByQuery.js":
/*!**********************************************************!*\
  !*** ./node_modules/@apollo/client/core/equalByQuery.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   equalByQuery: () => (/* binding */ equalByQuery)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _wry_equality__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/equality */ "./node_modules/@wry/equality/lib/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/fragments.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/directives.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");



// Returns true if aResult and bResult are deeply equal according to the fields
// selected by the given query, ignoring any fields marked as @nonreactive.
function equalByQuery(query, _a, _b, variables) {
    var aData = _a.data, aRest = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__rest)(_a, ["data"]);
    var bData = _b.data, bRest = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__rest)(_b, ["data"]);
    return ((0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__["default"])(aRest, bRest) &&
        equalBySelectionSet((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getMainDefinition)(query).selectionSet, aData, bData, {
            fragmentMap: (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.createFragmentMap)((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.getFragmentDefinitions)(query)),
            variables: variables,
        }));
}
function equalBySelectionSet(selectionSet, aResult, bResult, context) {
    if (aResult === bResult) {
        return true;
    }
    var seenSelections = new Set();
    // Returning true from this Array.prototype.every callback function skips the
    // current field/subtree. Returning false aborts the entire traversal
    // immediately, causing equalBySelectionSet to return false.
    return selectionSet.selections.every(function (selection) {
        // Avoid re-processing the same selection at the same level of recursion, in
        // case the same field gets included via multiple indirect fragment spreads.
        if (seenSelections.has(selection))
            return true;
        seenSelections.add(selection);
        // Ignore @skip(if: true) and @include(if: false) fields.
        if (!(0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_4__.shouldInclude)(selection, context.variables))
            return true;
        // If the field or (named) fragment spread has a @nonreactive directive on
        // it, we don't care if it's different, so we pretend it's the same.
        if (selectionHasNonreactiveDirective(selection))
            return true;
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.isField)(selection)) {
            var resultKey = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_5__.resultKeyNameFromField)(selection);
            var aResultChild = aResult && aResult[resultKey];
            var bResultChild = bResult && bResult[resultKey];
            var childSelectionSet = selection.selectionSet;
            if (!childSelectionSet) {
                // These are scalar values, so we can compare them with deep equal
                // without redoing the main recursive work.
                return (0,_wry_equality__WEBPACK_IMPORTED_MODULE_0__["default"])(aResultChild, bResultChild);
            }
            var aChildIsArray = Array.isArray(aResultChild);
            var bChildIsArray = Array.isArray(bResultChild);
            if (aChildIsArray !== bChildIsArray)
                return false;
            if (aChildIsArray && bChildIsArray) {
                var length_1 = aResultChild.length;
                if (bResultChild.length !== length_1) {
                    return false;
                }
                for (var i = 0; i < length_1; ++i) {
                    if (!equalBySelectionSet(childSelectionSet, aResultChild[i], bResultChild[i], context)) {
                        return false;
                    }
                }
                return true;
            }
            return equalBySelectionSet(childSelectionSet, aResultChild, bResultChild, context);
        }
        else {
            var fragment = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_3__.getFragmentFromSelection)(selection, context.fragmentMap);
            if (fragment) {
                // The fragment might === selection if it's an inline fragment, but
                // could be !== if it's a named fragment ...spread.
                if (selectionHasNonreactiveDirective(fragment))
                    return true;
                return equalBySelectionSet(fragment.selectionSet, 
                // Notice that we reuse the same aResult and bResult values here,
                // since the fragment ...spread does not specify a field name, but
                // consists of multiple fields (within the fragment's selection set)
                // that should be applied to the current result value(s).
                aResult, bResult, context);
            }
        }
    });
}
function selectionHasNonreactiveDirective(selection) {
    return (!!selection.directives && selection.directives.some(directiveIsNonreactive));
}
function directiveIsNonreactive(dir) {
    return dir.name.value === "nonreactive";
}
//# sourceMappingURL=equalByQuery.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/core/networkStatus.js":
/*!***********************************************************!*\
  !*** ./node_modules/@apollo/client/core/networkStatus.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NetworkStatus: () => (/* binding */ NetworkStatus),
/* harmony export */   isNetworkRequestInFlight: () => (/* binding */ isNetworkRequestInFlight),
/* harmony export */   isNetworkRequestSettled: () => (/* binding */ isNetworkRequestSettled)
/* harmony export */ });
/**
 * The current status of a query’s execution in our system.
 */
var NetworkStatus;
(function (NetworkStatus) {
    /**
     * The query has never been run before and the query is now currently running. A query will still
     * have this network status even if a partial data result was returned from the cache, but a
     * query was dispatched anyway.
     */
    NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
    /**
     * If `setVariables` was called and a query was fired because of that then the network status
     * will be `setVariables` until the result of that query comes back.
     */
    NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
    /**
     * Indicates that `fetchMore` was called on this query and that the query created is currently in
     * flight.
     */
    NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
    /**
     * Similar to the `setVariables` network status. It means that `refetch` was called on a query
     * and the refetch request is currently in flight.
     */
    NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
    /**
     * Indicates that a polling query is currently in flight. So for example if you are polling a
     * query every 10 seconds then the network status will switch to `poll` every 10 seconds whenever
     * a poll request has been sent but not resolved.
     */
    NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
    /**
     * No request is in flight for this query, and no errors happened. Everything is OK.
     */
    NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
    /**
     * No request is in flight for this query, but one or more errors were detected.
     */
    NetworkStatus[NetworkStatus["error"] = 8] = "error";
})(NetworkStatus || (NetworkStatus = {}));
/**
 * Returns true if there is currently a network request in flight according to a given network
 * status.
 */
function isNetworkRequestInFlight(networkStatus) {
    return networkStatus ? networkStatus < 7 : false;
}
/**
 * Returns true if the network request is in ready or error state according to a given network
 * status.
 */
function isNetworkRequestSettled(networkStatus) {
    return networkStatus === 7 || networkStatus === 8;
}
//# sourceMappingURL=networkStatus.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/errors/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/@apollo/client/errors/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApolloError: () => (/* binding */ ApolloError),
/* harmony export */   PROTOCOL_ERRORS_SYMBOL: () => (/* binding */ PROTOCOL_ERRORS_SYMBOL),
/* harmony export */   graphQLResultHasProtocolErrors: () => (/* binding */ graphQLResultHasProtocolErrors),
/* harmony export */   isApolloError: () => (/* binding */ isApolloError)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/objects.js");



// This Symbol allows us to pass transport-specific errors from the link chain
// into QueryManager/client internals without risking a naming collision within
// extensions (which implementers can use as they see fit).
var PROTOCOL_ERRORS_SYMBOL = Symbol();
function graphQLResultHasProtocolErrors(result) {
    if (result.extensions) {
        return Array.isArray(result.extensions[PROTOCOL_ERRORS_SYMBOL]);
    }
    return false;
}
function isApolloError(err) {
    return err.hasOwnProperty("graphQLErrors");
}
// Sets the error message on this error according to the
// the GraphQL and network errors that are present.
// If the error message has already been set through the
// constructor or otherwise, this function is a nop.
var generateErrorMessage = function (err) {
    var errors = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([], err.graphQLErrors, true), err.clientErrors, true), err.protocolErrors, true);
    if (err.networkError)
        errors.push(err.networkError);
    return (errors
        // The rest of the code sometimes unsafely types non-Error objects as GraphQLErrors
        .map(function (err) {
        return ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.isNonNullObject)(err) && err.message) || "Error message not found.";
    })
        .join("\n"));
};
var ApolloError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(ApolloError, _super);
    // Constructs an instance of ApolloError given serialized GraphQL errors,
    // client errors, protocol errors or network errors.
    // Note that one of these has to be a valid
    // value or the constructed error will be meaningless.
    function ApolloError(_a) {
        var graphQLErrors = _a.graphQLErrors, protocolErrors = _a.protocolErrors, clientErrors = _a.clientErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.name = "ApolloError";
        _this.graphQLErrors = graphQLErrors || [];
        _this.protocolErrors = protocolErrors || [];
        _this.clientErrors = clientErrors || [];
        _this.networkError = networkError || null;
        _this.message = errorMessage || generateErrorMessage(_this);
        _this.extraInfo = extraInfo;
        _this.cause =
            (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([
                networkError
            ], (graphQLErrors || []), true), (protocolErrors || []), true), (clientErrors || []), true).find(function (e) { return !!e; }) || null;
        // We're not using `Object.setPrototypeOf` here as it isn't fully
        // supported on Android (see issue #3236).
        _this.__proto__ = ApolloError.prototype;
        return _this;
    }
    return ApolloError;
}(Error));

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/core/ApolloLink.js":
/*!*************************************************************!*\
  !*** ./node_modules/@apollo/client/link/core/ApolloLink.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApolloLink: () => (/* binding */ ApolloLink)
/* harmony export */ });
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/zen-observable-ts/module.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/@apollo/client/link/utils/createOperation.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/@apollo/client/link/utils/transformOperation.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/@apollo/client/link/utils/validateOperation.js");



function passthrough(op, forward) {
    return (forward ? forward(op) : _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of());
}
function toLink(handler) {
    return typeof handler === "function" ? new ApolloLink(handler) : handler;
}
function isTerminating(link) {
    return link.request.length <= 1;
}
var ApolloLink = /** @class */ (function () {
    function ApolloLink(request) {
        if (request)
            this.request = request;
    }
    ApolloLink.empty = function () {
        return new ApolloLink(function () { return _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of(); });
    };
    ApolloLink.from = function (links) {
        if (links.length === 0)
            return ApolloLink.empty();
        return links.map(toLink).reduce(function (x, y) { return x.concat(y); });
    };
    ApolloLink.split = function (test, left, right) {
        var leftLink = toLink(left);
        var rightLink = toLink(right || new ApolloLink(passthrough));
        var ret;
        if (isTerminating(leftLink) && isTerminating(rightLink)) {
            ret = new ApolloLink(function (operation) {
                return test(operation) ?
                    leftLink.request(operation) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of()
                    : rightLink.request(operation) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of();
            });
        }
        else {
            ret = new ApolloLink(function (operation, forward) {
                return test(operation) ?
                    leftLink.request(operation, forward) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of()
                    : rightLink.request(operation, forward) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of();
            });
        }
        return Object.assign(ret, { left: leftLink, right: rightLink });
    };
    ApolloLink.execute = function (link, operation) {
        return (link.request((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_2__.createOperation)(operation.context, (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_3__.transformOperation)((0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.validateOperation)(operation)))) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of());
    };
    ApolloLink.concat = function (first, second) {
        var firstLink = toLink(first);
        if (isTerminating(firstLink)) {
            globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(36, firstLink);
            return firstLink;
        }
        var nextLink = toLink(second);
        var ret;
        if (isTerminating(nextLink)) {
            ret = new ApolloLink(function (operation) {
                return firstLink.request(operation, function (op) { return nextLink.request(op) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of(); }) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of();
            });
        }
        else {
            ret = new ApolloLink(function (operation, forward) {
                return (firstLink.request(operation, function (op) {
                    return nextLink.request(op, forward) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of();
                }) || _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.Observable.of());
            });
        }
        return Object.assign(ret, { left: firstLink, right: nextLink });
    };
    ApolloLink.prototype.split = function (test, left, right) {
        return this.concat(ApolloLink.split(test, left, right || new ApolloLink(passthrough)));
    };
    ApolloLink.prototype.concat = function (next) {
        return ApolloLink.concat(this, next);
    };
    ApolloLink.prototype.request = function (operation, forward) {
        throw (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(37);
    };
    ApolloLink.prototype.onError = function (error, observer) {
        if (observer && observer.error) {
            observer.error(error);
            // Returning false indicates that observer.error does not need to be
            // called again, since it was already called (on the previous line).
            // Calling observer.error again would not cause any real problems,
            // since only the first call matters, but custom onError functions
            // might have other reasons for wanting to prevent the default
            // behavior by returning false.
            return false;
        }
        // Throw errors will be passed to observer.error.
        throw error;
    };
    ApolloLink.prototype.setOnError = function (fn) {
        this.onError = fn;
        return this;
    };
    return ApolloLink;
}());

//# sourceMappingURL=ApolloLink.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/core/execute.js":
/*!**********************************************************!*\
  !*** ./node_modules/@apollo/client/link/core/execute.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   execute: () => (/* binding */ execute)
/* harmony export */ });
/* harmony import */ var _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApolloLink.js */ "./node_modules/@apollo/client/link/core/ApolloLink.js");

var execute = _ApolloLink_js__WEBPACK_IMPORTED_MODULE_0__.ApolloLink.execute;
//# sourceMappingURL=execute.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/HttpLink.js":
/*!***********************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/HttpLink.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpLink: () => (/* binding */ HttpLink)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/@apollo/client/link/core/ApolloLink.js");
/* harmony import */ var _createHttpLink_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createHttpLink.js */ "./node_modules/@apollo/client/link/http/createHttpLink.js");



var HttpLink = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(HttpLink, _super);
    function HttpLink(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, (0,_createHttpLink_js__WEBPACK_IMPORTED_MODULE_1__.createHttpLink)(options).request) || this;
        _this.options = options;
        return _this;
    }
    return HttpLink;
}(_core_index_js__WEBPACK_IMPORTED_MODULE_2__.ApolloLink));

//# sourceMappingURL=HttpLink.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/checkFetcher.js":
/*!***************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/checkFetcher.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkFetcher: () => (/* binding */ checkFetcher)
/* harmony export */ });
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");

var checkFetcher = function (fetcher) {
    if (!fetcher && typeof fetch === "undefined") {
        throw (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(38);
    }
};
//# sourceMappingURL=checkFetcher.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/createHttpLink.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/createHttpLink.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHttpLink: () => (/* binding */ createHttpLink)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/@apollo/client/link/core/ApolloLink.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/directives.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/zen-observable-ts/module.js");
/* harmony import */ var _serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./serializeFetchParameter.js */ "./node_modules/@apollo/client/link/http/serializeFetchParameter.js");
/* harmony import */ var _selectURI_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selectURI.js */ "./node_modules/@apollo/client/link/http/selectURI.js");
/* harmony import */ var _parseAndCheckHttpResponse_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./parseAndCheckHttpResponse.js */ "./node_modules/@apollo/client/link/http/parseAndCheckHttpResponse.js");
/* harmony import */ var _checkFetcher_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkFetcher.js */ "./node_modules/@apollo/client/link/http/checkFetcher.js");
/* harmony import */ var _selectHttpOptionsAndBody_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectHttpOptionsAndBody.js */ "./node_modules/@apollo/client/link/http/selectHttpOptionsAndBody.js");
/* harmony import */ var _rewriteURIForGET_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./rewriteURIForGET.js */ "./node_modules/@apollo/client/link/http/rewriteURIForGET.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/@apollo/client/link/utils/fromError.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/@apollo/client/link/utils/filterOperationVariables.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/transform.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");












var backupFetch = (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.maybe)(function () { return fetch; });
var createHttpLink = function (linkOptions) {
    if (linkOptions === void 0) { linkOptions = {}; }
    var _a = linkOptions.uri, uri = _a === void 0 ? "/graphql" : _a, 
    // use default global fetch if nothing passed in
    preferredFetch = linkOptions.fetch, _b = linkOptions.print, print = _b === void 0 ? _selectHttpOptionsAndBody_js__WEBPACK_IMPORTED_MODULE_1__.defaultPrinter : _b, includeExtensions = linkOptions.includeExtensions, preserveHeaderCase = linkOptions.preserveHeaderCase, useGETForQueries = linkOptions.useGETForQueries, _c = linkOptions.includeUnusedVariables, includeUnusedVariables = _c === void 0 ? false : _c, requestOptions = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__rest)(linkOptions, ["uri", "fetch", "print", "includeExtensions", "preserveHeaderCase", "useGETForQueries", "includeUnusedVariables"]);
    if (globalThis.__DEV__ !== false) {
        // Make sure at least one of preferredFetch, window.fetch, or backupFetch is
        // defined, so requests won't fail at runtime.
        (0,_checkFetcher_js__WEBPACK_IMPORTED_MODULE_3__.checkFetcher)(preferredFetch || backupFetch);
    }
    var linkConfig = {
        http: { includeExtensions: includeExtensions, preserveHeaderCase: preserveHeaderCase },
        options: requestOptions.fetchOptions,
        credentials: requestOptions.credentials,
        headers: requestOptions.headers,
    };
    return new _core_index_js__WEBPACK_IMPORTED_MODULE_4__.ApolloLink(function (operation) {
        var chosenURI = (0,_selectURI_js__WEBPACK_IMPORTED_MODULE_5__.selectURI)(operation, uri);
        var context = operation.getContext();
        // `apollographql-client-*` headers are automatically set if a
        // `clientAwareness` object is found in the context. These headers are
        // set first, followed by the rest of the headers pulled from
        // `context.headers`. If desired, `apollographql-client-*` headers set by
        // the `clientAwareness` object can be overridden by
        // `apollographql-client-*` headers set in `context.headers`.
        var clientAwarenessHeaders = {};
        if (context.clientAwareness) {
            var _a = context.clientAwareness, name_1 = _a.name, version = _a.version;
            if (name_1) {
                clientAwarenessHeaders["apollographql-client-name"] = name_1;
            }
            if (version) {
                clientAwarenessHeaders["apollographql-client-version"] = version;
            }
        }
        var contextHeaders = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, clientAwarenessHeaders), context.headers);
        var contextConfig = {
            http: context.http,
            options: context.fetchOptions,
            credentials: context.credentials,
            headers: contextHeaders,
        };
        if ((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_6__.hasDirectives)(["client"], operation.query)) {
            var transformedQuery = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_7__.removeClientSetsFromDocument)(operation.query);
            if (!transformedQuery) {
                return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_8__.fromError)(new Error("HttpLink: Trying to send a client-only query to the server. To send to the server, ensure a non-client field is added to the query or set the `transformOptions.removeClientFields` option to `true`."));
            }
            operation.query = transformedQuery;
        }
        //uses fallback, link, and then context to build options
        var _b = (0,_selectHttpOptionsAndBody_js__WEBPACK_IMPORTED_MODULE_1__.selectHttpOptionsAndBodyInternal)(operation, print, _selectHttpOptionsAndBody_js__WEBPACK_IMPORTED_MODULE_1__.fallbackHttpConfig, linkConfig, contextConfig), options = _b.options, body = _b.body;
        if (body.variables && !includeUnusedVariables) {
            body.variables = (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_9__.filterOperationVariables)(body.variables, operation.query);
        }
        var controller;
        if (!options.signal && typeof AbortController !== "undefined") {
            controller = new AbortController();
            options.signal = controller.signal;
        }
        // If requested, set method to GET if there are no mutations.
        var definitionIsMutation = function (d) {
            return d.kind === "OperationDefinition" && d.operation === "mutation";
        };
        var definitionIsSubscription = function (d) {
            return d.kind === "OperationDefinition" && d.operation === "subscription";
        };
        var isSubscription = definitionIsSubscription((0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_10__.getMainDefinition)(operation.query));
        // does not match custom directives beginning with @defer
        var hasDefer = (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_6__.hasDirectives)(["defer"], operation.query);
        if (useGETForQueries &&
            !operation.query.definitions.some(definitionIsMutation)) {
            options.method = "GET";
        }
        if (hasDefer || isSubscription) {
            options.headers = options.headers || {};
            var acceptHeader = "multipart/mixed;";
            // Omit defer-specific headers if the user attempts to defer a selection
            // set on a subscription and log a warning.
            if (isSubscription && hasDefer) {
                globalThis.__DEV__ !== false && _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(39);
            }
            if (isSubscription) {
                acceptHeader +=
                    "boundary=graphql;subscriptionSpec=1.0,application/json";
            }
            else if (hasDefer) {
                acceptHeader += "deferSpec=20220824,application/json";
            }
            options.headers.accept = acceptHeader;
        }
        if (options.method === "GET") {
            var _c = (0,_rewriteURIForGET_js__WEBPACK_IMPORTED_MODULE_11__.rewriteURIForGET)(chosenURI, body), newURI = _c.newURI, parseError = _c.parseError;
            if (parseError) {
                return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_8__.fromError)(parseError);
            }
            chosenURI = newURI;
        }
        else {
            try {
                options.body = (0,_serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_12__.serializeFetchParameter)(body, "Payload");
            }
            catch (parseError) {
                return (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_8__.fromError)(parseError);
            }
        }
        return new _utilities_index_js__WEBPACK_IMPORTED_MODULE_13__.Observable(function (observer) {
            // Prefer linkOptions.fetch (preferredFetch) if provided, and otherwise
            // fall back to the *current* global window.fetch function (see issue
            // #7832), or (if all else fails) the backupFetch function we saved when
            // this module was first evaluated. This last option protects against the
            // removal of window.fetch, which is unlikely but not impossible.
            var currentFetch = preferredFetch || (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.maybe)(function () { return fetch; }) || backupFetch;
            var observerNext = observer.next.bind(observer);
            currentFetch(chosenURI, options)
                .then(function (response) {
                var _a;
                operation.setContext({ response: response });
                var ctype = (_a = response.headers) === null || _a === void 0 ? void 0 : _a.get("content-type");
                if (ctype !== null && /^multipart\/mixed/i.test(ctype)) {
                    return (0,_parseAndCheckHttpResponse_js__WEBPACK_IMPORTED_MODULE_14__.readMultipartBody)(response, observerNext);
                }
                else {
                    return (0,_parseAndCheckHttpResponse_js__WEBPACK_IMPORTED_MODULE_14__.parseAndCheckHttpResponse)(operation)(response).then(observerNext);
                }
            })
                .then(function () {
                controller = undefined;
                observer.complete();
            })
                .catch(function (err) {
                controller = undefined;
                (0,_parseAndCheckHttpResponse_js__WEBPACK_IMPORTED_MODULE_14__.handleError)(err, observer);
            });
            return function () {
                // XXX support canceling this request
                // https://developers.google.com/web/updates/2017/09/abortable-fetch
                if (controller)
                    controller.abort();
            };
        });
    });
};
//# sourceMappingURL=createHttpLink.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/iterators/async.js":
/*!******************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/iterators/async.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ asyncIterator)
/* harmony export */ });
/**
 * Original source:
 * https://github.com/kmalakoff/response-iterator/blob/master/src/iterators/async.ts
 */
function asyncIterator(source) {
    var _a;
    var iterator = source[Symbol.asyncIterator]();
    return _a = {
            next: function () {
                return iterator.next();
            }
        },
        _a[Symbol.asyncIterator] = function () {
            return this;
        },
        _a;
}
//# sourceMappingURL=async.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/iterators/nodeStream.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/iterators/nodeStream.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ nodeStreamIterator)
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");
/**
 * Original source:
 * https://github.com/kmalakoff/response-iterator/blob/master/src/iterators/nodeStream.ts
 */

function nodeStreamIterator(stream) {
    var cleanup = null;
    var error = null;
    var done = false;
    var data = [];
    var waiting = [];
    function onData(chunk) {
        if (error)
            return;
        if (waiting.length) {
            var shiftedArr = waiting.shift();
            if (Array.isArray(shiftedArr) && shiftedArr[0]) {
                return shiftedArr[0]({ value: chunk, done: false });
            }
        }
        data.push(chunk);
    }
    function onError(err) {
        error = err;
        var all = waiting.slice();
        all.forEach(function (pair) {
            pair[1](err);
        });
        !cleanup || cleanup();
    }
    function onEnd() {
        done = true;
        var all = waiting.slice();
        all.forEach(function (pair) {
            pair[0]({ value: undefined, done: true });
        });
        !cleanup || cleanup();
    }
    cleanup = function () {
        cleanup = null;
        stream.removeListener("data", onData);
        stream.removeListener("error", onError);
        stream.removeListener("end", onEnd);
        stream.removeListener("finish", onEnd);
        stream.removeListener("close", onEnd);
    };
    stream.on("data", onData);
    stream.on("error", onError);
    stream.on("end", onEnd);
    stream.on("finish", onEnd);
    stream.on("close", onEnd);
    function getNext() {
        return new Promise(function (resolve, reject) {
            if (error)
                return reject(error);
            if (data.length)
                return resolve({ value: data.shift(), done: false });
            if (done)
                return resolve({ value: undefined, done: true });
            waiting.push([resolve, reject]);
        });
    }
    var iterator = {
        next: function () {
            return getNext();
        },
    };
    if (_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.canUseAsyncIteratorSymbol) {
        iterator[Symbol.asyncIterator] = function () {
            return this;
        };
    }
    return iterator;
}
//# sourceMappingURL=nodeStream.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/iterators/promise.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/iterators/promise.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ promiseIterator)
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");
/**
 * Original source:
 * https://github.com/kmalakoff/response-iterator/blob/master/src/iterators/promise.ts
 */

function promiseIterator(promise) {
    var resolved = false;
    var iterator = {
        next: function () {
            if (resolved)
                return Promise.resolve({
                    value: undefined,
                    done: true,
                });
            resolved = true;
            return new Promise(function (resolve, reject) {
                promise
                    .then(function (value) {
                    resolve({ value: value, done: false });
                })
                    .catch(reject);
            });
        },
    };
    if (_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.canUseAsyncIteratorSymbol) {
        iterator[Symbol.asyncIterator] = function () {
            return this;
        };
    }
    return iterator;
}
//# sourceMappingURL=promise.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/iterators/reader.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/iterators/reader.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ readerIterator)
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");
/**
 * Original source:
 * https://github.com/kmalakoff/response-iterator/blob/master/src/iterators/reader.ts
 */

function readerIterator(reader) {
    var iterator = {
        next: function () {
            return reader.read();
        },
    };
    if (_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.canUseAsyncIteratorSymbol) {
        iterator[Symbol.asyncIterator] = function () {
            return this;
        };
    }
    return iterator;
}
//# sourceMappingURL=reader.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/parseAndCheckHttpResponse.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/parseAndCheckHttpResponse.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleError: () => (/* binding */ handleError),
/* harmony export */   parseAndCheckHttpResponse: () => (/* binding */ parseAndCheckHttpResponse),
/* harmony export */   parseHeaders: () => (/* binding */ parseHeaders),
/* harmony export */   parseJsonBody: () => (/* binding */ parseJsonBody),
/* harmony export */   readMultipartBody: () => (/* binding */ readMultipartBody)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _responseIterator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./responseIterator.js */ "./node_modules/@apollo/client/link/http/responseIterator.js");
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/index.js */ "./node_modules/@apollo/client/link/utils/throwServerError.js");
/* harmony import */ var _errors_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../errors/index.js */ "./node_modules/@apollo/client/errors/index.js");
/* harmony import */ var _utilities_common_incrementalResult_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/common/incrementalResult.js */ "./node_modules/@apollo/client/utilities/common/incrementalResult.js");





var hasOwnProperty = Object.prototype.hasOwnProperty;
function readMultipartBody(response, nextValue) {
    return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function () {
        var decoder, contentType, delimiter, boundaryVal, boundary, buffer, iterator, running, _a, value, done, chunk, searchFrom, bi, message, i, headers, contentType_1, body, result, next;
        var _b, _c;
        var _d;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__generator)(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (TextDecoder === undefined) {
                        throw new Error("TextDecoder must be defined in the environment: please import a polyfill.");
                    }
                    decoder = new TextDecoder("utf-8");
                    contentType = (_d = response.headers) === null || _d === void 0 ? void 0 : _d.get("content-type");
                    delimiter = "boundary=";
                    boundaryVal = (contentType === null || contentType === void 0 ? void 0 : contentType.includes(delimiter)) ?
                        contentType === null || contentType === void 0 ? void 0 : contentType.substring((contentType === null || contentType === void 0 ? void 0 : contentType.indexOf(delimiter)) + delimiter.length).replace(/['"]/g, "").replace(/\;(.*)/gm, "").trim()
                        : "-";
                    boundary = "\r\n--".concat(boundaryVal);
                    buffer = "";
                    iterator = (0,_responseIterator_js__WEBPACK_IMPORTED_MODULE_1__.responseIterator)(response);
                    running = true;
                    _e.label = 1;
                case 1:
                    if (!running) return [3 /*break*/, 3];
                    return [4 /*yield*/, iterator.next()];
                case 2:
                    _a = _e.sent(), value = _a.value, done = _a.done;
                    chunk = typeof value === "string" ? value : decoder.decode(value);
                    searchFrom = buffer.length - boundary.length + 1;
                    running = !done;
                    buffer += chunk;
                    bi = buffer.indexOf(boundary, searchFrom);
                    while (bi > -1) {
                        message = void 0;
                        _b = [
                            buffer.slice(0, bi),
                            buffer.slice(bi + boundary.length),
                        ], message = _b[0], buffer = _b[1];
                        i = message.indexOf("\r\n\r\n");
                        headers = parseHeaders(message.slice(0, i));
                        contentType_1 = headers["content-type"];
                        if (contentType_1 &&
                            contentType_1.toLowerCase().indexOf("application/json") === -1) {
                            throw new Error("Unsupported patch content type: application/json is required.");
                        }
                        body = message.slice(i);
                        if (body) {
                            result = parseJsonBody(response, body);
                            if (Object.keys(result).length > 1 ||
                                "data" in result ||
                                "incremental" in result ||
                                "errors" in result ||
                                "payload" in result) {
                                if ((0,_utilities_common_incrementalResult_js__WEBPACK_IMPORTED_MODULE_2__.isApolloPayloadResult)(result)) {
                                    next = {};
                                    if ("payload" in result) {
                                        if (Object.keys(result).length === 1 && result.payload === null) {
                                            return [2 /*return*/];
                                        }
                                        next = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, result.payload);
                                    }
                                    if ("errors" in result) {
                                        next = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, next), { extensions: (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, ("extensions" in next ? next.extensions : null)), (_c = {}, _c[_errors_index_js__WEBPACK_IMPORTED_MODULE_3__.PROTOCOL_ERRORS_SYMBOL] = result.errors, _c)) });
                                    }
                                    nextValue(next);
                                }
                                else {
                                    // for the last chunk with only `hasNext: false`
                                    // we don't need to call observer.next as there is no data/errors
                                    nextValue(result);
                                }
                            }
                            else if (
                            // If the chunk contains only a "hasNext: false", we can call
                            // observer.complete() immediately.
                            Object.keys(result).length === 1 &&
                                "hasNext" in result &&
                                !result.hasNext) {
                                return [2 /*return*/];
                            }
                        }
                        bi = buffer.indexOf(boundary);
                    }
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function parseHeaders(headerText) {
    var headersInit = {};
    headerText.split("\n").forEach(function (line) {
        var i = line.indexOf(":");
        if (i > -1) {
            // normalize headers to lowercase
            var name_1 = line.slice(0, i).trim().toLowerCase();
            var value = line.slice(i + 1).trim();
            headersInit[name_1] = value;
        }
    });
    return headersInit;
}
function parseJsonBody(response, bodyText) {
    if (response.status >= 300) {
        // Network error
        var getResult = function () {
            try {
                return JSON.parse(bodyText);
            }
            catch (err) {
                return bodyText;
            }
        };
        (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.throwServerError)(response, getResult(), "Response not successful: Received status code ".concat(response.status));
    }
    try {
        return JSON.parse(bodyText);
    }
    catch (err) {
        var parseError = err;
        parseError.name = "ServerParseError";
        parseError.response = response;
        parseError.statusCode = response.status;
        parseError.bodyText = bodyText;
        throw parseError;
    }
}
function handleError(err, observer) {
    // if it is a network error, BUT there is graphql result info fire
    // the next observer before calling error this gives apollo-client
    // (and react-apollo) the `graphqlErrors` and `networkErrors` to
    // pass to UI this should only happen if we *also* have data as
    // part of the response key per the spec
    if (err.result && err.result.errors && err.result.data) {
        // if we don't call next, the UI can only show networkError
        // because AC didn't get any graphqlErrors this is graphql
        // execution result info (i.e errors and possibly data) this is
        // because there is no formal spec how errors should translate to
        // http status codes. So an auth error (401) could have both data
        // from a public field, errors from a private field, and a status
        // of 401
        // {
        //  user { // this will have errors
        //    firstName
        //  }
        //  products { // this is public so will have data
        //    cost
        //  }
        // }
        //
        // the result of above *could* look like this:
        // {
        //   data: { products: [{ cost: "$10" }] },
        //   errors: [{
        //      message: 'your session has timed out',
        //      path: []
        //   }]
        // }
        // status code of above would be a 401
        // in the UI you want to show data where you can, errors as data where you can
        // and use correct http status codes
        observer.next(err.result);
    }
    observer.error(err);
}
function parseAndCheckHttpResponse(operations) {
    return function (response) {
        return response
            .text()
            .then(function (bodyText) { return parseJsonBody(response, bodyText); })
            .then(function (result) {
            if (!Array.isArray(result) &&
                !hasOwnProperty.call(result, "data") &&
                !hasOwnProperty.call(result, "errors")) {
                // Data error
                (0,_utils_index_js__WEBPACK_IMPORTED_MODULE_4__.throwServerError)(response, result, "Server response was missing for query '".concat(Array.isArray(operations) ?
                    operations.map(function (op) { return op.operationName; })
                    : operations.operationName, "'."));
            }
            return result;
        });
    };
}
//# sourceMappingURL=parseAndCheckHttpResponse.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/responseIterator.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/responseIterator.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   responseIterator: () => (/* binding */ responseIterator)
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");
/* harmony import */ var _iterators_async_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterators/async.js */ "./node_modules/@apollo/client/link/http/iterators/async.js");
/* harmony import */ var _iterators_nodeStream_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./iterators/nodeStream.js */ "./node_modules/@apollo/client/link/http/iterators/nodeStream.js");
/* harmony import */ var _iterators_promise_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./iterators/promise.js */ "./node_modules/@apollo/client/link/http/iterators/promise.js");
/* harmony import */ var _iterators_reader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./iterators/reader.js */ "./node_modules/@apollo/client/link/http/iterators/reader.js");
/**
 * Original source:
 * https://github.com/kmalakoff/response-iterator/blob/master/src/index.ts
 */





function isNodeResponse(value) {
    return !!value.body;
}
function isReadableStream(value) {
    return !!value.getReader;
}
function isAsyncIterableIterator(value) {
    return !!(_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.canUseAsyncIteratorSymbol &&
        value[Symbol.asyncIterator]);
}
function isStreamableBlob(value) {
    return !!value.stream;
}
function isBlob(value) {
    return !!value.arrayBuffer;
}
function isNodeReadableStream(value) {
    return !!value.pipe;
}
function responseIterator(response) {
    var body = response;
    if (isNodeResponse(response))
        body = response.body;
    if (isAsyncIterableIterator(body))
        return (0,_iterators_async_js__WEBPACK_IMPORTED_MODULE_1__["default"])(body);
    if (isReadableStream(body))
        return (0,_iterators_reader_js__WEBPACK_IMPORTED_MODULE_2__["default"])(body.getReader());
    // this errors without casting to ReadableStream<T>
    // because Blob.stream() returns a NodeJS ReadableStream
    if (isStreamableBlob(body)) {
        return (0,_iterators_reader_js__WEBPACK_IMPORTED_MODULE_2__["default"])(body.stream().getReader());
    }
    if (isBlob(body))
        return (0,_iterators_promise_js__WEBPACK_IMPORTED_MODULE_3__["default"])(body.arrayBuffer());
    if (isNodeReadableStream(body))
        return (0,_iterators_nodeStream_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body);
    throw new Error("Unknown body type for responseIterator. Please pass a streamable response.");
}
//# sourceMappingURL=responseIterator.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/rewriteURIForGET.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/rewriteURIForGET.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rewriteURIForGET: () => (/* binding */ rewriteURIForGET)
/* harmony export */ });
/* harmony import */ var _serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serializeFetchParameter.js */ "./node_modules/@apollo/client/link/http/serializeFetchParameter.js");

// For GET operations, returns the given URI rewritten with parameters, or a
// parse error.
function rewriteURIForGET(chosenURI, body) {
    // Implement the standard HTTP GET serialization, plus 'extensions'. Note
    // the extra level of JSON serialization!
    var queryParams = [];
    var addQueryParam = function (key, value) {
        queryParams.push("".concat(key, "=").concat(encodeURIComponent(value)));
    };
    if ("query" in body) {
        addQueryParam("query", body.query);
    }
    if (body.operationName) {
        addQueryParam("operationName", body.operationName);
    }
    if (body.variables) {
        var serializedVariables = void 0;
        try {
            serializedVariables = (0,_serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_0__.serializeFetchParameter)(body.variables, "Variables map");
        }
        catch (parseError) {
            return { parseError: parseError };
        }
        addQueryParam("variables", serializedVariables);
    }
    if (body.extensions) {
        var serializedExtensions = void 0;
        try {
            serializedExtensions = (0,_serializeFetchParameter_js__WEBPACK_IMPORTED_MODULE_0__.serializeFetchParameter)(body.extensions, "Extensions map");
        }
        catch (parseError) {
            return { parseError: parseError };
        }
        addQueryParam("extensions", serializedExtensions);
    }
    // Reconstruct the URI with added query params.
    // XXX This assumes that the URI is well-formed and that it doesn't
    //     already contain any of these query params. We could instead use the
    //     URL API and take a polyfill (whatwg-url@6) for older browsers that
    //     don't support URLSearchParams. Note that some browsers (and
    //     versions of whatwg-url) support URL but not URLSearchParams!
    var fragment = "", preFragment = chosenURI;
    var fragmentStart = chosenURI.indexOf("#");
    if (fragmentStart !== -1) {
        fragment = chosenURI.substr(fragmentStart);
        preFragment = chosenURI.substr(0, fragmentStart);
    }
    var queryParamsPrefix = preFragment.indexOf("?") === -1 ? "?" : "&";
    var newURI = preFragment + queryParamsPrefix + queryParams.join("&") + fragment;
    return { newURI: newURI };
}
//# sourceMappingURL=rewriteURIForGET.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/selectHttpOptionsAndBody.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/selectHttpOptionsAndBody.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultPrinter: () => (/* binding */ defaultPrinter),
/* harmony export */   fallbackHttpConfig: () => (/* binding */ fallbackHttpConfig),
/* harmony export */   selectHttpOptionsAndBody: () => (/* binding */ selectHttpOptionsAndBody),
/* harmony export */   selectHttpOptionsAndBodyInternal: () => (/* binding */ selectHttpOptionsAndBodyInternal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/print.js");


var defaultHttpOptions = {
    includeQuery: true,
    includeExtensions: false,
    preserveHeaderCase: false,
};
var defaultHeaders = {
    // headers are case insensitive (https://stackoverflow.com/a/5259004)
    accept: "*/*",
    // The content-type header describes the type of the body of the request, and
    // so it typically only is sent with requests that actually have bodies. One
    // could imagine that Apollo Client would remove this header when constructing
    // a GET request (which has no body), but we historically have not done that.
    // This means that browsers will preflight all Apollo Client requests (even
    // GET requests). Apollo Server's CSRF prevention feature (introduced in
    // AS3.7) takes advantage of this fact and does not block requests with this
    // header. If you want to drop this header from GET requests, then you should
    // probably replace it with a `apollo-require-preflight` header, or servers
    // with CSRF prevention enabled might block your GET request. See
    // https://www.apollographql.com/docs/apollo-server/security/cors/#preventing-cross-site-request-forgery-csrf
    // for more details.
    "content-type": "application/json",
};
var defaultOptions = {
    method: "POST",
};
var fallbackHttpConfig = {
    http: defaultHttpOptions,
    headers: defaultHeaders,
    options: defaultOptions,
};
var defaultPrinter = function (ast, printer) { return printer(ast); };
function selectHttpOptionsAndBody(operation, fallbackConfig) {
    var configs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        configs[_i - 2] = arguments[_i];
    }
    configs.unshift(fallbackConfig);
    return selectHttpOptionsAndBodyInternal.apply(void 0, (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__spreadArray)([operation,
        defaultPrinter], configs, false));
}
function selectHttpOptionsAndBodyInternal(operation, printer) {
    var configs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        configs[_i - 2] = arguments[_i];
    }
    var options = {};
    var http = {};
    configs.forEach(function (config) {
        options = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, options), config.options), { headers: (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, options.headers), config.headers) });
        if (config.credentials) {
            options.credentials = config.credentials;
        }
        http = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, http), config.http);
    });
    if (options.headers) {
        options.headers = removeDuplicateHeaders(options.headers, http.preserveHeaderCase);
    }
    //The body depends on the http options
    var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
    var body = { operationName: operationName, variables: variables };
    if (http.includeExtensions)
        body.extensions = extensions;
    // not sending the query (i.e persisted queries)
    if (http.includeQuery)
        body.query = printer(query, _utilities_index_js__WEBPACK_IMPORTED_MODULE_1__.print);
    return {
        options: options,
        body: body,
    };
}
// Remove potential duplicate header names, preserving last (by insertion order).
// This is done to prevent unintentionally duplicating a header instead of
// overwriting it (See #8447 and #8449).
function removeDuplicateHeaders(headers, preserveHeaderCase) {
    // If we're not preserving the case, just remove duplicates w/ normalization.
    if (!preserveHeaderCase) {
        var normalizedHeaders_1 = Object.create(null);
        Object.keys(Object(headers)).forEach(function (name) {
            normalizedHeaders_1[name.toLowerCase()] = headers[name];
        });
        return normalizedHeaders_1;
    }
    // If we are preserving the case, remove duplicates w/ normalization,
    // preserving the original name.
    // This allows for non-http-spec-compliant servers that expect intentionally
    // capitalized header names (See #6741).
    var headerData = Object.create(null);
    Object.keys(Object(headers)).forEach(function (name) {
        headerData[name.toLowerCase()] = {
            originalName: name,
            value: headers[name],
        };
    });
    var normalizedHeaders = Object.create(null);
    Object.keys(headerData).forEach(function (name) {
        normalizedHeaders[headerData[name].originalName] = headerData[name].value;
    });
    return normalizedHeaders;
}
//# sourceMappingURL=selectHttpOptionsAndBody.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/selectURI.js":
/*!************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/selectURI.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectURI: () => (/* binding */ selectURI)
/* harmony export */ });
var selectURI = function (operation, fallbackURI) {
    var context = operation.getContext();
    var contextURI = context.uri;
    if (contextURI) {
        return contextURI;
    }
    else if (typeof fallbackURI === "function") {
        return fallbackURI(operation);
    }
    else {
        return fallbackURI || "/graphql";
    }
};
//# sourceMappingURL=selectURI.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/http/serializeFetchParameter.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@apollo/client/link/http/serializeFetchParameter.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   serializeFetchParameter: () => (/* binding */ serializeFetchParameter)
/* harmony export */ });
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");

var serializeFetchParameter = function (p, label) {
    var serialized;
    try {
        serialized = JSON.stringify(p);
    }
    catch (e) {
        var parseError = (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(40, label, e.message);
        parseError.parseError = e;
        throw parseError;
    }
    return serialized;
};
//# sourceMappingURL=serializeFetchParameter.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/utils/createOperation.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apollo/client/link/utils/createOperation.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createOperation: () => (/* binding */ createOperation)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");

function createOperation(starting, operation) {
    var context = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, starting);
    var setContext = function (next) {
        if (typeof next === "function") {
            context = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, context), next(context));
        }
        else {
            context = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, context), next);
        }
    };
    var getContext = function () { return ((0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, context)); };
    Object.defineProperty(operation, "setContext", {
        enumerable: false,
        value: setContext,
    });
    Object.defineProperty(operation, "getContext", {
        enumerable: false,
        value: getContext,
    });
    return operation;
}
//# sourceMappingURL=createOperation.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/utils/filterOperationVariables.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@apollo/client/link/utils/filterOperationVariables.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filterOperationVariables: () => (/* binding */ filterOperationVariables)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/visitor.mjs");


function filterOperationVariables(variables, query) {
    var result = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__assign)({}, variables);
    var unusedNames = new Set(Object.keys(variables));
    (0,graphql__WEBPACK_IMPORTED_MODULE_1__.visit)(query, {
        Variable: function (node, _key, parent) {
            // A variable type definition at the top level of a query is not
            // enough to silence server-side errors about the variable being
            // unused, so variable definitions do not count as usage.
            // https://spec.graphql.org/draft/#sec-All-Variables-Used
            if (parent &&
                parent.kind !== "VariableDefinition") {
                unusedNames.delete(node.name.value);
            }
        },
    });
    unusedNames.forEach(function (name) {
        delete result[name];
    });
    return result;
}
//# sourceMappingURL=filterOperationVariables.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/utils/fromError.js":
/*!*************************************************************!*\
  !*** ./node_modules/@apollo/client/link/utils/fromError.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fromError: () => (/* binding */ fromError)
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/zen-observable-ts/module.js");

function fromError(errorValue) {
    return new _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.Observable(function (observer) {
        observer.error(errorValue);
    });
}
//# sourceMappingURL=fromError.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/utils/throwServerError.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apollo/client/link/utils/throwServerError.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   throwServerError: () => (/* binding */ throwServerError)
/* harmony export */ });
var throwServerError = function (response, result, message) {
    var error = new Error(message);
    error.name = "ServerError";
    error.response = response;
    error.statusCode = response.status;
    error.result = result;
    throw error;
};
//# sourceMappingURL=throwServerError.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/utils/transformOperation.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@apollo/client/link/utils/transformOperation.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformOperation: () => (/* binding */ transformOperation)
/* harmony export */ });
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");

function transformOperation(operation) {
    var transformedOperation = {
        variables: operation.variables || {},
        extensions: operation.extensions || {},
        operationName: operation.operationName,
        query: operation.query,
    };
    // Best guess at an operation name
    if (!transformedOperation.operationName) {
        transformedOperation.operationName =
            typeof transformedOperation.query !== "string" ?
                (0,_utilities_index_js__WEBPACK_IMPORTED_MODULE_0__.getOperationName)(transformedOperation.query) || undefined
                : "";
    }
    return transformedOperation;
}
//# sourceMappingURL=transformOperation.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/link/utils/validateOperation.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@apollo/client/link/utils/validateOperation.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateOperation: () => (/* binding */ validateOperation)
/* harmony export */ });
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");

function validateOperation(operation) {
    var OPERATION_FIELDS = [
        "query",
        "operationName",
        "variables",
        "extensions",
        "context",
    ];
    for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
        var key = _a[_i];
        if (OPERATION_FIELDS.indexOf(key) < 0) {
            throw (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(44, key);
        }
    }
    return operation;
}
//# sourceMappingURL=validateOperation.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/react/context/ApolloContext.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apollo/client/react/context/ApolloContext.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

var rehackt__WEBPACK_IMPORTED_MODULE_0___namespace_cache;
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getApolloContext: () => (/* binding */ getApolloContext),
/* harmony export */   resetApolloContext: () => (/* binding */ resetApolloContext)
/* harmony export */ });
/* harmony import */ var rehackt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rehackt */ "./node_modules/rehackt/index.js");
/* harmony import */ var _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utilities/index.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");



// To make sure Apollo Client doesn't create more than one React context
// (which can lead to problems like having an Apollo Client instance added
// in one context, then attempting to retrieve it from another different
// context), a single Apollo context is created and tracked in global state.
var contextKey = _utilities_index_js__WEBPACK_IMPORTED_MODULE_2__.canUseSymbol ? Symbol.for("__APOLLO_CONTEXT__") : "__APOLLO_CONTEXT__";
function getApolloContext() {
    (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_1__.invariant)("createContext" in /*#__PURE__*/ (rehackt__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (rehackt__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(rehackt__WEBPACK_IMPORTED_MODULE_0__, 2))), 46);
    var context = rehackt__WEBPACK_IMPORTED_MODULE_0__.createContext[contextKey];
    if (!context) {
        Object.defineProperty(rehackt__WEBPACK_IMPORTED_MODULE_0__.createContext, contextKey, {
            value: (context = rehackt__WEBPACK_IMPORTED_MODULE_0__.createContext({})),
            enumerable: false,
            writable: false,
            configurable: true,
        });
        context.displayName = "ApolloContext";
    }
    return context;
}
/**
 * @deprecated This function has no "resetting" effect since Apollo Client 3.4.12,
 * and will be removed in the next major version of Apollo Client.
 * If you want to get the Apollo Context, use `getApolloContext` instead.
 */
var resetApolloContext = getApolloContext;
//# sourceMappingURL=ApolloContext.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/react/context/ApolloProvider.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@apollo/client/react/context/ApolloProvider.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApolloProvider: () => (/* binding */ ApolloProvider)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var rehackt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rehackt */ "./node_modules/rehackt/index.js");
/* harmony import */ var _ApolloContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ApolloContext.js */ "./node_modules/@apollo/client/react/context/ApolloContext.js");




var ApolloProvider = function (_a) {
    var client = _a.client, children = _a.children;
    var ApolloContext = (0,_ApolloContext_js__WEBPACK_IMPORTED_MODULE_2__.getApolloContext)();
    var parentContext = rehackt__WEBPACK_IMPORTED_MODULE_1__.useContext(ApolloContext);
    var context = rehackt__WEBPACK_IMPORTED_MODULE_1__.useMemo(function () {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, parentContext), { client: client || parentContext.client });
    }, [parentContext, client]);
    (0,_utilities_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(context.client, 47);
    return (rehackt__WEBPACK_IMPORTED_MODULE_1__.createElement(ApolloContext.Provider, { value: context }, children));
};
//# sourceMappingURL=ApolloProvider.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/caching/caches.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/caching/caches.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutoCleanedStrongCache: () => (/* binding */ AutoCleanedStrongCache),
/* harmony export */   AutoCleanedWeakCache: () => (/* binding */ AutoCleanedWeakCache)
/* harmony export */ });
/* harmony import */ var _wry_caches__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/caches */ "./node_modules/@wry/caches/lib/weak.js");
/* harmony import */ var _wry_caches__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wry/caches */ "./node_modules/@wry/caches/lib/strong.js");

var scheduledCleanup = new WeakSet();
function schedule(cache) {
    if (cache.size <= (cache.max || -1)) {
        return;
    }
    if (!scheduledCleanup.has(cache)) {
        scheduledCleanup.add(cache);
        setTimeout(function () {
            cache.clean();
            scheduledCleanup.delete(cache);
        }, 100);
    }
}
/**
 * @internal
 * A version of WeakCache that will auto-schedule a cleanup of the cache when
 * a new item is added and the cache reached maximum size.
 * Throttled to once per 100ms.
 *
 * @privateRemarks
 * Should be used throughout the rest of the codebase instead of WeakCache,
 * with the notable exception of usage in `wrap` from `optimism` - that one
 * already handles cleanup and should remain a `WeakCache`.
 */
var AutoCleanedWeakCache = function (max, dispose) {
    /*
    Some builds of `WeakCache` are function prototypes, some are classes.
    This library still builds with an ES5 target, so we can't extend the
    real classes.
    Instead, we have to use this workaround until we switch to a newer build
    target.
    */
    var cache = new _wry_caches__WEBPACK_IMPORTED_MODULE_0__.WeakCache(max, dispose);
    cache.set = function (key, value) {
        var ret = _wry_caches__WEBPACK_IMPORTED_MODULE_0__.WeakCache.prototype.set.call(this, key, value);
        schedule(this);
        return ret;
    };
    return cache;
};
/**
 * @internal
 * A version of StrongCache that will auto-schedule a cleanup of the cache when
 * a new item is added and the cache reached maximum size.
 * Throttled to once per 100ms.
 *
 * @privateRemarks
 * Should be used throughout the rest of the codebase instead of StrongCache,
 * with the notable exception of usage in `wrap` from `optimism` - that one
 * already handles cleanup and should remain a `StrongCache`.
 */
var AutoCleanedStrongCache = function (max, dispose) {
    /*
    Some builds of `StrongCache` are function prototypes, some are classes.
    This library still builds with an ES5 target, so we can't extend the
    real classes.
    Instead, we have to use this workaround until we switch to a newer build
    target.
    */
    var cache = new _wry_caches__WEBPACK_IMPORTED_MODULE_1__.StrongCache(max, dispose);
    cache.set = function (key, value) {
        var ret = _wry_caches__WEBPACK_IMPORTED_MODULE_1__.StrongCache.prototype.set.call(this, key, value);
        schedule(this);
        return ret;
    };
    return cache;
};
//# sourceMappingURL=caches.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/caching/getMemoryInternals.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/caching/getMemoryInternals.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getApolloCacheMemoryInternals: () => (/* binding */ getApolloCacheMemoryInternals),
/* harmony export */   getApolloClientMemoryInternals: () => (/* binding */ getApolloClientMemoryInternals),
/* harmony export */   getInMemoryCacheMemoryInternals: () => (/* binding */ getInMemoryCacheMemoryInternals),
/* harmony export */   registerGlobalCache: () => (/* binding */ registerGlobalCache)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _sizes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sizes.js */ "./node_modules/@apollo/client/utilities/caching/sizes.js");


var globalCaches = {};
function registerGlobalCache(name, getSize) {
    globalCaches[name] = getSize;
}
/**
 * For internal purposes only - please call `ApolloClient.getMemoryInternals` instead
 * @internal
 */
var getApolloClientMemoryInternals = globalThis.__DEV__ !== false ?
    _getApolloClientMemoryInternals
    : undefined;
/**
 * For internal purposes only - please call `ApolloClient.getMemoryInternals` instead
 * @internal
 */
var getInMemoryCacheMemoryInternals = globalThis.__DEV__ !== false ?
    _getInMemoryCacheMemoryInternals
    : undefined;
/**
 * For internal purposes only - please call `ApolloClient.getMemoryInternals` instead
 * @internal
 */
var getApolloCacheMemoryInternals = globalThis.__DEV__ !== false ?
    _getApolloCacheMemoryInternals
    : undefined;
function getCurrentCacheSizes() {
    // `defaultCacheSizes` is a `const enum` that will be inlined during build, so we have to reconstruct it's shape here
    var defaults = {
        parser: 1000 /* defaultCacheSizes["parser"] */,
        canonicalStringify: 1000 /* defaultCacheSizes["canonicalStringify"] */,
        print: 2000 /* defaultCacheSizes["print"] */,
        "documentTransform.cache": 2000 /* defaultCacheSizes["documentTransform.cache"] */,
        "queryManager.getDocumentInfo": 2000 /* defaultCacheSizes["queryManager.getDocumentInfo"] */,
        "PersistedQueryLink.persistedQueryHashes": 2000 /* defaultCacheSizes["PersistedQueryLink.persistedQueryHashes"] */,
        "fragmentRegistry.transform": 2000 /* defaultCacheSizes["fragmentRegistry.transform"] */,
        "fragmentRegistry.lookup": 1000 /* defaultCacheSizes["fragmentRegistry.lookup"] */,
        "fragmentRegistry.findFragmentSpreads": 4000 /* defaultCacheSizes["fragmentRegistry.findFragmentSpreads"] */,
        "cache.fragmentQueryDocuments": 1000 /* defaultCacheSizes["cache.fragmentQueryDocuments"] */,
        "removeTypenameFromVariables.getVariableDefinitions": 2000 /* defaultCacheSizes["removeTypenameFromVariables.getVariableDefinitions"] */,
        "inMemoryCache.maybeBroadcastWatch": 5000 /* defaultCacheSizes["inMemoryCache.maybeBroadcastWatch"] */,
        "inMemoryCache.executeSelectionSet": 50000 /* defaultCacheSizes["inMemoryCache.executeSelectionSet"] */,
        "inMemoryCache.executeSubSelectedArray": 10000 /* defaultCacheSizes["inMemoryCache.executeSubSelectedArray"] */,
    };
    return Object.fromEntries(Object.entries(defaults).map(function (_a) {
        var k = _a[0], v = _a[1];
        return [
            k,
            _sizes_js__WEBPACK_IMPORTED_MODULE_0__.cacheSizes[k] || v,
        ];
    }));
}
function _getApolloClientMemoryInternals() {
    var _a, _b, _c, _d, _e;
    if (!(globalThis.__DEV__ !== false))
        throw new Error("only supported in development mode");
    return {
        limits: getCurrentCacheSizes(),
        sizes: (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({ print: (_a = globalCaches.print) === null || _a === void 0 ? void 0 : _a.call(globalCaches), parser: (_b = globalCaches.parser) === null || _b === void 0 ? void 0 : _b.call(globalCaches), canonicalStringify: (_c = globalCaches.canonicalStringify) === null || _c === void 0 ? void 0 : _c.call(globalCaches), links: linkInfo(this.link), queryManager: {
                getDocumentInfo: this["queryManager"]["transformCache"].size,
                documentTransforms: transformInfo(this["queryManager"].documentTransform),
            } }, (_e = (_d = this.cache).getMemoryInternals) === null || _e === void 0 ? void 0 : _e.call(_d)),
    };
}
function _getApolloCacheMemoryInternals() {
    return {
        cache: {
            fragmentQueryDocuments: getWrapperInformation(this["getFragmentDoc"]),
        },
    };
}
function _getInMemoryCacheMemoryInternals() {
    var fragments = this.config.fragments;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, _getApolloCacheMemoryInternals.apply(this)), { addTypenameDocumentTransform: transformInfo(this["addTypenameTransform"]), inMemoryCache: {
            executeSelectionSet: getWrapperInformation(this["storeReader"]["executeSelectionSet"]),
            executeSubSelectedArray: getWrapperInformation(this["storeReader"]["executeSubSelectedArray"]),
            maybeBroadcastWatch: getWrapperInformation(this["maybeBroadcastWatch"]),
        }, fragmentRegistry: {
            findFragmentSpreads: getWrapperInformation(fragments === null || fragments === void 0 ? void 0 : fragments.findFragmentSpreads),
            lookup: getWrapperInformation(fragments === null || fragments === void 0 ? void 0 : fragments.lookup),
            transform: getWrapperInformation(fragments === null || fragments === void 0 ? void 0 : fragments.transform),
        } });
}
function isWrapper(f) {
    return !!f && "dirtyKey" in f;
}
function getWrapperInformation(f) {
    return isWrapper(f) ? f.size : undefined;
}
function isDefined(value) {
    return value != null;
}
function transformInfo(transform) {
    return recurseTransformInfo(transform).map(function (cache) { return ({ cache: cache }); });
}
function recurseTransformInfo(transform) {
    return transform ?
        (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([
            getWrapperInformation(transform === null || transform === void 0 ? void 0 : transform["performWork"])
        ], recurseTransformInfo(transform === null || transform === void 0 ? void 0 : transform["left"]), true), recurseTransformInfo(transform === null || transform === void 0 ? void 0 : transform["right"]), true).filter(isDefined)
        : [];
}
function linkInfo(link) {
    var _a;
    return link ?
        (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([
            (_a = link === null || link === void 0 ? void 0 : link.getMemoryInternals) === null || _a === void 0 ? void 0 : _a.call(link)
        ], linkInfo(link === null || link === void 0 ? void 0 : link.left), true), linkInfo(link === null || link === void 0 ? void 0 : link.right), true).filter(isDefined)
        : [];
}
//# sourceMappingURL=getMemoryInternals.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/caching/sizes.js":
/*!****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/caching/sizes.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cacheSizes: () => (/* binding */ cacheSizes)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");


var cacheSizeSymbol = Symbol.for("apollo.cacheSize");
/**
 *
 * The global cache size configuration for Apollo Client.
 *
 * @remarks
 *
 * You can directly modify this object, but any modification will
 * only have an effect on caches that are created after the modification.
 *
 * So for global caches, such as `parser`, `canonicalStringify` and `print`,
 * you might need to call `.reset` on them, which will essentially re-create them.
 *
 * Alternatively, you can set `globalThis[Symbol.for("apollo.cacheSize")]` before
 * you load the Apollo Client package:
 *
 * @example
 * ```ts
 * globalThis[Symbol.for("apollo.cacheSize")] = {
 *   parser: 100
 * } satisfies Partial<CacheSizes> // the `satisfies` is optional if using TypeScript
 * ```
 */
var cacheSizes = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, _globals_index_js__WEBPACK_IMPORTED_MODULE_0__.global[cacheSizeSymbol]);
//# sourceMappingURL=sizes.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/arrays.js":
/*!****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/arrays.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isArray: () => (/* binding */ isArray),
/* harmony export */   isNonEmptyArray: () => (/* binding */ isNonEmptyArray)
/* harmony export */ });
// A version of Array.isArray that works better with readonly arrays.
var isArray = Array.isArray;
function isNonEmptyArray(value) {
    return Array.isArray(value) && value.length > 0;
}
//# sourceMappingURL=arrays.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/canUse.js":
/*!****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/canUse.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canUseAsyncIteratorSymbol: () => (/* binding */ canUseAsyncIteratorSymbol),
/* harmony export */   canUseDOM: () => (/* binding */ canUseDOM),
/* harmony export */   canUseLayoutEffect: () => (/* binding */ canUseLayoutEffect),
/* harmony export */   canUseSymbol: () => (/* binding */ canUseSymbol),
/* harmony export */   canUseWeakMap: () => (/* binding */ canUseWeakMap),
/* harmony export */   canUseWeakSet: () => (/* binding */ canUseWeakSet)
/* harmony export */ });
/* harmony import */ var _globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");

var isReactNative = (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.maybe)(function () { return navigator.product; }) == "ReactNative";
var canUseWeakMap = typeof WeakMap === "function" &&
    !(isReactNative && !global.HermesInternal);
var canUseWeakSet = typeof WeakSet === "function";
var canUseSymbol = typeof Symbol === "function" && typeof Symbol.for === "function";
var canUseAsyncIteratorSymbol = canUseSymbol && Symbol.asyncIterator;
var canUseDOM = typeof (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.maybe)(function () { return window.document.createElement; }) === "function";
var usingJSDOM = 
// Following advice found in this comment from @domenic (maintainer of jsdom):
// https://github.com/jsdom/jsdom/issues/1537#issuecomment-229405327
//
// Since we control the version of Jest and jsdom used when running Apollo
// Client tests, and that version is recent enought to include " jsdom/x.y.z"
// at the end of the user agent string, I believe this case is all we need to
// check. Testing for "Node.js" was recommended for backwards compatibility
// with older version of jsdom, but we don't have that problem.
(0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.maybe)(function () { return navigator.userAgent.indexOf("jsdom") >= 0; }) || false;
// Our tests should all continue to pass if we remove this !usingJSDOM
// condition, thereby allowing useLayoutEffect when using jsdom. Unfortunately,
// if we allow useLayoutEffect, then useSyncExternalStore generates many
// warnings about useLayoutEffect doing nothing on the server. While these
// warnings are harmless, this !usingJSDOM condition seems to be the best way to
// prevent them (i.e. skipping useLayoutEffect when using jsdom).
var canUseLayoutEffect = (canUseDOM || isReactNative) && !usingJSDOM;
//# sourceMappingURL=canUse.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/canonicalStringify.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/canonicalStringify.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canonicalStringify: () => (/* binding */ canonicalStringify)
/* harmony export */ });
/* harmony import */ var _utilities_caching_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utilities/caching/index.js */ "./node_modules/@apollo/client/utilities/caching/caches.js");
/* harmony import */ var _utilities_caching_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utilities/caching/index.js */ "./node_modules/@apollo/client/utilities/caching/sizes.js");
/* harmony import */ var _caching_getMemoryInternals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../caching/getMemoryInternals.js */ "./node_modules/@apollo/client/utilities/caching/getMemoryInternals.js");


/**
 * Like JSON.stringify, but with object keys always sorted in the same order.
 *
 * To achieve performant sorting, this function uses a Map from JSON-serialized
 * arrays of keys (in any order) to sorted arrays of the same keys, with a
 * single sorted array reference shared by all permutations of the keys.
 *
 * As a drawback, this function will add a little bit more memory for every
 * object encountered that has different (more, less, a different order of) keys
 * than in the past.
 *
 * In a typical application, this extra memory usage should not play a
 * significant role, as `canonicalStringify` will be called for only a limited
 * number of object shapes, and the cache will not grow beyond a certain point.
 * But in some edge cases, this could be a problem, so we provide
 * canonicalStringify.reset() as a way of clearing the cache.
 * */
var canonicalStringify = Object.assign(function canonicalStringify(value) {
    return JSON.stringify(value, stableObjectReplacer);
}, {
    reset: function () {
        // Clearing the sortingMap will reclaim all cached memory, without
        // affecting the logical results of canonicalStringify, but potentially
        // sacrificing performance until the cache is refilled.
        sortingMap = new _utilities_caching_index_js__WEBPACK_IMPORTED_MODULE_0__.AutoCleanedStrongCache(_utilities_caching_index_js__WEBPACK_IMPORTED_MODULE_1__.cacheSizes.canonicalStringify || 1000 /* defaultCacheSizes.canonicalStringify */);
    },
});
if (globalThis.__DEV__ !== false) {
    (0,_caching_getMemoryInternals_js__WEBPACK_IMPORTED_MODULE_2__.registerGlobalCache)("canonicalStringify", function () { return sortingMap.size; });
}
// Values are JSON-serialized arrays of object keys (in any order), and values
// are sorted arrays of the same keys.
var sortingMap;
canonicalStringify.reset();
// The JSON.stringify function takes an optional second argument called a
// replacer function. This function is called for each key-value pair in the
// object being stringified, and its return value is used instead of the
// original value. If the replacer function returns a new value, that value is
// stringified as JSON instead of the original value of the property.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#the_replacer_parameter
function stableObjectReplacer(key, value) {
    if (value && typeof value === "object") {
        var proto = Object.getPrototypeOf(value);
        // We don't want to mess with objects that are not "plain" objects, which
        // means their prototype is either Object.prototype or null. This check also
        // prevents needlessly rearranging the indices of arrays.
        if (proto === Object.prototype || proto === null) {
            var keys = Object.keys(value);
            // If keys is already sorted, let JSON.stringify serialize the original
            // value instead of creating a new object with keys in the same order.
            if (keys.every(everyKeyInOrder))
                return value;
            var unsortedKey = JSON.stringify(keys);
            var sortedKeys = sortingMap.get(unsortedKey);
            if (!sortedKeys) {
                keys.sort();
                var sortedKey = JSON.stringify(keys);
                // Checking for sortedKey in the sortingMap allows us to share the same
                // sorted array reference for all permutations of the same set of keys.
                sortedKeys = sortingMap.get(sortedKey) || keys;
                sortingMap.set(unsortedKey, sortedKeys);
                sortingMap.set(sortedKey, sortedKeys);
            }
            var sortedObject_1 = Object.create(proto);
            // Reassigning the keys in sorted order will cause JSON.stringify to
            // serialize them in sorted order.
            sortedKeys.forEach(function (key) {
                sortedObject_1[key] = value[key];
            });
            return sortedObject_1;
        }
    }
    return value;
}
// Since everything that happens in stableObjectReplacer benefits from being as
// efficient as possible, we use a static function as the callback for
// keys.every in order to test if the provided keys are already sorted without
// allocating extra memory for a callback.
function everyKeyInOrder(key, i, keys) {
    return i === 0 || keys[i - 1] <= key;
}
//# sourceMappingURL=canonicalStringify.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/cloneDeep.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/cloneDeep.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cloneDeep: () => (/* binding */ cloneDeep)
/* harmony export */ });
var toString = Object.prototype.toString;
/**
 * Deeply clones a value to create a new instance.
 */
function cloneDeep(value) {
    return cloneDeepHelper(value);
}
function cloneDeepHelper(val, seen) {
    switch (toString.call(val)) {
        case "[object Array]": {
            seen = seen || new Map();
            if (seen.has(val))
                return seen.get(val);
            var copy_1 = val.slice(0);
            seen.set(val, copy_1);
            copy_1.forEach(function (child, i) {
                copy_1[i] = cloneDeepHelper(child, seen);
            });
            return copy_1;
        }
        case "[object Object]": {
            seen = seen || new Map();
            if (seen.has(val))
                return seen.get(val);
            // High fidelity polyfills of Object.create and Object.getPrototypeOf are
            // possible in all JS environments, so we will assume they exist/work.
            var copy_2 = Object.create(Object.getPrototypeOf(val));
            seen.set(val, copy_2);
            Object.keys(val).forEach(function (key) {
                copy_2[key] = cloneDeepHelper(val[key], seen);
            });
            return copy_2;
        }
        default:
            return val;
    }
}
//# sourceMappingURL=cloneDeep.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/compact.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/compact.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compact: () => (/* binding */ compact)
/* harmony export */ });
/**
 * Merges the provided objects shallowly and removes
 * all properties with an `undefined` value
 */
function compact() {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    var result = Object.create(null);
    objects.forEach(function (obj) {
        if (!obj)
            return;
        Object.keys(obj).forEach(function (key) {
            var value = obj[key];
            if (value !== void 0) {
                result[key] = value;
            }
        });
    });
    return result;
}
//# sourceMappingURL=compact.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/errorHandling.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/errorHandling.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGraphQLErrorsFromResult: () => (/* binding */ getGraphQLErrorsFromResult),
/* harmony export */   graphQLResultHasError: () => (/* binding */ graphQLResultHasError)
/* harmony export */ });
/* harmony import */ var _arrays_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrays.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");
/* harmony import */ var _incrementalResult_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./incrementalResult.js */ "./node_modules/@apollo/client/utilities/common/incrementalResult.js");


function graphQLResultHasError(result) {
    var errors = getGraphQLErrorsFromResult(result);
    return (0,_arrays_js__WEBPACK_IMPORTED_MODULE_0__.isNonEmptyArray)(errors);
}
function getGraphQLErrorsFromResult(result) {
    var graphQLErrors = (0,_arrays_js__WEBPACK_IMPORTED_MODULE_0__.isNonEmptyArray)(result.errors) ? result.errors.slice(0) : [];
    if ((0,_incrementalResult_js__WEBPACK_IMPORTED_MODULE_1__.isExecutionPatchIncrementalResult)(result) &&
        (0,_arrays_js__WEBPACK_IMPORTED_MODULE_0__.isNonEmptyArray)(result.incremental)) {
        result.incremental.forEach(function (incrementalResult) {
            if (incrementalResult.errors) {
                graphQLErrors.push.apply(graphQLErrors, incrementalResult.errors);
            }
        });
    }
    return graphQLErrors;
}
//# sourceMappingURL=errorHandling.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/incrementalResult.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/incrementalResult.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isApolloPayloadResult: () => (/* binding */ isApolloPayloadResult),
/* harmony export */   isExecutionPatchIncrementalResult: () => (/* binding */ isExecutionPatchIncrementalResult),
/* harmony export */   isExecutionPatchInitialResult: () => (/* binding */ isExecutionPatchInitialResult),
/* harmony export */   isExecutionPatchResult: () => (/* binding */ isExecutionPatchResult),
/* harmony export */   mergeIncrementalData: () => (/* binding */ mergeIncrementalData)
/* harmony export */ });
/* harmony import */ var _objects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects.js */ "./node_modules/@apollo/client/utilities/common/objects.js");
/* harmony import */ var _arrays_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrays.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");
/* harmony import */ var _mergeDeep_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeDeep.js */ "./node_modules/@apollo/client/utilities/common/mergeDeep.js");



function isExecutionPatchIncrementalResult(value) {
    return "incremental" in value;
}
function isExecutionPatchInitialResult(value) {
    return "hasNext" in value && "data" in value;
}
function isExecutionPatchResult(value) {
    return (isExecutionPatchIncrementalResult(value) ||
        isExecutionPatchInitialResult(value));
}
// This function detects an Apollo payload result before it is transformed
// into a FetchResult via HttpLink; it cannot detect an ApolloPayloadResult
// once it leaves the link chain.
function isApolloPayloadResult(value) {
    return (0,_objects_js__WEBPACK_IMPORTED_MODULE_0__.isNonNullObject)(value) && "payload" in value;
}
function mergeIncrementalData(prevResult, result) {
    var mergedData = prevResult;
    var merger = new _mergeDeep_js__WEBPACK_IMPORTED_MODULE_1__.DeepMerger();
    if (isExecutionPatchIncrementalResult(result) &&
        (0,_arrays_js__WEBPACK_IMPORTED_MODULE_2__.isNonEmptyArray)(result.incremental)) {
        result.incremental.forEach(function (_a) {
            var data = _a.data, path = _a.path;
            for (var i = path.length - 1; i >= 0; --i) {
                var key = path[i];
                var isNumericKey = !isNaN(+key);
                var parent_1 = isNumericKey ? [] : {};
                parent_1[key] = data;
                data = parent_1;
            }
            mergedData = merger.merge(mergedData, data);
        });
    }
    return mergedData;
}
//# sourceMappingURL=incrementalResult.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/makeUniqueId.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/makeUniqueId.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeUniqueId: () => (/* binding */ makeUniqueId)
/* harmony export */ });
var prefixCounts = new Map();
// These IDs won't be globally unique, but they will be unique within this
// process, thanks to the counter, and unguessable thanks to the random suffix.
function makeUniqueId(prefix) {
    var count = prefixCounts.get(prefix) || 1;
    prefixCounts.set(prefix, count + 1);
    return "".concat(prefix, ":").concat(count, ":").concat(Math.random().toString(36).slice(2));
}
//# sourceMappingURL=makeUniqueId.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/maybeDeepFreeze.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   maybeDeepFreeze: () => (/* binding */ maybeDeepFreeze)
/* harmony export */ });
/* harmony import */ var _objects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects.js */ "./node_modules/@apollo/client/utilities/common/objects.js");

function deepFreeze(value) {
    var workSet = new Set([value]);
    workSet.forEach(function (obj) {
        if ((0,_objects_js__WEBPACK_IMPORTED_MODULE_0__.isNonNullObject)(obj) && shallowFreeze(obj) === obj) {
            Object.getOwnPropertyNames(obj).forEach(function (name) {
                if ((0,_objects_js__WEBPACK_IMPORTED_MODULE_0__.isNonNullObject)(obj[name]))
                    workSet.add(obj[name]);
            });
        }
    });
    return value;
}
function shallowFreeze(obj) {
    if (globalThis.__DEV__ !== false && !Object.isFrozen(obj)) {
        try {
            Object.freeze(obj);
        }
        catch (e) {
            // Some types like Uint8Array and Node.js's Buffer cannot be frozen, but
            // they all throw a TypeError when you try, so we re-throw any exceptions
            // that are not TypeErrors, since that would be unexpected.
            if (e instanceof TypeError)
                return null;
            throw e;
        }
    }
    return obj;
}
function maybeDeepFreeze(obj) {
    if (globalThis.__DEV__ !== false) {
        deepFreeze(obj);
    }
    return obj;
}
//# sourceMappingURL=maybeDeepFreeze.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/mergeDeep.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/mergeDeep.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeepMerger: () => (/* binding */ DeepMerger),
/* harmony export */   mergeDeep: () => (/* binding */ mergeDeep),
/* harmony export */   mergeDeepArray: () => (/* binding */ mergeDeepArray)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _objects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects.js */ "./node_modules/@apollo/client/utilities/common/objects.js");


var hasOwnProperty = Object.prototype.hasOwnProperty;
function mergeDeep() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    return mergeDeepArray(sources);
}
// In almost any situation where you could succeed in getting the
// TypeScript compiler to infer a tuple type for the sources array, you
// could just use mergeDeep instead of mergeDeepArray, so instead of
// trying to convert T[] to an intersection type we just infer the array
// element type, which works perfectly when the sources array has a
// consistent element type.
function mergeDeepArray(sources) {
    var target = sources[0] || {};
    var count = sources.length;
    if (count > 1) {
        var merger = new DeepMerger();
        for (var i = 1; i < count; ++i) {
            target = merger.merge(target, sources[i]);
        }
    }
    return target;
}
var defaultReconciler = function (target, source, property) {
    return this.merge(target[property], source[property]);
};
var DeepMerger = /** @class */ (function () {
    function DeepMerger(reconciler) {
        if (reconciler === void 0) { reconciler = defaultReconciler; }
        this.reconciler = reconciler;
        this.isObject = _objects_js__WEBPACK_IMPORTED_MODULE_0__.isNonNullObject;
        this.pastCopies = new Set();
    }
    DeepMerger.prototype.merge = function (target, source) {
        var _this = this;
        var context = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            context[_i - 2] = arguments[_i];
        }
        if ((0,_objects_js__WEBPACK_IMPORTED_MODULE_0__.isNonNullObject)(source) && (0,_objects_js__WEBPACK_IMPORTED_MODULE_0__.isNonNullObject)(target)) {
            Object.keys(source).forEach(function (sourceKey) {
                if (hasOwnProperty.call(target, sourceKey)) {
                    var targetValue = target[sourceKey];
                    if (source[sourceKey] !== targetValue) {
                        var result = _this.reconciler.apply(_this, (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([target,
                            source,
                            sourceKey], context, false));
                        // A well-implemented reconciler may return targetValue to indicate
                        // the merge changed nothing about the structure of the target.
                        if (result !== targetValue) {
                            target = _this.shallowCopyForMerge(target);
                            target[sourceKey] = result;
                        }
                    }
                }
                else {
                    // If there is no collision, the target can safely share memory with
                    // the source, and the recursion can terminate here.
                    target = _this.shallowCopyForMerge(target);
                    target[sourceKey] = source[sourceKey];
                }
            });
            return target;
        }
        // If source (or target) is not an object, let source replace target.
        return source;
    };
    DeepMerger.prototype.shallowCopyForMerge = function (value) {
        if ((0,_objects_js__WEBPACK_IMPORTED_MODULE_0__.isNonNullObject)(value)) {
            if (!this.pastCopies.has(value)) {
                if (Array.isArray(value)) {
                    value = value.slice(0);
                }
                else {
                    value = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({ __proto__: Object.getPrototypeOf(value) }, value);
                }
                this.pastCopies.add(value);
            }
        }
        return value;
    };
    return DeepMerger;
}());

//# sourceMappingURL=mergeDeep.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/mergeOptions.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/mergeOptions.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeOptions: () => (/* binding */ mergeOptions)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _compact_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compact.js */ "./node_modules/@apollo/client/utilities/common/compact.js");


function mergeOptions(defaults, options) {
    return (0,_compact_js__WEBPACK_IMPORTED_MODULE_0__.compact)(defaults, options, options.variables && {
        variables: (0,_compact_js__WEBPACK_IMPORTED_MODULE_0__.compact)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, (defaults && defaults.variables)), options.variables)),
    });
}
//# sourceMappingURL=mergeOptions.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/objects.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/objects.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNonNullObject: () => (/* binding */ isNonNullObject),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject)
/* harmony export */ });
function isNonNullObject(obj) {
    return obj !== null && typeof obj === "object";
}
function isPlainObject(obj) {
    return (obj !== null &&
        typeof obj === "object" &&
        (Object.getPrototypeOf(obj) === Object.prototype ||
            Object.getPrototypeOf(obj) === null));
}
//# sourceMappingURL=objects.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/common/stringifyForDisplay.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/common/stringifyForDisplay.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stringifyForDisplay: () => (/* binding */ stringifyForDisplay)
/* harmony export */ });
/* harmony import */ var _makeUniqueId_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./makeUniqueId.js */ "./node_modules/@apollo/client/utilities/common/makeUniqueId.js");

function stringifyForDisplay(value, space) {
    if (space === void 0) { space = 0; }
    var undefId = (0,_makeUniqueId_js__WEBPACK_IMPORTED_MODULE_0__.makeUniqueId)("stringifyForDisplay");
    return JSON.stringify(value, function (key, value) {
        return value === void 0 ? undefId : value;
    }, space)
        .split(JSON.stringify(undefId))
        .join("<undefined>");
}
//# sourceMappingURL=stringifyForDisplay.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/globals/global.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/globals/global.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _maybe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./maybe.js */ "./node_modules/@apollo/client/utilities/globals/maybe.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_maybe_js__WEBPACK_IMPORTED_MODULE_0__.maybe)(function () { return globalThis; }) ||
    (0,_maybe_js__WEBPACK_IMPORTED_MODULE_0__.maybe)(function () { return window; }) ||
    (0,_maybe_js__WEBPACK_IMPORTED_MODULE_0__.maybe)(function () { return self; }) ||
    (0,_maybe_js__WEBPACK_IMPORTED_MODULE_0__.maybe)(function () { return global; }) || // We don't expect the Function constructor ever to be invoked at runtime, as
// long as at least one of globalThis, window, self, or global is defined, so
// we are under no obligation to make it easy for static analysis tools to
// detect syntactic usage of the Function constructor. If you think you can
// improve your static analysis to detect this obfuscation, think again. This
// is an arms race you cannot win, at least not in JavaScript.
(0,_maybe_js__WEBPACK_IMPORTED_MODULE_0__.maybe)(function () {
    return _maybe_js__WEBPACK_IMPORTED_MODULE_0__.maybe.constructor("return this")();
}));
//# sourceMappingURL=global.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/globals/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/globals/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEV: () => (/* binding */ DEV),
/* harmony export */   InvariantError: () => (/* reexport safe */ _invariantWrappers_js__WEBPACK_IMPORTED_MODULE_0__.InvariantError),
/* harmony export */   __DEV__: () => (/* binding */ DEV),
/* harmony export */   global: () => (/* reexport safe */ _global_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   invariant: () => (/* reexport safe */ _invariantWrappers_js__WEBPACK_IMPORTED_MODULE_0__.invariant),
/* harmony export */   maybe: () => (/* reexport safe */ _maybe_js__WEBPACK_IMPORTED_MODULE_1__.maybe),
/* harmony export */   newInvariantError: () => (/* reexport safe */ _invariantWrappers_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)
/* harmony export */ });
/* harmony import */ var _invariantWrappers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invariantWrappers.js */ "./node_modules/@apollo/client/utilities/globals/invariantWrappers.js");
/* harmony import */ var _maybe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maybe.js */ "./node_modules/@apollo/client/utilities/globals/maybe.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global.js */ "./node_modules/@apollo/client/utilities/globals/global.js");




/**
 * @deprecated we do not use this internally anymore,
 * it is just exported for backwards compatibility
 */
// this file is extempt from automatic `__DEV__` replacement
// so we have to write it out here
// @ts-ignore
var DEV = globalThis.__DEV__ !== false;

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/globals/invariantWrappers.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/globals/invariantWrappers.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApolloErrorMessageHandler: () => (/* binding */ ApolloErrorMessageHandler),
/* harmony export */   InvariantError: () => (/* reexport safe */ ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError),
/* harmony export */   invariant: () => (/* binding */ invariant),
/* harmony export */   newInvariantError: () => (/* binding */ newInvariantError)
/* harmony export */ });
/* harmony import */ var ts_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ts-invariant */ "./node_modules/ts-invariant/lib/invariant.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../version.js */ "./node_modules/@apollo/client/version.js");
/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.js */ "./node_modules/@apollo/client/utilities/globals/global.js");
/* harmony import */ var _common_stringifyForDisplay_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/stringifyForDisplay.js */ "./node_modules/@apollo/client/utilities/common/stringifyForDisplay.js");




function wrap(fn) {
    return function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof message === "number") {
            var arg0 = message;
            message = getHandledErrorMsg(arg0);
            if (!message) {
                message = getFallbackErrorMsg(arg0, args);
                args = [];
            }
        }
        fn.apply(void 0, [message].concat(args));
    };
}
var invariant = Object.assign(function invariant(condition, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (!condition) {
        (0,ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant)(condition, getHandledErrorMsg(message, args) || getFallbackErrorMsg(message, args));
    }
}, {
    debug: wrap(ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.debug),
    log: wrap(ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.log),
    warn: wrap(ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.warn),
    error: wrap(ts_invariant__WEBPACK_IMPORTED_MODULE_0__.invariant.error),
});
/**
 * Returns an InvariantError.
 *
 * `message` can only be a string, a concatenation of strings, or a ternary statement
 * that results in a string. This will be enforced on build, where the message will
 * be replaced with a message number.
 * String substitutions with %s are supported and will also return
 * pretty-stringified objects.
 * Excess `optionalParams` will be swallowed.
 */
function newInvariantError(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    return new ts_invariant__WEBPACK_IMPORTED_MODULE_0__.InvariantError(getHandledErrorMsg(message, optionalParams) ||
        getFallbackErrorMsg(message, optionalParams));
}
var ApolloErrorMessageHandler = Symbol.for("ApolloErrorMessageHandler_" + _version_js__WEBPACK_IMPORTED_MODULE_2__.version);
function stringify(arg) {
    if (typeof arg == "string") {
        return arg;
    }
    try {
        return (0,_common_stringifyForDisplay_js__WEBPACK_IMPORTED_MODULE_3__.stringifyForDisplay)(arg, 2).slice(0, 1000);
    }
    catch (_a) {
        return "<non-serializable>";
    }
}
function getHandledErrorMsg(message, messageArgs) {
    if (messageArgs === void 0) { messageArgs = []; }
    if (!message)
        return;
    return (_global_js__WEBPACK_IMPORTED_MODULE_1__["default"][ApolloErrorMessageHandler] &&
        _global_js__WEBPACK_IMPORTED_MODULE_1__["default"][ApolloErrorMessageHandler](message, messageArgs.map(stringify)));
}
function getFallbackErrorMsg(message, messageArgs) {
    if (messageArgs === void 0) { messageArgs = []; }
    if (!message)
        return;
    return "An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#".concat(encodeURIComponent(JSON.stringify({
        version: _version_js__WEBPACK_IMPORTED_MODULE_2__.version,
        message: message,
        args: messageArgs.map(stringify),
    })));
}

//# sourceMappingURL=invariantWrappers.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/globals/maybe.js":
/*!****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/globals/maybe.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   maybe: () => (/* binding */ maybe)
/* harmony export */ });
function maybe(thunk) {
    try {
        return thunk();
    }
    catch (_a) { }
}
//# sourceMappingURL=maybe.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/graphql/DocumentTransform.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/graphql/DocumentTransform.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DocumentTransform: () => (/* binding */ DocumentTransform)
/* harmony export */ });
/* harmony import */ var _wry_trie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/trie */ "./node_modules/@wry/trie/lib/index.js");
/* harmony import */ var _common_canUse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/canUse.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");
/* harmony import */ var _getFromAST_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getFromAST.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");
/* harmony import */ var _globals_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _wry_caches__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wry/caches */ "./node_modules/@wry/caches/lib/weak.js");
/* harmony import */ var optimism__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! optimism */ "./node_modules/optimism/lib/index.js");
/* harmony import */ var _caching_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../caching/index.js */ "./node_modules/@apollo/client/utilities/caching/sizes.js");







function identity(document) {
    return document;
}
var DocumentTransform = /** @class */ (function () {
    function DocumentTransform(transform, options) {
        if (options === void 0) { options = Object.create(null); }
        this.resultCache = _common_canUse_js__WEBPACK_IMPORTED_MODULE_3__.canUseWeakSet ? new WeakSet() : new Set();
        this.transform = transform;
        if (options.getCacheKey) {
            // Override default `getCacheKey` function, which returns [document].
            this.getCacheKey = options.getCacheKey;
        }
        this.cached = options.cache !== false;
        this.resetCache();
    }
    // This default implementation of getCacheKey can be overridden by providing
    // options.getCacheKey to the DocumentTransform constructor. In general, a
    // getCacheKey function may either return an array of keys (often including
    // the document) to be used as a cache key, or undefined to indicate the
    // transform for this document should not be cached.
    DocumentTransform.prototype.getCacheKey = function (document) {
        return [document];
    };
    DocumentTransform.identity = function () {
        // No need to cache this transform since it just returns the document
        // unchanged. This should save a bit of memory that would otherwise be
        // needed to populate the `documentCache` of this transform.
        return new DocumentTransform(identity, { cache: false });
    };
    DocumentTransform.split = function (predicate, left, right) {
        if (right === void 0) { right = DocumentTransform.identity(); }
        return Object.assign(new DocumentTransform(function (document) {
            var documentTransform = predicate(document) ? left : right;
            return documentTransform.transformDocument(document);
        }, 
        // Reasonably assume both `left` and `right` transforms handle their own caching
        { cache: false }), { left: left, right: right });
    };
    /**
     * Resets the internal cache of this transform, if it has one.
     */
    DocumentTransform.prototype.resetCache = function () {
        var _this = this;
        if (this.cached) {
            var stableCacheKeys_1 = new _wry_trie__WEBPACK_IMPORTED_MODULE_0__.Trie(_common_canUse_js__WEBPACK_IMPORTED_MODULE_3__.canUseWeakMap);
            this.performWork = (0,optimism__WEBPACK_IMPORTED_MODULE_2__.wrap)(DocumentTransform.prototype.performWork.bind(this), {
                makeCacheKey: function (document) {
                    var cacheKeys = _this.getCacheKey(document);
                    if (cacheKeys) {
                        (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_1__.invariant)(Array.isArray(cacheKeys), 69);
                        return stableCacheKeys_1.lookupArray(cacheKeys);
                    }
                },
                max: _caching_index_js__WEBPACK_IMPORTED_MODULE_4__.cacheSizes["documentTransform.cache"],
                cache: (_wry_caches__WEBPACK_IMPORTED_MODULE_5__.WeakCache),
            });
        }
    };
    DocumentTransform.prototype.performWork = function (document) {
        (0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_6__.checkDocument)(document);
        return this.transform(document);
    };
    DocumentTransform.prototype.transformDocument = function (document) {
        // If a user passes an already transformed result back to this function,
        // immediately return it.
        if (this.resultCache.has(document)) {
            return document;
        }
        var transformedDocument = this.performWork(document);
        this.resultCache.add(transformedDocument);
        return transformedDocument;
    };
    DocumentTransform.prototype.concat = function (otherTransform) {
        var _this = this;
        return Object.assign(new DocumentTransform(function (document) {
            return otherTransform.transformDocument(_this.transformDocument(document));
        }, 
        // Reasonably assume both transforms handle their own caching
        { cache: false }), {
            left: this,
            right: otherTransform,
        });
    };
    return DocumentTransform;
}());

//# sourceMappingURL=DocumentTransform.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/graphql/directives.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/graphql/directives.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDirectiveNames: () => (/* binding */ getDirectiveNames),
/* harmony export */   getInclusionDirectives: () => (/* binding */ getInclusionDirectives),
/* harmony export */   hasAllDirectives: () => (/* binding */ hasAllDirectives),
/* harmony export */   hasAnyDirectives: () => (/* binding */ hasAnyDirectives),
/* harmony export */   hasClientExports: () => (/* binding */ hasClientExports),
/* harmony export */   hasDirectives: () => (/* binding */ hasDirectives),
/* harmony export */   shouldInclude: () => (/* binding */ shouldInclude)
/* harmony export */ });
/* harmony import */ var _globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/visitor.mjs");


function shouldInclude(_a, variables) {
    var directives = _a.directives;
    if (!directives || !directives.length) {
        return true;
    }
    return getInclusionDirectives(directives).every(function (_a) {
        var directive = _a.directive, ifArgument = _a.ifArgument;
        var evaledValue = false;
        if (ifArgument.value.kind === "Variable") {
            evaledValue =
                variables && variables[ifArgument.value.name.value];
            (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(evaledValue !== void 0, 70, directive.name.value);
        }
        else {
            evaledValue = ifArgument.value.value;
        }
        return directive.name.value === "skip" ? !evaledValue : evaledValue;
    });
}
function getDirectiveNames(root) {
    var names = [];
    (0,graphql__WEBPACK_IMPORTED_MODULE_1__.visit)(root, {
        Directive: function (node) {
            names.push(node.name.value);
        },
    });
    return names;
}
var hasAnyDirectives = function (names, root) {
    return hasDirectives(names, root, false);
};
var hasAllDirectives = function (names, root) {
    return hasDirectives(names, root, true);
};
function hasDirectives(names, root, all) {
    var nameSet = new Set(names);
    var uniqueCount = nameSet.size;
    (0,graphql__WEBPACK_IMPORTED_MODULE_1__.visit)(root, {
        Directive: function (node) {
            if (nameSet.delete(node.name.value) && (!all || !nameSet.size)) {
                return graphql__WEBPACK_IMPORTED_MODULE_1__.BREAK;
            }
        },
    });
    // If we found all the names, nameSet will be empty. If we only care about
    // finding some of them, the < condition is sufficient.
    return all ? !nameSet.size : nameSet.size < uniqueCount;
}
function hasClientExports(document) {
    return document && hasDirectives(["client", "export"], document, true);
}
function isInclusionDirective(_a) {
    var value = _a.name.value;
    return value === "skip" || value === "include";
}
function getInclusionDirectives(directives) {
    var result = [];
    if (directives && directives.length) {
        directives.forEach(function (directive) {
            if (!isInclusionDirective(directive))
                return;
            var directiveArguments = directive.arguments;
            var directiveName = directive.name.value;
            (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(directiveArguments && directiveArguments.length === 1, 71, directiveName);
            var ifArgument = directiveArguments[0];
            (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(ifArgument.name && ifArgument.name.value === "if", 72, directiveName);
            var ifValue = ifArgument.value;
            // means it has to be a variable value if this is a valid @skip or @include directive
            (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(ifValue &&
                (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue"), 73, directiveName);
            result.push({ directive: directive, ifArgument: ifArgument });
        });
    }
    return result;
}
//# sourceMappingURL=directives.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/graphql/fragments.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/graphql/fragments.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createFragmentMap: () => (/* binding */ createFragmentMap),
/* harmony export */   getFragmentFromSelection: () => (/* binding */ getFragmentFromSelection),
/* harmony export */   getFragmentQueryDocument: () => (/* binding */ getFragmentQueryDocument)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");


/**
 * Returns a query document which adds a single query operation that only
 * spreads the target fragment inside of it.
 *
 * So for example a document of:
 *
 * ```graphql
 * fragment foo on Foo { a b c }
 * ```
 *
 * Turns into:
 *
 * ```graphql
 * { ...foo }
 *
 * fragment foo on Foo { a b c }
 * ```
 *
 * The target fragment will either be the only fragment in the document, or a
 * fragment specified by the provided `fragmentName`. If there is more than one
 * fragment, but a `fragmentName` was not defined then an error will be thrown.
 */
function getFragmentQueryDocument(document, fragmentName) {
    var actualFragmentName = fragmentName;
    // Build an array of all our fragment definitions that will be used for
    // validations. We also do some validations on the other definitions in the
    // document while building this list.
    var fragments = [];
    document.definitions.forEach(function (definition) {
        // Throw an error if we encounter an operation definition because we will
        // define our own operation definition later on.
        if (definition.kind === "OperationDefinition") {
            throw (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(
                74,
                definition.operation,
                definition.name ? " named '".concat(definition.name.value, "'") : ""
            );
        }
        // Add our definition to the fragments array if it is a fragment
        // definition.
        if (definition.kind === "FragmentDefinition") {
            fragments.push(definition);
        }
    });
    // If the user did not give us a fragment name then let us try to get a
    // name from a single fragment in the definition.
    if (typeof actualFragmentName === "undefined") {
        (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(fragments.length === 1, 75, fragments.length);
        actualFragmentName = fragments[0].name.value;
    }
    // Generate a query document with an operation that simply spreads the
    // fragment inside of it.
    var query = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, document), { definitions: (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([
            {
                kind: "OperationDefinition",
                // OperationTypeNode is an enum
                operation: "query",
                selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                        {
                            kind: "FragmentSpread",
                            name: {
                                kind: "Name",
                                value: actualFragmentName,
                            },
                        },
                    ],
                },
            }
        ], document.definitions, true) });
    return query;
}
// Utility function that takes a list of fragment definitions and makes a hash out of them
// that maps the name of the fragment to the fragment definition.
function createFragmentMap(fragments) {
    if (fragments === void 0) { fragments = []; }
    var symTable = {};
    fragments.forEach(function (fragment) {
        symTable[fragment.name.value] = fragment;
    });
    return symTable;
}
function getFragmentFromSelection(selection, fragmentMap) {
    switch (selection.kind) {
        case "InlineFragment":
            return selection;
        case "FragmentSpread": {
            var fragmentName = selection.name.value;
            if (typeof fragmentMap === "function") {
                return fragmentMap(fragmentName);
            }
            var fragment = fragmentMap && fragmentMap[fragmentName];
            (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(fragment, 76, fragmentName);
            return fragment || null;
        }
        default:
            return null;
    }
}
//# sourceMappingURL=fragments.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/graphql/getFromAST.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkDocument: () => (/* binding */ checkDocument),
/* harmony export */   getDefaultValues: () => (/* binding */ getDefaultValues),
/* harmony export */   getFragmentDefinition: () => (/* binding */ getFragmentDefinition),
/* harmony export */   getFragmentDefinitions: () => (/* binding */ getFragmentDefinitions),
/* harmony export */   getMainDefinition: () => (/* binding */ getMainDefinition),
/* harmony export */   getOperationDefinition: () => (/* binding */ getOperationDefinition),
/* harmony export */   getOperationName: () => (/* binding */ getOperationName),
/* harmony export */   getQueryDefinition: () => (/* binding */ getQueryDefinition)
/* harmony export */ });
/* harmony import */ var _globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _storeUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storeUtils.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");


// Checks the document for errors and throws an exception if there is an error.
function checkDocument(doc) {
    (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(doc && doc.kind === "Document", 77);
    var operations = doc.definitions
        .filter(function (d) { return d.kind !== "FragmentDefinition"; })
        .map(function (definition) {
        if (definition.kind !== "OperationDefinition") {
            throw (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(78, definition.kind);
        }
        return definition;
    });
    (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(operations.length <= 1, 79, operations.length);
    return doc;
}
function getOperationDefinition(doc) {
    checkDocument(doc);
    return doc.definitions.filter(function (definition) {
        return definition.kind === "OperationDefinition";
    })[0];
}
function getOperationName(doc) {
    return (doc.definitions
        .filter(function (definition) {
        return definition.kind === "OperationDefinition" && !!definition.name;
    })
        .map(function (x) { return x.name.value; })[0] || null);
}
// Returns the FragmentDefinitions from a particular document as an array
function getFragmentDefinitions(doc) {
    return doc.definitions.filter(function (definition) {
        return definition.kind === "FragmentDefinition";
    });
}
function getQueryDefinition(doc) {
    var queryDef = getOperationDefinition(doc);
    (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(queryDef && queryDef.operation === "query", 80);
    return queryDef;
}
function getFragmentDefinition(doc) {
    (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(doc.kind === "Document", 81);
    (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(doc.definitions.length <= 1, 82);
    var fragmentDef = doc.definitions[0];
    (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant)(fragmentDef.kind === "FragmentDefinition", 83);
    return fragmentDef;
}
/**
 * Returns the first operation definition found in this document.
 * If no operation definition is found, the first fragment definition will be returned.
 * If no definitions are found, an error will be thrown.
 */
function getMainDefinition(queryDoc) {
    checkDocument(queryDoc);
    var fragmentDefinition;
    for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
        var definition = _a[_i];
        if (definition.kind === "OperationDefinition") {
            var operation = definition.operation;
            if (operation === "query" ||
                operation === "mutation" ||
                operation === "subscription") {
                return definition;
            }
        }
        if (definition.kind === "FragmentDefinition" && !fragmentDefinition) {
            // we do this because we want to allow multiple fragment definitions
            // to precede an operation definition.
            fragmentDefinition = definition;
        }
    }
    if (fragmentDefinition) {
        return fragmentDefinition;
    }
    throw (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(84);
}
function getDefaultValues(definition) {
    var defaultValues = Object.create(null);
    var defs = definition && definition.variableDefinitions;
    if (defs && defs.length) {
        defs.forEach(function (def) {
            if (def.defaultValue) {
                (0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_1__.valueToObjectRepresentation)(defaultValues, def.variable.name, def.defaultValue);
            }
        });
    }
    return defaultValues;
}
//# sourceMappingURL=getFromAST.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/graphql/print.js":
/*!****************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/graphql/print.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   print: () => (/* binding */ print)
/* harmony export */ });
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/printer.mjs");
/* harmony import */ var _caching_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../caching/index.js */ "./node_modules/@apollo/client/utilities/caching/caches.js");
/* harmony import */ var _caching_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../caching/index.js */ "./node_modules/@apollo/client/utilities/caching/sizes.js");
/* harmony import */ var _caching_getMemoryInternals_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../caching/getMemoryInternals.js */ "./node_modules/@apollo/client/utilities/caching/getMemoryInternals.js");



var printCache;
var print = Object.assign(function (ast) {
    var result = printCache.get(ast);
    if (!result) {
        result = (0,graphql__WEBPACK_IMPORTED_MODULE_0__.print)(ast);
        printCache.set(ast, result);
    }
    return result;
}, {
    reset: function () {
        printCache = new _caching_index_js__WEBPACK_IMPORTED_MODULE_1__.AutoCleanedWeakCache(_caching_index_js__WEBPACK_IMPORTED_MODULE_2__.cacheSizes.print || 2000 /* defaultCacheSizes.print */);
    },
});
print.reset();
if (globalThis.__DEV__ !== false) {
    (0,_caching_getMemoryInternals_js__WEBPACK_IMPORTED_MODULE_3__.registerGlobalCache)("print", function () { return (printCache ? printCache.size : 0); });
}
//# sourceMappingURL=print.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/graphql/storeUtils.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   argumentsObjectFromField: () => (/* binding */ argumentsObjectFromField),
/* harmony export */   getStoreKeyName: () => (/* binding */ getStoreKeyName),
/* harmony export */   getTypenameFromResult: () => (/* binding */ getTypenameFromResult),
/* harmony export */   isDocumentNode: () => (/* binding */ isDocumentNode),
/* harmony export */   isField: () => (/* binding */ isField),
/* harmony export */   isInlineFragment: () => (/* binding */ isInlineFragment),
/* harmony export */   isReference: () => (/* binding */ isReference),
/* harmony export */   makeReference: () => (/* binding */ makeReference),
/* harmony export */   resultKeyNameFromField: () => (/* binding */ resultKeyNameFromField),
/* harmony export */   storeKeyNameFromField: () => (/* binding */ storeKeyNameFromField),
/* harmony export */   valueToObjectRepresentation: () => (/* binding */ valueToObjectRepresentation)
/* harmony export */ });
/* harmony import */ var _globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var _common_objects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/objects.js */ "./node_modules/@apollo/client/utilities/common/objects.js");
/* harmony import */ var _fragments_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fragments.js */ "./node_modules/@apollo/client/utilities/graphql/fragments.js");
/* harmony import */ var _common_canonicalStringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/canonicalStringify.js */ "./node_modules/@apollo/client/utilities/common/canonicalStringify.js");




function makeReference(id) {
    return { __ref: String(id) };
}
function isReference(obj) {
    return Boolean(obj && typeof obj === "object" && typeof obj.__ref === "string");
}
function isDocumentNode(value) {
    return ((0,_common_objects_js__WEBPACK_IMPORTED_MODULE_1__.isNonNullObject)(value) &&
        value.kind === "Document" &&
        Array.isArray(value.definitions));
}
function isStringValue(value) {
    return value.kind === "StringValue";
}
function isBooleanValue(value) {
    return value.kind === "BooleanValue";
}
function isIntValue(value) {
    return value.kind === "IntValue";
}
function isFloatValue(value) {
    return value.kind === "FloatValue";
}
function isVariable(value) {
    return value.kind === "Variable";
}
function isObjectValue(value) {
    return value.kind === "ObjectValue";
}
function isListValue(value) {
    return value.kind === "ListValue";
}
function isEnumValue(value) {
    return value.kind === "EnumValue";
}
function isNullValue(value) {
    return value.kind === "NullValue";
}
function valueToObjectRepresentation(argObj, name, value, variables) {
    if (isIntValue(value) || isFloatValue(value)) {
        argObj[name.value] = Number(value.value);
    }
    else if (isBooleanValue(value) || isStringValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isObjectValue(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function (obj) {
            return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
        });
        argObj[name.value] = nestedArgObj_1;
    }
    else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
    }
    else if (isListValue(value)) {
        argObj[name.value] = value.values.map(function (listValue) {
            var nestedArgArrayObj = {};
            valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
            return nestedArgArrayObj[name.value];
        });
    }
    else if (isEnumValue(value)) {
        argObj[name.value] = value.value;
    }
    else if (isNullValue(value)) {
        argObj[name.value] = null;
    }
    else {
        throw (0,_globals_index_js__WEBPACK_IMPORTED_MODULE_0__.newInvariantError)(85, name.value, value.kind);
    }
}
function storeKeyNameFromField(field, variables) {
    var directivesObj = null;
    if (field.directives) {
        directivesObj = {};
        field.directives.forEach(function (directive) {
            directivesObj[directive.name.value] = {};
            if (directive.arguments) {
                directive.arguments.forEach(function (_a) {
                    var name = _a.name, value = _a.value;
                    return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
                });
            }
        });
    }
    var argObj = null;
    if (field.arguments && field.arguments.length) {
        argObj = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj, name, value, variables);
        });
    }
    return getStoreKeyName(field.name.value, argObj, directivesObj);
}
var KNOWN_DIRECTIVES = [
    "connection",
    "include",
    "skip",
    "client",
    "rest",
    "export",
    "nonreactive",
];
// Default stable JSON.stringify implementation used by getStoreKeyName. Can be
// updated/replaced with something better by calling
// getStoreKeyName.setStringify(newStringifyFunction).
var storeKeyNameStringify = _common_canonicalStringify_js__WEBPACK_IMPORTED_MODULE_2__.canonicalStringify;
var getStoreKeyName = Object.assign(function (fieldName, args, directives) {
    if (args &&
        directives &&
        directives["connection"] &&
        directives["connection"]["key"]) {
        if (directives["connection"]["filter"] &&
            directives["connection"]["filter"].length > 0) {
            var filterKeys = directives["connection"]["filter"] ?
                directives["connection"]["filter"]
                : [];
            filterKeys.sort();
            var filteredArgs_1 = {};
            filterKeys.forEach(function (key) {
                filteredArgs_1[key] = args[key];
            });
            return "".concat(directives["connection"]["key"], "(").concat(storeKeyNameStringify(filteredArgs_1), ")");
        }
        else {
            return directives["connection"]["key"];
        }
    }
    var completeFieldName = fieldName;
    if (args) {
        // We can't use `JSON.stringify` here since it's non-deterministic,
        // and can lead to different store key names being created even though
        // the `args` object used during creation has the same properties/values.
        var stringifiedArgs = storeKeyNameStringify(args);
        completeFieldName += "(".concat(stringifiedArgs, ")");
    }
    if (directives) {
        Object.keys(directives).forEach(function (key) {
            if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
                return;
            if (directives[key] && Object.keys(directives[key]).length) {
                completeFieldName += "@".concat(key, "(").concat(storeKeyNameStringify(directives[key]), ")");
            }
            else {
                completeFieldName += "@".concat(key);
            }
        });
    }
    return completeFieldName;
}, {
    setStringify: function (s) {
        var previous = storeKeyNameStringify;
        storeKeyNameStringify = s;
        return previous;
    },
});
function argumentsObjectFromField(field, variables) {
    if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function (_a) {
            var name = _a.name, value = _a.value;
            return valueToObjectRepresentation(argObj_1, name, value, variables);
        });
        return argObj_1;
    }
    return null;
}
function resultKeyNameFromField(field) {
    return field.alias ? field.alias.value : field.name.value;
}
function getTypenameFromResult(result, selectionSet, fragmentMap) {
    var fragments;
    for (var _i = 0, _a = selectionSet.selections; _i < _a.length; _i++) {
        var selection = _a[_i];
        if (isField(selection)) {
            if (selection.name.value === "__typename") {
                return result[resultKeyNameFromField(selection)];
            }
        }
        else if (fragments) {
            fragments.push(selection);
        }
        else {
            fragments = [selection];
        }
    }
    if (typeof result.__typename === "string") {
        return result.__typename;
    }
    if (fragments) {
        for (var _b = 0, fragments_1 = fragments; _b < fragments_1.length; _b++) {
            var selection = fragments_1[_b];
            var typename = getTypenameFromResult(result, (0,_fragments_js__WEBPACK_IMPORTED_MODULE_3__.getFragmentFromSelection)(selection, fragmentMap).selectionSet, fragmentMap);
            if (typeof typename === "string") {
                return typename;
            }
        }
    }
}
function isField(selection) {
    return selection.kind === "Field";
}
function isInlineFragment(selection) {
    return selection.kind === "InlineFragment";
}
//# sourceMappingURL=storeUtils.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/graphql/transform.js":
/*!********************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/graphql/transform.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTypenameToDocument: () => (/* binding */ addTypenameToDocument),
/* harmony export */   buildQueryFromSelectionSet: () => (/* binding */ buildQueryFromSelectionSet),
/* harmony export */   removeArgumentsFromDocument: () => (/* binding */ removeArgumentsFromDocument),
/* harmony export */   removeClientSetsFromDocument: () => (/* binding */ removeClientSetsFromDocument),
/* harmony export */   removeConnectionDirectiveFromDocument: () => (/* binding */ removeConnectionDirectiveFromDocument),
/* harmony export */   removeDirectivesFromDocument: () => (/* binding */ removeDirectivesFromDocument),
/* harmony export */   removeFragmentSpreadFromDocument: () => (/* binding */ removeFragmentSpreadFromDocument)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _globals_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../globals/index.js */ "./node_modules/@apollo/client/utilities/globals/index.js");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/kinds.mjs");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql */ "./node_modules/graphql/language/visitor.mjs");
/* harmony import */ var _getFromAST_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getFromAST.js */ "./node_modules/@apollo/client/utilities/graphql/getFromAST.js");
/* harmony import */ var _storeUtils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./storeUtils.js */ "./node_modules/@apollo/client/utilities/graphql/storeUtils.js");
/* harmony import */ var _fragments_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fragments.js */ "./node_modules/@apollo/client/utilities/graphql/fragments.js");
/* harmony import */ var _common_arrays_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/arrays.js */ "./node_modules/@apollo/client/utilities/common/arrays.js");







var TYPENAME_FIELD = {
    kind: graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.FIELD,
    name: {
        kind: graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.NAME,
        value: "__typename",
    },
};
function isEmpty(op, fragmentMap) {
    return (!op ||
        op.selectionSet.selections.every(function (selection) {
            return selection.kind === graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.FRAGMENT_SPREAD &&
                isEmpty(fragmentMap[selection.name.value], fragmentMap);
        }));
}
function nullIfDocIsEmpty(doc) {
    return (isEmpty((0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getOperationDefinition)(doc) || (0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getFragmentDefinition)(doc), (0,_fragments_js__WEBPACK_IMPORTED_MODULE_3__.createFragmentMap)((0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getFragmentDefinitions)(doc)))) ?
        null
        : doc;
}
function getDirectiveMatcher(configs) {
    var names = new Map();
    var tests = new Map();
    configs.forEach(function (directive) {
        if (directive) {
            if (directive.name) {
                names.set(directive.name, directive);
            }
            else if (directive.test) {
                tests.set(directive.test, directive);
            }
        }
    });
    return function (directive) {
        var config = names.get(directive.name.value);
        if (!config && tests.size) {
            tests.forEach(function (testConfig, test) {
                if (test(directive)) {
                    config = testConfig;
                }
            });
        }
        return config;
    };
}
function makeInUseGetterFunction(defaultKey) {
    var map = new Map();
    return function inUseGetterFunction(key) {
        if (key === void 0) { key = defaultKey; }
        var inUse = map.get(key);
        if (!inUse) {
            map.set(key, (inUse = {
                // Variable and fragment spread names used directly within this
                // operation or fragment definition, as identified by key. These sets
                // will be populated during the first traversal of the document in
                // removeDirectivesFromDocument below.
                variables: new Set(),
                fragmentSpreads: new Set(),
            }));
        }
        return inUse;
    };
}
function removeDirectivesFromDocument(directives, doc) {
    (0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.checkDocument)(doc);
    // Passing empty strings to makeInUseGetterFunction means we handle anonymous
    // operations as if their names were "". Anonymous fragment definitions are
    // not supposed to be possible, but the same default naming strategy seems
    // appropriate for that case as well.
    var getInUseByOperationName = makeInUseGetterFunction("");
    var getInUseByFragmentName = makeInUseGetterFunction("");
    var getInUse = function (ancestors) {
        for (var p = 0, ancestor = void 0; p < ancestors.length && (ancestor = ancestors[p]); ++p) {
            if ((0,_common_arrays_js__WEBPACK_IMPORTED_MODULE_4__.isArray)(ancestor))
                continue;
            if (ancestor.kind === graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.OPERATION_DEFINITION) {
                // If an operation is anonymous, we use the empty string as its key.
                return getInUseByOperationName(ancestor.name && ancestor.name.value);
            }
            if (ancestor.kind === graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.FRAGMENT_DEFINITION) {
                return getInUseByFragmentName(ancestor.name.value);
            }
        }
        globalThis.__DEV__ !== false && _globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.error(86);
        return null;
    };
    var operationCount = 0;
    for (var i = doc.definitions.length - 1; i >= 0; --i) {
        if (doc.definitions[i].kind === graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.OPERATION_DEFINITION) {
            ++operationCount;
        }
    }
    var directiveMatcher = getDirectiveMatcher(directives);
    var shouldRemoveField = function (nodeDirectives) {
        return (0,_common_arrays_js__WEBPACK_IMPORTED_MODULE_4__.isNonEmptyArray)(nodeDirectives) &&
            nodeDirectives
                .map(directiveMatcher)
                .some(function (config) { return config && config.remove; });
    };
    var originalFragmentDefsByPath = new Map();
    // Any time the first traversal of the document below makes a change like
    // removing a fragment (by returning null), this variable should be set to
    // true. Once it becomes true, it should never be set to false again. If this
    // variable remains false throughout the traversal, then we can return the
    // original doc immediately without any modifications.
    var firstVisitMadeChanges = false;
    var fieldOrInlineFragmentVisitor = {
        enter: function (node) {
            if (shouldRemoveField(node.directives)) {
                firstVisitMadeChanges = true;
                return null;
            }
        },
    };
    var docWithoutDirectiveSubtrees = (0,graphql__WEBPACK_IMPORTED_MODULE_5__.visit)(doc, {
        // These two AST node types share the same implementation, defined above.
        Field: fieldOrInlineFragmentVisitor,
        InlineFragment: fieldOrInlineFragmentVisitor,
        VariableDefinition: {
            enter: function () {
                // VariableDefinition nodes do not count as variables in use, though
                // they do contain Variable nodes that might be visited below. To avoid
                // counting variable declarations as usages, we skip visiting the
                // contents of this VariableDefinition node by returning false.
                return false;
            },
        },
        Variable: {
            enter: function (node, _key, _parent, _path, ancestors) {
                var inUse = getInUse(ancestors);
                if (inUse) {
                    inUse.variables.add(node.name.value);
                }
            },
        },
        FragmentSpread: {
            enter: function (node, _key, _parent, _path, ancestors) {
                if (shouldRemoveField(node.directives)) {
                    firstVisitMadeChanges = true;
                    return null;
                }
                var inUse = getInUse(ancestors);
                if (inUse) {
                    inUse.fragmentSpreads.add(node.name.value);
                }
                // We might like to remove this FragmentSpread by returning null here if
                // the corresponding FragmentDefinition node is also going to be removed
                // by the logic below, but we can't control the relative order of those
                // events, so we have to postpone the removal of dangling FragmentSpread
                // nodes until after the current visit of the document has finished.
            },
        },
        FragmentDefinition: {
            enter: function (node, _key, _parent, path) {
                originalFragmentDefsByPath.set(JSON.stringify(path), node);
            },
            leave: function (node, _key, _parent, path) {
                var originalNode = originalFragmentDefsByPath.get(JSON.stringify(path));
                if (node === originalNode) {
                    // If the FragmentNode received by this leave function is identical to
                    // the one received by the corresponding enter function (above), then
                    // the visitor must not have made any changes within this
                    // FragmentDefinition node. This fragment definition may still be
                    // removed if there are no ...spread references to it, but it won't be
                    // removed just because it has only a __typename field.
                    return node;
                }
                if (
                // This logic applies only if the document contains one or more
                // operations, since removing all fragments from a document containing
                // only fragments makes the document useless.
                operationCount > 0 &&
                    node.selectionSet.selections.every(function (selection) {
                        return selection.kind === graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.FIELD &&
                            selection.name.value === "__typename";
                    })) {
                    // This is a somewhat opinionated choice: if a FragmentDefinition ends
                    // up having no fields other than __typename, we remove the whole
                    // fragment definition, and later prune ...spread references to it.
                    getInUseByFragmentName(node.name.value).removed = true;
                    firstVisitMadeChanges = true;
                    return null;
                }
            },
        },
        Directive: {
            leave: function (node) {
                // If a matching directive is found, remove the directive itself. Note
                // that this does not remove the target (field, argument, etc) of the
                // directive, but only the directive itself.
                if (directiveMatcher(node)) {
                    firstVisitMadeChanges = true;
                    return null;
                }
            },
        },
    });
    if (!firstVisitMadeChanges) {
        // If our first pass did not change anything about the document, then there
        // is no cleanup we need to do, and we can return the original doc.
        return doc;
    }
    // Utility for making sure inUse.transitiveVars is recursively populated.
    // Because this logic assumes inUse.fragmentSpreads has been completely
    // populated and inUse.removed has been set if appropriate,
    // populateTransitiveVars must be called after that information has been
    // collected by the first traversal of the document.
    var populateTransitiveVars = function (inUse) {
        if (!inUse.transitiveVars) {
            inUse.transitiveVars = new Set(inUse.variables);
            if (!inUse.removed) {
                inUse.fragmentSpreads.forEach(function (childFragmentName) {
                    populateTransitiveVars(getInUseByFragmentName(childFragmentName)).transitiveVars.forEach(function (varName) {
                        inUse.transitiveVars.add(varName);
                    });
                });
            }
        }
        return inUse;
    };
    // Since we've been keeping track of fragment spreads used by particular
    // operations and fragment definitions, we now need to compute the set of all
    // spreads used (transitively) by any operations in the document.
    var allFragmentNamesUsed = new Set();
    docWithoutDirectiveSubtrees.definitions.forEach(function (def) {
        if (def.kind === graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.OPERATION_DEFINITION) {
            populateTransitiveVars(getInUseByOperationName(def.name && def.name.value)).fragmentSpreads.forEach(function (childFragmentName) {
                allFragmentNamesUsed.add(childFragmentName);
            });
        }
        else if (def.kind === graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.FRAGMENT_DEFINITION &&
            // If there are no operations in the document, then all fragment
            // definitions count as usages of their own fragment names. This heuristic
            // prevents accidentally removing all fragment definitions from the
            // document just because it contains no operations that use the fragments.
            operationCount === 0 &&
            !getInUseByFragmentName(def.name.value).removed) {
            allFragmentNamesUsed.add(def.name.value);
        }
    });
    // Now that we have added all fragment spreads used by operations to the
    // allFragmentNamesUsed set, we can complete the set by transitively adding
    // all fragment spreads used by those fragments, and so on.
    allFragmentNamesUsed.forEach(function (fragmentName) {
        // Once all the childFragmentName strings added here have been seen already,
        // the top-level allFragmentNamesUsed.forEach loop will terminate.
        populateTransitiveVars(getInUseByFragmentName(fragmentName)).fragmentSpreads.forEach(function (childFragmentName) {
            allFragmentNamesUsed.add(childFragmentName);
        });
    });
    var fragmentWillBeRemoved = function (fragmentName) {
        return !!(
        // A fragment definition will be removed if there are no spreads that refer
        // to it, or the fragment was explicitly removed because it had no fields
        // other than __typename.
        (!allFragmentNamesUsed.has(fragmentName) ||
            getInUseByFragmentName(fragmentName).removed));
    };
    var enterVisitor = {
        enter: function (node) {
            if (fragmentWillBeRemoved(node.name.value)) {
                return null;
            }
        },
    };
    return nullIfDocIsEmpty((0,graphql__WEBPACK_IMPORTED_MODULE_5__.visit)(docWithoutDirectiveSubtrees, {
        // If the fragment is going to be removed, then leaving any dangling
        // FragmentSpread nodes with the same name would be a mistake.
        FragmentSpread: enterVisitor,
        // This is where the fragment definition is actually removed.
        FragmentDefinition: enterVisitor,
        OperationDefinition: {
            leave: function (node) {
                // Upon leaving each operation in the depth-first AST traversal, prune
                // any variables that are declared by the operation but unused within.
                if (node.variableDefinitions) {
                    var usedVariableNames_1 = populateTransitiveVars(
                    // If an operation is anonymous, we use the empty string as its key.
                    getInUseByOperationName(node.name && node.name.value)).transitiveVars;
                    // According to the GraphQL spec, all variables declared by an
                    // operation must either be used by that operation or used by some
                    // fragment included transitively into that operation:
                    // https://spec.graphql.org/draft/#sec-All-Variables-Used
                    //
                    // To stay on the right side of this validation rule, if/when we
                    // remove the last $var references from an operation or its fragments,
                    // we must also remove the corresponding $var declaration from the
                    // enclosing operation. This pruning applies only to operations and
                    // not fragment definitions, at the moment. Fragments may be able to
                    // declare variables eventually, but today they can only consume them.
                    if (usedVariableNames_1.size < node.variableDefinitions.length) {
                        return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, node), { variableDefinitions: node.variableDefinitions.filter(function (varDef) {
                                return usedVariableNames_1.has(varDef.variable.name.value);
                            }) });
                    }
                }
            },
        },
    }));
}
var addTypenameToDocument = Object.assign(function (doc) {
    return (0,graphql__WEBPACK_IMPORTED_MODULE_5__.visit)(doc, {
        SelectionSet: {
            enter: function (node, _key, parent) {
                // Don't add __typename to OperationDefinitions.
                if (parent &&
                    parent.kind ===
                        graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.OPERATION_DEFINITION) {
                    return;
                }
                // No changes if no selections.
                var selections = node.selections;
                if (!selections) {
                    return;
                }
                // If selections already have a __typename, or are part of an
                // introspection query, do nothing.
                var skip = selections.some(function (selection) {
                    return ((0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_7__.isField)(selection) &&
                        (selection.name.value === "__typename" ||
                            selection.name.value.lastIndexOf("__", 0) === 0));
                });
                if (skip) {
                    return;
                }
                // If this SelectionSet is @export-ed as an input variable, it should
                // not have a __typename field (see issue #4691).
                var field = parent;
                if ((0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_7__.isField)(field) &&
                    field.directives &&
                    field.directives.some(function (d) { return d.name.value === "export"; })) {
                    return;
                }
                // Create and return a new SelectionSet with a __typename Field.
                return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, node), { selections: (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__spreadArray)([], selections, true), [TYPENAME_FIELD], false) });
            },
        },
    });
}, {
    added: function (field) {
        return field === TYPENAME_FIELD;
    },
});
var connectionRemoveConfig = {
    test: function (directive) {
        var willRemove = directive.name.value === "connection";
        if (willRemove) {
            if (!directive.arguments ||
                !directive.arguments.some(function (arg) { return arg.name.value === "key"; })) {
                globalThis.__DEV__ !== false && _globals_index_js__WEBPACK_IMPORTED_MODULE_0__.invariant.warn(87);
            }
        }
        return willRemove;
    },
};
function removeConnectionDirectiveFromDocument(doc) {
    return removeDirectivesFromDocument([connectionRemoveConfig], (0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.checkDocument)(doc));
}
function hasDirectivesInSelectionSet(directives, selectionSet, nestedCheck) {
    if (nestedCheck === void 0) { nestedCheck = true; }
    return (!!selectionSet &&
        selectionSet.selections &&
        selectionSet.selections.some(function (selection) {
            return hasDirectivesInSelection(directives, selection, nestedCheck);
        }));
}
function hasDirectivesInSelection(directives, selection, nestedCheck) {
    if (nestedCheck === void 0) { nestedCheck = true; }
    if (!(0,_storeUtils_js__WEBPACK_IMPORTED_MODULE_7__.isField)(selection)) {
        return true;
    }
    if (!selection.directives) {
        return false;
    }
    return (selection.directives.some(getDirectiveMatcher(directives)) ||
        (nestedCheck &&
            hasDirectivesInSelectionSet(directives, selection.selectionSet, nestedCheck)));
}
function getArgumentMatcher(config) {
    return function argumentMatcher(argument) {
        return config.some(function (aConfig) {
            return argument.value &&
                argument.value.kind === graphql__WEBPACK_IMPORTED_MODULE_1__.Kind.VARIABLE &&
                argument.value.name &&
                (aConfig.name === argument.value.name.value ||
                    (aConfig.test && aConfig.test(argument)));
        });
    };
}
function removeArgumentsFromDocument(config, doc) {
    var argMatcher = getArgumentMatcher(config);
    return nullIfDocIsEmpty((0,graphql__WEBPACK_IMPORTED_MODULE_5__.visit)(doc, {
        OperationDefinition: {
            enter: function (node) {
                return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, node), { 
                    // Remove matching top level variables definitions.
                    variableDefinitions: node.variableDefinitions ?
                        node.variableDefinitions.filter(function (varDef) {
                            return !config.some(function (arg) { return arg.name === varDef.variable.name.value; });
                        })
                        : [] });
            },
        },
        Field: {
            enter: function (node) {
                // If `remove` is set to true for an argument, and an argument match
                // is found for a field, remove the field as well.
                var shouldRemoveField = config.some(function (argConfig) { return argConfig.remove; });
                if (shouldRemoveField) {
                    var argMatchCount_1 = 0;
                    if (node.arguments) {
                        node.arguments.forEach(function (arg) {
                            if (argMatcher(arg)) {
                                argMatchCount_1 += 1;
                            }
                        });
                    }
                    if (argMatchCount_1 === 1) {
                        return null;
                    }
                }
            },
        },
        Argument: {
            enter: function (node) {
                // Remove all matching arguments.
                if (argMatcher(node)) {
                    return null;
                }
            },
        },
    }));
}
function removeFragmentSpreadFromDocument(config, doc) {
    function enter(node) {
        if (config.some(function (def) { return def.name === node.name.value; })) {
            return null;
        }
    }
    return nullIfDocIsEmpty((0,graphql__WEBPACK_IMPORTED_MODULE_5__.visit)(doc, {
        FragmentSpread: { enter: enter },
        FragmentDefinition: { enter: enter },
    }));
}
// If the incoming document is a query, return it as is. Otherwise, build a
// new document containing a query operation based on the selection set
// of the previous main operation.
function buildQueryFromSelectionSet(document) {
    var definition = (0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.getMainDefinition)(document);
    var definitionOperation = definition.operation;
    if (definitionOperation === "query") {
        // Already a query, so return the existing document.
        return document;
    }
    // Build a new query using the selection set of the main operation.
    var modifiedDoc = (0,graphql__WEBPACK_IMPORTED_MODULE_5__.visit)(document, {
        OperationDefinition: {
            enter: function (node) {
                return (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_6__.__assign)({}, node), { operation: "query" });
            },
        },
    });
    return modifiedDoc;
}
// Remove fields / selection sets that include an @client directive.
function removeClientSetsFromDocument(document) {
    (0,_getFromAST_js__WEBPACK_IMPORTED_MODULE_2__.checkDocument)(document);
    var modifiedDoc = removeDirectivesFromDocument([
        {
            test: function (directive) { return directive.name.value === "client"; },
            remove: true,
        },
    ], document);
    return modifiedDoc;
}
//# sourceMappingURL=transform.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/observables/Concast.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/observables/Concast.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Concast: () => (/* binding */ Concast)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Observable.js */ "./node_modules/zen-observable-ts/module.js");
/* harmony import */ var _iteration_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iteration.js */ "./node_modules/@apollo/client/utilities/observables/iteration.js");
/* harmony import */ var _subclassing_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./subclassing.js */ "./node_modules/@apollo/client/utilities/observables/subclassing.js");




function isPromiseLike(value) {
    return value && typeof value.then === "function";
}
// A Concast<T> observable concatenates the given sources into a single
// non-overlapping sequence of Ts, automatically unwrapping any promises,
// and broadcasts the T elements of that sequence to any number of
// subscribers, all without creating a bunch of intermediary Observable
// wrapper objects.
//
// Even though any number of observers can subscribe to the Concast, each
// source observable is guaranteed to receive at most one subscribe call,
// and the results are multicast to all observers.
//
// In addition to broadcasting every next/error message to this.observers,
// the Concast stores the most recent message using this.latest, so any
// new observers can immediately receive the latest message, even if it
// was originally delivered in the past. This behavior means we can assume
// every active observer in this.observers has received the same most
// recent message.
//
// With the exception of this.latest replay, a Concast is a "hot"
// observable in the sense that it does not replay past results from the
// beginning of time for each new observer.
//
// Could we have used some existing RxJS class instead? Concast<T> is
// similar to a BehaviorSubject<T>, because it is multicast and redelivers
// the latest next/error message to new subscribers. Unlike Subject<T>,
// Concast<T> does not expose an Observer<T> interface (this.handlers is
// intentionally private), since Concast<T> gets its inputs from the
// concatenated sources. If we ever switch to RxJS, there may be some
// value in reusing their code, but for now we use zen-observable, which
// does not contain any Subject implementations.
var Concast = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Concast, _super);
    // Not only can the individual elements of the iterable be promises, but
    // also the iterable itself can be wrapped in a promise.
    function Concast(sources) {
        var _this = _super.call(this, function (observer) {
            _this.addObserver(observer);
            return function () { return _this.removeObserver(observer); };
        }) || this;
        // Active observers receiving broadcast messages. Thanks to this.latest,
        // we can assume all observers in this Set have received the same most
        // recent message, though possibly at different times in the past.
        _this.observers = new Set();
        _this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
        // Bound handler functions that can be reused for every internal
        // subscription.
        _this.handlers = {
            next: function (result) {
                if (_this.sub !== null) {
                    _this.latest = ["next", result];
                    _this.notify("next", result);
                    (0,_iteration_js__WEBPACK_IMPORTED_MODULE_1__.iterateObserversSafely)(_this.observers, "next", result);
                }
            },
            error: function (error) {
                var sub = _this.sub;
                if (sub !== null) {
                    // Delay unsubscribing from the underlying subscription slightly,
                    // so that immediately subscribing another observer can keep the
                    // subscription active.
                    if (sub)
                        setTimeout(function () { return sub.unsubscribe(); });
                    _this.sub = null;
                    _this.latest = ["error", error];
                    _this.reject(error);
                    _this.notify("error", error);
                    (0,_iteration_js__WEBPACK_IMPORTED_MODULE_1__.iterateObserversSafely)(_this.observers, "error", error);
                }
            },
            complete: function () {
                var _a = _this, sub = _a.sub, _b = _a.sources, sources = _b === void 0 ? [] : _b;
                if (sub !== null) {
                    // If complete is called before concast.start, this.sources may be
                    // undefined, so we use a default value of [] for sources. That works
                    // here because it falls into the if (!value) {...} block, which
                    // appropriately terminates the Concast, even if this.sources might
                    // eventually have been initialized to a non-empty array.
                    var value = sources.shift();
                    if (!value) {
                        if (sub)
                            setTimeout(function () { return sub.unsubscribe(); });
                        _this.sub = null;
                        if (_this.latest && _this.latest[0] === "next") {
                            _this.resolve(_this.latest[1]);
                        }
                        else {
                            _this.resolve();
                        }
                        _this.notify("complete");
                        // We do not store this.latest = ["complete"], because doing so
                        // discards useful information about the previous next (or
                        // error) message. Instead, if new observers subscribe after
                        // this Concast has completed, they will receive the final
                        // 'next' message (unless there was an error) immediately
                        // followed by a 'complete' message (see addObserver).
                        (0,_iteration_js__WEBPACK_IMPORTED_MODULE_1__.iterateObserversSafely)(_this.observers, "complete");
                    }
                    else if (isPromiseLike(value)) {
                        value.then(function (obs) { return (_this.sub = obs.subscribe(_this.handlers)); }, _this.handlers.error);
                    }
                    else {
                        _this.sub = value.subscribe(_this.handlers);
                    }
                }
            },
        };
        _this.nextResultListeners = new Set();
        // A public way to abort observation and broadcast.
        _this.cancel = function (reason) {
            _this.reject(reason);
            _this.sources = [];
            _this.handlers.error(reason);
        };
        // Suppress rejection warnings for this.promise, since it's perfectly
        // acceptable to pay no attention to this.promise if you're consuming
        // the results through the normal observable API.
        _this.promise.catch(function (_) { });
        // If someone accidentally tries to create a Concast using a subscriber
        // function, recover by creating an Observable from that subscriber and
        // using it as the source.
        if (typeof sources === "function") {
            sources = [new _Observable_js__WEBPACK_IMPORTED_MODULE_2__.Observable(sources)];
        }
        if (isPromiseLike(sources)) {
            sources.then(function (iterable) { return _this.start(iterable); }, _this.handlers.error);
        }
        else {
            _this.start(sources);
        }
        return _this;
    }
    Concast.prototype.start = function (sources) {
        if (this.sub !== void 0)
            return;
        // In practice, sources is most often simply an Array of observables.
        // TODO Consider using sources[Symbol.iterator]() to take advantage
        // of the laziness of non-Array iterables.
        this.sources = Array.from(sources);
        // Calling this.handlers.complete() kicks off consumption of the first
        // source observable. It's tempting to do this step lazily in
        // addObserver, but this.promise can be accessed without calling
        // addObserver, so consumption needs to begin eagerly.
        this.handlers.complete();
    };
    Concast.prototype.deliverLastMessage = function (observer) {
        if (this.latest) {
            var nextOrError = this.latest[0];
            var method = observer[nextOrError];
            if (method) {
                method.call(observer, this.latest[1]);
            }
            // If the subscription is already closed, and the last message was
            // a 'next' message, simulate delivery of the final 'complete'
            // message again.
            if (this.sub === null && nextOrError === "next" && observer.complete) {
                observer.complete();
            }
        }
    };
    Concast.prototype.addObserver = function (observer) {
        if (!this.observers.has(observer)) {
            // Immediately deliver the most recent message, so we can always
            // be sure all observers have the latest information.
            this.deliverLastMessage(observer);
            this.observers.add(observer);
        }
    };
    Concast.prototype.removeObserver = function (observer) {
        if (this.observers.delete(observer) && this.observers.size < 1) {
            // In case there are still any listeners in this.nextResultListeners, and
            // no error or completion has been broadcast yet, make sure those
            // observers have a chance to run and then remove themselves from
            // this.observers.
            this.handlers.complete();
        }
    };
    Concast.prototype.notify = function (method, arg) {
        var nextResultListeners = this.nextResultListeners;
        if (nextResultListeners.size) {
            // Replacing this.nextResultListeners first ensures it does not grow while
            // we are iterating over it, potentially leading to infinite loops.
            this.nextResultListeners = new Set();
            nextResultListeners.forEach(function (listener) { return listener(method, arg); });
        }
    };
    // We need a way to run callbacks just *before* the next result (or error or
    // completion) is delivered by this Concast, so we can be sure any code that
    // runs as a result of delivering that result/error observes the effects of
    // running the callback(s). It was tempting to reuse the Observer type instead
    // of introducing NextResultListener, but that messes with the sizing and
    // maintenance of this.observers, and ends up being more code overall.
    Concast.prototype.beforeNext = function (callback) {
        var called = false;
        this.nextResultListeners.add(function (method, arg) {
            if (!called) {
                called = true;
                callback(method, arg);
            }
        });
    };
    return Concast;
}(_Observable_js__WEBPACK_IMPORTED_MODULE_2__.Observable));

// Necessary because the Concast constructor has a different signature
// than the Observable constructor.
(0,_subclassing_js__WEBPACK_IMPORTED_MODULE_3__.fixObservableSubclass)(Concast);
//# sourceMappingURL=Concast.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/observables/asyncMap.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/observables/asyncMap.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   asyncMap: () => (/* binding */ asyncMap)
/* harmony export */ });
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observable.js */ "./node_modules/zen-observable-ts/module.js");

// Like Observable.prototype.map, except that the mapping function can
// optionally return a Promise (or be async).
function asyncMap(observable, mapFn, catchFn) {
    return new _Observable_js__WEBPACK_IMPORTED_MODULE_0__.Observable(function (observer) {
        var promiseQueue = {
            // Normally we would initialize promiseQueue to Promise.resolve(), but
            // in this case, for backwards compatibility, we need to be careful to
            // invoke the first callback synchronously.
            then: function (callback) {
                return new Promise(function (resolve) { return resolve(callback()); });
            },
        };
        function makeCallback(examiner, key) {
            return function (arg) {
                if (examiner) {
                    var both = function () {
                        // If the observer is closed, we don't want to continue calling the
                        // mapping function - it's result will be swallowed anyways.
                        return observer.closed ?
                            /* will be swallowed */ 0
                            : examiner(arg);
                    };
                    promiseQueue = promiseQueue.then(both, both).then(function (result) { return observer.next(result); }, function (error) { return observer.error(error); });
                }
                else {
                    observer[key](arg);
                }
            };
        }
        var handler = {
            next: makeCallback(mapFn, "next"),
            error: makeCallback(catchFn, "error"),
            complete: function () {
                // no need to reassign `promiseQueue`, after `observer.complete`,
                // the observer will be closed and short-circuit everything anyways
                /*promiseQueue = */ promiseQueue.then(function () { return observer.complete(); });
            },
        };
        var sub = observable.subscribe(handler);
        return function () { return sub.unsubscribe(); };
    });
}
//# sourceMappingURL=asyncMap.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/observables/iteration.js":
/*!************************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/observables/iteration.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iterateObserversSafely: () => (/* binding */ iterateObserversSafely)
/* harmony export */ });
function iterateObserversSafely(observers, method, argument) {
    // In case observers is modified during iteration, we need to commit to the
    // original elements, which also provides an opportunity to filter them down
    // to just the observers with the given method.
    var observersWithMethod = [];
    observers.forEach(function (obs) { return obs[method] && observersWithMethod.push(obs); });
    observersWithMethod.forEach(function (obs) { return obs[method](argument); });
}
//# sourceMappingURL=iteration.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/utilities/observables/subclassing.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@apollo/client/utilities/observables/subclassing.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fixObservableSubclass: () => (/* binding */ fixObservableSubclass)
/* harmony export */ });
/* harmony import */ var _Observable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Observable.js */ "./node_modules/zen-observable-ts/module.js");
/* harmony import */ var _common_canUse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/canUse.js */ "./node_modules/@apollo/client/utilities/common/canUse.js");


// Generic implementations of Observable.prototype methods like map and
// filter need to know how to create a new Observable from an Observable
// subclass (like Concast or ObservableQuery). Those methods assume
// (perhaps unwisely?) that they can call the subtype's constructor with a
// Subscriber function, even though the subclass constructor might expect
// different parameters. Defining this static Symbol.species property on
// the subclass is a hint to generic Observable code to use the default
// constructor instead of trying to do `new Subclass(observer => ...)`.
function fixObservableSubclass(subclass) {
    function set(key) {
        // Object.defineProperty is necessary because the Symbol.species
        // property is a getter by default in modern JS environments, so we
        // can't assign to it with a normal assignment expression.
        Object.defineProperty(subclass, key, { value: _Observable_js__WEBPACK_IMPORTED_MODULE_0__.Observable });
    }
    if (_common_canUse_js__WEBPACK_IMPORTED_MODULE_1__.canUseSymbol && Symbol.species) {
        set(Symbol.species);
    }
    // The "@@species" string is used as a fake Symbol.species value in some
    // polyfill systems (including the SymbolSpecies variable used by
    // zen-observable), so we should set it as well, to be safe.
    set("@@species");
    return subclass;
}
//# sourceMappingURL=subclassing.js.map

/***/ }),

/***/ "./node_modules/@apollo/client/version.js":
/*!************************************************!*\
  !*** ./node_modules/@apollo/client/version.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
var version = "3.11.4";
//# sourceMappingURL=version.js.map

/***/ }),

/***/ "./node_modules/@wry/caches/lib/strong.js":
/*!************************************************!*\
  !*** ./node_modules/@wry/caches/lib/strong.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StrongCache: () => (/* binding */ StrongCache)
/* harmony export */ });
function defaultDispose() { }
class StrongCache {
    constructor(max = Infinity, dispose = defaultDispose) {
        this.max = max;
        this.dispose = dispose;
        this.map = new Map();
        this.newest = null;
        this.oldest = null;
    }
    has(key) {
        return this.map.has(key);
    }
    get(key) {
        const node = this.getNode(key);
        return node && node.value;
    }
    get size() {
        return this.map.size;
    }
    getNode(key) {
        const node = this.map.get(key);
        if (node && node !== this.newest) {
            const { older, newer } = node;
            if (newer) {
                newer.older = older;
            }
            if (older) {
                older.newer = newer;
            }
            node.older = this.newest;
            node.older.newer = node;
            node.newer = null;
            this.newest = node;
            if (node === this.oldest) {
                this.oldest = newer;
            }
        }
        return node;
    }
    set(key, value) {
        let node = this.getNode(key);
        if (node) {
            return node.value = value;
        }
        node = {
            key,
            value,
            newer: null,
            older: this.newest
        };
        if (this.newest) {
            this.newest.newer = node;
        }
        this.newest = node;
        this.oldest = this.oldest || node;
        this.map.set(key, node);
        return node.value;
    }
    clean() {
        while (this.oldest && this.map.size > this.max) {
            this.delete(this.oldest.key);
        }
    }
    delete(key) {
        const node = this.map.get(key);
        if (node) {
            if (node === this.newest) {
                this.newest = node.older;
            }
            if (node === this.oldest) {
                this.oldest = node.newer;
            }
            if (node.newer) {
                node.newer.older = node.older;
            }
            if (node.older) {
                node.older.newer = node.newer;
            }
            this.map.delete(key);
            this.dispose(node.value, key);
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=strong.js.map

/***/ }),

/***/ "./node_modules/@wry/caches/lib/weak.js":
/*!**********************************************!*\
  !*** ./node_modules/@wry/caches/lib/weak.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WeakCache: () => (/* binding */ WeakCache)
/* harmony export */ });
function noop() { }
const defaultDispose = noop;
const _WeakRef = typeof WeakRef !== "undefined"
    ? WeakRef
    : function (value) {
        return { deref: () => value };
    };
const _WeakMap = typeof WeakMap !== "undefined" ? WeakMap : Map;
const _FinalizationRegistry = typeof FinalizationRegistry !== "undefined"
    ? FinalizationRegistry
    : function () {
        return {
            register: noop,
            unregister: noop,
        };
    };
const finalizationBatchSize = 10024;
class WeakCache {
    constructor(max = Infinity, dispose = defaultDispose) {
        this.max = max;
        this.dispose = dispose;
        this.map = new _WeakMap();
        this.newest = null;
        this.oldest = null;
        this.unfinalizedNodes = new Set();
        this.finalizationScheduled = false;
        this.size = 0;
        this.finalize = () => {
            const iterator = this.unfinalizedNodes.values();
            for (let i = 0; i < finalizationBatchSize; i++) {
                const node = iterator.next().value;
                if (!node)
                    break;
                this.unfinalizedNodes.delete(node);
                const key = node.key;
                delete node.key;
                node.keyRef = new _WeakRef(key);
                this.registry.register(key, node, node);
            }
            if (this.unfinalizedNodes.size > 0) {
                queueMicrotask(this.finalize);
            }
            else {
                this.finalizationScheduled = false;
            }
        };
        this.registry = new _FinalizationRegistry(this.deleteNode.bind(this));
    }
    has(key) {
        return this.map.has(key);
    }
    get(key) {
        const node = this.getNode(key);
        return node && node.value;
    }
    getNode(key) {
        const node = this.map.get(key);
        if (node && node !== this.newest) {
            const { older, newer } = node;
            if (newer) {
                newer.older = older;
            }
            if (older) {
                older.newer = newer;
            }
            node.older = this.newest;
            node.older.newer = node;
            node.newer = null;
            this.newest = node;
            if (node === this.oldest) {
                this.oldest = newer;
            }
        }
        return node;
    }
    set(key, value) {
        let node = this.getNode(key);
        if (node) {
            return (node.value = value);
        }
        node = {
            key,
            value,
            newer: null,
            older: this.newest,
        };
        if (this.newest) {
            this.newest.newer = node;
        }
        this.newest = node;
        this.oldest = this.oldest || node;
        this.scheduleFinalization(node);
        this.map.set(key, node);
        this.size++;
        return node.value;
    }
    clean() {
        while (this.oldest && this.size > this.max) {
            this.deleteNode(this.oldest);
        }
    }
    deleteNode(node) {
        if (node === this.newest) {
            this.newest = node.older;
        }
        if (node === this.oldest) {
            this.oldest = node.newer;
        }
        if (node.newer) {
            node.newer.older = node.older;
        }
        if (node.older) {
            node.older.newer = node.newer;
        }
        this.size--;
        const key = node.key || (node.keyRef && node.keyRef.deref());
        this.dispose(node.value, key);
        if (!node.keyRef) {
            this.unfinalizedNodes.delete(node);
        }
        else {
            this.registry.unregister(node);
        }
        if (key)
            this.map.delete(key);
    }
    delete(key) {
        const node = this.map.get(key);
        if (node) {
            this.deleteNode(node);
            return true;
        }
        return false;
    }
    scheduleFinalization(node) {
        this.unfinalizedNodes.add(node);
        if (!this.finalizationScheduled) {
            this.finalizationScheduled = true;
            queueMicrotask(this.finalize);
        }
    }
}
//# sourceMappingURL=weak.js.map

/***/ }),

/***/ "./node_modules/@wry/context/lib/index.js":
/*!************************************************!*\
  !*** ./node_modules/@wry/context/lib/index.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slot: () => (/* reexport safe */ _slot_js__WEBPACK_IMPORTED_MODULE_0__.Slot),
/* harmony export */   asyncFromGen: () => (/* binding */ asyncFromGen),
/* harmony export */   bind: () => (/* binding */ bind),
/* harmony export */   noContext: () => (/* binding */ noContext),
/* harmony export */   setTimeout: () => (/* binding */ setTimeoutWithContext),
/* harmony export */   wrapYieldingFiberMethods: () => (/* binding */ wrapYieldingFiberMethods)
/* harmony export */ });
/* harmony import */ var _slot_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slot.js */ "./node_modules/@wry/context/lib/slot.js");


const { bind, noContext } = _slot_js__WEBPACK_IMPORTED_MODULE_0__.Slot;
// Like global.setTimeout, except the callback runs with captured context.

function setTimeoutWithContext(callback, delay) {
    return setTimeout(bind(callback), delay);
}
// Turn any generator function into an async function (using yield instead
// of await), with context automatically preserved across yields.
function asyncFromGen(genFn) {
    return function () {
        const gen = genFn.apply(this, arguments);
        const boundNext = bind(gen.next);
        const boundThrow = bind(gen.throw);
        return new Promise((resolve, reject) => {
            function invoke(method, argument) {
                try {
                    var result = method.call(gen, argument);
                }
                catch (error) {
                    return reject(error);
                }
                const next = result.done ? resolve : invokeNext;
                if (isPromiseLike(result.value)) {
                    result.value.then(next, result.done ? reject : invokeThrow);
                }
                else {
                    next(result.value);
                }
            }
            const invokeNext = (value) => invoke(boundNext, value);
            const invokeThrow = (error) => invoke(boundThrow, error);
            invokeNext();
        });
    };
}
function isPromiseLike(value) {
    return value && typeof value.then === "function";
}
// If you use the fibers npm package to implement coroutines in Node.js,
// you should call this function at least once to ensure context management
// remains coherent across any yields.
const wrappedFibers = [];
function wrapYieldingFiberMethods(Fiber) {
    // There can be only one implementation of Fiber per process, so this array
    // should never grow longer than one element.
    if (wrappedFibers.indexOf(Fiber) < 0) {
        const wrap = (obj, method) => {
            const fn = obj[method];
            obj[method] = function () {
                return noContext(fn, arguments, this);
            };
        };
        // These methods can yield, according to
        // https://github.com/laverdet/node-fibers/blob/ddebed9b8ae3883e57f822e2108e6943e5c8d2a8/fibers.js#L97-L100
        wrap(Fiber, "yield");
        wrap(Fiber.prototype, "run");
        wrap(Fiber.prototype, "throwInto");
        wrappedFibers.push(Fiber);
    }
    return Fiber;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wry/context/lib/slot.js":
/*!***********************************************!*\
  !*** ./node_modules/@wry/context/lib/slot.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slot: () => (/* binding */ Slot)
/* harmony export */ });
// This currentContext variable will only be used if the makeSlotClass
// function is called, which happens only if this is the first copy of the
// @wry/context package to be imported.
let currentContext = null;
// This unique internal object is used to denote the absence of a value
// for a given Slot, and is never exposed to outside code.
const MISSING_VALUE = {};
let idCounter = 1;
// Although we can't do anything about the cost of duplicated code from
// accidentally bundling multiple copies of the @wry/context package, we can
// avoid creating the Slot class more than once using makeSlotClass.
const makeSlotClass = () => class Slot {
    constructor() {
        // If you have a Slot object, you can find out its slot.id, but you cannot
        // guess the slot.id of a Slot you don't have access to, thanks to the
        // randomized suffix.
        this.id = [
            "slot",
            idCounter++,
            Date.now(),
            Math.random().toString(36).slice(2),
        ].join(":");
    }
    hasValue() {
        for (let context = currentContext; context; context = context.parent) {
            // We use the Slot object iself as a key to its value, which means the
            // value cannot be obtained without a reference to the Slot object.
            if (this.id in context.slots) {
                const value = context.slots[this.id];
                if (value === MISSING_VALUE)
                    break;
                if (context !== currentContext) {
                    // Cache the value in currentContext.slots so the next lookup will
                    // be faster. This caching is safe because the tree of contexts and
                    // the values of the slots are logically immutable.
                    currentContext.slots[this.id] = value;
                }
                return true;
            }
        }
        if (currentContext) {
            // If a value was not found for this Slot, it's never going to be found
            // no matter how many times we look it up, so we might as well cache
            // the absence of the value, too.
            currentContext.slots[this.id] = MISSING_VALUE;
        }
        return false;
    }
    getValue() {
        if (this.hasValue()) {
            return currentContext.slots[this.id];
        }
    }
    withValue(value, callback, 
    // Given the prevalence of arrow functions, specifying arguments is likely
    // to be much more common than specifying `this`, hence this ordering:
    args, thisArg) {
        const slots = {
            __proto__: null,
            [this.id]: value,
        };
        const parent = currentContext;
        currentContext = { parent, slots };
        try {
            // Function.prototype.apply allows the arguments array argument to be
            // omitted or undefined, so args! is fine here.
            return callback.apply(thisArg, args);
        }
        finally {
            currentContext = parent;
        }
    }
    // Capture the current context and wrap a callback function so that it
    // reestablishes the captured context when called.
    static bind(callback) {
        const context = currentContext;
        return function () {
            const saved = currentContext;
            try {
                currentContext = context;
                return callback.apply(this, arguments);
            }
            finally {
                currentContext = saved;
            }
        };
    }
    // Immediately run a callback function without any captured context.
    static noContext(callback, 
    // Given the prevalence of arrow functions, specifying arguments is likely
    // to be much more common than specifying `this`, hence this ordering:
    args, thisArg) {
        if (currentContext) {
            const saved = currentContext;
            try {
                currentContext = null;
                // Function.prototype.apply allows the arguments array argument to be
                // omitted or undefined, so args! is fine here.
                return callback.apply(thisArg, args);
            }
            finally {
                currentContext = saved;
            }
        }
        else {
            return callback.apply(thisArg, args);
        }
    }
};
function maybe(fn) {
    try {
        return fn();
    }
    catch (ignored) { }
}
// We store a single global implementation of the Slot class as a permanent
// non-enumerable property of the globalThis object. This obfuscation does
// nothing to prevent access to the Slot class, but at least it ensures the
// implementation (i.e. currentContext) cannot be tampered with, and all copies
// of the @wry/context package (hopefully just one) will share the same Slot
// implementation. Since the first copy of the @wry/context package to be
// imported wins, this technique imposes a steep cost for any future breaking
// changes to the Slot class.
const globalKey = "@wry/context:Slot";
const host = 
// Prefer globalThis when available.
// https://github.com/benjamn/wryware/issues/347
maybe(() => globalThis) ||
    // Fall back to global, which works in Node.js and may be converted by some
    // bundlers to the appropriate identifier (window, self, ...) depending on the
    // bundling target. https://github.com/endojs/endo/issues/576#issuecomment-1178515224
    maybe(() => global) ||
    // Otherwise, use a dummy host that's local to this module. We used to fall
    // back to using the Array constructor as a namespace, but that was flagged in
    // https://github.com/benjamn/wryware/issues/347, and can be avoided.
    Object.create(null);
// Whichever globalHost we're using, make TypeScript happy about the additional
// globalKey property.
const globalHost = host;
const Slot = globalHost[globalKey] ||
    // Earlier versions of this package stored the globalKey property on the Array
    // constructor, so we check there as well, to prevent Slot class duplication.
    Array[globalKey] ||
    (function (Slot) {
        try {
            Object.defineProperty(globalHost, globalKey, {
                value: Slot,
                enumerable: false,
                writable: false,
                // When it was possible for globalHost to be the Array constructor (a
                // legacy Slot dedup strategy), it was important for the property to be
                // configurable:true so it could be deleted. That does not seem to be as
                // important when globalHost is the global object, but I don't want to
                // cause similar problems again, and configurable:true seems safest.
                // https://github.com/endojs/endo/issues/576#issuecomment-1178274008
                configurable: true
            });
        }
        finally {
            return Slot;
        }
    })(makeSlotClass());
//# sourceMappingURL=slot.js.map

/***/ }),

/***/ "./node_modules/@wry/equality/lib/index.js":
/*!*************************************************!*\
  !*** ./node_modules/@wry/equality/lib/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   equal: () => (/* binding */ equal)
/* harmony export */ });
const { toString, hasOwnProperty } = Object.prototype;
const fnToStr = Function.prototype.toString;
const previousComparisons = new Map();
/**
 * Performs a deep equality check on two JavaScript values, tolerating cycles.
 */
function equal(a, b) {
    try {
        return check(a, b);
    }
    finally {
        previousComparisons.clear();
    }
}
// Allow default imports as well.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (equal);
function check(a, b) {
    // If the two values are strictly equal, our job is easy.
    if (a === b) {
        return true;
    }
    // Object.prototype.toString returns a representation of the runtime type of
    // the given value that is considerably more precise than typeof.
    const aTag = toString.call(a);
    const bTag = toString.call(b);
    // If the runtime types of a and b are different, they could maybe be equal
    // under some interpretation of equality, but for simplicity and performance
    // we just return false instead.
    if (aTag !== bTag) {
        return false;
    }
    switch (aTag) {
        case '[object Array]':
            // Arrays are a lot like other objects, but we can cheaply compare their
            // lengths as a short-cut before comparing their elements.
            if (a.length !== b.length)
                return false;
        // Fall through to object case...
        case '[object Object]': {
            if (previouslyCompared(a, b))
                return true;
            const aKeys = definedKeys(a);
            const bKeys = definedKeys(b);
            // If `a` and `b` have a different number of enumerable keys, they
            // must be different.
            const keyCount = aKeys.length;
            if (keyCount !== bKeys.length)
                return false;
            // Now make sure they have the same keys.
            for (let k = 0; k < keyCount; ++k) {
                if (!hasOwnProperty.call(b, aKeys[k])) {
                    return false;
                }
            }
            // Finally, check deep equality of all child properties.
            for (let k = 0; k < keyCount; ++k) {
                const key = aKeys[k];
                if (!check(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
        case '[object Error]':
            return a.name === b.name && a.message === b.message;
        case '[object Number]':
            // Handle NaN, which is !== itself.
            if (a !== a)
                return b !== b;
        // Fall through to shared +a === +b case...
        case '[object Boolean]':
        case '[object Date]':
            return +a === +b;
        case '[object RegExp]':
        case '[object String]':
            return a == `${b}`;
        case '[object Map]':
        case '[object Set]': {
            if (a.size !== b.size)
                return false;
            if (previouslyCompared(a, b))
                return true;
            const aIterator = a.entries();
            const isMap = aTag === '[object Map]';
            while (true) {
                const info = aIterator.next();
                if (info.done)
                    break;
                // If a instanceof Set, aValue === aKey.
                const [aKey, aValue] = info.value;
                // So this works the same way for both Set and Map.
                if (!b.has(aKey)) {
                    return false;
                }
                // However, we care about deep equality of values only when dealing
                // with Map structures.
                if (isMap && !check(aValue, b.get(aKey))) {
                    return false;
                }
            }
            return true;
        }
        case '[object Uint16Array]':
        case '[object Uint8Array]': // Buffer, in Node.js.
        case '[object Uint32Array]':
        case '[object Int32Array]':
        case '[object Int8Array]':
        case '[object Int16Array]':
        case '[object ArrayBuffer]':
            // DataView doesn't need these conversions, but the equality check is
            // otherwise the same.
            a = new Uint8Array(a);
            b = new Uint8Array(b);
        // Fall through...
        case '[object DataView]': {
            let len = a.byteLength;
            if (len === b.byteLength) {
                while (len-- && a[len] === b[len]) {
                    // Keep looping as long as the bytes are equal.
                }
            }
            return len === -1;
        }
        case '[object AsyncFunction]':
        case '[object GeneratorFunction]':
        case '[object AsyncGeneratorFunction]':
        case '[object Function]': {
            const aCode = fnToStr.call(a);
            if (aCode !== fnToStr.call(b)) {
                return false;
            }
            // We consider non-native functions equal if they have the same code
            // (native functions require === because their code is censored).
            // Note that this behavior is not entirely sound, since !== function
            // objects with the same code can behave differently depending on
            // their closure scope. However, any function can behave differently
            // depending on the values of its input arguments (including this)
            // and its calling context (including its closure scope), even
            // though the function object is === to itself; and it is entirely
            // possible for functions that are not === to behave exactly the
            // same under all conceivable circumstances. Because none of these
            // factors are statically decidable in JavaScript, JS function
            // equality is not well-defined. This ambiguity allows us to
            // consider the best possible heuristic among various imperfect
            // options, and equating non-native functions that have the same
            // code has enormous practical benefits, such as when comparing
            // functions that are repeatedly passed as fresh function
            // expressions within objects that are otherwise deeply equal. Since
            // any function created from the same syntactic expression (in the
            // same code location) will always stringify to the same code
            // according to fnToStr.call, we can reasonably expect these
            // repeatedly passed function expressions to have the same code, and
            // thus behave "the same" (with all the caveats mentioned above),
            // even though the runtime function objects are !== to one another.
            return !endsWith(aCode, nativeCodeSuffix);
        }
    }
    // Otherwise the values are not equal.
    return false;
}
function definedKeys(obj) {
    // Remember that the second argument to Array.prototype.filter will be
    // used as `this` within the callback function.
    return Object.keys(obj).filter(isDefinedKey, obj);
}
function isDefinedKey(key) {
    return this[key] !== void 0;
}
const nativeCodeSuffix = "{ [native code] }";
function endsWith(full, suffix) {
    const fromIndex = full.length - suffix.length;
    return fromIndex >= 0 &&
        full.indexOf(suffix, fromIndex) === fromIndex;
}
function previouslyCompared(a, b) {
    // Though cyclic references can make an object graph appear infinite from the
    // perspective of a depth-first traversal, the graph still contains a finite
    // number of distinct object references. We use the previousComparisons cache
    // to avoid comparing the same pair of object references more than once, which
    // guarantees termination (even if we end up comparing every object in one
    // graph to every object in the other graph, which is extremely unlikely),
    // while still allowing weird isomorphic structures (like rings with different
    // lengths) a chance to pass the equality test.
    let bSet = previousComparisons.get(a);
    if (bSet) {
        // Return true here because we can be sure false will be returned somewhere
        // else if the objects are not equivalent.
        if (bSet.has(b))
            return true;
    }
    else {
        previousComparisons.set(a, bSet = new Set);
    }
    bSet.add(b);
    return false;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wry/trie/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/@wry/trie/lib/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Trie: () => (/* binding */ Trie)
/* harmony export */ });
// A [trie](https://en.wikipedia.org/wiki/Trie) data structure that holds
// object keys weakly, yet can also hold non-object keys, unlike the
// native `WeakMap`.
// If no makeData function is supplied, the looked-up data will be an empty,
// null-prototype Object.
const defaultMakeData = () => Object.create(null);
// Useful for processing arguments objects as well as arrays.
const { forEach, slice } = Array.prototype;
const { hasOwnProperty } = Object.prototype;
class Trie {
    constructor(weakness = true, makeData = defaultMakeData) {
        this.weakness = weakness;
        this.makeData = makeData;
    }
    lookup() {
        return this.lookupArray(arguments);
    }
    lookupArray(array) {
        let node = this;
        forEach.call(array, key => node = node.getChildTrie(key));
        return hasOwnProperty.call(node, "data")
            ? node.data
            : node.data = this.makeData(slice.call(array));
    }
    peek() {
        return this.peekArray(arguments);
    }
    peekArray(array) {
        let node = this;
        for (let i = 0, len = array.length; node && i < len; ++i) {
            const map = node.mapFor(array[i], false);
            node = map && map.get(array[i]);
        }
        return node && node.data;
    }
    remove() {
        return this.removeArray(arguments);
    }
    removeArray(array) {
        let data;
        if (array.length) {
            const head = array[0];
            const map = this.mapFor(head, false);
            const child = map && map.get(head);
            if (child) {
                data = child.removeArray(slice.call(array, 1));
                if (!child.data && !child.weak && !(child.strong && child.strong.size)) {
                    map.delete(head);
                }
            }
        }
        else {
            data = this.data;
            delete this.data;
        }
        return data;
    }
    getChildTrie(key) {
        const map = this.mapFor(key, true);
        let child = map.get(key);
        if (!child)
            map.set(key, child = new Trie(this.weakness, this.makeData));
        return child;
    }
    mapFor(key, create) {
        return this.weakness && isObjRef(key)
            ? this.weak || (create ? this.weak = new WeakMap : void 0)
            : this.strong || (create ? this.strong = new Map : void 0);
    }
}
function isObjRef(value) {
    switch (typeof value) {
        case "object":
            if (value === null)
                break;
        // Fall through to return true...
        case "function":
            return true;
    }
    return false;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/graphql/jsutils/devAssert.mjs":
/*!****************************************************!*\
  !*** ./node_modules/graphql/jsutils/devAssert.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   devAssert: () => (/* binding */ devAssert)
/* harmony export */ });
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);

  if (!booleanCondition) {
    throw new Error(message);
  }
}


/***/ }),

/***/ "./node_modules/graphql/jsutils/inspect.mjs":
/*!**************************************************!*\
  !*** ./node_modules/graphql/jsutils/inspect.mjs ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inspect: () => (/* binding */ inspect)
/* harmony export */ });
const MAX_ARRAY_LENGTH = 10;
const MAX_RECURSIVE_DEPTH = 2;
/**
 * Used to print values in error messages.
 */

function inspect(value) {
  return formatValue(value, []);
}

function formatValue(value, seenValues) {
  switch (typeof value) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? `[function ${value.name}]` : '[function]';

    case 'object':
      return formatObjectValue(value, seenValues);

    default:
      return String(value);
  }
}

function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return 'null';
  }

  if (previouslySeenValues.includes(value)) {
    return '[Circular]';
  }

  const seenValues = [...previouslySeenValues, value];

  if (isJSONable(value)) {
    const jsonValue = value.toJSON(); // check for infinite recursion

    if (jsonValue !== value) {
      return typeof jsonValue === 'string'
        ? jsonValue
        : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }

  return formatObject(value, seenValues);
}

function isJSONable(value) {
  return typeof value.toJSON === 'function';
}

function formatObject(object, seenValues) {
  const entries = Object.entries(object);

  if (entries.length === 0) {
    return '{}';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[' + getObjectTag(object) + ']';
  }

  const properties = entries.map(
    ([key, value]) => key + ': ' + formatValue(value, seenValues),
  );
  return '{ ' + properties.join(', ') + ' }';
}

function formatArray(array, seenValues) {
  if (array.length === 0) {
    return '[]';
  }

  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return '[Array]';
  }

  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];

  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }

  if (remaining === 1) {
    items.push('... 1 more item');
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }

  return '[' + items.join(', ') + ']';
}

function getObjectTag(object) {
  const tag = Object.prototype.toString
    .call(object)
    .replace(/^\[object /, '')
    .replace(/]$/, '');

  if (tag === 'Object' && typeof object.constructor === 'function') {
    const name = object.constructor.name;

    if (typeof name === 'string' && name !== '') {
      return name;
    }
  }

  return tag;
}


/***/ }),

/***/ "./node_modules/graphql/language/ast.mjs":
/*!***********************************************!*\
  !*** ./node_modules/graphql/language/ast.mjs ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Location: () => (/* binding */ Location),
/* harmony export */   OperationTypeNode: () => (/* binding */ OperationTypeNode),
/* harmony export */   QueryDocumentKeys: () => (/* binding */ QueryDocumentKeys),
/* harmony export */   Token: () => (/* binding */ Token),
/* harmony export */   isNode: () => (/* binding */ isNode)
/* harmony export */ });
/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */
class Location {
  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The Token at which this Node begins.
   */

  /**
   * The Token at which this Node ends.
   */

  /**
   * The Source document the AST represents.
   */
  constructor(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }

  get [Symbol.toStringTag]() {
    return 'Location';
  }

  toJSON() {
    return {
      start: this.start,
      end: this.end,
    };
  }
}
/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */

class Token {
  /**
   * The kind of Token.
   */

  /**
   * The character offset at which this Node begins.
   */

  /**
   * The character offset at which this Node ends.
   */

  /**
   * The 1-indexed line number on which this Token appears.
   */

  /**
   * The 1-indexed column number at which this Token begins.
   */

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(kind, start, end, line, column, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

    this.value = value;
    this.prev = null;
    this.next = null;
  }

  get [Symbol.toStringTag]() {
    return 'Token';
  }

  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column,
    };
  }
}
/**
 * The list of all possible AST node types.
 */

/**
 * @internal
 */
const QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: [
    'name',
    'variableDefinitions',
    'directives',
    'selectionSet',
  ],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: [
    'name', // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    'variableDefinitions',
    'typeCondition',
    'directives',
    'selectionSet',
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['description', 'directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: [
    'description',
    'name',
    'type',
    'defaultValue',
    'directives',
  ],
  InterfaceTypeDefinition: [
    'description',
    'name',
    'interfaces',
    'directives',
    'fields',
  ],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields'],
};
const kindValues = new Set(Object.keys(QueryDocumentKeys));
/**
 * @internal
 */

function isNode(maybeNode) {
  const maybeKind =
    maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === 'string' && kindValues.has(maybeKind);
}
/** Name */

var OperationTypeNode;

(function (OperationTypeNode) {
  OperationTypeNode['QUERY'] = 'query';
  OperationTypeNode['MUTATION'] = 'mutation';
  OperationTypeNode['SUBSCRIPTION'] = 'subscription';
})(OperationTypeNode || (OperationTypeNode = {}));




/***/ }),

/***/ "./node_modules/graphql/language/blockString.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/graphql/language/blockString.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dedentBlockStringLines: () => (/* binding */ dedentBlockStringLines),
/* harmony export */   isPrintableAsBlockString: () => (/* binding */ isPrintableAsBlockString),
/* harmony export */   printBlockString: () => (/* binding */ printBlockString)
/* harmony export */ });
/* harmony import */ var _characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./characterClasses.mjs */ "./node_modules/graphql/language/characterClasses.mjs");

/**
 * Produces the value of a block string from its parsed raw value, similar to
 * CoffeeScript's block string, Python's docstring trim or Ruby's strip_heredoc.
 *
 * This implements the GraphQL spec's BlockStringValue() static algorithm.
 *
 * @internal
 */

function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;

  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;

  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;

    const line = lines[i];
    const indent = leadingWhitespace(line);

    if (indent === line.length) {
      continue; // skip empty lines
    }

    firstNonEmptyLine =
      (_firstNonEmptyLine = firstNonEmptyLine) !== null &&
      _firstNonEmptyLine !== void 0
        ? _firstNonEmptyLine
        : i;
    lastNonEmptyLine = i;

    if (i !== 0 && indent < commonIndent) {
      commonIndent = indent;
    }
  }

  return lines // Remove common indentation from all lines but first.
    .map((line, i) => (i === 0 ? line : line.slice(commonIndent))) // Remove leading and trailing blank lines.
    .slice(
      (_firstNonEmptyLine2 = firstNonEmptyLine) !== null &&
        _firstNonEmptyLine2 !== void 0
        ? _firstNonEmptyLine2
        : 0,
      lastNonEmptyLine + 1,
    );
}

function leadingWhitespace(str) {
  let i = 0;

  while (i < str.length && (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(str.charCodeAt(i))) {
    ++i;
  }

  return i;
}
/**
 * @internal
 */

function isPrintableAsBlockString(value) {
  if (value === '') {
    return true; // empty string is printable
  }

  let isEmptyLine = true;
  let hasIndent = false;
  let hasCommonIndent = true;
  let seenNonEmptyLine = false;

  for (let i = 0; i < value.length; ++i) {
    switch (value.codePointAt(i)) {
      case 0x0000:
      case 0x0001:
      case 0x0002:
      case 0x0003:
      case 0x0004:
      case 0x0005:
      case 0x0006:
      case 0x0007:
      case 0x0008:
      case 0x000b:
      case 0x000c:
      case 0x000e:
      case 0x000f:
        return false;
      // Has non-printable characters

      case 0x000d:
        //  \r
        return false;
      // Has \r or \r\n which will be replaced as \n

      case 10:
        //  \n
        if (isEmptyLine && !seenNonEmptyLine) {
          return false; // Has leading new line
        }

        seenNonEmptyLine = true;
        isEmptyLine = true;
        hasIndent = false;
        break;

      case 9: //   \t

      case 32:
        //  <space>
        hasIndent || (hasIndent = isEmptyLine);
        break;

      default:
        hasCommonIndent && (hasCommonIndent = hasIndent);
        isEmptyLine = false;
    }
  }

  if (isEmptyLine) {
    return false; // Has trailing empty lines
  }

  if (hasCommonIndent && seenNonEmptyLine) {
    return false; // Has internal indent
  }

  return true;
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 *
 * @internal
 */

function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""'); // Expand a block string's raw value into independent lines.

  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1; // If common indentation is found we can fix some of those cases by adding leading new line

  const forceLeadingNewLine =
    lines.length > 1 &&
    lines
      .slice(1)
      .every((line) => line.length === 0 || (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(line.charCodeAt(0))); // Trailing triple quotes just looks confusing but doesn't force trailing new line

  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""'); // Trailing quote (single or double) or slash forces trailing new line

  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith('\\');
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines =
    !(options !== null && options !== void 0 && options.minimize) && // add leading and trailing new lines only if it improves readability
    (!isSingleLine ||
      value.length > 70 ||
      forceTrailingNewline ||
      forceLeadingNewLine ||
      hasTrailingTripleQuotes);
  let result = ''; // Format a multi-line block quote to account for leading space.

  const skipLeadingNewLine = isSingleLine && (0,_characterClasses_mjs__WEBPACK_IMPORTED_MODULE_0__.isWhiteSpace)(value.charCodeAt(0));

  if ((printAsMultipleLines && !skipLeadingNewLine) || forceLeadingNewLine) {
    result += '\n';
  }

  result += escapedValue;

  if (printAsMultipleLines || forceTrailingNewline) {
    result += '\n';
  }

  return '"""' + result + '"""';
}


/***/ }),

/***/ "./node_modules/graphql/language/characterClasses.mjs":
/*!************************************************************!*\
  !*** ./node_modules/graphql/language/characterClasses.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isDigit: () => (/* binding */ isDigit),
/* harmony export */   isLetter: () => (/* binding */ isLetter),
/* harmony export */   isNameContinue: () => (/* binding */ isNameContinue),
/* harmony export */   isNameStart: () => (/* binding */ isNameStart),
/* harmony export */   isWhiteSpace: () => (/* binding */ isWhiteSpace)
/* harmony export */ });
/**
 * ```
 * WhiteSpace ::
 *   - "Horizontal Tab (U+0009)"
 *   - "Space (U+0020)"
 * ```
 * @internal
 */
function isWhiteSpace(code) {
  return code === 0x0009 || code === 0x0020;
}
/**
 * ```
 * Digit :: one of
 *   - `0` `1` `2` `3` `4` `5` `6` `7` `8` `9`
 * ```
 * @internal
 */

function isDigit(code) {
  return code >= 0x0030 && code <= 0x0039;
}
/**
 * ```
 * Letter :: one of
 *   - `A` `B` `C` `D` `E` `F` `G` `H` `I` `J` `K` `L` `M`
 *   - `N` `O` `P` `Q` `R` `S` `T` `U` `V` `W` `X` `Y` `Z`
 *   - `a` `b` `c` `d` `e` `f` `g` `h` `i` `j` `k` `l` `m`
 *   - `n` `o` `p` `q` `r` `s` `t` `u` `v` `w` `x` `y` `z`
 * ```
 * @internal
 */

function isLetter(code) {
  return (
    (code >= 0x0061 && code <= 0x007a) || // A-Z
    (code >= 0x0041 && code <= 0x005a) // a-z
  );
}
/**
 * ```
 * NameStart ::
 *   - Letter
 *   - `_`
 * ```
 * @internal
 */

function isNameStart(code) {
  return isLetter(code) || code === 0x005f;
}
/**
 * ```
 * NameContinue ::
 *   - Letter
 *   - Digit
 *   - `_`
 * ```
 * @internal
 */

function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 0x005f;
}


/***/ }),

/***/ "./node_modules/graphql/language/kinds.mjs":
/*!*************************************************!*\
  !*** ./node_modules/graphql/language/kinds.mjs ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kind: () => (/* binding */ Kind)
/* harmony export */ });
/**
 * The set of allowed kind values for AST nodes.
 */
var Kind;

(function (Kind) {
  Kind['NAME'] = 'Name';
  Kind['DOCUMENT'] = 'Document';
  Kind['OPERATION_DEFINITION'] = 'OperationDefinition';
  Kind['VARIABLE_DEFINITION'] = 'VariableDefinition';
  Kind['SELECTION_SET'] = 'SelectionSet';
  Kind['FIELD'] = 'Field';
  Kind['ARGUMENT'] = 'Argument';
  Kind['FRAGMENT_SPREAD'] = 'FragmentSpread';
  Kind['INLINE_FRAGMENT'] = 'InlineFragment';
  Kind['FRAGMENT_DEFINITION'] = 'FragmentDefinition';
  Kind['VARIABLE'] = 'Variable';
  Kind['INT'] = 'IntValue';
  Kind['FLOAT'] = 'FloatValue';
  Kind['STRING'] = 'StringValue';
  Kind['BOOLEAN'] = 'BooleanValue';
  Kind['NULL'] = 'NullValue';
  Kind['ENUM'] = 'EnumValue';
  Kind['LIST'] = 'ListValue';
  Kind['OBJECT'] = 'ObjectValue';
  Kind['OBJECT_FIELD'] = 'ObjectField';
  Kind['DIRECTIVE'] = 'Directive';
  Kind['NAMED_TYPE'] = 'NamedType';
  Kind['LIST_TYPE'] = 'ListType';
  Kind['NON_NULL_TYPE'] = 'NonNullType';
  Kind['SCHEMA_DEFINITION'] = 'SchemaDefinition';
  Kind['OPERATION_TYPE_DEFINITION'] = 'OperationTypeDefinition';
  Kind['SCALAR_TYPE_DEFINITION'] = 'ScalarTypeDefinition';
  Kind['OBJECT_TYPE_DEFINITION'] = 'ObjectTypeDefinition';
  Kind['FIELD_DEFINITION'] = 'FieldDefinition';
  Kind['INPUT_VALUE_DEFINITION'] = 'InputValueDefinition';
  Kind['INTERFACE_TYPE_DEFINITION'] = 'InterfaceTypeDefinition';
  Kind['UNION_TYPE_DEFINITION'] = 'UnionTypeDefinition';
  Kind['ENUM_TYPE_DEFINITION'] = 'EnumTypeDefinition';
  Kind['ENUM_VALUE_DEFINITION'] = 'EnumValueDefinition';
  Kind['INPUT_OBJECT_TYPE_DEFINITION'] = 'InputObjectTypeDefinition';
  Kind['DIRECTIVE_DEFINITION'] = 'DirectiveDefinition';
  Kind['SCHEMA_EXTENSION'] = 'SchemaExtension';
  Kind['SCALAR_TYPE_EXTENSION'] = 'ScalarTypeExtension';
  Kind['OBJECT_TYPE_EXTENSION'] = 'ObjectTypeExtension';
  Kind['INTERFACE_TYPE_EXTENSION'] = 'InterfaceTypeExtension';
  Kind['UNION_TYPE_EXTENSION'] = 'UnionTypeExtension';
  Kind['ENUM_TYPE_EXTENSION'] = 'EnumTypeExtension';
  Kind['INPUT_OBJECT_TYPE_EXTENSION'] = 'InputObjectTypeExtension';
})(Kind || (Kind = {}));


/**
 * The enum type representing the possible kind values of AST nodes.
 *
 * @deprecated Please use `Kind`. Will be remove in v17.
 */


/***/ }),

/***/ "./node_modules/graphql/language/predicates.mjs":
/*!******************************************************!*\
  !*** ./node_modules/graphql/language/predicates.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isConstValueNode: () => (/* binding */ isConstValueNode),
/* harmony export */   isDefinitionNode: () => (/* binding */ isDefinitionNode),
/* harmony export */   isExecutableDefinitionNode: () => (/* binding */ isExecutableDefinitionNode),
/* harmony export */   isSelectionNode: () => (/* binding */ isSelectionNode),
/* harmony export */   isTypeDefinitionNode: () => (/* binding */ isTypeDefinitionNode),
/* harmony export */   isTypeExtensionNode: () => (/* binding */ isTypeExtensionNode),
/* harmony export */   isTypeNode: () => (/* binding */ isTypeNode),
/* harmony export */   isTypeSystemDefinitionNode: () => (/* binding */ isTypeSystemDefinitionNode),
/* harmony export */   isTypeSystemExtensionNode: () => (/* binding */ isTypeSystemExtensionNode),
/* harmony export */   isValueNode: () => (/* binding */ isValueNode)
/* harmony export */ });
/* harmony import */ var _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kinds.mjs */ "./node_modules/graphql/language/kinds.mjs");

function isDefinitionNode(node) {
  return (
    isExecutableDefinitionNode(node) ||
    isTypeSystemDefinitionNode(node) ||
    isTypeSystemExtensionNode(node)
  );
}
function isExecutableDefinitionNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OPERATION_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FRAGMENT_DEFINITION
  );
}
function isSelectionNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FIELD ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FRAGMENT_SPREAD ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INLINE_FRAGMENT
  );
}
function isValueNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.VARIABLE ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INT ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.FLOAT ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.STRING ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.BOOLEAN ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NULL ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.ENUM ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.LIST ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT
  );
}
function isConstValueNode(node) {
  return (
    isValueNode(node) &&
    (node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.LIST
      ? node.values.some(isConstValueNode)
      : node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT
      ? node.fields.some((field) => isConstValueNode(field.value))
      : node.kind !== _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.VARIABLE)
  );
}
function isTypeNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NAMED_TYPE ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.LIST_TYPE ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.NON_NULL_TYPE
  );
}
function isTypeSystemDefinitionNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.SCHEMA_DEFINITION ||
    isTypeDefinitionNode(node) ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.DIRECTIVE_DEFINITION
  );
}
function isTypeDefinitionNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.SCALAR_TYPE_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT_TYPE_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INTERFACE_TYPE_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.UNION_TYPE_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.ENUM_TYPE_DEFINITION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INPUT_OBJECT_TYPE_DEFINITION
  );
}
function isTypeSystemExtensionNode(node) {
  return node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
}
function isTypeExtensionNode(node) {
  return (
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.SCALAR_TYPE_EXTENSION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.OBJECT_TYPE_EXTENSION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INTERFACE_TYPE_EXTENSION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.UNION_TYPE_EXTENSION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.ENUM_TYPE_EXTENSION ||
    node.kind === _kinds_mjs__WEBPACK_IMPORTED_MODULE_0__.Kind.INPUT_OBJECT_TYPE_EXTENSION
  );
}


/***/ }),

/***/ "./node_modules/graphql/language/printString.mjs":
/*!*******************************************************!*\
  !*** ./node_modules/graphql/language/printString.mjs ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   printString: () => (/* binding */ printString)
/* harmony export */ });
/**
 * Prints a string as a GraphQL StringValue literal. Replaces control characters
 * and excluded characters (" U+0022 and \\ U+005C) with escape sequences.
 */
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
} // eslint-disable-next-line no-control-regex

const escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;

function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
} // prettier-ignore

const escapeSequences = [
  '\\u0000',
  '\\u0001',
  '\\u0002',
  '\\u0003',
  '\\u0004',
  '\\u0005',
  '\\u0006',
  '\\u0007',
  '\\b',
  '\\t',
  '\\n',
  '\\u000B',
  '\\f',
  '\\r',
  '\\u000E',
  '\\u000F',
  '\\u0010',
  '\\u0011',
  '\\u0012',
  '\\u0013',
  '\\u0014',
  '\\u0015',
  '\\u0016',
  '\\u0017',
  '\\u0018',
  '\\u0019',
  '\\u001A',
  '\\u001B',
  '\\u001C',
  '\\u001D',
  '\\u001E',
  '\\u001F',
  '',
  '',
  '\\"',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 2F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 3F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 4F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\\\',
  '',
  '',
  '', // 5F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '', // 6F
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '\\u007F',
  '\\u0080',
  '\\u0081',
  '\\u0082',
  '\\u0083',
  '\\u0084',
  '\\u0085',
  '\\u0086',
  '\\u0087',
  '\\u0088',
  '\\u0089',
  '\\u008A',
  '\\u008B',
  '\\u008C',
  '\\u008D',
  '\\u008E',
  '\\u008F',
  '\\u0090',
  '\\u0091',
  '\\u0092',
  '\\u0093',
  '\\u0094',
  '\\u0095',
  '\\u0096',
  '\\u0097',
  '\\u0098',
  '\\u0099',
  '\\u009A',
  '\\u009B',
  '\\u009C',
  '\\u009D',
  '\\u009E',
  '\\u009F',
];


/***/ }),

/***/ "./node_modules/graphql/language/printer.mjs":
/*!***************************************************!*\
  !*** ./node_modules/graphql/language/printer.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   print: () => (/* binding */ print)
/* harmony export */ });
/* harmony import */ var _blockString_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blockString.mjs */ "./node_modules/graphql/language/blockString.mjs");
/* harmony import */ var _printString_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./printString.mjs */ "./node_modules/graphql/language/printString.mjs");
/* harmony import */ var _visitor_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visitor.mjs */ "./node_modules/graphql/language/visitor.mjs");



/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */

function print(ast) {
  return (0,_visitor_mjs__WEBPACK_IMPORTED_MODULE_0__.visit)(ast, printDocASTReducer);
}
const MAX_LINE_LENGTH = 80;
const printDocASTReducer = {
  Name: {
    leave: (node) => node.value,
  },
  Variable: {
    leave: (node) => '$' + node.name,
  },
  // Document
  Document: {
    leave: (node) => join(node.definitions, '\n\n'),
  },
  OperationDefinition: {
    leave(node) {
      const varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
      const prefix = join(
        [
          node.operation,
          join([node.name, varDefs]),
          join(node.directives, ' '),
        ],
        ' ',
      ); // Anonymous queries with no directives or variable definitions can use
      // the query short form.

      return (prefix === 'query' ? '' : prefix + ' ') + node.selectionSet;
    },
  },
  VariableDefinition: {
    leave: ({ variable, type, defaultValue, directives }) =>
      variable +
      ': ' +
      type +
      wrap(' = ', defaultValue) +
      wrap(' ', join(directives, ' ')),
  },
  SelectionSet: {
    leave: ({ selections }) => block(selections),
  },
  Field: {
    leave({ alias, name, arguments: args, directives, selectionSet }) {
      const prefix = wrap('', alias, ': ') + name;
      let argsLine = prefix + wrap('(', join(args, ', '), ')');

      if (argsLine.length > MAX_LINE_LENGTH) {
        argsLine = prefix + wrap('(\n', indent(join(args, '\n')), '\n)');
      }

      return join([argsLine, join(directives, ' '), selectionSet], ' ');
    },
  },
  Argument: {
    leave: ({ name, value }) => name + ': ' + value,
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name, directives }) =>
      '...' + name + wrap(' ', join(directives, ' ')),
  },
  InlineFragment: {
    leave: ({ typeCondition, directives, selectionSet }) =>
      join(
        [
          '...',
          wrap('on ', typeCondition),
          join(directives, ' '),
          selectionSet,
        ],
        ' ',
      ),
  },
  FragmentDefinition: {
    leave: (
      { name, typeCondition, variableDefinitions, directives, selectionSet }, // Note: fragment variable definitions are experimental and may be changed
    ) =>
      // or removed in the future.
      `fragment ${name}${wrap('(', join(variableDefinitions, ', '), ')')} ` +
      `on ${typeCondition} ${wrap('', join(directives, ' '), ' ')}` +
      selectionSet,
  },
  // Value
  IntValue: {
    leave: ({ value }) => value,
  },
  FloatValue: {
    leave: ({ value }) => value,
  },
  StringValue: {
    leave: ({ value, block: isBlockString }) =>
      isBlockString ? (0,_blockString_mjs__WEBPACK_IMPORTED_MODULE_1__.printBlockString)(value) : (0,_printString_mjs__WEBPACK_IMPORTED_MODULE_2__.printString)(value),
  },
  BooleanValue: {
    leave: ({ value }) => (value ? 'true' : 'false'),
  },
  NullValue: {
    leave: () => 'null',
  },
  EnumValue: {
    leave: ({ value }) => value,
  },
  ListValue: {
    leave: ({ values }) => '[' + join(values, ', ') + ']',
  },
  ObjectValue: {
    leave: ({ fields }) => '{' + join(fields, ', ') + '}',
  },
  ObjectField: {
    leave: ({ name, value }) => name + ': ' + value,
  },
  // Directive
  Directive: {
    leave: ({ name, arguments: args }) =>
      '@' + name + wrap('(', join(args, ', '), ')'),
  },
  // Type
  NamedType: {
    leave: ({ name }) => name,
  },
  ListType: {
    leave: ({ type }) => '[' + type + ']',
  },
  NonNullType: {
    leave: ({ type }) => type + '!',
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description, directives, operationTypes }) =>
      wrap('', description, '\n') +
      join(['schema', join(directives, ' '), block(operationTypes)], ' '),
  },
  OperationTypeDefinition: {
    leave: ({ operation, type }) => operation + ': ' + type,
  },
  ScalarTypeDefinition: {
    leave: ({ description, name, directives }) =>
      wrap('', description, '\n') +
      join(['scalar', name, join(directives, ' ')], ' '),
  },
  ObjectTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) =>
      wrap('', description, '\n') +
      join(
        [
          'type',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  FieldDefinition: {
    leave: ({ description, name, arguments: args, type, directives }) =>
      wrap('', description, '\n') +
      name +
      (hasMultilineItems(args)
        ? wrap('(\n', indent(join(args, '\n')), '\n)')
        : wrap('(', join(args, ', '), ')')) +
      ': ' +
      type +
      wrap(' ', join(directives, ' ')),
  },
  InputValueDefinition: {
    leave: ({ description, name, type, defaultValue, directives }) =>
      wrap('', description, '\n') +
      join(
        [name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')],
        ' ',
      ),
  },
  InterfaceTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) =>
      wrap('', description, '\n') +
      join(
        [
          'interface',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  UnionTypeDefinition: {
    leave: ({ description, name, directives, types }) =>
      wrap('', description, '\n') +
      join(
        ['union', name, join(directives, ' '), wrap('= ', join(types, ' | '))],
        ' ',
      ),
  },
  EnumTypeDefinition: {
    leave: ({ description, name, directives, values }) =>
      wrap('', description, '\n') +
      join(['enum', name, join(directives, ' '), block(values)], ' '),
  },
  EnumValueDefinition: {
    leave: ({ description, name, directives }) =>
      wrap('', description, '\n') + join([name, join(directives, ' ')], ' '),
  },
  InputObjectTypeDefinition: {
    leave: ({ description, name, directives, fields }) =>
      wrap('', description, '\n') +
      join(['input', name, join(directives, ' '), block(fields)], ' '),
  },
  DirectiveDefinition: {
    leave: ({ description, name, arguments: args, repeatable, locations }) =>
      wrap('', description, '\n') +
      'directive @' +
      name +
      (hasMultilineItems(args)
        ? wrap('(\n', indent(join(args, '\n')), '\n)')
        : wrap('(', join(args, ', '), ')')) +
      (repeatable ? ' repeatable' : '') +
      ' on ' +
      join(locations, ' | '),
  },
  SchemaExtension: {
    leave: ({ directives, operationTypes }) =>
      join(
        ['extend schema', join(directives, ' '), block(operationTypes)],
        ' ',
      ),
  },
  ScalarTypeExtension: {
    leave: ({ name, directives }) =>
      join(['extend scalar', name, join(directives, ' ')], ' '),
  },
  ObjectTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) =>
      join(
        [
          'extend type',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  InterfaceTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) =>
      join(
        [
          'extend interface',
          name,
          wrap('implements ', join(interfaces, ' & ')),
          join(directives, ' '),
          block(fields),
        ],
        ' ',
      ),
  },
  UnionTypeExtension: {
    leave: ({ name, directives, types }) =>
      join(
        [
          'extend union',
          name,
          join(directives, ' '),
          wrap('= ', join(types, ' | ')),
        ],
        ' ',
      ),
  },
  EnumTypeExtension: {
    leave: ({ name, directives, values }) =>
      join(['extend enum', name, join(directives, ' '), block(values)], ' '),
  },
  InputObjectTypeExtension: {
    leave: ({ name, directives, fields }) =>
      join(['extend input', name, join(directives, ' '), block(fields)], ' '),
  },
};
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */

function join(maybeArray, separator = '') {
  var _maybeArray$filter$jo;

  return (_maybeArray$filter$jo =
    maybeArray === null || maybeArray === void 0
      ? void 0
      : maybeArray.filter((x) => x).join(separator)) !== null &&
    _maybeArray$filter$jo !== void 0
    ? _maybeArray$filter$jo
    : '';
}
/**
 * Given array, print each item on its own line, wrapped in an indented `{ }` block.
 */

function block(array) {
  return wrap('{\n', indent(join(array, '\n')), '\n}');
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise print an empty string.
 */

function wrap(start, maybeString, end = '') {
  return maybeString != null && maybeString !== ''
    ? start + maybeString + end
    : '';
}

function indent(str) {
  return wrap('  ', str.replace(/\n/g, '\n  '));
}

function hasMultilineItems(maybeArray) {
  var _maybeArray$some;

  // FIXME: https://github.com/graphql/graphql-js/issues/2203

  /* c8 ignore next */
  return (_maybeArray$some =
    maybeArray === null || maybeArray === void 0
      ? void 0
      : maybeArray.some((str) => str.includes('\n'))) !== null &&
    _maybeArray$some !== void 0
    ? _maybeArray$some
    : false;
}


/***/ }),

/***/ "./node_modules/graphql/language/visitor.mjs":
/*!***************************************************!*\
  !*** ./node_modules/graphql/language/visitor.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BREAK: () => (/* binding */ BREAK),
/* harmony export */   getEnterLeaveForKind: () => (/* binding */ getEnterLeaveForKind),
/* harmony export */   getVisitFn: () => (/* binding */ getVisitFn),
/* harmony export */   visit: () => (/* binding */ visit),
/* harmony export */   visitInParallel: () => (/* binding */ visitInParallel)
/* harmony export */ });
/* harmony import */ var _jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../jsutils/devAssert.mjs */ "./node_modules/graphql/jsutils/devAssert.mjs");
/* harmony import */ var _jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jsutils/inspect.mjs */ "./node_modules/graphql/jsutils/inspect.mjs");
/* harmony import */ var _ast_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ast.mjs */ "./node_modules/graphql/language/ast.mjs");
/* harmony import */ var _kinds_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kinds.mjs */ "./node_modules/graphql/language/kinds.mjs");




/**
 * A visitor is provided to visit, it contains the collection of
 * relevant functions to be called during the visitor's traversal.
 */

const BREAK = Object.freeze({});
/**
 * visit() will walk through an AST using a depth-first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 * ```ts
 * const editedAST = visit(ast, {
 *   enter(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: skip visiting this node
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   },
 *   leave(node, key, parent, path, ancestors) {
 *     // @return
 *     //   undefined: no action
 *     //   false: no action
 *     //   visitor.BREAK: stop visiting altogether
 *     //   null: delete this node
 *     //   any value: replace this node with the returned value
 *   }
 * });
 * ```
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to three permutations of the
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind(node) {
 *     // enter the "Kind" node
 *   }
 * })
 * ```
 *
 * 2) Named visitors that trigger upon entering and leaving a node of a specific kind.
 *
 * ```ts
 * visit(ast, {
 *   Kind: {
 *     enter(node) {
 *       // enter the "Kind" node
 *     }
 *     leave(node) {
 *       // leave the "Kind" node
 *     }
 *   }
 * })
 * ```
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 * ```ts
 * visit(ast, {
 *   enter(node) {
 *     // enter any node
 *   },
 *   leave(node) {
 *     // leave any node
 *   }
 * })
 * ```
 */

function visit(root, visitor, visitorKeys = _ast_mjs__WEBPACK_IMPORTED_MODULE_0__.QueryDocumentKeys) {
  const enterLeaveMap = new Map();

  for (const kind of Object.values(_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  /* eslint-disable no-undef-init */

  let stack = undefined;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let edits = [];
  let node = root;
  let key = undefined;
  let parent = undefined;
  const path = [];
  const ancestors = [];
  /* eslint-enable no-undef-init */

  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;

          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;

            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(node),
          );

          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];

      if (node === null || node === undefined) {
        continue;
      }

      path.push(key);
    }

    let result;

    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;

      (0,_ast_mjs__WEBPACK_IMPORTED_MODULE_0__.isNode)(node) || (0,_jsutils_devAssert_mjs__WEBPACK_IMPORTED_MODULE_2__.devAssert)(false, `Invalid AST Node: ${(0,_jsutils_inspect_mjs__WEBPACK_IMPORTED_MODULE_3__.inspect)(node)}.`);
      const visitFn = isLeaving
        ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null ||
          _enterLeaveMap$get === void 0
          ? void 0
          : _enterLeaveMap$get.leave
        : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null ||
          _enterLeaveMap$get2 === void 0
        ? void 0
        : _enterLeaveMap$get2.enter;
      result =
        visitFn === null || visitFn === void 0
          ? void 0
          : visitFn.call(visitor, node, key, parent, path, ancestors);

      if (result === BREAK) {
        break;
      }

      if (result === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result !== undefined) {
        edits.push([key, result]);

        if (!isLeaving) {
          if ((0,_ast_mjs__WEBPACK_IMPORTED_MODULE_0__.isNode)(result)) {
            node = result;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;

      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack,
      };
      inArray = Array.isArray(node);
      keys = inArray
        ? node
        : (_node$kind = visitorKeys[node.kind]) !== null &&
          _node$kind !== void 0
        ? _node$kind
        : [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    // New root
    return edits[edits.length - 1][1];
  }

  return root;
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */

function visitInParallel(visitors) {
  const skipping = new Array(visitors.length).fill(null);
  const mergedVisitor = Object.create(null);

  for (const kind of Object.values(_kinds_mjs__WEBPACK_IMPORTED_MODULE_1__.Kind)) {
    let hasVisitor = false;
    const enterList = new Array(visitors.length).fill(undefined);
    const leaveList = new Array(visitors.length).fill(undefined);

    for (let i = 0; i < visitors.length; ++i) {
      const { enter, leave } = getEnterLeaveForKind(visitors[i], kind);
      hasVisitor || (hasVisitor = enter != null || leave != null);
      enterList[i] = enter;
      leaveList[i] = leave;
    }

    if (!hasVisitor) {
      continue;
    }

    const mergedEnterLeave = {
      enter(...args) {
        const node = args[0];

        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _enterList$i;

            const result =
              (_enterList$i = enterList[i]) === null || _enterList$i === void 0
                ? void 0
                : _enterList$i.apply(visitors[i], args);

            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      },

      leave(...args) {
        const node = args[0];

        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _leaveList$i;

            const result =
              (_leaveList$i = leaveList[i]) === null || _leaveList$i === void 0
                ? void 0
                : _leaveList$i.apply(visitors[i], args);

            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          } else if (skipping[i] === node) {
            skipping[i] = null;
          }
        }
      },
    };
    mergedVisitor[kind] = mergedEnterLeave;
  }

  return mergedVisitor;
}
/**
 * Given a visitor instance and a node kind, return EnterLeaveVisitor for that kind.
 */

function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];

  if (typeof kindVisitor === 'object') {
    // { Kind: { enter() {}, leave() {} } }
    return kindVisitor;
  } else if (typeof kindVisitor === 'function') {
    // { Kind() {} }
    return {
      enter: kindVisitor,
      leave: undefined,
    };
  } // { enter() {}, leave() {} }

  return {
    enter: visitor.enter,
    leave: visitor.leave,
  };
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 *
 * @deprecated Please use `getEnterLeaveForKind` instead. Will be removed in v17
 */

/* c8 ignore next 8 */

function getVisitFn(visitor, kind, isLeaving) {
  const { enter, leave } = getEnterLeaveForKind(visitor, kind);
  return isLeaving ? leave : enter;
}


/***/ }),

/***/ "./node_modules/optimism/lib/context.js":
/*!**********************************************!*\
  !*** ./node_modules/optimism/lib/context.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slot: () => (/* reexport safe */ _wry_context__WEBPACK_IMPORTED_MODULE_0__.Slot),
/* harmony export */   asyncFromGen: () => (/* reexport safe */ _wry_context__WEBPACK_IMPORTED_MODULE_0__.asyncFromGen),
/* harmony export */   bindContext: () => (/* reexport safe */ _wry_context__WEBPACK_IMPORTED_MODULE_0__.bind),
/* harmony export */   noContext: () => (/* reexport safe */ _wry_context__WEBPACK_IMPORTED_MODULE_0__.noContext),
/* harmony export */   nonReactive: () => (/* binding */ nonReactive),
/* harmony export */   parentEntrySlot: () => (/* binding */ parentEntrySlot),
/* harmony export */   setTimeout: () => (/* reexport safe */ _wry_context__WEBPACK_IMPORTED_MODULE_0__.setTimeout)
/* harmony export */ });
/* harmony import */ var _wry_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/context */ "./node_modules/@wry/context/lib/index.js");

const parentEntrySlot = new _wry_context__WEBPACK_IMPORTED_MODULE_0__.Slot();
function nonReactive(fn) {
    return parentEntrySlot.withValue(void 0, fn);
}


//# sourceMappingURL=context.js.map

/***/ }),

/***/ "./node_modules/optimism/lib/dep.js":
/*!******************************************!*\
  !*** ./node_modules/optimism/lib/dep.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dep: () => (/* binding */ dep)
/* harmony export */ });
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context.js */ "./node_modules/optimism/lib/context.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/optimism/lib/helpers.js");


const EntryMethods = {
    setDirty: true,
    dispose: true,
    forget: true, // Fully remove parent Entry from LRU cache and computation graph
};
function dep(options) {
    const depsByKey = new Map();
    const subscribe = options && options.subscribe;
    function depend(key) {
        const parent = _context_js__WEBPACK_IMPORTED_MODULE_0__.parentEntrySlot.getValue();
        if (parent) {
            let dep = depsByKey.get(key);
            if (!dep) {
                depsByKey.set(key, dep = new Set);
            }
            parent.dependOn(dep);
            if (typeof subscribe === "function") {
                (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.maybeUnsubscribe)(dep);
                dep.unsubscribe = subscribe(key);
            }
        }
    }
    depend.dirty = function dirty(key, entryMethodName) {
        const dep = depsByKey.get(key);
        if (dep) {
            const m = (entryMethodName &&
                _helpers_js__WEBPACK_IMPORTED_MODULE_1__.hasOwnProperty.call(EntryMethods, entryMethodName)) ? entryMethodName : "setDirty";
            // We have to use arrayFromSet(dep).forEach instead of dep.forEach,
            // because modifying a Set while iterating over it can cause elements in
            // the Set to be removed from the Set before they've been iterated over.
            (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.arrayFromSet)(dep).forEach(entry => entry[m]());
            depsByKey.delete(key);
            (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.maybeUnsubscribe)(dep);
        }
    };
    return depend;
}
//# sourceMappingURL=dep.js.map

/***/ }),

/***/ "./node_modules/optimism/lib/entry.js":
/*!********************************************!*\
  !*** ./node_modules/optimism/lib/entry.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Entry: () => (/* binding */ Entry)
/* harmony export */ });
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context.js */ "./node_modules/optimism/lib/context.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers.js */ "./node_modules/optimism/lib/helpers.js");


const emptySetPool = [];
const POOL_TARGET_SIZE = 100;
// Since this package might be used browsers, we should avoid using the
// Node built-in assert module.
function assert(condition, optionalMessage) {
    if (!condition) {
        throw new Error(optionalMessage || "assertion failure");
    }
}
function valueIs(a, b) {
    const len = a.length;
    return (
    // Unknown values are not equal to each other.
    len > 0 &&
        // Both values must be ordinary (or both exceptional) to be equal.
        len === b.length &&
        // The underlying value or exception must be the same.
        a[len - 1] === b[len - 1]);
}
function valueGet(value) {
    switch (value.length) {
        case 0: throw new Error("unknown value");
        case 1: return value[0];
        case 2: throw value[1];
    }
}
function valueCopy(value) {
    return value.slice(0);
}
class Entry {
    constructor(fn) {
        this.fn = fn;
        this.parents = new Set();
        this.childValues = new Map();
        // When this Entry has children that are dirty, this property becomes
        // a Set containing other Entry objects, borrowed from emptySetPool.
        // When the set becomes empty, it gets recycled back to emptySetPool.
        this.dirtyChildren = null;
        this.dirty = true;
        this.recomputing = false;
        this.value = [];
        this.deps = null;
        ++Entry.count;
    }
    peek() {
        if (this.value.length === 1 && !mightBeDirty(this)) {
            rememberParent(this);
            return this.value[0];
        }
    }
    // This is the most important method of the Entry API, because it
    // determines whether the cached this.value can be returned immediately,
    // or must be recomputed. The overall performance of the caching system
    // depends on the truth of the following observations: (1) this.dirty is
    // usually false, (2) this.dirtyChildren is usually null/empty, and thus
    // (3) valueGet(this.value) is usually returned without recomputation.
    recompute(args) {
        assert(!this.recomputing, "already recomputing");
        rememberParent(this);
        return mightBeDirty(this)
            ? reallyRecompute(this, args)
            : valueGet(this.value);
    }
    setDirty() {
        if (this.dirty)
            return;
        this.dirty = true;
        reportDirty(this);
        // We can go ahead and unsubscribe here, since any further dirty
        // notifications we receive will be redundant, and unsubscribing may
        // free up some resources, e.g. file watchers.
        (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.maybeUnsubscribe)(this);
    }
    dispose() {
        this.setDirty();
        // Sever any dependency relationships with our own children, so those
        // children don't retain this parent Entry in their child.parents sets,
        // thereby preventing it from being fully garbage collected.
        forgetChildren(this);
        // Because this entry has been kicked out of the cache (in index.js),
        // we've lost the ability to find out if/when this entry becomes dirty,
        // whether that happens through a subscription, because of a direct call
        // to entry.setDirty(), or because one of its children becomes dirty.
        // Because of this loss of future information, we have to assume the
        // worst (that this entry might have become dirty very soon), so we must
        // immediately mark this entry's parents as dirty. Normally we could
        // just call entry.setDirty() rather than calling parent.setDirty() for
        // each parent, but that would leave this entry in parent.childValues
        // and parent.dirtyChildren, which would prevent the child from being
        // truly forgotten.
        eachParent(this, (parent, child) => {
            parent.setDirty();
            forgetChild(parent, this);
        });
    }
    forget() {
        // The code that creates Entry objects in index.ts will replace this method
        // with one that actually removes the Entry from the cache, which will also
        // trigger the entry.dispose method.
        this.dispose();
    }
    dependOn(dep) {
        dep.add(this);
        if (!this.deps) {
            this.deps = emptySetPool.pop() || new Set();
        }
        this.deps.add(dep);
    }
    forgetDeps() {
        if (this.deps) {
            (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.arrayFromSet)(this.deps).forEach(dep => dep.delete(this));
            this.deps.clear();
            emptySetPool.push(this.deps);
            this.deps = null;
        }
    }
}
Entry.count = 0;
function rememberParent(child) {
    const parent = _context_js__WEBPACK_IMPORTED_MODULE_0__.parentEntrySlot.getValue();
    if (parent) {
        child.parents.add(parent);
        if (!parent.childValues.has(child)) {
            parent.childValues.set(child, []);
        }
        if (mightBeDirty(child)) {
            reportDirtyChild(parent, child);
        }
        else {
            reportCleanChild(parent, child);
        }
        return parent;
    }
}
function reallyRecompute(entry, args) {
    forgetChildren(entry);
    // Set entry as the parent entry while calling recomputeNewValue(entry).
    _context_js__WEBPACK_IMPORTED_MODULE_0__.parentEntrySlot.withValue(entry, recomputeNewValue, [entry, args]);
    if (maybeSubscribe(entry, args)) {
        // If we successfully recomputed entry.value and did not fail to
        // (re)subscribe, then this Entry is no longer explicitly dirty.
        setClean(entry);
    }
    return valueGet(entry.value);
}
function recomputeNewValue(entry, args) {
    entry.recomputing = true;
    const { normalizeResult } = entry;
    let oldValueCopy;
    if (normalizeResult && entry.value.length === 1) {
        oldValueCopy = valueCopy(entry.value);
    }
    // Make entry.value an empty array, representing an unknown value.
    entry.value.length = 0;
    try {
        // If entry.fn succeeds, entry.value will become a normal Value.
        entry.value[0] = entry.fn.apply(null, args);
        // If we have a viable oldValueCopy to compare with the (successfully
        // recomputed) new entry.value, and they are not already === identical, give
        // normalizeResult a chance to pick/choose/reuse parts of oldValueCopy[0]
        // and/or entry.value[0] to determine the final cached entry.value.
        if (normalizeResult && oldValueCopy && !valueIs(oldValueCopy, entry.value)) {
            try {
                entry.value[0] = normalizeResult(entry.value[0], oldValueCopy[0]);
            }
            catch (_a) {
                // If normalizeResult throws, just use the newer value, rather than
                // saving the exception as entry.value[1].
            }
        }
    }
    catch (e) {
        // If entry.fn throws, entry.value will hold that exception.
        entry.value[1] = e;
    }
    // Either way, this line is always reached.
    entry.recomputing = false;
}
function mightBeDirty(entry) {
    return entry.dirty || !!(entry.dirtyChildren && entry.dirtyChildren.size);
}
function setClean(entry) {
    entry.dirty = false;
    if (mightBeDirty(entry)) {
        // This Entry may still have dirty children, in which case we can't
        // let our parents know we're clean just yet.
        return;
    }
    reportClean(entry);
}
function reportDirty(child) {
    eachParent(child, reportDirtyChild);
}
function reportClean(child) {
    eachParent(child, reportCleanChild);
}
function eachParent(child, callback) {
    const parentCount = child.parents.size;
    if (parentCount) {
        const parents = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.arrayFromSet)(child.parents);
        for (let i = 0; i < parentCount; ++i) {
            callback(parents[i], child);
        }
    }
}
// Let a parent Entry know that one of its children may be dirty.
function reportDirtyChild(parent, child) {
    // Must have called rememberParent(child) before calling
    // reportDirtyChild(parent, child).
    assert(parent.childValues.has(child));
    assert(mightBeDirty(child));
    const parentWasClean = !mightBeDirty(parent);
    if (!parent.dirtyChildren) {
        parent.dirtyChildren = emptySetPool.pop() || new Set;
    }
    else if (parent.dirtyChildren.has(child)) {
        // If we already know this child is dirty, then we must have already
        // informed our own parents that we are dirty, so we can terminate
        // the recursion early.
        return;
    }
    parent.dirtyChildren.add(child);
    // If parent was clean before, it just became (possibly) dirty (according to
    // mightBeDirty), since we just added child to parent.dirtyChildren.
    if (parentWasClean) {
        reportDirty(parent);
    }
}
// Let a parent Entry know that one of its children is no longer dirty.
function reportCleanChild(parent, child) {
    // Must have called rememberChild(child) before calling
    // reportCleanChild(parent, child).
    assert(parent.childValues.has(child));
    assert(!mightBeDirty(child));
    const childValue = parent.childValues.get(child);
    if (childValue.length === 0) {
        parent.childValues.set(child, valueCopy(child.value));
    }
    else if (!valueIs(childValue, child.value)) {
        parent.setDirty();
    }
    removeDirtyChild(parent, child);
    if (mightBeDirty(parent)) {
        return;
    }
    reportClean(parent);
}
function removeDirtyChild(parent, child) {
    const dc = parent.dirtyChildren;
    if (dc) {
        dc.delete(child);
        if (dc.size === 0) {
            if (emptySetPool.length < POOL_TARGET_SIZE) {
                emptySetPool.push(dc);
            }
            parent.dirtyChildren = null;
        }
    }
}
// Removes all children from this entry and returns an array of the
// removed children.
function forgetChildren(parent) {
    if (parent.childValues.size > 0) {
        parent.childValues.forEach((_value, child) => {
            forgetChild(parent, child);
        });
    }
    // Remove this parent Entry from any sets to which it was added by the
    // addToSet method.
    parent.forgetDeps();
    // After we forget all our children, this.dirtyChildren must be empty
    // and therefore must have been reset to null.
    assert(parent.dirtyChildren === null);
}
function forgetChild(parent, child) {
    child.parents.delete(parent);
    parent.childValues.delete(child);
    removeDirtyChild(parent, child);
}
function maybeSubscribe(entry, args) {
    if (typeof entry.subscribe === "function") {
        try {
            (0,_helpers_js__WEBPACK_IMPORTED_MODULE_1__.maybeUnsubscribe)(entry); // Prevent double subscriptions.
            entry.unsubscribe = entry.subscribe.apply(null, args);
        }
        catch (e) {
            // If this Entry has a subscribe function and it threw an exception
            // (or an unsubscribe function it previously returned now throws),
            // return false to indicate that we were not able to subscribe (or
            // unsubscribe), and this Entry should remain dirty.
            entry.setDirty();
            return false;
        }
    }
    // Returning true indicates either that there was no entry.subscribe
    // function or that it succeeded.
    return true;
}
//# sourceMappingURL=entry.js.map

/***/ }),

/***/ "./node_modules/optimism/lib/helpers.js":
/*!**********************************************!*\
  !*** ./node_modules/optimism/lib/helpers.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayFromSet: () => (/* binding */ arrayFromSet),
/* harmony export */   hasOwnProperty: () => (/* binding */ hasOwnProperty),
/* harmony export */   maybeUnsubscribe: () => (/* binding */ maybeUnsubscribe)
/* harmony export */ });
const { hasOwnProperty, } = Object.prototype;
const arrayFromSet = Array.from ||
    function (set) {
        const array = [];
        set.forEach(item => array.push(item));
        return array;
    };
function maybeUnsubscribe(entryOrDep) {
    const { unsubscribe } = entryOrDep;
    if (typeof unsubscribe === "function") {
        entryOrDep.unsubscribe = void 0;
        unsubscribe();
    }
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/optimism/lib/index.js":
/*!********************************************!*\
  !*** ./node_modules/optimism/lib/index.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyTrie: () => (/* reexport safe */ _wry_trie__WEBPACK_IMPORTED_MODULE_0__.Trie),
/* harmony export */   Slot: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_2__.Slot),
/* harmony export */   asyncFromGen: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_2__.asyncFromGen),
/* harmony export */   bindContext: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_2__.bindContext),
/* harmony export */   defaultMakeCacheKey: () => (/* binding */ defaultMakeCacheKey),
/* harmony export */   dep: () => (/* reexport safe */ _dep_js__WEBPACK_IMPORTED_MODULE_3__.dep),
/* harmony export */   noContext: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_2__.noContext),
/* harmony export */   nonReactive: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_2__.nonReactive),
/* harmony export */   setTimeout: () => (/* reexport safe */ _context_js__WEBPACK_IMPORTED_MODULE_2__.setTimeout),
/* harmony export */   wrap: () => (/* binding */ wrap)
/* harmony export */ });
/* harmony import */ var _wry_trie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wry/trie */ "./node_modules/optimism/node_modules/@wry/trie/lib/index.js");
/* harmony import */ var _wry_caches__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wry/caches */ "./node_modules/@wry/caches/lib/strong.js");
/* harmony import */ var _entry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entry.js */ "./node_modules/optimism/lib/entry.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context.js */ "./node_modules/optimism/lib/context.js");
/* harmony import */ var _dep_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dep.js */ "./node_modules/optimism/lib/dep.js");




// These helper functions are important for making optimism work with
// asynchronous code. In order to register parent-child dependencies,
// optimism needs to know about any currently active parent computations.
// In ordinary synchronous code, the parent context is implicit in the
// execution stack, but asynchronous code requires some extra guidance in
// order to propagate context from one async task segment to the next.

// A lighter-weight dependency, similar to OptimisticWrapperFunction, except
// with only one argument, no makeCacheKey, no wrapped function to recompute,
// and no result value. Useful for representing dependency leaves in the graph
// of computation. Subscriptions are supported.

// The defaultMakeCacheKey function is remarkably powerful, because it gives
// a unique object for any shallow-identical list of arguments. If you need
// to implement a custom makeCacheKey function, you may find it helpful to
// delegate the final work to defaultMakeCacheKey, which is why we export it
// here. However, you may want to avoid defaultMakeCacheKey if your runtime
// does not support WeakMap, or you have the ability to return a string key.
// In those cases, just write your own custom makeCacheKey functions.
let defaultKeyTrie;
function defaultMakeCacheKey(...args) {
    const trie = defaultKeyTrie || (defaultKeyTrie = new _wry_trie__WEBPACK_IMPORTED_MODULE_0__.Trie(typeof WeakMap === "function"));
    return trie.lookupArray(args);
}
// If you're paranoid about memory leaks, or you want to avoid using WeakMap
// under the hood, but you still need the behavior of defaultMakeCacheKey,
// import this constructor to create your own tries.

;
const caches = new Set();
function wrap(originalFunction, { max = Math.pow(2, 16), keyArgs, makeCacheKey = defaultMakeCacheKey, normalizeResult, subscribe, cache: cacheOption = _wry_caches__WEBPACK_IMPORTED_MODULE_4__.StrongCache, } = Object.create(null)) {
    const cache = typeof cacheOption === "function"
        ? new cacheOption(max, entry => entry.dispose())
        : cacheOption;
    const optimistic = function () {
        const key = makeCacheKey.apply(null, keyArgs ? keyArgs.apply(null, arguments) : arguments);
        if (key === void 0) {
            return originalFunction.apply(null, arguments);
        }
        let entry = cache.get(key);
        if (!entry) {
            cache.set(key, entry = new _entry_js__WEBPACK_IMPORTED_MODULE_1__.Entry(originalFunction));
            entry.normalizeResult = normalizeResult;
            entry.subscribe = subscribe;
            // Give the Entry the ability to trigger cache.delete(key), even though
            // the Entry itself does not know about key or cache.
            entry.forget = () => cache.delete(key);
        }
        const value = entry.recompute(Array.prototype.slice.call(arguments));
        // Move this entry to the front of the least-recently used queue,
        // since we just finished computing its value.
        cache.set(key, entry);
        caches.add(cache);
        // Clean up any excess entries in the cache, but only if there is no
        // active parent entry, meaning we're not in the middle of a larger
        // computation that might be flummoxed by the cleaning.
        if (!_context_js__WEBPACK_IMPORTED_MODULE_2__.parentEntrySlot.hasValue()) {
            caches.forEach(cache => cache.clean());
            caches.clear();
        }
        return value;
    };
    Object.defineProperty(optimistic, "size", {
        get: () => cache.size,
        configurable: false,
        enumerable: false,
    });
    Object.freeze(optimistic.options = {
        max,
        keyArgs,
        makeCacheKey,
        normalizeResult,
        subscribe,
        cache,
    });
    function dirtyKey(key) {
        const entry = key && cache.get(key);
        if (entry) {
            entry.setDirty();
        }
    }
    optimistic.dirtyKey = dirtyKey;
    optimistic.dirty = function dirty() {
        dirtyKey(makeCacheKey.apply(null, arguments));
    };
    function peekKey(key) {
        const entry = key && cache.get(key);
        if (entry) {
            return entry.peek();
        }
    }
    optimistic.peekKey = peekKey;
    optimistic.peek = function peek() {
        return peekKey(makeCacheKey.apply(null, arguments));
    };
    function forgetKey(key) {
        return key ? cache.delete(key) : false;
    }
    optimistic.forgetKey = forgetKey;
    optimistic.forget = function forget() {
        return forgetKey(makeCacheKey.apply(null, arguments));
    };
    optimistic.makeCacheKey = makeCacheKey;
    optimistic.getKey = keyArgs ? function getKey() {
        return makeCacheKey.apply(null, keyArgs.apply(null, arguments));
    } : makeCacheKey;
    return Object.freeze(optimistic);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/optimism/node_modules/@wry/trie/lib/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/optimism/node_modules/@wry/trie/lib/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Trie: () => (/* binding */ Trie)
/* harmony export */ });
// A [trie](https://en.wikipedia.org/wiki/Trie) data structure that holds
// object keys weakly, yet can also hold non-object keys, unlike the
// native `WeakMap`.
// If no makeData function is supplied, the looked-up data will be an empty,
// null-prototype Object.
const defaultMakeData = () => Object.create(null);
// Useful for processing arguments objects as well as arrays.
const { forEach, slice } = Array.prototype;
const { hasOwnProperty } = Object.prototype;
class Trie {
    constructor(weakness = true, makeData = defaultMakeData) {
        this.weakness = weakness;
        this.makeData = makeData;
    }
    lookup(...array) {
        return this.lookupArray(array);
    }
    lookupArray(array) {
        let node = this;
        forEach.call(array, key => node = node.getChildTrie(key));
        return hasOwnProperty.call(node, "data")
            ? node.data
            : node.data = this.makeData(slice.call(array));
    }
    peek(...array) {
        return this.peekArray(array);
    }
    peekArray(array) {
        let node = this;
        for (let i = 0, len = array.length; node && i < len; ++i) {
            const map = this.weakness && isObjRef(array[i]) ? node.weak : node.strong;
            node = map && map.get(array[i]);
        }
        return node && node.data;
    }
    getChildTrie(key) {
        const map = this.weakness && isObjRef(key)
            ? this.weak || (this.weak = new WeakMap())
            : this.strong || (this.strong = new Map());
        let child = map.get(key);
        if (!child)
            map.set(key, child = new Trie(this.weakness, this.makeData));
        return child;
    }
}
function isObjRef(value) {
    switch (typeof value) {
        case "object":
            if (value === null)
                break;
        // Fall through to return true...
        case "function":
            return true;
    }
    return false;
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/ts-invariant/lib/invariant.js":
/*!****************************************************!*\
  !*** ./node_modules/ts-invariant/lib/invariant.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvariantError: () => (/* binding */ InvariantError),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   invariant: () => (/* binding */ invariant),
/* harmony export */   setVerbosity: () => (/* binding */ setVerbosity)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.mjs");

var genericMessage = "Invariant Violation";
var _a = Object.setPrototypeOf, setPrototypeOf = _a === void 0 ? function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
} : _a;
var InvariantError = /** @class */ (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(InvariantError, _super);
    function InvariantError(message) {
        if (message === void 0) { message = genericMessage; }
        var _this = _super.call(this, typeof message === "number"
            ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)"
            : message) || this;
        _this.framesToPop = 1;
        _this.name = genericMessage;
        setPrototypeOf(_this, InvariantError.prototype);
        return _this;
    }
    return InvariantError;
}(Error));

function invariant(condition, message) {
    if (!condition) {
        throw new InvariantError(message);
    }
}
var verbosityLevels = ["debug", "log", "warn", "error", "silent"];
var verbosityLevel = verbosityLevels.indexOf("log");
function wrapConsoleMethod(name) {
    return function () {
        if (verbosityLevels.indexOf(name) >= verbosityLevel) {
            // Default to console.log if this host environment happens not to provide
            // all the console.* methods we need.
            var method = console[name] || console.log;
            return method.apply(console, arguments);
        }
    };
}
(function (invariant) {
    invariant.debug = wrapConsoleMethod("debug");
    invariant.log = wrapConsoleMethod("log");
    invariant.warn = wrapConsoleMethod("warn");
    invariant.error = wrapConsoleMethod("error");
})(invariant || (invariant = {}));
function setVerbosity(level) {
    var old = verbosityLevels[verbosityLevel];
    verbosityLevel = Math.max(0, verbosityLevels.indexOf(level));
    return old;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (invariant);
//# sourceMappingURL=invariant.js.map

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.mjs":
/*!******************************************!*\
  !*** ./node_modules/tslib/tslib.es6.mjs ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ }),

/***/ "./node_modules/zen-observable-ts/module.js":
/*!**************************************************!*\
  !*** ./node_modules/zen-observable-ts/module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Observable: () => (/* binding */ Observable)
/* harmony export */ });
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// === Symbol Support ===
var hasSymbols = function () {
  return typeof Symbol === 'function';
};

var hasSymbol = function (name) {
  return hasSymbols() && Boolean(Symbol[name]);
};

var getSymbol = function (name) {
  return hasSymbol(name) ? Symbol[name] : '@@' + name;
};

if (hasSymbols() && !hasSymbol('observable')) {
  Symbol.observable = Symbol('observable');
}

var SymbolIterator = getSymbol('iterator');
var SymbolObservable = getSymbol('observable');
var SymbolSpecies = getSymbol('species'); // === Abstract Operations ===

function getMethod(obj, key) {
  var value = obj[key];
  if (value == null) return undefined;
  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');
  return value;
}

function getSpecies(obj) {
  var ctor = obj.constructor;

  if (ctor !== undefined) {
    ctor = ctor[SymbolSpecies];

    if (ctor === null) {
      ctor = undefined;
    }
  }

  return ctor !== undefined ? ctor : Observable;
}

function isObservable(x) {
  return x instanceof Observable; // SPEC: Brand check
}

function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function () {
      throw e;
    });
  }
}

function enqueue(fn) {
  Promise.resolve().then(function () {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}

function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === undefined) return;
  subscription._cleanup = undefined;

  if (!cleanup) {
    return;
  }

  try {
    if (typeof cleanup === 'function') {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, 'unsubscribe');

      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}

function closeSubscription(subscription) {
  subscription._observer = undefined;
  subscription._queue = undefined;
  subscription._state = 'closed';
}

function flushSubscription(subscription) {
  var queue = subscription._queue;

  if (!queue) {
    return;
  }

  subscription._queue = undefined;
  subscription._state = 'ready';

  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === 'closed') break;
  }
}

function notifySubscription(subscription, type, value) {
  subscription._state = 'running';
  var observer = subscription._observer;

  try {
    var m = getMethod(observer, type);

    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;

      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);else throw value;
        break;

      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
}

function onNotify(subscription, type, value) {
  if (subscription._state === 'closed') return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({
      type: type,
      value: value
    });

    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{
      type: type,
      value: value
    }];
    enqueue(function () {
      return flushSubscription(subscription);
    });
    return;
  }

  notifySubscription(subscription, type, value);
}

var Subscription = /*#__PURE__*/function () {
  function Subscription(observer, subscriber) {
    // ASSERT: observer is an object
    // ASSERT: subscriber is callable
    this._cleanup = undefined;
    this._observer = observer;
    this._queue = undefined;
    this._state = 'initializing';
    var subscriptionObserver = new SubscriptionObserver(this);

    try {
      this._cleanup = subscriber.call(undefined, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }

    if (this._state === 'initializing') this._state = 'ready';
  }

  var _proto = Subscription.prototype;

  _proto.unsubscribe = function unsubscribe() {
    if (this._state !== 'closed') {
      closeSubscription(this);
      cleanupSubscription(this);
    }
  };

  _createClass(Subscription, [{
    key: "closed",
    get: function () {
      return this._state === 'closed';
    }
  }]);

  return Subscription;
}();

var SubscriptionObserver = /*#__PURE__*/function () {
  function SubscriptionObserver(subscription) {
    this._subscription = subscription;
  }

  var _proto2 = SubscriptionObserver.prototype;

  _proto2.next = function next(value) {
    onNotify(this._subscription, 'next', value);
  };

  _proto2.error = function error(value) {
    onNotify(this._subscription, 'error', value);
  };

  _proto2.complete = function complete() {
    onNotify(this._subscription, 'complete');
  };

  _createClass(SubscriptionObserver, [{
    key: "closed",
    get: function () {
      return this._subscription._state === 'closed';
    }
  }]);

  return SubscriptionObserver;
}();

var Observable = /*#__PURE__*/function () {
  function Observable(subscriber) {
    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');
    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');
    this._subscriber = subscriber;
  }

  var _proto3 = Observable.prototype;

  _proto3.subscribe = function subscribe(observer) {
    if (typeof observer !== 'object' || observer === null) {
      observer = {
        next: observer,
        error: arguments[1],
        complete: arguments[2]
      };
    }

    return new Subscription(observer, this._subscriber);
  };

  _proto3.forEach = function forEach(fn) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (typeof fn !== 'function') {
        reject(new TypeError(fn + ' is not a function'));
        return;
      }

      function done() {
        subscription.unsubscribe();
        resolve();
      }

      var subscription = _this.subscribe({
        next: function (value) {
          try {
            fn(value, done);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  };

  _proto3.map = function map(fn) {
    var _this2 = this;

    if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
    var C = getSpecies(this);
    return new C(function (observer) {
      return _this2.subscribe({
        next: function (value) {
          try {
            value = fn(value);
          } catch (e) {
            return observer.error(e);
          }

          observer.next(value);
        },
        error: function (e) {
          observer.error(e);
        },
        complete: function () {
          observer.complete();
        }
      });
    });
  };

  _proto3.filter = function filter(fn) {
    var _this3 = this;

    if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
    var C = getSpecies(this);
    return new C(function (observer) {
      return _this3.subscribe({
        next: function (value) {
          try {
            if (!fn(value)) return;
          } catch (e) {
            return observer.error(e);
          }

          observer.next(value);
        },
        error: function (e) {
          observer.error(e);
        },
        complete: function () {
          observer.complete();
        }
      });
    });
  };

  _proto3.reduce = function reduce(fn) {
    var _this4 = this;

    if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
    var C = getSpecies(this);
    var hasSeed = arguments.length > 1;
    var hasValue = false;
    var seed = arguments[1];
    var acc = seed;
    return new C(function (observer) {
      return _this4.subscribe({
        next: function (value) {
          var first = !hasValue;
          hasValue = true;

          if (!first || hasSeed) {
            try {
              acc = fn(acc, value);
            } catch (e) {
              return observer.error(e);
            }
          } else {
            acc = value;
          }
        },
        error: function (e) {
          observer.error(e);
        },
        complete: function () {
          if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));
          observer.next(acc);
          observer.complete();
        }
      });
    });
  };

  _proto3.concat = function concat() {
    var _this5 = this;

    for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
      sources[_key] = arguments[_key];
    }

    var C = getSpecies(this);
    return new C(function (observer) {
      var subscription;
      var index = 0;

      function startNext(next) {
        subscription = next.subscribe({
          next: function (v) {
            observer.next(v);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            if (index === sources.length) {
              subscription = undefined;
              observer.complete();
            } else {
              startNext(C.from(sources[index++]));
            }
          }
        });
      }

      startNext(_this5);
      return function () {
        if (subscription) {
          subscription.unsubscribe();
          subscription = undefined;
        }
      };
    });
  };

  _proto3.flatMap = function flatMap(fn) {
    var _this6 = this;

    if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');
    var C = getSpecies(this);
    return new C(function (observer) {
      var subscriptions = [];

      var outer = _this6.subscribe({
        next: function (value) {
          if (fn) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }
          }

          var inner = C.from(value).subscribe({
            next: function (value) {
              observer.next(value);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              var i = subscriptions.indexOf(inner);
              if (i >= 0) subscriptions.splice(i, 1);
              completeIfDone();
            }
          });
          subscriptions.push(inner);
        },
        error: function (e) {
          observer.error(e);
        },
        complete: function () {
          completeIfDone();
        }
      });

      function completeIfDone() {
        if (outer.closed && subscriptions.length === 0) observer.complete();
      }

      return function () {
        subscriptions.forEach(function (s) {
          return s.unsubscribe();
        });
        outer.unsubscribe();
      };
    });
  };

  _proto3[SymbolObservable] = function () {
    return this;
  };

  Observable.from = function from(x) {
    var C = typeof this === 'function' ? this : Observable;
    if (x == null) throw new TypeError(x + ' is not an object');
    var method = getMethod(x, SymbolObservable);

    if (method) {
      var observable = method.call(x);
      if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');
      if (isObservable(observable) && observable.constructor === C) return observable;
      return new C(function (observer) {
        return observable.subscribe(observer);
      });
    }

    if (hasSymbol('iterator')) {
      method = getMethod(x, SymbolIterator);

      if (method) {
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;

            for (var _iterator = _createForOfIteratorHelperLoose(method.call(x)), _step; !(_step = _iterator()).done;) {
              var item = _step.value;
              observer.next(item);
              if (observer.closed) return;
            }

            observer.complete();
          });
        });
      }
    }

    if (Array.isArray(x)) {
      return new C(function (observer) {
        enqueue(function () {
          if (observer.closed) return;

          for (var i = 0; i < x.length; ++i) {
            observer.next(x[i]);
            if (observer.closed) return;
          }

          observer.complete();
        });
      });
    }

    throw new TypeError(x + ' is not observable');
  };

  Observable.of = function of() {
    for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      items[_key2] = arguments[_key2];
    }

    var C = typeof this === 'function' ? this : Observable;
    return new C(function (observer) {
      enqueue(function () {
        if (observer.closed) return;

        for (var i = 0; i < items.length; ++i) {
          observer.next(items[i]);
          if (observer.closed) return;
        }

        observer.complete();
      });
    });
  };

  _createClass(Observable, null, [{
    key: SymbolSpecies,
    get: function () {
      return this;
    }
  }]);

  return Observable;
}();

if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol('extensions'), {
    value: {
      symbol: SymbolObservable,
      hostReportError: hostReportError
    },
    configurable: true
  });
}




/***/ }),

/***/ "./src/blocks/edumed_rankings/block.json":
/*!***********************************************!*\
  !*** ./src/blocks/edumed_rankings/block.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"cafeto/edumed-rankings","version":"0.1.0","title":"Cafeto Edumed Rankings","category":"cafeto-category","icon":"editor-ol","description":"Block for displaying the school rankings on Edumed","example":{},"supports":{"html":false},"attributes":{"postType":{"type":"string","default":"school_ranking"},"program":{"type":"string"},"defaultOpen":{"type":"number","default":3},"hasTwoAndFourYears":{"type":"string","default":""},"defaultLevelYear":{"type":"string","default":""},"version":{"type":"string"},"rankings":{"type":"array","default":[]}},"textdomain":"cafeto","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./index.css","render":"file:./render.php","viewScript":"file:./view.js"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"blocks/edumed_rankings/index": 0,
/******/ 			"blocks/edumed_rankings/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkcafeto_gutenberg_blocks"] = globalThis["webpackChunkcafeto_gutenberg_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/edumed_rankings/style-index"], () => (__webpack_require__("./src/blocks/edumed_rankings/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map