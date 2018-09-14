import React, { Component } from 'react';
import NestedEvent from '../../common/nestedEvent';

const basic = WrappedComponent => class extends Component {

    //状态模板
    stateTemp = {
        //是否将状态绑定样式作用到Dom上
        styleToDom: true,
        //状态激活样式class
        classTrue: "",
        //状态未激活样式class
        classFalse: "",
        //状态激活样式，覆盖class
        styleTrue: {},
        //状态未激活样式，覆盖class
        styleFalse: {},
        //状态默认激活状态
        defaultState: false,
        //状态绑定的事件
        event: {
            /**
             * 事件对应值会有不同响应
             * 0 表示总是响应为未激活,state变为false
             * 1 表中总是响应为激活,state变为true
             * 2 表示总是响应为相反状态，state变为!state
             *
             */
            click: 0,//0,1,2
        },
        onSet : [],
        onChange: []
    };

    //状态组
    stateGroups = {
        focus: {
            styleToDom: true,
            classTrue: "",
            classFalse: "",
            styleTrue: {},
            styleFalse: {},
            defaultState: false,
            event: {

            }
        }
    };

    state = [];
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (<WrappedComponent
            {...this.props}
        />);
    }
};
export default basic;