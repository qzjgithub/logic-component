import React, { Component } from 'react';
import PropTypes from 'prop-types';
import basic from '../basic/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

import Util from '../../../common/Util';
import Button from '../button';

class Select extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            i18n: {}
        }
    }

    componentDidMount = () => {
        this.initParam();
    }

    initParam = () => {
        let param = this.props['param']||{};
        let { value, index, data } = param;
        let selectedIndex = 0,item;
        if(value){
            for(let i=0;i < data.length;i++){
                item = data[i];
                if(item['value'] == value){
                    selectedIndex = i;
                    break;
                }
            }
        }else if(typeof index == 'number' && index >=0 && index < data.length){
            selectedIndex = index;
        }
        item = data[selectedIndex];
        this.setState({
            value: item[this.state['valueKey']],
            text: item[this.state['textKey']],
            index: selectedIndex
        });
    }

    itemClick = (item)=>{
        this.setState({
            value: item[this.state['valueKey']],
            text: item[this.state['textKey']]
        });
    }

    render(){
        let displayKey = 'text', value = this.state['value'];
        if(!Util.isStringWithoutNull(value)){
            displayKey = 'defaultText';
        }
        let data = this.state['data'];
        if(!data || !data.length){
            displayKey = 'noDataText';
        }
        let lang = this.state['i18n'];
        let textKey = this.state['textKey'];
        return <div>
            <Button styleType={'left'} className={'text'} sign={'text'}>
                { this.state[displayKey] || lang[displayKey] }
                <svg className={'iconfont'}>
                    <use xlinkHref="#icon-triangledownfill"></use>
                </svg>
            </Button>
            {data && data.length ? <ul className={'list'} sign={'list'}>
                { data.map((item, ind)=>{
                    return <li key={ind} sign={'item'}
                               onClick={() => {this.itemClick(item) }}>
                        { item[textKey] }
                        </li>
                }) }
            </ul> : ''}
        </div>;
    }
}

Select.propTypes = {
    styleType : PropTypes.string
}

export default basic(Select,logic,config);