import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenLogic from './GenLogic';
import Status from './Status';
import SequenceEvent from "./SequenceEvent";
import Util from "./Util";

class Basic extends Component {

    constructor(props, context) {
        super(props, context);
        this.logic = new GenLogic(this.props.logic);
        this.signKV = new Map();

        this.state = {
            status : this.initStatus()
        }

    }

    //初始化状态
    initStatus = () => {
        let status = {};
        this.logic.values.forEach((v,k)=>{
            status[k] = v;
        });
        return status;
    }

    //得到dom
    getBone = () => {
        let children = this.props.children;
        if (!this.logic.status.size) {
            return children;
        } else {
            this.genSignKv(this.logic.status);
            let props = this.genStatusRelate(Status.BASIC,children.props);
            if(children instanceof Array){
                return React.createElement('div',props,this.genChildren(children));
            }else{
                if(children.props.sign){
                    props = this.genStatusRelate(children.props.sign,children.props);
                }
                return React.cloneElement(children,props);
            }
        }
    }

    showState = () => {
        let status = [];
        Object.keys(this.state.status).forEach((k)=>{
            status.push(<div>{k} : {this.state.status[k].toString()}</div>)
        });
        return status;
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
        console.log(this.signKV);
    }

    //嵌套生成dom
    genChildren(element) {
        if (Util.isArray(element) && element.length) {
            return element.map((child) => {
                return this.genChildren(child);
            });
        } else if (Util.isKVObject(element)) {
            let props, sign = element.props.sign;
            if(sign && this.signKV.has(sign)){
                props = this.genStatusRelate(sign, element.props);
            }
            let children = element.props && element.props.children;
            if (children && Util.isArray(children) && children.length) {
                props = props || {};
                props['children'] = this.genChildren(children);
                return React.cloneElement(element, props);
            } else {
                return props ? React.cloneElement(element,props) : element;
            }
        } else {
            return element;
        }
    }

    //生成对象关联status
    genStatusRelate(sign,props){
        let newProps = {};
        let data = this.getStatusList(sign,props);
        data['list'].forEach((v,k)=>{
            let seq = new SequenceEvent();
            seq.events.push((...param)=>{
                this.logic.values = Object.assign({},this.state.status);
                let newValue = this.state.status;
                Object.keys(v['status']).forEach((sk)=>{
                    let s = v['status'][sk];
                    if(s===2){
                        s = !newValue[sk];
                    }
                    newValue[sk] = s;
                });

                /*let result = v['oldEvent'] && v['oldEvent'].call(this,...[...param, this.logic.values, newValue]);

                this.setState({
                    status: newValue
                });*/

                return [v,this.logic,newValue,...param];
            });
            seq.events.push((info,oldValue,newValue,...param)=>{

            });
            newProps[k] = (...param) => {
                seq.execute(...param);
            }
        });
        newProps = Object.assign(newProps,data['prop']);
        return newProps;
    }

    //根据status生成dom需要的状态信息，事件信息等
    getStatusList = (sign,props) => {
        let statusSet = this.signKV.get(sign);
        let list = new Map();
        let className = props['className']||'';
        let style = props['style']||{};
        statusSet && statusSet.forEach((state) => {
            let status = this.logic.status.get(state);
            status.event.forEach((value,event)=>{
                let name = 'on' + Util.upFirstWord(event);
                if(!list.has(name)){
                    list.set(name,{
                        oldEvent : props[name],
                        status: {}
                    });
                }
                let sts = list.get(name)['status'];
                switch(value){
                    case 0:
                        sts[state] = false;
                        break;
                    case 1:
                        sts[state] = true;
                        break;
                    case 2:
                        sts[state] = 2;
                }
            });
            if(status.styleToDom){
                let tail = Util.upFirstWord(this.state.status[state].toString());
                className +=  ' '+(status[`class${tail}`]||[]).join(' ');
                style = Object.assign({},style,status[`style${tail}`]);
            }
        });
        return { list, prop : { className, style} };
    }

    //循环检测完激励
    triggerMotivation(info,oldValue,newValue){
        let movt = {};
        this.logic.motivation.forEach((motivation,name)=>{
            if(info['movt'][name]==undefined){
                let isTouch = false, isActive = true;
                motivation.status.forEach((value,state)=>{
                    isTouch = isTouch || info['status'][state] != undefined;
                    isActive = isActive && newValue[state] == value;
                });
                isActive = isTouch && isActive;
                movt[name] = motivation.trigger;
            }
        });
        let keys = Object.keys(movt);
        info['movt'] = Object.assign(info['movt'],movt);
        if(keys.length){
            keys.forEach((mn)=>{
                let mtos = this.logic.activeStatus.get(mn);
                if(mtos && mtos.size){
                    mtos.forEach((sn)=>{
                        let s = this.logic.status.get(sn);
                        let v;
                        switch(s.motivation.get(mn)){
                            case 0:
                                v = false;
                                break;
                            case 1:
                                v = true;
                                break;
                            case 2:
                                v = 2;
                        }
                        info['status'][s] = v;
                        if(v==2){
                            newValue[sn] = !oldValue[sn];
                        }else{
                            newValue[sn] = v;
                        }
                    });
                }
            });
            return this.triggerMotivation(info, oldValue, newValue);
        }else{
            return { info, oldValue, newValue };
        }
    }

    render(){
        return <div>
            { this.getBone() }
            { this.showState() }
        </div>
    }
}

Basic.propTypes = {
    logic : PropTypes.object
}

module.exports = Basic;