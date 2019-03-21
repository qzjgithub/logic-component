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

var Datepicker = function (_Component) {
    _inherits(Datepicker, _Component);

    function Datepicker(props, context) {
        _classCallCheck(this, Datepicker);

        var _this = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.state = _this.initData(props);
        return _this;
    }

    _createClass(Datepicker, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps) {
                var value = nextProps.value;
                if (value !== undefined) {
                    this.setState({
                        value: value
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var value = this.state.value;
            var text = '';
            if (value && _moment2.default.isMoment(value)) {
                text = value.format(this.props.format || 'YYYY-MM-DD HH:mm:ss');
            } else {
                text = this.props.defaultText || '请选择时间';
            }
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _button2.default,
                    { sign: 'text', className: 'text ' + (this.props.disabled ? 'disabled' : '') },
                    _react2.default.createElement(
                        'span',
                        null,
                        text
                    ),
                    this.props.hasClear !== false && _react2.default.createElement(_icon2.default, { type: 'guanbi1', onClick: this.clear })
                ),
                _react2.default.createElement(
                    'div',
                    { sign: 'list', className: 'list' },
                    _react2.default.createElement(_calendar2.default, _extends({}, this.getCalendarConfig(), { ref: 'calendar' })),
                    _react2.default.createElement(
                        'p',
                        { className: 'control' },
                        this.props.hasClear !== false && _react2.default.createElement(
                            'a',
                            { onClick: this.clear, className: 'clear' },
                            this.props.hasClear || '清除'
                        ),
                        this.props.hasNow !== false && _react2.default.createElement(
                            'a',
                            { onClick: this.toNow },
                            this.props.hasNow || '此刻'
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

    return Datepicker;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.initData = function (props) {
        var value = props.value,
            initValue = props.initValue;

        var datetime = value || initValue;
        if (!_moment2.default.isMoment(datetime) && _this2.props.defaultToday !== false) {
            datetime = (0, _moment2.default)();
        }
        return {
            value: datetime
        };
    };

    this.getCalendarConfig = function () {
        var config = _this2.props.calendarConfig || {};
        config = Object.assign({}, config, { date: _this2.state.value });
        var onChange = config.onChange;
        config.onChange = function (value, valid) {
            _this2.setState({
                value: value
            });
            if (onChange) {
                onChange(value, valid);
            }
        };
        return config;
    };

    this.clear = function () {
        _this2.setState({
            value: null
        });
    };

    this.toNow = function () {
        _this2.setState({
            value: (0, _moment2.default)()
        });
    };

    this.setValue = function () {
        var calendar = _this2.refs['calendar'];
        var status = _this2.state.status || {};
        if (calendar) {
            var _calendar$getValue = calendar.getValue(),
                value = _calendar$getValue.value;

            status['opened'] = false;
            _this2.setState({
                value: value,
                status: status
            });
        }
    };

    this.getValue = function () {
        var calendar = _this2.refs['calendar'];
        var value = _this2.state.value;
        var valid = _moment2.default.isMoment(value);
        if (calendar && valid) {
            valid = calendar.getValid(value);
        }
        return { value: value, valid: valid };
    };
};

Datepicker.propTypes = {
    initValue: _propTypes2.default.object,
    value: _propTypes2.default.object,
    disabled: _propTypes2.default.bool,
    defaultText: _propTypes2.default.string,
    format: _propTypes2.default.string, //YYYY-MM-DD HH:mm:ss
    hasNow: _propTypes2.default.any,
    hasClear: _propTypes2.default.any,
    defaultToday: _propTypes2.default.bool,
    calendarConfig: _propTypes2.default.object,
    confirmText: _propTypes2.default.string
};

exports.default = (0, _logical2.default)(Datepicker, _logic2.default, _config2.default);