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

var _logical = require('../../../common/logical');

var _logical2 = _interopRequireDefault(_logical);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _logic = require('./logic.js');

var _logic2 = _interopRequireDefault(_logic);

require('./index.styl');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _calendar = require('../calendar');

var _calendar2 = _interopRequireDefault(_calendar);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultFormat = 'YYYY-MM-DD HH:mm:ss';

var DateRangepicker = function (_Component) {
    _inherits(DateRangepicker, _Component);

    function DateRangepicker(props, context) {
        _classCallCheck(this, DateRangepicker);

        var _this = _possibleConstructorReturn(this, (DateRangepicker.__proto__ || Object.getPrototypeOf(DateRangepicker)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.state = _this.initData(props);
        return _this;
    }

    _createClass(DateRangepicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps) {
                var start = nextProps.start,
                    end = nextProps.end;

                this.setState({
                    start: start === undefined ? this.state.start : start,
                    end: end === undefined ? this.state.end : end
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                start = _state.start,
                end = _state.end;

            var text = '';
            if (start && _moment2.default.isMoment(start)) {
                text += start.format(this.props.format || defaultFormat);
                text += ' ~ ';
            }
            if (end && _moment2.default.isMoment(end)) {
                if (!text) {
                    text += ' ~ ';
                }
                text += end.format(this.props.format || defaultFormat);
            }
            if (!text) {
                text = this.props.defaultText || '请选择时间段';
            }
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _button2.default,
                    { sign: 'text', className: 'text', disabled: this.props.disabled },
                    _react2.default.createElement(
                        'span',
                        null,
                        text
                    ),
                    this.props.hasClear !== false && (start || end) && _react2.default.createElement(_icon2.default, { type: 'guanbi1', onClick: this.clear, className: 'date-clear' }),
                    _react2.default.createElement(_icon2.default, { type: 'unfold' })
                ),
                _react2.default.createElement(
                    'div',
                    { sign: 'list', className: 'list' },
                    _react2.default.createElement(_calendar2.default, _extends({}, this.getStartConfig(), { ref: 'start' })),
                    _react2.default.createElement(_calendar2.default, _extends({}, this.getEndConfig(), { ref: 'end' })),
                    _react2.default.createElement(
                        'p',
                        { className: 'control' },
                        this.props.hasClear !== false && (start || end) && _react2.default.createElement(
                            'a',
                            { onClick: this.clear, className: 'cleard' },
                            this.props.hasClear || '清除'
                        ),
                        _react2.default.createElement(
                            _button2.default,
                            { onClick: this.setValue },
                            this.props.confirmText || '确定'
                        )
                    )
                )
            );
        }
    }]);

    return DateRangepicker;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.initData = function (props) {
        var start = props.start,
            end = props.end;

        if (_moment2.default.isMoment(start) && _moment2.default.isMoment(end)) {
            if (start.isAfter(end, 'second')) {
                console.log('start is after end');
                start = null;
                end = null;
            }
        }
        if (!start && !end && props.defaultToday !== false) {
            start = (0, _moment2.default)();
            end = (0, _moment2.default)();
        }
        return {
            start: start, end: end
        };
    };

    this.getStartConfig = function () {
        var config = _this2.props.startConfig || {};
        var _state2 = _this2.state,
            start = _state2.start,
            end = _state2.end;

        var maxDate = end || config.maxDate;
        if (_moment2.default.isMoment(maxDate)) {
            maxDate = (0, _moment2.default)(maxDate);
        }
        config = Object.assign({}, config, {
            date: start,
            maxDate: maxDate
        });

        var onChange = config.onChange;
        config.onChange = function (start, valid) {
            _this2.setState({
                start: start
            });
            if (onChange) {
                onChange(start, valid);
            }
            _this2.triggerChange();
        };
        var disableDateRange = _this2.props.disableDate;
        if (disableDateRange) {
            var disableDate = config.disableDate;
            config.disableDate = function (current) {
                disableDateRange(current, (0, _moment2.default)(start), (0, _moment2.default)(end));
                if (disableDate) {
                    disableDate(current);
                }
            };
        }
        return config;
    };

    this.getEndConfig = function () {
        var config = _this2.props.endConfig || {};
        var _state3 = _this2.state,
            start = _state3.start,
            end = _state3.end;

        var minDate = _this2.state.start || config.minDate;
        if (_moment2.default.isMoment(minDate)) {
            minDate = (0, _moment2.default)(minDate);
        }
        config = Object.assign({}, config, {
            date: end,
            minDate: minDate
        });

        var onChange = config.onChange;
        config.onChange = function (end, valid) {
            _this2.setState({
                end: end
            });
            if (onChange) {
                onChange(end, valid);
            }
            _this2.triggerChange();
        };
        var disableDateRange = _this2.props.disableDate;
        if (disableDateRange) {
            var disableDate = config.disableDate;
            config.disableDate = function (current) {
                disableDateRange(current, (0, _moment2.default)(start), (0, _moment2.default)(end));
                if (disableDate) {
                    disableDate(current);
                }
            };
        }
        return config;
    };

    this.clear = function (e) {
        e.stopPropagation();
        _this2.setState({
            start: null,
            end: null
        }, function () {
            _this2.triggerChange();
        });
    };

    this.setValue = function () {
        var _refs = _this2.refs,
            start = _refs.start,
            end = _refs.end;

        var status = _this2.state.status || {};
        if (start && end) {
            var startDate = start.getValue().value;
            var endDate = end.getValue().value;
            status['opened'] = false;
            _this2.setState({
                start: startDate,
                end: endDate,
                status: status
            }, function () {
                _this2.triggerChange();
            });
        }
    };

    this.getValue = function () {
        var _refs2 = _this2.refs,
            start = _refs2.start,
            end = _refs2.end;

        var startDate = _this2.state.start,
            endDate = _this2.state.end;
        var valid = _moment2.default.isMoment(startDate) && _moment2.default.isMoment(endDate);
        if (start && end && valid) {
            valid = start.getValid(startDate) && end.getValid(endDate);
        }
        return { startDate: startDate, endDate: endDate, valid: valid };
    };

    this.getFormatValue = function () {
        var _getValue = _this2.getValue(),
            startDate = _getValue.startDate,
            endDate = _getValue.endDate,
            valid = _getValue.valid;

        var start = _moment2.default.isMoment(startDate) ? startDate.format(_this2.props.format || defaultFormat) : '';
        var end = _moment2.default.isMoment(endDate) ? endDate.format(_this2.props.format || defaultFormat) : '';
        return { start: start, end: end, valid: valid };
    };

    this.triggerChange = function () {
        if (_this2.props.onChange) {
            var dateValue = _this2.getValue();
            var dateFormat = _this2.getFormatValue();
            _this2.props.onChange(dateValue, dateFormat);
        }
    };
};

DateRangepicker.propTypes = {
    start: _propTypes2.default.object,
    end: _propTypes2.default.object,
    disableDate: _propTypes2.default.func, //(start,end,current)
    disabled: _propTypes2.default.bool,
    defaultText: _propTypes2.default.string,
    format: _propTypes2.default.string, //YYYY-MM-DD HH:mm:ss
    hasClear: _propTypes2.default.any,
    defaultToday: _propTypes2.default.bool,
    startConfig: _propTypes2.default.object,
    endConfig: _propTypes2.default.object,
    confirmText: _propTypes2.default.string,
    onChange: _propTypes2.default.func
};

exports.default = (0, _logical2.default)(DateRangepicker, _logic2.default, _config2.default);