module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=9)}({0:function(t,e,r){"use strict";var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}();var i=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return n(t,null,[{key:"isUndefined",value:function(t){return void 0===t}},{key:"isNull",value:function(t){return null===t}},{key:"isString",value:function(t){return"string"==typeof t}},{key:"isStringWithoutNull",value:function(e){return t.isString(e)&&""!=e}},{key:"isArray",value:function(e){return e instanceof Array||(t.Console("error","object is not an Array"),!1)}},{key:"isArrayWithString",value:function(e){if(!t.isArray(e))return!1;var r=!0,n=!1,i=void 0;try{for(var u,o=new Set(e)[Symbol.iterator]();!(r=(u=o.next()).done);r=!0){var a=u.value;if(!t.isString(a)||!a)return t.Console("error","object inner has a element is not String"),!1}}catch(t){n=!0,i=t}finally{try{!r&&o.return&&o.return()}finally{if(n)throw i}}return!0}},{key:"isKVObject",value:function(e){return!t.isUndefined(e)&&!t.isNull(e)&&e instanceof Object&&!(e instanceof Array)||(t.Console("error","object in not an object or is an Array"),!1)}},{key:"isKVObjectWithStringKey",value:function(e){if(!t.isKVObject(e))return!1;var r=!0,n=!1,i=void 0;try{for(var u,o=Object.keys(e)[Symbol.iterator]();!(r=(u=o.next()).done);r=!0){var a=u.value;if(!t.isStringWithoutNull(a))return t.Console("error",'the object key is not a string or is ""'),!1}}catch(t){n=!0,i=t}finally{try{!r&&o.return&&o.return()}finally{if(n)throw i}}return!0}},{key:"isRealOrZero",value:function(e){return!t.isUndefined(e)&&!t.isNull(e)&&""!==e}},{key:"isNumber",value:function(t){return"number"==typeof t}},{key:"isInteger",value:function(e){return t.isNumber(e)&&e%1==0}},{key:"objectToMap",value:function(e){var r=new Map;if(!t.isKVObjectWithStringKey(e))return r;var n=!0,i=!1,u=void 0;try{for(var o,a=Object.keys(e)[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value;r.set(s,e[s])}}catch(t){i=!0,u=t}finally{try{!n&&a.return&&a.return()}finally{if(i)throw u}}return r}},{key:"mapToObject",value:function(t){if(!(t instanceof Map))return t;var e={};t.forEach(function(t,r){e[r]=t})}},{key:"getArrayWithString",value:function(e,r){var n=[];return t.isStringWithoutNull(e)?n=e.split(" "):t.isArrayWithString(e)?n=e:t.Console("error","object is not an array or a string"),n}},{key:"upFirstWord",value:function(e){return t.isStringWithoutNull(e)&&new RegExp(/^[a-zA-Z].*$/).test(e)?e[0].toUpperCase()+e.substring(1):e}},{key:"patchZero",value:function(e,r){r=r||2;var n=String(e);if(t.isInteger(e)&&n.length<r){for(var i="";r>n.length;)r--,i+="0";n=""+i+e}return n}},{key:"Console",value:function(e){if(t.LOGABLE){for(var r=arguments.length,n=Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];console[e](n)}}}]),t}();i.LOGABLE=!1,t.exports=i},9:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),i=function(t){return t&&t.__esModule?t:{default:t}}(r(0));var u=function(){function t(e){var r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.coverStatus(e),this._trigger=!!r,this._object=e,this._trigger=r}return n(t,[{key:"coverStatus",value:function(t){for(var e in this._status=new Map,i.default.isKVObjectWithStringKey(t)&&(this._status=i.default.objectToMap(t)),this._status)this._status.set(e,!!this._status.get(e))}},{key:"setStatus",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];i.default.isStringWithoutNull(t)&&this._status.set(t,!!e)}},{key:"deleteStatus",value:function(t){i.default.isStringWithoutNull(t)&&this._status.has(t)&&this._status.delete(t)}},{key:"clearStatus",value:function(){this._status.clear()}},{key:"trigger",get:function(){return this._trigger},set:function(t){this._trigger=t}},{key:"status",get:function(){return this._status}}]),t}();e.default=u}});