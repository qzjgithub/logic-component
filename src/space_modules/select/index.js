import React, { Component } from 'react';
import { Select } from '../../logic';
import './index.styl';

const Option = Select.Option;

class SelectShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled : true
        }
    }

    onClick = () => {
        this.setState({
            disabled : !this.state.disabled
        });
    }

    getText = (values, texts) => {
        console.log(values,texts);
        return texts.join(',');
    }

    render(){
        return <div className={"Show"}>
            <Select defaultText={'请选择数据'} noDataText={'没有数据'}>
                <Option value={'1'}>apple</Option>
                <Option value={'2'}>orange</Option>
                <Option value={'3'}>potato</Option>
            </Select>

            <Select defaultText={'请选择数据'} noDataText={'没有数据'} mode={'multi'} hasAll={'Select all'}>
                <Option value={'1'}>apple</Option>
                <Option value={'2'}>orange</Option>
                <Option value={'3'}>banana</Option>
                <Option value={'4'}>tomato</Option>
            </Select>
        </div>
    }
}


export default SelectShow;