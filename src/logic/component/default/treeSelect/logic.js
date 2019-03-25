export default {
    "status": {
        "opened":{
            "classTrue":"opened",
            "motivation":{
                "textClick": 2,
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
            "target": "treeList",
            "event": {
                "mouseEnter": 1,
                "mouseLeave": 0
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
        }
    },
    "keys": {
        "initValue": "",
        "defaultText":"",
        "noDataText":"",
        "name": ""
    }
};