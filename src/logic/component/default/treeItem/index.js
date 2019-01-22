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
        this.state = logic.keys || {};
        this.openDisabled = false;
    }

    componentWillReceiveProps(nextProps){
        let status = this.state.status ||{};
        status['opened'] = nextProps['opened'];
        this.setState({
            value: nextProps.value,
            status: status
        });
    }

    onFlexIconClick = (ev,o,n) => {
        if(this.openDisabled) {
            n['opened'] = o['opened'];
            return n;
        }
        this.openDisabled = true;
        let opened = n['opened'];
        if(this.props.onVisibleChange){
            if(opened){
                this.props.onVisibleChange(n['opened'],this.props.order);
            }else{
                this.props.onVisibleChange(n['opened'],this.props.order,true);
            }
            setTimeout(() => {
                this.openDisabled = false;
            },animateTime);
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

    getHeights = (node,h = 0) => {
        if(node.props.opened && node.props.children){
            h += node.props.children.length * 30;
            node.props.children.forEach((child) => {
                h = this.getHeights(child,h);
            });
        }
        return h;
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
        let searched = this.props.searched;

        let id = data[this.state.idKey];
        let value = data[this.state.valueKey];
        let text = data[this.state.textKey];

        
        let style = {};
        if(opened){
            let h = this.getHeights({props:{children: this.props.children, opened: true}});
            style = {
                height: h+'px',
                overflow: 'hidden'
            }
        }else{
            style = {
                height: '0',
                overflow: 'hidden'
            }
        }
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
                <span className={`text ${checked?'checked':''} ${searched?'searched':''}`} onClick={() => this.onTextClick(value,id,text,data)}>
                    { data[this.state.textKey] }
                </span>
            </p>
            <div className={'list'} ref={"list"} style={style}>{ this.props.children }</div>
        </section>
    }
}

TreeItem.propTypes = {
    styleType : PropTypes.string,
    data: PropTypes.object,
    last: PropTypes.bool,
    first: PropTypes.bool,
    order: PropTypes.array,
    searched: PropTypes.bool,
    onTextClick: PropTypes.func,
    onVisibleChange: PropTypes.func
}


export default basic(TreeItem,logic,config);