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

class TreeSelect extends Component{
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
        this.state = {
            value: value
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
        let mode = this.props.mode;
        let children = this.props.children;
        if(children && !(children instanceof Array)){
            children = [ children ];
        }
        let dom = (children||[]).map((item) => {
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
        return <div className={this.props.mode || 'single'}>
            <Button styleType={'left'} className={'text'} sign={'text'} style={{height: this.props.height || '',width: this.props.width || ''}}>
                <Icon type={'unfold'}/>
                { text || value}
            </Button>
            <ul className={'list'} sign={'list'}>{ list.dom }</ul>
        </div>;
    }
}

TreeSelect.propTypes = {
    mode: PropTypes.string, //multi,single
    initValue: PropTypes.any,
    value: PropTypes.any,
    treeConfig: PropTypes.object
}


export default logical(TreeSelect,logic,config);