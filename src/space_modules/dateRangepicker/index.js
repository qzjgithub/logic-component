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

    valid = () => {
        let result = this.refs['date'].getValue();
        console.log(result);
    }

    opened = (o, n, e, s) => {
        if(n['opened']){
            console.log("opened");
        }else{
            console.log("closed");
        }
    }

    render(){
        return <div>
            <DateRangepicker 
                ref={'date'}
                initStart={moment()}
                initEnd={moment()}
                hasClear={true}
                format={'YYYY-MM-DD'}
                onTextClick={this.opened}
                onTextBlur={this.opened}
                /* disableDate={(c,s,e)=>{
                    let flag = true;
                    if(moment.isMoment(s)){
                        flag = c.isSameOrBefore(s.add(31,'day'),'day');
                    }
                    if(flag && moment.isMoment(e)){
                        flag = c.isSameOrAfter(e.subtract(31,'day'),'day');
                    }
                    return !flag;
                }} */
                disableDate={(c) => c.isAfter(moment())}
                startConfig={{
                    timerConfig: false,
                    minDate: moment().subtract(5, 'day')
                }}
                endConfig={{
                    timerConfig: false,
                    minDate: moment().subtract(5, 'day')
                }}
                quickSwitch='single'
                onQuickSwitch={(v, f) => console.log(v, f)}
            />
            <span onClick={this.valid} key='valid'>验证</span>
        </div>
    }
}


export default DateRangepickerShow;