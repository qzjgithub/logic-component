import React, { Component } from 'react';
import { Grid } from '../../logic';

const COLUMNS = [
    {
        name: "名字",
        key: "name",
        fixed: true,
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
        searcher: true,
        editable: true,
        validate: (value,record,key,index) => {
            return !!value;
        },
        sorter: (a,b) => {
            if(a.age > b.age){
                return 1;
            }else if(a.age < b.age){
                return -1;
            }else{
                return 0;
            }
        }
    }
]

const DATA = [
    { name: "aaa",sex: 0,age:54 ,id : 1, parentId: ''},
    { name: "bbb",sex: 1,age:12 ,id : 2, parentId: 1},
    { name: "ccc",sex: 1,age:43 ,id : 3, parentId: 2},
    { name: "ccc",sex: 1,age:43 ,id : 4, parentId: 2},
    { name: "ccc",sex: 1,age:43 ,id : 5, parentId: 3},
    { name: "ccc",sex: 1,age:43 ,id : 6, parentId: 3},
    { name: "ccc",sex: 1,age:43 ,id : 7, parentId: 3},
    { name: "ccc",sex: 1,age:43 ,id : 8, parentId: 2},
    { name: "ccc",sex: 1,age:43 ,id : 9, parentId: ''},
    { name: "ccc",sex: 1,age:43 ,id : 10, parentId: 9},
    { name: "ccc",sex: 1,age:43 ,id : 11, parentId: 9},
    { name: "ccc",sex: 1,age:43 ,id : 12, parentId: 11},
    { name: "ccc",sex: 1,age:43 ,id : 13, parentId: 11},
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

    onRewidth = (widthRecord) => {
        console.log(widthRecord);
    }

    onChange = (pagination, selectData, sorter) => {
        console.log(pagination,selectData,sorter);
    }

    render(){
        return <div className={'Show'}>
            <Grid columns={COLUMNS}
                    ref="grid"
                    topable={(record) => { return record.age > 40 }}
                    // validateTop={(record) => { return record.age === 12 }}
                    onTopped={(toppedData)=>{ console.log(toppedData) }}
                    pageMode={'auto'}
                  sort={'sex'}
                  order={'desc'}
                  selectMode={'auto'}
                  serial={false}
                  onEditor={this.onEditor}
                  onRewidth={this.onRewidth}
                  customSort={false}
                  onChange={this.onChange}
                  data={DATA}/>
            </div>
    }
}


export default TimerShow;