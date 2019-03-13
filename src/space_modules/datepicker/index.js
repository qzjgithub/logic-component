import React, { Component } from 'react';
import { Datepicker } from '../../logic';
import moment from 'moment';

class DatepickerShow extends Component{
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
            <Datepicker/>
            </div>
    }
}


export default DatepickerShow;