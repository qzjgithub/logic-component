import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';

class Input extends Component{
    constructor(props, context) {
        super(props, context);
    }

    getValue = () => {
        let input = this.refs['input'];
        return input.value;
    }

    getFormType = () => {
        return 'input';
    }

    render(){
        let styleType = this.props.styleType || '';
        return <input {...this.props} 
            ref={'input'}
            className={`Input ${styleType} ${(this.props.disabled) ? 'disabled': ''}` }/>
    }
}

Input.propTypes = {
    styleType : PropTypes.string,//with-icon
    disabled: PropTypes.bool
}

export default Input