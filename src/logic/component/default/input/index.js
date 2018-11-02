import React, { Component } from 'react';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

class Input extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return <input className={config.name}/>
    }
}

export default basic(Input,logic,config);