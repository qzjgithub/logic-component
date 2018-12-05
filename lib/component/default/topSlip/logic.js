"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "status": {
        "target": "text",
        "hold": {
            "styleToDom": false,
            "event": {
                mouseEnter: 1,
                mouseLeave: 0
            }
        }
    },
    "keys": {
        opened: false,
        increase: false,
        message: '',
        queue: [],
        time: 3000,
        maxNumber: 30
    }
};