import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

const animateTime = 500;

class TreeItem extends Component{
    constructor(props, context) {
        super(props, context);
        let opened = props.opened;
        let style = {};
        if(opened){
            style = {
                height: 'auto',
                overflow: 'visible'
            }
        }else{
            style = {
                height: 0,
                overflow: 'hidden'
            }
        }
        this.state = Object.assign(logic.keys || {},{
            listStyle : style
        });
        this.openDisabled = false;
    }

    componentWillReceiveProps(nextProps){
        this.setState({value:nextProps.value});
    }

    onFlexIconClick = (ev,o,n) => {
        if(this.openDisabled) {
            n['opened'] = o['opened'];
            return n;
        }
        /*if(this.props.onFlexIconClick){
            this.props.onFlexIconClick(n['opened'],this.props.data);
        }*/
        this.openDisabled = true;
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
            /*this.setState({
                listStyle: {
                    height: `${h}px`
                }
            });*/
            list.style.height = `${h}px`;
            this.animateTimer = setTimeout(() => {
                this.setState({
                    listStyle: {
                        height: 'auto',
                        overflow: 'visible'
                    }
                },() => {
                    this.openDisabled = false;
                });
            },animateTime);

        }else{
            h = list.offsetHeight;
            list.style.height = `${h}px`;
            /*this.setState({
                listStyle: {
                    height: `${h}px`,
                }
            },() => {

            });*/
            setTimeout(() => {
                this.setState({
                    listStyle: {
                        height: 0,
                        overflow: 'hidden'
                    }
                },() => {
                    this.animateTimer = setTimeout(() => {
                        this.openDisabled = false;
                    },animateTime);
                });
            });
        }
    }

    getIconDom = (data) => {
        let {iconType , icon } = data;
        if(iconType === 'url'){
            return <span className={'icon'} style={{'backgroundUrl':icon}}> </span>
        }else if(iconType === 'image'){
            return <span className={`icon ${icon}`}> </span>
        }else{
            return <span>
                <svg className={'iconfont'}>
                    <use xlinkHref={ `#${ data['icon'] || 'icon-file-unknown'}`}> </use>
                </svg>
            </span>
        }
    }

    onTextClick = (value, id, text, data) => {
        let flag = true;
        if(this.props.onTextClick){
            flag = this.props.onTextClick(value,id, text, data);
        }else{
            flag = true;
        }
        if(flag){
            this.setState({value : value});
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

        let checked = data[this.state.valueKey] === this.state.value;

        let id = data[this.state.idKey];
        let value = data[this.state.valueKey];
        let text = data[this.state.textKey];
        return <section className={ treeItemClass } key={data[this.state.idKey]}>
            <p>
                <span sign="flexIcon"
                      onClick={this.onFlexIconClick}
                      className={'flexIcon'}>{ children.length ?
                    <svg className={'iconfont'}>
                        <use xlinkHref={ opened ? '#icon-minus-circle':'#icon-plus-circle'}> </use>
                    </svg> :
                    '' }</span>
                <i> </i>
                { this.state.iconEnable && this.getIconDom(data)}
                <span className={`text ${checked?'checked':''}`} onClick={() => this.onTextClick(value,id,text,data)}>
                    { data[this.state.textKey] }
                </span>
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