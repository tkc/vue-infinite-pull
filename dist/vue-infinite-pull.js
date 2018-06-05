(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueInfinitePull"] = factory();
	else
		root["VueInfinitePull"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(8)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Spinner__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable no-console */

var LOOP_CHECK_TIMEOUT = 1000; // the timeout for check infinite loop
var LOOP_CHECK_MAX_CALLS = 10; // the maximum number of continuous calls
var WARNINGS = {
  STATE_CHANGER: ['[Vue-infinite-loading warn]: emit `loaded` and `complete` event through component instance of `$refs` may cause error, so it will be deprecated soon, please use the `$state` argument instead (`$state` just the special `$event` variable):', '\ntemplate:', '<infinite-loading @infinite="infiniteHandler"></infinite-loading>', '\n  script:\n  ...\n  infiniteHandler($state) {\n    ajax(\'https://www.example.com/api/news\')\n      .then((res) => {\n        if (res.data.length) {\n          $state.loaded();\n        } else {\n          $state.complete();\n        }\n      });\n  }\n  ...', '', 'more details: https://github.com/PeachScript/vue-infinite-loading/issues/57#issuecomment-324370549'].join('\n'),
  INFINITE_EVENT: '[Vue-infinite-loading warn]: `:on-infinite` property will be deprecated soon, please use `@infinite` event instead.'
};
var ERRORS = {
  INFINITE_LOOP: ['[Vue-infinite-loading error]: executed the callback function more than ' + LOOP_CHECK_MAX_CALLS + ' times for a short time, it looks like searched a wrong scroll wrapper that doest not has fixed height or maximum height, please check it. If you want to force to set a element as scroll wrapper ranther than automatic searching, you can do this:', '\n  <!-- add a special attribute for the real scroll wrapper -->\n\t\t\t\t<div infinite-wrapper>\n\t\t\t\t...\n\t\t\t\t<!-- set force-use-infinite-wrapper to true -->\n\t\t\t\t<infinite-loading force-use-infinite-wrapper="true"></infinite-loading>\n\t\t\t\t</div>\n\t\t\t\t', 'more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169'].join('\n')
};

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'InfiniteLoading',
  data: function data() {
    return {
      scrollParent: null,
      scrollHandler: null,
      isLoading: false,
      isComplete: false,
      isFirstLoad: true, // save the current loading whether it is the first loading
      debounceTimer: null,
      debounceDuration: 50,
      infiniteLoopChecked: false, // save the status of infinite loop check
      infiniteLoopTimer: null,
      continuousCallTimes: 0
    };
  },

  components: {
    Spinner: __WEBPACK_IMPORTED_MODULE_0__Spinner__["a" /* default */]
  },
  computed: {
    isNoResults: {
      cache: false, // disable cache to fix the problem of get slot text delay
      get: function get() {
        var noResultsSlot = this.$slots['no-results'];
        var isBlankNoResultsSlot = noResultsSlot && noResultsSlot[0].elm && noResultsSlot[0].elm.textContent === '';
        return !this.isLoading && this.isComplete && this.isFirstLoad && !isBlankNoResultsSlot;
      }
    },
    isNoMore: {
      cache: false, // disable cache to fix the problem of get slot text delay
      get: function get() {
        var noMoreSlot = this.$slots['no-more'];
        var isBlankNoMoreSlot = noMoreSlot && noMoreSlot[0].elm && noMoreSlot[0].elm.textContent === '';
        return !this.isLoading && this.isComplete && !this.isFirstLoad && !isBlankNoMoreSlot;
      }
    }
  },
  props: {
    distance: {
      type: Number,
      default: 100
    },
    onInfinite: Function,
    spinner: String,
    direction: {
      type: String,
      default: 'bottom'
    },
    forceUseInfiniteWrapper: null,
    target_class: {
      type: String
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.scrollParent = this.getScrollParent();

    this.scrollHandler = function scrollHandlerOriginal(ev) {
      if (!this.isLoading) {
        clearTimeout(this.debounceTimer);
        if (ev && ev.constructor === Event) {
          this.debounceTimer = setTimeout(this.attemptLoad, this.debounceDuration);
        } else {
          this.attemptLoad();
        }
      }
    }.bind(this);

    setTimeout(this.scrollHandler, 1);
    this.scrollParent.addEventListener('scroll', this.scrollHandler);

    this.$on('$InfiniteLoading:loaded', function (ev) {
      _this.isFirstLoad = false;
      if (_this.isLoading) {
        _this.$nextTick(_this.attemptLoad.bind(null, true));
      }
      if (!ev || ev.target !== _this) {
        console.warn(WARNINGS.STATE_CHANGER);
      }
    });

    this.$on('$InfiniteLoading:complete', function (ev) {
      _this.isLoading = false;
      _this.isComplete = true;
      // force re-complation computed properties to fix the problem of get slot text delay
      _this.$nextTick(function () {
        _this.$forceUpdate();
      });
      _this.scrollParent.removeEventListener('scroll', _this.scrollHandler);
      if (!ev || ev.target !== _this) {
        console.warn(WARNINGS.STATE_CHANGER);
      }
    });

    this.$on('$InfiniteLoading:reset', function () {
      _this.isLoading = false;
      _this.isComplete = false;
      _this.isFirstLoad = true;
      _this.scrollParent.addEventListener('scroll', _this.scrollHandler);
      setTimeout(_this.scrollHandler, 1);
    });

    if (this.onInfinite) {
      console.warn(WARNINGS.INFINITE_EVENT);
    }

    /**
     * change state for this component, pass to the callback
     */
    this.stateChanger = {
      loaded: function loaded() {
        _this.$emit('$InfiniteLoading:loaded', { target: _this });
      },
      complete: function complete() {
        _this.$emit('$InfiniteLoading:complete', { target: _this });
      },
      reset: function reset() {
        _this.$emit('$InfiniteLoading:reset', { target: _this });
      }
    };

    /**
     * watch for the `force-use-infinite-wrapper` property
     */
    this.$watch('forceUseInfiniteWrapper', function () {
      _this.scrollParent = _this.getScrollParent();
    });
  },

  /**
   * To adapt to keep-alive feature, but only work on Vue 2.2.0 and above, see: https://vuejs.org/v2/api/#keep-alive
   */
  deactivated: function deactivated() {
    this.isLoading = false;
    this.scrollParent.removeEventListener('scroll', this.scrollHandler);
  },
  activated: function activated() {
    this.scrollParent.addEventListener('scroll', this.scrollHandler);
  },

  methods: {
    /**
    * attempt trigger load
    * @param {Boolean} isContinuousCall  the flag of continuous call, it will be true
    *                                    if this method be called in the `loaded`
    *                                    event handler
    */
    attemptLoad: function attemptLoad(isContinuousCall) {
      var _this2 = this;

      var currentDistance = this.getCurrentDistance();

      console.log('currentDistance=>' + currentDistance);
      console.log('distance=>' + this.distance);

      if (!this.isComplete && currentDistance <= this.distance && this.$el.offsetWidth + this.$el.offsetHeight > 0) {

        this.isLoading = true;

        if (typeof this.onInfinite === 'function') {
          this.onInfinite.call(null, this.stateChanger);
        } else {
          this.$emit('infinite', this.stateChanger);
        }

        if (isContinuousCall && !this.forceUseInfiniteWrapper && !this.infiniteLoopChecked) {
          // check this component whether be in an infinite loop if it is not checked
          // more details: https://github.com/PeachScript/vue-infinite-loading/issues/55#issuecomment-316934169
          this.continuousCallTimes += 1; // save the times of calls

          clearTimeout(this.infiniteLoopTimer);
          this.infiniteLoopTimer = setTimeout(function () {
            _this2.infiniteLoopChecked = true;
          }, LOOP_CHECK_TIMEOUT);

          // throw warning if the times of continuous calls large than the maximum times
          if (this.continuousCallTimes > LOOP_CHECK_MAX_CALLS) {
            console.error(ERRORS.INFINITE_LOOP);
            this.infiniteLoopChecked = true;
          }
        }
      } else {
        this.isLoading = false;
      }
    },

    /**
    * get current distance from the specified direction
    * @return {Number}     distance
    */
    getCurrentDistance: function getCurrentDistance() {
      var distance = void 0;
      var infiniteElmOffsetTopFromBottom = document.querySelector('.' + this.target_class).getBoundingClientRect().bottom;
      var scrollElmOffsetTopFromBottom = window.innerHeight;
      distance = infiniteElmOffsetTopFromBottom - scrollElmOffsetTopFromBottom;
      return distance;
    },

    /**
    * get the first scroll parent of an element
    * @param  {DOM} elm    cache element for recursive search
    * @return {DOM}        the first scroll parent
    */
    getScrollParent: function getScrollParent() {
      var elm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;

      var result = void 0;

      if (elm.tagName === 'BODY') {
        result = window;
      } else if (!this.forceUseInfiniteWrapper && ['scroll', 'auto'].indexOf(getComputedStyle(elm).overflowY) > -1) {
        result = elm;
      } else if (elm.hasAttribute('infinite-wrapper') || elm.hasAttribute('data-infinite-wrapper')) {
        result = elm;
      }

      return result || this.getScrollParent(elm.parentNode);
    }
  },
  destroyed: function destroyed() {
    if (!this.isComplete) {
      this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    }
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//

var SPINNERS = {
  BUBBLES: {
    render: function render(createElement) {
      return createElement('span', {
        attrs: {
          class: 'loading-bubbles'
        }
      }, Array.apply(Array, Array(8)).map(function () {
        return createElement('span', {
          attrs: {
            class: 'bubble-item'
          }
        });
      }));
    }
  },
  CIRCLES: {
    render: function render(createElement) {
      return createElement('span', {
        attrs: {
          class: 'loading-circles'
        }
      }, Array.apply(Array, Array(8)).map(function () {
        return createElement('span', {
          attrs: {
            class: 'circle-item'
          }
        });
      }));
    }
  },
  DEFAULT: {
    render: function render(createElement) {
      return createElement('i', {
        attrs: {
          class: 'loading-default'
        }
      });
    }
  },
  SPIRAL: {
    render: function render(createElement) {
      return createElement('i', {
        attrs: {
          class: 'loading-spiral'
        }
      });
    }
  },
  WAVEDOTS: {
    render: function render(createElement) {
      return createElement('span', {
        attrs: {
          class: 'loading-wave-dots'
        }
      }, Array.apply(Array, Array(5)).map(function () {
        return createElement('span', {
          attrs: {
            class: 'wave-item'
          }
        });
      }));
    }
  }
};
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'spinner',
  computed: {
    spinnerView: function spinnerView() {
      return SPINNERS[(this.spinner || '').toUpperCase()] || SPINNERS.DEFAULT;
    }
  },
  props: {
    spinner: String
  }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_InfinitePull_vue__ = __webpack_require__(3);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_484255e1_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_InfinitePull_vue__ = __webpack_require__(13);
function injectStyle (ssrContext) {
  __webpack_require__(6)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-484255e1"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_InfinitePull_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_484255e1_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_InfinitePull_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("5e4b412c", content, true, {});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".infinite-loading-container[data-v-484255e1]{clear:both;text-align:center}.infinite-loading-container[data-v-484255e1] [class^=loading-]{display:inline-block;margin:15px 0;width:28px;height:28px;font-size:28px;line-height:28px;border-radius:50%}.infinite-status-prompt[data-v-484255e1]{color:#666;font-size:14px;text-align:center;padding:10px 0}", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Spinner_vue__ = __webpack_require__(4);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e108854_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Spinner_vue__ = __webpack_require__(12);
function injectStyle (ssrContext) {
  __webpack_require__(10)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7e108854"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Spinner_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e108854_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Spinner_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("ec081464", content, true, {});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, ".loading-wave-dots[data-v-7e108854]{position:relative}.loading-wave-dots[data-v-7e108854] .wave-item{position:absolute;top:50%;left:50%;display:inline-block;margin-top:-4px;width:8px;height:8px;border-radius:50%;-webkit-animation:loading-wave-dots-data-v-7e108854 linear 2.8s infinite;animation:loading-wave-dots-data-v-7e108854 linear 2.8s infinite}.loading-wave-dots[data-v-7e108854] .wave-item:first-child{margin-left:-36px}.loading-wave-dots[data-v-7e108854] .wave-item:nth-child(2){margin-left:-20px;-webkit-animation-delay:.14s;animation-delay:.14s}.loading-wave-dots[data-v-7e108854] .wave-item:nth-child(3){margin-left:-4px;-webkit-animation-delay:.28s;animation-delay:.28s}.loading-wave-dots[data-v-7e108854] .wave-item:nth-child(4){margin-left:12px;-webkit-animation-delay:.42s;animation-delay:.42s}.loading-wave-dots[data-v-7e108854] .wave-item:last-child{margin-left:28px;-webkit-animation-delay:.56s;animation-delay:.56s}@-webkit-keyframes loading-wave-dots-data-v-7e108854{0%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}10%{-webkit-transform:translateY(-6px);transform:translateY(-6px);background:#999}20%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}to{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}}@keyframes loading-wave-dots-data-v-7e108854{0%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}10%{-webkit-transform:translateY(-6px);transform:translateY(-6px);background:#999}20%{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}to{-webkit-transform:translateY(0);transform:translateY(0);background:#bbb}}.loading-circles[data-v-7e108854] .circle-item{width:5px;height:5px;-webkit-animation:loading-circles-data-v-7e108854 linear .75s infinite;animation:loading-circles-data-v-7e108854 linear .75s infinite}.loading-circles[data-v-7e108854] .circle-item:first-child{margin-top:-14.5px;margin-left:-2.5px}.loading-circles[data-v-7e108854] .circle-item:nth-child(2){margin-top:-11.26px;margin-left:6.26px}.loading-circles[data-v-7e108854] .circle-item:nth-child(3){margin-top:-2.5px;margin-left:9.5px}.loading-circles[data-v-7e108854] .circle-item:nth-child(4){margin-top:6.26px;margin-left:6.26px}.loading-circles[data-v-7e108854] .circle-item:nth-child(5){margin-top:9.5px;margin-left:-2.5px}.loading-circles[data-v-7e108854] .circle-item:nth-child(6){margin-top:6.26px;margin-left:-11.26px}.loading-circles[data-v-7e108854] .circle-item:nth-child(7){margin-top:-2.5px;margin-left:-14.5px}.loading-circles[data-v-7e108854] .circle-item:last-child{margin-top:-11.26px;margin-left:-11.26px}@-webkit-keyframes loading-circles-data-v-7e108854{0%{background:#dfdfdf}90%{background:#505050}to{background:#dfdfdf}}@keyframes loading-circles-data-v-7e108854{0%{background:#dfdfdf}90%{background:#505050}to{background:#dfdfdf}}.loading-bubbles[data-v-7e108854] .bubble-item{background:#666;-webkit-animation:loading-bubbles-data-v-7e108854 linear .75s infinite;animation:loading-bubbles-data-v-7e108854 linear .75s infinite}.loading-bubbles[data-v-7e108854] .bubble-item:first-child{margin-top:-12.5px;margin-left:-.5px}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(2){margin-top:-9.26px;margin-left:8.26px}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(3){margin-top:-.5px;margin-left:11.5px}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(4){margin-top:8.26px;margin-left:8.26px}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(5){margin-top:11.5px;margin-left:-.5px}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(6){margin-top:8.26px;margin-left:-9.26px}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(7){margin-top:-.5px;margin-left:-12.5px}.loading-bubbles[data-v-7e108854] .bubble-item:last-child{margin-top:-9.26px;margin-left:-9.26px}@-webkit-keyframes loading-bubbles-data-v-7e108854{0%{width:1px;height:1px;-webkit-box-shadow:0 0 0 3px #666;box-shadow:0 0 0 3px #666}90%{width:1px;height:1px;-webkit-box-shadow:0 0 0 0 #666;box-shadow:0 0 0 0 #666}to{width:1px;height:1px;-webkit-box-shadow:0 0 0 3px #666;box-shadow:0 0 0 3px #666}}@keyframes loading-bubbles-data-v-7e108854{0%{width:1px;height:1px;-webkit-box-shadow:0 0 0 3px #666;box-shadow:0 0 0 3px #666}90%{width:1px;height:1px;-webkit-box-shadow:0 0 0 0 #666;box-shadow:0 0 0 0 #666}to{width:1px;height:1px;-webkit-box-shadow:0 0 0 3px #666;box-shadow:0 0 0 3px #666}}.loading-default[data-v-7e108854]{position:relative;border:1px solid #999;-webkit-animation:loading-rotating-data-v-7e108854 ease 1.5s infinite;animation:loading-rotating-data-v-7e108854 ease 1.5s infinite}.loading-default[data-v-7e108854]:before{content:\"\";position:absolute;display:block;top:0;left:50%;margin-top:-3px;margin-left:-3px;width:6px;height:6px;background-color:#999;border-radius:50%}.loading-spiral[data-v-7e108854]{border:2px solid #777;border-right-color:transparent;-webkit-animation:loading-rotating-data-v-7e108854 linear .85s infinite;animation:loading-rotating-data-v-7e108854 linear .85s infinite}@-webkit-keyframes loading-rotating-data-v-7e108854{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loading-rotating-data-v-7e108854{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.loading-bubbles[data-v-7e108854],.loading-circles[data-v-7e108854]{position:relative}.loading-bubbles[data-v-7e108854] .bubble-item,.loading-circles[data-v-7e108854] .circle-item{position:absolute;top:50%;left:50%;display:inline-block;border-radius:50%}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(2),.loading-circles[data-v-7e108854] .circle-item:nth-child(2){-webkit-animation-delay:93ms;animation-delay:93ms}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(3),.loading-circles[data-v-7e108854] .circle-item:nth-child(3){-webkit-animation-delay:.186s;animation-delay:.186s}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(4),.loading-circles[data-v-7e108854] .circle-item:nth-child(4){-webkit-animation-delay:.279s;animation-delay:.279s}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(5),.loading-circles[data-v-7e108854] .circle-item:nth-child(5){-webkit-animation-delay:.372s;animation-delay:.372s}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(6),.loading-circles[data-v-7e108854] .circle-item:nth-child(6){-webkit-animation-delay:.465s;animation-delay:.465s}.loading-bubbles[data-v-7e108854] .bubble-item:nth-child(7),.loading-circles[data-v-7e108854] .circle-item:nth-child(7){-webkit-animation-delay:.558s;animation-delay:.558s}.loading-bubbles[data-v-7e108854] .bubble-item:last-child,.loading-circles[data-v-7e108854] .circle-item:last-child{-webkit-animation-delay:.651s;animation-delay:.651s}", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.spinnerView,{tag:"component"})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"infinite-loading-container"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isLoading),expression:"isLoading"}]},[_vm._t("spinner",[_c('spinner',{attrs:{"spinner":_vm.spinner}})])],2),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isNoResults),expression:"isNoResults"}],staticClass:"infinite-status-prompt"},[_vm._t("no-results",[_vm._v("No results :(")])],2),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isNoMore),expression:"isNoMore"}],staticClass:"infinite-status-prompt"},[_vm._t("no-more",[_vm._v("No more data :)")])],2)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});