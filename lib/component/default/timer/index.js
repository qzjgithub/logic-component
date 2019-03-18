'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _Util = require('../../../common/Util');

require('./index.styl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _select2.default.Option;

var HOUR_RANGE = {
    min: 0,
    max: 23,
    interval: 1,
    arr: null
};
var MINUTE_RANGE = {
    min: 0,
    max: 59,
    interval: 1,
    arr: null
};
var SECOND_RANGE = {
    min: 0,
    max: 59,
    interval: 1,
    arr: null
};

var Timer = function (_Component) {
    _inherits(Timer, _Component);

    function Timer(props, context) {
        _classCallCheck(this, Timer);

        var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.state = _this.getValueAndArray(props, {});
        return _this;
    }

    _createClass(Timer, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps) {
                this.setState(Object.assign(this.state, this.getValueAndArray(Object.assign({}, this.props, nextProps), this.state)));
            }
        }

        /**
         * 根据props得到当前的数组和值
         * @param props
         * @param state
         * @returns {{hourArr: (Array|*), hour: *, minuteArr: (Array|*), minute: *, secondArr: (Array|*), second: *}}
         */


        /**
         * 根据模板range,和传入的range得到数组
         * @param temRange
         * @param tarRange
         */


        /**
         * 根据最大值最小值和间隔生成数组
         * @param min
         * @param max
         * @param interval
         * @returns {Array}
         */


        /**
         * 根据默认值，state中的值，props中的值和数组得到最新值
         * @param def
         * @param sv
         * @param pv
         * @param arr
         * @returns {*}
         */


        /**
         * 检验值是否在数组中
         * @param v
         * @param arr
         * @returns {*}
         */


        /**
         * 检测值是否符合最低模板规范
         * @param value
         * @param category
         * @returns {boolean}
         */


        /**
         * 根据数组得到选择项
         * @param arr
         */

    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'Timer' },
                [].concat(_toConsumableArray(this.getHourDom()), _toConsumableArray(this.getMinuteDom()), _toConsumableArray(this.getSecondDom()))
            );
        }
    }]);

    return Timer;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.getValueAndArray = function (props, state) {
        var hourArr = _this2.getArray(HOUR_RANGE, props.hourRange);
        var hour = _this2.getValidValue(props.hourDef, state.hour, props.hour, hourArr);
        var minuteArr = _this2.getArray(MINUTE_RANGE, props.minuteRange);
        var minute = _this2.getValidValue(props.minuteDef, state.minute, props.minute, minuteArr);
        var secondArr = _this2.getArray(SECOND_RANGE, props.secondRange);
        var second = _this2.getValidValue(props.secondDef, state.second, props.second, secondArr);
        return { hourArr: hourArr, hour: hour, minuteArr: minuteArr, minute: minute, secondArr: secondArr, second: second };
    };

    this.getArray = function (temRange, tarRange) {
        var range = Object.assign({}, temRange, tarRange);
        var min = range.min,
            max = range.max,
            interval = range.interval,
            arr = range.arr;

        if (arr instanceof Array && arr.length) {
            arr = arr.filter(function (v) {
                return _this2.validNum(v, temRange);
            }).sort();
        } else {
            arr = [];
        }
        if (!arr.length) {
            min = _this2.validNum(min, temRange) ? min : temRange.min;
            max = _this2.validNum(max, temRange) ? max : temRange.max;
            interval = (0, _Util.isInteger)(interval) ? interval : temRange.interval;
            if (interval > max - min && interval === 0) {
                interval = 1;
            }
            if (min <= max) {
                arr = _this2.genArray(min, max, interval);
            } else {
                arr = _this2.genArray(temRange.min, temRange.max, temRange.max);
            }
        }
        return arr;
    };

    this.genArray = function (min, max, interval) {
        var arr = [];
        for (var i = min; i <= max;) {
            arr.push(i);
            i += interval;
        }
        return arr;
    };

    this.getValidValue = function (def, sv, pv, arr) {
        var value = void 0;
        switch (true) {
            case (0, _Util.isInteger)(pv):
                value = _this2.validValueInArr(pv, arr);
                break;
            case (0, _Util.isInteger)(sv):
                value = _this2.validValueInArr(sv, arr);
                break;
            case (0, _Util.isInteger)(def):
                value = _this2.validValueInArr(def, arr);
                break;
            default:
                value = arr[0];
        }
        return value;
    };

    this.validValueInArr = function (v, arr) {
        return arr.indexOf(v) > -1 ? v : arr[0];
    };

    this.validNum = function (value, category) {
        Object.assign({}, MINUTE_RANGE, category);
        return (0, _Util.isInteger)(value) && value <= category.max && value >= category.min;
    };

    this.getOptionDom = function (arr) {
        return arr.map(function (v, i) {
            return _react2.default.createElement(
                Option,
                { value: v, key: i },
                (0, _Util.patchZero)(v)
            );
        });
    };

    this.setValue = function (value, type) {
        _this2.setState(_defineProperty({}, type, value), function () {
            if (_this2.props.onChange) {
                _this2.props.onChange(_this2.getValue(), _this2.getFormatValue());
            }
        });
    };

    this.getHourDom = function () {
        var dom = [];
        if (!_this2.props.hourHide) {
            dom.push(_react2.default.createElement(
                _select2.default,
                { value: _this2.state.hour, onSelected: function onSelected(value) {
                        return _this2.setValue(value, 'hour');
                    } },
                _this2.getOptionDom(_this2.state.hourArr)
            ));
            dom.push(_react2.default.createElement(
                'span',
                null,
                _this2.props.hourText || '时'
            ));
        }
        return dom;
    };

    this.getMinuteDom = function () {
        var dom = [];
        if (!_this2.props.minuteHide) {
            dom.push(_react2.default.createElement(
                _select2.default,
                { value: _this2.state.minute, onSelected: function onSelected(value) {
                        return _this2.setValue(value, 'minute');
                    } },
                _this2.getOptionDom(_this2.state.minuteArr)
            ));
            dom.push(_react2.default.createElement(
                'span',
                null,
                _this2.props.minuteText || '分'
            ));
        }
        return dom;
    };

    this.getSecondDom = function () {
        var dom = [];
        if (!_this2.props.secondHide) {
            dom.push(_react2.default.createElement(
                _select2.default,
                { value: _this2.state.second, onSelected: function onSelected(value) {
                        return _this2.setValue(value, 'second');
                    } },
                _this2.getOptionDom(_this2.state.secondArr)
            ));
            dom.push(_react2.default.createElement(
                'span',
                null,
                _this2.props.secondText || '秒'
            ));
        }
        return dom;
    };

    this.getValue = function () {
        return {
            hour: _this2.state.hour,
            minute: _this2.state.minute,
            second: _this2.state.second
        };
    };

    this.getFormatValue = function () {
        var format = _this2.props.format;
        if (!(0, _Util.isRealOrZero)(format)) {
            format = 'hh:mm:ss';
        }
        return format.replace('hh', (0, _Util.patchZero)(_this2.state.hour)).replace('mm', (0, _Util.patchZero)(_this2.state.minute)).replace('ss', (0, _Util.patchZero)(_this2.state.second));
    };
};

Timer.propTypes = {
    format: _propTypes2.default.string, //hh:mm:ss
    hourHide: _propTypes2.default.bool,
    minuteHide: _propTypes2.default.bool,
    secondHide: _propTypes2.default.bool,
    hourRange: _propTypes2.default.object, //{ min: 0, max: 23, interval: 1, arr: [0,1,2]}
    minuteRange: _propTypes2.default.object,
    secondRange: _propTypes2.default.object,
    hourDef: _propTypes2.default.number,
    minuteDef: _propTypes2.default.number,
    secondDef: _propTypes2.default.number,
    hour: _propTypes2.default.number,
    minute: _propTypes2.default.number,
    second: _propTypes2.default.number,
    hourText: _propTypes2.default.string,
    minuteText: _propTypes2.default.string,
    secondText: _propTypes2.default.string,
    onChange: _propTypes2.default.func
};

exports.default = Timer;