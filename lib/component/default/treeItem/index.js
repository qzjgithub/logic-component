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

require('./index.styl');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

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
                icon = data.icon,
                iconStyle = data.iconStyle;

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
                    _react2.default.createElement(_icon2.default, { type: data['icon'] || 'file-unknown', style: iconStyle })
                );
            }
        };

        _this.onTextClick = function (value, id, text, data) {
            var flag = _this.getSelectable();
            if (flag && _this.props.onTextClick) {
                var selectMode = _this.props.selectMode;

                if (selectMode === 'multi') {
                    var sv = _this.state.value;
                    if (!sv || !(sv instanceof Array)) {
                        sv = [];
                    }
                    var ind = sv.indexOf(value);
                    var check = true;
                    if (ind > -1) {
                        sv.splice(ind, 1);
                        check = false;
                    } else {
                        sv.push(value);
                    }
                    sv = _this.setChildrenValue(sv, check, data['children']);
                    value = sv;
                }
                _this.props.onTextClick(value, id, text, data);
            }
            /* if(flag){
                this.setState({value : value});
            } */
        };

        _this.setChildrenValue = function (ov, check, chd) {
            if (!chd || !(chd instanceof Array)) return ov;
            var valueKey = _this.props.valueKey || _this.valueKey;
            chd.forEach(function (child) {
                var value = child[valueKey];
                var ind = ov.indexOf(value);
                if (check && ind < 0) {
                    ov.push(value);
                } else if (!check && ind > -1) {
                    ov.splice(ind, 1);
                }
                var children = child['children'];
                if (children && children instanceof Array) {
                    ov = _this.setChildrenValue(ov, check, children);
                }
            });
            return ov;
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

        _this.getSelectOperate = function () {
            var selectMode = _this.props.selectMode;

            var checked = _this.getChecked();
            var type = '';
            switch (selectMode) {
                case 'multi':
                    type = checked ? 'fangxingxuanzhong' : 'fangxingweixuanzhong';
                    break;
                case 'single':
                    type = checked ? 'yuanxingxuanzhong' : 'yuanxingweixuanzhong';
                    break;
                case 'auto':
                default:
                    return '';
            }

            var _this$getEventParam = _this.getEventParam(),
                value = _this$getEventParam.value,
                id = _this$getEventParam.id,
                text = _this$getEventParam.text,
                data = _this$getEventParam.data;

            return _react2.default.createElement(_icon2.default, { type: type, className: 'operate', onClick: function onClick() {
                    return _this.onTextClick(value, id, text, data);
                } });
        };

        _this.getChecked = function () {
            var value = _this.state.value;
            var _this$props = _this.props,
                selectMode = _this$props.selectMode,
                data = _this$props.data,
                valueKey = _this$props.valueKey;

            valueKey = valueKey || _this.valueKey;
            if (!_this.getSelectable()) {
                return false;
            }
            var flag = false;
            switch (selectMode) {
                case 'multi':
                    if (value && value instanceof Array) {
                        flag = value.indexOf(data[valueKey]) > -1;
                    }
                    break;
                case 'single':
                case 'auto':
                default:
                    flag = value === data[valueKey];
            }
            return flag;
        };

        _this.getSelectable = function () {
            var _this$props2 = _this.props,
                data = _this$props2.data,
                selectable = _this$props2.selectable;

            if (selectable && !selectable(data)) {
                return false;
            }
            return true;
        };

        _this.getEventParam = function () {
            var _this$props3 = _this.props,
                data = _this$props3.data,
                idKey = _this$props3.idKey,
                valueKey = _this$props3.valueKey,
                textKey = _this$props3.textKey;

            var id = data[idKey || _this.idKey];
            var value = data[valueKey || _this.valueKey];
            var text = data[textKey || _this.textKey];
            return { value: value, id: id, text: text, data: data };
        };

        _this.state = {
            value: props.value
        };
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


        /* genChildrenDom = () => {
            let { children, selectMode, valueKey, data } = this.props;
            if( selectMode === 'multi' && children instanceof Array){
                return children.map((child) => {
                    let oldTextClick = child.props.onTextClick;
                    return React.cloneElement(child,{
                        onTextClick: (value, id, key, cdata) => {
                            let pv = data[valueKey||this.valueKey];
                            let ind = value.indexOf(pv);
                            if(ind > -1){
                                value.splice(ind, 1);
                            }
                            oldTextClick && oldTextClick(value,id,key,data);
                        }
                    });
                });
            }
            return children;
        } */

        value: function render() {
            var _this2 = this;

            var _getEventParam = this.getEventParam(),
                id = _getEventParam.id,
                value = _getEventParam.value,
                text = _getEventParam.text,
                data = _getEventParam.data;

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
            if (this.props.cable === false) {
                treeItemClass += ' noCable';
            }
            var status = this.state.status || {};
            var opened = !!status.opened;

            var searched = this.props.searched;
            var checked = this.getChecked();

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
                        children.length ? _react2.default.createElement(_icon2.default, { type: opened ? 'minus-circle' : 'plus-circle' }) : ''
                    ),
                    _react2.default.createElement(
                        'i',
                        null,
                        ' '
                    ),
                    this.getSelectOperate(),
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
    data: _propTypes2.default.object,
    last: _propTypes2.default.bool,
    first: _propTypes2.default.bool,
    order: _propTypes2.default.array,
    searched: _propTypes2.default.bool,
    onTextClick: _propTypes2.default.func,
    onVisibleChange: _propTypes2.default.func,
    selectMode: _propTypes2.default.string, //multi,single,auto
    selectable: _propTypes2.default.func,
    valueKey: _propTypes2.default.string,
    value: _propTypes2.default.any,
    cable: _propTypes2.default.bool
};

exports.default = (0, _logical2.default)(TreeItem, _logic2.default, _config2.default);