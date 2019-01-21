import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

import TreeItem from '../treeItem';

class Tree extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = Object.assign(logic.keys,{
            openeds: {}
        });
    }

    getTreeItem = (data,first,last,order) => {
        let opened = this.state.openeds[order.join('-')];
        if(opened === undefined){
            opened = !!data['opened'];
        }
        let props = Object.assign({},this.props,
            { 
                data: data ,
                first: first, 
                last: last, 
                opened: opened,
                value:this.state.value,
                order: order
            });
        let children = data['children'] || [];
        return <TreeItem {...props} onTextClick={this.itemClick} onVisibleChange={this.visibleChange} key={order.join('-')}>
            { opened && !!children.length && children.map((item,index) => {
                return this.getTreeItem(item,index===0, index===(children.length-1),[...order,index]);
            }) }
        </TreeItem>
    }

    visibleChange = (opened,order) => {
        console.log(opened,order);
        let openeds = this.state.openeds;
        openeds[order.join('-')] = opened;
        this.setState({
            openeds
        });
    }

    itemClick = (value,id,text, data) => {
        let flag = true;
        if(this.props.onTextClick){
            flag = this.props.onTextClick(value,id,text,data);
        }else{
            flag = true;
        }
        if(flag){
            this.setState({
                value: value
            });
        }
        return flag;
    }

    render(){
        const data = this.props.data || [];
        return <div>{ data.map((item,index) => { return this.getTreeItem(item,index===0,index===(data.length - 1),[index]) })}</div>
    }
}

Tree.propTypes = {
    styleType : PropTypes.string,
    data: PropTypes.array,
    onTextClick: PropTypes.func
}


export default basic(Tree,logic,config);