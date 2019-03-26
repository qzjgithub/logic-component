module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}({0:function(e,t,r){"use strict";var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return n(e,null,[{key:"isUndefined",value:function(e){return void 0===e}},{key:"isNull",value:function(e){return null===e}},{key:"isString",value:function(e){return"string"==typeof e}},{key:"isStringWithoutNull",value:function(t){return e.isString(t)&&""!=t}},{key:"isArray",value:function(t){return t instanceof Array||(e.Console("error","object is not an Array"),!1)}},{key:"isArrayWithString",value:function(t){if(!e.isArray(t))return!1;var r=!0,n=!1,i=void 0;try{for(var a,u=new Set(t)[Symbol.iterator]();!(r=(a=u.next()).done);r=!0){var l=a.value;if(!e.isString(l)||!l)return e.Console("error","object inner has a element is not String"),!1}}catch(e){n=!0,i=e}finally{try{!r&&u.return&&u.return()}finally{if(n)throw i}}return!0}},{key:"isKVObject",value:function(t){return!e.isUndefined(t)&&!e.isNull(t)&&t instanceof Object&&!(t instanceof Array)||(e.Console("error","object in not an object or is an Array"),!1)}},{key:"isKVObjectWithStringKey",value:function(t){if(!e.isKVObject(t))return!1;var r=!0,n=!1,i=void 0;try{for(var a,u=Object.keys(t)[Symbol.iterator]();!(r=(a=u.next()).done);r=!0){var l=a.value;if(!e.isStringWithoutNull(l))return e.Console("error",'the object key is not a string or is ""'),!1}}catch(e){n=!0,i=e}finally{try{!r&&u.return&&u.return()}finally{if(n)throw i}}return!0}},{key:"isRealOrZero",value:function(t){return!e.isUndefined(t)&&!e.isNull(t)&&""!==t}},{key:"isNumber",value:function(e){return"number"==typeof e}},{key:"isInteger",value:function(t){return e.isNumber(t)&&t%1==0}},{key:"objectToMap",value:function(t){var r=new Map;if(!e.isKVObjectWithStringKey(t))return r;var n=!0,i=!1,a=void 0;try{for(var u,l=Object.keys(t)[Symbol.iterator]();!(n=(u=l.next()).done);n=!0){var o=u.value;r.set(o,t[o])}}catch(e){i=!0,a=e}finally{try{!n&&l.return&&l.return()}finally{if(i)throw a}}return r}},{key:"mapToObject",value:function(e){if(!(e instanceof Map))return e;var t={};e.forEach(function(e,r){t[r]=e})}},{key:"getArrayWithString",value:function(t,r){var n=[];return e.isStringWithoutNull(t)?n=t.split(" "):e.isArrayWithString(t)?n=t:e.Console("error","object is not an array or a string"),n}},{key:"upFirstWord",value:function(t){return e.isStringWithoutNull(t)&&new RegExp(/^[a-zA-Z].*$/).test(t)?t[0].toUpperCase()+t.substring(1):t}},{key:"patchZero",value:function(t,r){r=r||2;var n=String(t);if(e.isInteger(t)&&n.length<r){for(var i="";r>n.length;)r--,i+="0";n=""+i+t}return n}},{key:"Console",value:function(t){if(e.LOGABLE){for(var r=arguments.length,n=Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];console[t](n)}}}]),e}();i.LOGABLE=!1,e.exports=i},6:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(e){return e&&e.__esModule?e:{default:e}}(r(0));var a=function(){function e(t){var r=t.target,n=t.styleToDom,a=void 0===n||n,u=t.classTrue,l=t.classFalse,o=t.styleTrue,s=t.styleFalse,c=t.defaultState,f=void 0!==c&&c,y=t.event;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._target=i.default.isStringWithoutNull(r)?r:e.BASIC,this._styleToDom=!!a,this.coverClassTrue(u),this.coverClassFalse(l),this._styleTrue=i.default.isKVObjectWithStringKey(o)?o:{},this._styleFalse=i.default.isKVObjectWithStringKey(s)?s:{},this._defaultState=!!f,this._event=this.coverEvent(y),this._motivation=new Map}return n(e,[{key:"addClassTrue",value:function(e){var t=i.default.getArrayWithString(e),r=!0,n=!1,a=void 0;try{for(var u,l=t[Symbol.iterator]();!(r=(u=l.next()).done);r=!0){var o=u.value;this._classTrue.add(o)}}catch(e){n=!0,a=e}finally{try{!r&&l.return&&l.return()}finally{if(n)throw a}}}},{key:"coverClassTrue",value:function(e){var t=i.default.getArrayWithString(e);this._classTrue=new Set(t)}},{key:"removeClassTrue",value:function(e){var t=i.default.getArrayWithString(e),r=!0,n=!1,a=void 0;try{for(var u,l=t[Symbol.iterator]();!(r=(u=l.next()).done);r=!0){var o=u.value;this._classTrue.delete(o)}}catch(e){n=!0,a=e}finally{try{!r&&l.return&&l.return()}finally{if(n)throw a}}}},{key:"clearClassTrue",value:function(){this._classTrue.clear()}},{key:"addClassFalse",value:function(e){var t=i.default.getArrayWithString(e),r=!0,n=!1,a=void 0;try{for(var u,l=t[Symbol.iterator]();!(r=(u=l.next()).done);r=!0){var o=u.value;this._classFalse.add(o)}}catch(e){n=!0,a=e}finally{try{!r&&l.return&&l.return()}finally{if(n)throw a}}}},{key:"coverClassFalse",value:function(e){var t=i.default.getArrayWithString(e);this._classFalse=new Set(t)}},{key:"removeClassFalse",value:function(e){var t=i.default.getArrayWithString(e),r=!0,n=!1,a=void 0;try{for(var u,l=t[Symbol.iterator]();!(r=(u=l.next()).done);r=!0){var o=u.value;this._classFalse.delete(o)}}catch(e){n=!0,a=e}finally{try{!r&&l.return&&l.return()}finally{if(n)throw a}}}},{key:"clearClassFalse",value:function(){this._classFalse.clear()}},{key:"clearClass",value:function(){this.clearClassTrue(),this.clearClassFalse()}},{key:"mergeStyleTrue",value:function(e){if(i.default.isKVObjectWithStringKey(e))for(var t in Object.keys(e))this._styleTrue.set(t,e[t])}},{key:"coverStyleTrue",value:function(e){i.default.isKVObjectWithStringKey(e)&&(this._styleTrue=i.default.objectToMap(e))}},{key:"clearStyleTrue",value:function(){this._styleTrue.clear()}},{key:"mergeStyleFalse",value:function(e){if(i.default.isKVObjectWithStringKey(e))for(var t in Object.keys(e))this._styleFalse.set(t,e[t])}},{key:"coverStyleFalse",value:function(e){i.default.isKVObjectWithStringKey(e)&&(this._styleFalse=i.default.objectToMap(e))}},{key:"clearStyleFalse",value:function(){this._styleFalse.clear()}},{key:"clearStyle",value:function(){this.clearStyleTrue(),this.clearStyleFalse()}},{key:"inev",value:function(t){return e.EVENT_VALUE.indexOf(t)>-1||"function"==typeof t}},{key:"coverEvent",value:function(e){for(var t in e=i.default.objectToMap(e))this.inev(e)||(console.log("has event value not in [0,1,2]"),e.delete(t));return e}},{key:"setEvent",value:function(e,t){i.default.isStringWithoutNull(e)&&this.inev(t)&&this._event.set(e,t)}},{key:"deleteEvent",value:function(e){i.default.isStringWithoutNull(e)&&this._event.has(e)&&this._event.delete(e)}},{key:"clearEvent",value:function(){this._event.clear()}},{key:"getEventByKey",value:function(e){return i.default.isStringWithoutNull(e)&&this._event.has(e)?this._event.get(e):-1}},{key:"setMotivation",value:function(e,t){i.default.isStringWithoutNull(e)&&this.inev(t)&&this.motivation.set(e,t)}},{key:"deleteMotivation",value:function(e){i.default.isStringWithoutNull(e)&&this._motivation.has(e)&&this._motivation.delete(e)}},{key:"clearMotivation",value:function(){this._motivation.clear()}},{key:"getMotivationBykey",value:function(e){return i.default.isStringWithoutNull(e)&&this._motivation.has(e)?this._motivation.get(e):-1}},{key:"styleToDom",get:function(){return this._styleToDom},set:function(e){this._styleToDom=!!e}},{key:"classTrue",get:function(){return this._classTrue}},{key:"classFalse",get:function(){return this._classFalse}},{key:"styleTrue",get:function(){return this._styleTrue}},{key:"styleFalse",get:function(){return this._styleFalse}},{key:"defaultState",get:function(){return this._defaultState},set:function(e){this._defaultState=!!e}},{key:"event",get:function(){return this._event}},{key:"motivation",get:function(){return this._motivation}},{key:"target",get:function(){return this._target},set:function(e){this._target=e}}]),e}();a.EVENT_VALUE=[0,1,2],a.BASIC=Symbol("basic"),t.default=a}});