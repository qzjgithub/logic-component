import React, { Component } from 'react';
import { Grid } from '../../logic';

const COLUMNS = [
    {
        name: "名字",
        key: "name",
        editable: true,
        validate: (value,record,key,index) => {
            return !!value;
        },
        width: '100px',
    },
    {
        name: "性别",
        key: "sex",
        width: "400px",
        render: (value,record,key,index) => {
            return value === 0 ? '女':'男';
        }
    },
    {
        name: "年龄",
        key: "age",
        width: '100px',
        sorter: (a,b) => {
            return a.age > b.age;
        }
    }
]

const DATA = [
    { name: "aaa",sex: 0,age:54 },
    { name: "bbb",sex: 1,age:12 },
    { name: "ccc",sex: 1,age:43 },
    { name: "ccc",sex: 1,age:43 },
    { name: "ccc",sex: 1,age:43 },
    { name: "ccc",sex: 1,age:43 },
    { name: "ccc",sex: 1,age:43 },
    { name: "ccc",sex: 1,age:43 },
    { name: "ccc",sex: 1,age:43 },
    { name: "ccc",sex: 1,age:43 },
    { name: "ccc",sex: 1,age:43 },
    { name: "ccc",sex: 1,age:43 },
    { name: "ccc",sex: 1,age:43 },
]

class TimerShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        /* setTimeout(()=> {
            this.setState({
                data: DATA
            });
        }, 3000); */
    }

    onEditor = (editor,data) => {
        console.log(editor,data);
    }

    render(){
        return <div className={'Show'}>
            <Grid columns={COLUMNS}
                    ref="grid"
                  sort={'sex'}
                  order={'desc'}
                  selectMode={'multi'}
                  serial={true}
                  onEditor={this.onEditor}
                  data={DATA}/>
            </div>
    }
}


export default TimerShow;