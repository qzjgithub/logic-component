import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';
import Icon from '../icon';

class Menu extends Component{
    constructor(props, context) {
        super(props, context);
    }

    getChildren(){
        let c = this.props.children;
        if(c){
            if(typeof c === 'object' && c.length){
                return this.props.children.map((item)=>{
                    if(item.type){
                        return React.cloneElement(item,{ checkSign: this.props.checkSign});
                    }else{
                        return item;
                    }
                });
            }else if(c.type && c.length !== 0){
                return React.cloneElement(this.props.children,{ checkSign: this.props.checkSign});
            }else{
                return c;
            }
        }else{
            return c;
        }
    }

    render(){
        return <ul className={'Menu'}>{ this.getChildren() }</ul>
    }
}

Menu.propTypes = {
    multiple: PropTypes.bool,
    checkSign: PropTypes.any
}

class MenuItem extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked : this.props.checked
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.checked !== undefined && this.state.checked !== nextProps.checked){
            this.setState({
                checked: nextProps.checked
            });
        }
    }

    textClick = () => {
        this.setState({
            checked: !this.state.checked
        },() => {
            if(this.props.changed){
                this.props.changed(this.state.checked,this.props.value);
            }
        });
    }

    getCheckSign(){
        if(this.state.checked){
            if(this.props.checkSign === true){
                return <Icon type={'xuanze'}/>
            }else{
                return this.props.checkSign || '';
            }
        }else{
            return '';
        }
    }

    getChildren(){
        if(this.props.children){
            if(this.props.children.length){
                return <ul className={'Menu'}>{ this.props.children.map((item)=>{
                    return React.cloneElement(item,{ checkSign: this.props.checkSign});
                }) }</ul>;
            }else{
                return <ul className={'Menu'}>{ React.cloneElement(this.props.children,{ checkSign: this.props.checkSign}) }</ul>;
            }
        }else{
            return '';
        }
    }

    render(){
        return <li className={'MenuItem'}>
            <p onClick={this.textClick}>
                <span>{ this.props.text||'' }</span>
                {this.getCheckSign()}
            </p>
            {this.getChildren()}
        </li>
    }
}

MenuItem.propTypes = {
    checked: PropTypes.bool,
    text: PropTypes.any,
    value: PropTypes.any,
    changed: PropTypes.func
}

Menu.MenuItem = MenuItem;

export default Menu;