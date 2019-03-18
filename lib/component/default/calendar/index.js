'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.styl');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

var _timer = require('../timer');

var _timer2 = _interopRequireDefault(_timer);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Util = require('../../../common/Util');

var _i18n = require('./i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _select2.default.Option;

var TYPES = ['year', 'month', 'date', 'hour', 'minute', 'second'];

var Calendar = function (_Component) {
    _inherits(Calendar, _Component);

    function Calendar(props, context) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.initParam(null, _this.props);
        var date = _this.getDate();
        _moment2.default.locale(_this.props.lang || 'zh');
        _this.state = Object.assign(_this.initData(), {
            valid: true,
            date: date
        });
        return _this;
    }

    _createClass(Calendar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setTimer();
            this.setState({
                valid: this.getValid(this.state.date)
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (nextProps) {
                var datetime = nextProps.date || this.state.date;
                this.initParam(datetime, nextProps);
                if (datetime) {
                    datetime = (0, _moment2.default)(this.date);
                }
                this.setState(_extends({}, this.initData(), {
                    date: datetime,
                    valid: this.getValid(datetime)
                }), function () {
                    _this2.setTimer();
                });
            }
        }

        /**
         * 初始化参数
         */


        /**
         * 初始化日历值
         * @returns {{year: *, yearArr: Array}}
         */

    }, {
        key: 'render',
        value: function render() {
            var timerConfig = this.props.timerConfig;

            var showTimer = timerConfig !== false;
            if (showTimer) {
                timerConfig = this.genTimerConfig(this.state.date);
            }
            var _state = this.state,
                hour = _state.hour,
                minute = _state.minute,
                second = _state.second;

            timerConfig = Object.assign(timerConfig || {}, { hour: hour, minute: minute, second: second });
            var leftDisabled = false;
            var cur = (0, _moment2.default)().year(this.state.year).month(this.state.month);
            if (this.minDate && this.minDate.isSameOrAfter(cur, 'month')) {
                leftDisabled = true;
            }
            var rightDisabled = false;
            if (this.maxDate && this.maxDate.isSameOrBefore(cur, 'month')) {
                rightDisabled = true;
            }
            return _react2.default.createElement(
                'section',
                { className: 'Calendar' },
                _react2.default.createElement(
                    'header',
                    null,
                    _react2.default.createElement(_icon2.default, { type: 'zuo', onClick: this.subtractMonth,
                        className: leftDisabled ? 'disabled' : '' }),
                    _react2.default.createElement(
                        _select2.default,
                        { value: this.state.year, onSelected: this.setYear },
                        this.genYearDom()
                    ),
                    _react2.default.createElement(
                        _select2.default,
                        { value: this.state.month, onSelected: this.setMonth },
                        this.genMonthDom()
                    ),
                    _react2.default.createElement(_icon2.default, { type: 'gengduo', onClick: this.addMonth,
                        className: rightDisabled ? 'disabled' : '' })
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    this.genWeekDom()
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    this.genDateDom()
                ),
                showTimer && _react2.default.createElement(
                    'footer',
                    null,
                    _react2.default.createElement(_timer2.default, _extends({}, timerConfig, { ref: 'timer' }))
                )
            );
        }
    }]);

    return Calendar;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.initParam = function (datetime, props) {
        datetime = datetime || props.date || props.initDate || (0, _moment2.default)();
        if (!_moment2.default.isMoment(datetime)) {
            console.log('initDate is not moment');
            datetime = (0, _moment2.default)();
        }
        _this3.date = (0, _moment2.default)(datetime);

        var minDate = props.minDate,
            maxDate = props.maxDate;

        if (minDate && _moment2.default.isMoment(minDate)) {
            _this3.minDate = (0, _moment2.default)(minDate);
        } else {
            _this3.minDate = null;
        }
        if (maxDate && _moment2.default.isMoment(maxDate)) {
            _this3.maxDate = (0, _moment2.default)(maxDate);
        } else {
            _this3.maxDate = null;
        }
        if (_this3.minDate && _this3.maxDate && _this3.minDate.isAfter(_this3.maxDate, 'second')) {
            _this3.minDate = null;
            _this3.maxDate = null;
        }
        if (_this3.compareDate(_this3.date, 'second') !== 0) {
            _this3.date = _this3.minDate || _this3.maxDate;
            if (_moment2.default.isMoment(_this3.date)) {
                _this3.date = (0, _moment2.default)(_this3.date);
            }
        }
    };

    this.initData = function () {
        var datetime = _this3.date;
        var year = datetime.year();
        var month = datetime.month();
        var date = datetime.date();
        var days = datetime.daysInMonth();
        var hour = datetime.hour();
        var minute = datetime.minute();
        var second = datetime.second();

        var compareFlag = _this3.minDate || _this3.maxDate;
        return {
            year: year,
            yearArr: _this3.genYearArr(year, compareFlag && datetime),
            month: month,
            monthArr: _this3.genMonthArr(month, compareFlag && datetime),
            dateArr: _this3.genDateArr(date, datetime, days),
            hour: hour,
            minute: minute,
            second: second
        };
    };

    this.getDate = function (datetime) {
        datetime = datetime || (_this3.state || {}).date || _this3.props.date || _this3.props.initDate;
        if (datetime && _moment2.default.isMoment(datetime) && _this3.compareDate(datetime, 'date') === 0) {
            datetime;
        } else {
            return null;
        }
    };

    this.genYearArr = function (year, datetime) {
        var arr = [];
        for (var i = 0; i >= -10; i--) {
            var cur = year + i;
            var res = 0;
            if (datetime) {
                res = _this3.compareDate(datetime.year(cur), 'year');
                if (res === -1) {
                    break;
                } else if (res === 1) {
                    continue;
                }
            }
            arr.unshift(cur);
        }
        for (var j = 1; j <= 10; j++) {
            var _cur = year + j;
            var _res = 0;
            if (datetime) {
                _res = _this3.compareDate(datetime.year(_cur), 'year');
                if (_res === 1) {
                    break;
                } else if (_res === -1) {
                    continue;
                }
            }
            arr.push(_cur);
        }
        datetime && datetime.year(year);
        return arr;
    };

    this.genMonthArr = function (month, datetime) {
        var arr = [];
        for (var i = 0; i < 12; i++) {
            var res = 0;
            if (datetime) {
                res = _this3.compareDate(datetime.month(i), 'month');
                if (res === 1) {
                    break;
                } else if (res === -1) {
                    continue;
                }
            }
            arr.push(i);
        }
        datetime && datetime.month(month);
        return arr;
    };

    this.genDateArr = function (date, datetime, days) {
        datetime.date(1);
        var week = datetime.weekday();
        var arr = [];
        for (var i = 0; i < week; i++) {
            arr.push(null);
        }
        for (var j = 0; j < days; j++) {
            var res = 0;
            datetime.date(j + 1);
            res = _this3.compareDate(datetime, 'date');
            res === 0 ? arr.push(!_this3.isDisableDate(datetime)) : arr.push(false);
        }
        return arr;
    };

    this.genTimerConfig = function (datetime) {
        var timerConfig = _this3.props.timerConfig || {};
        var _onChange = timerConfig.onChange;
        return Object.assign({}, timerConfig, {
            hourRange: _this3.genMinMax(datetime, 3),
            minuteRange: _this3.genMinMax(datetime, 4),
            secondRange: _this3.genMinMax(datetime, 5),
            onChange: function onChange(value, text) {
                var date = _this3.state.date;
                if (date && _moment2.default.isMoment(date)) {
                    date.hour(value.hour).minute(value.minute).second(value.second);
                }
                var valid = _this3.getValid(date);
                if (_onChange) {
                    _onChange(value, text);
                }
                _this3.setState(_extends({}, value, {
                    date: date,
                    valid: valid
                }), function () {
                    _this3.triggerOnChange();
                });
            }
        });
    };

    this.isDisableDate = function (datetime) {
        var disableDate = _this3.props.disableDate;

        var flag = true;
        if (disableDate) {
            datetime.hour(0).minute(0).second(0);
            if (!disableDate((0, _moment2.default)(datetime))) {
                flag = false;
            } else {
                datetime.hour(23).minute(59).second(59);
                if (!disableDate((0, _moment2.default)(datetime))) {
                    flag = false;
                }
            }
        } else {
            flag = false;
        }
        return flag;
    };

    this.compareDate = function (datetime, type) {
        if (_this3.minDate && datetime.isBefore(_this3.minDate, type)) {
            return -1;
        }
        if (_this3.maxDate && datetime.isAfter(_this3.maxDate, type)) {
            return 1;
        }
        return 0;
    };

    this.genMinMax = function (datetime, tyInd) {
        var key = TYPES[tyInd] + 'Range';
        var obj = (_this3.props.timerConfig || {})[key] || {};
        obj = JSON.parse(JSON.stringify(obj));
        if (!datetime) {
            return obj;
        }
        var min = void 0,
            max = void 0;
        if (_this3.minDate && _this3.minDate.isSame(datetime, TYPES[tyInd - 1])) {
            min = _this3.minDate[TYPES[tyInd]]();
            if ((0, _Util.isRealOrZero)(obj.min) && obj.min > min) {
                min = obj.min;
            }
            obj.min = min;
        }
        if (_this3.maxDate && _this3.maxDate.isSame(datetime, TYPES[tyInd - 1])) {
            max = _this3.maxDate[TYPES[tyInd]]();
            if ((0, _Util.isRealOrZero)(obj.max) && obj.max < max) {
                max = obj.max;
            }
            obj.max = max;
        }
        return obj;
    };

    this.genYearDom = function () {
        return _this3.state.yearArr.map(function (v) {
            return _react2.default.createElement(
                Option,
                { value: v, key: v },
                (0, _Util.patchZero)(v, 4)
            );
        });
    };

    this.genMonthDom = function () {
        var texts = _moment2.default.monthsShort();
        return _this3.state.monthArr.map(function (v) {
            return _react2.default.createElement(
                Option,
                { value: v, key: v },
                texts[v]
            );
        });
    };

    this.genWeekDom = function () {
        var texts = _moment2.default.weekdaysMin();
        var sunday = texts.shift();
        texts.push(sunday);
        return texts.map(function (v, ind) {
            return _react2.default.createElement(
                'li',
                { value: ind, key: ind },
                v
            );
        });
    };

    this.genDateDom = function () {
        var day = 0;
        var cur = (0, _moment2.default)().year(_this3.state.year).month(_this3.state.month);
        var date = _this3.state.date;
        return _this3.state.dateArr.map(function (v, index) {
            if (v === null) {
                return _react2.default.createElement(
                    'span',
                    { className: 'empty' },
                    ' '
                );
            } else {
                day++;
                cur.date(day);
                var cls = '';
                if (v === false) {
                    cls += 'disabled ';
                }
                if (date && date.isSame(cur, 'date')) {
                    cls += 'selected ';
                }
                if (_this3.props.signToday !== false && (0, _moment2.default)().isSame(cur, 'date')) {
                    cls += 'today ';
                }
                return _react2.default.createElement(
                    'span',
                    { className: cls, onClick: function onClick() {
                            return _this3.setDate(index);
                        } },
                    day
                );
            }
        });
    };

    this.getMinDayDate = function () {
        return (0, _moment2.default)().year(_this3.state.year).month(_this3.state.month).date(1).hour(_this3.state.hour).minute(_this3.state.minute).second(_this3.state.second);
    };

    this.addMonth = function () {
        _this3.date = _this3.getMinDayDate().add(1, 'months');
        _this3.setState(_this3.initData());
    };

    this.subtractMonth = function () {
        _this3.date = _this3.getMinDayDate().subtract(1, 'months');
        _this3.setState(_this3.initData());
    };

    this.setYear = function (value) {
        _this3.date = _this3.getMinDayDate().year(value);
        _this3.setState(_this3.initData());
    };

    this.setMonth = function (value) {
        _this3.date = _this3.getMinDayDate().month(value);
        _this3.setState(_this3.initData());
    };

    this.setDate = function (index) {
        var datetime = _this3.getMinDayDate();
        var weekday = datetime.weekday();
        datetime.date(index - weekday + 1);
        _this3.setState({
            date: datetime,
            valid: _this3.getValid(datetime)
        }, function () {
            _this3.setTimer(_this3.triggerOnChange);
        });
    };

    this.getValid = function (date) {
        var valid = true;
        if (date) {
            if (_this3.compareDate(date) === 0) {
                if (_this3.props.disableDate && _this3.props.disableDate((0, _moment2.default)(date))) {
                    valid = false;
                }
            } else {
                valid = false;
            }
        }
        return valid;
    };

    this.setTimer = function (callback) {
        var timer = _this3.refs['timer'];
        if (_this3.props.timerConfig !== false && timer) {
            _this3.setState(timer.getValue(), function () {
                callback && callback();
            });
        } else {
            callback && callback();
        }
    };

    this.triggerOnChange = function () {
        if (_this3.props.onChange) {
            var _getValue = _this3.getValue(),
                value = _getValue.value,
                valid = _getValue.valid;

            _this3.props.onChange(value, valid);
        }
    };

    this.getValue = function () {
        var datetime = _this3.state.date;
        if (datetime && _moment2.default.isMoment(datetime)) {
            datetime.hour(_this3.state.hour).minute(_this3.state.minute).second(_this3.state.second);
        }
        return { value: datetime, valid: _this3.getValid(datetime) };
    };
};

Calendar.propTypes = {
    format: _propTypes2.default.string, //YYYY-MM-DD HH:mm:ss
    disableDate: _propTypes2.default.func,
    initDate: _propTypes2.default.object, //没有默认当前时间
    timerConfig: _propTypes2.default.any, //false表示不展示，配置则读取
    lang: _propTypes2.default.string,
    langObj: _propTypes2.default.object,
    date: _propTypes2.default.object,
    minDate: _propTypes2.default.object,
    maxDate: _propTypes2.default.object,
    signToday: _propTypes2.default.bool,
    onChange: _propTypes2.default.func
};

exports.default = Calendar;