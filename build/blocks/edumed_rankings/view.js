/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/edumed_rankings/js/featured-rankings.js":
/*!************************************************************!*\
  !*** ./src/blocks/edumed_rankings/js/featured-rankings.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyFeaturedRankings: () => (/* binding */ applyFeaturedRankings)
/* harmony export */ });
function applyFeaturedRankings(block) {
  // Set variables
  const hasYears = block.getAttribute('data-has-years');
  const defaultLevelYear = block.getAttribute('data-level-year');
  const twoYearButton = block.querySelector('.two-year-button');
  const fourYearButton = block.querySelector('.four-year-button');
  const aboutButton = block.querySelector('.rankings-top-bar--about');
  const popup = block.querySelector('.rankings-popup--widget');
  const closeButton = block.querySelector('.rankings-popup--widget--close');
  const overlay = block.querySelector('.rankings-popup--overlay');
  const expandAllButton = block.querySelector('.expand-all');
  const collapseAllButton = block.querySelector('.collapse-all');

  // Get defaultOpen from the data attribute
  const defaultOpen = parseInt(block.getAttribute('data-default-open')) || 3;

  // 2 year 4 year buttons
  if (hasYears === 'yes') {
    if (defaultLevelYear === 'two-year') {
      twoYearButton.classList.add('active');
    } else if (defaultLevelYear === 'four-year') {
      fourYearButton.classList.add('active');
    }
  } else {
    if (defaultLevelYear === 'two-year') {
      fourYearButton.classList.add('disabled');
      fourYearButton.setAttribute('data-tooltip', 'No 4-year Schools for this program');
      twoYearButton.classList.add('active');
    } else if (defaultLevelYear === 'four-year') {
      twoYearButton.classList.add('disabled');
      twoYearButton.setAttribute('data-tooltip', 'No 2-year Schools for this program');
      fourYearButton.classList.add('active');
    }
  }

  // // Add smooth scroll behavior with adjustment
  block.querySelectorAll('.rankings-top-bar--years a').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      if (!this.classList.contains('disabled')) {
        event.preventDefault();
        let targetId = this.getAttribute('href').substring(1);
        let targetElement = document.getElementById(targetId);
        if (targetElement) {
          let targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 150;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Popup functionality
  if (aboutButton) {
    aboutButton.addEventListener('click', function () {
      popup.classList.remove('hidden');
      overlay.classList.remove('hidden');
    });
  }
  if (closeButton) {
    closeButton.addEventListener('click', function () {
      popup.classList.add('hidden');
      overlay.classList.add('hidden');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', function () {
      popup.classList.add('hidden');
      overlay.classList.add('hidden');
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      popup.classList.add('hidden');
      overlay.classList.add('hidden');
    }
  });

  // Accordion functionality
  block.querySelectorAll('.rankings-list--item').forEach(function (item, index) {
    var content = item.querySelector('.rankings-list--item--hidden');
    var leftToggleButton = item.querySelector('.rankings-list--item--heading--left--button');
    var rightToggleButton = item.querySelector('.rankings-list--item--heading--right--button');
    if (content) {
      item.addEventListener('click', function () {
        content.classList.toggle('hidden');
        if (content.classList.contains('hidden')) {
          if (leftToggleButton) leftToggleButton.classList.remove('expanded');
          if (rightToggleButton) rightToggleButton.classList.remove('expanded');
        } else {
          if (leftToggleButton) leftToggleButton.classList.add('expanded');
          if (rightToggleButton) rightToggleButton.classList.add('expanded');
        }
      });

      // Expand the first `defaultOpen` items
      if (index < defaultOpen) {
        content.classList.remove('hidden');
        if (leftToggleButton) leftToggleButton.classList.add('expanded');
        if (rightToggleButton) rightToggleButton.classList.add('expanded');
      }
    }
  });

  // Expand/Collapse All functionality
  if (expandAllButton) {
    expandAllButton.addEventListener('click', function () {
      block.querySelectorAll('.rankings-list--item .rankings-list--item--hidden').forEach(function (element) {
        element.classList.remove('hidden');
        const leftToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--left--button');
        const rightToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--right--button');
        if (leftToggleButton) leftToggleButton.classList.add('expanded');
        if (rightToggleButton) rightToggleButton.classList.add('expanded');
      });
    });
  }
  if (collapseAllButton) {
    collapseAllButton.addEventListener('click', function () {
      block.querySelectorAll('.rankings-list--item .rankings-list--item--hidden').forEach(function (element) {
        element.classList.add('hidden');
        const leftToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--left--button');
        const rightToggleButton = element.closest('.rankings-list--item').querySelector('.rankings-list--item--heading--right--button');
        if (leftToggleButton) leftToggleButton.classList.remove('expanded');
        if (rightToggleButton) rightToggleButton.classList.remove('expanded');
      });
    });
  }
}

/***/ }),

/***/ "./src/blocks/edumed_rankings/js/traditional-rankings.js":
/*!***************************************************************!*\
  !*** ./src/blocks/edumed_rankings/js/traditional-rankings.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyTraditionalRankings: () => (/* binding */ applyTraditionalRankings)
/* harmony export */ });
// Utility function to handle smooth scrolling
function initSmoothScroll(block) {
  block.querySelectorAll('.rankings-top-bar--years a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
      if (!this.classList.contains('disabled')) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 150;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Popup management functions
function createPopupManager(block) {
  const aboutButton = block.querySelector('.rankings-top-bar--about');
  const popup = block.querySelector('.rankings-popup--widget');
  const closeButton = block.querySelector('.rankings-popup--widget--close');
  const overlay = block.querySelector('.rankings-popup--overlay');
  if (!popup || !overlay) return;
  const showPopup = () => {
    popup.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };
  const hidePopup = () => {
    popup.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  // Initialize popup event listeners
  if (aboutButton) {
    aboutButton.addEventListener('click', showPopup);
  }
  if (closeButton) {
    closeButton.addEventListener('click', hidePopup);
  }
  overlay.addEventListener('click', hidePopup);

  // Global escape key handler
  const handleEscapeKey = event => {
    if (event.key === 'Escape') {
      hidePopup();
    }
  };
  document.addEventListener('keydown', handleEscapeKey);

  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleEscapeKey);
  };
}

// Accordion functionality
function initAccordion(block) {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  // Handle desktop toggle buttons
  block.querySelectorAll(".rankings-list__item-toggle-btn:not(.rankings-list__item-heading__top .rankings-list__item-toggle-btn)").forEach(button => {
    button.addEventListener("click", function () {
      const toggleContent = this.previousElementSibling;
      const rightSection = this.closest(".rankings-list__item").querySelector(".rankings-list__item-right");
      const item = this.closest(".rankings-list__item");
      if (isMobile) {
        if (item) {
          item.classList.toggle("collapsed");
        }
        this.classList.toggle("expanded");
      } else {
        toggleContent.classList.toggle("expanded");
        this.classList.toggle("expanded");
        if (rightSection) {
          rightSection.classList.toggle("collapsed", !toggleContent.classList.contains("expanded"));
        }
        if (item) {
          item.classList.toggle("collapsed", !toggleContent.classList.contains("expanded"));
        }
        this.textContent = toggleContent.classList.contains("expanded") ? "Less Details" : "More Details";
      }
    });
  });

  // Handle mobile toggle buttons (inside heading)
  block.querySelectorAll(".rankings-list__item-heading__top .rankings-list__item-toggle-btn").forEach(button => {
    button.addEventListener("click", function () {
      const item = this.closest(".rankings-list__item");
      const toggleContent = item.querySelector(".rankings-list__item-toggle");
      if (isMobile) {
        if (item) {
          item.classList.toggle("collapsed");
        }
      }
      toggleContent.classList.toggle("expanded");
      this.classList.toggle("expanded");
    });
  });
}

// Expand/Collapse functionality
function createExpandCollapseManager(block) {
  const expandAllButton = block.querySelector('.expand-all');
  const collapseAllButton = block.querySelector('.collapse-all');
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  if (!expandAllButton || !collapseAllButton) return;
  const toggleAllItems = shouldExpand => {
    // Handle each item individually
    block.querySelectorAll(".rankings-list__item").forEach(item => {
      if (isMobile) {
        // Mobile specific handling
        const toggleContent = item.querySelector(".rankings-list__item-toggle");
        const mobileButton = item.querySelector(".rankings-list__item-heading__top .rankings-list__item-toggle-btn");
        if (shouldExpand) {
          // Expand
          item.classList.remove("collapsed");
          if (toggleContent) toggleContent.classList.add("expanded");
          if (mobileButton) {
            mobileButton.classList.remove("expanded");
          }
        } else {
          // Collapse
          item.classList.add("collapsed");
          if (toggleContent) toggleContent.classList.remove("expanded");
          if (mobileButton) {
            mobileButton.classList.add("expanded");
          }
        }
      } else {
        // Desktop specific handling
        const toggleContent = item.querySelector(".rankings-list__item-toggle");
        const desktopButton = item.querySelector(".rankings-list__item-toggle-btn:not(.rankings-list__item-heading__top .rankings-list__item-toggle-btn)");
        const rightSection = item.querySelector(".rankings-list__item-right");
        if (shouldExpand) {
          // Expand
          if (toggleContent) toggleContent.classList.add("expanded");
          if (desktopButton) {
            desktopButton.classList.add("expanded");
            desktopButton.textContent = "Less Details";
          }
          if (rightSection) rightSection.classList.remove("collapsed");
          item.classList.remove("collapsed");
        } else {
          // Collapse
          if (toggleContent) toggleContent.classList.remove("expanded");
          if (desktopButton) {
            desktopButton.classList.remove("expanded");
            desktopButton.textContent = "More Details";
          }
          if (rightSection) rightSection.classList.add("collapsed");
          item.classList.add("collapsed");
        }
      }
    });

    // Update expand/collapse button states
    updateButtonStates(expandAllButton, collapseAllButton, shouldExpand);
  };

  // Initialize button states
  updateButtonStates(expandAllButton, collapseAllButton, false);

  // Add event listeners
  expandAllButton.addEventListener('click', () => toggleAllItems(true));
  collapseAllButton.addEventListener('click', () => toggleAllItems(false));
}
function updateButtonStates(expandButton, collapseButton, isExpanded) {
  if (isExpanded) {
    expandButton.classList.remove('collapsed');
    expandButton.classList.add('active');
    collapseButton.classList.add('collapsed');
    collapseButton.classList.remove('active');
  } else {
    collapseButton.classList.remove('collapsed');
    collapseButton.classList.add('active');
    expandButton.classList.add('collapsed');
    expandButton.classList.remove('active');
  }
}

// Main initialization function
function applyTraditionalRankings(block) {
  if (!block) return;

  // Initialize all features
  initSmoothScroll(block);
  const popupCleanup = createPopupManager(block);
  initAccordion(block);
  createExpandCollapseManager(block);

  // Return cleanup function if needed
  return () => {
    if (popupCleanup) popupCleanup();
  };
}

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************************!*\
  !*** ./src/blocks/edumed_rankings/view.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_traditional_rankings_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/traditional-rankings.js */ "./src/blocks/edumed_rankings/js/traditional-rankings.js");
/* harmony import */ var _js_featured_rankings_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/featured-rankings.js */ "./src/blocks/edumed_rankings/js/featured-rankings.js");
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */



document.addEventListener('DOMContentLoaded', function () {
  const blocks = document.querySelectorAll('.cafeto-edumed-rankings-block');

  // No elements found with class '.cafeto-edumed-rankings-block'
  if (blocks.length === 0) {
    return;
  }
  blocks.forEach(function (block) {
    if (!block) return; // Extra safeguard

    if (block.classList.contains('traditional-rankings')) {
      (0,_js_traditional_rankings_js__WEBPACK_IMPORTED_MODULE_0__.applyTraditionalRankings)(block);
    } else if (block.classList.contains('featured-rankings')) {
      (0,_js_featured_rankings_js__WEBPACK_IMPORTED_MODULE_1__.applyFeaturedRankings)(block);
    }
  });
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map