import React, { Component ,Fragment} from 'react';
import PropTypes from 'prop-types';
import './index.styl';

import { isRealOrZero , isKVObject, isArray} from '../../../common/Util';

class Pagination extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = this.initParam(props);
    }

    componentWillReceiveProps(nextProps){
        this.setState(this.initParam(
            Object.assign({},this.state,nextProps || {})
        ));
    }

    initParam = (props) => {
        let { curPage, pageSize, total } = props;
        pageSize = Number(pageSize) || 20;
        total = Number(total);
        total = isRealOrZero(total) ? total : 0;
        curPage = Number(curPage) || 0;
        return this.getRightState({ curPage, pageSize, total });
    }

    setPrev = () => {
        let curPage = this.state.curPage - 1;
        this.setStateAndTrigger({ curPage });
    }

    setNext = () => {
        let curPage = this.state.curPage + 1;
        this.setStateAndTrigger({ curPage });
    }

    setCurPage = (curPage) => {
        curPage = Number(curPage) || this.state.curPage;
        this.setStateAndTrigger({ curPage });
    }

    setFirstPage = () => {
        let curPage = 1;
        this.setStateAndTrigger({ curPage });
    }

    setLastPage = () => {
        let curPage = this.state.pages;
        this.setStateAndTrigger({ curPage });
    }

    setPageSize = (pageSize) => {
        pageSize = Number(pageSize) || this.state.pageSize;
        this.setStateAndTrigger({ pageSize });
    }

    getRightState = (param) => {
        let { curPage, pageSize, total } = param;
        let pages = Math.ceil(total/pageSize);
        if(curPage < 1){
            curPage = pages ? 1 : 0;
        }else if(curPage > pages){
            curPage = pages;
        }
        return { curPage, pageSize, total, pages };
    }

    setStateAndTrigger = (param) => {
        this.setState(this.getRightState(
            Object.assign({},this.state,param)
        ),() => {
            let onChange = this.props.onChange;
            if(onChange){
                onChange(Object.assign({},this.state));
            }
        });
    }

    getElementDom = () => {
        let children = this.props.children;
        if(!children){
            return children;
        }else{
            if(!isArray(children)){
                children = [ children ];
            }
            return children.map((child) => {
                if(child && child.props){
                    let { type , text} = child.props;
                    let bridge;
                    switch(type){
                        case 'prev':
                            bridge = () => {
                                this.setPrev();
                            }
                            break;
                        case 'next':
                            bridge = () => {
                                this.setNext();
                            }
                            break;
                        case 'first':
                            bridge = () => {
                                this.setFirstPage();
                            }
                            break;
                        case 'last':
                            bridge = () => {
                                this.setLastPage();
                            }
                            break;
                        case 'page':
                            bridge = (curPage) => {
                                this.setCurPage(curPage);
                            }
                            break;
                        case 'pageSize':
                            bridge = (pageSize) => {
                                this.setPageSize(pageSize);
                            }
                            break;
                        case 'text':
                            if(text){
                                return React.cloneElement(child,{
                                    children: text(Object.assign({},this.state))
                                });
                            }
                    }
                    return React.cloneElement(child,{ bridge });
                }else{
                    return child;
                }
            });
        }
    }

    render(){
        return <div>{ this.getElementDom() }</div>
    }
}

Pagination.propTypes = {
    curPage: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func
}

class PageElement extends Component{
    constructor(props, context) {
        super(props, context);
    }

    getDom = () => {
        let { type, event, param, children, bridge} = this.props;
        if(type !== 'text' && children && children.props){
            let oldEvent;
            if(event){
                oldEvent = children.props[event];
                return React.cloneElement(children,{
                    [event]: (...args) => {
                        let triggerParam;
                        if(param){
                            triggerParam = param(...args);
                        }
                        bridge && bridge(triggerParam);
                        if(oldEvent){
                            oldEvent(...args);
                        }
                    }
                });
            }
        }
        return children;
    }

    render(){
        return <Fragment>{ this.getDom() }</Fragment>
    }
}

PageElement.propTypes = {
    type: PropTypes.string,//prev,next,first,last,page,pageSize,text
    event: PropTypes.string,
    param: PropTypes.string,
    bridge: PropTypes.func,
    text: PropTypes.func
}

Pagination.PageElement = PageElement;

export default Pagination;