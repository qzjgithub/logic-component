'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

var _Status = require('./Status');

var _Status2 = _interopRequireDefault(_Status);

var _Motivation = require('./Motivation');

var _Motivation2 = _interopRequireDefault(_Motivation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenLogic = function () {

    //自定义激励集

    //状态集
    function GenLogic(object) {
        var _this = this;

        _classCallCheck(this, GenLogic);

        this._status = new Map();
        this._values = new Map();
        this._motivation = new Map();
        this._activeStatus = new Map();
        if (_Util2.default.isKVObjectWithStringKey(object)) {
            this._status = _Util2.default.objectToMap(object);
            this.status.forEach(function (s, key) {
                _this.status.set(key, new _Status2.default(_Util2.default.isKVObject(s) ? s : {}));
                _this.values.set(key, _this.status.get(key).defaultState);
            });
        }
    }

    /**
     * 添加激励
     * @param name
     * @param status
     * @param trigger
     */


    //motivation激活status的Map


    //状态值


    _createClass(GenLogic, [{
        key: 'addMotivation',
        value: function addMotivation(name, _ref) {
            var status = _ref.status,
                _ref$trigger = _ref.trigger,
                trigger = _ref$trigger === undefined ? false : _ref$trigger;

            if (!_Util2.default.isStringWithoutNull(name)) {
                console.error("the name is not a string.");
                return;
            }
            if (this.motivation.has(name)) {
                console.error('motivation have the ' + name);
                return;
            }
            if (!_Util2.default.isKVObjectWithStringKey(status)) {
                console.error("status for motivation is not a kv object with string.");
                return;
            }
            /*if(Object.keys(status).length < 1){
                console.error("a motivation must be use at least two status.");
                return;
            }*/
            for (var key in status) {
                if (!this.status.has(key)) {
                    console.error('has no status name ' + key + '.');
                    return;
                }
            }

            this.motivation.set(name, new _Motivation2.default(status, trigger));
        }

        /**
         * 删除某个激励
         * @param name
         */

    }, {
        key: 'deleteMotivation',
        value: function deleteMotivation(name) {
            if (!_Util2.default.isStringWithoutNull(name) || !this.motivation.has(name)) {
                console.log('motivation name ' + name + ' is not right');
                return;
            }
            var sm = void 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.keys(this.status)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    sm = this.status.get(key)._motivation;
                    if (sm.has(name)) {
                        console.error('has status contain motivation name ' + name);
                        return;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.motivation.delete(name);
        }

        /**
         * 添加Status
         * @param name
         * @param object
         */

    }, {
        key: 'addStatus',
        value: function addStatus(name, object) {
            if (_Util2.default.isStringWithoutNull(name) && !this.status.has(name) && _Util2.default.isKVObjectWithStringKey(object)) {
                var s = new _Status2.default(object);
                this.status.set(name, s);
                this.values.set(name, s.defaultState);
            }
        }

        /**
         * 删掉某个status
         * @param name
         */

    }, {
        key: 'deleteStatus',
        value: function deleteStatus(name) {
            if (!_Util2.default.isStringWithoutNull(name) || !this.status.has(name)) {
                console.error('status name ' + name + ' is not right');
                return;
            }
        }

        /**
         * 为某个status添加某个激励
         * @param motivation
         * @param status
         * @param type
         */

    }, {
        key: 'setStatusMotivation',
        value: function setStatusMotivation(motivation, status, type) {
            if (!_Util2.default.isStringWithoutNull(motivation) || !_Util2.default.isStringWithoutNull(status)) {
                console.error('motivation or status name not right.');
                return;
            }
            if (!this.motivation.has(motivation) || !this.status.has(status)) {
                console.error('have no motivation name ' + motivation + ' or have no status name ' + status);
                return;
            }
            var m = this.motivation.get(motivation);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = Object.keys(m.status)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var sk = _step2.value;

                    if (sk === status) {
                        console.error('the motivation ' + motivation + ' contains the status ' + status);
                        return;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            var s = this.status.get(status);
            s.setMotivation(motivation, type);
            if (!this.activeStatus.has(motivation)) {
                this.activeStatus.set(motivation, new Set());
            }
            this.activeStatus.get(motivation).add(status);
        }

        /**
         * 删掉某个status的motivation
         * @param motivation
         * @param status
         */

    }, {
        key: 'deleteStatusMotivation',
        value: function deleteStatusMotivation(motivation, status) {
            if (!_Util2.default.isStringWithoutNull(motivation) || !_Util2.default.isStringWithoutNull(status)) {
                console.error('motivation or status name not right.');
                return;
            }
            if (!this.motivation.has(motivation) || !this.status.has(status)) {
                console.error('have no motivation name ' + motivation + ' or have no status name ' + status);
                return;
            }
            this.status.get(status).deleteMotivation(motivation);
            this.activeStatus.get(motivation).delete(status);
        }
    }, {
        key: 'values',
        get: function get() {
            return this._values;
        },
        set: function set(value) {
            this._values = value;
        }
    }, {
        key: 'motivation',
        get: function get() {
            return this._motivation;
        },
        set: function set(value) {
            this._motivation = value;
        }
    }, {
        key: 'activeStatus',
        get: function get() {
            return this._activeStatus;
        },
        set: function set(value) {
            this._activeStatus = value;
        }
    }, {
        key: 'status',
        get: function get() {
            return this._status;
        },
        set: function set(value) {
            this._status = value;
        }
    }]);

    return GenLogic;
}();

module.exports = GenLogic;
exports.default = GenLogic;