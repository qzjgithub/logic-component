import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

import Util from '../../../common/Util';
import Button from '../button';
import Icon from '../icon';

class Select extends Component{
    text;
    constructor(props, context) {
        super(props, context);
        let mode = this.props.mode;
        let value = this.props.value || this.props.initValue;
        if(!value){
            switch(mode){
                case 'multi':
                    value = [];
                    break;
                case 'single':
                default:
                    value = undefined;
            }
        }
        this.state = {
            value: value
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.value){
            this.setState({
                value: nextProps.value
            });
        }
    }

    itemClick = (value,text)=>{
        let status = this.state.status;
        let values = this.state.value;
        switch(this.props.mode){
            case 'multi':
                /*if(values === undefined){
                    let initValue = this.props.initValue;
                    values = initValue && initValue.length ? initValue : [];
                }else if(!values){
                    values = [];
                }*/
                let ind = values.indexOf(value);
                if(ind > -1){
                    values.splice(ind,1);
                    this.text.splice(ind,1);
                }else{
                    values.push(value);
                    this.text.push(text);
                }
                break;
            case 'single':
            default:
                values = value;
                this.text = text;
                status['opened'] = false;
        }
        this.setState({
            value: values,
            status: status
        });
        if(this.props.onSelected){
            this.props.onSelected(values,this.text);
        }
    }

    getList = (value) => {
        let text = '';
        let dom = (this.props.children||[]).map((item) => {
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
        let mode = this.props.mode;
        let dom = (this.props.children||[]).map((item) => {
            let checked = false;
            if(value.indexOf(item.props.value) > -1){
                this.text.push(item.props.children);
                text.push(
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
        return { dom, text }
    }

    getValue = () => {
        return this.state.value;
    }

    render(){
        let displayKey = '', value = this.state['value'];
        if(Util.isUndefined(value)){
            value = this.props.initValue || this.initValue;
        }
        if(!value || !value.length){
            displayKey = 'defaultText';
        }
        if(!this.props.children || !this.props.children.length){
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
        return <div className={this.props.mode || 'single'}>
            <Button styleType={'left'} className={'text'} sign={'text'} style={{height: this.props.height || '',width: this.props.width || ''}}>
                <Icon type={'unfold'}/>
                { text }
            </Button>
            <ul className={'list'} sign={'list'}>{ list.dom }</ul>
        </div>;
    }
}

Select.propTypes = {
    height: PropTypes.any,
    width: PropTypes.any,
    mode: PropTypes.string //multi,single
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

module.exports.Option = Option;

export default basic(Select,logic,config);