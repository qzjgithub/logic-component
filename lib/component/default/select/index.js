'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _Util = require('../../../common/Util');

var _Util2 = _interopRequireDefault(_Util);

require('./index.styl');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props, context) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context));

        _initialiseProps.call(_this);

        var _this$props = _this.props,
            value = _this$props.value,
            initValue = _this$props.initValue,
            mode = _this$props.mode;

        value = (0, _Util.isRealOrZero)(value) ? value : initValue;
        if (!(0, _Util.isRealOrZero)(value)) {
            switch (mode) {
                case 'multi':
                    value = [];
                    break;
                case 'single':
                default:
                    value = undefined;
            }
        }
        _this.state = {
            value: value
        };
        return _this;
    }

    _createClass(Select, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var value = nextProps.value;
            if (value || value == 0) {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var displayKey = '',
                value = this.state['value'];
            if (_Util2.default.isUndefined(value)) {
                value = this.props.initValue || this.initValue;
            }
            if (!value && value != 0 || value instanceof Array && !value.length) {
                displayKey = 'defaultText';
            }
            var children = this.props.children;
            if (!children || children instanceof Array && !children.length) {
                displayKey = 'noDataText';
            }
            var list = void 0;
            switch (this.props.mode) {
                case 'multi':
                    list = this.getListMulti(value);
                    break;
                case 'single':
                default:
                    list = this.getList(value);
            }
            var text = list.text;
            if (displayKey) {
                text = this.props[displayKey] || this[displayKey];
            }
            var _props = this.props,
                mode = _props.mode,
                orient = _props.orient;

            var cls = mode || 'single ';
            cls += orient || '';
            return _react2.default.createElement(
                'div',
                { className: cls },
                _react2.default.createElement(
                    _button2.default,
                    { styleType: 'left', className: 'text', sign: 'text', style: { height: this.props.height || '', width: this.props.width || '' } },
                    _react2.default.createElement(_icon2.default, { type: 'unfold' }),
                    _react2.default.createElement(
                        'span',
                        { ref: 'text' },
                        text || value
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'list', sign: 'list', onMouseLeave: this.keepFocus },
                    list.dom
                )
            );
        }
    }]);

    return Select;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.itemClick = function (value, text) {
        var status = _this4.state.status;
        var values = _this4.state.value;
        switch (_this4.props.mode) {
            case 'multi':
                var ind = values.indexOf(value);
                if (ind > -1) {
                    values.splice(ind, 1);
                    _this4.text.splice(ind, 1);
                } else {
                    values.push(value);
                    _this4.text.push(text);
                }
                break;
            case 'single':
            default:
                values = value;
                _this4.text = text;
                status['opened'] = false;
        }
        _this4.setState({
            value: values,
            status: status
        });
        if (_this4.props.onSelected) {
            _this4.props.onSelected(values, _this4.text);
        }
    };

    this.getList = function (value) {
        var text = '';
        var children = _this4.props.children;
        if (children && !(children instanceof Array)) {
            children = [children];
        }
        var dom = (children || []).map(function (item) {
            var checked = false;
            if (value === item.props.value) {
                _this4.text = item.props.children;
                text = item.props.children;
                checked = true;
            }
            return _react2.default.cloneElement(item, { selectBridge: _this4.itemClick, checked: checked });
        });
        return { dom: dom, text: text };
    };

    this.getListMulti = function (value) {
        _this4.text = [];
        var text = [];
        if (!value) {
            value = [];
        }
        var mode = _this4.props.mode;
        var children = _this4.props.children;
        if (children && !(children instanceof Array)) {
            children = [children];
        }
        var dom = (children || []).map(function (item) {
            var checked = false;
            if (value.indexOf(item.props.value) > -1) {
                _this4.text.push(item.props.children);
                text.push(_react2.default.createElement(
                    'span',
                    { className: 'multi-text' },
                    item.props.children,
                    _react2.default.createElement(_icon2.default, { type: 'guanbi1', onClick: function onClick(e) {
                            e.stopPropagation();
                            _this4.itemClick(item.props.value, item.props.children);
                        } })
                ));
                checked = true;
            }
            return _react2.default.cloneElement(item, { selectBridge: _this4.itemClick, checked: checked, mode: mode });
        });
        return { dom: dom, text: text };
    };

    this.getValue = function () {
        return _this4.state.value;
    };

    this.clear = function () {
        var value = void 0;
        switch (_this4.props.mode) {
            case 'multi':
                value = [];
                break;
            case 'single':
            default:
                value = '';
        }
        _this4.setState({
            value: value
        });
    };

    this.keepFocus = function (ev, oldValue, newValue) {
        if (_this4.props.mode !== 'multi') {
            return newValue;
        }
        var textDom = _this4.refs['text'];
        if (textDom) {
            textDom.parentElement.focus();
        }
        newValue['opened'] = true;
        return newValue;
    };
};

Select.propTypes = {
    height: _propTypes2.default.any,
    width: _propTypes2.default.any,
    mode: _propTypes2.default.string, //multi,single
    initValue: _propTypes2.default.any,
    value: _propTypes2.default.any,
    onSelected: _propTypes2.default.func,
    orient: _propTypes2.default.string //up,down
};

var Option = function (_Component2) {
    _inherits(Option, _Component2);

    function Option(props, context) {
        _classCallCheck(this, Option);

        var _this2 = _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props, context));

        _this2.onClick = function (value, text) {
            if (_this2.props.selectBridge) {
                _this2.props.selectBridge(value, text);
            }
        };

        return _this2;
    }

    _createClass(Option, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'li',
                { sign: 'item',
                    className: this.props.checked ? 'checked' : '',
                    onClick: function onClick() {
                        return _this3.onClick(_this3.props.value, _this3.props.children);
                    } },
                this.props.children,
                this.props.mode === 'multi' && this.props.checked && _react2.default.createElement(_icon2.default, { type: 'xuanze', className: 'mutli-sign' })
            );
        }
    }]);

    return Option;
}(_react.Component);

Option.propTypes = {
    value: _propTypes2.default.string,
    checked: _propTypes2.default.bool,
    selectBridge: _propTypes2.default.func
};

Select.Option = Option;

exports.default = (0, _logical2.default)(Select, _logic2.default, _config2.default);