'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Status = function () {
    //状态绑定的事件
    /**
     * 事件对应值会有不同响应
     * 0 表示总是响应为未激活,state变为false
     * 1 表中总是响应为激活,state变为true
     * 2 表示总是响应为相反状态，state变为!state
     *
     */
    // click: 0,//0,1,2

    //状态未激活样式，覆盖class

    //状态未激活样式class

    //是否将状态绑定样式作用到Dom上,Boolean
    function Status(_ref) {
        var target = _ref.target,
            _ref$styleToDom = _ref.styleToDom,
            styleToDom = _ref$styleToDom === undefined ? true : _ref$styleToDom,
            classTrue = _ref.classTrue,
            classFalse = _ref.classFalse,
            styleTrue = _ref.styleTrue,
            styleFalse = _ref.styleFalse,
            _ref$defaultState = _ref.defaultState,
            defaultState = _ref$defaultState === undefined ? false : _ref$defaultState,
            event = _ref.event;

        _classCallCheck(this, Status);

        this._target = _Util2.default.isStringWithoutNull(target) ? target : Status.BASIC;
        this._styleToDom = !!styleToDom;
        this._classTrue = _Util2.default.getArrayWithString(classTrue);
        this._classFalse = _Util2.default.getArrayWithString(classFalse);
        this._styleTrue = _Util2.default.isKVObjectWithStringKey(styleTrue) ? styleTrue : {};
        this._styleFalse = _Util2.default.isKVObjectWithStringKey(styleFalse) ? styleFalse : {};

        this._defaultState = !!defaultState;
        this._event = this.coverEvent(event);
        this._motivation = new Map();
    }

    //自定义激励集

    //状态默认激活状态

    //状态激活样式，覆盖class

    //状态激活样式class,Array


    //作用对象


    _createClass(Status, [{
        key: 'addClassTrue',


        /**
         * 添加classTrue
         * @param clazzs
         */
        value: function addClassTrue(clazzs) {
            var clzArr = _Util2.default.getArrayWithString(clazzs);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = clzArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var clz = _step.value;

                    this._classTrue.add(clz);
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
        }

        /**
         * 覆盖classTrue
         * @param clazzs
         */

    }, {
        key: 'coverClassTrue',
        value: function coverClassTrue(clazzs) {
            var clzArr = _Util2.default.getArrayWithString(clazzs);
            this._classTrue = new Set(clzArr);
        }

        /**
         * 移除classTrue
         * @param clazzs
         */

    }, {
        key: 'removeClassTrue',
        value: function removeClassTrue(clazzs) {
            var clzArr = _Util2.default.getArrayWithString(clazzs);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = clzArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var clz = _step2.value;

                    this._classTrue.delete(clz);
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
        }

        /**
         * 清空classTrue
         */

    }, {
        key: 'clearClassTrue',
        value: function clearClassTrue() {
            this._classTrue.clear();
        }

        /**
         * 添加classFalse
         * @param clazzs
         */

    }, {
        key: 'addClassFalse',
        value: function addClassFalse(clazzs) {
            var clzArr = _Util2.default.getArrayWithString(clazzs);
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = clzArr[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var clz = _step3.value;

                    this._classFalse.add(clz);
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
        }

        /**
         * 覆盖classFalse
         * @param clazzs
         */

    }, {
        key: 'coverClassFalse',
        value: function coverClassFalse(clazzs) {
            var clzArr = _Util2.default.getArrayWithString(clazzs);
            this._classFalse = new Set(clzArr);
        }

        /**
         * 移除classFalse
         * @param clazzs
         */

    }, {
        key: 'removeClassFalse',
        value: function removeClassFalse(clazzs) {
            var clzArr = _Util2.default.getArrayWithString(clazzs);
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = clzArr[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var clz = _step4.value;

                    this._classFalse.delete(clz);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }

        /**
         * 清空classFalse
         */

    }, {
        key: 'clearClassFalse',
        value: function clearClassFalse() {
            this._classFalse.clear();
        }

        /**
         * 清空所有class
         */

    }, {
        key: 'clearClass',
        value: function clearClass() {
            this.clearClassTrue();
            this.clearClassFalse();
        }

        /**
         * 合入styleTrue
         * @param styles
         */

    }, {
        key: 'mergeStyleTrue',
        value: function mergeStyleTrue(styles) {
            if (_Util2.default.isKVObjectWithStringKey(styles)) {
                for (var key in Object.keys(styles)) {
                    this._styleTrue.set(key, styles[key]);
                }
            }
        }

        /**
         * 覆盖styleTrue
         * @param styles
         */

    }, {
        key: 'coverStyleTrue',
        value: function coverStyleTrue(styles) {
            if (_Util2.default.isKVObjectWithStringKey(styles)) {
                this._styleTrue = _Util2.default.objectToMap(styles);
            }
        }

        /**
         * 清空styleTrue
         */

    }, {
        key: 'clearStyleTrue',
        value: function clearStyleTrue() {
            this._styleTrue.clear();
        }

        /**
         * 合入styleFalse
         * @param styles
         */

    }, {
        key: 'mergeStyleFalse',
        value: function mergeStyleFalse(styles) {
            if (_Util2.default.isKVObjectWithStringKey(styles)) {
                for (var key in Object.keys(styles)) {
                    this._styleFalse.set(key, styles[key]);
                }
            }
        }

        /**
         * 覆盖styleFalse
         * @param styles
         */

    }, {
        key: 'coverStyleFalse',
        value: function coverStyleFalse(styles) {
            if (_Util2.default.isKVObjectWithStringKey(styles)) {
                this._styleFalse = _Util2.default.objectToMap(styles);
            }
        }

        /**
         * 清空styleFalse
         */

    }, {
        key: 'clearStyleFalse',
        value: function clearStyleFalse() {
            this._styleFalse.clear();
        }

        /**
         * 清空所有style
         */

    }, {
        key: 'clearStyle',
        value: function clearStyle() {
            this.clearStyleTrue();
            this.clearStyleFalse();
        }

        /**
         * 是否存在EVNET_VALUE中
         * @param value
         * @returns {boolean}
         */

    }, {
        key: 'inev',
        value: function inev(value) {
            if (Status.EVENT_VALUE.indexOf(value) > -1) {
                return true;
            } else if (typeof value === 'function') {
                return true;
            } else {
                return false;
            }
        }

        /**
         * 重置event
         * @param event
         * @returns {Map<any, any>|*}
         */

    }, {
        key: 'coverEvent',
        value: function coverEvent(event) {
            event = _Util2.default.objectToMap(event);
            for (var key in event) {
                if (!this.inev(event)) {
                    console.log("has event value not in [0,1,2]");
                    event.delete(key);
                }
            }
            return event;
        }

        /**
         * 增加一个event
         * @param event
         * @param type
         */

    }, {
        key: 'setEvent',
        value: function setEvent(event, type) {
            if (_Util2.default.isStringWithoutNull(event) && this.inev(type)) {
                this._event.set(event, type);
            }
        }

        /**
         * 移除一个event
         * @param event
         */

    }, {
        key: 'deleteEvent',
        value: function deleteEvent(event) {
            if (_Util2.default.isStringWithoutNull(event) && this._event.has(event)) {
                this._event.delete(event);
            }
        }

        /**
         * 清空event
         */

    }, {
        key: 'clearEvent',
        value: function clearEvent() {
            this._event.clear();
        }

        /**
         * 得到一个event
         * @param event
         * @returns {*}
         */

    }, {
        key: 'getEventByKey',
        value: function getEventByKey(event) {
            if (!_Util2.default.isStringWithoutNull(event) || !this._event.has(event)) {
                return -1;
            } else {
                return this._event.get(event);
            }
        }

        /**
         * 设置一个motivation
         * @param motivation
         * @param type
         */

    }, {
        key: 'setMotivation',
        value: function setMotivation(motivation, type) {
            if (_Util2.default.isStringWithoutNull(motivation) && this.inev(type)) {
                this.motivation.set(motivation, type);
            }
        }

        /**
         * 删除一个motivation
         * @param motivation
         */

    }, {
        key: 'deleteMotivation',
        value: function deleteMotivation(motivation) {
            if (_Util2.default.isStringWithoutNull(motivation) && this._motivation.has(motivation)) {
                this._motivation.delete(motivation);
            }
        }

        /**
         * 清空motivation
         */

    }, {
        key: 'clearMotivation',
        value: function clearMotivation() {
            this._motivation.clear();
        }

        /**
         * 得到一个motivation的值
         * @param motivation
         * @returns {*}
         */

    }, {
        key: 'getMotivationBykey',
        value: function getMotivationBykey(motivation) {
            if (_Util2.default.isStringWithoutNull(motivation) && this._motivation.has(motivation)) {
                return this._motivation.get(motivation);
            } else {
                return -1;
            }
        }
    }, {
        key: 'styleToDom',
        get: function get() {
            return this._styleToDom;
        },
        set: function set(value) {
            this._styleToDom = !!value;
        }
    }, {
        key: 'classTrue',
        get: function get() {
            return this._classTrue;
        }
    }, {
        key: 'classFalse',
        get: function get() {
            return this._classFalse;
        }
    }, {
        key: 'styleTrue',
        get: function get() {
            return this._styleTrue;
        }
    }, {
        key: 'styleFalse',
        get: function get() {
            return this._styleFalse;
        }
    }, {
        key: 'defaultState',
        get: function get() {
            return this._defaultState;
        },
        set: function set(value) {
            this._defaultState = !!value;
        }
    }, {
        key: 'event',
        get: function get() {
            return this._event;
        }
    }, {
        key: 'motivation',
        get: function get() {
            return this._motivation;
        }
    }, {
        key: 'target',
        get: function get() {
            return this._target;
        },
        set: function set(value) {
            this._target = value;
        }
    }]);

    return Status;
}();

Status.EVENT_VALUE = [0, 1, 2];
Status.BASIC = Symbol('basic');
exports.default = Status;