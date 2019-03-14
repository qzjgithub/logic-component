export default {
    "status": {
        "prevAble":{
            "target": 'prev',
            "event": {
                "click": (state,newValue) => {
                    let { curPage, pages } = state;
                    curPage -= 1;
                    if(curPage <= 1){
                        curPage = pages > 0 ? 1 : 0;
                        newValue['prevAble'] = false;
                    }else{
                        newValue['prevAble'] = true;
                    }
                    return Object.assign(state,{
                        status: newValue,
                        curPage
                    });
                }
            }
        },
        "nextAble":{
            "target": 'next',
            "event": {
                "click": (state,newValue) => {
                    let { curPage, pages } = state;
                    curPage += 1;
                    if(curPage >= pages){
                        curPage = pages;
                        newValue['nextAble'] = false;
                    }else{
                        newValue['nextAble'] = true;
                    }
                    return Object.assign(state,{
                        status: newValue,
                        curPage
                    });
                }
            }
        }
    }
};