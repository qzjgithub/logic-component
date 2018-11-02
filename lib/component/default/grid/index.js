'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../basic/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../button/index');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('../input/index');

var _index6 = _interopRequireDefault(_index5);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _logic = require('./logic.js');

var _logic2 = _interopRequireDefault(_logic);

require('./index.styl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Grid = function (_Component) {
    _inherits(Grid, _Component);

    function Grid(props, context) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props, context));

        _this.onButtonChanged = function (o, n, s) {
            console.log(o, n, s);
        };

        _this.onInputChanged = function (o, n, s) {
            // console.log(o,n,s);
        };

        _this.onButtonClick = function (o, n, s) {
            // console.log(o,n,s);
        };

        _this.onLogicalInit = function (logical, status) {
            console.log(logical, status);
        };

        return _this;
    }

    _createClass(Grid, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: _config2.default.name },
                _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            _index4.default,
                            { sign: 'btn', onChanged: this.onButtonChanged, onClick: this.onButtonClick },
                            _react2.default.createElement(
                                'a',
                                null,
                                '+'
                            ),
                            '\u6DFB\u52A0',
                            _react2.default.createElement(
                                _index4.default,
                                null,
                                '\u2026\u2026'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'ul',
                    null,
                    '\u5217\u8868'
                ),
                _react2.default.createElement(_index6.default, { onChanged: this.onInputChanged })
            );
        }
    }]);

    return Grid;
}(_react.Component);

exports.default = (0, _index2.default)(Grid, _logic2.default, _config2.default);