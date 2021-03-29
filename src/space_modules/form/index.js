import React, { Component } from 'react';
import { Form,Select, Button , Input,Datepicker,DateRangepicker} from '../../logic';
import moment from 'moment';

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

    clear = () => {
        this.refs['form'].clear();
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
                <FormItem label={'测试1'} rules={[{require:true}]} name={'number1'}>
                    <Input />
                </FormItem>
                <FormItem label={'测试2'} rules={[{require:true}]} name={'number2'}>
                    <Datepicker/>
                </FormItem>
                <FormItem label={'测试3'} rules={[{require:true}]} name={'number3'}>
                    <DateRangepicker/>
                </FormItem>
                <FormItem noLabel={true}>
                    <Button onClick={this.saveData} key='confirm'>确定</Button>
                    <Button onClick={this.clear} key='cancel'>清空</Button>
                </FormItem>
            </Form>
        </div>
    }
}


export default FormShow;