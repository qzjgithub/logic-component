import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';
import Icon from '../icon';

class Loading extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return <div className={'Loading'} style={this.props.style || { height: '18px',width: '18px'}}>
            <p>{this.props.children || <Icon type={'sync'}/>}</p>
        </div>
    }
}

Loading.propTypes = {
    style : PropTypes.string
}


export default Loading