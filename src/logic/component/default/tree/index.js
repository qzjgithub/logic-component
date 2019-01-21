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
        this.state = logic.keys || {};
    }

    getTreeItem = (data,first,last) => {
        let children = data['children'] || [];
        let props = Object.assign({},this.props,{ data: data ,first: first, last: last, opened: !!data['opened'],value:this.state.value});
        return <TreeItem {...props} onTextClick={this.itemClick}>
            { children && children.map((item,index) => {
                return this.getTreeItem(item,index===0, index===(children.length-1));
            }) }
        </TreeItem>
    }

    onFlexIconClick = (opened,data) => {
        console.log(opened,data);
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
        const last = this.props.last;
        const first = this.props.first;
        return <div>{ this.getTreeItem(data,first,last) }</div>
    }
}

Tree.propTypes = {
    styleType : PropTypes.string,
    data: PropTypes.object,
    last: PropTypes.bool,
    first: PropTypes.bool
}


export default basic(Tree,logic,config);