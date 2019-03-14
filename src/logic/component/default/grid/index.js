import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Input from '../input';
import Icon from '../icon';
import Pagination from '../pagination';
import Select from '../select';
import './index.styl';
import { isKVObject,isArray,isNumber } from '../../../common/Util';

const Option = Select.Option;
const PageElement = Pagination.PageElement;

class Grid extends Component{
    columnsMap;
    constructor(props, context) {
        super(props, context);
        this.initColumnsMap(props.columns);
        this.state = this.initParam(props);
    }

    componentWillReceiveProps(nextProps){
        let { pageMode, pagination, columns } = nextProps;
        this.initColumnsMap(columns);
        if(pageMode === 'back'){
            pagination = Object.assign({},this. state.pagination,pagination);
        }else{
            pagination = Object.assign({},this.state.pagination);
        }
        this.setState(this.initParam(Object.assign({},nextProps,{ pagination })));
    }

    initColumnsMap = (columns) => {
        this.columnsMap = {};
        if(!isArray(columns)){
            columns = [];
        }
        columns.forEach((column,index) => {
            this.columnsMap[column['key']] = index;
        });
    }

    initParam = (props) => {
        let { pagination, data, pageMode, pageSizeOptions } = props;
        if(!isArray(data)){
            data = [];
        }
        if(!isArray(pageSizeOptions)){
            pageSizeOptions = [10,20,30];
        }
        pageSizeOptions = pageSizeOptions.filter((v) => isNumber(v) && v !== 0);
        if(!isKVObject(pagination)){
            pagination = {}
        }
        let { pageSize } = pagination;
        if(!pageSize || pageSizeOptions.indexOf(pageSize) < 0){
            pageSize = pageSizeOptions[0];
        }
        if(!isNumber(pageSize)){
            pageSize = Number(pageSize) || 20;
        }
        pagination.pageSize = pageSize;
        if(!pageMode || pageMode === 'auto'){
            pagination.total = data.length;
        }
        if(!isNumber(pagination.total)){
            pagination.total = Number(pagination.total) || 0 ;
        }
        pagination.pages = Math.ceil(pagination.total/pagination.pageSize);
        if(!pagination.curPage){
            pagination.curPage = pagination.total ? 1 : 0;
        }
        return {
            pagination, pageSizeOptions, pageInput: pagination.curPage
        }
    }

    getDisplayData = () => {
        let { data , pageMode } = this.props;
        data = JSON.parse(JSON.parse(data));
        if(!data || !data.length){
            return data;
        }
        let { curPage, pageSize, total } = this.state.pagination;
        data = this.sortData(data);
        switch(pageMode){
            case 'back':
                return data;
            case 'auto':
            default:
                let start = ((curPage||1) - 1) * pageSize;
                let end = curPage * pageSize;
                if(end > total){
                    end = total;
                }
                let newData = [];
                for(;start < end;start++){
                    newData.push(data[start]);
                }
                return newData;
        }
    }

    sortData = (data) => {
        let { sort , order } = this.props;
        let sorter = this.columnsMap[sort]['sorter'];
        if(sorter){
            data.sort(sorter);
        }else{
            data.sort();
        }
        if(order === 'desc'){
            data.reverse();
        }
        return data;
    }

    pageChange = (param) => {
        this.setState({
            pagination: param,
            pageInput: param.curPage
        });
    }

    getPageText1 = (param) => {
        let { pages } = param;
        let { pageText1 } = this.props;
        if(pageText1){
            pageText1 = pageText1.replace('${pages}',pages);
        }else{
            pageText1 = `共${pages}页`;
        }
        return <span>{ pageText1 }</span>
    }

    getPageText2 = (param) => {
        let { curPage, pageSize, total, pages } = param;
        let start = (curPage||1 - 1) * pageSize;
        let end = curPage * pageSize;
        if(end > pages){
            end = pages;
        }
        let { pageText2 } = this.props;
        if(pageText2){
            pageText2 = pageText2.replace('${start}',start)
                .replace('${end}',end)
                .replace('${total}',total);
        }else{
            pageText2 = `${start} - ${end} 共${total}条`
        }
        return <p>{ pageText2 }</p>
    }

    pageInputChange = (e) => {
        this.setState({
            pageInput: e.target.value
        });
    }

    getPageSizeOptionsDom = () => {
        return this.state.pageSizeOptions.map((pageSize) => {
            return <Option value={pageSize} key={pageSize}>{pageSize}</Option>
        });
    }


    render(){
        return <section className={'Grid'}>
            <article className={'scroll-x'}>
                <header>
                    <div>
                        <span>时间</span>
                        <Icon type={'triangleupfill'}/>
                        <Icon type={'triangledownfill'}/>
                    </div>
                </header>
                <div className={'scroll-y'}>
                    <ul className={'body'}>
                        <li className={'tr'}>
                            <div className={'td'}>2019-01-01</div>
                        </li>
                    </ul>
                </div>
            </article>
            <footer>
                <Pagination {...this.state.pagination} onChange={this.pageChange}>
                    <p> </p>
                    <PageElement type={'first'} event={'onClick'}><Icon type={'zuo'}/></PageElement>
                    <PageElement type={'prev'} event={'onClick'}><Icon type={'zuo'}/></PageElement>
                    <PageElement type={'page'} event={'onKeyUp'} param={(e) => e.target.value}>
                        <input onKeyUp={(e) => e.code === 13} onInput={this.pageInputChange} value={this.state.pageInput}/>
                    </PageElement>
                    <PageElement type={'text'} text={this.getPageText1}/>
                    <PageElement type={'next'} event={'onClick'}><Icon type={'gengduo'}/></PageElement>
                    <PageElement type={'last'} event={'onClick'}><Icon type={'gengduo'}/></PageElement>
                    <PageElement type={'pageSize'} event={'onSelected'} param={(value) => value}>
                        <Select value={this.state.pagination.pageSize}>
                            { this.getPageSizeOptionsDom() }
                        </Select>
                    </PageElement>
                    <PageElement type={'text'} text={this.getPageText2}/>
                </Pagination>
            </footer>
        </section>
    }
}

Grid.propTypes = {
    data: PropTypes.array,
    pagination: PropTypes.object,
    columns: PropTypes.array,//[{name:'',key:'',render:func(value,key,data),sorter:func(a,b),}]
    selectMode: PropTypes.string,
    onChange: PropTypes.func,
    pageMode: PropTypes.string,//'auto','back'
    sort: PropTypes.string,
    order: PropTypes.string,//asc,desc
    pageSizeOptions: PropTypes.array,
    pageText1:PropTypes.string,
    pageText2:PropTypes.string
}

export default Grid;