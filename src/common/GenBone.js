import React from 'react';
import Util from './Util';
import SequenceEvent from './SequenceEvent';

class GenBone {


    //target和status组成的KV键值对
    signKV;

    oldChildren;

    children;

    logic;

    state;

    sequence;

    constructor(children, logic, state){
        console.log(children);
        this.signKV = new Map();
        this.oldChildren = children;
        this.logic = logic;
        this.state = state;
        this.sequence = new Map();
    }

    //得到dom结构
    get() {
        if (!this.logic.status.size) {
            return children;
        } else {
            this.genSignKv(this.logic.status);
            this.children = this.genChildren(this.oldChildren);
            return this.children;
        }
    }

    //生成targetKV键值对
    genSignKv(status){
        status.forEach((state,key) => {
            let sign = state.target;
            if (!this.signKV.has(sign)) {
                this.signKV.set(sign, new Set());
            }
            this.signKV.get(sign).add(key);
        });
    }

    //嵌套生成dom
    genChildren(element) {
        if (Util.isArray(element) && element.length) {
            return element.map((child) => {
                return this.genChildren(child);
            });
        } else if (Util.isKVObject(element)) {
            let props = {}, sign = element.props.sign;
            if(sign && this.signKV.has(sign)){
                this.genStatusRelate(sign, element,props);
            }
            let children = element.props && element.props.children;
            if (children && Util.isArray(children) && children.length) {
                return React.cloneElement(element, {
                    children: this.genChildren(children)
                });
            } else {
                return React.cloneElement(element,this.genStatusRelate(element.props.sign,element.props));
            }
        } else {
            return element;
        }
    }

    //生成对象关联status
    genStatusRelate(sign,props){
        let newProps = {};
        let statusSet = this.signKV.get(sign);
        statusSet.forEach((state) => {
            let status = this.logic.status.get(state);
            status.event.forEach((value,event)=>{
                let name = 'on' + Util.upFirstWord(event);
                let oldEvent = props[name];
                let seq = new SequenceEvent();
                let oldValue = this.state.status.get(state);
                let newValue = oldValue;
                switch(value){
                    case 0:
                        newValue = false;
                        break;
                    case 1:
                        newValue = true;
                        break;
                    case 3:
                        newValue = !oldValue;
                }
                seq.events.push((...param) => {
                    this.setState({
                        status: {
                            [state] : newValue
                        }
                    });
                    return [...param, this.logic.value, this.state.status];
                });
                seq.events.push((...param)=>{
                    let result = oldEvent.call(this,...param);
                    let len = param.length;
                    this.logic.value = this.state.status;
                    return Util.isArray(result) ?
                        [...result,param[len -2 ], param[len - 1]] :
                        [result,param[len -2 ], param[len - 1]];
                });
                newProps[name] = (...param) => {
                    seq.execute(...param);
                }
            });
        });
        return newProps;
    }
}
export default GenBone;