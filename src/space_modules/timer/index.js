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
        return <div>
            <Timer/>
            <Timer hourHide={true}/>
            <Timer hourRange={ {min: 3, max: 22, interval: 2} }/>
            </div>
    }
}


export default TimerShow;