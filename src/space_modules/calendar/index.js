import React, { Component } from 'react';
import { Calendar } from '../../logic';
import moment from 'moment';

class CalendarShow extends Component{
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
            <Calendar minDate={moment().subtract(1,'d')}
                      signToday={false}
                      maxDate={moment().add(6,'d')}
                      disableDate={this.disableDate}/>
            </div>
    }
}


export default CalendarShow;