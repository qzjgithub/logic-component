import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';
import Icon from '../icon';
import Select from '../select';
import Timer from '../timer';
import moment from 'moment';
import { zh } from './i18n';

const Option = Select.Option;

const TYPES = ['year','month','date','hour','minute','second'];

class Calendar extends Component{
    initDate;
    minDate;
    maxDate;
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
        this.initParam();
        this.initData();
    }

    /**
     * 初始化生成日历的基准日期
     */
    initParam = () => {
        let datetime = this.props.date || this.props.initDate || moment();
        if(!moment.isMoment(datetime)){
            console.log('initDate is not moment');
            datetime = moment();
        }
        this.initDate = datetime;

        let { minDate , maxDate } = this.props;
        if(minDate && moment.isMoment(minDate)){
            this.minDate = minDate;
        }else{
            this.minDate = null;
        }
        if(maxDate && moment.isMoment(maxDate)){
            this.maxDate = maxDate;
        }else{
            this.maxDate = null;
        }
        if(this.minDate && this.maxDate && this.minDate.isAfter(this.maxDate, 'second')){
            this.minDate = null;
            this.maxDate = null;
        }
        if(this.compareDate(this.initDate,'second')!==0){
            this.initDate = this.minDate || this.maxDate;
        }
    }

    /**
     * 初始化日历值
     * @returns {{year: *, yearArr: Array}}
     */
    initData = () => {
        let datetime = this.initDate;
        let year = datetime.year();
        let month = datetime.month();
        let date = datetime.date();
        let days = datetime.daysInMonth();
        let week = datetime.weekday();
        let hour = datetime.hour();
        let minute = datetime.minute();
        let second = datetime.second();

        let compareFlag = this.minDate || this.maxDate;
        return {
            year,
            yearArr: this.genYearArr(year,compareFlag && datetime),
            month,
            monthArr: this.genMonthArr(month,compareFlag && datetime),
            date,
            dateArr: this.genDateArr(date,datetime,days,week),
            hour,
        }
    }

    genYearArr = (year, datetime) => {
        let arr = [];
        for(let i = 0;i >= -10;i--){
            let cur = year + i;
            let res = 0;
            if(datetime){
                res = this.compareDate(datetime.year(cur),'year');
                if(res === -1){
                    break;
                }else if( res === 1){
                    continue;
                }
            }
            arr.unshift(cur);
        }
        for(let j = 1;j <= 10;j++){
            let cur = year + j;
            let res = 0;
            if(datetime){
                res = this.compareDate(datetime.year(cur),'year');
                if(res === 1){
                    break;
                }else if( res === -1){
                    continue;
                }
            }
            arr.push(cur);
        }
        datetime && datetime.year(year);
        return arr;
    }

    genMonthArr = (month, datetime) => {
        let arr = [];
        for(let i = 0;i < 12;i++){
            let res = 0;
            if(datetime){
                res = this.compareDate(datetime.month(i),'month');
                if(res === 1){
                    break;
                }else if(res === -1){
                    continue;
                }
            }
            arr.push(i);
        }
        datetime && datetime.month(month);
        return arr;
    }

    genDateArr = (date, datetime, days, week) => {
        let arr = [];
        for(let i = 0;i < week; i++){
            arr.push(null);
        }
        for(let j = 0;j < days; j++){
            let res = 0;
            datetime.date(j+1);
            res = this.compareDate(datetime,'date');
            res === 0 ?
                arr.push(!this.isDisableDate(datetime)) :
                arr.push(false);
        }
    }

    genHourConfig = (hour) => {

    }

    isDisableDate(datetime){
        let { disableDate } = this.props;
        let flag = true;
        if(disableDate){
            datetime.hour(0).minute(0).second(0);
            if(!disableDate(datetime)){
                flag = false;
            }else{
                datetime.hour(23).minute(59).second(59);
                if(!disableDate(datetime)){
                    flag = false;
                }
            }
        }else{
            flag = false;
        }
        return flag;
    }

    compareDate(datetime,type){
        if(this.minDate && datetime.isBefore(this.minDate,type)){
            return -1;
        }
        if(this.maxDate && datetime.isAfter(this.maxDate,type)){
            return 1;
        }
        return 0;
    }

    genMinMax(datetime,tyInd){
        let obj = (this.props.timerConfig || {})[TYPES[tyInd]] || {};
        let min, max;
        if(this.minDate && this.minDate.isSame(datetime, TYPES[tyInd + 1])){
            min = this.minDate.minute();
            if(obj.min && obj.min > min){
                min = obj.min;
            }
        }
        if(this.maxDate && this.maxDate.isSame(datetime,TYPES[tyInd + 1])){
            max = this.maxDate.minute();
            if(obj.max && obj.max < max){
                max = obj.max;
            }
        }
    }

    render(){
        return <section className={'Calendar'}>
            <header>
                <Icon type={'zuo'} />
                <Select>
                    <Option value={2019}>2019</Option>
                </Select>
                <Select>
                    <Option value={0}>一</Option>
                </Select>
                <Icon type={'gengduo'} />
            </header>
            <ul>
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
                <li>日</li>
            </ul>
            <div>
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
    disableDate: PropTypes.func,
    initDate: PropTypes.object,//没有默认当前时间
    timerConfig: PropTypes.any,//false表示不展示，配置则读取
    langObj: PropTypes.object,
    date: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object
}

export default Calendar;