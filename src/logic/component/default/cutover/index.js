import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.styl';

import Icon from '../icon';

import Util from '../../../common/Util';

class Cutover extends Component{
    constructor(props, context) {
        super(props, context);
        this.showWidth = this.props.showWidth;
        this.running = false;
        if(!this.showWidth){
            this.showWidth = '50px';
        }
        this.state = {
            value: this.props.value || undefined,
            status: 0
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.showWidth){
            this.showWidth = nextProps.showWidth;
        }
        if(nextProps.value){
            this.setState({
                value: nextProps.value
            });
        }
    }

    getChildren = () => {
        let value = this.state.value;
        let showWidth = this.showWidth;
        let { children , initValue } = this.props;
        if(!children){
            return '';
        }
        if(Util.isKVObject(children)){
            return React.cloneElement(children,{ showWidth });
        }
        if(children.length === 0){
            return children;
        }
        if(children.length === 1){
            return React.cloneElement(children[0],{ showWidth });
        }
        if(!value){
            value = initValue;
        }
        let index = 0;
        let dom = [];
        dom.push(children.filter((item,ind) => {
            if(item.props.value === value){
                index = ind;
                return true;
            }else{
                return false;
            }
        }).map((item)=>React.cloneElement(item,{ showWidth })));
        this.index = index;

        let prevInd = index - 1;
        if(prevInd < 0) {
            prevInd = children.length - 1;
        }
        let nextInd = index + 1;
        if(nextInd >= children.length){
            nextInd = 0;
        }

        let marginLeft = parseInt(this.showWidth,10);
        switch(this.state.status){
            case 1:
                marginLeft = 0;
                break;
            case 2:
                marginLeft = (- 2 * marginLeft) + 'px';
                break;
            default:
                marginLeft = (-marginLeft) + 'px';
        }

        let style = { marginLeft: marginLeft, width: this.showWidth }
        if(this.state.status!==0){
            style['transition'] = 'margin-left 300ms linear';
        }
        dom.unshift(React.cloneElement(children[prevInd],{showWidth: this.showWidth,style}));
        dom.push(React.cloneElement(children[nextInd],{showWidth: this.showWidth}));
        return dom;
    }

    svgClick(status){
        if(this.running) return;
        this.running = true;
        let { children } = this.props;
        let index = this.index;
        if(status === 1){
            index = index - 1;
        }
        if(status === 2){
            index = index + 1;
        }
        if(index < 0){
            index = children.length - 1;
        }else if(index >= children.length){
            index = 0;
        }
        let value = children[index].props.value;
        this.setState({
            status: status
        });
        if(this.props.onChanged){
            this.props.onChanged(value);
        }

        setTimeout(()=>{
            this.index = index;
            this.running = false;
            this.setState({
                value: value,
                status: 0
            });
        },300);
    }

    render(){
        let { children } = this.props;
        let disabled = false;
        if(!children || Util.isKVObject(children)){
            disabled = true;
        }else if(children.length <= 1){
            disabled = true;
        }
        return <ul className={`Cutover ${disabled?'disabled':''}`}>
            <li className={'arrow prev'}>
                <Icon type={'zuo'} onClick={()=>this.svgClick(1)}/>
            </li>
            <li className={'show'} style={{width: this.showWidth}}>
                { this.getChildren() }
                </li>
            <li className={'arrow next'}>
                <Icon type={'gengduo'} onClick={()=>this.svgClick(2)}/>
            </li>
        </ul>
    }
}

Cutover.propTypes = {
    value : PropTypes.string,
    showWidth: PropTypes.any
}


class CutoverItem extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        let style = this.props.style ||{};
        style['width'] = this.props.showWidth;
        return <span className={'CutoverItem'} style={style}>{ this.props.children }</span>
    }
}

CutoverItem.propTypes = {
    value : PropTypes.string,
    showWidth: PropTypes.any
}

Cutover.CutoverItem = CutoverItem;

export default Cutover;