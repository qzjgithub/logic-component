import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../select';
import { isInteger, patchZero, isRealOrZero } from '../../../common/Util';
import './index.styl';

const Option = Select.Option;

const HOUR_RANGE = {
    min: 0,
    max: 23,
    interval: 1,
    arr: null
}
const MINUTE_RANGE = {
    min: 0,
    max: 59,
    interval: 1,
    arr: null
}
const SECOND_RANGE = {
    min: 0,
    max: 59,
    interval: 1,
    arr: null
}

class Timer extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = this.getValueAndArray(props,{});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            this.setState(Object.assign(
                this.state,this.getValueAndArray(
                    Object.assign({},this.props,nextProps),
                    this.state)));
        }
    }

    /**
     * 根据props得到当前的数组和值
     * @param props
     * @param state
     * @returns {{hourArr: (Array|*), hour: *, minuteArr: (Array|*), minute: *, secondArr: (Array|*), second: *}}
     */
    getValueAndArray = (props,state) => {
        let hourArr = this.getArray(HOUR_RANGE,props.hourRange);
        let hour = this.getValidValue(props.hourDef, state.hour, props.hour, hourArr);
        let minuteArr = this.getArray(MINUTE_RANGE,props.minuteRange);
        let minute = this.getValidValue(props.minuteDef, state.minute, props.minute, minuteArr);
        let secondArr = this.getArray(SECOND_RANGE,props.secondRange);
        let second = this.getValidValue(props.secondDef, state.second, props.second, secondArr);
        return { hourArr, hour, minuteArr, minute, secondArr, second };
    }

    /**
     * 根据模板range,和传入的range得到数组
     * @param temRange
     * @param tarRange
     */
    getArray = (temRange,tarRange) => {
        let range = Object.assign({},temRange,tarRange);
        let { min, max, interval, arr } = range;
        if(arr instanceof Array && arr.length){
            arr = arr.filter( v => this.validNum(v,temRange)).sort();
        }else{
            arr = [];
        }
        if(!arr.length){
            min = this.validNum(min, temRange) ? min : temRange.min;
            max = this.validNum(max, temRange) ? max : temRange.max;
            interval = isInteger(interval) ? interval : temRange.interval;
            if(interval > (max - min) && interval === 0){
                interval = 1;
            }
            if(min <= max ){
                arr = this.genArray(min, max, interval);
            }else{
                arr = this.genArray(temRange.min,temRange.max,temRange.max);
            }
        }
        return arr;
    }

    /**
     * 根据最大值最小值和间隔生成数组
     * @param min
     * @param max
     * @param interval
     * @returns {Array}
     */
    genArray = (min, max, interval) => {
        let arr = [];
        for(let i = min;i <= max;){
            arr.push(i);
            i += interval;
        }
        return arr;
    }

    /**
     * 根据默认值，state中的值，props中的值和数组得到最新值
     * @param def
     * @param sv
     * @param pv
     * @param arr
     * @returns {*}
     */
    getValidValue= (def, sv, pv, arr) => {
        let value;
        switch(true){
            case isInteger(pv):
                value = this.validValueInArr(pv,arr);
                break;
            case isInteger(sv):
                value = this.validValueInArr(sv,arr);
                break;
            case isInteger(def):
                value = this.validValueInArr(def,arr);
                break;
            default:
                value = arr[0];
        }
        return value;
    }

    /**
     * 检验值是否在数组中
     * @param v
     * @param arr
     * @returns {*}
     */
    validValueInArr = (v,arr) => {
        return arr.indexOf(v) > -1 ? v : arr[0];
    }

    /**
     * 检测值是否符合最低模板规范
     * @param value
     * @param category
     * @returns {boolean}
     */
    validNum = (value,category) => {
        Object.assign({},MINUTE_RANGE,category);
        return isInteger(value) && value <= category.max && value >= category.min;
    }

    /**
     * 根据数组得到选择项
     * @param arr
     */
    getOptionDom = (arr) => {
        return arr.map((v,i) => {
            return <Option value={v} key={i}>{patchZero(v)}</Option>
        });
    }

    setValue = (value,type) => {
        this.setState({
            [type]: value
        },() => {
            if(this.props.onChange){
                this.props.onChange(this.getValue(),this.getFormatValue());
            }
        });
    }

    getHourDom = () => {
        let dom = [];
        if(!this.props.hourHide){
            dom.push(
                <Select value={this.state.hour} onSelected={(value) => this.setValue(value,'hour')}>
                { this.getOptionDom(this.state.hourArr) }
            </Select>
            );
            dom.push(<span>{ this.props.hourText || '时'}</span>);
        }
        return dom;
    }

    getMinuteDom = () => {
        let dom = [];
        if(!this.props.minuteHide){
            dom.push(
                <Select value={this.state.minute} onSelected={(value) => this.setValue(value,'minute')}>
                { this.getOptionDom(this.state.minuteArr) }
            </Select>
            );
            dom.push(
                <span>{ this.props.minuteText || '分'}</span>
            );
        }
        return dom;
    }

    getSecondDom = () => {
        let dom = [];
        if(!this.props.secondHide){
            dom.push(
                <Select value={this.state.second} onSelected={(value) => this.setValue(value,'second')}>
                { this.getOptionDom(this.state.secondArr) }
            </Select>
            );
            dom.push(
                <span>{ this.props.secondText || '秒'}</span>
            );
        }
        return dom;
    }

    getValue = () => {
        return {
            hour: this.state.hour,
            minute: this.state.minute,
            seconde: this.state.second
        }
    }

    getFormatValue = () => {
        let format = this.props.format;
        if(!isRealOrZero(format)){
            format = 'hh:mm:ss';
        }
        return format.replace('hh',patchZero(this.state.hour))
        .replace('mm',patchZero(this.state.minute))
        .replace('ss',patchZero(this.state.second));
    }

    render(){
        return <div className={'Timer'}>
            {[
                ...this.getHourDom(),
                ...this.getMinuteDom(),
                ...this.getSecondDom()
                ]}
        </div>
    }
}

Timer.propTypes = {
    format: PropTypes.string,//hh:mm:ss
    hourHide: PropTypes.bool,
    minuteHide: PropTypes.bool,
    secondHide: PropTypes.bool,
    hourRange: PropTypes.object,//{ min: 0, max: 23, interval: 1, arr: [0,1,2]}
    minuteRange: PropTypes.object,
    secondRange: PropTypes.object,
    hourDef: PropTypes.number,
    minuteDef: PropTypes.number,
    secondDef: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
    second: PropTypes.number,
    hourText: PropTypes.string,
    minuteText: PropTypes.string,
    secondText: PropTypes.string,
    onChange: PropTypes.func
}

export default Timer