module.exports=function(r){var e={};function t(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return r[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,e){if(1&e&&(r=t(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var i in r)t.d(n,i,function(e){return r[e]}.bind(null,i));return n},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="",t(t.s=1)}([,function(r,e,t){"use strict";var n=function(){function r(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}();var i=function(){function r(){!function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r)}return n(r,null,[{key:"isUndefined",value:function(r){return void 0===r}},{key:"isNull",value:function(r){return null===r}},{key:"isString",value:function(r){return"string"==typeof r}},{key:"isStringWithoutNull",value:function(e){return r.isString(e)&&""!=e}},{key:"isArray",value:function(e){return e instanceof Array||(r.Console("error","object is not an Array"),!1)}},{key:"isArrayWithString",value:function(e){if(!r.isArray(e))return!1;var t=!0,n=!1,i=void 0;try{for(var o,u=new Set(e)[Symbol.iterator]();!(t=(o=u.next()).done);t=!0){var a=o.value;if(!r.isString(a)||!a)return r.Console("error","object inner has a element is not String"),!1}}catch(r){n=!0,i=r}finally{try{!t&&u.return&&u.return()}finally{if(n)throw i}}return!0}},{key:"isKVObject",value:function(e){return!r.isUndefined(e)&&!r.isNull(e)&&e instanceof Object&&!(e instanceof Array)||(r.Console("error","object in not an object or is an Array"),!1)}},{key:"isKVObjectWithStringKey",value:function(e){if(!r.isKVObject(e))return!1;var t=!0,n=!1,i=void 0;try{for(var o,u=Object.keys(e)[Symbol.iterator]();!(t=(o=u.next()).done);t=!0){var a=o.value;if(!r.isStringWithoutNull(a))return r.Console("error",'the object key is not a string or is ""'),!1}}catch(r){n=!0,i=r}finally{try{!t&&u.return&&u.return()}finally{if(n)throw i}}return!0}},{key:"isRealOrZero",value:function(e){return!r.isUndefined(e)&&!r.isNull(e)&&""!==e}},{key:"isNumber",value:function(r){return"number"==typeof r}},{key:"isInteger",value:function(e){return r.isNumber(e)&&e%1==0}},{key:"objectToMap",value:function(e){var t=new Map;if(!r.isKVObjectWithStringKey(e))return t;var n=!0,i=!1,o=void 0;try{for(var u,a=Object.keys(e)[Symbol.iterator]();!(n=(u=a.next()).done);n=!0){var l=u.value;t.set(l,e[l])}}catch(r){i=!0,o=r}finally{try{!n&&a.return&&a.return()}finally{if(i)throw o}}return t}},{key:"mapToObject",value:function(r){if(!(r instanceof Map))return r;var e={};r.forEach((function(r,t){e[t]=r}))}},{key:"getArrayWithString",value:function(e,t){var n=[];return r.isStringWithoutNull(e)?n=e.split(" "):r.isArrayWithString(e)?n=e:r.Console("error","object is not an array or a string"),n}},{key:"upFirstWord",value:function(e){return r.isStringWithoutNull(e)&&new RegExp(/^[a-zA-Z].*$/).test(e)?e[0].toUpperCase()+e.substring(1):e}},{key:"patchZero",value:function(e,t){t=t||2;var n=String(e);if(r.isInteger(e)&&n.length<t){for(var i="";t>n.length;)t--,i+="0";n=""+i+e}return n}},{key:"Console",value:function(e){if(r.LOGABLE){for(var t=arguments.length,n=Array(t>1?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];console[e](n)}}}]),r}();i.LOGABLE=!1,r.exports=i}]);