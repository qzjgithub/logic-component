import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logical from '../../../common/logical';
import config from './config.json';
import logic from './logic.js';
import { isRealOrZero } from '../../../common/Util';
import './index.styl';

import Button from '../button';
import Icon from '../icon';
import Tree from '../tree';

class TreeSelect extends Component{
    constructor(props, context) {
        super(props, context);
        let {value , initValue } = this.props;
        value = isRealOrZero(value) ? value : initValue;
        this.state = {
            value: value,
            text: props.text
        }
    }

    componentWillReceiveProps(nextProps){
        let value = nextProps.value;
        if(isRealOrZero(value)){
            this.setState({
                value: nextProps.value
            });
        }
    }

    getValue = () => {
        return this.state.value;
    }

    getValueObj = (keys) => {
        if(keys instanceof Array){
            let obj = {};
            keys.map((key)=>{
                obj[key] = this.dataObj[key];
            });
            return obj;
        }else if(keys){
            return this.dataObj[keys];
        }else{
            return this.dataObj;
        }
    }

    getFormType = () => {
        return this.props.mode === 'multi' ? 'multiTreeSelect': 'treeSelect';
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

    treeDidMount = (value, dataObj) => {
        this.dataObj = dataObj;
        this.setState({
            value: value
        });
    }

    getTreeConfig = () => {
        let config = this.props.treeConfig || {};
        config = Object.assign({},config,{
            selectMode: this.props.mode,
            value: this.state.value
        });
        let textClick = config.onTextClick;
        config.onTextClick = (value,id,text,data) => {
            this.setState({
                value: value,
                text: text
            });
            if(textClick){
                textClick(value,id,text,data);
            }
        }
        return config;
    }

    getText = () => {
        let { getText ,treeConfig, mode } = this.props;
        if(getText){
            return getText(this.state.value, (treeConfig||{}).data||[]);
        }else{
            switch(mode){
                case 'multi':
                    return (this.state.value || []).length;
                case 'single':
                case 'auto':
                default:
                    return this.state.text || this.props.text;
            }

        }
    }

    keepFocus = (ev, oldValue, newValue) =>{
        let textDom = this.refs['text'];
        if(textDom){
            textDom.parentElement.focus();
        }
        newValue['opened'] = true;
        return newValue;
    }

    render(){
        let displayKey = '', value = this.state['value'];
        if((!value && value != 0) || (value instanceof Array && !value.length)){
            displayKey = 'defaultText';
        }
        let text = this.getText();
        if(displayKey){
            text = this.props[displayKey] || this[displayKey];
        }
        return <div>
            <Button styleType={'left'} 
                className={'text'} 
                sign={'text'} 
                disabled={this.props.disabled}
                style={{height: this.props.height || '',width: this.props.width || ''}}>
                <Icon type={'unfold'}/>
                <span ref={'text'}>{ text || value}</span>
            </Button>
            <div className={'treeList'} sign={'treeList'} onMouseLeave={this.keepFocus}>
                <Tree {...this.getTreeConfig()} onDidMount={this.treeDidMount}/>
            </div>
        </div>;
    }
}

TreeSelect.propTypes = {
    height: PropTypes.any,
    width: PropTypes.any,
    mode: PropTypes.string, //multi,single
    value: PropTypes.any,
    initValue: PropTypes.any,
    initAll: PropTypes.any,//true/false
    treeConfig: PropTypes.object,
    defaultText: PropTypes.string,
    noDataText: PropTypes.string,
    text: PropTypes.string,
    getText: PropTypes.func//function(value, data){}
}


export default logical(TreeSelect,logic,config);