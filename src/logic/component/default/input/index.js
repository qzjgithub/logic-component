import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';

class Input extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: undefined
        }
    }

    getValue = () => {
        let input = this.refs['input'];
        return input.value;
    }

    getFormType = () => {
        return 'input';
    }

    clear = () => {
        this.setState({
            value: undefined
        });
    }

    onInput = (e) => {
        e.persist();
        this.setState({
            value: e.target.value
        }, () => {
            e.target.value = this.state.value;
            if (this.props.onInput) {
                this.props.onInput(e);
            }
        });
    }

    render(){
        const {styleType = '', initValue, value} = this.props;
        let v = value;
        if (v === undefined) {
            v = this.state.value;
        }
        if (v === undefined) {
            v = initValue;
        }
        if (v === undefined) {
            v = '';
        }
        return <input {...this.props} 
            ref={'input'}
            className={`Input ${styleType} ${(this.props.disabled) ? 'disabled': ''}` }
            value={v}
            onInput={this.onInput}
        />
    }
}

Input.propTypes = {
    styleType : PropTypes.string,//with-icon
    disabled: PropTypes.bool,
    input: PropTypes.string
}

export default Input