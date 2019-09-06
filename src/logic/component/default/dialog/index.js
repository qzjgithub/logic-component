import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logical from '../../../common/logical';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

import Icon from '../icon';

class Dialog extends Component{
    startPosition = {};
    constructor(props, context) {
        super(props, context);
        this.state = {
            top: 0,
            left: 0
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

    dragStart = (e) => {
        this.startPosition = {x: e.pageX, y: e.pageY };
    }

    dragEnd = (e) => {
        let { top, left } = this.state;
        let { x, y } = this.startPosition;
        top += e.pageY - y;
        left += e.pageX - x;
        this.setState({
            top,
            left
        });
    }

    render(){
        let { className, penetrate, draggable } = this.props;
        let { top, left } = this.state;
        let cls = [];
        className && cls.push(className);
        penetrate && cls.push('penetrate');
        draggable && cls.push('draggable');
        return <section id={this.props.id || `dialog_${new Date().getTime()}`} className={cls.join(' ')}>
            <div>
                <article style={{ height: this.props.height||'',width: this.props.width||'', top: top, left: left}}
                    draggable={!!draggable}
                    onDragStart={this.dragStart}
                    onDragEnd={this.dragEnd}
                >
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
    show: PropTypes.bool,
    onChanged: PropTypes.func,
    mode: PropTypes.string,//'confirm',//暂未实现
    onConfirm: PropTypes.func,//'confirm'模式下存在
    confirmText: PropTypes.string,
    penetrate: PropTypes.bool,//是否允许弹框下的元素事件响应
    draggable: PropTypes.bool,//弹框是否可拖拽
}


export default logical(Dialog,logic,config);