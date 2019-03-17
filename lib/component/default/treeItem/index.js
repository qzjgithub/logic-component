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

        _initialiseProps.call(_this);

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

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.onFlexIconClick = function (ev, o, n) {
        if (_this3.openDisabled) {
            n['opened'] = o['opened'];
            return n;
        }
        _this3.openDisabled = true;
        var opened = n['opened'];
        if (_this3.props.onVisibleChange) {
            if (opened) {
                _this3.props.onVisibleChange(n['opened'], _this3.props.order);
            } else {
                _this3.props.onVisibleChange(n['opened'], _this3.props.order, true);
            }
            setTimeout(function () {
                _this3.openDisabled = false;
            }, animateTime);
        }
    };

    this.getIconDom = function (data) {
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
                _react2.default.createElement(_icon2.default, { type: data['icon'] || 'file-unknown' })
            );
        }
    };

    this.onTextClick = function (value, id, text, data) {
        var flag = _this3.getSelectable();
        if (flag && _this3.props.onTextClick) {
            var _props = _this3.props,
                props = _props.props,
                selectMode = _props.selectMode;

            if (selectMode === 'multi') {
                var sv = _this3.state.value;
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
                sv = _this3.setChildrenValue(sv, check, data['children']);
                value = sv;
            }
            _this3.props.onTextClick(value, id, text, data);
        }
        /* if(flag){
            this.setState({value : value});
        } */
    };

    this.setChildrenValue = function (ov, check, chd) {
        if (!chd || !(chd instanceof Array)) return ov;
        var valueKey = _this3.props.valueKey || _this3.valueKey;
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
                ov = _this3.setChildrenValue(ov, check, children);
            }
        });
        return ov;
    };

    this.getHeights = function (node) {
        var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (node.props.opened && node.props.children) {
            h += node.props.children.length * 30;
            node.props.children.forEach(function (child) {
                h = _this3.getHeights(child, h);
            });
        }
        return h;
    };

    this.getSelectOperate = function () {
        var selectMode = _this3.props.selectMode;

        var checked = _this3.getChecked();
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

        var _getEventParam2 = _this3.getEventParam(),
            value = _getEventParam2.value,
            id = _getEventParam2.id,
            text = _getEventParam2.text,
            data = _getEventParam2.data;

        return _react2.default.createElement(_icon2.default, { type: type, className: 'operate', onClick: function onClick() {
                return _this3.onTextClick(value, id, text, data);
            } });
    };

    this.getChecked = function () {
        var value = _this3.state.value;
        var _props2 = _this3.props,
            selectMode = _props2.selectMode,
            data = _props2.data,
            valueKey = _props2.valueKey;

        valueKey = valueKey || _this3.valueKey;
        if (!_this3.getSelectable()) {
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

    this.getSelectable = function () {
        var _props3 = _this3.props,
            data = _props3.data,
            selectable = _props3.selectable;

        if (selectable && !selectable(data)) {
            return false;
        }
        return true;
    };

    this.getEventParam = function () {
        var _props4 = _this3.props,
            data = _props4.data,
            idKey = _props4.idKey,
            valueKey = _props4.valueKey,
            textKey = _props4.textKey;

        var id = data[idKey || _this3.idKey];
        var value = data[valueKey || _this3.valueKey];
        var text = data[textKey || _this3.textKey];
        return { value: value, id: id, text: text, data: data };
    };
};

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
    value: _propTypes2.default.any
};

exports.default = (0, _logical2.default)(TreeItem, _logic2.default, _config2.default);