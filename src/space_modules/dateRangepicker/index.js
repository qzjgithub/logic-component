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
            <DateRangepicker 
                initStart={moment()}
                initEnd={moment()}
                hasClear={false}
                format={'YYYY-MM-DD'}
                startConfig={{
                    minDate: moment(),
                    timerConfig: false
                }}
                endConfig={{
                    maxDate: moment().add(7,'day'),
                    timerConfig: false
                }}/>
        </div>
    }
}


export default DateRangepickerShow;