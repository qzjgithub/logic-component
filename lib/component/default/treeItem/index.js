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

        _this.onFlexIconClick = function (ev, o, n, s, p) {
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
                _this.setState({
                    listStyle: {
                        height: h
                    }
                });
                _this.animateTimer = setTimeout(function () {
                    _this.setState({
                        listStyle: {
                            height: 'auto',
                            overflow: 'visible'
                        }
                    });
                }, animateTime);
            } else {
                h = list.offsetHeight;
                console.log(h);
                _this.setState({
                    listStyle: {
                        height: h,
                        overflow: 'hidden'
                    }
                });
                setTimeout(function () {
                    _this.setState({
                        listStyle: {
                            height: 0
                        }
                    });
                }, 20);
            }
        };

        _this.getIconDom = function (data) {
            var iconType = data.iconType,
                icon = data.icon;

            if (iconType === 'url') {
                return _react2.default.createElement('span', { className: 'icon', style: { 'backgroundUrl': icon } });
            } else if (iconType === 'image') {
                return _react2.default.createElement('span', { className: 'icon ' + icon });
            } else {
                return _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'svg',
                        { className: 'iconfont' },
                        _react2.default.createElement('use', { xlinkHref: '#' + (data['icon'] || 'icon-file-unknown') })
                    )
                );
            }
        };

        _this.state = Object.assign(_logic2.default.keys || {}, {
            listStyle: {}
        });
        return _this;
    }

    _createClass(TreeItem, [{
        key: 'render',
        value: function render() {
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
                            _react2.default.createElement('use', { xlinkHref: opened ? '#icon-minus-circle' : '#icon-plus-circle' })
                        ) : ''
                    ),
                    _react2.default.createElement('i', null),
                    this.state.iconEnable && this.getIconDom(data),
                    _react2.default.createElement(
                        'span',
                        { className: "text" },
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