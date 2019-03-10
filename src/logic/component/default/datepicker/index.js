import React, { Component } from 'react';
import logical from '../../../common/logical';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

class Datepicker extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return <input/>
    }
}

export default logical(Datepicker,logic,config);