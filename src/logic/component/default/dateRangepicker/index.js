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
        let { start, end } = props;
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
        let { start, end } = this.state;
        let maxDate = end || config.maxDate;
        if(moment.isMoment(maxDate)){
            maxDate = moment(maxDate);
        }
        config = Object.assign({},config,{
            date: start ,
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
                disableDateRange(current, moment(start), moment(end));
                if(disableDate){
                    disableDate(current);
                }
            }
        }
        return config;
    }

    getEndConfig = () => {
        let config = this.props.endConfig || {};
        let { start, end } = this.state;
        let minDate = this.state.start || config.minDate;
        if(moment.isMoment(minDate)){
            minDate = moment(minDate);
        }
        config = Object.assign({},config,{
            date: end ,
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
                disableDateRange(current, moment(start), moment(end));
                if(disableDate){
                    disableDate(current);
                }
            }
        }
        return config;
    }
    clear = (e) => {
        e.stopPropagation();
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
        return { startDate , endDate , valid }
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

    render(){
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
        return <div>
            <Button sign={'text'} className={'text'} disabled={this.props.disabled}>
                <span ref={'text'}>{ text }</span>
                { this.props.hasClear !== false &&  ( start || end ) && 
                    <Icon type={'guanbi1'} onClick={this.clear} className={'date-clear'}/>
                }
                <Icon type={'unfold'} />
            </Button>
            <div sign={'list'} className={'list'} onMouseLeave={this.keepFocus}>
                <Calendar {...this.getStartConfig()} ref={'start'}/>
                <Calendar {...this.getEndConfig()} ref={'end'}/>
                <p className={'control'}>
                    {this.props.hasClear !== false && ( start || end ) && 
                        <a onClick={this.clear} className={'cleard'}>
                            {this.props.hasClear || '清除'}
                        </a>
                    }
                    <Button onClick={this.setValue}>
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
    disableDate: PropTypes.func,//(start,end,current)
    disabled: PropTypes.bool,
    defaultText: PropTypes.string,
    format: PropTypes.string,//YYYY-MM-DD HH:mm:ss
    hasClear: PropTypes.any,
    defaultToday: PropTypes.bool,
    startConfig: PropTypes.object,
    endConfig: PropTypes.object,
    confirmText: PropTypes.string,
    onChange: PropTypes.func
}

export default logical(DateRangepicker,logic,config);