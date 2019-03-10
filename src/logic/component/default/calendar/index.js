import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';

class Calendar extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            yearArr: [],
            monthArr: [],
            dateArr: [],
            hourArr: [],
            minuteArr: [],
            secondArr: []
        }
    }

    render(){
        return <input/>
    }
}

Calendar.propTypes = {
    format: PropTypes.string,//YYYY-MM-DD hh:mm:ss
    disabledDate: PropTypes.func,
    initDate: PropTypes.object,//没有默认当前时间
    timerConfig: PropTypes.any,//false表示不展示，配置则读取
}

export default Calendar;