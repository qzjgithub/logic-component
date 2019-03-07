import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../select';

const Option = Select.Option;

class Timer extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            hour: 0,
            minute: 0,
            second: 0
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            let { hour, minute, second } = this.state;
            this.setState({
                hour: nextProps.hour || hour,
                minute: nextProps.minute || minute,
                second: nextProps.second || second
            });
        }
    }

    getHourParam = () => {
        let hour = this.state.hour;
        if(!hour && hour !== 0){
            hour = this.props.hourDef || 0;
        }
    }

    render(){
        return <div className={'Timer'}>
            <Select>
                <Option value={0}>00</Option>
            </Select>
            <Select>
                <Option value={0}>00</Option>
            </Select>
            <Select>
                <Option value={0}>00</Option>
            </Select>
        </div>
    }
}

Timer.propTypes = {
    format: PropTypes.string,//hh:mm:ss
    hourHide: PropTypes.bool,
    minuteHide: PropTypes.bool,
    secondHide: PropTypes.bool,
    hourRange: PropTypes.object,//{ min: 0, max: 23, interval: 1, enum: [0,1,2]}
    minuteRange: PropTypes.object,
    secondRange: PropTypes.object,
    hourDef: PropTypes.number,
    minuteDef: PropTypes.number,
    secondDef: PropTypes.number,
    hour: PropTypes.number,
    minute: PropTypes.number,
    second: PropTypes.number
}

export default Timer