import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

import Icon from '../icon';

class Dialog extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
        }

    }

    show = () => {
        let status = this.state.status;
        status['closed'] = false;
        this.setState({
            status: status
        });
    }

    render(){
        return <section>
            <article>
                <header className={'title'}>
                    <span>{this.props.title}</span>
                    <span className={"cross-close"} sign="close"><Icon type={'guanbi1'}/></span>
                </header>
                <div className={'content'}> { this.props.children } </div>
            </article>
        </section>;
    }
}

Dialog.propTypes = {
    title: PropTypes.string
}


export default basic(Dialog,logic,config);