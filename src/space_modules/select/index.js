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
        return <div className={"Show"} key='div'>
            <Select defaultText={'请选择数据'} noDataText={'没有数据'} key={0}>
                <Option value={'1'}>apple</Option>
                <Option value={'2'}>orange</Option>
                <Option value={'3'}>potato</Option>
            </Select>

            <Select
                defaultText={'请选择数据'}
                noDataText={'没有数据'}
                mode={'multi'}
                hasAll={'Select all'}
                key={1}
                initValue={['1', '2']}
            >
                <Option value={'1'}>apple</Option>
                <Option value={'2'} disabled>orange</Option>
                <Option value={'3'} disabled>banana</Option>
                <Option value={'4'}>tomato</Option>
            </Select>
            <Select initValue={['1']} mode={'multi'} defaultText={'请选择任务'} noDataText={'没有任务'} key={3}>
                <Option value={'1'}>test1</Option>
                <Option value={'2'}>test2</Option>
                <Option value={'3'}>test3</Option>
            </Select>
        </div>
    }
}


export default SelectShow;