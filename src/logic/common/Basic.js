import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import GenLogic from './GenLogic';
import Status from './Status';
import SequenceEvent from "./SequenceEvent";
import Util from "./Util";

class Basic extends Component {

    constructor(props, context) {
        super(props, context);
        this.initLogic();
        this.signKV = new Map();

        this.state = {
            status : this.initStatus()
        }

    }

    //初始化logic对象
    initLogic() {
        this.logic = new GenLogic({});
        let logic = this.props.logic;
        if (!logic) {
            return;
        }
        let {status, motivation} = logic;
        if(!status || !Object.keys(status).length){
            return;
        }
        if(!motivation){
            motivation = {}
        }
        let hasMotStatus = {};
        Object.keys(status).forEach((sn)=>{
            let state = status[sn];
            let sm = state['motivation'];
            if(sm && Object.keys(sm).length){
                hasMotStatus[sn] = sm;
            }
            this.logic.addStatus(sn,state);
        });

        Object.keys(motivation).forEach((mn)=>{
            let mot = motivation[mn];
            this.logic.addMotivation(mn, mot);
        });

        Object.keys(hasMotStatus).forEach((sn)=>{
            let sm = hasMotStatus[sn];
            Object.keys(sm).forEach((mn)=>{
               this.logic.setStatusMotivation(mn,sn,sm[mn]);
            });
        });
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
            let props;
            if(children instanceof Array){
                props = this.genStatusRelate(Status.BASIC,this.props);
                return React.createElement('div',props,this.genChildren(children));
            }else{
                props = this.genStatusRelate(Status.BASIC,children.props);
                props['children'] = this.genChildren(children.props.children);
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
    }

    //嵌套生成dom
    genChildren(element) {
        if (Util.isArray(element) && element.length) { //如果是数组就循环解析元素
            return element.map((child) => {
                return this.genChildren(child);
            });
        } else if (Util.isKVObject(element)) { //如果是对象则先检测其状态，在检测其子元素
            let props, sign = element.props.sign;
            if(sign && this.signKV.has(sign)){ //检测是否需要与状态绑定
                props = this.genStatusRelate(sign, element.props);
            }
            let children = element.props && element.props.children;
            if (children) {//检测是否有子元素，有就继续循环解析元素
                props = props || {};
                props['children'] = this.genChildren(children);
                return React.cloneElement(element, props);
            } else {
                return props ? React.cloneElement(element,props) : element; //如果是叶子节点元素，则直接返回
            }
        } else {
            return element; //如果不是数组也不是对象则直接返回
        }
    }

    //生成对象关联status
    genStatusRelate(sign,props){
        let newProps = {};
        let data = this.getStatusList(sign,props); //得到特定元素status的相关信息
        data['list'].forEach((v,k)=>{ //一个事件对应一个对象，这个事件引起的值变化，激励响应都保存其中
            let seq = new SequenceEvent();
            seq.events.push((ev)=>{ //第一个方法确定新值改变规律
                this.logic.values = Object.assign({},this.state.status);
                let newValue = this.state.status;
                Object.keys(v['status']).forEach((sk)=>{
                    let s = v['status'][sk];
                    if(s===2){
                        s = !newValue[sk];
                    }
                    newValue[sk] = s;
                });

                let data = this.triggerMotivation(v,this.logic.values,newValue);//得到状态改变引起的激励
                let { info , oldValue } = data;
                newValue = data['newValue'];

                let result = info['oldEvent'] && info['oldEvent'].call(this,...[ev, oldValue, newValue, info['status']]);//执行原组件传入的方法
                return result != undefined ? [info,oldValue,newValue,result] : [info,oldValue,newValue];
            });

            seq.events.push((info,oldValue,newValue,result)=>{ //第二个方法，根据新值的改变调用方法产生激励
                let mev,nParam = [oldValue, newValue, info['status']];
                Object.keys(info['movt']).forEach((mn)=>{ //循环调用引起的激励产生的事件
                    if(info['movt'][mn]){
                       mev = this.props['on'+Util.upFirstWord(mn)];
                       mev && mev.call(this,...nParam);
                    }
                });

                let p = result != undefined ? [...nParam,result] : nParam;
                this.setState({
                    status: newValue
                },() => {
                    let onChange = this.props['onChanged']; //检测并调用onchange方法
                    if(onChange && JSON.stringify(newValue) != JSON.stringify(oldValue)){
                        onChange.call(this,...p);
                    }
                });
                return p;
            });
            newProps[k] = (ev) => {
                ev.stopPropagation();
                seq.execute(ev);
            }
        });
        newProps = Object.assign(newProps, {key: moment().valueOf()}, data['prop']);
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

    //循环检测完整激励
    triggerMotivation(info,oldValue,newValue){
        let movt = {};
        this.logic.motivation.forEach((motivation,name)=>{//检测此状态是否会引起激励变化
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
        info['movt'] = Object.assign(info['movt']||{},movt);
        if(keys.length){ //如果有激励变化，检测引起的状态变化，再此检测是否有引起激励
            keys.forEach((mn)=>{
                let mtos = this.logic.activeStatus.get(mn);
                mtos && mtos.size && mtos.forEach((sn)=>{
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
                    newValue[v] = v==2 ? !oldValue[sn] : v;
                    info['status'][sn] = v;
                });
            });
            return this.triggerMotivation(info, oldValue, newValue);
        }else{
            return { info, oldValue, newValue }; //没有引起激励变化则直接返回数据
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