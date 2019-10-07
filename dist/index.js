/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/filters/angular.filter.ts":
/*!***************************************!*\
  !*** ./src/filters/angular.filter.ts ***!
  \***************************************/
/*! exports provided: angularFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "angularFilter", function() { return angularFilter; });
function angularFilter(propName) {
    return propName && propName.startsWith('$');
}


/***/ }),

/***/ "./src/filters/index.ts":
/*!******************************!*\
  !*** ./src/filters/index.ts ***!
  \******************************/
/*! exports provided: angularFilter, nativeQuirksFilter, defaultPropsFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultPropsFilter", function() { return defaultPropsFilter; });
/* harmony import */ var _angular_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./angular.filter */ "./src/filters/angular.filter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "angularFilter", function() { return _angular_filter__WEBPACK_IMPORTED_MODULE_0__["angularFilter"]; });

/* harmony import */ var _native_quirks_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./native-quirks.filter */ "./src/filters/native-quirks.filter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nativeQuirksFilter", function() { return _native_quirks_filter__WEBPACK_IMPORTED_MODULE_1__["nativeQuirksFilter"]; });





function defaultPropsFilter(propName) {
    return Object(_angular_filter__WEBPACK_IMPORTED_MODULE_0__["angularFilter"])(propName) || Object(_native_quirks_filter__WEBPACK_IMPORTED_MODULE_1__["nativeQuirksFilter"])(propName);
}


/***/ }),

/***/ "./src/filters/native-quirks.filter.ts":
/*!*********************************************!*\
  !*** ./src/filters/native-quirks.filter.ts ***!
  \*********************************************/
/*! exports provided: nativeQuirksFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nativeQuirksFilter", function() { return nativeQuirksFilter; });
function nativeQuirksFilter(propName) {
    // - toJSON called by json stringify as api for custom override.
    // - constructor is been used in some js packages (edge cases)
    return propName === 'toJSON' || propName === 'constructor';
}


/***/ }),

/***/ "./src/generics.ts":
/*!*************************!*\
  !*** ./src/generics.ts ***!
  \*************************/
/*! exports provided: isNativeCodeProperty, isNativeFunctionCall, isNativeTypeCall, isFunction, isSymbol, bindFn, bindSymbol */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNativeCodeProperty", function() { return isNativeCodeProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNativeFunctionCall", function() { return isNativeFunctionCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNativeTypeCall", function() { return isNativeTypeCall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSymbol", function() { return isSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindFn", function() { return bindFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bindSymbol", function() { return bindSymbol; });
/**
 * Ignore native code as fn.call or native object flows as Map.forEach
 */
function isNativeCodeProperty(value) {
    if (!value)
        return false;
    return isNativeFunctionCall(value) || isNativeTypeCall(value);
}
function isNativeFunctionCall(value) {
    if (!value)
        return false;
    return isFunction(value) && /\[native code]/.test(value.toString());
}
function isNativeTypeCall(value) {
    if (!value)
        return false;
    return !isFunction(value) && Boolean(value[Symbol.toStringTag]);
}
function isFunction(value) {
    return typeof value === 'function';
}
function isSymbol(value) {
    return typeof value === 'symbol';
}
function bindFn(target, prop) {
    if (!(isFunction(target[prop]) || isSymbol(prop)))
        throw new Error(`None function binding: ${arguments}`);
    return target[prop].bind(target);
}
function bindSymbol(target, prop) {
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * Object.prototype.toString in es5 will call by Symbol.toStringTag, must make sure target has it or use function.
     */
    if (prop === Symbol.toStringTag) {
        return target[Symbol.toStringTag] ? bindFn(target, prop) : bindFn(target, 'toString');
    }
    // Encountered in tests mode by jest.
    if (Symbol.keyFor(prop) === 'nodejs.util.inspect.custom') {
        return; // the symbol doesnt exist on the target
    }
    return bindFn(target, prop);
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: InjectionProxy, ObjectProxy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InjectionProxy", function() { return InjectionProxy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectProxy", function() { return ObjectProxy; });
/* harmony import */ var _proxy_handlers_injector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./proxy_handlers/injector */ "./src/proxy_handlers/injector.ts");
/* harmony import */ var _proxy_handlers_object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./proxy_handlers/object */ "./src/proxy_handlers/object.ts");
/**
 * This lib provides 3 layers of proxy decoration,
 * 1) services invocation by name, by the provided injector.
 * 2) provided service/object interface.
 * 3) Promise object.
 *
 * All layers are Proxy wrapped to avoid fatal exceptions on non existing misuse
 * or application out of sync in case of multi iframe shared services / resources.
 */


function InjectionProxy(options) {
    return new Proxy({}, new _proxy_handlers_injector__WEBPACK_IMPORTED_MODULE_0__["InjectorProxyHandler"](options));
}
function ObjectProxy(target, options) {
    return new Proxy(target, new _proxy_handlers_object__WEBPACK_IMPORTED_MODULE_1__["ObjectProxyHandler"](options));
}


/***/ }),

/***/ "./src/logging-utils.ts":
/*!******************************!*\
  !*** ./src/logging-utils.ts ***!
  \******************************/
/*! exports provided: devLog, defaultLogger, stringify, LoggingUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "devLog", function() { return devLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultLogger", function() { return defaultLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringify", function() { return stringify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoggingUtils", function() { return LoggingUtils; });
/**
 * Enable in dev/monitor mode for debug,
 * consider feature flag support.
 * (dont commit while log enabled, unit test provided)
 */
function devLog(msg, ...args) {
    // console.log('[ScarecrowProxy] ', msg, ...args);
}
function defaultLogger(msg, ...args) {
    console.error('[ScarecrowProxy] ', msg, ...args);
}
function stringify(element) {
    if (typeof element === 'symbol')
        return element.toString();
    if (element instanceof Object)
        return JSON.stringify(element);
    return element; // primitive
}
class LoggingUtils {
    static logTemplate(template) {
        return (...args) => {
            let result = template.slice(0); // clone
            args.forEach((arg, idx) => {
                // in case of symbol or proxy, primitive conversion will fail.
                result = result.split(`{${idx}}`).join(stringify(arg));
            });
            return result;
        };
    }
}
LoggingUtils.GetMissingPropertyMsg = LoggingUtils.logTemplate('Getting non-existing property "{0}"');
LoggingUtils.SetMissingPropertyMsg = LoggingUtils.logTemplate('Setting non-existing property "{0}", value: "{1}"');
LoggingUtils.GetMissingServiceMsg = LoggingUtils.logTemplate('Getting non-existing service "{0}"');
LoggingUtils.CallMissingMethodMsg = LoggingUtils.logTemplate('Executing non-existing method: "{0}" on this: {1} with arguments: {2}');


/***/ }),

/***/ "./src/proxy_handlers/base.ts":
/*!************************************!*\
  !*** ./src/proxy_handlers/base.ts ***!
  \************************************/
/*! exports provided: PROXY_TAG, proxyFn, isProxyFn, BaseProxyHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROXY_TAG", function() { return PROXY_TAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proxyFn", function() { return proxyFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isProxyFn", function() { return isProxyFn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseProxyHandler", function() { return BaseProxyHandler; });
/* harmony import */ var _generics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../generics */ "./src/generics.ts");

const PROXY_TAG = '__proxy__';
function proxyFn(name = 'proxyFn') {
    const fn = function proxyFn() { };
    fn.__proxy_fn__ = name;
    return fn;
}
function isProxyFn(subject) {
    return '__proxy_fn__' in subject;
}
class BaseProxyHandler {
    has(target, key) {
        if (key === PROXY_TAG) {
            return true;
        }
        return key in target;
    }
    proxify(target = proxyFn(), name = null) {
        return name ? target[name] : target;
    }
    isProxified(target) {
        return (PROXY_TAG in target);
    }
    filter(target) {
        // Primitives
        if (!(target && target instanceof Object)) {
            return true;
        }
        // Filter native Types access (Map, Array, Date...)
        if (Object(_generics__WEBPACK_IMPORTED_MODULE_0__["isNativeTypeCall"])(target)) {
            return true;
        }
        // Already proxified
        return this.isProxified(target);
    }
}


/***/ }),

/***/ "./src/proxy_handlers/injector.ts":
/*!****************************************!*\
  !*** ./src/proxy_handlers/injector.ts ***!
  \****************************************/
/*! exports provided: InjectorProxyHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InjectorProxyHandler", function() { return InjectorProxyHandler; });
/* harmony import */ var _logging_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../logging-utils */ "./src/logging-utils.ts");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./src/proxy_handlers/base.ts");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object */ "./src/proxy_handlers/object.ts");



const { GetMissingServiceMsg } = _logging_utils__WEBPACK_IMPORTED_MODULE_0__["LoggingUtils"];
class InjectorProxyHandler extends _base__WEBPACK_IMPORTED_MODULE_1__["BaseProxyHandler"] {
    /***
     * @param injector(name: string | number | symbol): any;
     * @param onGetMissingService?(msg: string, name: string | number | symbol): void;
     * @param propsFilter?(name: string): boolean;
     * @param onGetMissingProperty?(msg: string, ...args: any[]): void;
     * @param onSetMissingProperty?(msg: string, ...args: any[]): void;
     * @param onCallMissingMethod?(msg: string, ...args: any[]): void;
     */
    constructor({ injector, onGetMissingService = _logging_utils__WEBPACK_IMPORTED_MODULE_0__["defaultLogger"] }) {
        super();
        this.injector = injector;
        this.onGetMissingService = onGetMissingService;
        this.serviceProxyHandler = new _object__WEBPACK_IMPORTED_MODULE_2__["ObjectProxyHandler"](arguments[0]);
    }
    get(target, name) {
        Object(_logging_utils__WEBPACK_IMPORTED_MODULE_0__["devLog"])('[InjectorProxyHandler] Get', target, name);
        if (name === Symbol.toStringTag)
            return target.toString();
        if (name in target)
            return target[name];
        let service = null;
        try {
            service = this.injector(name);
        }
        catch (err) { }
        if (!service) {
            this.onGetMissingService(GetMissingServiceMsg(name), name);
        }
        target[name] = this.proxify(service || Object(_base__WEBPACK_IMPORTED_MODULE_1__["proxyFn"])(name));
        return target[name];
    }
    proxify(target = Object(_base__WEBPACK_IMPORTED_MODULE_1__["proxyFn"])()) {
        return new Proxy(target, this.serviceProxyHandler);
    }
}


/***/ }),

/***/ "./src/proxy_handlers/object.ts":
/*!**************************************!*\
  !*** ./src/proxy_handlers/object.ts ***!
  \**************************************/
/*! exports provided: ObjectProxyHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectProxyHandler", function() { return ObjectProxyHandler; });
/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../filters */ "./src/filters/index.ts");
/* harmony import */ var _promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./promise */ "./src/proxy_handlers/promise.ts");
/* harmony import */ var _logging_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../logging-utils */ "./src/logging-utils.ts");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base */ "./src/proxy_handlers/base.ts");
/* harmony import */ var _generics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../generics */ "./src/generics.ts");





const { GetMissingPropertyMsg, SetMissingPropertyMsg, CallMissingMethodMsg, } = _logging_utils__WEBPACK_IMPORTED_MODULE_2__["LoggingUtils"];
class ObjectProxyHandler extends _base__WEBPACK_IMPORTED_MODULE_3__["BaseProxyHandler"] {
    constructor({ propsFilter = _filters__WEBPACK_IMPORTED_MODULE_0__["defaultPropsFilter"], onGetMissingProperty = _logging_utils__WEBPACK_IMPORTED_MODULE_2__["defaultLogger"], onSetMissingProperty = _logging_utils__WEBPACK_IMPORTED_MODULE_2__["defaultLogger"], onCallMissingMethod = _logging_utils__WEBPACK_IMPORTED_MODULE_2__["defaultLogger"], } = {}) {
        super();
        this.propsFilter = propsFilter;
        this.onGetMissingProperty = onGetMissingProperty;
        this.onSetMissingProperty = onSetMissingProperty;
        this.onCallMissingMethod = onCallMissingMethod;
    }
    get(target, name, receiver = null) {
        Object(_logging_utils__WEBPACK_IMPORTED_MODULE_2__["devLog"])('[ServiceProxyHandler] Get', name, typeof name);
        if (name === '__proxy_target__') {
            return target;
        }
        if (Object(_generics__WEBPACK_IMPORTED_MODULE_4__["isSymbol"])(name)) {
            return Object(_generics__WEBPACK_IMPORTED_MODULE_4__["bindSymbol"])(target, name);
        }
        if (this.propsFilter(name.toString()) || (name === 'then' && !Object(_promise__WEBPACK_IMPORTED_MODULE_1__["isPromiseNative"])(target))) {
            return target[name];
        }
        if (name in target) {
            return this.proxify(target, name);
        }
        this.onGetMissingProperty(GetMissingPropertyMsg(name), name.toString());
        return this.proxify(Object(_base__WEBPACK_IMPORTED_MODULE_3__["proxyFn"])(name));
    }
    set(target, name, value) {
        Object(_logging_utils__WEBPACK_IMPORTED_MODULE_2__["devLog"])('[ServiceProxyHandler] Set', target, name, value);
        if (!(name in target || this.propsFilter(name.toString()))) {
            const msg = SetMissingPropertyMsg(name, value);
            this.onSetMissingProperty(msg, name.toString(), value);
        }
        target[name] = value;
        return true;
    }
    apply(target, thisArg, argsList) {
        Object(_logging_utils__WEBPACK_IMPORTED_MODULE_2__["devLog"])('[ServiceProxyHandler] Apply', target, thisArg, argsList);
        if (Object(_base__WEBPACK_IMPORTED_MODULE_3__["isProxyFn"])(target)) {
            const thisArgStr = this.stringify(thisArg);
            // eslint-disable-next-line dot-notation
            const msg = CallMissingMethodMsg(target['__proxy_fn__'], thisArgStr, argsList);
            this.onCallMissingMethod(msg, thisArgStr, argsList);
            return this.proxify();
        }
        return this.proxify(target.apply(thisArg, argsList));
    }
    proxify(target = Object(_base__WEBPACK_IMPORTED_MODULE_3__["proxyFn"])(), name = null) {
        const subject = super.proxify(target, name);
        if (Object(_promise__WEBPACK_IMPORTED_MODULE_1__["isPromise"])(subject)) {
            return new Proxy(subject, new _promise__WEBPACK_IMPORTED_MODULE_1__["PromiseProxyHandler"]());
        }
        if (this.filter(subject)) {
            return subject;
        }
        // Don't proxify native function calls (as fn.call, Promise.then...)
        if (Object(_generics__WEBPACK_IMPORTED_MODULE_4__["isNativeFunctionCall"])(subject)) {
            return Object(_generics__WEBPACK_IMPORTED_MODULE_4__["bindFn"])(target, name);
        }
        return new Proxy(subject, this);
    }
    stringify(target) {
        if (target && target.__proxy_target__) {
            return JSON.stringify(target.__proxy_target__) || target.__proxy_target__.toString();
        }
    }
}


/***/ }),

/***/ "./src/proxy_handlers/promise.ts":
/*!***************************************!*\
  !*** ./src/proxy_handlers/promise.ts ***!
  \***************************************/
/*! exports provided: isPromisePolyfill, isPromiseNative, isPromise, PromiseProxyHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromisePolyfill", function() { return isPromisePolyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromiseNative", function() { return isPromiseNative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromiseProxyHandler", function() { return PromiseProxyHandler; });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/proxy_handlers/base.ts");
/* harmony import */ var _generics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../generics */ "./src/generics.ts");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object */ "./src/proxy_handlers/object.ts");



/**
 * None es6 promise polyfill as bluebird will have a simple 'then' function.
 */
function isPromisePolyfill(obj) {
    return obj && typeof obj.then === 'function';
}
/**
 * Native es6
 */
function isPromiseNative(obj) {
    return obj instanceof Promise;
}
function isPromise(obj) {
    return isPromiseNative(obj) || isPromisePolyfill(obj);
}
class PromiseProxyHandler extends _base__WEBPACK_IMPORTED_MODULE_0__["BaseProxyHandler"] {
    constructor() {
        super();
    }
    get(target, prop) {
        let scope = target;
        const value = target[prop];
        if (prop === 'then') {
            scope = target.then(response => this.proxify(response));
        }
        return typeof value === 'function' ? Object(_generics__WEBPACK_IMPORTED_MODULE_1__["bindFn"])(scope, prop) : value;
    }
    proxify(target = Object(_base__WEBPACK_IMPORTED_MODULE_0__["proxyFn"])(), name = null) {
        const subject = super.proxify(target, name);
        if (isPromise(subject)) {
            return new Proxy(subject, new PromiseProxyHandler());
        }
        if (this.isProxified(subject)) {
            return subject;
        }
        // TODO: new object proxy handler should receive logging call backs
        return new Proxy(subject, new _object__WEBPACK_IMPORTED_MODULE_2__["ObjectProxyHandler"]());
    }
}


/***/ })

/******/ });