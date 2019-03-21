"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "status": {
        "prevAble": {
            "target": 'prev',
            "event": {
                "click": function click(state, newValue) {
                    var curPage = state.curPage,
                        pages = state.pages;

                    curPage -= 1;
                    if (curPage <= 1) {
                        curPage = pages > 0 ? 1 : 0;
                        newValue['prevAble'] = false;
                    } else {
                        newValue['prevAble'] = true;
                    }
                    return Object.assign(state, {
                        status: newValue,
                        curPage: curPage
                    });
                }
            }
        },
        "nextAble": {
            "target": 'next',
            "event": {
                "click": function click(state, newValue) {
                    var curPage = state.curPage,
                        pages = state.pages;

                    curPage += 1;
                    if (curPage >= pages) {
                        curPage = pages;
                        newValue['nextAble'] = false;
                    } else {
                        newValue['nextAble'] = true;
                    }
                    return Object.assign(state, {
                        status: newValue,
                        curPage: curPage
                    });
                }
            }
        }
    }
};