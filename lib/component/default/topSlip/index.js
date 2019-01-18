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

var TopSlip = function (_Component) {
    _inherits(TopSlip, _Component);

    function TopSlip(props, context) {
        _classCallCheck(this, TopSlip);

        var _this = _possibleConstructorReturn(this, (TopSlip.__proto__ || Object.getPrototypeOf(TopSlip)).call(this, props, context));

        _this.playMessage = function () {
            var queue = _this.state.queue || [];
            var opened = false;
            if (!_this.state.status.hold) {
                if (queue.length) {
                    opened = true;
                    _this.message = queue.shift();
                }
                _this.setState({
                    queue: queue,
                    opened: opened
                });
            }
        };

        _this.timer = null;
        _this.message = '';
        var param = props['param'] || {};
        if (param['message']) {
            if (!param['queue']) {
                param['queue'] = [];
            }
            param['queue'].push(param['message']);
        }
        _this.state = {};
        return _this;
    }

    _createClass(TopSlip, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.timer = setTimeout(function () {
                _this2.playMessage();
            }, 200);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps, oldProps) {
            var param = newProps['param'] || {};
            if (param['message']) {
                var queue = this.state.queue || [];
                queue.push(param['message']);
                this.setState({
                    queue: queue
                });
                this.playMessage();
            }
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(props, newState) {
            var _this3 = this;

            var queue = newState.queue || [];
            if (this.timer) {
                clearTimeout(this.timer);
            }
            var play = false;
            switch (true) {
                case !newState.status.hold && !!queue.length:
                    play = true;
                    break;
                case newState.status.hold:
                    play = false;
                    break;
                case !!newState.opened:
                    play = true;
                    break;
                default:
            }
            if (play) {
                this.timer = setTimeout(function () {
                    _this3.playMessage();
                }, this.state.time || 1000);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var status = this.state.status || {};
            var show = !!status['hold'] || this.state.opened;
            return _react2.default.createElement(
                'div',
                { className: show ? 'opened' : '' },
                _react2.default.createElement(
                    'span',
                    { sign: "text" },
                    this.message
                )
            );
        }
    }]);

    return TopSlip;
}(_react.Component);

TopSlip.propTypes = {
    styleType: _propTypes2.default.string
};

exports.default = (0, _index2.default)(TopSlip, _logic2.default, _config2.default);