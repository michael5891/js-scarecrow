!function(t){var n={};function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)r.d(e,i,function(n){return t[n]}.bind(null,i));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=0)}([function(t,n,r){"use strict";function e(t,...n){console.error("[ScarecrowProxy] ",t,...n)}r.r(n),r.d(n,"InjectionProxy",(function(){return b})),r.d(n,"ObjectProxy",(function(){return m}));class i{static logTemplate(t){return(...n)=>{let r=t.slice(0);return n.forEach((t,n)=>{var e;r=r.split(`{${n}}`).join("symbol"==typeof(e=t)?e.toString():e instanceof Object?JSON.stringify(e):e)}),r}}}function o(t){return!!t&&(u(t)&&/\[native code]/.test(t.toString()))}function s(t){return!!t&&(!u(t)&&Boolean(t[Symbol.toStringTag]))}function u(t){return"function"==typeof t}function c(t){return"symbol"==typeof t}function f(t,n){if(!u(t[n])&&!c(n))throw new Error(`None function binding: ${arguments}`);return t[n].bind(t)}i.GetMissingPropertyMsg=i.logTemplate('Getting non-existing property "{0}"'),i.SetMissingPropertyMsg=i.logTemplate('Setting non-existing property "{0}", value: "{1}"'),i.GetMissingServiceMsg=i.logTemplate('Getting non-existing service "{0}"'),i.CallMissingMethodMsg=i.logTemplate('Executing non-existing method: "{0}" on this: {1} with arguments: {2}');function l(t="proxyFn"){const n=function(){};return n.__proxy_fn__=t,n}class p{has(t,n){return"__proxy__"===n||n in t}proxify(t=l(),n=null){return n?t[n]:t}isProxified(t){return"__proxy__"in t}filter(t){return!(t&&t instanceof Object)||(!!s(t)||this.isProxified(t))}}function y(t){return function(t){return t&&t.startsWith("$")}(t)||function(t){return"toJSON"===t||"constructor"===t}(t)}function g(t){return t instanceof Promise}function a(t){return g(t)||function(t){return t&&"function"==typeof t.then}(t)}class x extends p{constructor(){super()}get(t,n){let r=t;const e=t[n];return"then"===n&&(r=t.then(t=>this.proxify(t))),"function"==typeof e?f(r,n):e}proxify(t=l(),n=null){const r=super.proxify(t,n);return a(r)?new Proxy(r,new x):this.filter(r)?r:new Proxy(r,new M)}}const{GetMissingPropertyMsg:_,SetMissingPropertyMsg:h,CallMissingMethodMsg:S}=i;class M extends p{constructor({propsFilter:t=y,onGetMissingProperty:n=e,onSetMissingProperty:r=e,onCallMissingMethod:i=e}={}){super(),this.propsFilter=t,this.onGetMissingProperty=n,this.onSetMissingProperty=r,this.onCallMissingMethod=i}get(t,n,r=null){return"__proxy_target__"===n?t:c(n)?function(t,n){return n===Symbol.toStringTag?t[Symbol.toStringTag]?f(t,n):f(t,"toString"):"nodejs.util.inspect.custom"!==Symbol.keyFor(n)?f(t,n):void 0}(t,n):this.propsFilter(n.toString())||"then"===n&&!g(t)?t[n]:n in t?this.proxify(t,n):(this.onGetMissingProperty(_(n),n.toString()),this.proxify(l(n)))}set(t,n,r){if(!(n in t||this.propsFilter(n.toString()))){const t=h(n,r);this.onSetMissingProperty(t,n.toString(),r)}return t[n]=r,!0}apply(t,n,r){if("__proxy_fn__"in t){const e=this.stringify(n),i=S(t.__proxy_fn__,e,r);return this.onCallMissingMethod(i,e,r),this.proxify()}return this.proxify(t.apply(n,r))}proxify(t=l(),n=null){const r=super.proxify(t,n);return a(r)?new Proxy(r,new x):this.filter(r)?r:o(r)?f(t,n):new Proxy(r,this)}stringify(t){if(t&&t.__proxy_target__)return JSON.stringify(t.__proxy_target__)||t.__proxy_target__.toString()}}const{GetMissingServiceMsg:d}=i;class P extends p{constructor({injector:t,onGetMissingService:n=e}){super(),this.injector=t,this.onGetMissingService=n,this.serviceProxyHandler=new M(arguments[0])}get(t,n){if(n===Symbol.toStringTag)return t.toString();if(n in t)return t[n];let r=null;try{r=this.injector(n)}catch(t){}return r||this.onGetMissingService(d(n),n),t[n]=this.proxify(r||l(n)),t[n]}proxify(t=l()){return new Proxy(t,this.serviceProxyHandler)}}function b(t){return new Proxy({},new P(t))}function m(t,n){return new Proxy(t,new M(n))}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvZ2dpbmctdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dlbmVyaWNzLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm94eV9oYW5kbGVycy9iYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9maWx0ZXJzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9maWx0ZXJzL2FuZ3VsYXIuZmlsdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9maWx0ZXJzL25hdGl2ZS1xdWlya3MuZmlsdGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm94eV9oYW5kbGVycy9wcm9taXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm94eV9oYW5kbGVycy9vYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3h5X2hhbmRsZXJzL2luamVjdG9yLnRzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsImRlZmF1bHRMb2dnZXIiLCJtc2ciLCJhcmdzIiwiY29uc29sZSIsImVycm9yIiwiTG9nZ2luZ1V0aWxzIiwidGVtcGxhdGUiLCJyZXN1bHQiLCJzbGljZSIsImZvckVhY2giLCJhcmciLCJpZHgiLCJlbGVtZW50Iiwic3BsaXQiLCJqb2luIiwidG9TdHJpbmciLCJKU09OIiwic3RyaW5naWZ5IiwiaXNOYXRpdmVGdW5jdGlvbkNhbGwiLCJpc0Z1bmN0aW9uIiwidGVzdCIsImlzTmF0aXZlVHlwZUNhbGwiLCJCb29sZWFuIiwiaXNTeW1ib2wiLCJiaW5kRm4iLCJ0YXJnZXQiLCJwcm9wIiwiRXJyb3IiLCJhcmd1bWVudHMiLCJHZXRNaXNzaW5nUHJvcGVydHlNc2ciLCJsb2dUZW1wbGF0ZSIsIlNldE1pc3NpbmdQcm9wZXJ0eU1zZyIsIkdldE1pc3NpbmdTZXJ2aWNlTXNnIiwiQ2FsbE1pc3NpbmdNZXRob2RNc2ciLCJwcm94eUZuIiwiZm4iLCJ0aGlzIiwiaXNQcm94aWZpZWQiLCJkZWZhdWx0UHJvcHNGaWx0ZXIiLCJwcm9wTmFtZSIsInN0YXJ0c1dpdGgiLCJhbmd1bGFyRmlsdGVyIiwibmF0aXZlUXVpcmtzRmlsdGVyIiwiaXNQcm9taXNlTmF0aXZlIiwib2JqIiwiUHJvbWlzZSIsImlzUHJvbWlzZSIsInRoZW4iLCJpc1Byb21pc2VQb2x5ZmlsbCIsInN1cGVyIiwic2NvcGUiLCJyZXNwb25zZSIsInByb3hpZnkiLCJzdWJqZWN0IiwiUHJveHkiLCJmaWx0ZXIiLCJwcm9wc0ZpbHRlciIsIm9uR2V0TWlzc2luZ1Byb3BlcnR5Iiwib25TZXRNaXNzaW5nUHJvcGVydHkiLCJvbkNhbGxNaXNzaW5nTWV0aG9kIiwicmVjZWl2ZXIiLCJrZXlGb3IiLCJiaW5kU3ltYm9sIiwidGhpc0FyZyIsImFyZ3NMaXN0IiwidGhpc0FyZ1N0ciIsImFwcGx5IiwiX19wcm94eV90YXJnZXRfXyIsImluamVjdG9yIiwib25HZXRNaXNzaW5nU2VydmljZSIsInNlcnZpY2VQcm94eUhhbmRsZXIiLCJzZXJ2aWNlIiwiZXJyIiwiSW5qZWN0aW9uUHJveHkiLCJvcHRpb25zIiwiT2JqZWN0UHJveHkiXSwibWFwcGluZ3MiOiJhQUNFLElBQUlBLEVBQW1CLEdBR3ZCLFNBQVNDLEVBQW9CQyxHQUc1QixHQUFHRixFQUFp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VixXQUUvQyxHQUFJeEMsS0FBUWtELEVBQVEsT0FBYUEsRUFBUWxELEdBRXpDLElBQUlnRyxFQUFVLEtBRWQsSUFDSUEsRUFBVW5DLEtBQUtnQyxTQUFTN0YsR0FDMUIsTUFBT2lHLElBUVQsT0FOS0QsR0FDRG5DLEtBQUtpQyxvQkFBb0JyQyxFQUFxQnpELEdBQU9BLEdBR25Ea0QsRUFBUWxELEdBQVE2RCxLQUFLZ0IsUUFBUW1CLEdBQVdyQyxFQUFRM0QsSUFFekNrRCxFQUFRbEQsR0FHekIsUUFBUWtELEVBQWNTLEtBQ2xCLE9BQU8sSUFBSW9CLE1BQU03QixFQUFRVyxLQUFLa0Msc0JDdkMvQixTQUFTRyxFQUFlQyxHQUM3QixPQUFPLElBQUlwQixNQUFNLEdBQUksSUFBSSxFQUFxQm9CLElBR3pDLFNBQVNDLEVBQVlsRCxFQUFhaUQsR0FDdkMsT0FBTyxJQUFJcEIsTUFBTTdCLEVBQVEsSUFBSSxFQUFtQmlEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qKlxyXG4gKiBFbmFibGUgaW4gZGV2L21vbml0b3IgbW9kZSBmb3IgZGVidWcsXHJcbiAqIGNvbnNpZGVyIGZlYXR1cmUgZmxhZyBzdXBwb3J0LlxyXG4gKiAoZG9udCBjb21taXQgd2hpbGUgbG9nIGVuYWJsZWQsIHVuaXQgdGVzdCBwcm92aWRlZClcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZXZMb2cobXNnOiBhbnksIC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgLy8gY29uc29sZS5sb2coJ1tTY2FyZWNyb3dQcm94eV0gJywgbXNnLCAuLi5hcmdzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRMb2dnZXIobXNnOiBhbnksIC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgY29uc29sZS5lcnJvcignW1NjYXJlY3Jvd1Byb3h5XSAnLCBtc2csIC4uLmFyZ3MpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5naWZ5KGVsZW1lbnQpIHtcclxuICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzeW1ib2wnKSByZXR1cm4gZWxlbWVudC50b1N0cmluZygpO1xyXG5cclxuICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIE9iamVjdCkgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVsZW1lbnQpO1xyXG5cclxuICByZXR1cm4gZWxlbWVudDsgLy8gcHJpbWl0aXZlXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dnaW5nVXRpbHMge1xyXG4gIHN0YXRpYyBHZXRNaXNzaW5nUHJvcGVydHlNc2cgPSBMb2dnaW5nVXRpbHMubG9nVGVtcGxhdGUoJ0dldHRpbmcgbm9uLWV4aXN0aW5nIHByb3BlcnR5IFwiezB9XCInKTtcclxuICBzdGF0aWMgU2V0TWlzc2luZ1Byb3BlcnR5TXNnID0gTG9nZ2luZ1V0aWxzLmxvZ1RlbXBsYXRlKCdTZXR0aW5nIG5vbi1leGlzdGluZyBwcm9wZXJ0eSBcInswfVwiLCB2YWx1ZTogXCJ7MX1cIicpO1xyXG4gIHN0YXRpYyBHZXRNaXNzaW5nU2VydmljZU1zZyA9IExvZ2dpbmdVdGlscy5sb2dUZW1wbGF0ZSgnR2V0dGluZyBub24tZXhpc3Rpbmcgc2VydmljZSBcInswfVwiJyk7XHJcbiAgc3RhdGljIENhbGxNaXNzaW5nTWV0aG9kTXNnID0gTG9nZ2luZ1V0aWxzLmxvZ1RlbXBsYXRlKCdFeGVjdXRpbmcgbm9uLWV4aXN0aW5nIG1ldGhvZDogXCJ7MH1cIiBvbiB0aGlzOiB7MX0gd2l0aCBhcmd1bWVudHM6IHsyfScpO1xyXG5cclxuICBzdGF0aWMgbG9nVGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuICguLi5hcmdzOiBhbnlbXSkgPT4ge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gdGVtcGxhdGUuc2xpY2UoMCk7IC8vIGNsb25lXHJcblxyXG4gICAgICBhcmdzLmZvckVhY2goKGFyZywgaWR4KSA9PiB7XHJcbiAgICAgICAgLy8gaW4gY2FzZSBvZiBzeW1ib2wgb3IgcHJveHksIHByaW1pdGl2ZSBjb252ZXJzaW9uIHdpbGwgZmFpbC5cclxuICAgICAgICByZXN1bHQgPSByZXN1bHQuc3BsaXQoYHske2lkeH19YCkuam9pbihzdHJpbmdpZnkoYXJnKSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBJZ25vcmUgbmF0aXZlIGNvZGUgYXMgZm4uY2FsbCBvciBuYXRpdmUgb2JqZWN0IGZsb3dzIGFzIE1hcC5mb3JFYWNoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNOYXRpdmVDb2RlUHJvcGVydHkodmFsdWU6IHsgdG9TdHJpbmcgfSkge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgcmV0dXJuIGlzTmF0aXZlRnVuY3Rpb25DYWxsKHZhbHVlKSB8fCBpc05hdGl2ZVR5cGVDYWxsKHZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzTmF0aXZlRnVuY3Rpb25DYWxsKHZhbHVlOiB7IHRvU3RyaW5nIH0pIHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIHJldHVybiBpc0Z1bmN0aW9uKHZhbHVlKSAmJiAvXFxbbmF0aXZlIGNvZGVdLy50ZXN0KHZhbHVlLnRvU3RyaW5nKCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOYXRpdmVUeXBlQ2FsbCh2YWx1ZTogeyB0b1N0cmluZyB9KSB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICByZXR1cm4gIWlzRnVuY3Rpb24odmFsdWUpICYmIEJvb2xlYW4odmFsdWVbU3ltYm9sLnRvU3RyaW5nVGFnXSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XHJcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N5bWJvbCc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBiaW5kRm4odGFyZ2V0LCBwcm9wKSB7XHJcbiAgaWYgKCEoaXNGdW5jdGlvbih0YXJnZXRbcHJvcF0pIHx8IGlzU3ltYm9sKHByb3ApKSkgdGhyb3cgbmV3IEVycm9yKGBOb25lIGZ1bmN0aW9uIGJpbmRpbmc6ICR7YXJndW1lbnRzfWApO1xyXG5cclxuICByZXR1cm4gdGFyZ2V0W3Byb3BdLmJpbmQodGFyZ2V0KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRTeW1ib2wodGFyZ2V0LCBwcm9wKSB7XHJcbiAgLyoqXHJcbiAgICogVXNlZCB0byByZXNvbHZlIHRoZVxyXG4gICAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxyXG4gICAqIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgaW4gZXM1IHdpbGwgY2FsbCBieSBTeW1ib2wudG9TdHJpbmdUYWcsIG11c3QgbWFrZSBzdXJlIHRhcmdldCBoYXMgaXQgb3IgdXNlIGZ1bmN0aW9uLlxyXG4gICAqL1xyXG4gIGlmIChwcm9wID09PSBTeW1ib2wudG9TdHJpbmdUYWcpIHtcclxuICAgIHJldHVybiB0YXJnZXRbU3ltYm9sLnRvU3RyaW5nVGFnXSA/IGJpbmRGbih0YXJnZXQsIHByb3ApIDogYmluZEZuKHRhcmdldCwgJ3RvU3RyaW5nJyk7XHJcbiAgfVxyXG5cclxuICAvLyBFbmNvdW50ZXJlZCBpbiB0ZXN0cyBtb2RlIGJ5IGplc3QuXHJcbiAgaWYgKFN5bWJvbC5rZXlGb3IocHJvcCkgPT09ICdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpIHtcclxuICAgIHJldHVybjsgLy8gdGhlIHN5bWJvbCBkb2VzbnQgZXhpc3Qgb24gdGhlIHRhcmdldFxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGJpbmRGbih0YXJnZXQsIHByb3ApO1xyXG59XHJcblxyXG4iLCJpbXBvcnQge2lzTmF0aXZlVHlwZUNhbGx9IGZyb20gXCIuLi9nZW5lcmljc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBST1hZX1RBRyA9ICdfX3Byb3h5X18nO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHByb3h5Rm4obmFtZTogYW55ID0gJ3Byb3h5Rm4nKSB7XHJcbiAgICBjb25zdCBmbiA9IGZ1bmN0aW9uIHByb3h5Rm4oKSB7fTtcclxuXHJcbiAgICBmbltcIl9fcHJveHlfZm5fX1wiXSA9IG5hbWU7XHJcblxyXG4gICAgcmV0dXJuIGZuO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNQcm94eUZuKHN1YmplY3Q6IGFueSkge1xyXG4gICAgcmV0dXJuICdfX3Byb3h5X2ZuX18nIGluIHN1YmplY3Q7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlUHJveHlIYW5kbGVyIHtcclxuICAgIGhhcyh0YXJnZXQsIGtleSkge1xyXG4gICAgICAgIGlmIChrZXkgPT09IFBST1hZX1RBRykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBrZXkgaW4gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwcm94aWZ5KHRhcmdldDogYW55ID0gcHJveHlGbigpLCBuYW1lID0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBuYW1lID8gdGFyZ2V0W25hbWVdIDogdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIGlzUHJveGlmaWVkKHRhcmdldCkge1xyXG4gICAgICAgIHJldHVybiAoUFJPWFlfVEFHIGluIHRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsdGVyKHRhcmdldDogYW55KSB7XHJcbiAgICAgICAgLy8gUHJpbWl0aXZlc1xyXG4gICAgICAgIGlmICghKHRhcmdldCAmJiB0YXJnZXQgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmlsdGVyIG5hdGl2ZSBUeXBlcyBhY2Nlc3MgKE1hcCwgQXJyYXksIERhdGUuLi4pXHJcbiAgICAgICAgaWYgKGlzTmF0aXZlVHlwZUNhbGwodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFscmVhZHkgcHJveGlmaWVkXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNQcm94aWZpZWQodGFyZ2V0KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBhbmd1bGFyRmlsdGVyIH0gZnJvbSBcIi4vYW5ndWxhci5maWx0ZXJcIjtcclxuaW1wb3J0IHsgbmF0aXZlUXVpcmtzRmlsdGVyIH0gZnJvbSBcIi4vbmF0aXZlLXF1aXJrcy5maWx0ZXJcIjtcclxuXHJcbmV4cG9ydCB7IGFuZ3VsYXJGaWx0ZXIgfTtcclxuZXhwb3J0IHsgbmF0aXZlUXVpcmtzRmlsdGVyIH07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFByb3BzRmlsdGVyKHByb3BOYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBhbmd1bGFyRmlsdGVyKHByb3BOYW1lKSB8fCBuYXRpdmVRdWlya3NGaWx0ZXIocHJvcE5hbWUpO1xyXG59XHJcbiIsImV4cG9ydCBmdW5jdGlvbiBhbmd1bGFyRmlsdGVyKHByb3BOYW1lOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBwcm9wTmFtZSAmJiBwcm9wTmFtZS5zdGFydHNXaXRoKCckJyk7XHJcbn1cclxuIiwiZXhwb3J0IGZ1bmN0aW9uIG5hdGl2ZVF1aXJrc0ZpbHRlcihwcm9wTmFtZTogc3RyaW5nKSB7XHJcbiAgICAvLyAtIHRvSlNPTiBjYWxsZWQgYnkganNvbiBzdHJpbmdpZnkgYXMgYXBpIGZvciBjdXN0b20gb3ZlcnJpZGUuXHJcbiAgICAvLyAtIGNvbnN0cnVjdG9yIGlzIGJlZW4gdXNlZCBpbiBzb21lIGpzIHBhY2thZ2VzIChlZGdlIGNhc2VzKVxyXG4gICAgcmV0dXJuIHByb3BOYW1lID09PSAndG9KU09OJyB8fCBwcm9wTmFtZSA9PT0gJ2NvbnN0cnVjdG9yJztcclxufVxyXG4iLCJpbXBvcnQge0Jhc2VQcm94eUhhbmRsZXIsIHByb3h5Rm59IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtiaW5kRm59IGZyb20gXCIuLi9nZW5lcmljc1wiO1xyXG5pbXBvcnQge09iamVjdFByb3h5SGFuZGxlcn0gZnJvbSBcIi4vb2JqZWN0XCI7XHJcblxyXG4vKipcclxuICogTm9uZSBlczYgcHJvbWlzZSBwb2x5ZmlsbCBhcyBibHVlYmlyZCB3aWxsIGhhdmUgYSBzaW1wbGUgJ3RoZW4nIGZ1bmN0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvbWlzZVBvbHlmaWxsKG9iaikge1xyXG4gICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbic7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOYXRpdmUgZXM2XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlTmF0aXZlKG9iaikge1xyXG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIFByb21pc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XHJcbiAgICByZXR1cm4gaXNQcm9taXNlTmF0aXZlKG9iaikgfHwgaXNQcm9taXNlUG9seWZpbGwob2JqKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByb21pc2VQcm94eUhhbmRsZXIgZXh0ZW5kcyBCYXNlUHJveHlIYW5kbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0KHRhcmdldCwgcHJvcCkge1xyXG4gICAgICAgIGxldCBzY29wZSA9IHRhcmdldDtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRhcmdldFtwcm9wXTtcclxuXHJcbiAgICAgICAgaWYgKHByb3AgPT09ICd0aGVuJykge1xyXG4gICAgICAgICAgICBzY29wZSA9IHRhcmdldC50aGVuKHJlc3BvbnNlID0+IHRoaXMucHJveGlmeShyZXNwb25zZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IGJpbmRGbihzY29wZSwgcHJvcCkgOiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJveGlmeSh0YXJnZXQ6IGFueSA9IHByb3h5Rm4oKSwgbmFtZSA9IG51bGwpIHtcclxuICAgICAgICBjb25zdCBzdWJqZWN0ID0gc3VwZXIucHJveGlmeSh0YXJnZXQsIG5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoaXNQcm9taXNlKHN1YmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJveHkoc3ViamVjdCwgbmV3IFByb21pc2VQcm94eUhhbmRsZXIoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5maWx0ZXIoc3ViamVjdCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YmplY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPOiBuZXcgb2JqZWN0IHByb3h5IGhhbmRsZXIgc2hvdWxkIHJlY2VpdmUgbG9nZ2luZyBjYWxsIGJhY2tzXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eShzdWJqZWN0LCBuZXcgT2JqZWN0UHJveHlIYW5kbGVyKCkpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IGRlZmF1bHRQcm9wc0ZpbHRlciB9IGZyb20gXCIuLi9maWx0ZXJzXCI7XHJcbmltcG9ydCB7aXNQcm9taXNlLCBpc1Byb21pc2VOYXRpdmUsIFByb21pc2VQcm94eUhhbmRsZXJ9IGZyb20gXCIuL3Byb21pc2VcIjtcclxuaW1wb3J0IHtkZWZhdWx0TG9nZ2VyLCBkZXZMb2csIExvZ2dpbmdVdGlsc30gZnJvbSBcIi4uL2xvZ2dpbmctdXRpbHNcIjtcclxuaW1wb3J0IHtCYXNlUHJveHlIYW5kbGVyLCBpc1Byb3h5Rm4sIHByb3h5Rm59IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtiaW5kRm4sIGJpbmRTeW1ib2wsIGlzTmF0aXZlRnVuY3Rpb25DYWxsLCBpc05hdGl2ZVR5cGVDYWxsLCBpc1N5bWJvbH0gZnJvbSBcIi4uL2dlbmVyaWNzXCI7XHJcbmltcG9ydCB7SU9iamVjdFByb3h5SGFuZGxlck9wdGlvbnN9IGZyb20gXCIuL29iamVjdC5pbnRlcmZhY2VcIjtcclxuXHJcbmNvbnN0IHtcclxuICAgIEdldE1pc3NpbmdQcm9wZXJ0eU1zZyxcclxuICAgIFNldE1pc3NpbmdQcm9wZXJ0eU1zZyxcclxuICAgIENhbGxNaXNzaW5nTWV0aG9kTXNnLFxyXG59ID0gTG9nZ2luZ1V0aWxzO1xyXG5cclxuZXhwb3J0IGNsYXNzIE9iamVjdFByb3h5SGFuZGxlciBleHRlbmRzIEJhc2VQcm94eUhhbmRsZXIge1xyXG4gICAgcmVhZG9ubHkgcHJvcHNGaWx0ZXI6IChuYW1lOiBzdHJpbmcgfCBhbnkpID0+IGJvb2xlYW47XHJcblxyXG4gICAgcmVhZG9ubHkgb25HZXRNaXNzaW5nUHJvcGVydHk6IChtc2c6IHN0cmluZywgbmFtZTogc3RyaW5nKSA9PiB2b2lkO1xyXG5cclxuICAgIHJlYWRvbmx5IG9uU2V0TWlzc2luZ1Byb3BlcnR5OiAobXNnOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkgPT4gdm9pZDtcclxuXHJcbiAgICByZWFkb25seSBvbkNhbGxNaXNzaW5nTWV0aG9kOiAobXNnOiBzdHJpbmcsIHRoaXNBcmc6IGFueSwgYXJnczogYW55W10pID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzRmlsdGVyID0gZGVmYXVsdFByb3BzRmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG9uR2V0TWlzc2luZ1Byb3BlcnR5ID0gZGVmYXVsdExvZ2dlcixcclxuICAgICAgICAgICAgICAgICAgICBvblNldE1pc3NpbmdQcm9wZXJ0eSA9IGRlZmF1bHRMb2dnZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgb25DYWxsTWlzc2luZ01ldGhvZCA9IGRlZmF1bHRMb2dnZXIsXHJcbiAgICAgICAgICAgICAgICB9OiBJT2JqZWN0UHJveHlIYW5kbGVyT3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnByb3BzRmlsdGVyID0gcHJvcHNGaWx0ZXI7XHJcbiAgICAgICAgdGhpcy5vbkdldE1pc3NpbmdQcm9wZXJ0eSA9IG9uR2V0TWlzc2luZ1Byb3BlcnR5O1xyXG4gICAgICAgIHRoaXMub25TZXRNaXNzaW5nUHJvcGVydHkgPSBvblNldE1pc3NpbmdQcm9wZXJ0eTtcclxuICAgICAgICB0aGlzLm9uQ2FsbE1pc3NpbmdNZXRob2QgPSBvbkNhbGxNaXNzaW5nTWV0aG9kO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCh0YXJnZXQ6IHt9LCBuYW1lOiBzdHJpbmcgfCBudW1iZXIgfCBzeW1ib2wsIHJlY2VpdmVyOiBhbnkgPSBudWxsKTogYW55IHtcclxuICAgICAgICBkZXZMb2coJ1tTZXJ2aWNlUHJveHlIYW5kbGVyXSBHZXQnLCBuYW1lLCB0eXBlb2YgbmFtZSk7XHJcblxyXG4gICAgICAgIGlmIChuYW1lID09PSAnX19wcm94eV90YXJnZXRfXycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc1N5bWJvbChuYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZFN5bWJvbCh0YXJnZXQsIG5hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHNGaWx0ZXIobmFtZS50b1N0cmluZygpKSB8fCAobmFtZSA9PT0gJ3RoZW4nICYmICFpc1Byb21pc2VOYXRpdmUodGFyZ2V0KSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChuYW1lIGluIHRhcmdldCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm94aWZ5KHRhcmdldCwgbmFtZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm9uR2V0TWlzc2luZ1Byb3BlcnR5KEdldE1pc3NpbmdQcm9wZXJ0eU1zZyhuYW1lKSwgbmFtZS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJveGlmeShwcm94eUZuKG5hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQodGFyZ2V0OiB7fSwgbmFtZTogc3RyaW5nIHwgbnVtYmVyIHwgc3ltYm9sLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgZGV2TG9nKCdbU2VydmljZVByb3h5SGFuZGxlcl0gU2V0JywgdGFyZ2V0LCBuYW1lLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmICghKG5hbWUgaW4gdGFyZ2V0IHx8IHRoaXMucHJvcHNGaWx0ZXIobmFtZS50b1N0cmluZygpKSkpIHtcclxuICAgICAgICAgICAgY29uc3QgbXNnID0gU2V0TWlzc2luZ1Byb3BlcnR5TXNnKG5hbWUsIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMub25TZXRNaXNzaW5nUHJvcGVydHkobXNnLCBuYW1lLnRvU3RyaW5nKCksIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICg8YW55PnRhcmdldClbbmFtZV0gPSB2YWx1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHkodGFyZ2V0OiBGdW5jdGlvbiwgdGhpc0FyZzogYW55LCBhcmdzTGlzdDogYW55W10pOiBhbnkge1xyXG4gICAgICAgIGRldkxvZygnW1NlcnZpY2VQcm94eUhhbmRsZXJdIEFwcGx5JywgdGFyZ2V0LCB0aGlzQXJnLCBhcmdzTGlzdCk7XHJcblxyXG4gICAgICAgIGlmIChpc1Byb3h5Rm4odGFyZ2V0KSkge1xyXG4gICAgICAgICAgICBjb25zdCB0aGlzQXJnU3RyID0gdGhpcy5zdHJpbmdpZnkodGhpc0FyZyk7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkb3Qtbm90YXRpb25cclxuICAgICAgICAgICAgY29uc3QgbXNnID0gQ2FsbE1pc3NpbmdNZXRob2RNc2codGFyZ2V0WydfX3Byb3h5X2ZuX18nXSwgdGhpc0FyZ1N0ciwgYXJnc0xpc3QpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vbkNhbGxNaXNzaW5nTWV0aG9kKG1zZywgdGhpc0FyZ1N0ciwgYXJnc0xpc3QpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJveGlmeSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJveGlmeSh0YXJnZXQuYXBwbHkodGhpc0FyZywgYXJnc0xpc3QpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgcHJveGlmeSh0YXJnZXQ6IGFueSA9IHByb3h5Rm4oKSwgbmFtZSA9IG51bGwpIHtcclxuICAgICAgICBjb25zdCBzdWJqZWN0ID0gc3VwZXIucHJveGlmeSh0YXJnZXQsIG5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoaXNQcm9taXNlKHN1YmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJveHkoc3ViamVjdCwgbmV3IFByb21pc2VQcm94eUhhbmRsZXIoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmZpbHRlcihzdWJqZWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3ViamVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERvbid0IHByb3hpZnkgbmF0aXZlIGZ1bmN0aW9uIGNhbGxzIChhcyBmbi5jYWxsLCBQcm9taXNlLnRoZW4uLi4pXHJcbiAgICAgICAgaWYgKGlzTmF0aXZlRnVuY3Rpb25DYWxsKHN1YmplY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBiaW5kRm4odGFyZ2V0LCBuYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkoc3ViamVjdCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHN0cmluZ2lmeSh0YXJnZXQpIHtcclxuICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5fX3Byb3h5X3RhcmdldF9fKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0YXJnZXQuX19wcm94eV90YXJnZXRfXykgfHwgdGFyZ2V0Ll9fcHJveHlfdGFyZ2V0X18udG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgTG9nZ2luZ1V0aWxzLCBkZWZhdWx0TG9nZ2VyLCBkZXZMb2cgfSBmcm9tIFwiLi4vbG9nZ2luZy11dGlsc1wiO1xyXG5pbXBvcnQge0Jhc2VQcm94eUhhbmRsZXIsIHByb3h5Rm59IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtPYmplY3RQcm94eUhhbmRsZXJ9IGZyb20gXCIuL29iamVjdFwiO1xyXG5pbXBvcnQge0lJbmplY3RvclByb3h5SGFuZGxlck9wdGlvbnMsIElPYmplY3RQcm94eUhhbmRsZXJPcHRpb25zfSBmcm9tIFwiLi9vYmplY3QuaW50ZXJmYWNlXCI7XHJcblxyXG5jb25zdCB7IEdldE1pc3NpbmdTZXJ2aWNlTXNnIH0gPSBMb2dnaW5nVXRpbHM7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5qZWN0b3JQcm94eUhhbmRsZXIgZXh0ZW5kcyBCYXNlUHJveHlIYW5kbGVyIHtcclxuICAgIHJlYWRvbmx5IGluamVjdG9yOiAobmFtZTogc3RyaW5nIHwgbnVtYmVyIHwgc3ltYm9sKSA9PiBhbnk7XHJcblxyXG4gICAgcmVhZG9ubHkgb25HZXRNaXNzaW5nU2VydmljZTogKG1zZzogc3RyaW5nLCBuYW1lOiBzdHJpbmcgfCBudW1iZXIgfCBzeW1ib2wpID0+IHZvaWQ7XHJcblxyXG4gICAgcmVhZG9ubHkgc2VydmljZVByb3h5SGFuZGxlcjogT2JqZWN0UHJveHlIYW5kbGVyO1xyXG5cclxuICAgIC8qKipcclxuICAgICAqIEBwYXJhbSBpbmplY3RvcihuYW1lOiBzdHJpbmcgfCBudW1iZXIgfCBzeW1ib2wpOiBhbnk7XHJcbiAgICAgKiBAcGFyYW0gb25HZXRNaXNzaW5nU2VydmljZT8obXNnOiBzdHJpbmcsIG5hbWU6IHN0cmluZyB8IG51bWJlciB8IHN5bWJvbCk6IHZvaWQ7XHJcbiAgICAgKiBAcGFyYW0gcHJvcHNGaWx0ZXI/KG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XHJcbiAgICAgKiBAcGFyYW0gb25HZXRNaXNzaW5nUHJvcGVydHk/KG1zZzogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XHJcbiAgICAgKiBAcGFyYW0gb25TZXRNaXNzaW5nUHJvcGVydHk/KG1zZzogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQ7XHJcbiAgICAgKiBAcGFyYW0gb25DYWxsTWlzc2luZ01ldGhvZD8obXNnOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogdm9pZDtcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeyBpbmplY3Rvciwgb25HZXRNaXNzaW5nU2VydmljZSA9IGRlZmF1bHRMb2dnZXIgfTogSUluamVjdG9yUHJveHlIYW5kbGVyT3B0aW9ucykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbmplY3RvciA9IGluamVjdG9yO1xyXG4gICAgICAgIHRoaXMub25HZXRNaXNzaW5nU2VydmljZSA9IG9uR2V0TWlzc2luZ1NlcnZpY2U7XHJcbiAgICAgICAgdGhpcy5zZXJ2aWNlUHJveHlIYW5kbGVyID0gbmV3IE9iamVjdFByb3h5SGFuZGxlcihhcmd1bWVudHNbMF0gYXMgSU9iamVjdFByb3h5SGFuZGxlck9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCh0YXJnZXQ6IHt9LCBuYW1lOiBzdHJpbmcgfCBudW1iZXIgfCBzeW1ib2wpOiBhbnkge1xyXG4gICAgICAgIGRldkxvZygnW0luamVjdG9yUHJveHlIYW5kbGVyXSBHZXQnLCB0YXJnZXQsIG5hbWUpO1xyXG5cclxuICAgICAgICBpZiAobmFtZSA9PT0gU3ltYm9sLnRvU3RyaW5nVGFnKSByZXR1cm4gdGFyZ2V0LnRvU3RyaW5nKCk7XHJcblxyXG4gICAgICAgIGlmIChuYW1lIGluIHRhcmdldCkgcmV0dXJuICg8YW55PnRhcmdldClbbmFtZV07XHJcblxyXG4gICAgICAgIGxldCBzZXJ2aWNlID0gbnVsbDtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgc2VydmljZSA9IHRoaXMuaW5qZWN0b3IobmFtZSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxyXG5cclxuICAgICAgICBpZiAoIXNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkdldE1pc3NpbmdTZXJ2aWNlKEdldE1pc3NpbmdTZXJ2aWNlTXNnKG5hbWUpLCBuYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICg8YW55PnRhcmdldClbbmFtZV0gPSB0aGlzLnByb3hpZnkoc2VydmljZSB8fCBwcm94eUZuKG5hbWUpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICg8YW55PnRhcmdldClbbmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJveGlmeSh0YXJnZXQ6IGFueSA9IHByb3h5Rm4oKSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodGFyZ2V0LCB0aGlzLnNlcnZpY2VQcm94eUhhbmRsZXIpO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBUaGlzIGxpYiBwcm92aWRlcyAzIGxheWVycyBvZiBwcm94eSBkZWNvcmF0aW9uLFxyXG4gKiAxKSBzZXJ2aWNlcyBpbnZvY2F0aW9uIGJ5IG5hbWUsIGJ5IHRoZSBwcm92aWRlZCBpbmplY3Rvci5cclxuICogMikgcHJvdmlkZWQgc2VydmljZS9vYmplY3QgaW50ZXJmYWNlLlxyXG4gKiAzKSBQcm9taXNlIG9iamVjdC5cclxuICpcclxuICogQWxsIGxheWVycyBhcmUgUHJveHkgd3JhcHBlZCB0byBhdm9pZCBmYXRhbCBleGNlcHRpb25zIG9uIG5vbiBleGlzdGluZyBtaXN1c2VcclxuICogb3IgYXBwbGljYXRpb24gb3V0IG9mIHN5bmMgaW4gY2FzZSBvZiBtdWx0aSBpZnJhbWUgc2hhcmVkIHNlcnZpY2VzIC8gcmVzb3VyY2VzLlxyXG4gKi9cclxuaW1wb3J0IHtJbmplY3RvclByb3h5SGFuZGxlcn0gZnJvbSAnLi9wcm94eV9oYW5kbGVycy9pbmplY3Rvcic7XHJcbmltcG9ydCB7SUluamVjdG9yUHJveHlIYW5kbGVyT3B0aW9ucywgSU9iamVjdFByb3h5SGFuZGxlck9wdGlvbnN9IGZyb20gXCIuL3Byb3h5X2hhbmRsZXJzL29iamVjdC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHtPYmplY3RQcm94eUhhbmRsZXJ9IGZyb20gXCIuL3Byb3h5X2hhbmRsZXJzL29iamVjdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEluamVjdGlvblByb3h5KG9wdGlvbnM6IElJbmplY3RvclByb3h5SGFuZGxlck9wdGlvbnMpOiB7fSB7XHJcbiAgcmV0dXJuIG5ldyBQcm94eSh7fSwgbmV3IEluamVjdG9yUHJveHlIYW5kbGVyKG9wdGlvbnMpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE9iamVjdFByb3h5KHRhcmdldDogYW55LCBvcHRpb25zOiBJT2JqZWN0UHJveHlIYW5kbGVyT3B0aW9ucyk6IHt9IHtcclxuICByZXR1cm4gbmV3IFByb3h5KHRhcmdldCwgbmV3IE9iamVjdFByb3h5SGFuZGxlcihvcHRpb25zKSk7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==