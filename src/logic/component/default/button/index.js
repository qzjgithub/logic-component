import React, { Component } from 'react';
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
        return <button className={config.name}>{this.props.children || lang['text']}</button>;
    }
}

export default basic(Button,logic,config);