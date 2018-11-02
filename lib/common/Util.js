'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: 'isUndefined',

        /**
         * 检查是否是undefined
         * @param obj
         */
        value: function isUndefined(object) {
            return object === undefined;
        }

        /**
         * 检查是否是null
         * @param object
         * @returns {boolean}
         */

    }, {
        key: 'isNull',
        value: function isNull(object) {
            return object === null;
        }

        /**
         * 检查是否是string
         * @param object
         * @returns {boolean}
         */

    }, {
        key: 'isString',
        value: function isString(object) {
            return typeof object === 'string';
        }

        /**
         * 是字符串且不是空字符串
         * @param object
         * @returns {boolean}
         */

    }, {
        key: 'isStringWithoutNull',
        value: function isStringWithoutNull(object) {
            return this.isString(object) && object != "";
        }

        /**
         * 检查是否是数组
         * @param object
         * @returns {boolean}
         */

    }, {
        key: 'isArray',
        value: function isArray(object) {
            if (object instanceof Array) {
                return true;
            } else {
                Util.Console('error', 'object is not an Array');
                return false;
            }
        }

        /**
         * 检查是否是只保存了字符串的数组
         * @param object
         */

    }, {
        key: 'isArrayWithString',
        value: function isArrayWithString(object) {
            if (!this.isArray(object)) return false;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = new Set(object)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var obj = _step.value;

                    if (!this.isString(obj) || !obj) {
                        Util.Console('error', 'object inner has a element is not String');
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return true;
        }

        /**
         * 是键值对对象
         * @param object
         * @returns {boolean}
         */

    }, {
        key: 'isKVObject',
        value: function isKVObject(object) {
            if (!this.isUndefined(object) && !this.isNull(object) && object instanceof Object && !(object instanceof Array)) {
                return true;
            } else {
                Util.Console('error', 'object in not an object or is an Array');
                return false;
            }
        }

        /**
         * 是键值对对象且key是string
         * @param object
         * @returns {boolean}
         */

    }, {
        key: 'isKVObjectWithStringKey',
        value: function isKVObjectWithStringKey(object) {
            if (!this.isKVObject(object)) return false;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(object)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var key = _step2.value;

                    if (!this.isStringWithoutNull(key)) {
                        Util.Console('error', 'the object key is not a string or is ""');
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return true;
        }

        /**
         * 将对象转换为map
         * @param object
         * @returns {Map<any, any>}
         */

    }, {
        key: 'objectToMap',
        value: function objectToMap(object) {
            var map = new Map();
            if (!this.isKVObjectWithStringKey(object)) return map;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = Object.keys(object)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var key = _step3.value;

                    map.set(key, object[key]);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            return map;
        }

        /**
         * 将map转换未对象
         * @param object
         */

    }, {
        key: 'mapToObject',
        value: function mapToObject(object) {
            if (object instanceof Map) {
                var o = {};
                object.forEach(function (v, k) {
                    o[k] = v;
                });
            } else {
                return object;
            }
        }

        /**
         * 得到纯字符串的数组
         * @param object 可以是非空字符串和数组
         * @param reg 分割字符串的正则表达式
         */

    }, {
        key: 'getArrayWithString',
        value: function getArrayWithString(object, reg) {
            var clzArr = [];
            if (Util.isStringWithoutNull(object)) {
                clzArr = object.split(' ');
            } else if (Util.isArrayWithString(object)) {
                clzArr = object;
            } else {
                Util.Console('error', 'object is not an array or a string');
            }
            return clzArr;
        }

        /**
         * 将首字母大写
         * @param text
         * @constructor
         */

    }, {
        key: 'upFirstWord',
        value: function upFirstWord(text) {
            if (Util.isStringWithoutNull(text) && new RegExp(/^[a-zA-Z].*$/).test(text)) {
                return text[0].toUpperCase() + text.substring(1);
            } else {
                return text;
            }
        }

        /**
         * 打印开关
         * @param fun
         * @param param
         * @constructor
         */

    }, {
        key: 'Console',
        value: function Console(fun) {
            if (!Util.LOGABLE) {
                return;
            }

            for (var _len = arguments.length, param = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                param[_key - 1] = arguments[_key];
            }

            console[fun](param);
        }
    }]);

    return Util;
}();

Util.LOGABLE = false;


module.exports = Util;