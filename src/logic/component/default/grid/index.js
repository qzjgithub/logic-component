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
    searchedIndex = null;
    displayIndex = [];
    constructor(props, context) {
        super(props, context);
        this.initColumnsMap(props.columns);
        this.state = Object.assign({
            widthRecord: {},
            editor:{},
            search: {},
            searched: false
        },this.initParam(props));
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
        let sd = [];
        if(this.searchedIndex !== null){
            this.searchedIndex.forEach((ind)=>{
                sd.push(data[ind]);
            });
        }else{
            sd = data;
        }
        let { curPage, pageSize, total } = this.state.pagination;
        data = this.sortData(sd);
        this.displayIndex = [];
        switch(pageMode){
            case 'back':
                data.forEach((d,i) => {
                    d['Grid_show_index'] = i;
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
                    d['Grid_show_index'] = start;
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

    searchData = (data,search) => {
        let { columns } = this.props;
        let searcher = {};
        let searchedIndex = [];
        let searchKeys = Object.keys(search);
        if(!searchKeys.length){
            this.searchedIndex = null;
            return;
        }
        Object.keys(searchKeys).forEach((ck)=>{
            let colInd = this.columnsMap[ck];
            let col = isRealOrZero(colInd) ? (columns[colInd]||{}) : {};
            if(typeof col['searcher'] === 'function'){
                searcher[ck] = col['searcher'];
            }
        });
        data.forEach((d) => {
            let valid = true;
            Object.keys(search).forEach((ck)=>{
                let val = search[ck];
                if(searcher[ck]){
                    valid = searcher[ck](val,d,ck);
                }else{
                    let dv = d[ck];
                    if(dv && !(dv instanceof Object)){
                        valid = dv.toString().indexOf(val) > -1;
                    }
                }
            });
            valid && searchedIndex.push(d['Grid_index']);
        });
        this.searchedIndex = searchedIndex;
    }

    searchChange = (key, value) => {
        let { pageMode, onSearch, data } = this.props;
        let { search ,pagination } = this.state;
        search[key] = value;
        if(value === '' || value === undefined){
            delete search[key];
        }
        if(pageMode === 'back'){
            this.setState({
                search
            },() => {
                onSearch && onSearch(search);
            });
        }else{
            this.searchData(data, search);
            pagination.total = this.searchedIndex === null ? data.length : this.searchedIndex.length;
            pagination.curPage = 1;
            this.setState({
                pagination,
                search
            },() => {
                onSearch && onSearch(this.sortedData,search);
            });
        }
    }

    onSearch = (e,key) => {
        if(e.keyCode !== 13){
            return;
        }
        this.searchChange(key,e.target.value);
    }

    pageChange = (param) => {
        let editor = this.state.editor;
        if(this.props.pageMode === 'back'){
            editor = {}
        }
        this.setState({
            editor,
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

    startRewidth = (e,key) => {
        let old = e.target.offsetLeft;
        let rewidthDom = this.refs['rewidth'];
        rewidthDom.style.cssText = `;left:${old-10}px;z-index:1;opacity:1`;
        this.key = key;
        this.oldW = e.target.parentElement.clientWidth;
        this.oldL = old - 10;
        this.oldX = e.pageX;
    }

    setCursor = (e) => {
        e.dataTransfer.effectAllowed = 'move';
    }

    allCursor = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    moveRewidth = (e) => {
        if(!this.oldX && this.oldX!==0) return;
        let rewidthDom = this.refs['rewidth'];
        let nextLeft = this.oldL + e.pageX - this.oldX;
        rewidthDom.style.left = nextLeft + 'px';
    }

    endRewidth = (e) => {
        e.stopPropagation();
        let rewidthDom = this.refs['rewidth'];
        rewidthDom.style.cssText = ';z-index:-1;opacity:0;';
        let gap = e.pageX - this.oldX;
        let newW = this.oldW + gap;
        if(newW < 50){
            newW = 50;
        }
        this.oldX = null;
        this.oldL = null;
        let widthRecord = this.state.widthRecord;
        widthRecord[this.key] = newW + 'px';
        this.setState({
            widthRecord
        });
    }

    bodyScroll = (e) => {
        let scrollLeft = e.target.scrollLeft;
        e.target.previousSibling.scrollLeft = scrollLeft;
    }

    editBlur = (e,record,key,validate) => {
        let value = e.target.innerHTML;
        let index = record['Grid_index'];
        let editor = this.state.editor;
        if(!validate || (validate && validate(value,record,key,index))) {
            if(!editor[index]){
                editor[index] = {};
            }
            editor[index][key] = value;
        }else{
            if(editor[index] && editor[index][key] !== undefined){
                editor[index][key] = undefined;
            }
            e.target.innerHTML = record[key];
        }
        this.setState({
            editor
        },() => {
            if(this.props.onEditor){
                this.props.onEditor(this.editor,this.props.data);
            }
        });
    }

    clearEditor = () => {
        this.setState({
            editor : {}
        });
    }

    editClick = (e,editable) => {
        if(editable){
            e.stopPropagation();
        }
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
            return <p><span>{this.props.noDataText || '无数据'}</span></p>;
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
        return <p><span>{ pageText2 }</span></p>
    }

    getPageSizeOptionsDom = () => {
        return this.state.pageSizeOptions.map((pageSize) => {
            return <Option value={pageSize} key={pageSize}>{pageSize}</Option>
        });
    }

    getHeaderDom = () => {
        let { columns, selectMode, serial } = this.props;
        let { sort, order, widthRecord } = this.state;
        if(isArray(columns)){
            let dom = columns.map((column) => {
                let { name, key, hidden ,width} = column;
                if(hidden) return '';
                width = widthRecord[key] || width;
                let style = {};
                if(width){
                    style = {
                        width,
                        flex: 'none'
                    }
                }
                return <li className={'th'} style={ style } onClick={() => this.setSort(key)}>
                    <span>{name}</span>
                    {this.getSortIcon(key,sort,order)}
                    <a className={'rewidth'} 
                        onMouseDown={(e) => this.startRewidth(e,key)}> </a>
                </li>
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
                dom.unshift(<li className={'th select'}>
                    <Icon type={type} onClick={this.selectAll}/>
                </li>)
            }
            if(serial === true){
                dom.unshift(<li className={'th serial'}> </li>);
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

    getSearchDom = () => {
        let { columns, selectMode, serial } = this.props;
        let { widthRecord } = this.state;
        if(isArray(columns)){
            let hasSearch = false;
            let dom = columns.map((column) => {
                let { key, hidden ,width,searcher} = column;
                if(hidden) return '';
                width = widthRecord[key] || width;
                let style = {};
                if(width){
                    style = {
                        width,
                        flex: 'none'
                    }
                }
                hasSearch = hasSearch || !!searcher;
                return <li className={'th gsearch'} style={ style }>
                    {searcher && <Input onKeyUp={(e) => this.onSearch(e,key)}/>}
                </li>
            });
            if(!hasSearch){
                return '';
            }
            if(selectMode === 'multi'){
                dom.unshift(<li className={'th gsearch select'}> </li>)
            }
            if(serial === true){
                dom.unshift(<li className={'th gsearch serial'}> </li>);
            }
            return <ul>{dom}</ul>;
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
        let { columns, selectMode, serial } = this.props;
        let { widthRecord, editor } = this.state;
        let trEditor = editor[gInd];
        let dom = columns.map((column) => {
            let { hidden, width, render, key, editable, validate } = column;
            if(hidden){
                return '';
            }
            width = widthRecord[key] || width;
            let style = {};
            if(width){
                style = {
                    width,
                    flex: 'none'
                }
            }
            let value = d[key];
            return <div className={`td ${editable ? 'editable':''}`} 
                style={style} 
                contentEditable={editable} 
                onClick={(e)=> this.editClick(e,editable)}
                onBlur={(e) => this.editBlur(e,d,key,validate)}>
                { trEditor && trEditor[key]!==undefined ? trEditor[key] : 
                    ( render ? render(value,d,key,gInd) : (isRealOrZero(value) ? value : ''))}
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
        if(serial === true){
            let sortInd = d['Grid_show_index'];
            sortInd += 1;
            dom.unshift(<li className={'td serial'}>{sortInd}</li>);
        }
        return dom;
    }

    render(){
        let data = this.getDisplayData();
        let { curPage, pages } = this.state.pagination;
        let prevDisabled = curPage <= 1 ? 'disabled':'';
        let nextDisabled = curPage >= pages ? 'disabled':'';
        let cls = this.props.className || '';
        return <section className={`Grid ${cls}`} onDragOver={this.allCursor}>
            {/* <div className={'scroll-x'}>
            </div> */}
            <div draggable={true}
                onDragStart={this.setCursor}
                onDrag={this.moveRewidth}
                onDragEnd={this.endRewidth}
                onMouseUp={this.endRewidth}
                className={'Grid-rewidth'} 
                ref={'rewidth'}> </div>
                <header className={'Grid-header'}>
                    <ul>{ this.getHeaderDom() }</ul>
                    { this.getSearchDom() }
                </header>
                <div className={'scroll-y'} onScroll={this.bodyScroll}>
                    <ul className={'Grid-body'}>
                        { this.getBodyDom(data) }
                    </ul>
                </div>
            <footer className={'Grid-footer'}>
                <Pagination {...this.state.pagination} onChange={this.pageChange}>
                    <p> </p>
                    <PageElement type={'first'} event={'onClick'}>
                        <Icon type={'fast-backward'} className={prevDisabled}/>
                    </PageElement>
                    <PageElement type={'prev'} event={'onClick'}>
                        <Icon type={'step-backward'} className={prevDisabled}/>
                    </PageElement>
                    <PageElement type={'page'} event={'onKeyUp'} param={(e) => e.target.value}>
                        <input onKeyUp={(e) => e.code === 13} onInput={this.pageInputChange} value={this.state.pageInput}/>
                    </PageElement>
                    <PageElement type={'text'} text={this.getPageText1}/>
                    <PageElement type={'next'} event={'onClick'}>
                        <Icon type={'step-forward'} className={nextDisabled}/>
                    </PageElement>
                    <PageElement type={'last'} event={'onClick'}>
                        <Icon type={'fast-forward'} className={nextDisabled}/>
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
    className: PropTypes.string,
    data: PropTypes.array,
    pagination: PropTypes.object,
    /**
     * [{
     * name:'',key:'',
     * render:func(value,record,key,index),
     * sorter:func(a,b),
     * width: '',
     * hidden:false,
     * editable: false,
     * validte:func(value,record,key,index)
     * searcher: true/function(inputValue,record,key){}
     * }]
     *  */
    columns: PropTypes.array,
    selectMode: PropTypes.string,//'multi'
    onChange: PropTypes.func,
    pageMode: PropTypes.string,//'auto','back'
    sort: PropTypes.string,
    order: PropTypes.string,//asc,desc
    pageSizeOptions: PropTypes.array,
    pageText1: PropTypes.string,
    pageText2: PropTypes.string,
    noDataText: PropTypes.string,
    serial: PropTypes.string,
    onEditor: PropTypes.func,
    onSearch: PropTypes.func
}

export default Grid;