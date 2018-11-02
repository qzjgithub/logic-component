'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _SequenceEvent = require('./SequenceEvent');

var _SequenceEvent2 = _interopRequireDefault(_SequenceEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenBone = function () {

    //target和status组成的KV键值对
    function GenBone(children, logic, state) {
        _classCallCheck(this, GenBone);

        console.log(children);
        this.signKV = new Map();
        this.oldChildren = children;
        this.logic = logic;
        this.state = state;
        this.sequence = new Map();
    }

    //得到dom结构


    _createClass(GenBone, [{
        key: 'get',
        value: function get() {
            if (!this.logic.status.size) {
                return children;
            } else {
                this.genSignKv(this.logic.status);
                this.children = this.genChildren(this.oldChildren);
                return this.children;
            }
        }

        //生成targetKV键值对

    }, {
        key: 'genSignKv',
        value: function genSignKv(status) {
            var _this = this;

            status.forEach(function (state, key) {
                var sign = state.target;
                if (!_this.signKV.has(sign)) {
                    _this.signKV.set(sign, new Set());
                }
                _this.signKV.get(sign).add(key);
            });
        }

        //嵌套生成dom

    }, {
        key: 'genChildren',
        value: function genChildren(element) {
            var _this2 = this;

            if (_Util2.default.isArray(element) && element.length) {
                return element.map(function (child) {
                    return _this2.genChildren(child);
                });
            } else if (_Util2.default.isKVObject(element)) {
                var props = {},
                    sign = element.props.sign;
                if (sign && this.signKV.has(sign)) {
                    this.genStatusRelate(sign, element, props);
                }
                var _children = element.props && element.props.children;
                if (_children && _Util2.default.isArray(_children) && _children.length) {
                    return _react2.default.cloneElement(element, {
                        children: this.genChildren(_children)
                    });
                } else {
                    return _react2.default.cloneElement(element, this.genStatusRelate(element.props.sign, element.props));
                }
            } else {
                return element;
            }
        }

        //生成对象关联status

    }, {
        key: 'genStatusRelate',
        value: function genStatusRelate(sign, props) {
            var _this3 = this;

            var newProps = {};
            var statusSet = this.signKV.has(sign) && this.signKV.get(sign);
            statusSet && statusSet.forEach(function (state) {
                var status = _this3.logic.status.get(state);
                status.event.forEach(function (value, event) {
                    var name = 'on' + _Util2.default.upFirstWord(event);
                    var oldEvent = props[name];
                    var seq = new _SequenceEvent2.default();
                    var oldValue = _this3.state.status.get(state);
                    var newValue = oldValue;
                    switch (value) {
                        case 0:
                            newValue = false;
                            break;
                        case 1:
                            newValue = true;
                            break;
                        case 3:
                            newValue = !oldValue;
                    }
                    seq.events.push(function () {
                        for (var _len = arguments.length, param = Array(_len), _key = 0; _key < _len; _key++) {
                            param[_key] = arguments[_key];
                        }

                        console.log("change state");
                        _this3.setState({
                            status: _defineProperty({}, state, newValue)
                        });
                        return [].concat(param, [_this3.logic.value, _this3.state.status]);
                    });
                    seq.events.push(function () {
                        for (var _len2 = arguments.length, param = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                            param[_key2] = arguments[_key2];
                        }

                        console.log("execute old function");
                        var result = oldEvent.call.apply(oldEvent, [_this3].concat(param));
                        var len = param.length;
                        _this3.logic.value = _this3.state.status;
                        return _Util2.default.isArray(result) ? [].concat(_toConsumableArray(result), [param[len - 2], param[len - 1]]) : [result, param[len - 2], param[len - 1]];
                    });
                    newProps[name] = function () {
                        seq.execute.apply(seq, arguments);
                    };
                });
            });
            return newProps;
        }
    }]);

    return GenBone;
}();

exports.default = GenBone;