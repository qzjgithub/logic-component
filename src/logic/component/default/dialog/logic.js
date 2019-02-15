export default {
    "status": {
        "closeClicked":{
            "target":"close",
            "event":{
                "click":1
            }
        },
        "closed":{
            "classTrue": "hide",
            "motivation":{
               "closeClick": 1
            },
            "defaultState": true
        }
    },
    "motivation":{
        "closeClick":{
            "status":{
                "closeClicked": true
            },
            "trigger": true
        }
    }
};