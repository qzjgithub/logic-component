import React, { Component } from 'react';
import { Pagination, Icon, Select } from '../../logic';

const PageElement = Pagination.PageElement;
const Option = Select.Option;

class PaginationShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            pagination: {
                total: 100,
                pageSize: 16,
                curPage: 5
            }
        }
    }

    getText = (param) => {
        return <p>总数：{param.total},当前页：{param.curPage},每页条数：{param.pageSize},总页数：{param.pages}</p>
    }

    pageChange = (param) => {
        this.setState({
            pagination: param
        });
    }

    render(){
        let { total, pageSize, curPage } = this.state.pagination;
        return <div>
            <Pagination total={total} pageSize={pageSize} curPage={curPage} onChange={this.pageChange}>
                <PageElement type={'prev'} event={'onClick'}><Icon type={'zuo'}/></PageElement>
                <PageElement type={'text'} text={this.getText}/>
                <PageElement type={'next'} event={'onClick'}><Icon type={'gengduo'}/></PageElement>
                <PageElement type={'page'} event={'onSelected'} param={(value) => value}>
                    <Select value={curPage}>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        <Option value={4}>4</Option>
                        <Option value={5}>5</Option>
                        <Option value={6}>6</Option>
                        <Option value={7}>7</Option>
                    </Select>
                </PageElement>
                {/*<PageElement type={'pageSize'}></PageElement>*/}
            </Pagination>
        </div>
    }
}


export default PaginationShow;