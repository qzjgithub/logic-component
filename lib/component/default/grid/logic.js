"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "status": {
    "mouseDown": {
      "styleTrue": {
        "backgroundColor": "#000000"
      },
      "styleFalse": {
        "backgroundColor": "transparent"
      },
      "event": {
        "mouseDown": 1,
        "mouseUp": 0
      }
    },
    "btnState": {
      "target": "btn",
      "event": {
        "mouseEnter": 2
      }
    },
    "gridBord": {
      "styleTrue": {
        "border": "1px solid #000000"
      },
      "styleFalse": {
        "border": "0px solid #000000"
      },
      "motivation": {
        "btnEvent": 2
      }
    }
  },
  "motivation": {
    "btnEvent": {
      "status": {
        "btnState": true
      }
    }
  }
};