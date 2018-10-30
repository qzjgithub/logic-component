const SequenceEvent = require('../common/SequenceEvent');

let test1 = new SequenceEvent([
    (param) =>{
        console.log("print param in function1",param);
        return "function1";
    },
    (param) => {
        console.log("print param in function2",param);
        return "function2";
    },
    (param) => {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                console.log("print param in function3",param);
                reject(["name","function3"]);
            },1000);
        });
    },
    (...param) => {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                console.log("print param in function4",param[0],param[1]);
                resolve(["ok"])
            },1000);
        });
    }
]);

test1.execute("enter")
    .then((value)=>{
        console.log(...value);
    });