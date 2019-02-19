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

var _index = require('../basic/index');

var _index2 = _interopRequireDefault(_index);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _logic = require('./logic.js');

var _logic2 = _interopRequireDefault(_logic);

require('./index.styl');

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _treeItem = require('../treeItem');

var _treeItem2 = _interopRequireDefault(_treeItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var animateTime = 300;

var Tree = function (_Component) {
    _inherits(Tree, _Component);

    function Tree(props, context) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.state = {
            openeds: {},
            searchValue: '',
            searched: false,
            searcheds: {}
        };
        return _this;
    }

    _createClass(Tree, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({ value: nextProps.value });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var data = this.props.data || [];
            return _react2.default.createElement(
                'div',
                null,
                this.props.search && _react2.default.createElement(
                    'div',
                    { className: 'search' },
                    _react2.default.createElement('input', { onChange: this.searchChange, value: this.state.searchValue, onKeyPress: this.searchEvent }),
                    _react2.default.createElement(_icon2.default, { type: 'sousuo', onClick: this.searchEvent })
                ),
                data.map(function (item, index) {
                    return _this2.getTreeItem(item, index === 0, index === data.length - 1, [index]);
                })
            );
        }
    }]);

    return Tree;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.getTreeItem = function (data, first, last, order) {
        var opened = _this3.state.openeds[order.join('-')];
        if (opened === undefined) {
            opened = data['opened'] ? 1 : 0;
        }
        var props = Object.assign({}, _this3.props, {
            data: data,
            first: first,
            last: last,
            opened: opened === 1,
            value: _this3.state.value,
            order: order,
            searched: _this3.state.searcheds[order.join('-')]
        });
        var children = data['children'] || [];
        return _react2.default.createElement(
            _treeItem2.default,
            _extends({}, props, { onTextClick: _this3.itemClick, onVisibleChange: _this3.visibleChange, key: order.join('-') }),
            opened !== 0 && !!children.length && children.map(function (item, index) {
                return _this3.getTreeItem(item, index === 0, index === children.length - 1, [].concat(_toConsumableArray(order), [index]));
            })
        );
    };

    this.visibleChange = function (opened, order, loading) {
        var openeds = _this3.state.openeds;
        openeds[order.join('-')] = loading ? 2 : opened ? 1 : 0;
        _this3.setState({
            openeds: openeds
        });
        if (loading) {
            setTimeout(function () {
                openeds = _this3.state.openeds;
                openeds[order.join('-')] = opened ? 1 : 0;
                _this3.setState({
                    openeds: openeds
                });
            }, animateTime);
        }
    };

    this.itemClick = function (value, id, text, data) {
        var flag = true;
        if (_this3.props.onTextClick) {
            flag = _this3.props.onTextClick(value, id, text, data);
        } else {
            flag = true;
        }
        if (flag) {
            _this3.setState({
                value: value,
                searcheds: {}
            });
        }
        return flag;
    };

    this.searchChange = function (e) {
        _this3.setState({
            searchValue: e.target.value
        });
    };

    this.searchEvent = function (e) {
        console.log(e);
        if (!_this3.state.searchValue) {
            _this3.setState({
                searcheds: {}
            });
            return;
        }
        var tagName = e.target.tagName;
        if (tagName === 'INPUT') {
            var key = e.key;
            if (key !== 'Enter') {
                return;
            }
        }
        var data = _this3.props.data || [];
        var searcheds = {},
            openeds = _this3.state.openeds;
        data.forEach(function (item, index) {
            _this3.search(item, [index], searcheds, openeds);
        });
        _this3.setState({
            searcheds: searcheds,
            openeds: openeds
        });
    };

    this.search = function (item, order, searcheds, openeds) {
        var searched = false;
        var value = _this3.state.searchValue;
        var text = item[_this3.props.textKey || _this3.textKey];
        if (text.indexOf(value) > -1) {
            searcheds[order.join('-')] = true;
            searched = true;
        }
        var childSearched = false;
        var children = item['children'];
        if (children && children.length) {
            children.forEach(function (v, index) {
                var res = _this3.search(v, [].concat(_toConsumableArray(order), [index]), searcheds, openeds);
                childSearched = childSearched || res;
            });
        }
        if (childSearched) {
            openeds[order.join('-')] = 1;
        }
        return searched || childSearched;
    };
};

Tree.propTypes = {
    styleType: _propTypes2.default.string,
    data: _propTypes2.default.array,
    search: _propTypes2.default.bool,
    onTextClick: _propTypes2.default.func
};

exports.default = (0, _index2.default)(Tree, _logic2.default, _config2.default);