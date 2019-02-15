import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';

class Icon extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return <svg {...this.props} className={'iconfont'}>
            <use xlinkHref={`#icon-${this.props.type}`}> </use>
        </svg>
    }
}

Icon.propTypes = {
    type: PropTypes.string
}

export default Icon;