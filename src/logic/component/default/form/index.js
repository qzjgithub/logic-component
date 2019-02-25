import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';

class Form extends Component{
    names = [];
    constructor(props, context) {
        super(props, context);
    }

    validate = () => {
        let result = true;
        let err = {};
        let values = {};
        this.names.forEach((name) => {
           let ele = this.refs[name];
           if(!ele || !ele.validate){
               result = false;
               err[name] = 'has no element or validate.';
               values[name] = null;
               return;
           }
           let data = ele.validate();
           result = result && data.result;
           err[name] = data.err;
           values[name] = data.value;
        });
        return { err : result ? null: err, values }
    }

    getChildren = () => {
        let c = this.props.children;
        this.names = [];
        let name;
        if(c && typeof c === 'object'){
            if(!c.length && c.length !== 0 && c.type && c.props.name){
                name = c.props.name;
                this.names.push(name);
                return React.cloneElement(c,{ref: name});
            }else if(c.length === 1 && c[0].type && c[0].props.name){
                name = c[0].props.name;
                this.names.push(name);
                return React.cloneElement(c[0],{ref: name});
            }else if(c.length){
                return c.map((item) => {
                    if(item && item.type && item.props.name){
                        name = item.props.name;
                        this.names.push(name);
                        return React.cloneElement(item,{ref: name});
                    } else{
                        return item;
                    }
                });
            }else{
                return c;
            }
        }else{
            return c;
        }
    }

    render(){
        return <section className={'Form'}>
            { this.getChildren() }
        </section>
    }
}

Form.propTypes = {
    type: PropTypes.string
}

class FormItem extends Component{
    key =  'element';
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.name !== this.props.name){
            let dom = this.refs[this.key];
            if(dom && dom.clear){
                dom.clear();
            }
        }
    }

    validate = () => {
        let result = true;
        let err = null;

        let ele = this.refs[this.key];
        let value;
        if(!ele || !ele.getValue){
            if(ele.picker){
                value = ele.picker.state.value;
            }else{
                return {err: 'has no getValue method.',result: false, value: null}
            }
        }else{
            value = this.refs[this.key].getValue();
        }
        let rules = this.props.rules || [];

        let hasRequire = false;
        let isNull = false;

        if(!value){
            isNull = true;
        }else if(value && value instanceof Array && !value.length){
            isNull = true;
        }
        for(let rule of rules){
            if(rule.require){
                hasRequire = true;
                if(isNull){
                    result = false;
                    err = rule.message || `${this.props.label||''}不能为空`;
                    break;
                }
                continue;
            }
            if(isNull && !hasRequire){
                continue;
            }
            result = rule.reg.test(value);
            if(!result){
                err = rule.message || 'error';
                break;
            }
        }
        return { result, err, value }
    }

    getChildren(){
        let c = this.props.children;
        if(c && typeof c === 'object'){
            if(!c.length && c.length !== 0 && c.type){
                return <div>{ React.cloneElement(c,{ref: this.key}) }</div>
            }else if(c.length === 1 && c[0].type){
                return <div>{React.cloneElement(c[0],{ref: this.key})}</div>;
            }else if(c.length){
                let hasKey = false;
                return c.map((item) => {
                   if(!hasKey && item && item.type && item.props.formSign){
                       return <div>{React.cloneElement(item,{ref: this.key})}</div>;
                   } else{
                       return item;
                   }
                });
            }else{
                return c;
            }
        }else{
            return c;
        }
    }

    render(){
        return <div className={`FormItem ${this.props.noLabel ? 'noLabel':''}`}>
            <label>{ this.props.label||'' }</label>
            { this.getChildren() }
        </div>
    }
}

FormItem.propTypes = {
    label: PropTypes.any,
    name: PropTypes.string,
    rules: PropTypes.array,
    noLabel: PropTypes.bool
}

Form.FormItem = FormItem;

export default Form;