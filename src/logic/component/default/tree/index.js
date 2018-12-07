import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

class TreeItem extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = logic.keys || {};
    }

    onChanged = (o,n,s,st) => {
        console.log(this.props.data['id']);
        console.log(o,n,s,st);
    }

    render(){
        const data = this.props.data || [];
        let children = data['children'] || [];
        let treeItemClass = '';
        if(children.length){
            treeItemClass += ' nonLeaf';
        }
        if(data['root']){
            treeItemClass += ' rootNode';
        }
        if(this.props.last){
            treeItemClass += ' lastNode';
        }
        let status = this.state.status || {};
        let opened = !!status.opened;
        return <section className={treeItemClass}>
            <p>
                <span className={'flexIcon'}>{ children.length ?
                    <svg sign="flexIcon" className={'iconfont'}>
                        <use xlinkHref={ opened ? '#icon-minus-circle':'#icon-plus-circle'}></use>
                    </svg> :
                    '' }</span>
                <i></i>
                { this.state.iconEnable &&
                <span>
                    <svg className={'iconfont'}>
                        <use xlinkHref={ `#${ data['icon'] || 'icon-file-unknown'}`}></use>
                    </svg>
                </span> }
                <span className={"text"}>{ data[this.state.textKey] }</span>
            </p>
            { children.map((item, index) =>
                <Tree data={ item }
                      key={ item['id'] }
                      param={ Object.assign({},this.props.param) }
                      onChanged={this.onChanged}
                      last={index == (children.length - 1)}/> )}
        </section>
    }
}

TreeItem.propTypes = {
    styleType : PropTypes.string,
    data: PropTypes.object,
    last: PropTypes.bool
}


const Tree =  basic(TreeItem,logic,config);

export default Tree;