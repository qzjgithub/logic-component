import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import './index.styl';

class Checkbox extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: []
        }
    }

    getValue = () => {
        return this.state.value;
    }

    getFormType = () => {
        return 'checkbox';
    }

    render(){
        return <div>暂未实现,只能用Checkbox.CheckboxItem</div>
    }
}

Checkbox.propTypes = {
    disabled: PropTypes.bool
}

class CheckboxItem extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: this.props.checked,
            disabled: this.props.disabled
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            this.setState({
                checked: nextProps.checked,
                disabled: nextProps.disabled
            });
        }
    }

    setCheck = () => {
        this.setState({
            checked: !this.state.checked
        },() => {
            if(this.props.onChange){
                this.props.onChange(this.state.checked);
            }
        });
    }

    render(){
        let type = this.state.checked ? 'fangxingxuanzhong':'fangxingweixuanzhong';
        let cls = this.state.disabled ? 'disabled': '';
        return <Icon type={type} className={`CheckboxItem ${cls}`} onClick={this.setCheck}/>
    }
}

CheckboxItem.propTypes = {
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}

Checkbox.CheckboxItem = CheckboxItem;

export default Checkbox