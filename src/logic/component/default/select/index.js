import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

class Select extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            i18n : {}
        }

    }

    render(){
        return <div>
            <button>
                {this.props.children || lang['text']}
            </button>
        </div>;
    }
}

Select.propTypes = {
    styleType : PropTypes.string
}


export default basic(Select,logic,config);