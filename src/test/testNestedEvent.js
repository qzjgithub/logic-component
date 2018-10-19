const NestedEvent = require('../common/NestedEvent');

let testEvent1 = new NestedEvent(
    new NestedEvent(
        ()=>{
            console.log("in before 1 before");
        },
        ()=>{
            console.log("in before 1 ,action");
        }
    ),
    () => {
        console.log("action some thing 1.");
    },
    new NestedEvent(
        null,
        () => {
            console.log("in after 1, action");
        },
        () => {
            console.log("in after 1, after");
        }
    )
);
// testEvent1.execute();

let testEvent2 = new NestedEvent(
    null,
    () => {
      console.log('action');
    },
    null
);

// testEvent2.execute();

let testEvent3 = new NestedEvent(
    new NestedEvent(
        new NestedEvent(
            ()=>{
                console.log('I get ');
            }
        ),
        () => {
            console.log('I get ');
        }
    ),
    () =>{
        console.log("it's so ok action.");
    },
    () =>{
        console.log("it's so ok after.param is" );
    }
);

// testEvent3.execute("haha");

let testEvent4 = new NestedEvent(
    (p1,p2) => {
        console.log(p1,p2);
        return new Promise((resolve,reject) => {
            console.log("wait 1s.");
            setTimeout(()=>{
                reject(["wait 1s ok.","second param"]);
            },1000);
        })
    },
    (param, second) => {
        console.log("action" , param, second);
        return "only one param";
    },
    (p) => {
        return new Promise((resolve,reject) => {
            console.log("wait 2s.", p);
            setTimeout(()=>{
                resolve("wait 2s ok.");
            },2*1000);
        })
    },
);

testEvent4.execute("aaa", "bbb");