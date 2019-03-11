import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';
import Icon from '../icon';
import Select from '../select';
import Timer from '../timer';
import moment from 'moment';

const Option = Select.Option;

class Calendar extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            yearArr: [],
            monthArr: [],
            dateArr: [],
            hourArr: [],
            minuteArr: [],
            secondArr: [],
            year: 0,
            month: 0,
            date:0,
            hour: 0,
            minute: 0,
            second: 0
        }
        this.initData();
    }

    initData = () => {
        let date = this.props.initDate || moment();
        if(!(date instanceof moment)){
            console.log('initDate is not moment');
            date = moment();
        }
        let year = date.year();
        console.log(year);
        let day = date.daysInMonth();
        console.log(day);
    }

    render(){
        return <section className={'Calendar'}>
            <header className={'year-month'}>
                <Icon type={'zuo'} />
                <Select>
                    <Option value={2019}>2019</Option>
                </Select>
                <Select>
                    <Option value={0}>一</Option>
                </Select>
                <Icon type={'gengduo'} />
            </header>
            <ul className={'week'}>
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
                <li>日</li>
            </ul>
            <div className={'date'}>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
            </div>
            <footer>
                <Timer/>
            </footer>
        </section>
    }
}

Calendar.propTypes = {
    format: PropTypes.string,//YYYY-MM-DD hh:mm:ss
    disabledDate: PropTypes.func,
    initDate: PropTypes.object,//没有默认当前时间
    timerConfig: PropTypes.any,//false表示不展示，配置则读取
}

export default Calendar;