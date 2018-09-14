const NestedEvent = require('../common/nestedEvent');

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
            new Promise((resolve, reject)=>{
                setTimeout(() => {
                    console.log();
                    console.log('wait 2s.');
                    resolve("wait 2s success!");
                },2*1000)
            }),
            ()=>{
                console.log('I get ');
            }
        ),
        new Promise((resolve,reject)=>{
            setTimeout(() => {
                console.log('wait 1s.');
                resolve("wait 1s success!");
            },1*1000);
        }),
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

testEvent3.execute("haha");

let testEvent4 = new NestedEvent(
    new Promise((resolve,reject) => {
        console.log("wait 1s.");
        setTimeout(()=>{
            resolve("wait 1s ok.");
        },1000);
    }),
    new Promise((resolve,reject) => {
        console.log("wait 1s.");
        setTimeout(()=>{
            resolve("wait 1s ok.");
        },1000);
    })
);

testEvent4.execute();