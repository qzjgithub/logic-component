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

var _treeItem = require('../treeItem');

var _treeItem2 = _interopRequireDefault(_treeItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = function (_Component) {
    _inherits(Tree, _Component);

    function Tree(props, context) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.state = _logic2.default.keys || {};
        return _this;
    }

    _createClass(Tree, [{
        key: 'render',
        value: function render() {
            var data = this.props.data || [];
            var last = this.props.last;
            var first = this.props.first;
            return _react2.default.createElement(
                'div',
                null,
                this.getTreeItem(data, first, last)
            );
        }
    }]);

    return Tree;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.getTreeItem = function (data, first, last) {
        var children = data['children'] || [];
        var props = Object.assign({}, _this2.props, { data: data, first: first, last: last });
        return _react2.default.createElement(
            _treeItem2.default,
            props,
            children && children.map(function (item, index) {
                return _this2.getTreeItem(item, index == 0, index == children.length - 1);
            })
        );
    };
};

Tree.propTypes = {
    styleType: _propTypes2.default.string,
    data: _propTypes2.default.object,
    last: _propTypes2.default.bool,
    first: _propTypes2.default.bool
};

exports.default = (0, _index2.default)(Tree, _logic2.default, _config2.default);