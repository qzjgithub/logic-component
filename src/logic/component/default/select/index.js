import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logical from '../../../common/logical';
import config from './config.json';
import logic from './logic.js';
import { isRealOrZero } from '../../../common/Util';
import './index.styl';

import Util from '../../../common/Util';
import Button from '../button';
import Icon from '../icon';

class Select extends Component{
    text;
    constructor(props, context) {
        super(props, context);
        let {value , initValue, mode } = this.props;
        value = isRealOrZero(value) ? value : initValue;
        if(!isRealOrZero(value)){
            switch(mode){
                case 'multi':
                    value = [];
                    break;
                case 'single':
                default:
                    value = undefined;
            }
        }
        let children = this.props.children;
        if(children && !children.length){
            children = [ children ];
        }else if(!children){
            children = [];
        }
        this.state = {
            value: value,
            all: mode === 'multi' && value.length === children.length
        }
    }

    componentWillReceiveProps(nextProps){
        let value = nextProps.value;
        if(value || value == 0){
            this.setState({
                value: nextProps.value
            });
        }
    }

    itemClick = (value,text)=>{
        let status = this.state.status;
        let values = this.state.value;
        let children = this.props.children;
        if(children && !children.length){
            children = [ children ];
        }else if(!children){
            children = [];
        }
        let all = false;
        switch(this.props.mode){
            case 'multi':
                let ind = values.indexOf(value);
                if(ind > -1){
                    values.splice(ind,1);
                    this.text.splice(ind,1);
                }else{
                    values.push(value);
                    this.text.push(text);
                }
                all = values.length === children.length;
                break;
            case 'single':
            default:
                values = value;
                this.text = text;
                status['opened'] = false;
        }
        this.setState({
            value: values,
            status: status,
            all
        },() => {
            if(this.props.onSelected){
                this.props.onSelected(values,this.text);
            }
        });
    }

    getList = (value) => {
        let text = '';
        let children = this.props.children;
        if(children && !(children instanceof Array)){
            children = [ children ];
        }
        let dom = (children||[]).map((item) => {
            let checked = false;
            if(value === item.props.value){
                this.text = item.props.children;
                text = item.props.children;
                checked = true;
            }
            return React.cloneElement(item,{selectBridge: this.itemClick,checked: checked})
        });
        return { dom, text }
    }

    getListMulti = (value) => {
        this.text = [];
        let text = [];
        if(!value){
            value = [];
        }
        let { mode, children, getText } = this.props;
        if(children && !(children instanceof Array)){
            children = [ children ];
        }
        let dom = (children||[]).map((item) => {
            let checked = false;
            if(value.indexOf(item.props.value) > -1){
                this.text.push(item.props.children);
                !getText && text.push(
                    <span className={'multi-text'}>
                        {item.props.children}
                        <Icon type={'guanbi1'} onClick={(e) => {
                            e.stopPropagation();
                            this.itemClick(item.props.value,item.props.children)
                        }}/>
                    </span>
                );
                checked = true;
            }
            return React.cloneElement(item,{selectBridge: this.itemClick,checked: checked, mode: mode});
        });
        if(getText){
            text = getText(this.state.value, this.text);
        }
        return { dom, text }
    }

    getValue = () => {
        return this.state.value;
    }

    clear = () => {
        let value;
        switch(this.props.mode){
            case 'multi':
                value = [];
                break;
            case 'single':
            default:
                value = '';
        }
        this.setState({
            value: value
        });
    }

    keepFocus = (ev, oldValue, newValue) =>{
        if(this.props.mode !== 'multi'){
            return newValue;
        }
        let textDom = this.refs['text'];
        if(textDom){
            textDom.parentElement.focus();
        }
        newValue['opened'] = true;
        return newValue;
    }

    setAll = (ev) => {
        let all = this.state.all;
        let value = [];
        if(!all){
            let children = this.props.children;
            if(children && !children.length){
                children = [ children ];
            }else if(!children){
                children = [];
            }
            for(let c of children){
                value.push(c.props.value);
            }
        }
        this.setState({
            all: !all,
            value
        },() => {
            if(this.props.onSelected){
                this.props.onSelected(value,this.text);
            }
        });
    }

    render(){
        let displayKey = '', value = this.state['value'];
        if(Util.isUndefined(value)){
            value = this.props.initValue || this.initValue;
        }
        if((!value && value != 0) || (value instanceof Array && !value.length)){
            displayKey = 'defaultText';
        }
        let children = this.props.children;
        if(!children || (children instanceof Array && !children.length)){
            displayKey = 'noDataText';
        }
        let list;
        switch(this.props.mode){
            case 'multi':
                list = this.getListMulti(value);
                break;
            case 'single':
            default:
                list = this.getList(value);
        }
        let text = list.text;
        if(displayKey){
            text = this.props[displayKey] || this[displayKey];
        }
        let { mode, orient, hasAll } = this.props;
        let cls = mode || 'single ';
        cls += orient ||'';
        return <div className={cls}>
            <Button styleType={'left'} 
                className={'text'} 
                sign={'text'} 
                disabled={this.props.disabled}
                style={{height: this.props.height || '',width: this.props.width || ''}}>
                <Icon type={'unfold'}/>
                <span ref={'text'}>{ text || value}</span>
            </Button>
            <ul className={'list'} sign={'list'} onMouseLeave={this.keepFocus}>
                { !!hasAll && <li onClick={this.setAll}>
                    { hasAll!==true ? hasAll:'选择全部'}
                    { this.state.all && <Icon type={'xuanze'} className={'mutli-sign'}/>}
                </li>}
                { list.dom }
            </ul>
        </div>;
    }
}

Select.propTypes = {
    height: PropTypes.any,
    width: PropTypes.any,
    mode: PropTypes.string, //multi,single
    disabled: PropTypes.bool,
    initValue: PropTypes.any,
    value: PropTypes.any,
    onSelected: PropTypes.func,
    orient: PropTypes.string,//up,down
    defaultText: PropTypes.string,
    noDataText: PropTypes.string,
    hasAll: PropTypes.any,//true/'选择全部'
    getText: PropTypes.func//function(value, data){}
}

class Option extends Component{
    constructor(props, context) {
        super(props, context);
    }

    onClick = (value,text) => {
        if(this.props.selectBridge){
           this.props.selectBridge(value,text);
        }
    }

    render(){
        return <li sign={'item'}
                   className={this.props.checked?'checked':''}
                   onClick={() => this.onClick(this.props.value,this.props.children)}>
            { this.props.children }
            { this.props.mode === 'multi' && this.props.checked && <Icon type={'xuanze'} className={'mutli-sign'}/>}
        </li>
    }
}

Option.propTypes = {
    value : PropTypes.string,
    checked: PropTypes.bool,
    selectBridge: PropTypes.func
}

Select.Option = Option;

export default logical(Select,logic,config);