import React, { Component } from 'react';
import { Form,Select } from '../../logic';
// import './index.styl';

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

    render(){
        return <div className={"Show"}>
            <Form ref={'form'}>
                <FormItem label={'测试'} rules={[{require:true}]} name={'number'}>
                    <Select initValue={['1']} mode={'multi'}>
                        <Option value={'1'}>test1</Option>
                        <Option value={'2'}>test2</Option>
                        <Option value={'3'}>test3</Option>
                    </Select>
                </FormItem>
                <button onClick={this.saveData}>确定</button>
            </Form>
        </div>
    }
}


export default FormShow;