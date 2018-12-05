export default {
  "status":{
      "touched":{
      "event":{
        "blur": 1
      }
    },
      "empty":{
          "event": {
              change: (state)=>{
                  let v = state['value'];
                  return v==''||v==undefined||v==null;
              }
          }
      }
  }
};