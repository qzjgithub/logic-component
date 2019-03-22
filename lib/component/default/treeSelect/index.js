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

var _Util = require('../../../common/Util');

require('./index.styl');

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _tree = require('../tree');

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TreeSelect = function (_Component) {
    _inherits(TreeSelect, _Component);

    function TreeSelect(props, context) {
        _classCallCheck(this, TreeSelect);

        var _this = _possibleConstructorReturn(this, (TreeSelect.__proto__ || Object.getPrototypeOf(TreeSelect)).call(this, props, context));

        _initialiseProps.call(_this);

        var _this$props = _this.props,
            value = _this$props.value,
            initValue = _this$props.initValue,
            mode = _this$props.mode;

        value = (0, _Util.isRealOrZero)(value) ? value : initValue;
        if (!(0, _Util.isRealOrZero)(value)) {
            switch (mode) {
                case 'multi':
                    value = [];
                    break;
                case 'single':
                default:
                    value = undefined;
            }
        }
        _this.state = {
            value: value,
            text: props.text
        };
        return _this;
    }

    _createClass(TreeSelect, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var value = nextProps.value;
            if ((0, _Util.isRealOrZero)(value)) {
                this.setState({
                    value: nextProps.value
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var displayKey = '',
                value = this.state['value'];
            if (!value && value != 0 || value instanceof Array && !value.length) {
                displayKey = 'defaultText';
            }
            var text = this.getText();
            if (displayKey) {
                text = this.props[displayKey] || this[displayKey];
            }
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _button2.default,
                    { styleType: 'left', className: 'text', sign: 'text', style: { height: this.props.height || '', width: this.props.width || '' } },
                    _react2.default.createElement(_icon2.default, { type: 'unfold' }),
                    text || value
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'treeList', sign: 'treeList' },
                    _react2.default.createElement(_tree2.default, this.getTreeConfig())
                )
            );
        }
    }]);

    return TreeSelect;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.getValue = function () {
        return _this2.state.value;
    };

    this.clear = function () {
        var value = void 0;
        switch (_this2.props.mode) {
            case 'multi':
                value = [];
                break;
            case 'single':
            default:
                value = '';
        }
        _this2.setState({
            value: value
        });
    };

    this.getTreeConfig = function () {
        var config = _this2.props.treeConfig || {};
        config = Object.assign({}, config, {
            selectMode: _this2.props.mode,
            value: _this2.state.value
        });
        var textClick = config.onTextClick;
        config.onTextClick = function (value, id, text, data) {
            _this2.setState({
                value: value,
                text: text
            });
            if (textClick) {
                textClick(value, id, text, data);
            }
        };
        return config;
    };

    this.getText = function () {
        var _props = _this2.props,
            getText = _props.getText,
            treeConfig = _props.treeConfig,
            mode = _props.mode;

        if (getText) {
            return text(_this2.state.value, (treeConfig || {}).data || []);
        } else {
            switch (mode) {
                case 'multi':
                    return (_this2.state.value || []).length;
                case 'single':
                case 'auto':
                default:
                    return _this2.state.text;
            }
        }
    };
};

TreeSelect.propTypes = {
    height: _propTypes2.default.any,
    width: _propTypes2.default.any,
    mode: _propTypes2.default.string, //multi,single
    initValue: _propTypes2.default.any,
    value: _propTypes2.default.any,
    treeConfig: _propTypes2.default.object,
    defaultText: _propTypes2.default.string,
    noDataText: _propTypes2.default.string,
    text: _propTypes2.default.string,
    getText: _propTypes2.default.func
};

exports.default = (0, _logical2.default)(TreeSelect, _logic2.default, _config2.default);