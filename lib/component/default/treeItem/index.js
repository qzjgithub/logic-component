'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../basic/index');

var _index2 = _interopRequireDefault(_index);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _logic = require('./logic.js');

var _logic2 = _interopRequireDefault(_logic);

require('./index.styl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var animateTime = 300;

var TreeItem = function (_Component) {
    _inherits(TreeItem, _Component);

    function TreeItem(props, context) {
        _classCallCheck(this, TreeItem);

        var _this = _possibleConstructorReturn(this, (TreeItem.__proto__ || Object.getPrototypeOf(TreeItem)).call(this, props, context));

        _this.onFlexIconClick = function (ev, o, n) {
            if (_this.openDisabled) {
                n['opened'] = o['opened'];
                return n;
            }
            _this.openDisabled = true;
            var opened = n['opened'];
            if (_this.props.onVisibleChange) {
                if (opened) {
                    _this.props.onVisibleChange(n['opened'], _this.props.order);
                } else {
                    _this.props.onVisibleChange(n['opened'], _this.props.order, true);
                }
                setTimeout(function () {
                    _this.openDisabled = false;
                }, animateTime);
            }
        };

        _this.getIconDom = function (data) {
            var iconType = data.iconType,
                icon = data.icon;

            if (iconType === 'url') {
                return _react2.default.createElement(
                    'span',
                    { className: 'icon', style: { 'backgroundUrl': icon } },
                    ' '
                );
            } else if (iconType === 'image') {
                return _react2.default.createElement(
                    'span',
                    { className: 'icon ' + icon },
                    ' '
                );
            } else {
                return _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'svg',
                        { className: 'iconfont' },
                        _react2.default.createElement(
                            'use',
                            { xlinkHref: '#' + (data['icon'] || 'icon-file-unknown') },
                            ' '
                        )
                    )
                );
            }
        };

        _this.onTextClick = function (value, id, text, data) {
            var flag = true;
            if (_this.props.onTextClick) {
                flag = _this.props.onTextClick(value, id, text, data);
            } else {
                flag = true;
            }
            if (flag) {
                _this.setState({ value: value });
            }
        };

        _this.getHeights = function (node) {
            var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (node.props.opened && node.props.children) {
                h += node.props.children.length * 30;
                node.props.children.forEach(function (child) {
                    h = _this.getHeights(child, h);
                });
            }
            return h;
        };

        _this.state = {};
        _this.openDisabled = false;
        return _this;
    }

    _createClass(TreeItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var status = this.state.status || {};
            status['opened'] = nextProps['opened'];
            this.setState({
                value: nextProps.value,
                status: status
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var data = this.props.data || [];
            var children = data['children'] || [];
            var treeItemClass = '';
            if (children.length) {
                treeItemClass += ' nonLeaf';
            }
            if (data['root']) {
                treeItemClass += ' rootNode';
            } else if (this.props.first) {
                treeItemClass += ' firstNode';
            }
            if (this.props.last) {
                treeItemClass += ' lastNode';
            }
            var status = this.state.status || {};
            var opened = !!status.opened;

            var checked = data[this.props.valueKey] === this.state.value;
            var searched = this.props.searched;

            var id = data[this.props.idKey || this.idKey];
            var value = data[this.props.valueKey || this.valueKey];
            var text = data[this.props.textKey || this.textKey];

            var style = {};
            if (opened) {
                var h = this.getHeights({ props: { children: this.props.children, opened: true } });
                style = {
                    height: h + 'px',
                    overflow: 'hidden'
                };
            } else {
                style = {
                    height: '0',
                    overflow: 'hidden'
                };
            }
            return _react2.default.createElement(
                'section',
                { className: treeItemClass, key: data[this.props.idKey || this.idKey] },
                _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                        'span',
                        { sign: 'flexIcon',
                            onClick: this.onFlexIconClick,
                            className: 'flexIcon' },
                        children.length ? _react2.default.createElement(
                            'svg',
                            { className: 'iconfont' },
                            _react2.default.createElement(
                                'use',
                                { xlinkHref: opened ? '#icon-minus-circle' : '#icon-plus-circle' },
                                ' '
                            )
                        ) : ''
                    ),
                    _react2.default.createElement(
                        'i',
                        null,
                        ' '
                    ),
                    (this.props.iconEnable || this.iconEnable) && this.getIconDom(data),
                    _react2.default.createElement(
                        'span',
                        { className: 'text ' + (checked ? 'checked' : '') + ' ' + (searched ? 'searched' : ''), onClick: function onClick() {
                                return _this2.onTextClick(value, id, text, data);
                            } },
                        data[this.props.textKey || this.textKey]
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'list', ref: "list", style: style },
                    this.props.children
                )
            );
        }
    }]);

    return TreeItem;
}(_react.Component);

TreeItem.propTypes = {
    styleType: _propTypes2.default.string,
    data: _propTypes2.default.object,
    last: _propTypes2.default.bool,
    first: _propTypes2.default.bool,
    order: _propTypes2.default.array,
    searched: _propTypes2.default.bool,
    onTextClick: _propTypes2.default.func,
    onVisibleChange: _propTypes2.default.func
};

exports.default = (0, _index2.default)(TreeItem, _logic2.default, _config2.default);