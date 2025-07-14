/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/multipurpose-card/edit.js":
/*!**********************************************!*\
  !*** ./src/blocks/multipurpose-card/edit.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/multipurpose-card/editor.scss");







// Default inner block template: h2 heading and paragraph
const TEMPLATE = [["core/heading", {
  level: 2
}],
// Preloaded heading block (level 2)
["core/paragraph", {}] // Preloaded paragraph block
];

/**
 * The edit function handles the block's behavior and interface in the editor.
 *
 * @param {Object} props - The block properties.
 * @param {Object} props.attributes - Attributes of the block.
 * @param {Function} props.setAttributes - Function to update attributes.
 *
 * @returns {JSX.Element} - The block's editor interface.
 */
const Edit = ({
  attributes,
  setAttributes
}) => {
  const {
    baseColor,
    borderColor,
    borderStyle,
    borderWidth,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    backgroundColor,
    paddingInline,
    paddingBlock,
    borderRadiusTopLeft,
    borderRadiusTopRight,
    borderRadiusBottomLeft,
    borderRadiusBottomRight,
    showViewMoreButton,
    enableBoxShadow
  } = attributes;

  // Update attribute handlers
  const onChangeBaseColor = newColor => setAttributes({
    baseColor: newColor
  });
  const onChangeBorderColor = newColor => setAttributes({
    borderColor: newColor
  });
  const onChangeBorderStyle = value => setAttributes({
    borderStyle: value
  });
  const onChangeBorderWidth = value => {
    setAttributes({
      borderWidth: value,
      borderTopWidth: value,
      borderRightWidth: value,
      borderBottomWidth: value,
      borderLeftWidth: value
    });
  };
  const onChangeBorderTopWidth = value => setAttributes({
    borderTopWidth: value
  });
  const onChangeBorderRightWidth = value => setAttributes({
    borderRightWidth: value
  });
  const onChangeBorderBottomWidth = value => setAttributes({
    borderBottomWidth: value
  });
  const onChangeBorderLeftWidth = value => setAttributes({
    borderLeftWidth: value
  });
  const onChangeBackgroundColor = newColor => setAttributes({
    backgroundColor: newColor
  });
  const onChangePaddingInline = value => setAttributes({
    paddingInline: value
  });
  const onChangePaddingBlock = value => setAttributes({
    paddingBlock: value
  });
  const onChangeBorderRadiusTopLeft = value => setAttributes({
    borderRadiusTopLeft: value
  });
  const onChangeBorderRadiusTopRight = value => setAttributes({
    borderRadiusTopRight: value
  });
  const onChangeBorderRadiusBottomLeft = value => setAttributes({
    borderRadiusBottomLeft: value
  });
  const onChangeBorderRadiusBottomRight = value => setAttributes({
    borderRadiusBottomRight: value
  });
  const onToggleShowViewMore = value => setAttributes({
    showViewMoreButton: value
  });
  const onToggleBoxShadow = value => setAttributes({
    enableBoxShadow: value
  });

  // Common units configuration for border widths
  const borderUnits = [{
    value: "px",
    label: "px",
    default: 1,
    step: 1,
    min: 0,
    max: 10
  }, {
    value: "rem",
    label: "rem",
    default: 0.1,
    step: 0.1,
    min: 0,
    max: 2
  }, {
    value: "em",
    label: "em",
    default: 0.1,
    step: 0.1,
    min: 0,
    max: 2
  }];

  // Generate block props with dynamic background color
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)({
    className: `${showViewMoreButton ? "has-view-more" : ""} ${enableBoxShadow ? "has-box-shadow" : ""}`,
    style: {
      borderColor: borderColor || undefined,
      borderStyle: borderStyle || undefined,
      borderTopWidth: borderTopWidth || undefined,
      borderRightWidth: borderRightWidth || undefined,
      borderBottomWidth: borderBottomWidth || undefined,
      borderLeftWidth: borderLeftWidth || undefined,
      backgroundColor: backgroundColor || undefined,
      paddingInline: paddingInline || undefined,
      paddingBlock: paddingBlock || undefined,
      borderTopLeftRadius: borderRadiusTopLeft || undefined,
      borderTopRightRadius: borderRadiusTopRight || undefined,
      borderBottomLeftRadius: borderRadiusBottomLeft || undefined,
      borderBottomRightRadius: borderRadiusBottomRight || undefined,
      "--base-color": baseColor ? baseColor : undefined,
      // Apply base-color if it has a value
      "--max-height": "none" // Force no max-height
    }
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: "Base Color",
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
    color: baseColor,
    onChangeComplete: color => onChangeBaseColor(color.hex),
    disableAlpha: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: "Border Settings",
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      width: "100%"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "components-base-control__label",
    style: {
      marginBottom: "8px"
    }
  }, "Border Color"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
    color: borderColor,
    onChangeComplete: color => onChangeBorderColor(color.hex),
    disableAlpha: true
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      width: "100%"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SelectControl, {
    label: "Border Style",
    value: borderStyle,
    options: [{
      label: "Solid",
      value: "solid"
    }, {
      label: "Dashed",
      value: "dashed"
    }, {
      label: "Dotted",
      value: "dotted"
    }, {
      label: "Double",
      value: "double"
    }],
    onChange: onChangeBorderStyle
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      marginBottom: "16px",
      marginTop: "16px",
      width: "100%"
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "components-base-control__label"
  }, "Border Width"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "secondary",
    isSmall: true,
    onClick: () => onChangeBorderWidth(borderTopWidth),
    style: {
      marginBottom: "8px"
    }
  }, "Unify all borders")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalUnitControl, {
    label: "Top Width",
    value: borderTopWidth,
    onChange: onChangeBorderTopWidth,
    units: borderUnits
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalUnitControl, {
    label: "Right Width",
    value: borderRightWidth,
    onChange: onChangeBorderRightWidth,
    units: borderUnits
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalUnitControl, {
    label: "Bottom Width",
    value: borderBottomWidth,
    onChange: onChangeBorderBottomWidth,
    units: borderUnits
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.__experimentalUnitControl, {
    label: "Left Width",
    value: borderLeftWidth,
    onChange: onChangeBorderLeftWidth,
    units: borderUnits
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", {
    className: "components-base-control__label"
  }, "Border Radius"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: "Top Left Radius",
    value: borderRadiusTopLeft,
    onChange: onChangeBorderRadiusTopLeft
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: "Top Right Radius",
    value: borderRadiusTopRight,
    onChange: onChangeBorderRadiusTopRight
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: "Bottom Left Radius",
    value: borderRadiusBottomLeft,
    onChange: onChangeBorderRadiusBottomLeft
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: "Bottom Right Radius",
    value: borderRadiusBottomRight,
    onChange: onChangeBorderRadiusBottomRight
  })))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: "Background Color",
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
    color: backgroundColor,
    onChangeComplete: color => onChangeBackgroundColor(color.hex),
    disableAlpha: true
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: "Padding",
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: "Inline Padding (e.g., 20px)",
    value: paddingInline,
    onChange: onChangePaddingInline
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
    label: "Block Padding (e.g., 10px)",
    value: paddingBlock,
    onChange: onChangePaddingBlock
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: "View More Button",
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: "Show View More Button",
    checked: showViewMoreButton,
    onChange: onToggleShowViewMore
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
    title: "Box Shadow",
    initialOpen: false
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToggleControl, {
    label: "Enable Box Shadow",
    checked: enableBoxShadow,
    onChange: onToggleBoxShadow
  }))), showViewMoreButton ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks, {
    template: TEMPLATE
  })) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InnerBlocks, {
    template: TEMPLATE
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Edit);

/***/ }),

/***/ "./src/blocks/multipurpose-card/index.js":
/*!***********************************************!*\
  !*** ./src/blocks/multipurpose-card/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit */ "./src/blocks/multipurpose-card/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./save */ "./src/blocks/multipurpose-card/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/blocks/multipurpose-card/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


// Import edit and save components




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/blocks/multipurpose-card/save.js":
/*!**********************************************!*\
  !*** ./src/blocks/multipurpose-card/save.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/multipurpose-card/style.scss");




/**
 * The save function handles how the block's content is saved to the database.
 *
 * @param {Object} props - The block properties.
 * @param {Object} props.attributes - Attributes of the block.
 *
 * @returns {JSX.Element} - The block's saved HTML structure.
 */
const Save = ({
  attributes
}) => {
  const {
    baseColor,
    borderColor,
    borderStyle,
    borderWidth,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    backgroundColor,
    paddingInline,
    paddingBlock,
    borderRadiusTopLeft,
    borderRadiusTopRight,
    borderRadiusBottomLeft,
    borderRadiusBottomRight,
    showViewMoreButton,
    enableBoxShadow
  } = attributes;

  // Clean any existing maxHeight attribute to prevent --max-height CSS injection
  const cleanAttributes = {
    ...attributes
  };
  delete cleanAttributes.maxHeight;

  // Generate block props with dynamic background color
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
    className: `ventrix-multipurpose-card-block ${showViewMoreButton ? "has-view-more" : ""} ${enableBoxShadow ? "has-box-shadow" : ""}`,
    style: {
      borderColor: borderColor || undefined,
      borderStyle: borderStyle || undefined,
      borderTopWidth: borderTopWidth || undefined,
      borderRightWidth: borderRightWidth || undefined,
      borderBottomWidth: borderBottomWidth || undefined,
      borderLeftWidth: borderLeftWidth || undefined,
      backgroundColor: backgroundColor || undefined,
      paddingInline: paddingInline || undefined,
      paddingBlock: paddingBlock || undefined,
      borderTopLeftRadius: borderRadiusTopLeft || undefined,
      borderTopRightRadius: borderRadiusTopRight || undefined,
      borderBottomLeftRadius: borderRadiusBottomLeft || undefined,
      borderBottomRightRadius: borderRadiusBottomRight || undefined,
      "--base-color": baseColor ? baseColor : undefined,
      "--max-height": "none" // Force no max-height
    }
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, showViewMoreButton ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "wp-block-inner"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null)) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, null), showViewMoreButton && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: "view-more-button"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "view-more-text"
  }, "View More"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "view-more-icon"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Save);

/***/ }),

/***/ "./src/blocks/multipurpose-card/editor.scss":
/*!**************************************************!*\
  !*** ./src/blocks/multipurpose-card/editor.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks/multipurpose-card/style.scss":
/*!*************************************************!*\
  !*** ./src/blocks/multipurpose-card/style.scss ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/blocks/multipurpose-card/block.json":
/*!*************************************************!*\
  !*** ./src/blocks/multipurpose-card/block.json ***!
  \*************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"cafeto/multipurpose-card","version":"0.1.0","title":"Cafeto Multipurpose Card","category":"cafeto-category","icon":"excerpt-view","description":"Card Block for multipurpose uses","example":{},"supports":{"html":false,"anchor":true,"className":true},"attributes":{"baseColor":{"type":"string","default":"#5C44BB"},"borderColor":{"type":"string","default":"#E3DBFF"},"borderStyle":{"type":"string","default":"solid"},"borderWidth":{"type":"string","default":"1px"},"borderTopWidth":{"type":"string","default":"1px"},"borderRightWidth":{"type":"string","default":"1px"},"borderBottomWidth":{"type":"string","default":"1px"},"borderLeftWidth":{"type":"string","default":"1px"},"backgroundColor":{"type":"string","default":"#F8F7FF"},"paddingInline":{"type":"string","default":"50px"},"paddingBlock":{"type":"string","default":"40px"},"borderRadiusTopLeft":{"type":"string","default":"30px"},"borderRadiusTopRight":{"type":"string","default":"30px"},"borderRadiusBottomLeft":{"type":"string","default":"30px"},"borderRadiusBottomRight":{"type":"string","default":"30px"},"showViewMoreButton":{"type":"boolean","default":false},"enableBoxShadow":{"type":"boolean","default":false}},"textdomain":"cafeto","editorScript":"file:./index.js","viewScript":"file:./view.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
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
/******/ 			"blocks/multipurpose-card/index": 0,
/******/ 			"blocks/multipurpose-card/style-index": 0
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
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkcafeto_gutenberg_blocks"] = self["webpackChunkcafeto_gutenberg_blocks"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["blocks/multipurpose-card/style-index"], () => (__webpack_require__("./src/blocks/multipurpose-card/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map