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

var _Util = require('../../../common/Util');

var _Util2 = _interopRequireDefault(_Util);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Component) {
    _inherits(Select, _Component);

    function Select(props, context) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context));

        _this.componentDidMount = function () {
            _this.initParam();
        };

        _this.initParam = function () {
            var param = _this.props['param'] || {};
            var value = param.value,
                index = param.index,
                data = param.data;

            var selectedIndex = 0,
                item = void 0;
            if (value) {
                for (var i = 0; i < data.length; i++) {
                    item = data[i];
                    if (item['value'] == value) {
                        selectedIndex = i;
                        break;
                    }
                }
            } else if (typeof index == 'number' && index >= 0 && index < data.length) {
                selectedIndex = index;
            }
            item = data[selectedIndex];
            _this.setState({
                value: item[_this.state['valueKey']],
                text: item[_this.state['textKey']],
                index: selectedIndex
            });
        };

        _this.itemClick = function (item) {
            _this.setState({
                value: item[_this.state['valueKey']],
                text: item[_this.state['textKey']]
            });
        };

        _this.state = {
            i18n: {}
        };
        return _this;
    }

    _createClass(Select, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var displayKey = 'text',
                value = this.state['value'];
            if (!_Util2.default.isStringWithoutNull(value)) {
                displayKey = 'defaultText';
            }
            var data = this.state['data'];
            if (!data || !data.length) {
                displayKey = 'noDataText';
            }
            var lang = this.state['i18n'];
            var textKey = this.state['textKey'];
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _button2.default,
                    { styleType: 'left', className: 'text', sign: 'text' },
                    this.state[displayKey] || lang[displayKey],
                    _react2.default.createElement(
                        'svg',
                        { className: 'iconfont' },
                        _react2.default.createElement(
                            'use',
                            { xlinkHref: '#icon-triangledownfill' },
                            ' '
                        )
                    )
                ),
                data && data.length ? _react2.default.createElement(
                    'ul',
                    { className: 'list', sign: 'list' },
                    data.map(function (item, ind) {
                        return _react2.default.createElement(
                            'li',
                            { key: ind, sign: 'item',
                                onClick: function onClick() {
                                    _this2.itemClick(item);
                                } },
                            item[textKey]
                        );
                    })
                ) : ''
            );
        }
    }]);

    return Select;
}(_react.Component);

Select.propTypes = {
    styleType: _propTypes2.default.string
};

exports.default = (0, _index2.default)(Select, _logic2.default, _config2.default);