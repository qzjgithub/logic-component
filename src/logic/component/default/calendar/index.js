import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';
import Icon from '../icon';
import Select from '../select';
import Timer from '../timer';
import moment from 'moment';
import 'moment/locale/en-au';
import'moment/locale/zh-cn';
import { isInteger, patchZero, isRealOrZero } from '../../../common/Util';

const Option = Select.Option;

const TYPES = ['year','month','date','hour','minute','second'];

class Calendar extends Component{
    date;
    minDate;
    maxDate;
    constructor(props, context) {
        super(props, context);
        this.initParam(null, this.props);
        let date = this.getDate();
        this.setMomentLocal(this.props.lang || 'zh');
        this.state = Object.assign(this.initData(),{
            valid: true,
            date: date
        });
    }

    componentDidMount(){
        this.setTimer();
        this.setState({
            valid : this.getValid(this.state.date)
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            let datetime = nextProps.date || this.state.date;
            this.initParam(datetime, nextProps);
            if(datetime){
                datetime = moment(this.date);
            }
            if(nextProps.lang && nextProps.lang !== this.props.lang){
                this.setMomentLocal(nextProps.lang);
            }
            let compareFlag = this.minDate || this.maxDate;
            let { year, month } = this.state;
            let newDate = moment().year(year).month(month).date(1);
            this.setState({
                // ...this.initData(),
                yearArr: this.genYearArr(year,compareFlag && newDate),
                monthArr: this.genMonthArr(month,compareFlag && newDate),
                dateArr: this.genDateArr(newDate,newDate.daysInMonth()),
                date: datetime,
                valid: this.getValid(datetime)
            },() => {
                this.setTimer();
            });
        }
    }

    setMomentLocal(lang){
        switch(lang){
            case 'zh':
                moment.locale('zh-cn');
                break;
            case 'en':
                moment.locale('en-au');
                break;
        }
    }
    /**
     * 初始化参数
     */
    initParam = (datetime, props) => {
        datetime = datetime || props.date || props.initDate || moment();
        if(!moment.isMoment(datetime)){
            console.log('initDate is not moment');
            datetime = moment();
        }
        this.date = moment(datetime);

        let { minDate , maxDate } = props;
        if(minDate && moment.isMoment(minDate)){
            this.minDate = moment(minDate);
        }else{
            this.minDate = null;
        }
        if(maxDate && moment.isMoment(maxDate)){
            this.maxDate = moment(maxDate);
        }else{
            this.maxDate = null;
        }
        if(this.minDate && this.maxDate && this.minDate.isAfter(this.maxDate, 'second')){
            this.minDate = null;
            this.maxDate = null;
        }
        if(this.compareDate(this.date,'second')!==0){
            this.date = this.minDate || this.maxDate;
            if(moment.isMoment(this.date)){
                this.date = moment(this.date);
            }
        }
    }

    /**
     * 初始化日历值
     * @returns {{year: *, yearArr: Array}}
     */
    initData = () => {
        let datetime = this.date;
        let year = datetime.year();
        let month = datetime.month();
        let date = datetime.date();
        let days = datetime.daysInMonth();
        let hour = datetime.hour();
        let minute = datetime.minute();
        let second = datetime.second();

        let compareFlag = this.minDate || this.maxDate;
        return {
            year,
            yearArr: this.genYearArr(year,compareFlag && datetime),
            month,
            monthArr: this.genMonthArr(month,compareFlag && datetime),
            dateArr: this.genDateArr(datetime,days),
            hour,
            minute,
            second
        }
    }

    getDate = (datetime) => {
        datetime = datetime || (this.state||{}).date || this.props.date || this.props.initDate;
        if(datetime && moment.isMoment(datetime) && this.compareDate(datetime,'date') === 0){
            datetime;
        }else{
            return null
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

    genDateArr = (datetime, days) => {
        datetime.date(1);
        let week = datetime.weekday();
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
        return arr;
    }

    genTimerConfig = (datetime) => {
        let timerConfig = this.props.timerConfig || {};
        let onChange = timerConfig.onChange;
        return Object.assign({},timerConfig,{
            hourRange: this.genMinMax(datetime,3),
            minuteRange: this.genMinMax(datetime,4),
            secondRange: this.genMinMax(datetime,5),
            onChange: (value,text) => {
                let date = this.state.date;
                if(date && moment.isMoment(date)){
                    date.hour(value.hour).minute(value.minute).second(value.second);
                }
                let valid = this.getValid(date);
                if(onChange){
                    onChange(value,text)
                }
                this.setState({
                    ...value,
                    date,
                    valid
                },() => {
                    this.triggerOnChange();
                });
            }
        });
    }

    isDisableDate = (datetime) => {
        let { disableDate } = this.props;
        let flag = true;
        if(disableDate){
            datetime.hour(0).minute(0).second(0);
            if(!disableDate(moment(datetime))){
                flag = false;
            }else{
                datetime.hour(23).minute(59).second(59);
                if(!disableDate(moment(datetime))){
                    flag = false;
                }
            }
        }else{
            flag = false;
        }
        return flag;
    }

    compareDate = (datetime,type) => {
        if(this.minDate && datetime.isBefore(this.minDate,type)){
            return -1;
        }
        if(this.maxDate && datetime.isAfter(this.maxDate,type)){
            return 1;
        }
        return 0;
    }

    genMinMax = (datetime,tyInd) => {
        let key = `${TYPES[tyInd]}Range`;
        let obj = (this.props.timerConfig || {})[key] || {};
        obj = JSON.parse(JSON.stringify(obj));
        if(!datetime){
            return obj;
        }
        let min, max;
        if(this.minDate && this.minDate.isSame(datetime, TYPES[tyInd - 1])){
            min = this.minDate[TYPES[tyInd]]();
            if(isRealOrZero(obj.min) && obj.min > min){
                min = obj.min;
            }
            obj.min = min;
        }
        if(this.maxDate && this.maxDate.isSame(datetime,TYPES[tyInd - 1])){
            max = this.maxDate[TYPES[tyInd]]();
            if(isRealOrZero(obj.max) && obj.max < max){
                max = obj.max;
            }
            obj.max = max;
        }
        return obj;
    }

    genYearDom = () => {
        return this.state.yearArr.map((v) =>{
            return <Option value={v} key={v}>{ patchZero(v,4) }</Option>
        });
    }

    genMonthDom = () => {
        let texts = moment.monthsShort();
        return this.state.monthArr.map((v) =>{
            return <Option value={v} key={v}>{ texts[v] }</Option>
        });
    }

    genWeekDom = () => {
        let texts = moment.weekdaysMin();
        let sunday = texts.shift();
        texts.push(sunday);
        return texts.map((v, ind) => {
            return <li value={ind} key={ind}>{v}</li>
        })
    }

    genDateDom = () => {
        let day = 0;
        let cur = moment().year(this.state.year).month(this.state.month);
        let date = this.state.date;
        return this.state.dateArr.map((v,index) => {
            if(v === null){
                return <span className={'empty'}> </span>;
            }else{
                day++;
                cur.date(day);
                let cls = '';
                if(v === false){
                    cls += 'disabled ';
                }
                if(date && date.isSame(cur,'date')){
                    cls += 'selected ';
                }
                if(this.props.signToday !== false && moment().isSame(cur,'date')){
                    cls += 'today ';
                }
                return <span className={cls} onClick={() => this.setDate(index)}>{ day }</span>
            }
        });
    }

    getMinDayDate = () => {
        return moment().year(this.state.year)
            .month(this.state.month)
            .date(1)
            .hour(this.state.hour)
            .minute(this.state.minute)
            .second(this.state.second);
    }

    addMonth = () => {
        this.date = this.getMinDayDate().add(1,'months')
        this.setState(this.initData());
    }

    subtractMonth = () => {
        this.date = this.getMinDayDate().subtract(1,'months');
        this.setState(this.initData());
    }

    setYear = (value) => {
        this.date = this.getMinDayDate().year(value);
        this.setState(this.initData());
    }

    setMonth = (value) => {
        this.date = this.getMinDayDate().month(value);
        this.setState(this.initData());
    }

    setDate = (index) => {
        let datetime = this.getMinDayDate();
        let weekday = datetime.weekday();
        datetime.date(index - weekday + 1);
        this.setState({
            date: datetime,
            valid: this.getValid(datetime)
        },() => {
            this.setTimer(this.triggerOnChange);
        });
    }

    compareDateFull = (date) => {
        let { timerConfig } = this.props;
        let type = '';
        if(timerConfig === false){
            type = 'date';
        }else if(timerConfig){
            let { hourHide, minuteHide, secondHide } = timerConfig;
            if(secondHide !== true){
                type = 'second';
            }else if(minuteHide !== true){
                type = 'minute';
            }else if(hourHide!==true){
                type = 'hour';
            }
        }else{
            type = 'second';
        }
        return this.compareDate(date, type);
    }

    getValid = (date) => {
        let valid = true;
        if(date){
            if(this.compareDateFull(date) === 0){
                if(this.props.disableDate && this.props.disableDate(moment(date))){
                    valid = false;
                }
            }else{
                valid = false;
            }
        }
        return valid;
    }

    setTimer = (callback) => {
        let timer = this.refs['timer'];
        if(this.props.timerConfig !== false && timer){
            this.setState(timer.getValue(),() => {
                callback && callback();
            });
        }else{
            callback && callback();
        }
    }

    triggerOnChange = () => {
        if(this.props.onChange){
            let { value, valid } = this.getValue();
            this.props.onChange(value,valid);
        }
    }

    getValue = () => {
        let datetime = this.state.date;
        if(datetime && moment.isMoment(datetime)){
            datetime.hour(this.state.hour)
                .minute(this.state.minute)
                .second(this.state.second);
        }
        return { value: datetime, valid: this.getValid(datetime)}
    }

    render(){
        let { timerConfig } = this.props;
        let showTimer = timerConfig !== false;
        if(showTimer){
            timerConfig = this.genTimerConfig(moment(this.state.date));
        }
        let { hour, minute, second } = this.state;
        timerConfig = Object.assign(timerConfig || {},{ hour, minute, second });
        let leftDisabled = false;
        let cur = moment().year(this.state.year).month(this.state.month);
        if(this.minDate && this.minDate.isSameOrAfter(cur,'month')){
            leftDisabled = true;
        }
        let rightDisabled = false;
        if(this.maxDate && this.maxDate.isSameOrBefore(cur,'month')){
            rightDisabled = true;
        }
        return <section className={'Calendar'}>
            <header>
                <Icon type={'zuo'} onClick={this.subtractMonth}
                      className={ leftDisabled ? 'disabled': ''}/>
                <Select value={this.state.year} onSelected={this.setYear}>
                    { this.genYearDom() }
                </Select>
                <Select value={this.state.month} onSelected={this.setMonth}>
                    { this.genMonthDom() }
                </Select>
                <Icon type={'gengduo'} onClick={this.addMonth}
                      className={ rightDisabled ? 'disabled': ''}/>
            </header>
            <ul>
                { this.genWeekDom() }
            </ul>
            <div>
                { this.genDateDom() }
            </div>
            {showTimer && <footer>
                <Timer {...timerConfig} ref={'timer'}/>
            </footer>}
        </section>
    }
}

Calendar.propTypes = {
    format: PropTypes.string,//YYYY-MM-DD HH:mm:ss
    disableDate: PropTypes.func,
    initDate: PropTypes.object,//没有默认当前时间
    timerConfig: PropTypes.any,//false表示不展示，配置则读取
    lang: PropTypes.string,
    langObj: PropTypes.object,
    date: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    signToday: PropTypes.bool,
    onChange: PropTypes.func,
    lang: PropTypes.string
}

export default Calendar;