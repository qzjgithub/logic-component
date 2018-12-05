"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "status": {
        "touched": {
            "event": {
                "blur": 1
            }
        },
        "empty": {
            "event": {
                change: function change(state) {
                    var v = state['value'];
                    return v == '' || v == undefined || v == null;
                }
            }
        }
    }
};