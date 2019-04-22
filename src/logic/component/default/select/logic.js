export default {
    "status": {
        "opened":{
            "classTrue":"opened",
            "motivation":{
                "textClick": 2,
                "itemClick": 0,
                "textBlur": 0
            }
        },
        "textClicked":{
            "target": "text",
            "event":{
                "click": 1,
                "blur": 0
            }
        },
        "blured": {
            "target": "text",
            "event":{
                "focus": 0,
                "blur": 1
            }
        },
        "listHover": {
            "target": "list",
            "event": {
                "mouseEnter": 1,
                "mouseLeave": 0
            }
        },
        "itemClicked":{
            "target": "item",
            "event": {
                "click": 1
            }
        }
    },
    "motivation":{
        "textClick":{
            "status":{
                "textClicked": true
            },
            "trigger": true
        },
        "textBlur":{
            "status":{
                "blured": true,
                "listHover": false
            },
            "trigger": true
        },
        "itemClick":{
            "status":{
                "itemClicked": true
            },
            "trigger": true
        }
    },
    "keys": {
        "initValue": "",
        "defaultText":"",
        "noDataText":"",
        "name": ""
    }
};