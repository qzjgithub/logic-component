"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _GenLogic = require("./GenLogic");

var _GenLogic2 = _interopRequireDefault(_GenLogic);

var _Status = require("./Status");

var _Status2 = _interopRequireDefault(_Status);

var _Util = require("./Util");

var _Util2 = _interopRequireDefault(_Util);

var _SequenceEvent = require("./SequenceEvent");

var _SequenceEvent2 = _interopRequireDefault(_SequenceEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var logical = function logical(WrappedComponent, logic) {
    var _class, _temp, _initialiseProps;

    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return _temp = _class = function (_WrappedComponent) {
        _inherits(_class, _WrappedComponent);

        function _class(props, context) {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props, context));

            _initialiseProps.call(_this);

            _this.initLogic();
            _this.signKV = new Map();
            _this.keys = _this.initKeys();
            _this.state = Object.assign({}, _this.state || {}, {
                status: _this.initStatus()
            });
            _this.config = config;

            if (_this.onLogicalInit) {
                _this.onLogicalInit.call(_this, _this.logic, _this.state);
            }
            return _this;
        }

        //初始化logic对象


        _createClass(_class, [{
            key: "initLogic",
            value: function initLogic() {
                var _this2 = this;

                this.logic = new _GenLogic2.default({});
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


            //初始化key值

        }, {
            key: "genSignKv",


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

            /*  componentWillReceiveProps(nextProp){
                 if(super.componentWillReceiveProps){
                     super.componentWillReceiveProps(nextProp);
                 }
                 this.logic.values = Object.assign({},this.state.status);
                 let newStatus = this.state.status,status = {};
                 if(newStatus){
                     for(let k in newStatus){
                         if(nextProp[k]!=undefined){
                             if(nextProp[k]!=status[k]){
                                 status[k] = nextProp[k];
                             }
                             newStatus[k] = nextProp[k];
                         }
                     }
                 }
                 let { info , oldValue, newValue } =
                     this.triggerMotivation({ status: status },this.logic.values, newStatus);
                 let param = [oldValue, newValue, info['status']], mev;
                 Object.keys(info['movt']).forEach((mn)=>{
                     if(info['movt'][mn]){
                         mev = this.props['on'+Util.upFirstWord(mn)];
                         mev && mev.call(this,...param);
                     }
                 });
                 let keys = nextProp && nextProp['param'] || {};
                 this.setState(Object.assign({
                     status : newValue
                 },keys),()=>{
                     param.push(this.state)
                     let onChanged = this.props['onChanged']; //检测并调用onchange方法
                     if(onChanged && JSON.stringify(newValue) != JSON.stringify(oldValue)){
                         onChanged.call(this,...param);
                     }
                 });
             } */

            //得到dom

        }, {
            key: "genChildren",


            //嵌套生成dom
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
                        //检测是否有子元素，且不是logical包装过的元素，就继续循环解析元素
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
            key: "genStatusRelate",
            value: function genStatusRelate(sign, props) {
                var _this5 = this;

                var newProps = {};
                var data = this.getStatusList(sign, props); //得到特定元素status的相关信息
                data['list'].forEach(function (v, k) {
                    //一个事件对应一个对象，这个事件引起的值变化，激励响应都保存其中
                    var seq = new _SequenceEvent2.default();
                    seq.events.push(function (ev) {
                        //第一个方法确定新值改变规律
                        _this5.logic.values = Object.assign({}, _this5.state.status);
                        var newValue = Object.assign({}, _this5.state.status);
                        var newState = Object.assign({}, _this5.state);
                        Object.keys(v['status']).forEach(function (sk) {
                            var s = v['status'][sk];
                            if (s === 2) {
                                newValue[sk] = !newValue[sk];
                            } else if (s instanceof Function) {
                                newState = _this5.call(_this5, _this5.state, newValue);
                                newValue = newState.status;
                            } else {
                                newValue[sk] = s;
                            }
                        });

                        var data = _this5.triggerMotivation(v, _this5.logic.values, newValue); //得到状态改变引起的激励
                        var info = data.info,
                            oldValue = data.oldValue;

                        newValue = data['newValue'];
                        newState['status'] = newValue;

                        if (info['oldEvent']) {
                            var _info$oldEvent;

                            var eValue = (_info$oldEvent = info['oldEvent']).call.apply(_info$oldEvent, [_this5].concat([ev, oldValue, newValue, info['status'], newState])); //执行原组件传入的方法
                            newValue = eValue || newValue;
                        }
                        return [info, oldValue, newValue, newState];
                    });

                    seq.events.push(function (info, oldValue, newValue, newState) {
                        //第二个方法，根据新值的改变调用方法产生激励
                        var mev = void 0,
                            nParam = [oldValue, newValue, info['status'], newState];
                        Object.keys(info['movt']).forEach(function (mn) {
                            //循环调用引起的激励产生的事件
                            if (info['movt'][mn]) {
                                var _mev;

                                mev = _this5.props['on' + _Util2.default.upFirstWord(mn)];
                                mev && (_mev = mev).call.apply(_mev, [_this5].concat(nParam));
                            }
                        });

                        _this5.setState(newState, function () {
                            nParam.push(_this5.state);
                            var onChanged = _this5.props['onChanged']; //检测并调用onchanged方法
                            if (onChanged && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                                onChanged.call.apply(onChanged, [_this5].concat(nParam));
                            }
                            var parentK = _this5.props[k];
                            parentK && parentK.call.apply(parentK, [_this5].concat(nParam));
                        });
                        return nParam;
                    });
                    newProps[k] = function (ev) {
                        ev && ev.stopPropagation && ev.stopPropagation();
                        seq.execute(ev);
                    };
                });
                newProps = Object.assign(newProps, data['prop']);
                return newProps;
            }

            //根据status生成dom需要的状态信息，事件信息等

        }, {
            key: "triggerMotivation",


            //循环检测完整激励
            value: function triggerMotivation(info, oldValue, newValue) {
                var _this6 = this;

                info['movt'] = info['movt'] || {};
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
                        if (isActive) {
                            movt[name] = motivation.trigger;
                        }
                    }
                });
                var keys = Object.keys(movt);
                info['movt'] = Object.assign(info['movt'], movt);
                if (keys.length) {
                    //如果有激励变化，检测引起的状态变化，再此检测是否有引起激励
                    keys.forEach(function (mn) {
                        var mtos = _this6.logic.activeStatus.get(mn);
                        mtos && mtos.size && mtos.forEach(function (sn) {
                            var s = _this6.logic.status.get(sn);
                            var v = s.motivation.get(mn);
                            switch (v) {
                                case 0:
                                    v = false;
                                    break;
                                case 1:
                                    v = true;
                                    break;
                                case 2:
                                    v = 2;
                                    break;
                                default:
                                    v = !!v.call(_this6, _this6.state);
                            }
                            newValue[sn] = v == 2 ? !oldValue[sn] : v;
                            info['status'][sn] = v;
                        });
                    });
                    return this.triggerMotivation(info, oldValue, newValue);
                } else {
                    return { info: info, oldValue: oldValue, newValue: newValue }; //没有引起激励变化则直接返回数据
                }
            }

            //检查父prop上是否还有未实现的方法

        }, {
            key: "checkProps",
            value: function checkProps(props) {
                var _this7 = this;

                var reg = new RegExp(/^on.+$/);
                Object.keys(this.props).forEach(function (key) {
                    if (reg.test(key) && !props[key]) {
                        props[key] = _this7.props[key];
                    }
                });
                if (this.props['className']) {
                    props['className'] += " " + this.props['className'];
                }
                if (this.props['style']) {
                    Object.assign(props['style'], this.props['style']);
                }
                return props;
            }
        }, {
            key: "render",
            value: function render() {
                return this.getBone(_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "render", this).call(this));
            }
        }]);

        return _class;
    }(WrappedComponent), _initialiseProps = function _initialiseProps() {
        var _this8 = this;

        this.initStatus = function () {
            var status = {};
            _this8.logic.values.forEach(function (v, k) {
                var pv = _this8.props[k];
                status[k] = pv == undefined ? v : pv;
            });
            return status;
        };

        this.initKeys = function () {
            var keys = void 0;
            var param = _this8.props['param'] || {};
            if (logic && logic['keys']) {
                keys = logic['keys'];
                for (var key in keys) {
                    var pk = param[key];
                    if (pk !== undefined) {
                        keys[key] = pk;
                    }
                }
            }
            return keys;
        };

        this.getBone = function (bone) {
            var children = bone;
            if (!_this8.logic.status.size) {
                var props = children.props;
                var className = ((config['name'] || '') + " " + (props['className'] || '')).trim();
                return _react2.default.cloneElement(children, { className: className });
            } else {
                _this8.genSignKv(_this8.logic.status);
                var _props = _this8.genStatusRelate(_Status2.default.BASIC, children.props);
                _props['children'] = _this8.genChildren(children.props.children);
                _props = _this8.checkProps(_props);
                _props['className'] = ((config['name'] || '') + " " + _props['className']).trim();

                return _react2.default.cloneElement(children, _props);
            }
        };

        this.getStatusList = function (sign, props) {
            var statusSet = _this8.signKV.get(sign);
            var list = new Map();
            var className = props['className'] || '';
            var style = props['style'] || {};
            statusSet && statusSet.forEach(function (state) {
                var status = _this8.logic.status.get(state);
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
                            break;
                        default:
                            sts[state] = value;
                    }
                });
                if (status.styleToDom) {
                    var tail = _Util2.default.upFirstWord(_this8.state.status[state].toString());
                    className += ' ' + Array.from(status["class" + tail] || []).join(' ');
                    style = Object.assign({}, style, status["style" + tail]);
                }
                className = className.trim();
            });
            return { list: list, prop: { className: className, style: style } };
        };
    }, _temp;
};
exports.default = logical;