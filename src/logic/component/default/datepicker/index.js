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

class Datepicker extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = this.initData(props);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            let value = nextProps.value;
            if(value !== undefined){
                this.setState({
                    value
                });
            }
        }
    }

    initData = (props) => {
        let { value , initValue } = props;
        let datetime = value || initValue;
        if(!moment.isMoment(datetime) && this.props.defaultToday !== false){
            datetime = moment();
        }
        return {
            value: datetime
        }
    }

    getCalendarConfig = () => {
        let config = this.props.calendarConfig || {};
        config = Object.assign({},config,{ date: this.state.value});
        let onChange = config.onChange;
        config.onChange = (value,valid) => {
            this.setState({
                value
            });
            if(onChange){
                onChange(value,valid);
            }
        }
        return config;
    }

    clear = (e) => {
        e.stopPropagation();
        this.setState({
            value: null
        });
    }

    toNow = () => {
        this.setState({
            value: moment()
        });
    }

    setValue = () => {
        let calendar = this.refs['calendar'];
        let status = this.state.status || {};
        if(calendar){
            let { value } = calendar.getValue();
            status['opened'] = false;
            this.setState({
                value,
                status
            });
        }
    }

    getValue = () => {
        let calendar = this.refs['calendar'];
        let value = this.state.value;
        let valid = moment.isMoment(value);
        if(calendar && valid){
            valid = calendar.getValid(value);
        }
        return { value, valid }
    }

    getFormType = () => {
        return 'datepicker';
    }

    clear = () => {
        this.setState({
            value: null
        });
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
        let value = this.state.value;
        let text = '';
        if(value && moment.isMoment(value)){
            text = value.format(this.props.format || 'YYYY-MM-DD HH:mm:ss');
        }else{
            text = this.props.defaultText || '请选择时间';
        }
        return <div>
            <Button sign={'text'} className={`text ${this.props.disabled ? 'disabled': ''}`}>
                <span ref={'text'}>{ text }</span>
                { this.props.hasClear !== false && value && 
                    <Icon type={'guanbi1'} onClick={this.clear} className={'date-clear'}/>
                }
                <Icon type={'unfold'} />
            </Button>
            <div sign={'list'} className={'list'} onMouseLeave={this.keepFocus}>
                <Calendar {...this.getCalendarConfig()} ref={'calendar'}/>
                <p className={'control'}>
                    {this.props.hasClear !== false &&
                        <a onClick={this.clear} className={'clear'}>
                            {this.props.hasClear || '清除'}
                        </a>
                    }
                    {this.props.hasNow !== false &&
                        <a onClick={this.toNow}>
                            {this.props.hasNow || '此刻'}
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

Datepicker.propTypes = {
    initValue: PropTypes.object,
    value : PropTypes.object,
    disabled: PropTypes.bool,
    defaultText: PropTypes.string,
    format: PropTypes.string,//YYYY-MM-DD HH:mm:ss
    hasNow: PropTypes.any,
    hasClear: PropTypes.any,
    defaultToday: PropTypes.bool,
    calendarConfig: PropTypes.object,
    confirmText: PropTypes.string
}

export default logical(Datepicker,logic,config);