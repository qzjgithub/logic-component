module.exports=function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=103)}({0:function(t,e){t.exports=require("react")},1:function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();var i=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}return r(t,null,[{key:"isUndefined",value:function(t){return void 0===t}},{key:"isNull",value:function(t){return null===t}},{key:"isString",value:function(t){return"string"==typeof t}},{key:"isStringWithoutNull",value:function(e){return t.isString(e)&&""!=e}},{key:"isArray",value:function(e){return e instanceof Array||(t.Console("error","object is not an Array"),!1)}},{key:"isArrayWithString",value:function(e){if(!t.isArray(e))return!1;var n=!0,r=!1,i=void 0;try{for(var a,o=new Set(e)[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){var s=a.value;if(!t.isString(s)||!s)return t.Console("error","object inner has a element is not String"),!1}}catch(t){r=!0,i=t}finally{try{!n&&o.return&&o.return()}finally{if(r)throw i}}return!0}},{key:"isKVObject",value:function(e){return!t.isUndefined(e)&&!t.isNull(e)&&e instanceof Object&&!(e instanceof Array)||(t.Console("error","object in not an object or is an Array"),!1)}},{key:"isKVObjectWithStringKey",value:function(e){if(!t.isKVObject(e))return!1;var n=!0,r=!1,i=void 0;try{for(var a,o=Object.keys(e)[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){var s=a.value;if(!t.isStringWithoutNull(s))return t.Console("error",'the object key is not a string or is ""'),!1}}catch(t){r=!0,i=t}finally{try{!n&&o.return&&o.return()}finally{if(r)throw i}}return!0}},{key:"isRealOrZero",value:function(e){return!t.isUndefined(e)&&!t.isNull(e)&&""!==e}},{key:"isNumber",value:function(t){return"number"==typeof t}},{key:"isInteger",value:function(e){return t.isNumber(e)&&e%1==0}},{key:"objectToMap",value:function(e){var n=new Map;if(!t.isKVObjectWithStringKey(e))return n;var r=!0,i=!1,a=void 0;try{for(var o,s=Object.keys(e)[Symbol.iterator]();!(r=(o=s.next()).done);r=!0){var u=o.value;n.set(u,e[u])}}catch(t){i=!0,a=t}finally{try{!r&&s.return&&s.return()}finally{if(i)throw a}}return n}},{key:"mapToObject",value:function(t){if(!(t instanceof Map))return t;var e={};t.forEach((function(t,n){e[n]=t}))}},{key:"getArrayWithString",value:function(e,n){var r=[];return t.isStringWithoutNull(e)?r=e.split(" "):t.isArrayWithString(e)?r=e:t.Console("error","object is not an array or a string"),r}},{key:"upFirstWord",value:function(e){return t.isStringWithoutNull(e)&&new RegExp(/^[a-zA-Z].*$/).test(e)?e[0].toUpperCase()+e.substring(1):e}},{key:"patchZero",value:function(e,n){n=n||2;var r=String(e);if(t.isInteger(e)&&r.length<n){for(var i="";n>r.length;)n--,i+="0";r=""+i+e}return r}},{key:"Console",value:function(e){if(t.LOGABLE){for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];console[e](r)}}}]),t}();i.LOGABLE=!1,t.exports=i},10:function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();function i(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function a(t){return function(){var e=t.apply(this,arguments);return new Promise((function(t,n){return function r(i,a){try{var o=e[i](a),s=o.value}catch(t){return void n(t)}if(!o.done)return Promise.resolve(s).then((function(t){r("next",t)}),(function(t){r("throw",t)}));t(s)}("next")}))}}var o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.events=e||[]}var e,n;return r(t,[{key:"execute",value:(n=a(regeneratorRuntime.mark((function t(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var i;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.events&&this.events instanceof Array){t.next=3;break}return console.error("Events is not an Array"),t.abrupt("return");case 3:i=0;case 4:if(!(i<this.events.length)){t.next=11;break}return t.next=7,this.execOne(n,this.events[i]);case 7:n=t.sent;case 8:i++,t.next=4;break;case 11:return t.abrupt("return",n);case 12:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)})},{key:"execOne",value:(e=a(regeneratorRuntime.mark((function t(e,n){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=null,!(n instanceof Function)){t.next=11;break}return t.prev=2,t.next=5,n.apply(void 0,i(e));case 5:r=t.sent,t.next=11;break;case 8:t.prev=8,t.t0=t.catch(2),r=t.t0;case 11:return null===r||r instanceof Array||r instanceof Promise||(r=[r]),t.abrupt("return",r||e);case 13:case"end":return t.stop()}}),t,this,[[2,8]])}))),function(t,n){return e.apply(this,arguments)})}]),t}();t.exports=o},103:function(t,e,n){"use strict";var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(0),a=f(i),o=f(n(2)),s=f(n(11)),u=f(n(6)),l=f(n(10)),c=f(n(1));function f(t){return t&&t.__esModule?t:{default:t}}var v=function(t){function e(t,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return h.call(r),r.initLogic(),r.signKV=new Map,r.state={status:r.initStatus()},r}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,t),r(e,[{key:"initLogic",value:function(){var t=this;this.logic=new s.default({});var e=this.props.logic;if(e){var n=e.status,r=e.motivation;if(n&&Object.keys(n).length){r||(r={});var i={};Object.keys(n).forEach((function(e){var r=n[e],a=r.motivation;a&&Object.keys(a).length&&(i[e]=a),t.logic.addStatus(e,r)})),Object.keys(r).forEach((function(e){var n=r[e];t.logic.addMotivation(e,n)})),Object.keys(i).forEach((function(e){var n=i[e];Object.keys(n).forEach((function(r){t.logic.setStatusMotivation(r,e,n[r])}))}))}}}},{key:"genSignKv",value:function(t){var e=this;t.forEach((function(t,n){var r=t.target;e.signKV.has(r)||e.signKV.set(r,new Set),e.signKV.get(r).add(n)}))}},{key:"genChildren",value:function(t){var e=this;if(c.default.isArray(t)&&t.length)return t.map((function(t){return e.genChildren(t)}));if(c.default.isKVObject(t)){var n=void 0,r=t.props.sign;r&&this.signKV.has(r)&&(n=this.genStatusRelate(r,t.props));var i=t.props&&t.props.children;return i?((n=n||{}).children=this.genChildren(i),a.default.cloneElement(t,n)):n?a.default.cloneElement(t,n):t}return t}},{key:"genStatusRelate",value:function(t,e){var n=this,r={},i=this.getStatusList(t,e);return i.list.forEach((function(t,e){var i=new l.default;i.events.push((function(e){var r;n.logic.values=Object.assign({},n.state.status);var i=n.state.status;Object.keys(t.status).forEach((function(e){var n=t.status[e];2===n&&(n=!i[e]),i[e]=n}));var a=n.triggerMotivation(t,n.logic.values,i),o=a.info,s=a.oldValue;i=a.newValue;var u=o.oldEvent&&(r=o.oldEvent).call.apply(r,[n].concat([e,s,i,o.status]));return null!=u?[o,s,i,u]:[o,s,i]})),i.events.push((function(t,e,r,i){var a=void 0,o=[e,r,t.status];Object.keys(t.movt).forEach((function(e){var r;t.movt[e]&&((a=n.props["on"+c.default.upFirstWord(e)])&&(r=a).call.apply(r,[n].concat(o)))}));var s=null!=i?[].concat(o,[i]):o;return n.setState({status:r},(function(){var t=n.props.onChanged;t&&JSON.stringify(r)!=JSON.stringify(e)&&t.call.apply(t,[n].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(s)))})),s})),r[e]=function(t){t.stopPropagation(),i.execute(t)}})),r=Object.assign(r,i.prop)}},{key:"triggerMotivation",value:function(t,e,n){var r=this,i={};this.logic.motivation.forEach((function(e,r){if(null==t.movt[r]){var a=!1,o=!0;e.status.forEach((function(e,r){a=a||null!=t.status[r],o=o&&n[r]==e})),o=a&&o,i[r]=e.trigger}}));var a=Object.keys(i);return t.movt=Object.assign(t.movt||{},i),a.length?(a.forEach((function(i){var a=r.logic.activeStatus.get(i);a&&a.size&&a.forEach((function(a){var o=void 0;switch(r.logic.status.get(a).motivation.get(i)){case 0:o=!1;break;case 1:o=!0;break;case 2:o=2}n[o]=2==o?!e[a]:o,t.status[a]=o}))})),this.triggerMotivation(t,e,n)):{info:t,oldValue:e,newValue:n}}},{key:"render",value:function(){return a.default.createElement("div",null,this.getBone(),this.showState())}}]),e}(i.Component),h=function(){var t=this;this.initStatus=function(){var e={};return t.logic.values.forEach((function(t,n){e[n]=t})),e},this.getBone=function(){var e=t.props.children;if(t.logic.status.size){t.genSignKv(t.logic.status);var n=void 0;return e instanceof Array?(n=t.genStatusRelate(u.default.BASIC,t.props),a.default.createElement("div",n,t.genChildren(e))):((n=t.genStatusRelate(u.default.BASIC,e.props)).children=t.genChildren(e.props.children),a.default.cloneElement(e,n))}return e},this.showState=function(){var e=[];return Object.keys(t.state.status).forEach((function(n){e.push(a.default.createElement("div",null,n," : ",t.state.status[n].toString()))})),e},this.getStatusList=function(e,n){var r=t.signKV.get(e),i=new Map,a=n.className||"",o=n.style||{};return r&&r.forEach((function(e){var r=t.logic.status.get(e);if(r.event.forEach((function(t,r){var a="on"+c.default.upFirstWord(r);i.has(a)||i.set(a,{oldEvent:n[a],status:{}});var o=i.get(a).status;switch(t){case 0:o[e]=!1;break;case 1:o[e]=!0;break;case 2:o[e]=2}})),r.styleToDom){var s=c.default.upFirstWord(t.state.status[e].toString());a+=" "+(r["class"+s]||[]).join(" "),o=Object.assign({},o,r["style"+s])}})),{list:i,prop:{className:a,style:o}}}};v.propTypes={logic:o.default.object},t.exports=v},11:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=s(n(1)),a=s(n(6)),o=s(n(9));function s(t){return t&&t.__esModule?t:{default:t}}var u=function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._status=new Map,this._values=new Map,this._motivation=new Map,this._activeStatus=new Map,i.default.isKVObjectWithStringKey(e)&&(this._status=i.default.objectToMap(e),this._status.forEach((function(t,e){n._status.set(e,new a.default(i.default.isKVObject(t)?t:{})),n._values.set(e,n._status.get(e).defaultState)})))}return r(t,[{key:"addMotivation",value:function(t,e){var n=e.status,r=e.trigger,a=void 0!==r&&r;if(i.default.isStringWithoutNull(t))if(this.motivation.has(t))console.error("motivation have the "+t);else if(i.default.isKVObjectWithStringKey(n)){for(var s in n)if(!this._status.has(s))return void console.error("has no status name "+s+".");this._motivation.set(t,new o.default(n,a))}else console.error("status for motivation is not a kv object with string.");else console.error("the name is not a string.")}},{key:"deleteMotivation",value:function(t){if(i.default.isStringWithoutNull(t)&&this.motivation.has(t)){var e=!0,n=!1,r=void 0;try{for(var a,o=Object.keys(this.status)[Symbol.iterator]();!(e=(a=o.next()).done);e=!0){var s=a.value;if(this._status.get(s)._motivation.has(t))return void console.error("has status contain motivation name "+t)}}catch(t){n=!0,r=t}finally{try{!e&&o.return&&o.return()}finally{if(n)throw r}}this._motivation.delete(t)}else console.log("motivation name "+t+" is not right")}},{key:"addStatus",value:function(t,e){if(i.default.isStringWithoutNull(t)&&!this.status.has(t)&&i.default.isKVObjectWithStringKey(e)){var n=new a.default(e);this._status.set(t,n),this._values.set(t,n.defaultState)}}},{key:"deleteStatus",value:function(t){if(i.default.isStringWithoutNull(t)&&this._status.has(t)){var e=!0,n=!1,r=void 0;try{for(var a,o=this._motivation.keys()[Symbol.iterator]();!(e=(a=o.next()).done);e=!0){var s=a.value;if(this._motivation.get(s).status.has(t))return void console.log("has motivation judge by status named "+t)}}catch(t){n=!0,r=t}finally{try{!e&&o.return&&o.return()}finally{if(n)throw r}}this._status.delete(t)}else console.error("status name "+t+" is not right")}},{key:"setStatusMotivation",value:function(t,e,n){if(i.default.isStringWithoutNull(t)&&i.default.isStringWithoutNull(e))if(this._motivation.has(t)&&this.status.has(e)){var r=this._motivation.get(t),a=!0,o=!1,s=void 0;try{for(var u,l=Object.keys(r.status)[Symbol.iterator]();!(a=(u=l.next()).done);a=!0){if(u.value===e)return void console.error("the motivation "+t+" contains the status "+e)}}catch(t){o=!0,s=t}finally{try{!a&&l.return&&l.return()}finally{if(o)throw s}}this._status.get(e).setMotivation(t,n),this._activeStatus.has(t)||this._activeStatus.set(t,new Set),this._activeStatus.get(t).add(e)}else console.error("have no motivation name "+t+" or have no status name "+e);else console.error("motivation or status name not right.")}},{key:"deleteStatusMotivation",value:function(t,e){i.default.isStringWithoutNull(t)&&i.default.isStringWithoutNull(e)?this._motivation.has(t)&&this._status.has(e)?(this._status.get(e).deleteMotivation(t),this._activeStatus.get(t).delete(e)):console.error("have no motivation name "+t+" or have no status name "+e):console.error("motivation or status name not right.")}},{key:"values",get:function(){return this._values},set:function(t){this._values=t}},{key:"motivation",get:function(){return this._motivation},set:function(t){this._motivation=t}},{key:"activeStatus",get:function(){return this._activeStatus},set:function(t){this._activeStatus=t}},{key:"status",get:function(){return this._status},set:function(t){this._status=t}}]),t}();t.exports=u,e.default=u},2:function(t,e){t.exports=require("prop-types")},6:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(1),o=(r=a)&&r.__esModule?r:{default:r};var s=function(){function t(e){var n=e.target,r=e.styleToDom,i=void 0===r||r,a=e.classTrue,s=e.classFalse,u=e.styleTrue,l=e.styleFalse,c=e.defaultState,f=void 0!==c&&c,v=e.event;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._target=o.default.isStringWithoutNull(n)?n:t.BASIC,this._styleToDom=!!i,this.coverClassTrue(a),this.coverClassFalse(s),this._styleTrue=o.default.isKVObjectWithStringKey(u)?u:{},this._styleFalse=o.default.isKVObjectWithStringKey(l)?l:{},this._defaultState=!!f,this._event=this.coverEvent(v),this._motivation=new Map}return i(t,[{key:"addClassTrue",value:function(t){var e=o.default.getArrayWithString(t),n=!0,r=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var u=a.value;this._classTrue.add(u)}}catch(t){r=!0,i=t}finally{try{!n&&s.return&&s.return()}finally{if(r)throw i}}}},{key:"coverClassTrue",value:function(t){var e=o.default.getArrayWithString(t);this._classTrue=new Set(e)}},{key:"removeClassTrue",value:function(t){var e=o.default.getArrayWithString(t),n=!0,r=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var u=a.value;this._classTrue.delete(u)}}catch(t){r=!0,i=t}finally{try{!n&&s.return&&s.return()}finally{if(r)throw i}}}},{key:"clearClassTrue",value:function(){this._classTrue.clear()}},{key:"addClassFalse",value:function(t){var e=o.default.getArrayWithString(t),n=!0,r=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var u=a.value;this._classFalse.add(u)}}catch(t){r=!0,i=t}finally{try{!n&&s.return&&s.return()}finally{if(r)throw i}}}},{key:"coverClassFalse",value:function(t){var e=o.default.getArrayWithString(t);this._classFalse=new Set(e)}},{key:"removeClassFalse",value:function(t){var e=o.default.getArrayWithString(t),n=!0,r=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var u=a.value;this._classFalse.delete(u)}}catch(t){r=!0,i=t}finally{try{!n&&s.return&&s.return()}finally{if(r)throw i}}}},{key:"clearClassFalse",value:function(){this._classFalse.clear()}},{key:"clearClass",value:function(){this.clearClassTrue(),this.clearClassFalse()}},{key:"mergeStyleTrue",value:function(t){if(o.default.isKVObjectWithStringKey(t))for(var e in Object.keys(t))this._styleTrue.set(e,t[e])}},{key:"coverStyleTrue",value:function(t){o.default.isKVObjectWithStringKey(t)&&(this._styleTrue=o.default.objectToMap(t))}},{key:"clearStyleTrue",value:function(){this._styleTrue.clear()}},{key:"mergeStyleFalse",value:function(t){if(o.default.isKVObjectWithStringKey(t))for(var e in Object.keys(t))this._styleFalse.set(e,t[e])}},{key:"coverStyleFalse",value:function(t){o.default.isKVObjectWithStringKey(t)&&(this._styleFalse=o.default.objectToMap(t))}},{key:"clearStyleFalse",value:function(){this._styleFalse.clear()}},{key:"clearStyle",value:function(){this.clearStyleTrue(),this.clearStyleFalse()}},{key:"inev",value:function(e){return t.EVENT_VALUE.indexOf(e)>-1||"function"==typeof e}},{key:"coverEvent",value:function(t){for(var e in t=o.default.objectToMap(t))this.inev(t)||(console.log("has event value not in [0,1,2]"),t.delete(e));return t}},{key:"setEvent",value:function(t,e){o.default.isStringWithoutNull(t)&&this.inev(e)&&this._event.set(t,e)}},{key:"deleteEvent",value:function(t){o.default.isStringWithoutNull(t)&&this._event.has(t)&&this._event.delete(t)}},{key:"clearEvent",value:function(){this._event.clear()}},{key:"getEventByKey",value:function(t){return o.default.isStringWithoutNull(t)&&this._event.has(t)?this._event.get(t):-1}},{key:"setMotivation",value:function(t,e){o.default.isStringWithoutNull(t)&&this.inev(e)&&this.motivation.set(t,e)}},{key:"deleteMotivation",value:function(t){o.default.isStringWithoutNull(t)&&this._motivation.has(t)&&this._motivation.delete(t)}},{key:"clearMotivation",value:function(){this._motivation.clear()}},{key:"getMotivationBykey",value:function(t){return o.default.isStringWithoutNull(t)&&this._motivation.has(t)?this._motivation.get(t):-1}},{key:"styleToDom",get:function(){return this._styleToDom},set:function(t){this._styleToDom=!!t}},{key:"classTrue",get:function(){return this._classTrue}},{key:"classFalse",get:function(){return this._classFalse}},{key:"styleTrue",get:function(){return this._styleTrue}},{key:"styleFalse",get:function(){return this._styleFalse}},{key:"defaultState",get:function(){return this._defaultState},set:function(t){this._defaultState=!!t}},{key:"event",get:function(){return this._event}},{key:"motivation",get:function(){return this._motivation}},{key:"target",get:function(){return this._target},set:function(t){this._target=t}}]),t}();s.EVENT_VALUE=[0,1,2],s.BASIC=Symbol("basic"),e.default=s},9:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(1),o=(r=a)&&r.__esModule?r:{default:r};function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var u=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];s(this,t),this.coverStatus(e),this._trigger=!!n,this._object=e,this._trigger=n}return i(t,[{key:"coverStatus",value:function(t){for(var e in this._status=new Map,o.default.isKVObjectWithStringKey(t)&&(this._status=o.default.objectToMap(t)),this._status)this._status.set(e,!!this._status.get(e))}},{key:"setStatus",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];o.default.isStringWithoutNull(t)&&this._status.set(t,!!e)}},{key:"deleteStatus",value:function(t){o.default.isStringWithoutNull(t)&&this._status.has(t)&&this._status.delete(t)}},{key:"clearStatus",value:function(){this._status.clear()}},{key:"trigger",get:function(){return this._trigger},set:function(t){this._trigger=t}},{key:"status",get:function(){return this._status}}]),t}();e.default=u}});