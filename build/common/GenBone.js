module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=101)}({0:function(e,t){e.exports=require("react")},1:function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var i=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return r(e,null,[{key:"isUndefined",value:function(e){return void 0===e}},{key:"isNull",value:function(e){return null===e}},{key:"isString",value:function(e){return"string"==typeof e}},{key:"isStringWithoutNull",value:function(t){return e.isString(t)&&""!=t}},{key:"isArray",value:function(t){return t instanceof Array||(e.Console("error","object is not an Array"),!1)}},{key:"isArrayWithString",value:function(t){if(!e.isArray(t))return!1;var n=!0,r=!1,i=void 0;try{for(var a,u=new Set(t)[Symbol.iterator]();!(n=(a=u.next()).done);n=!0){var o=a.value;if(!e.isString(o)||!o)return e.Console("error","object inner has a element is not String"),!1}}catch(e){r=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(r)throw i}}return!0}},{key:"isKVObject",value:function(t){return!e.isUndefined(t)&&!e.isNull(t)&&t instanceof Object&&!(t instanceof Array)||(e.Console("error","object in not an object or is an Array"),!1)}},{key:"isKVObjectWithStringKey",value:function(t){if(!e.isKVObject(t))return!1;var n=!0,r=!1,i=void 0;try{for(var a,u=Object.keys(t)[Symbol.iterator]();!(n=(a=u.next()).done);n=!0){var o=a.value;if(!e.isStringWithoutNull(o))return e.Console("error",'the object key is not a string or is ""'),!1}}catch(e){r=!0,i=e}finally{try{!n&&u.return&&u.return()}finally{if(r)throw i}}return!0}},{key:"isRealOrZero",value:function(t){return!e.isUndefined(t)&&!e.isNull(t)&&""!==t}},{key:"isNumber",value:function(e){return"number"==typeof e}},{key:"isInteger",value:function(t){return e.isNumber(t)&&t%1==0}},{key:"objectToMap",value:function(t){var n=new Map;if(!e.isKVObjectWithStringKey(t))return n;var r=!0,i=!1,a=void 0;try{for(var u,o=Object.keys(t)[Symbol.iterator]();!(r=(u=o.next()).done);r=!0){var s=u.value;n.set(s,t[s])}}catch(e){i=!0,a=e}finally{try{!r&&o.return&&o.return()}finally{if(i)throw a}}return n}},{key:"mapToObject",value:function(e){if(!(e instanceof Map))return e;var t={};e.forEach(function(e,n){t[n]=e})}},{key:"getArrayWithString",value:function(t,n){var r=[];return e.isStringWithoutNull(t)?r=t.split(" "):e.isArrayWithString(t)?r=t:e.Console("error","object is not an array or a string"),r}},{key:"upFirstWord",value:function(t){return e.isStringWithoutNull(t)&&new RegExp(/^[a-zA-Z].*$/).test(t)?t[0].toUpperCase()+t.substring(1):t}},{key:"patchZero",value:function(t,n){n=n||2;var r=String(t);if(e.isInteger(t)&&r.length<n){for(var i="";n>r.length;)n--,i+="0";r=""+i+t}return r}},{key:"Console",value:function(t){if(e.LOGABLE){for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];console[t](r)}}}]),e}();i.LOGABLE=!1,e.exports=i},10:function(e,t,n){"use strict";var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function a(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function r(i,a){try{var u=t[i](a),o=u.value}catch(e){return void n(e)}if(!u.done)return Promise.resolve(o).then(function(e){r("next",e)},function(e){r("throw",e)});e(o)}("next")})}}var u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.events=t||[]}return r(e,[{key:"execute",value:function(){var e=a(regeneratorRuntime.mark(function e(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];var i;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.events&&this.events instanceof Array){e.next=3;break}return console.error("Events is not an Array"),e.abrupt("return");case 3:i=0;case 4:if(!(i<this.events.length)){e.next=11;break}return e.next=7,this.execOne(n,this.events[i]);case 7:n=e.sent;case 8:i++,e.next=4;break;case 11:return e.abrupt("return",n);case 12:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"execOne",value:function(){var e=a(regeneratorRuntime.mark(function e(t,n){var r;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(r=null,!(n instanceof Function)){e.next=11;break}return e.prev=2,e.next=5,n.apply(void 0,i(t));case 5:r=e.sent,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),r=e.t0;case 11:return null===r||r instanceof Array||r instanceof Promise||(r=[r]),e.abrupt("return",r||t);case 13:case"end":return e.stop()}},e,this,[[2,8]])}));return function(t,n){return e.apply(this,arguments)}}()}]),e}();e.exports=u},101:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=o(n(0)),a=o(n(1)),u=o(n(10));function o(e){return e&&e.__esModule?e:{default:e}}var s=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),console.log(t),this.signKV=new Map,this.oldChildren=t,this.logic=n,this.state=r,this.sequence=new Map}return r(e,[{key:"get",value:function(){return this.logic.status.size?(this.genSignKv(this.logic.status),this.children=this.genChildren(this.oldChildren),this.children):children}},{key:"genSignKv",value:function(e){var t=this;e.forEach(function(e,n){var r=e.target;t.signKV.has(r)||t.signKV.set(r,new Set),t.signKV.get(r).add(n)})}},{key:"genChildren",value:function(e){var t=this;if(a.default.isArray(e)&&e.length)return e.map(function(e){return t.genChildren(e)});if(a.default.isKVObject(e)){var n=e.props.sign;n&&this.signKV.has(n)&&this.genStatusRelate(n,e,{});var r=e.props&&e.props.children;return r&&a.default.isArray(r)&&r.length?i.default.cloneElement(e,{children:this.genChildren(r)}):i.default.cloneElement(e,this.genStatusRelate(e.props.sign,e.props))}return e}},{key:"genStatusRelate",value:function(e,t){var n=this,r={},i=this.signKV.has(e)&&this.signKV.get(e);return i&&i.forEach(function(e){n.logic.status.get(e).event.forEach(function(i,o){var s="on"+a.default.upFirstWord(o),c=t[s],l=new u.default,f=n.state.status.get(e),v=f;switch(i){case 0:v=!1;break;case 1:v=!0;break;case 3:v=!f}l.events.push(function(){for(var t=arguments.length,r=Array(t),i=0;i<t;i++)r[i]=arguments[i];return console.log("change state"),n.setState({status:function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},e,v)}),[].concat(r,[n.logic.value,n.state.status])}),l.events.push(function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];console.log("execute old function");var i=c.call.apply(c,[n].concat(t)),u=t.length;return n.logic.value=n.state.status,a.default.isArray(i)?[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(i),[t[u-2],t[u-1]]):[i,t[u-2],t[u-1]]}),r[s]=function(){l.execute.apply(l,arguments)}})}),r}}]),e}();t.default=s}});