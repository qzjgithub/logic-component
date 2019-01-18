"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "status": {
        "disabled": {
            "classTrue": "disabled"
        },
        "flexIconClicked": {
            "target": "flexIcon",
            "event": {
                "click": 1
            }
        },
        "opened": {
            "classTrue": "opened",
            "motivation": {
                "flexIconClick": 2
            },
            "defaultState": false
        }
    },
    "motivation": {
        "flexIconClick": {
            "status": {
                "flexIconClicked": true
            },
            "trigger": true
        }
    },
    "keys": {
        "value": "",
        "text": "",
        "valueKey": "value",
        "textKey": "text",
        "idKey": "id",
        "iconKey": "icon",
        "iconEnable": false
    }
};