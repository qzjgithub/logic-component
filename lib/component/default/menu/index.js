'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.styl');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu(props, context) {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props, context));
    }

    _createClass(Menu, [{
        key: 'getChildren',
        value: function getChildren() {
            var _this2 = this;

            var c = this.props.children;
            if (c) {
                if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && c.length) {
                    return this.props.children.map(function (item) {
                        if (item.type) {
                            return _react2.default.cloneElement(item, { checkSign: _this2.props.checkSign });
                        } else {
                            return item;
                        }
                    });
                } else if (c.type && c.length !== 0) {
                    return _react2.default.cloneElement(this.props.children, { checkSign: this.props.checkSign });
                } else {
                    return c;
                }
            } else {
                return c;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'ul',
                { className: 'Menu' },
                this.getChildren()
            );
        }
    }]);

    return Menu;
}(_react.Component);

Menu.propTypes = {
    multiple: _propTypes2.default.bool,
    checkSign: _propTypes2.default.any
};

var MenuItem = function (_Component2) {
    _inherits(MenuItem, _Component2);

    function MenuItem(props, context) {
        _classCallCheck(this, MenuItem);

        var _this3 = _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props, context));

        _this3.textClick = function () {
            _this3.setState({
                checked: !_this3.state.checked
            }, function () {
                if (_this3.props.changed) {
                    _this3.props.changed(_this3.state.checked, _this3.props.value);
                }
            });
        };

        _this3.state = {
            checked: _this3.props.checked
        };
        return _this3;
    }

    _createClass(MenuItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.checked !== undefined && this.state.checked !== nextProps.checked) {
                this.setState({
                    checked: nextProps.checked
                });
            }
        }
    }, {
        key: 'getCheckSign',
        value: function getCheckSign() {
            if (this.state.checked) {
                if (this.props.checkSign === true) {
                    return _react2.default.createElement(_icon2.default, { type: 'xuanze' });
                } else {
                    return this.props.checkSign || '';
                }
            } else {
                return '';
            }
        }
    }, {
        key: 'getChildren',
        value: function getChildren() {
            var _this4 = this;

            if (this.props.children) {
                if (this.props.children.length) {
                    return _react2.default.createElement(
                        'ul',
                        { className: 'Menu' },
                        this.props.children.map(function (item) {
                            return _react2.default.cloneElement(item, { checkSign: _this4.props.checkSign });
                        })
                    );
                } else {
                    return _react2.default.createElement(
                        'ul',
                        { className: 'Menu' },
                        _react2.default.cloneElement(this.props.children, { checkSign: this.props.checkSign })
                    );
                }
            } else {
                return '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'li',
                { className: 'MenuItem' },
                _react2.default.createElement(
                    'p',
                    { onClick: this.textClick },
                    _react2.default.createElement(
                        'span',
                        null,
                        this.props.text || ''
                    ),
                    this.getCheckSign()
                ),
                this.getChildren()
            );
        }
    }]);

    return MenuItem;
}(_react.Component);

MenuItem.propTypes = {
    checked: _propTypes2.default.bool,
    text: _propTypes2.default.any,
    value: _propTypes2.default.any,
    changed: _propTypes2.default.func
};

Menu.MenuItem = MenuItem;

exports.default = Menu;