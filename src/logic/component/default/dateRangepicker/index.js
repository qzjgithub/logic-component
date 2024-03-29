import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logical from '../../../common/logical';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

import moment from 'moment';
import Button from '../button';
import Calendar from '../calendar';
import Icon from '../icon';

const defaultFormat = 'YYYY-MM-DD HH:mm:ss';

class DateRangepicker extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = this.initData(props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            let { start, end } = nextProps;
            this.setState({
                start: start === undefined ? this.state.start : start,
                end: end === undefined ? this.state.end : end
            });
        }
    }

    initData = (props) => {
        let { start, end , initStart, initEnd} = props;
        start = start || initStart;
        end = end || initEnd;
        if(moment.isMoment(start) && moment.isMoment(end)){
            if(start.isAfter(end,'second')){
                console.log('start is after end');
                start = null;
                end = null;
            }
        }
        if(!start && !end && props.defaultToday !== false){
            start = moment();
            end = moment();
        }
        return {
            start, end
        }
    }

    getStartConfig = () => {
        let config = this.props.startConfig || {};
        let maxDate = this.state.end || config.maxDate;
        if(moment.isMoment(maxDate)){
            maxDate = moment(maxDate);
        }
        config = Object.assign({},config,{
            date: this.state.start ,
            maxDate: maxDate
        });

        let onChange = config.onChange;
        config.onChange = (start,valid) => {
            this.setState({
                start
            });
            if(onChange){
                onChange(start,valid);
            }
            this.triggerChange();
        }
        let disableDateRange = this.props.disableDate;
        if(disableDateRange){
            let disableDate = config.disableDate;
            config.disableDate = (current) => {
                let { start, end } = this.state;
                let flag = disableDateRange(current, start ? moment(start) : start, end ? moment(end) : end);
                if(!flag && disableDate){
                    flag = disableDate(current);
                }
                return flag;
            }
        }
        return config;
    }

    getEndConfig = () => {
        let config = this.props.endConfig || {};
        let minDate = this.state.start || config.minDate;
        if(moment.isMoment(minDate)){
            minDate = moment(minDate);
        }
        config = Object.assign({},config,{
            date: this.state.end ,
            minDate: minDate
        });

        let onChange = config.onChange;
        config.onChange = (end,valid) => {
            this.setState({
                end
            });
            if(onChange){
                onChange(end,valid);
            }
            this.triggerChange();
        }
        let disableDateRange = this.props.disableDate;
        if(disableDateRange){
            let disableDate = config.disableDate;
            config.disableDate = (current) => {
                let { start, end } = this.state;
                let flag = disableDateRange(current, start ? moment(start) : null, end ? moment(end) : null);
                if(!flag && disableDate){
                    flag = disableDate(current);
                }
                return flag;
            }
        }
        return config;
    }
    clear = (e) => {
        e && e.stopPropagation();
        this.setState({
            start: null,
            end: null
        },() => {
            this.triggerChange();
        });
    }

    setValue = () => {
        let { start, end } = this.refs;
        let status = this.state.status || {};
        if(start && end){
            let startDate  = start.getValue().value;
            let endDate = end.getValue().value;
            let disableDate = this.props.disableDate;
            if(typeof disableDate === 'function' && 
                (disableDate(moment(startDate),moment(startDate),moment(endDate))||
                disableDate(moment(endDate), moment(startDate), moment(endDate)))){
                return;
            }
            status['opened'] = false;
            this.setState({
                start: startDate,
                end: endDate,
                status
            },() => {
                this.triggerChange();
            });
        }
    }

    getValue = () => {
        let { start, end } = this.refs;
        let startDate = this.state.start, endDate = this.state.end;
        let valid = moment.isMoment(startDate) && moment.isMoment(endDate);
        if(start && end && valid){
            valid = start.getValid(startDate) && end.getValid(endDate);
        }
        return { startDate: moment(startDate) , endDate: moment(endDate) , valid }
    }

    getFormType = () => {
        return 'dateRangepicker';
    }

    getFormatValue = () => {
        let { startDate, endDate, valid} = this.getValue();
        let start = moment.isMoment(startDate) ? startDate.format(this.props.format || defaultFormat) :'';
        let end = moment.isMoment(endDate) ? endDate.format(this.props.format || defaultFormat) :'';
        return {start, end, valid };
    }

    triggerChange = () => {
        if(this.props.onChange){
            let dateValue = this.getValue();
            let dateFormat = this.getFormatValue();
            this.props.onChange(dateValue, dateFormat);
        }
    }

    keepFocus = (ev, oldValue, newValue) =>{
        let textDom = this.refs['text'];
        if(textDom){
            textDom.parentElement.focus();
        }
        newValue['opened'] = oldValue['opened'];
        return newValue;
    }

    getQuickSwitchDom = (isNext) => {
        const {quickSwitch} = this.props;
        const {start, end} = this.state;
        if (!start || !end) {
            return '';
        }
        if (quickSwitch === 'single' && !start.isSame(end, 'day')) {
            return '';
        }
        if (quickSwitch) {
            return (
                <span className='quick-switch'>
                    <Icon
                        type={isNext ? 'gengduo' : 'zuo'}
                        onClick={() => this.onQuickSwitch(isNext)}
                    />
                </span>
            );
        }
        return '';
    }

    onQuickSwitch = (isNext) => {
        const {disabled} = this.props;
        if (disabled) {
            return;
        }
        const {start, end} = this.state;
        if (!start || !end) {
            return;
        }
        const count = isNext ? 1 : -1;
        const nstart = moment(start).add(count, 'day');
        const nend = moment(end).add(count, 'day');
        const disableDate = this.props.disableDate;
        if(typeof disableDate === 'function' && 
            (disableDate(moment(nstart),moment(nstart),moment(nend))||
            disableDate(moment(nend), moment(nstart), moment(nend)))){
            return;
        }
        this.setState({
            start: nstart,
            end: nend
        }, () => {
            if(this.props.onQuickSwitch){
                let dateValue = this.getValue();
                let dateFormat = this.getFormatValue();
                this.props.onQuickSwitch(dateValue, dateFormat);
            }
            this.triggerChange();
        });
    }

    render() {
        let { start, end } = this.state;
        let text = '';
        if(start && moment.isMoment(start)){
            text += start.format(this.props.format || defaultFormat);
            text += ' ~ ';
        }
        if(end && moment.isMoment(end)){
            if(!text){
                text += ' ~ ';
            }
            text += end.format(this.props.format || defaultFormat);
        }
        if(!text){
            text = this.props.defaultText || '请选择时间段';
        }
        const {hasClear} = this.props;
        return <div>
            {this.getQuickSwitchDom(false)}
            <Button sign={'text'} className={'text'} disabled={this.props.disabled} key='btn'>
                <span ref={'text'} key='text'>{ text }</span>
                { this.props.hasClear !== false &&  ( start || end ) && 
                    <Icon type={'guanbi1'} onClick={this.clear} className={'date-clear'} key='clear' />
                }
                <Icon type={'unfold'} key='close' />
            </Button>
            {this.getQuickSwitchDom(true)}
            <div sign={'list'} className={'list'} onMouseLeave={this.keepFocus} key='list'>
                <Calendar {...this.getStartConfig()} ref={'start'} key='start' />
                <Calendar {...this.getEndConfig()} ref={'end'} key='end' />
                <p className={'control'} key='control'>
                    {hasClear !== false && ( !!start || !!end ) && 
                        <a onClick={this.clear} className={'cleard'} key='clear'>
                            {hasClear === true ? '清除' : hasClear}
                        </a>
                    }
                    <Button onClick={this.setValue} key='confirm'>
                        {this.props.confirmText || '确定'}
                    </Button>
                </p>
            </div>
        </div>
    }
}

DateRangepicker.propTypes = {
    start : PropTypes.object,
    end: PropTypes.object,
    initStart: PropTypes.object,
    initEnd: PropTypes.object,
    disableDate: PropTypes.func,//(current,start,end)
    disabled: PropTypes.bool,
    defaultText: PropTypes.string,
    format: PropTypes.string,//YYYY-MM-DD HH:mm:ss
    hasClear: PropTypes.any,
    defaultToday: PropTypes.bool,
    startConfig: PropTypes.object,
    endConfig: PropTypes.object,
    confirmText: PropTypes.string,
    onChange: PropTypes.func,
    quickSwitch: PropTypes.string
}

export default logical(DateRangepicker,logic,config);