'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _logical = require('../../../common/logical');

var _logical2 = _interopRequireDefault(_logical);

var _config = require('../ASSETS/config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (WrappedComponent, logic, config) {
    config = Object.assign(_config2.default, config);

    var logicBone = (0, _logical2.default)(WrappedComponent, logic, config);

    return function (_logicBone) {
        _inherits(_class, _logicBone);

        function _class(props, context) {
            _classCallCheck(this, _class);

            return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));
        }

        _createClass(_class, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (this.config['i18n'] == 'public') {
                    var that = this;
                    try {
                        window['require'](['../ASSETS/i18n/' + config['language']], function (i18n) {
                            if (!window['i18n']) {
                                window['i18n'] = {};
                            }
                            window['i18n'] = Object.assign(window['i18n'], i18n);
                            if (that['onI18n']) {
                                that['onI18n'].call(that, i18n);
                            }
                            that.setState({
                                i18n: i18n
                            });
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }]);

        return _class;
    }(logicBone);
};