import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import Input from '../input';
import Icon from '../icon';
import Pagination from '../pagination';
import Select from '../select';
import './index.styl';
import { isKVObject,isArray,isNumber,isRealOrZero } from '../../../common/Util';

const Option = Select.Option;
const PageElement = Pagination.PageElement;

class Grid extends Component{
    columnsMap = {};
    sortedData = [];
    displayIndex = [];
    constructor(props, context) {
        super(props, context);
        this.initColumnsMap(props.columns);
        this.state = this.initParam(props);
    }

    componentWillReceiveProps(nextProps){
        let { columns } = nextProps;
        this.initColumnsMap(columns);
        this.setState(this.initParam(Object.assign({},nextProps)));
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
        let { pagination, data, sort, order, pageMode, pageSizeOptions } = props;
        if(!isArray(data)){
            data = [];
        }
        data.forEach((d,ind)=>{
            d['Grid_index'] = ind;
        });
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
            pagination, pageSizeOptions, pageInput: pagination.curPage,
            selected: [], sort, order
        }
    }

    getDisplayData = () => {
        let { data , pageMode } = this.props;
        data = JSON.parse(JSON.stringify(data));
        if(!data || !data.length){
            return data;
        }
        let { curPage, pageSize, total } = this.state.pagination;
        data = this.sortData(data);
        this.displayIndex = [];
        switch(pageMode){
            case 'back':
                data.forEach((d) => {
                    let ind = d['Grid_index'];
                    this.displayIndex.push(ind);
                });
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
                    let d = data[start];
                    let ind = d['Grid_index'];
                    if(d){
                        this.displayIndex.push(ind);
                        newData.push(d);
                    }
                }
                return newData;
        }
    }

    sortData = (data) => {
        let { columns} = this.props;
        let { sort, order } = this.state;
        let columnInd = this.columnsMap[sort];
        let column = isRealOrZero(columnInd) ? (columns[columnInd]||{}) : {};
        let sorter = column['sorter'];
        if(sorter){
            data.sort(sorter);
        }else{
            data.sort();
        }
        if(order === 'desc'){
            data.reverse();
        }
        this.sortedData = data;
        return data;
    }

    pageChange = (param) => {
        this.setState({
            pagination: param,
            pageInput: param.curPage
        },() => {
            this.triggerChange();
        });
    }

    selectAll = () => {
        let { pageMode } = this.props;
        let { selected } = this.state;
        let displayIndex = this.displayIndex;
        switch(pageMode){
            case 'back':
                if(selected.length === displayIndex.length){
                    selected = [];
                }else{
                    selected = displayIndex;
                }
                break;
            default:
                let allSelected = true;
                let selectedDisplay = [];
                for(let ind of displayIndex){
                    let selInd = selected.indexOf(ind);
                    if(selInd < 0){
                        selected.push(ind);
                        allSelected = false;
                    }else{
                        selectedDisplay.push(ind);
                        selected.splice(selInd,1);
                    }
                }
                if(allSelected === false){
                    selected = selected.concat(selectedDisplay);
                }
        }
        this.setState({
            selected
        },() => {
            this.triggerChange();
        });
    }

    selectOne = (gInd) => {
        let { selectMode } = this.props;
        let { selected } = this.state;
        let ind = selected.indexOf(gInd);
        switch(selectMode){
            case 'multi':
                ind < 0 ? selected.push(gInd) : selected.splice(ind,1);
                break;
            default:
                selected = ind < 0 ? [ gInd ] : [];
        }
        this.setState({
            selected
        },() => {
            this.triggerChange();
        })
    }

    setSort = (key) => {
        let { sort, order} = this.state;
        if(sort!==key){
            order = 'asc';
        }else{
            order = order !== 'desc' ? 'desc' : 'asc';
        }
        this.setState({
            sort: key,
            order: order
        },() => {
            this.triggerChange();
        });
    }

    pageInputChange = (e) => {
        this.setState({
            pageInput: e.target.value
        });
    }

    bodyScroll = (e) => {
        let scrollLeft = e.target.scrollLeft;
        e.target.previousSibling.scrollLeft = scrollLeft;
    }

    triggerChange = () => {
        if(this.props.onChange){
            let data = this.props;
            let pageInfo = JSON.parse(JSON.stringify(this.state.pagination));
            let sld = this.state.selected.map((ind) => {
                return data[ind];
            });
            sld = JSON.parse(JSON.stringify(sld));
            this.props.onChange(pageInfo,sld);
        }
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
        if(!this.props.data || !this.props.data.length){
            return <p>无数据</p>;
        }
        let { curPage, pageSize, total } = param;
        let start = ((curPage||1) - 1) * pageSize + 1;
        let end = curPage * pageSize;
        if(end > total){
            end = total;
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

    getPageSizeOptionsDom = () => {
        return this.state.pageSizeOptions.map((pageSize) => {
            return <Option value={pageSize} key={pageSize}>{pageSize}</Option>
        });
    }

    getHeaderDom = () => {
        let { columns, selectMode } = this.props;
        let { sort, order } = this.state;
        if(isArray(columns)){
            let dom = columns.map((column) => {
                let { name, key, hidden ,width} = column;
                if(hidden) return '';
                let style = {};
                if(width){
                    style = {
                        width,
                        flex: 'none'
                    }
                }
                return <div className={'th'} style={ style } onClick={() => this.setSort(key)}>
                    <span>{name}</span>
                    {this.getSortIcon(key,sort,order)}
                    <i> </i>
                </div>
            });
            if(selectMode === 'multi'){
                let selectAll = !!this.displayIndex.length;
                for(let ind of this.displayIndex){
                    if(this.state.selected.indexOf(ind) < 0){
                        selectAll = false;
                        break;
                    }
                }
                let type = selectAll ?'fangxingxuanzhong':'fangxingweixuanzhong';
                dom.unshift(<div className={'th select'}>
                    <Icon type={type} onClick={this.selectAll}/>
                </div>)
            }
            return dom;
        }else{
            return '';
        }
    }

    getSortIcon = (key,sort,order) => {
        if(key === sort){
            let dom = [];
            dom.push(<Icon type={'triangleupfill'} className={`sort ${order!=='desc'?'active':''}`}/>);
            dom.push(<Icon type={'triangledownfill'} className={`sort desc ${order==='desc'?'active':''}`}/>);
            return dom;
        }else{
            return '';
        }
    }

    getBodyDom = (data) => {
        let { columns } = this.props;
        if(isArray(columns)){
            return data.map((d) => {
                let gInd = d['Grid_index'];
                let cls = this.state.selected.indexOf(gInd) > -1? 'selected': '';
                return <li className={`tr ${cls}`} key={gInd} onClick={() => this.selectOne(gInd)}>
                    {
                        this.getTrDom(d,gInd)
                    }
                </li>
            });
        }else{
            return '';
        }
    }

    getTrDom = (d,gInd) => {
        let { columns, selectMode } = this.props;
        let dom = columns.map((column) => {
            let { hidden, width, render, key } = column;
            if(hidden){
                return '';
            }
            let style = {};
            if(width){
                style = {
                    width,
                    flex: 'none'
                }
            }
            let value = d[key];
            return <div className={'td'} style={style}>
                { render ? render(value,d,key,gInd) : (isRealOrZero(value) ? value : '')}
            </div>
        });
        if(selectMode === 'multi'){
            let type = 'fangxingweixuanzhong';
            if(this.state.selected.indexOf(gInd) > -1){
                type = 'fangxingxuanzhong';
            }
            dom.unshift(<li className={'td select'}>
                <Icon type={type}/>
            </li>);
        }
        return dom;
    }

    render(){
        let data = this.getDisplayData();
        let { curPage, pages } = this.state.pagination;
        let prevDisabled = curPage <= 1 ? 'disabled':'';
        let nextDisabled = curPage >= pages ? 'disabled':'';
        return <section className={'Grid'}>
            <header className={'Grid-header'}>
                { this.getHeaderDom() }
            </header>
            <div className={'scroll-body'} onScroll={this.bodyScroll}>
                <ul className={'Grid-body'}>
                    { this.getBodyDom(data) }
                </ul>
            </div>
            <footer className={'Grid-footer'}>
                <Pagination {...this.state.pagination} onChange={this.pageChange}>
                    <PageElement type={'first'} event={'onClick'}>
                        <Icon type={'zuo'} className={prevDisabled}/>
                    </PageElement>
                    <PageElement type={'prev'} event={'onClick'}>
                        <Icon type={'zuo'} className={prevDisabled}/>
                    </PageElement>
                    <PageElement type={'page'} event={'onKeyUp'} param={(e) => e.target.value}>
                        <input onKeyUp={(e) => e.code === 13} onInput={this.pageInputChange} value={this.state.pageInput}/>
                    </PageElement>
                    <PageElement type={'text'} text={this.getPageText1}/>
                    <PageElement type={'next'} event={'onClick'}>
                        <Icon type={'gengduo'} className={nextDisabled}/>
                    </PageElement>
                    <PageElement type={'last'} event={'onClick'}>
                        <Icon type={'gengduo'} className={nextDisabled}/>
                    </PageElement>
                    <PageElement type={'pageSize'} event={'onSelected'} param={(value) => value}>
                        <Select value={this.state.pagination.pageSize} orient={'up'}>
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
    columns: PropTypes.array,//[{name:'',key:'',render:func(value,record,key,index),sorter:func(a,b),width: '',hidden:false}]
    selectMode: PropTypes.string,//'multi'
    onChange: PropTypes.func,
    pageMode: PropTypes.string,//'auto','back'
    sort: PropTypes.string,
    order: PropTypes.string,//asc,desc
    pageSizeOptions: PropTypes.array,
    pageText1:PropTypes.string,
    pageText2:PropTypes.string
}

export default Grid;