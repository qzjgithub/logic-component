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

var Dialog = function (_Component) {
    _inherits(Dialog, _Component);

    function Dialog(props, context) {
        _classCallCheck(this, Dialog);

        var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, props, context));

        _this.show = function () {
            var status = _this.state.status;
            status['closed'] = false;
            _this.setState({
                status: status
            });
        };

        _this.state = {};
        return _this;
    }

    _createClass(Dialog, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.show !== this.props.show) {
                var status = this.state.status;
                status['closed'] = !nextProps.show;
                this.setState({
                    status: status
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.show) {
                this.show();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'section',
                { id: this.props.id || 'dialog_' + new Date().getTime(), className: this.props.className || '' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'article',
                        { style: { height: this.props.height || '', width: this.props.width || '' } },
                        _react2.default.createElement(
                            'header',
                            { className: 'title' },
                            _react2.default.createElement(
                                'span',
                                null,
                                this.props.title
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: "cross-close", sign: 'close' },
                                _react2.default.createElement(_icon2.default, { type: 'guanbi1' })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'content' },
                            ' ',
                            this.props.children,
                            ' '
                        )
                    )
                )
            );
        }
    }]);

    return Dialog;
}(_react.Component);

Dialog.propTypes = {
    title: _propTypes2.default.string,
    height: _propTypes2.default.any,
    width: _propTypes2.default.any,
    id: _propTypes2.default.string,
    className: _propTypes2.default.string,
    show: _propTypes2.default.bool
};

exports.default = (0, _logical2.default)(Dialog, _logic2.default, _config2.default);