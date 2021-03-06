import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logical from '../../../common/logical';
import { isRealOrZero } from '../../../common/Util';
import config from './config.json';
import logic from './logic.js';
import './index.styl';
import Icon from '../icon';

import TreeItem from '../treeItem';

const animateTime = 300;

class Tree extends Component{
    dataObj = {};
    constructor(props, context) {
        super(props, context);
        let {value , selectMode, initAll, valueKey, data } = this.props;
        // value = isRealOrZero(value) ? value : initValue;
        if(!isRealOrZero(value)){
            switch(selectMode){
                case 'multi':
                    value = [];
                    if(initAll){
                        data = data || [];
                        valueKey = valueKey || 'value';
                        value = this.getNestValue(data, [], valueKey);
                    }
                    break;
                case 'single':
                default:
                    value = undefined;
            }
        }
        if(selectMode === 'multi' && value && !(value instanceof Array)){
            value = [ value ];
        }
        this.state = {
            openeds: {},
            searchValue: '',
            searched: false,
            searcheds : {},
            value
        }
        this.initData();
    }

    componentWillReceiveProps(nextProps){
        this.setState({value: nextProps.value});
    }

    componentDidMount(){
        if(this.props.onDidMount){
            this.props.onDidMount(this.state.value,this.dataObj);
        }
    }

    getNestValue = (arr, value = [], valueKey) => {
        let { selectable } = this.props;
        (arr||[]).forEach((item)=>{
            if(!selectable || selectable(item)){
                value.push(item[valueKey]);
            }
            let children = item.children;
            if(children && children.length){
                value = this.getNestValue(children,value, valueKey);
            }
        });
        return value;
    }

    initData = () => {
        let { data, valueKey } = this.props;
        data = data || [];
        valueKey = valueKey || 'value';
        this.dataObj = this.getNestData(data, {}, valueKey);
    }

    getNestData = (arr, obj = {}, valueKey) => {
        (arr||[]).forEach((item)=>{
            obj[item[valueKey]] = item;
            let children = item.children;
            if(children && children.length){
                obj = this.getNestData(children,obj, valueKey);
            }
        });
        return obj;
    }

    getTreeItem = (data,first,last,order) => {
        let opened = this.state.openeds[order.join('-')];
        if(opened === undefined){
            opened = data['opened'] ? 1 : 0;
        }
        let props = Object.assign({},this.props,
            { 
                data: data ,
                first: first, 
                last: last, 
                opened: opened === 1,
                value:this.state.value,
                order: order,
                searched: this.state.searcheds[order.join('-')]
            });
        let children = data['children'] || [];
        return <TreeItem {...props} onTextClick={this.itemClick} onVisibleChange={this.visibleChange} key={order.join('-')}>
            { opened !== 0 && !!children.length && children.map((item,index) => {
                return this.getTreeItem(item,index===0, index===(children.length-1),[...order,index]);
            }) }
        </TreeItem>
    }

    visibleChange = (opened,order,loading) => {
        let openeds = this.state.openeds;
        openeds[order.join('-')] = loading ? 2 : ( opened ? 1 : 0 );
        this.setState({
            openeds : openeds
        },() => {
            if(this.props.onVisibleChange){
                this.props.onVisibleChange(opened, roder);
            }
        });
        if(loading){
            setTimeout(() => {
               openeds = this.state.openeds;
               openeds[order.join('-')] = opened ? 1 : 0;
               this.setState({
                   openeds : openeds
               });
            },animateTime);
        }
    }

    itemClick = (value,id,text, data) => {
        let flag = true;
        if(this.props.onTextClick){
            flag = this.props.onTextClick(value,id,text,data);
        }
        if(flag){
            /* let sv = this.state.value;
            switch(this.props.selectMode){
                case 'multi':
                    if(!sv || !(sv instanceof Array)){
                        sv = [];
                    }
                    let ind = sv.indexOf(value);
                    if(ind > -1){
                        sv.splice(ind,1);
                    }else{
                        sv.push(value);
                    }
                    break;
                case 'single':
                case 'aut':
                defalut:
                    sv = value;
            } */
            this.setState({
                value: value,
                searcheds : {}
            },() => {
                if(this.props.onChange){
                    this.props.onChange(value);
                }
            });
        }
        return flag;
    }

    searchChange = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    }

    searchEvent = (e) => {
        if(!this.state.searchValue) {
            this.setState({
                searcheds : {}
            });
            return;
        }
        let tagName = e.target.tagName;
        if(tagName === 'INPUT'){
            let key = e.key;
            if(key !== 'Enter'){
                return;
            }
        }
        let data = this.props.data || [];
        let searcheds = {},openeds = this.state.openeds;
        data.forEach((item,index) => {
            this.search(item,[index],searcheds,openeds);
        });
        this.setState({
            searcheds : searcheds,
            openeds: openeds
        });
    }

    search = (item,order,searcheds,openeds) => {
        let searched = false;
        let value = this.state.searchValue;
        let text = item[this.props.textKey||this.textKey];
        if(text.indexOf(value) > -1){
            searcheds[order.join('-')] = true;
            searched = true;
        }
        let childSearched = false;
        let children = item['children'];
        if(children && children.length){
            children.forEach((v,index) => {
                let res = this.search(v,[...order,index],searcheds,openeds);
                childSearched = childSearched || res;
            });
        }
        if(childSearched){
            openeds[order.join('-')] = 1;
        }
        return searched || childSearched;
    }

    render(){
        const data = this.props.data || [];
        let cls = this.props.className || '';
        return <div className={cls}>
            {this.props.search && <div className={'search'}>
                <input onChange={this.searchChange} value={this.state.searchValue} onKeyPress={this.searchEvent} key='input'/>
                <Icon type={'sousuo'} onClick={this.searchEvent} key='icon' />
            </div>}
            { data.map((item,index) => { return this.getTreeItem(item,index===0,index===(data.length - 1),[index]) })}
        </div>
    }
}

Tree.propTypes = {
    data: PropTypes.array,
    search: PropTypes.bool,
    onTextClick: PropTypes.func,
    selectMode: PropTypes.string,//multi,single,auto
    selectable: PropTypes.func,//function(item){}
    valueKey: PropTypes.string,
    value: PropTypes.any,
    initAll: PropTypes.bool,//true/false
    className: PropTypes.string,
    cable: PropTypes.bool,//是否无连接线
    onDidMount: PropTypes.func//function(values,obj){}
}


export default logical(Tree,logic,config);