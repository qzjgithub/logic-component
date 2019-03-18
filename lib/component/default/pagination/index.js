'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.styl');

var _Util = require('../../../common/Util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
    _inherits(Pagination, _Component);

    function Pagination(props, context) {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.state = _this.initParam(props);
        return _this;
    }

    _createClass(Pagination, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState(this.initParam(Object.assign({}, this.state, nextProps || {})));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.getElementDom()
            );
        }
    }]);

    return Pagination;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.initParam = function (props) {
        var curPage = props.curPage,
            pageSize = props.pageSize,
            total = props.total;

        pageSize = Number(pageSize) || 20;
        total = Number(total);
        total = (0, _Util.isRealOrZero)(total) ? total : 0;
        curPage = Number(curPage) || 0;
        return _this3.getRightState({ curPage: curPage, pageSize: pageSize, total: total });
    };

    this.setPrev = function () {
        var curPage = _this3.state.curPage - 1;
        _this3.setStateAndTrigger({ curPage: curPage });
    };

    this.setNext = function () {
        var curPage = _this3.state.curPage + 1;
        _this3.setStateAndTrigger({ curPage: curPage });
    };

    this.setCurPage = function (curPage) {
        curPage = Number(curPage) || _this3.state.curPage;
        _this3.setStateAndTrigger({ curPage: curPage });
    };

    this.setFirstPage = function () {
        var curPage = 1;
        _this3.setStateAndTrigger({ curPage: curPage });
    };

    this.setLastPage = function () {
        var curPage = _this3.state.pages;
        _this3.setStateAndTrigger({ curPage: curPage });
    };

    this.setPageSize = function (pageSize) {
        pageSize = Number(pageSize) || _this3.state.pageSize;
        _this3.setStateAndTrigger({ pageSize: pageSize });
    };

    this.getRightState = function (param) {
        var curPage = param.curPage,
            pageSize = param.pageSize,
            total = param.total;

        var pages = Math.ceil(total / pageSize);
        if (curPage < 1) {
            curPage = pages ? 1 : 0;
        } else if (curPage > pages) {
            curPage = pages;
        }
        return { curPage: curPage, pageSize: pageSize, total: total, pages: pages };
    };

    this.setStateAndTrigger = function (param) {
        _this3.setState(_this3.getRightState(Object.assign({}, _this3.state, param)), function () {
            var onChange = _this3.props.onChange;
            if (onChange) {
                onChange(Object.assign({}, _this3.state));
            }
        });
    };

    this.getElementDom = function () {
        var children = _this3.props.children;
        if (!children) {
            return children;
        } else {
            if (!(0, _Util.isArray)(children)) {
                children = [children];
            }
            return children.map(function (child) {
                if (child && child.props) {
                    var _child$props = child.props,
                        type = _child$props.type,
                        text = _child$props.text;

                    var bridge = void 0;
                    switch (type) {
                        case 'prev':
                            bridge = function bridge() {
                                _this3.setPrev();
                            };
                            break;
                        case 'next':
                            bridge = function bridge() {
                                _this3.setNext();
                            };
                            break;
                        case 'first':
                            bridge = function bridge() {
                                _this3.setFirstPage();
                            };
                            break;
                        case 'last':
                            bridge = function bridge() {
                                _this3.setLastPage();
                            };
                            break;
                        case 'page':
                            bridge = function bridge(curPage) {
                                _this3.setCurPage(curPage);
                            };
                            break;
                        case 'pageSize':
                            bridge = function bridge(pageSize) {
                                _this3.setPageSize(pageSize);
                            };
                            break;
                        case 'text':
                            if (text) {
                                return _react2.default.cloneElement(child, {
                                    children: text(Object.assign({}, _this3.state))
                                });
                            }
                    }
                    return _react2.default.cloneElement(child, { bridge: bridge });
                } else {
                    return child;
                }
            });
        }
    };
};

Pagination.propTypes = {
    curPage: _propTypes2.default.number,
    pageSize: _propTypes2.default.number,
    total: _propTypes2.default.number,
    onChange: _propTypes2.default.func
};

var PageElement = function (_Component2) {
    _inherits(PageElement, _Component2);

    function PageElement(props, context) {
        _classCallCheck(this, PageElement);

        var _this2 = _possibleConstructorReturn(this, (PageElement.__proto__ || Object.getPrototypeOf(PageElement)).call(this, props, context));

        _this2.getDom = function () {
            var _this2$props = _this2.props,
                type = _this2$props.type,
                event = _this2$props.event,
                param = _this2$props.param,
                children = _this2$props.children,
                bridge = _this2$props.bridge;

            if (type !== 'text' && children && children.props) {
                var oldEvent = void 0;
                if (event) {
                    oldEvent = children.props[event];
                    return _react2.default.cloneElement(children, _defineProperty({}, event, function () {
                        var flag = true;
                        if (oldEvent) {
                            flag = oldEvent.apply(undefined, arguments);
                        }
                        if (!flag) return;
                        var triggerParam = void 0;
                        if (param) {
                            triggerParam = param.apply(undefined, arguments);
                        }
                        bridge && bridge(triggerParam);
                    }));
                }
            }
            return children;
        };

        return _this2;
    }

    _createClass(PageElement, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _react.Fragment,
                null,
                this.getDom()
            );
        }
    }]);

    return PageElement;
}(_react.Component);

PageElement.propTypes = {
    type: _propTypes2.default.string, //prev,next,first,last,page,pageSize,text
    event: _propTypes2.default.string,
    param: _propTypes2.default.string,
    bridge: _propTypes2.default.func,
    text: _propTypes2.default.func
};

Pagination.PageElement = PageElement;

exports.default = Pagination;