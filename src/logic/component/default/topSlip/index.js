import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logical from '../../../common/logical';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

class TopSlip extends Component{
    constructor(props, context) {
        super(props, context);
        this.timer = null;
        this.message = '';
        let param = props['param']||{};
        if(param['message']){
            if(!param['queue']){
                param['queue'] = [];
            }
            param['queue'].push(param['message']);
        }
        this.state = {
        }
    }

    playMessage = () => {
        let queue = this.state.queue ||[];
        let opened = false;
        if(!this.state.status.hold){
            if(queue.length){
                opened = true;
                this.message = queue.shift();
            }
            this.setState({
                queue: queue,
                opened: opened
            });
        }
    }

    componentDidMount(){
        this.timer = setTimeout(() => {
            this.playMessage();
        },200);
    }

    componentWillReceiveProps(newProps, oldProps){
        let param = newProps['param']||{};
        if(param['message']){
            let queue = this.state.queue||[];
            queue.push(param['message']);
            this.setState({
                queue: queue
            });
            this.playMessage();
        }
    }

    componentWillUpdate(props,newState){
        let queue = newState.queue || [];
        if(this.timer){
            clearTimeout(this.timer);
        }
        let play = false;
        switch(true){
            case !newState.status.hold && !!queue.length:
                play = true;
                break;
            case newState.status.hold:
                play = false;
                break;
            case !!newState.opened:
                play = true;
                break;
            default:
        }
        if(play){
            this.timer = setTimeout(() => {
                this.playMessage();
            },this.state.time||1000);
        }
    }


    render(){
        let status = this.state.status || {};
        let show = !!status['hold'] || this.state.opened;
        return <div className={ show ? 'opened' : '' }>
            <span sign={"text"}>{this.message}</span>
        </div>;
    }
}

TopSlip.propTypes = {
    styleType : PropTypes.string
}

export default logical(TopSlip,logic,config);