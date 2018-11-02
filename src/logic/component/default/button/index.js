import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

class Button extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            i18n : {}
        }
    }

    render(){
        let lang = this.state['i18n'][config.name] || {};
        let styleType = this.props.styleType || '';
        return <button className={ styleType }>
            {this.props.children || lang['text']}
            </button>;
    }
}

Button.propTypes = {
    styleType : PropTypes.string
}


export default basic(Button,logic,config);