!function(t){var n={};function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)r.d(e,i,function(n){return t[n]}.bind(null,i));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=0)}([function(t,n,r){"use strict";function e(t,...n){console.error("[ScarecrowProxy] ",t,...n)}r.r(n);class i{static logTemplate(t){return(...n)=>{let r=t.slice(0);return n.forEach((t,n)=>{r=r.split(`{${n}}`).join(function(t){return"symbol"==typeof t?t.toString():t instanceof Object?JSON.stringify(t):t}(t))}),r}}}function o(t){return!!t&&(u(t)&&/\[native code]/.test(t.toString()))}function s(t){return!!t&&(!u(t)&&Boolean(t[Symbol.toStringTag]))}function u(t){return"function"==typeof t}function c(t){return"symbol"==typeof t}function f(t,n){if(!u(t[n])&&!c(n))throw new Error(`None function binding: ${arguments}`);return t[n].bind(t)}i.GetMissingPropertyMsg=i.logTemplate('Getting non-existing property "{0}"'),i.SetMissingPropertyMsg=i.logTemplate('Setting non-existing property "{0}", value: "{1}"'),i.GetMissingServiceMsg=i.logTemplate('Getting non-existing service "{0}"'),i.CallMissingMethodMsg=i.logTemplate('Executing non-existing method: "{0}" on this: {1} with arguments: {2}');const l="__proxy__";function p(t="proxyFn"){const n=function(){};return n.__proxy_fn__=t,n}class g{has(t,n){return n===l||n in t}proxify(t=p(),n=null){return n?t[n]:t}isProxified(t){return l in t}filter(t){return!(t&&t instanceof Object)||(!!s(t)||this.isProxified(t))}}function y(t){return function(t){return t&&t.startsWith("$")}(t)||function(t){return"toJSON"===t||"constructor"===t}(t)}function a(t){return t instanceof Promise}function x(t){return a(t)||function(t){return t&&"function"==typeof t.then}(t)}class _ extends g{constructor(){super()}get(t,n){let r=t;const e=t[n];return"then"===n&&(r=t.then(t=>this.proxify(t))),"function"==typeof e?f(r,n):e}proxify(t=p(),n=null){const r=super.proxify(t,n);return x(r)?new Proxy(r,new _):this.isProxified(r)?r:new Proxy(r,new M)}}const{GetMissingPropertyMsg:h,SetMissingPropertyMsg:S,CallMissingMethodMsg:d}=i;class M extends g{constructor({propsFilter:t=y,onGetMissingProperty:n=e,onSetMissingProperty:r=e,onCallMissingMethod:i=e}={}){super(),this.propsFilter=t,this.onGetMissingProperty=n,this.onSetMissingProperty=r,this.onCallMissingMethod=i}get(t,n,r=null){return"__proxy_target__"===n?t:c(n)?function(t,n){return n===Symbol.toStringTag?t[Symbol.toStringTag]?f(t,n):f(t,"toString"):"nodejs.util.inspect.custom"!==Symbol.keyFor(n)?f(t,n):void 0}(t,n):this.propsFilter(n.toString())||"then"===n&&!a(t)?t[n]:n in t?this.proxify(t,n):(this.onGetMissingProperty(h(n),n.toString()),this.proxify(p(n)))}set(t,n,r){if(!(n in t||this.propsFilter(n.toString()))){const t=S(n,r);this.onSetMissingProperty(t,n.toString(),r)}return t[n]=r,!0}apply(t,n,r){if("__proxy_fn__"in t){const e=this.stringify(n),i=d(t.__proxy_fn__,e,r);return this.onCallMissingMethod(i,e,r),this.proxify()}return this.proxify(t.apply(n,r))}proxify(t=p(),n=null){const r=super.proxify(t,n);return x(r)?new Proxy(r,new _):this.filter(r)?r:o(r)?f(t,n):new Proxy(r,this)}stringify(t){if(t&&t.__proxy_target__)return JSON.stringify(t.__proxy_target__)||t.__proxy_target__.toString()}}const{GetMissingServiceMsg:P}=i;class b extends g{constructor({injector:t,onGetMissingService:n=e}){super(),this.injector=t,this.onGetMissingService=n,this.serviceProxyHandler=new M(arguments[0])}get(t,n){if(n===Symbol.toStringTag)return t.toString();if(n in t)return t[n];let r=null;try{r=this.injector(n)}catch(t){}return r||this.onGetMissingService(P(n),n),t[n]=this.proxify(r||p(n)),t[n]}proxify(t=p()){return new Proxy(t,this.serviceProxyHandler)}}function m(t){return new Proxy({},new b(t))}function v(t,n){return new Proxy(t,new M(n))}r.d(n,"InjectionProxy",(function(){return m})),r.d(n,"ObjectProxy",(function(){return v}))}]);