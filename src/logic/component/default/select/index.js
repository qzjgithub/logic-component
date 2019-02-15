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
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: undefined,
            text: undefined
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
        status['opened'] = false;
        this.setState({
            value: value,
            text: text,
            status: status
        });
        if(this.props.onSelected){
            this.props.onSelected(value,text);
        }
    }

    getList = (value) => {
        let text = '';
        let dom = (this.props.children||[]).map((item) => {
            let checked = false;
            if(value === item.props.value){
                text = item.props.children;
                checked = true;
            }
            return React.cloneElement(item,{selectBridge: this.itemClick,checked: checked})
        });
        return { dom, text }
    }

    render(){
        let displayKey = '', value = this.state['value'];
        if(Util.isUndefined(value)){
            value = this.props.initValue || this.initValue;
        }
        if(!value){
            displayKey = 'defaultText';
        }
        if(!this.props.children || !this.props.children.length){
            displayKey = 'noDataText';
        }
        let list = this.getList(value);
        let text = list.text;
        if(displayKey){
            text = this.props[displayKey] || this[displayKey];
        }
        return <div>
            <Button styleType={'left'} className={'text'} sign={'text'}>
                { text }
                <Icon type={'triangledownfill'}/>
            </Button>
            <ul className={'list'} sign={'list'}>{ list.dom }</ul>
        </div>;
    }
}

Select.propTypes = {
    styleType : PropTypes.string
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