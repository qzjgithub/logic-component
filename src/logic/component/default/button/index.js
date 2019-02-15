import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';
import Loading from '../loading';

class Button extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            i18n : {}
        }
    }

    render(){
        let lang = this.state['i18n'] || {};
        let styleType = this.props.styleType || '';
        return <button className={ `${styleType} ${this.props.loading ? 'disabled': ''}` }>
            {this.props.loading && <Loading/>}
            {this.props.children || lang['text']}
            </button>;
    }
}

Button.propTypes = {
    styleType : PropTypes.string,
    loading: PropTypes.bool
}


export default basic(Button,logic,config);