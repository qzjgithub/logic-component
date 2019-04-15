import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logical from '../../../common/logical';
import config from './config.json';
import logic from './logic.js';
import './index.styl';
import Icon from '../icon';

const animateTime = 300;

class TreeItem extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: props.value
        };
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
        let {iconType , icon, iconStyle } = data;
        if(iconType === 'url'){
            return <span className={'icon'} style={{'backgroundUrl':icon}}> </span>
        }else if(iconType === 'image'){
            return <span className={`icon ${icon}`}> </span>
        }else{
            return <span>
                <Icon type={data['icon'] || 'file-unknown'} style={iconStyle}/>
            </span>
        }
    }

    onTextClick = (value, id, text, data) => {
        let flag = this.getSelectable();
        if(flag && this.props.onTextClick){
            let { selectMode } = this.props;
            if(selectMode === 'multi'){
                let sv = this.state.value;
                if(!sv || !(sv instanceof Array)){
                    sv = [];
                }
                let ind = sv.indexOf(value);
                let check = true;
                if(ind > -1){
                    sv.splice(ind,1);
                    check = false;
                }else{
                    sv.push(value);
                }
                sv = this.setChildrenValue(sv, check, data['children']);
                value = sv;
            }
            this.props.onTextClick(value,id, text, data);
        }
        /* if(flag){
            this.setState({value : value});
        } */
    }

    setChildrenValue = (ov, check, chd) => {
        if(!chd || !(chd instanceof Array)) return ov;
        let valueKey = this.props.valueKey || this.valueKey;
        chd.forEach((child) => {
            let value = child[valueKey];
            let ind = ov.indexOf(value);
            if(check && ind < 0){
                ov.push(value);
            }else if(!check && ind > -1){
                ov.splice(ind,1);
            }
            let children = child['children'];
            if(children && children instanceof Array){
                ov = this.setChildrenValue(ov, check, children);
            }
        });
        return ov;
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

    getSelectOperate = () => {
        let { selectMode } = this.props;
        let selable = this.getSelectable();
        if(!selable){
            return '';
        }
        let checked = this.getChecked();
        let type = '';
        switch(selectMode){
            case 'multi':
                type = checked ? 'fangxingxuanzhong' : 'fangxingweixuanzhong';
                break;
            case 'single':
                type = checked ? 'yuanxingxuanzhong': 'yuanxingweixuanzhong';
                break;
            case 'auto':
            default:
            return '';
        }
        let { value, id, text, data } = this.getEventParam();
        return <Icon type={type} className={'operate'} onClick={() => this.onTextClick(value,id,text,data)}/>;
    }

    getChecked = () => {
        let value = this.state.value;
        let { selectMode , data, valueKey } = this.props;
        valueKey = valueKey || this.valueKey;
        if(!this.getSelectable()){
            return false;
        }
        let flag = false;
        switch(selectMode){
            case 'multi':
                if(value && (value instanceof Array)){
                    flag = value.indexOf(data[valueKey]) > -1;
                }
                break;
            case 'single':
            case 'auto':
            default:
                flag = value === data[valueKey];
        }
        return flag;
    }

    getSelectable = () => {
        let { data, selectable } = this.props;
        if(selectable && !selectable(data)){
            return false;
        }
        return true;
    }

    getEventParam = () => {
        let { data, idKey, valueKey, textKey } = this.props;
        let id = data[idKey||this.idKey];
        let value = data[valueKey||this.valueKey];
        let text = data[textKey||this.textKey];
        return { value, id, text ,data }
    }

    /* genChildrenDom = () => {
        let { children, selectMode, valueKey, data } = this.props;
        if( selectMode === 'multi' && children instanceof Array){
            return children.map((child) => {
                let oldTextClick = child.props.onTextClick;
                return React.cloneElement(child,{
                    onTextClick: (value, id, key, cdata) => {
                        let pv = data[valueKey||this.valueKey];
                        let ind = value.indexOf(pv);
                        if(ind > -1){
                            value.splice(ind, 1);
                        }
                        oldTextClick && oldTextClick(value,id,key,data);
                    }
                });
            });
        }
        return children;
    } */

    render(){
        let {id, value, text, data } = this.getEventParam();
        let children = data['children'] || [];
        let treeItemClass = '';
        if(children.length){
            treeItemClass += ' nonLeaf';
        }
        let { selectMode, first, last, cable } = this.props;
        if(data['root']){
            treeItemClass += ' rootNode';
        }else if(first){
            treeItemClass += ' firstNode';
        }
        if(last){
            treeItemClass += ' lastNode';
        }
        if(cable === false){
            treeItemClass += ' noCable'
        }
        let status = this.state.status || {};
        let opened = !!status.opened;

        let searched = this.props.searched;
        let checked = this.getChecked();

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
        return <section className={ treeItemClass } key={data[this.props.idKey||this.idKey]}>
            <p>
                <span sign="flexIcon"
                      onClick={this.onFlexIconClick}
                      className={'flexIcon'}>{ children.length ?
                    <Icon type={ opened ? 'minus-circle': 'plus-circle'}/> :
                    '' }</span>
                <i> </i>
                { this.getSelectOperate() }
                { (this.props.iconEnable||this.iconEnable) && this.getIconDom(data)}
                <span className={`text ${selectMode!=='multi' && checked?'checked':''} ${searched?'searched':''}`} onClick={() => this.onTextClick(value,id,text,data)}>
                    { data[this.props.textKey||this.textKey] }
                </span>
            </p>
            <div className={'list'} ref={"list"} style={style}>{ this.props.children }</div>
        </section>
    }
}

TreeItem.propTypes = {
    data: PropTypes.object,
    last: PropTypes.bool,
    first: PropTypes.bool,
    order: PropTypes.array,
    searched: PropTypes.bool,
    onTextClick: PropTypes.func,
    onVisibleChange: PropTypes.func,
    selectMode: PropTypes.string,//multi,single,auto
    selectable: PropTypes.func,
    valueKey: PropTypes.string,
    value: PropTypes.any,
    cable: PropTypes.bool//是否无连接
}


export default logical(TreeItem,logic,config);