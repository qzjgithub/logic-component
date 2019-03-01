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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
    _inherits(Form, _Component);

    function Form(props, context) {
        _classCallCheck(this, Form);

        var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props, context));

        _this.names = [];

        _this.validate = function () {
            var result = true;
            var err = {};
            var values = {};
            _this.names.forEach(function (name) {
                var ele = _this.refs[name];
                if (!ele || !ele.validate) {
                    result = false;
                    err[name] = 'has no element or validate.';
                    values[name] = null;
                    return;
                }
                var data = ele.validate();
                result = result && data.result;
                err[name] = data.err;
                values[name] = data.value;
            });
            return { err: result ? null : err, values: values };
        };

        _this.getChildren = function () {
            var c = _this.props.children;
            _this.names = [];
            var name = void 0;
            if (c && (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object') {
                if (!c.length && c.length !== 0 && c.type && c.props.name) {
                    name = c.props.name;
                    _this.names.push(name);
                    return _react2.default.cloneElement(c, { ref: name });
                } else if (c.length === 1 && c[0].type && c[0].props.name) {
                    name = c[0].props.name;
                    _this.names.push(name);
                    return _react2.default.cloneElement(c[0], { ref: name });
                } else if (c.length) {
                    return c.map(function (item) {
                        if (item && item.type && item.props.name) {
                            name = item.props.name;
                            _this.names.push(name);
                            return _react2.default.cloneElement(item, { ref: name });
                        } else {
                            return item;
                        }
                    });
                } else {
                    return c;
                }
            } else {
                return c;
            }
        };

        return _this;
    }

    _createClass(Form, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { className: 'Form' },
                this.getChildren()
            );
        }
    }]);

    return Form;
}(_react.Component);

Form.propTypes = {
    type: _propTypes2.default.string
};

var FormItem = function (_Component2) {
    _inherits(FormItem, _Component2);

    function FormItem(props, context) {
        _classCallCheck(this, FormItem);

        var _this2 = _possibleConstructorReturn(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call(this, props, context));

        _this2.key = 'element';

        _this2.validate = function () {
            var result = true;
            var err = null;

            var ele = _this2.refs[_this2.key];
            var value = void 0;
            if (!ele || !ele.getValue) {
                if (ele.picker) {
                    value = ele.picker.state.value;
                } else {
                    return { err: 'has no getValue method.', result: false, value: null };
                }
            } else {
                value = _this2.refs[_this2.key].getValue();
            }
            var rules = _this2.props.rules || [];

            var hasRequire = false;
            var isNull = false;

            if (!value) {
                isNull = true;
            } else if (value && value instanceof Array && !value.length) {
                isNull = true;
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var rule = _step.value;

                    if (rule.require) {
                        hasRequire = true;
                        if (isNull) {
                            result = false;
                            err = rule.message || (_this2.props.label || '') + '\u4E0D\u80FD\u4E3A\u7A7A';
                            break;
                        }
                        continue;
                    }
                    if (isNull && !hasRequire) {
                        continue;
                    }
                    result = rule.reg.test(value);
                    if (!result) {
                        err = rule.message || 'error';
                        break;
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

            return { result: result, err: err, value: value };
        };

        return _this2;
    }

    _createClass(FormItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.name !== this.props.name) {
                var dom = this.refs[this.key];
                if (dom && dom.clear) {
                    dom.clear();
                }
            }
        }
    }, {
        key: 'getChildren',
        value: function getChildren() {
            var _this3 = this;

            var c = this.props.children;
            if (c && (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object') {
                if (!c.length && c.length !== 0 && c.type) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.cloneElement(c, { ref: this.key })
                    );
                } else if (c.length === 1 && c[0].type) {
                    return _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.cloneElement(c[0], { ref: this.key })
                    );
                } else if (c.length) {
                    var hasKey = false;
                    return c.map(function (item) {
                        if (!hasKey && item && item.type && item.props.formSign) {
                            return _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.cloneElement(item, { ref: _this3.key })
                            );
                        } else {
                            return item;
                        }
                    });
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
                'div',
                { className: 'FormItem ' + (this.props.noLabel ? 'noLabel' : '') },
                _react2.default.createElement(
                    'label',
                    null,
                    this.props.label || ''
                ),
                this.getChildren()
            );
        }
    }]);

    return FormItem;
}(_react.Component);

FormItem.propTypes = {
    label: _propTypes2.default.any,
    name: _propTypes2.default.string,
    rules: _propTypes2.default.array,
    noLabel: _propTypes2.default.bool
};

Form.FormItem = FormItem;

exports.default = Form;