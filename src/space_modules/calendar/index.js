import React, { Component } from 'react';
import { Calendar } from '../../logic';

class CalendarShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled : true
        }
    }

    render(){
        return <div>
            <Calendar/>
            </div>
    }
}


export default CalendarShow;