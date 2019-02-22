import React, { Component } from 'react';
import { Form,Select,Button } from '../../logic';
// import './index.styl';
import 'moment/locale/zh-cn';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';

const FormItem = Form.FormItem;
const Option = Select.Option;

class FormShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled : true
        }
    }

    saveData = () => {
        let data = this.refs['form'].validate();
        console.log(data);
    }

    disabledDate(current){
        return current > moment();
    }

    render(){
        return <div className={"Show"}>
            <Form ref={'form'}>
                <FormItem label={'测试'} rules={[{require:true}]} name={'number'}>
                    <Select initValue={['1']} mode={'multi'} defaultText={'请选择任务'} noDataText={'没有任务'}>
                        <Option value={'1'}>test1</Option>
                        <Option value={'2'}>test2</Option>
                        <Option value={'3'}>test3</Option>
                    </Select>
                </FormItem>
                <FormItem label={'时间'} rules={[{require:true}]} name={'time'}>
                    <DatePicker
                        disabledDate={this.disabledDate}
                        format={"YYYY-MM-DD HH:mm:00"}
                        allowClear={true}
                        showTime={{ defaultValue: moment('00:00', 'HH:mm') ,format: 'HH:mm'}}
                    />
                </FormItem>
                <FormItem noLabel={true}>
                    <Button onClick={this.saveData}>确定</Button>
                </FormItem>
            </Form>
        </div>
    }
}


export default FormShow;