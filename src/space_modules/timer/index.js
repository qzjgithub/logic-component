import React, { Component } from 'react';
import { Timer } from '../../logic';

class TimerShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled : true
        }
    }

    render(){
        return <Timer/>
    }
}


export default TimerShow;