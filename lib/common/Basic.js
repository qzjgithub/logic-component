'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenLogic = require('./GenLogic');

var _GenLogic2 = _interopRequireDefault(_GenLogic);

var _Status = require('./Status');

var _Status2 = _interopRequireDefault(_Status);

var _SequenceEvent = require('./SequenceEvent');

var _SequenceEvent2 = _interopRequireDefault(_SequenceEvent);

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Basic = function (_Component) {
    _inherits(Basic, _Component);

    function Basic(props, context) {
        _classCallCheck(this, Basic);

        var _this = _possibleConstructorReturn(this, (Basic.__proto__ || Object.getPrototypeOf(Basic)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.initLogic();
        _this.signKV = new Map();

        _this.state = {
            status: _this.initStatus()
        };

        return _this;
    }

    //初始化logic对象


    _createClass(Basic, [{
        key: 'initLogic',
        value: function initLogic() {
            var _this2 = this;

            this.logic = new _GenLogic2.default({});
            var logic = this.props.logic;
            if (!logic) {
                return;
            }
            var status = logic.status,
                motivation = logic.motivation;

            if (!status || !Object.keys(status).length) {
                return;
            }
            if (!motivation) {
                motivation = {};
            }
            var hasMotStatus = {};
            Object.keys(status).forEach(function (sn) {
                var state = status[sn];
                var sm = state['motivation'];
                if (sm && Object.keys(sm).length) {
                    hasMotStatus[sn] = sm;
                }
                _this2.logic.addStatus(sn, state);
            });

            Object.keys(motivation).forEach(function (mn) {
                var mot = motivation[mn];
                _this2.logic.addMotivation(mn, mot);
            });

            Object.keys(hasMotStatus).forEach(function (sn) {
                var sm = hasMotStatus[sn];
                Object.keys(sm).forEach(function (mn) {
                    _this2.logic.setStatusMotivation(mn, sn, sm[mn]);
                });
            });
        }

        //初始化状态


        //得到dom

    }, {
        key: 'genSignKv',


        //生成targetKV键值对
        value: function genSignKv(status) {
            var _this3 = this;

            status.forEach(function (state, key) {
                var sign = state.target;
                if (!_this3.signKV.has(sign)) {
                    _this3.signKV.set(sign, new Set());
                }
                _this3.signKV.get(sign).add(key);
            });
        }

        //嵌套生成dom

    }, {
        key: 'genChildren',
        value: function genChildren(element) {
            var _this4 = this;

            if (_Util2.default.isArray(element) && element.length) {
                //如果是数组就循环解析元素
                return element.map(function (child) {
                    return _this4.genChildren(child);
                });
            } else if (_Util2.default.isKVObject(element)) {
                //如果是对象则先检测其状态，在检测其子元素
                var props = void 0,
                    sign = element.props.sign;
                if (sign && this.signKV.has(sign)) {
                    //检测是否需要与状态绑定
                    props = this.genStatusRelate(sign, element.props);
                }
                var children = element.props && element.props.children;
                if (children) {
                    //检测是否有子元素，有就继续循环解析元素
                    props = props || {};
                    props['children'] = this.genChildren(children);
                    return _react2.default.cloneElement(element, props);
                } else {
                    return props ? _react2.default.cloneElement(element, props) : element; //如果是叶子节点元素，则直接返回
                }
            } else {
                return element; //如果不是数组也不是对象则直接返回
            }
        }

        //生成对象关联status

    }, {
        key: 'genStatusRelate',
        value: function genStatusRelate(sign, props) {
            var _this5 = this;

            var newProps = {};
            var data = this.getStatusList(sign, props); //得到特定元素status的相关信息
            data['list'].forEach(function (v, k) {
                //一个事件对应一个对象，这个事件引起的值变化，激励响应都保存其中
                var seq = new _SequenceEvent2.default();
                seq.events.push(function (ev) {
                    var _info$oldEvent;

                    //第一个方法确定新值改变规律
                    _this5.logic.values = Object.assign({}, _this5.state.status);
                    var newValue = _this5.state.status;
                    Object.keys(v['status']).forEach(function (sk) {
                        var s = v['status'][sk];
                        if (s === 2) {
                            s = !newValue[sk];
                        }
                        newValue[sk] = s;
                    });

                    var data = _this5.triggerMotivation(v, _this5.logic.values, newValue); //得到状态改变引起的激励
                    var info = data.info,
                        oldValue = data.oldValue;

                    newValue = data['newValue'];

                    var result = info['oldEvent'] && (_info$oldEvent = info['oldEvent']).call.apply(_info$oldEvent, [_this5].concat([ev, oldValue, newValue, info['status']])); //执行原组件传入的方法
                    return result != undefined ? [info, oldValue, newValue, result] : [info, oldValue, newValue];
                });

                seq.events.push(function (info, oldValue, newValue, result) {
                    //第二个方法，根据新值的改变调用方法产生激励
                    var mev = void 0,
                        nParam = [oldValue, newValue, info['status']];
                    Object.keys(info['movt']).forEach(function (mn) {
                        //循环调用引起的激励产生的事件
                        if (info['movt'][mn]) {
                            var _mev;

                            mev = _this5.props['on' + _Util2.default.upFirstWord(mn)];
                            mev && (_mev = mev).call.apply(_mev, [_this5].concat(nParam));
                        }
                    });

                    var p = result != undefined ? [].concat(nParam, [result]) : nParam;
                    _this5.setState({
                        status: newValue
                    }, function () {
                        var onChange = _this5.props['onChanged']; //检测并调用onchange方法
                        if (onChange && JSON.stringify(newValue) != JSON.stringify(oldValue)) {
                            onChange.call.apply(onChange, [_this5].concat(_toConsumableArray(p)));
                        }
                    });
                    return p;
                });
                newProps[k] = function (ev) {
                    ev.stopPropagation();
                    seq.execute(ev);
                };
            });
            newProps = Object.assign(newProps, data['prop']);
            return newProps;
        }

        //根据status生成dom需要的状态信息，事件信息等

    }, {
        key: 'triggerMotivation',


        //循环检测完整激励
        value: function triggerMotivation(info, oldValue, newValue) {
            var _this6 = this;

            var movt = {};
            this.logic.motivation.forEach(function (motivation, name) {
                //检测此状态是否会引起激励变化
                if (info['movt'][name] == undefined) {
                    var isTouch = false,
                        isActive = true;
                    motivation.status.forEach(function (value, state) {
                        isTouch = isTouch || info['status'][state] != undefined;
                        isActive = isActive && newValue[state] == value;
                    });
                    isActive = isTouch && isActive;
                    movt[name] = motivation.trigger;
                }
            });
            var keys = Object.keys(movt);
            info['movt'] = Object.assign(info['movt'] || {}, movt);
            if (keys.length) {
                //如果有激励变化，检测引起的状态变化，再此检测是否有引起激励
                keys.forEach(function (mn) {
                    var mtos = _this6.logic.activeStatus.get(mn);
                    mtos && mtos.size && mtos.forEach(function (sn) {
                        var s = _this6.logic.status.get(sn);
                        var v = void 0;
                        switch (s.motivation.get(mn)) {
                            case 0:
                                v = false;
                                break;
                            case 1:
                                v = true;
                                break;
                            case 2:
                                v = 2;
                        }
                        newValue[v] = v == 2 ? !oldValue[sn] : v;
                        info['status'][sn] = v;
                    });
                });
                return this.triggerMotivation(info, oldValue, newValue);
            } else {
                return { info: info, oldValue: oldValue, newValue: newValue }; //没有引起激励变化则直接返回数据
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.getBone(),
                this.showState()
            );
        }
    }]);

    return Basic;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this7 = this;

    this.initStatus = function () {
        var status = {};
        _this7.logic.values.forEach(function (v, k) {
            status[k] = v;
        });
        return status;
    };

    this.getBone = function () {
        var children = _this7.props.children;
        if (!_this7.logic.status.size) {
            return children;
        } else {
            _this7.genSignKv(_this7.logic.status);
            var props = void 0;
            if (children instanceof Array) {
                props = _this7.genStatusRelate(_Status2.default.BASIC, _this7.props);
                return _react2.default.createElement('div', props, _this7.genChildren(children));
            } else {
                props = _this7.genStatusRelate(_Status2.default.BASIC, children.props);
                props['children'] = _this7.genChildren(children.props.children);
                return _react2.default.cloneElement(children, props);
            }
        }
    };

    this.showState = function () {
        var status = [];
        Object.keys(_this7.state.status).forEach(function (k) {
            status.push(_react2.default.createElement(
                'div',
                null,
                k,
                ' : ',
                _this7.state.status[k].toString()
            ));
        });
        return status;
    };

    this.getStatusList = function (sign, props) {
        var statusSet = _this7.signKV.get(sign);
        var list = new Map();
        var className = props['className'] || '';
        var style = props['style'] || {};
        statusSet && statusSet.forEach(function (state) {
            var status = _this7.logic.status.get(state);
            status.event.forEach(function (value, event) {
                var name = 'on' + _Util2.default.upFirstWord(event);
                if (!list.has(name)) {
                    list.set(name, {
                        oldEvent: props[name],
                        status: {}
                    });
                }
                var sts = list.get(name)['status'];
                switch (value) {
                    case 0:
                        sts[state] = false;
                        break;
                    case 1:
                        sts[state] = true;
                        break;
                    case 2:
                        sts[state] = 2;
                }
            });
            if (status.styleToDom) {
                var tail = _Util2.default.upFirstWord(_this7.state.status[state].toString());
                className += ' ' + (status['class' + tail] || []).join(' ');
                style = Object.assign({}, style, status['style' + tail]);
            }
        });
        return { list: list, prop: { className: className, style: style } };
    };
};

Basic.propTypes = {
    logic: _propTypes2.default.object
};

module.exports = Basic;