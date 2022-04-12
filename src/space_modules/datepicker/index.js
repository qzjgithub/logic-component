import React, { Component } from 'react';
import { Datepicker } from '../../logic';
import moment from 'moment';

const Monthpicker = Datepicker.Monthpicker;

class DatepickerShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled : true,
            date: [moment(), moment().add(11, 'month')]
        }
    }

    disableDate = (current) => {
        return current > moment().add(10,'d');
    }

    render(){
        const {date} = this.state;
        console.log(date[0].format('YYYY-MM'));
        return <div>
            <Datepicker calendarConfig={{minDate:moment(),lang: 'en'}} />
            {/* <Monthpicker initValue={date[0]} /> */}
            {/* <Monthpicker value={date[1]} onChange={(v) => {
                if (v && v.isBefore(date[0])) {
                    this.setState({date: [moment(v), v]});
                    console.log(v);
                }
            }} /> */}
            </div>
    }
}


export default DatepickerShow;