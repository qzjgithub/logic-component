import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

class Container extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
        }

    }

    render(){
        return <section>
            { this.props.children || '' }
            </section>;
    }
}

Container.propTypes = {
    styleType : PropTypes.string
}


export default basic(Container,logic,config);