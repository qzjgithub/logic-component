"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SequenceEvent = function () {
    function SequenceEvent(events) {
        _classCallCheck(this, SequenceEvent);

        this.events = events || [];
    }

    _createClass(SequenceEvent, [{
        key: "execute",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                for (var _len = arguments.length, param = Array(_len), _key = 0; _key < _len; _key++) {
                    param[_key] = arguments[_key];
                }

                var ind;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(!this.events || !(this.events instanceof Array))) {
                                    _context.next = 3;
                                    break;
                                }

                                console.error("Events is not an Array");
                                return _context.abrupt("return");

                            case 3:
                                ind = 0;

                            case 4:
                                if (!(ind < this.events.length)) {
                                    _context.next = 11;
                                    break;
                                }

                                _context.next = 7;
                                return this.execOne(param, this.events[ind]);

                            case 7:
                                param = _context.sent;

                            case 8:
                                ind++;
                                _context.next = 4;
                                break;

                            case 11:
                                return _context.abrupt("return", param);

                            case 12:
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

                                if (!(method instanceof Function)) {
                                    _context2.next = 11;
                                    break;
                                }

                                _context2.prev = 2;
                                _context2.next = 5;
                                return method.apply(undefined, _toConsumableArray(param));

                            case 5:
                                result = _context2.sent;
                                _context2.next = 11;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2["catch"](2);

                                result = _context2.t0;

                            case 11:
                                if (result !== null && !(result instanceof Array) && !(result instanceof Promise)) {
                                    result = [result];
                                }
                                return _context2.abrupt("return", result || param);

                            case 13:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[2, 8]]);
            }));

            function execOne(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return execOne;
        }()
    }]);

    return SequenceEvent;
}();

module.exports = SequenceEvent;
// export default SequenceEvent;