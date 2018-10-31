import React, { Component } from 'react';
import logical from '../../../common/logical';
import config from './config.json';
import logic from './logic.json';
import './index.styl';

class Button extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return <button className={config.name}>{this.props.children || '按钮'}</button>;
    }
}

export default logical(Button,logic);