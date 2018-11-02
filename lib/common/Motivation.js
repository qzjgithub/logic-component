'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Util = require('./Util');

var _Util2 = _interopRequireDefault(_Util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Motivation = function () {
    //状态集
    function Motivation(object) {
        var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, Motivation);

        this.coverStatus(object);
        this._trigger = !!trigger;
        this._object = object;
        this._trigger = trigger;
    }

    //是否触发事件


    _createClass(Motivation, [{
        key: 'coverStatus',
        value: function coverStatus(object) {
            this._status = new Map();
            if (_Util2.default.isKVObjectWithStringKey(object)) {
                this._status = _Util2.default.objectToMap(object);
            }
            for (var key in this._status) {
                this._status.set(key, !!this._status.get(key));
            }
        }
    }, {
        key: 'setStatus',
        value: function setStatus(name) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (_Util2.default.isStringWithoutNull(name)) {
                this._status.set(name, !!value);
            }
        }
    }, {
        key: 'deleteStatus',
        value: function deleteStatus(name) {
            if (_Util2.default.isStringWithoutNull(name) && this._status.has(name)) {
                this._status.delete(name);
            }
        }
    }, {
        key: 'clearStatus',
        value: function clearStatus() {
            this._status.clear();
        }
    }, {
        key: 'trigger',
        get: function get() {
            return this._trigger;
        },
        set: function set(value) {
            this._trigger = value;
        }
    }, {
        key: 'status',
        get: function get() {
            return this._status;
        }
    }]);

    return Motivation;
}();

exports.default = Motivation;