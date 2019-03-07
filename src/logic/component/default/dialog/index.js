import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logical from '../../../common/logical';
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

    componentWillReceiveProps(nextProps){
        if(nextProps.show !== this.props.show){
            let status = this.state.status;
            status['closed'] = !nextProps.show;
            this.setState({
                status: status
            });
        }
    }

    componentDidMount(){
        if(this.props.show){
            this.show();
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
        return <section id={this.props.id || `dialog_${new Date().getTime()}`} className={this.props.className||''}>
            <div>
                <article style={{ height: this.props.height||'',width: this.props.width||''}}>
                    <header className={'title'}>
                        <span>{this.props.title}</span>
                        <span className={"cross-close"} sign="close"><Icon type={'guanbi1'}/></span>
                    </header>
                    <div className={'content'}> { this.props.children } </div>
                </article>
            </div>
        </section>;
    }
}

Dialog.propTypes = {
    title: PropTypes.string,
    height: PropTypes.any,
    width: PropTypes.any,
    id: PropTypes.string,
    className: PropTypes.string,
    show: PropTypes.bool
}


export default logical(Dialog,logic,config);