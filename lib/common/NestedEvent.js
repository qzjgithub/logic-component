"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NestedEvent = function () {
    function NestedEvent(before, action, after) {
        _classCallCheck(this, NestedEvent);

        this.before = before;
        this.action = action;
        this.after = after;
    }

    _createClass(NestedEvent, [{
        key: "execute",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                for (var _len = arguments.length, param = Array(_len), _key = 0; _key < _len; _key++) {
                    param[_key] = arguments[_key];
                }

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.t0 = this;
                                _context.t1 = this;
                                _context.next = 4;
                                return this.execOne(param, this.before);

                            case 4:
                                _context.t2 = _context.sent;
                                _context.t3 = this.action;
                                _context.next = 8;
                                return _context.t1.execOne.call(_context.t1, _context.t2, _context.t3);

                            case 8:
                                _context.t4 = _context.sent;
                                _context.t5 = this.after;
                                _context.next = 12;
                                return _context.t0.execOne.call(_context.t0, _context.t4, _context.t5);

                            case 12:
                                return _context.abrupt("return", _context.sent);

                            case 13:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function execute() {
                return _ref.apply(this, arguments);
            }

            return execute;
        }()
    }, {
        key: "execOne",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(param, method) {
                var result;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                result = null;

                                if (!(method instanceof NestedEvent)) {
                                    _context2.next = 5;
                                    break;
                                }

                                result = method.execute.apply(method, _toConsumableArray(param));
                                _context2.next = 15;
                                break;

                            case 5:
                                if (!(method instanceof Function)) {
                                    _context2.next = 15;
                                    break;
                                }

                                _context2.prev = 6;
                                _context2.next = 9;
                                return method.apply(undefined, _toConsumableArray(param));

                            case 9:
                                result = _context2.sent;
                                _context2.next = 15;
                                break;

                            case 12:
                                _context2.prev = 12;
                                _context2.t0 = _context2["catch"](6);

                                result = _context2.t0;

                            case 15:
                                if (result !== null && !(result instanceof Array) && !(result instanceof Promise)) {
                                    result = [result];
                                }
                                return _context2.abrupt("return", result || param);

                            case 17:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[6, 12]]);
            }));

            function execOne(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return execOne;
        }()
    }]);

    return NestedEvent;
}();

module.exports = NestedEvent;