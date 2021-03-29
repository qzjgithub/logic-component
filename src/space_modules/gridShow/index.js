import React, { Component } from 'react';
import { Grid, Button } from '../../logic';

const COLUMNS = [
    {
        name: "名字",
        key: "name",
        fixed: true,
        searcher: true,
        width: '100px',
        sorter: true,
        editable: true,
        colspan: (value, record) => {
            if(value === 'bbb'){
                return 2;
            }else{
                return 1;
            }
        }
    },
    {
        name: "性别",
        key: "sex",
        width: "400px",
        hidden: false,
        editable: 'select',
        searcher: (v, d, k) => {
            return (v === '男' && d[k] === 1) || (v === '女' && d[k] === 0);
        },
        render: (value,record,key,index) => {
            return value === 0 ? '女':'男';
        }
    },
    {
        name: "年龄",
        key: "age",
        width: '100px',
        searcher: false,
        editable: true,
        validate: (value,record,key,index) => {
            return !!value;
        },
        /* sorter: (a,b) => {
            if(a.age > b.age){
                return 1;
            }else if(a.age < b.age){
                return -1;
            }else{
                return 0;
            }
        } */
    },
    {
        name: "生日",
        key: "birthday",
        width: "100px",
    },
    {
        name: "成绩",
        key: "grade",
        width: '200px',
        children: [
            {
                name: "语文",
                key: "lang",
                width: "100px"
            },
            {
                name: "数学",
                key: "math",
                width: "100px"
            }
        ],
    },
    {
        name: "家人",
        key: "family",
        children: [
            {
                name: "母亲",
                key: "mathor",
                width: "100px"
            },
            {
                name: "父亲",
                key: "fathor",
                width: "100px"
            }
        ],
    }
]

const DATA = [
    { name: "aaa",sex: 0,age:36 ,id : 1, parentId: '',lang: 80, math: 80,mathor:'mathor1',fathor:'fathor1',birthday: '2019-09-08'},
    { name: "bbb",sex: 1,age:12 ,id : 2, parentId: 1,lang: 80, math: 80,birthday: '2019-09-07'},
    { name: "ccc",sex: 1,age:43 ,id : 3, parentId: 2,lang: 80, math: 80,birthday: '2019-09-08'},
    { name: "ccc",sex: 1,age:43 ,id : 4, parentId: 2,lang: 80, math: 80,birthday: '2019-05-01'},
    { name: "ccc",sex: 1,age:33 ,id : 5, parentId: 3,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:2 ,id : 6, parentId: 3,lang: 80, math: 80,birthday: '2019-09-08 12:00:30'},
    { name: "ccc",sex: 1,age:43 ,id : 7, parentId: 3,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:5 ,id : 8, parentId: 2,lang: 80, math: 80,birthday: '2019-09-08'},
    { name: "ccc",sex: 1,age:43 ,id : 9, parentId: '',lang: 80, math: 80,birthday: '2019-09-08 23:31:23'},
    { name: "ccc",sex: 1,age:56 ,id : 10, parentId: 9,lang: 80, math: 80,birthday: '2019-09-30'},
    { name: "ccc",sex: 1,age:23 ,id : 11, parentId: 9,lang: 80, math: 80,birthday: '2019-09-18'},
    { name: "ccc",sex: 1,age:32 ,id : 12, parentId: 11,lang: 80, math: 80,birthday: '2019-08-01'},
    { name: "ccc",sex: 1,age:54 ,id : 13, parentId: 11,lang: 80, math: 80,birthday: '2019-08-02'},
    { name: "aaa",sex: 0,age:36 ,id : 1, parentId: '',lang: 80, math: 80},
    { name: "bbb",sex: 1,age:12 ,id : 2, parentId: 1,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:43 ,id : 3, parentId: 2,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:43 ,id : 4, parentId: 2,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:33 ,id : 5, parentId: 3,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:2 ,id : 6, parentId: 3,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:43 ,id : 7, parentId: 3,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:5 ,id : 8, parentId: 2,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:43 ,id : 9, parentId: '',lang: 80, math: 80},
    { name: "ccc",sex: 1,age:56 ,id : 10, parentId: 9,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:23 ,id : 11, parentId: 9,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:32 ,id : 12, parentId: 11,lang: 80, math: 80},
    { name: "ccc",sex: 1,age:54 ,id : 13, parentId: 11,lang: 80, math: 80},
]

class GridShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            curPage: 1,
            pageSize: 10
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
        this.setState({
            pageSize: pagination.pageSize,
            curPage: pagination.curPage
        });
    }

    clearEditor = () => {
        let grid = this.refs['grid'];
        grid.clearEditor();
    }

    clearSearch = () => {
        let grid = this.refs['grid'];
        grid.clearSearch();
    }

    render(){
        return <div className={'Show'}>
            <Button onClick={this.clearEditor}>清空修改</Button>
            <Button onClick={this.clearSearch}>清空搜索</Button>
            <Grid columns={COLUMNS}
                    ref="grid"
                    topable={(record) => { return record.age > 40 }}
                    // validateTop={(record) => { return record.age === 12 }}
                    onTopped={(toppedData)=>{ console.log(toppedData) }}
                    pageMode={'auto'}
                    pagination={{
                        curPage: this.state.curPage,
                        pageSize: this.state.pageSize
                    }}
                //   sort={'sex'}
                //   order={'desc'}
                  selectMode={'multi'}
                  selectable={(record) => { return record['name']!=='bbb'}}
                  serial={false}
                  onEditor={this.onEditor}
                  onRewidth={this.onRewidth}
                  customSort={false}
                  onChange={this.onChange}
                  data={DATA}
                  headerStrategy='strech'
                  editableSelection={{sex: [{value: 0, text: '女'},{value: 1, text: '男'}]}}
                />
            </div>
    }
}


export default GridShow;