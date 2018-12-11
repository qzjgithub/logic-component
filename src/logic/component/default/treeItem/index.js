import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

const animateTime = 300;

class TreeItem extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = Object.assign(logic.keys || {},{
            listStyle : {}
        });
    }

    onFlexIconClick = (ev,o,n,s,p) => {
        if(this.animateTimer){
            clearTimeout(this.animateTimer);
            this.animateTimer = null;
        }
        let list = this.refs['list'] || {};
        let h = 0;
        if(n['opened']){
            let children = list['children'] || [];
            for(let i=0;i<children.length;i++){
                h += children[i].offsetHeight;
            }
            console.log(h);
            this.setState({
                listStyle: {
                    height: h
                }
            });
            this.animateTimer = setTimeout(() => {
                this.setState({
                    listStyle: {
                        height: 'auto',
                        overflow: 'visible'
                    }
                });
            },animateTime);
        }else{
            h = list.offsetHeight;
            console.log(h);
            this.setState({
                listStyle: {
                    height: h,
                    overflow: 'hidden'
                }
            });
            setTimeout(() => {
                this.setState({
                    listStyle: {
                        height: 0
                    }
                })
            },20);
        }
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
        }else if(this.props.first){
            treeItemClass += ' firstNode';
        }
        if(this.props.last){
            treeItemClass += ' lastNode';
        }
        let status = this.state.status || {};
        let opened = !!status.opened;
        return <section className={ treeItemClass }>
            <p>
                <span sign="flexIcon"
                      onClick={this.onFlexIconClick}
                      className={'flexIcon'}>{ children.length ?
                    <svg className={'iconfont'}>
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
            <div className={'list'} ref={"list"} style={this.state.listStyle}>{ this.props.children }</div>
        </section>
    }
}

TreeItem.propTypes = {
    styleType : PropTypes.string,
    data: PropTypes.object,
    last: PropTypes.bool,
    first: PropTypes.bool
}


export default basic(TreeItem,logic,config);