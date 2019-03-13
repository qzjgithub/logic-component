import React, { Component } from 'react';
import { DateRangepicker } from '../../logic';
import moment from 'moment';

class DateRangepickerShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled : true
        }
    }

    disableDate = (current) => {
        return current > moment().add(10,'d');
    }

    render(){
        return <div>
            <DateRangepicker/>
        </div>
    }
}


export default DateRangepickerShow;