export default {
  "status": {
    "touched": {
      "target": "div2",
      "classTrue": "test-touched",
      "styleTrue": {
        "color": "#490344"
      },
      "event": {
        "click": (state) => {
          return !state['status']['touched'];
        }
      }
    },
    "on": {
      "target": "div1",
      "styleTrue": {
        "backgroundColor": "#ff00ff"
      },
      "styleFalse": {
        "backgroundColor": "#ffffff"
      },
      "event": {
        "mouseEnter": 1,
        "mouseLeave": 0
      }
    }
  },
  "motivation":{
    "mot":{
      "trigger":true,
      "status":{
        "touched": true,
        "on": true
      }
    }
  }
};