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

var animateTime = 500;

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
            if (_this.animateTimer) {
                clearTimeout(_this.animateTimer);
                _this.animateTimer = null;
            }
            var list = _this.refs['list'] || {};
            var h = 0;
            if (n['opened']) {
                var children = list['children'] || [];
                for (var i = 0; i < children.length; i++) {
                    h += children[i].offsetHeight;
                }
                list.style.height = h + 'px';
                _this.animateTimer = setTimeout(function () {
                    _this.setState({
                        listStyle: {
                            height: 'auto',
                            overflow: 'visible'
                        }
                    }, function () {
                        _this.openDisabled = false;
                    });
                }, animateTime);
            } else {
                h = list.offsetHeight;
                list.style.height = h + 'px';
                setTimeout(function () {
                    _this.setState({
                        listStyle: {
                            height: 0,
                            overflow: 'hidden'
                        }
                    }, function () {
                        _this.animateTimer = setTimeout(function () {
                            _this.openDisabled = false;
                        }, animateTime);
                    });
                }, 10);
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

        var opened = props.opened;
        var style = {};
        if (opened) {
            style = {
                height: 'auto',
                overflow: 'visible'
            };
        } else {
            style = {
                height: 0,
                overflow: 'hidden'
            };
        }
        _this.state = Object.assign(_logic2.default.keys || {}, {
            listStyle: style
        });
        _this.openDisabled = false;
        return _this;
    }

    _createClass(TreeItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ value: nextProps.value });
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

            var checked = data[this.state.valueKey] === this.state.value;

            var id = data[this.state.idKey];
            var value = data[this.state.valueKey];
            var text = data[this.state.textKey];
            return _react2.default.createElement(
                'section',
                { className: treeItemClass, key: data[this.state.idKey] },
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
                    this.state.iconEnable && this.getIconDom(data),
                    _react2.default.createElement(
                        'span',
                        { className: 'text ' + (checked ? 'checked' : ''), onClick: function onClick() {
                                return _this2.onTextClick(value, id, text, data);
                            } },
                        data[this.state.textKey]
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'list', ref: "list", style: this.state.listStyle },
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
    first: _propTypes2.default.bool
};

exports.default = (0, _index2.default)(TreeItem, _logic2.default, _config2.default);