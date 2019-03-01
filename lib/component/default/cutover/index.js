'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.styl');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _Util = require('../../../common/Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cutover = function (_Component) {
    _inherits(Cutover, _Component);

    function Cutover(props, context) {
        _classCallCheck(this, Cutover);

        var _this = _possibleConstructorReturn(this, (Cutover.__proto__ || Object.getPrototypeOf(Cutover)).call(this, props, context));

        _this.getChildren = function () {
            var value = _this.state.value;
            var showWidth = _this.showWidth;
            var _this$props = _this.props,
                children = _this$props.children,
                initValue = _this$props.initValue;

            if (!children) {
                return '';
            }
            if (_Util2.default.isKVObject(children)) {
                return _react2.default.cloneElement(children, { showWidth: showWidth });
            }
            if (children.length === 0) {
                return children;
            }
            if (children.length === 1) {
                return _react2.default.cloneElement(children[0], { showWidth: showWidth });
            }
            if (!value) {
                value = initValue;
            }
            var index = 0;
            var dom = [];
            dom.push(children.filter(function (item, ind) {
                if (item.props.value === value) {
                    index = ind;
                    return true;
                } else {
                    return false;
                }
            }).map(function (item) {
                return _react2.default.cloneElement(item, { showWidth: showWidth });
            }));
            _this.index = index;

            var prevInd = index - 1;
            if (prevInd < 0) {
                prevInd = children.length - 1;
            }
            var nextInd = index + 1;
            if (nextInd >= children.length) {
                nextInd = 0;
            }

            var marginLeft = parseInt(_this.showWidth, 10);
            switch (_this.state.status) {
                case 1:
                    marginLeft = 0;
                    break;
                case 2:
                    marginLeft = -2 * marginLeft + 'px';
                    break;
                default:
                    marginLeft = -marginLeft + 'px';
            }

            var style = { marginLeft: marginLeft, width: _this.showWidth };
            if (_this.state.status !== 0) {
                style['transition'] = 'margin-left 300ms linear';
            }
            dom.unshift(_react2.default.cloneElement(children[prevInd], { showWidth: _this.showWidth, style: style }));
            dom.push(_react2.default.cloneElement(children[nextInd], { showWidth: _this.showWidth }));
            return dom;
        };

        _this.showWidth = _this.props.showWidth;
        _this.running = false;
        if (!_this.showWidth) {
            _this.showWidth = '50px';
        }
        _this.state = {
            value: _this.props.value || undefined,
            status: 0
        };
        return _this;
    }

    _createClass(Cutover, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.showWidth) {
                this.showWidth = nextProps.showWidth;
            }
            if (nextProps.value) {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'svgClick',
        value: function svgClick(status) {
            var _this2 = this;

            if (this.running) return;
            this.running = true;
            var children = this.props.children;

            var index = this.index;
            if (status === 1) {
                index = index - 1;
            }
            if (status === 2) {
                index = index + 1;
            }
            if (index < 0) {
                index = children.length - 1;
            } else if (index >= children.length) {
                index = 0;
            }
            var value = children[index].props.value;
            this.setState({
                status: status
            });
            if (this.props.onChanged) {
                this.props.onChanged(value);
            }

            setTimeout(function () {
                _this2.index = index;
                _this2.running = false;
                _this2.setState({
                    value: value,
                    status: 0
                });
            }, 300);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var children = this.props.children;

            var disabled = false;
            if (!children || _Util2.default.isKVObject(children)) {
                disabled = true;
            } else if (children.length <= 1) {
                disabled = true;
            }
            return _react2.default.createElement(
                'ul',
                { className: 'Cutover ' + (disabled ? 'disabled' : '') },
                _react2.default.createElement(
                    'li',
                    { className: 'arrow prev' },
                    _react2.default.createElement(_icon2.default, { type: 'zuo', onClick: function onClick() {
                            return _this3.svgClick(1);
                        } })
                ),
                _react2.default.createElement(
                    'li',
                    { className: 'show', style: { width: this.showWidth } },
                    this.getChildren()
                ),
                _react2.default.createElement(
                    'li',
                    { className: 'arrow next' },
                    _react2.default.createElement(_icon2.default, { type: 'gengduo', onClick: function onClick() {
                            return _this3.svgClick(2);
                        } })
                )
            );
        }
    }]);

    return Cutover;
}(_react.Component);

Cutover.propTypes = {
    value: _propTypes2.default.string,
    showWidth: _propTypes2.default.any
};

var CutoverItem = function (_Component2) {
    _inherits(CutoverItem, _Component2);

    function CutoverItem(props, context) {
        _classCallCheck(this, CutoverItem);

        return _possibleConstructorReturn(this, (CutoverItem.__proto__ || Object.getPrototypeOf(CutoverItem)).call(this, props, context));
    }

    _createClass(CutoverItem, [{
        key: 'render',
        value: function render() {
            var style = this.props.style || {};
            style['width'] = this.props.showWidth;
            return _react2.default.createElement(
                'span',
                { className: 'CutoverItem', style: style },
                this.props.children
            );
        }
    }]);

    return CutoverItem;
}(_react.Component);

CutoverItem.propTypes = {
    value: _propTypes2.default.string,
    showWidth: _propTypes2.default.any
};

Cutover.CutoverItem = CutoverItem;

exports.default = Cutover;