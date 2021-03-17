import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';

class Form extends Component{
    names = [];
    constructor(props, context) {
        super(props, context);
    }

    clear = () => {
        this.names.forEach((name) => {
            let ele = this.refs[name];
            if(ele && ele.clear){
                ele.clear();
            }
         });
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
        return <section className={`Form ${this.props.className||''}`}>
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
            this.clear();
        }
    }

    clear = () => {
        let dom = this.refs[this.key];
        if(dom && dom.clear){
            dom.clear();
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
        let formType = '';
        if(ele.getFormType){
            formType = this.refs[this.key].getFormType();
        }
        let rules = this.props.rules || [];

        let hasRequire = false;
        let isNull = false;

        switch(formType){
            case 'multiSelect':
            case 'multiTreeSelect':
                isNull = !value || !(value instanceof Array)|| !value.length;
                break;
            case 'datepicker':
                isNull = !value.value;
                break;
            case 'dateRangepicker':
                isNull = !value.startDate &&　!value.endDate;
                break;
            case 'timer':
                isNull = !value.hour && !value.minute && !value.second;
                break;
            case 'input':
            case 'select':
            case 'treeSelect':
            default: 
                isNull = !value;
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
            if(rule.reg){
                result = rule.reg.test(value);
            }else if(rule.validate){
                result = rule.validate(value);
            }
            if(!result){
                err = rule.message || 'error';
                break;
            }
        }
        if(result && !isNull && value.valid !== undefined){
            result = value.valid && result;
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
        const {className = ''} = this.props;
        return <div className={`FormItem ${this.props.noLabel ? 'noLabel':''} ${className}`}>
            <label>{ this.props.label||'' }</label>
            { this.getChildren() }
        </div>
    }
}

FormItem.propTypes = {
    label: PropTypes.any,//标签
    name: PropTypes.string,//表单属性key,
    rules: PropTypes.array,//[{ require: true, message: ''},{reg:/\d+/,message:''},{validate:function(value){},message: ''}]
    noLabel: PropTypes.bool,//是否不展示标签
    formSign: PropTypes.bool,
    className: PropTypes.string
}

Form.FormItem = FormItem;

export default Form;