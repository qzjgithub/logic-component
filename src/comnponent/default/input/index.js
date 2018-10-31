import React, { Component } from 'react';
import logical from '../../../common/logical';
import config from './config.json';
import logic from './logic.json';
import './index.styl';

class Input extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return <input className={config.name}/>
    }
}

export default logical(Input,logic);