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

const TREE_PAD = 10;

class Grid extends Component{
    columnsMap = {};
    sortedData = [];
    searchedIndex = null;
    displayIndex = [];
    topped = [];
    tree = {};
    showIndex = 0;//tree模式下用到
    scrollLeft = 0;
    constructor(props, context) {
        super(props, context);
        this.initColumnsMap(props.columns);
        this.state = Object.assign({
            widthRecord: {},
            editor:{},
            search: {},
            searched: false,
            treeState: {},
            scrollTop: 0
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
        let { pagination, data, sort, order, pageMode, pageSizeOptions, selected } = props;
        let state = this.state||{};
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
            pagination.total = this.searchedIndex ? this.searchedIndex.length : data.length;
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
            selected: selected || state.selected || [], sort, order
        }
    }

    getDisplayData = () => {
        let { data , pageMode } = this.props;
        data = JSON.parse(JSON.stringify(data));
        if(!data || !data.length){
            return data;
        }
        let { editor } = this.state;
        let sd = [];
        if(this.searchedIndex !== null){
            this.searchedIndex.forEach((ind)=>{
                let d = data[ind];
                let gInd = d['Grid_index'];
                if(editor[gInd]){
                    d = Object.assign(d,editor[gInd]);
                }
                sd.push(d);
            });
        }else{
            sd = data.map((d)=>{
                let gInd = d['Grid_index'];
                if(editor[gInd]){
                    d = Object.assign(d,editor[gInd]);
                }
                return d;
            });
        }
        let { curPage, pageSize, total } = this.state.pagination;
        data = this.sortData(sd);
        this.displayIndex = [];
        switch(pageMode){
            case 'none':
            case 'back':
                data.forEach((d,i) => {
                    d['Grid_show_index'] = i;
                    let ind = d['Grid_index'];
                    this.displayIndex.push(ind);
                });
                return data;
            case 'tree':
                let treeConfig = this.props.treeConfig || {};
                let { key } = treeConfig;
                key = key || 'id';
                let treeData = {};
                data.forEach((d) => {
                    let ind = d['Grid_index'];
                    this.displayIndex.push(ind);
                    treeData[d[key]] = d;
                });
                return treeData;
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
        let { columns, customSort } = this.props;
        if(customSort){
            return data;
        }
        let { sort, order } = this.state;
        if(sort){
            let columnInd = this.columnsMap[sort];
            let column = isRealOrZero(columnInd) ? (columns[columnInd]||{}) : {};
            let sorter = column['sorter'];
            if(sorter){
                data.sort(sorter);
            }else{
                data.sort((a,b) => {
                    return (a[sort]||'').toString().localeCompare(b[sort]||'').toString();
                });
            }
            if(order === 'desc'){
               data.reverse();
            }
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
                    valid = valid && searcher[ck](val,d,ck);
                }else{
                    let dv = d[ck];
                    if(dv && !(dv instanceof Object)){
                        valid = valid && dv.toString().indexOf(val) > -1;
                    }
                }
            });
            valid && searchedIndex.push(d['Grid_index']);
        });
        this.searchedIndex = searchedIndex;
    }

    searchChange = (key, value) => {
        let { pageMode, onSearch, data, onChange } = this.props;
        let { search ,pagination, pageInput } = this.state;
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
            pageInput = 1;
            this.setState({
                pagination,
                search,
                pageInput
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
        let { columns } = this.props;
        let { sort, order} = this.state;
        let column = columns[this.columnsMap[key]];
        if(column && column['sorter'] === false){
            return;
        }
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
        let offsetParent = e.target.offsetParent;
        let scrollLeft = offsetParent.className.indexOf('Grid') > -1 ? this.scrollLeft : 0;
        let old = e.target.offsetLeft;
        let rewidthDom = this.refs['rewidth'];
        rewidthDom.style.cssText = `;left:${old-(scrollLeft||0)-10}px;z-index:3;opacity:1`;
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
        },() => {
            if(this.props.onRewidth){
                this.props.onRewidth(widthRecord, this.props.columns);
            }
        });
    }

    bodyScroll = (e) => {
        let scrollLeft = e.target.scrollLeft;
        this.scrollLeft = scrollLeft;
        e.target.previousSibling.scrollLeft = scrollLeft;
        if(this.props.pageMode === 'tree'){
            let scrollTop = e.target.scrollTop;
            if(scrollTop !== this.state.scrollTop){
                this.setState({
                    scrollTop: e.target.scrollTop
                });
            }
        }
    }

    editFocus = (e,record,key) => {
        e.target.innerHTML = record[key];
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
                this.props.onEditor(this.state.editor,this.props.data);
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

    setTop = (e, gInd) => {
        e.stopPropagation();
        let i = this.topped.indexOf(gInd);
        if(i > -1){
            this.topped.splice(i, 1);
        }else{
            this.topped.push(gInd);
        }
        let topped = this.topped.map(v => v);
        this.setState(this.state, () => {
            if(this.props.onTopped){
                let { data } = this.props;
                let toppedData = topped.map((ind) => {
                    return data[ind];
                });
                this.props.onTopped(JSON.parse(JSON.stringify(toppedData)));
            }
        });
    }

    setTreeState = (e, key) => {
        e.stopPropagation();
        let { treeState } = this.state;
        if(treeState[key] === false){
            treeState[key] = true;
        }else{
            treeState[key] = false;
        }
        this.setState({
            treeState
        });
    }

    triggerChange = () => {
        if(this.props.onChange){
            let data = this.props.data;
            let pageInfo = JSON.parse(JSON.stringify(this.state.pagination));
            let sld = this.state.selected.map((ind) => {
                return data[ind];
            });
            sld = JSON.parse(JSON.stringify(sld));
            let { sort, order } = this.state;
            this.props.onChange(pageInfo,sld, { key: sort, order, sortData: this.sortedData});
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
        let { columns, selectMode, serial, topable } = this.props;
        let { sort, order, widthRecord } = this.state;
        if(isArray(columns)){
            let comFixed = true;
            let hasFixed = false;
            let fixedDom = [];
            let dom = columns.map((column) => {
                let { name, key, hidden ,width, fixed } = column;
                if(hidden) return '';
                width = widthRecord[key] || width;

                let style = {};
                if(width){
                    style = {
                        width,
                        flex: 'none'
                    }
                }
                comFixed = comFixed && !!fixed;
                hasFixed = hasFixed || !!fixed;
                if(comFixed){
                    fixedDom.push(<li className={'th fixed'} 
                        style={ style } 
                        onClick={() => this.setSort(key)} 
                        title={name}>
                    <a className={'rewidth'} 
                        onMouseDown={(e) => this.startRewidth(e,key)}> </a>
                    <span>{name}</span>
                    {this.getSortIcon(key,sort,order)}
                </li>);
                }
                let cls = `th${comFixed?' fixed-hide':''}`;
                return <li className={cls} style={ style } onClick={() => this.setSort(key)} title={name}>
                    <a className={'rewidth'} 
                        onMouseDown={(e) => this.startRewidth(e,key)}> </a>
                    <span>{name}</span>
                    {this.getSortIcon(key,sort,order)}
                </li>
            });
            if(topable){
                dom.unshift(<li className={`th topsign${ hasFixed ? ' fixed-hide': ''}`}> </li>);
                if(hasFixed){
                    fixedDom.unshift(<li className={'th topsign fixed'}> </li>);
                }
            }
            if(selectMode === 'multi'){
                let selectAll = !!this.displayIndex.length;
                for(let ind of this.displayIndex){
                    if(this.state.selected.indexOf(ind) < 0){
                        selectAll = false;
                        break;
                    }
                }
                let type = selectAll ?'fangxingxuanzhong':'fangxingweixuanzhong';
                dom.unshift(<li className={`th select${ hasFixed ? ' fixed-hide': ''}`}>
                    <Icon type={type} onClick={this.selectAll}/>
                </li>);
                if(hasFixed){
                    fixedDom.unshift(<li className={'th select fixed'}>
                    <Icon type={type} onClick={this.selectAll}/>
                </li>);
                }
            }
            if(serial){
                let style = {};
                if(typeof serial === 'object'){
                    if(serial.width){
                        style['width'] = serial.width + 'px';
                    }
                }
                dom.unshift(<li style={style} className={`th serial${ hasFixed ? ' fixed-hide': ''}`}> </li>);
                if(hasFixed){
                    fixedDom.unshift(<li style={style} className={'th serial fixed'}> </li>);
                }
            }
            return [<li className={'gfixed-panel'}>{fixedDom}</li>, ...dom];
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
        let { columns, selectMode, serial, topable } = this.props;
        let { widthRecord } = this.state;
        if(isArray(columns)){
            let hasSearch = false;
            let comFixed = true;
            let hasFixed = false;
            let fixedDom = [];
            let dom = columns.map((column) => {
                let { key, hidden ,width,searcher, fixed} = column;
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

                comFixed = comFixed && !!fixed;
                hasFixed = hasFixed || !!fixed;
                if(comFixed){
                    fixedDom.push(<div className={`th gsearch fixed`} style={ style }>
                        {searcher && <Input onKeyUp={(e) => this.onSearch(e,key)}/>}
                    </div>);
                }
                return <div className={`th gsearch${comFixed ? ' fixed-hide':''}`} style={ style }>
                    {searcher && <Input onKeyUp={(e) => this.onSearch(e,key)}/>}
                </div>
            });
            if(!hasSearch){
                return '';
            }
            if(topable){
                dom.unshift(<div className={`th gsearch topsign${ hasFixed ? ' fixed-hide':''}`}> </div>);
                if(hasFixed){
                    fixedDom.unshift(<div className={`th gsearch topsign fixed`}> </div>);
                }
            }
            if(selectMode === 'multi'){
                dom.unshift(<div className={`th gsearch select${ hasFixed ? ' fixed-hide':''}`}> </div>);
                if(hasFixed){
                    fixedDom.unshift(<div className={`th gsearch select fixed`}> </div>);
                }
            }
            if(serial){
                let style = {};
                if(typeof serial === 'object'){
                    if(serial.width){
                        style['width'] = serial.width + 'px';
                    }
                }
                dom.unshift(<div style={style} className={`th gsearch serial${ hasFixed ? ' fixed-hide':''}`}> </div>);
                if(hasFixed){
                    fixedDom.unshift(<div style={style} className={`th gsearch serial fixed`}> </div>);
                }
            }
            return <ul className={'search-head'}>{[<div className={'gfixed-panel'}>{fixedDom}</div>, ...dom]}</ul>;
        }else{
            return '';
        }
    }

    getBodyDom = (data) => {
        let { columns, validateTop } = this.props;
        if(validateTop && typeof validateTop === 'function'){
            this.topped = [];
        }
        if(isArray(columns)){
            let topDom = [];
            let dom = [];
            data.forEach((d) => {
                let gInd = d['Grid_index'];
                let cls = this.state.selected.indexOf(gInd) > -1? 'selected': '';
                let topFlag = false;
                if(validateTop && typeof validateTop === 'function'){
                    if(validateTop(d)){
                        cls += ' topped';
                        this.topped.push(gInd);
                        topFlag = true;
                    }
                }else if(this.topped.indexOf(gInd) > -1){
                    cls += 'topped';
                    topFlag = true;
                }
                let li = <li className={`tr ${cls}`} key={gInd} onClick={() => this.selectOne(gInd)}>
                    {
                        this.getTrDom(d,gInd)
                    }
                </li>;
                if(topFlag){
                    topDom.push(li);
                }else{
                    dom.push(li);
                }
            });
            return [...topDom, dom];
        }else{
            return '';
        }
    }

    getTreeBodyDom = (data) => {
        let { columns, validateTop } = this.props;
        if(validateTop && typeof validateTop === 'function'){
            this.topped = [];
        }
        if(!isArray(columns)) return '';
        let treeConfig = this.props.treeConfig || {};
        let { parentKey } = treeConfig;
        parentKey = parentKey || 'parentId';
        this.tree = {};
        Object.keys(data).forEach((key) => {
            let d = data[key];
            let pt = this.getParentTreeObj(d[parentKey],parentKey, data);
            if(!pt[key]){
                pt[key] = {};
            }
        });
        let dom = [];
        this.showIndex = 0;
        dom = this.getTreeTrDom(this.tree, data, 0);
        return dom;
    }

    getParentTreeObj = (pId, parentKey, treeData) => {
        let pd = treeData[pId];
        if(pId && pd){
            let pt = this.getParentTreeObj(pd[parentKey], parentKey, treeData);
            if(!pt[pId]){
                pt[pId] = {};
            }
            return pt[pId];
        }else{
            return this.tree;
        }
    }

    getTreeTrDom = (tree, treeData, level) => {
        let { treeState } = this.state;
        let { validateTop } = this.props;
        let dom = [];
        let fixedDom = [];
        Object.keys(tree).forEach((key) => {
            let d = treeData[key];
            d['Grid_show_index'] = this.showIndex;
            this.showIndex++;
            let t = tree[key];
            let len = Object.keys(t).length;
            d['Grid_level'] = level;
            d['Grid_leaf'] = len ? false : true;

            let gInd = d['Grid_index'];
            let cls = this.state.selected.indexOf(gInd) > -1? 'selected': '';
            let fixedFlag = false;
            if(validateTop && typeof validateTop === 'function'){
                if(validateTop(d)){
                    cls += ' topped';
                    this.topped.push(gInd);
                    fixedFlag = true;
                }
            }else if(this.topped.indexOf(gInd) > -1){
                cls += 'topped';
                fixedFlag = true;
            }
            let li = <li className={`tr ${cls}`} key={gInd} onClick={() => this.selectOne(gInd)}>
                {this.getTrDom(d,gInd)}
            </li>;
            if(fixedFlag){
                fixedDom.push(li);
            }else{
                dom.push(li);
            }
            if(len){
                if(treeState[key] !== false){
                    let clis = this.getTreeTrDom(t, treeData, level + 1);
                    if(fixedFlag){
                        fixedDom = [...fixedDom,...clis];
                    }else{
                        dom = [...dom, ...clis];
                    }
                }else{
                    this.showIndex += len;
                }
            }
        });
        return [...fixedDom, ...dom];
    }

    getTrDom = (d,gInd) => {
        let { columns, selectMode, serial, topable, pageMode, treeConfig } = this.props;
        let treeColumn = '';
        let treeKey = '';
        if(pageMode === 'tree'){
            treeColumn = (treeConfig || {})['column'] || columns[0]['key'];
            treeKey = (treeConfig||{})['key'] || 'id';
        }
        let { widthRecord, editor, treeState } = this.state;
        let trEditor = editor[gInd];
        let comFixed = true;
        let hasFixed = false;
        let fixedDom = [];
        let dom = [];
        for(let i = 0; i < columns.length; ){
            let column = columns[i];
            let { hidden, width, render, key, editable, validate, fixed, colspan } = column;
            if(hidden){
                return '';
            }
            let value = d[key];
            let style = {};
            width = widthRecord[key] || width;
            if(typeof colspan === 'function'){
                colspan = colspan(value,d,key,gInd);
            }
            if(isNaN(colspan)){
                colspan = 1;
            }
            if(colspan > 1){
                let widthArr = [];
                while(colspan > 0){
                    let col = columns[i];
                    widthArr.push(widthRecord[col['key']] || col['width']);
                    i++;
                    colspan--;
                }
                width = `calc(${widthArr.join(' + ')})`;
            }else{
                i++;
            }
            if(width){
                style = {
                    width,
                    flex: 'none'
                }
            }
            if(treeColumn && treeColumn === key){
                style['textAlign'] = 'left';
                style['paddingLeft'] = TREE_PAD * d['Grid_level'] + 'px';
            }
            let cls = 'td';
            cls += editable ? ' editable':'';
            cls += treeColumn && treeColumn === key?' treesign':'';
            cls += treeColumn && treeColumn === key && treeState[d[treeKey]] === false ? ' treehide' : '';

            comFixed = comFixed && !!fixed;
            hasFixed = hasFixed || !!fixed;


            let getDiv = (isFixed , isHide, clz) => {
                if(isFixed && isHide){
                    clz += ' fixed-hide';
                }else if(isFixed && !isHide){
                    clz += ' fixed';
                }
                return <div className={clz} 
                    title={value}
                    style={style} 
                    contentEditable={editable} 
                    onClick={(e)=> this.editClick(e,editable)}
                    onFocus={(e)=> this.editFocus(e,d,key)}
                    onBlur={(e) => this.editBlur(e,d,key,validate)}>
                        { treeColumn && treeColumn === key && 
                            (d['Grid_leaf'] ? <Icon type={'item'}/> : 
                            <Icon type={'triangledownfill'} onClick={(e)=>{this.setTreeState(e,d[treeKey])}}/>) }
                        {( render ? render(value,d,key,gInd) : (isRealOrZero(value) ? value : ''))}
                </div>
            }

            if(comFixed){
                fixedDom.push(getDiv(comFixed, false, cls));
            }
            dom.push(getDiv(comFixed, true, cls));
        }
        if(topable){
            let cls = 'td topsign';
            let getDiv = (isFixed, isHide, clz) => {
                if(isFixed && isHide){
                    clz += ' fixed-hide';
                }else if(isFixed && !isHide){
                    clz += ' fixed';
                }
                let icon = <Icon type={'circle'} onClick={(e) => this.setTop(e, gInd)}/>;
                return <div className={clz}>{ 
                    (typeof topable === 'function') ? (topable(d) ? icon : '') : icon}</div>
            }
            dom.unshift(getDiv(hasFixed, true, cls));
            if(hasFixed){
                fixedDom.unshift(getDiv(hasFixed, false, cls));
            }
        }
        if(selectMode === 'multi'){
            let type = 'fangxingweixuanzhong';
            if(this.state.selected.indexOf(gInd) > -1){
                type = 'fangxingxuanzhong';
            }
            dom.unshift(<div className={`td select${hasFixed ? ' fixed-hide':''}`}>
                <Icon type={type}/>
            </div>);
            if(hasFixed){
                fixedDom.unshift(<div className={'td select fixed'}>
                    <Icon type={type}/>
                </div>);
            }
        }
        if(serial){
            let sortInd = d['Grid_show_index'];
            sortInd += 1;
            let sortIndDom = sortInd;
            let style = {};
            if(typeof serial === 'object'){
                sortIndDom = serial.render ? serial.render(sortIndDom) : sortIndDom;
                if(serial.width){
                    style['width'] = serial.width + 'px';
                }
            }
            dom.unshift(<div className={`td serial${hasFixed ? ' fixed-hide' : ''}`} style={style}>{sortIndDom}</div>);
            if(hasFixed){
                fixedDom.unshift(<div className={`td serial fixed`} style={style}>{sortIndDom}</div>);
            }
        }
        return [<div className={'gfixed-panel'} style={{'marginTop': - this.state.scrollTop}}>{fixedDom}</div>, ...dom];
    }

    render(){
        let data = this.getDisplayData();
        let { curPage, pages } = this.state.pagination;

        let prevDisabled = curPage <= 1 ? 'disabled':'';
        let nextDisabled = curPage >= pages ? 'disabled':'';

        let { pageMode, className } = this.props;
        className = className || '';

        return <section className={`Grid ${className}`} onDragOver={this.allCursor}>
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
                    <ul className={`Grid-body ${pageMode === 'tree'?'treesign':''}`}>
                        { pageMode === 'tree' ? this.getTreeBodyDom(data) : this.getBodyDom(data) }
                    </ul>
                </div>
            {pageMode !== 'tree' && pageMode !== 'none' && <footer className={'Grid-footer'}>
                <Pagination {...this.state.pagination} onChange={this.pageChange}>
                    <p> </p>
                    <PageElement type={'first'} event={'onClick'}>
                        <Icon type={'step-backward'} className={prevDisabled}/>
                    </PageElement>
                    <PageElement type={'prev'} event={'onClick'}>
                        <Icon type={'fast-backward'} className={prevDisabled}/>
                    </PageElement>
                    <PageElement type={'page'} event={'onKeyUp'} param={(e) => e.target.value}>
                        <input onKeyUp={(e) => e.code === 13} onInput={this.pageInputChange} value={this.state.pageInput}/>
                    </PageElement>
                    <PageElement type={'text'} text={this.getPageText1}/>
                    <PageElement type={'next'} event={'onClick'}>
                        <Icon type={'fast-forward'} className={nextDisabled}/>
                    </PageElement>
                    <PageElement type={'last'} event={'onClick'}>
                        <Icon type={'step-forward'} className={nextDisabled}/>
                    </PageElement>
                    <PageElement type={'pageSize'} event={'onSelected'} param={(value) => value}>
                        <Select value={this.state.pagination.pageSize} orient={'up'}>
                            { this.getPageSizeOptionsDom() }
                        </Select>
                    </PageElement>
                    <PageElement type={'text'} text={this.getPageText2}/>
                </Pagination>
            </footer>}
        </section>
    }
}

Grid.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array,
    /**
     * {
     *  curPage: 1,
     *  pageSize: 10,
     *  total: 100,
     *  onChange: function(pagination){}
     * }
     */
    pagination: PropTypes.object,
    /**
     * [{
     * name:'',
     * key:'',
     * render:func(value,record,key,index),
     * sorter:func(a,b),
     * width: '',
     * hidden:false,
     * editable: false,
     * validte:func(value,record,key,index)
     * searcher: true/function(inputValue,record,key){},//某一列可搜索时设置
     * fixed: true,
     * colspan: 1/function(value,record,key,index),//数字或者方法返回的数字，默认是1
     * }]
     *  */
    columns: PropTypes.array,
    selectMode: PropTypes.string,//'multi'
    onChange: PropTypes.func,//function(pagination, selectData){}
    pageMode: PropTypes.string,//'auto','back','tree','none'//none表示不分页
    sort: PropTypes.string,//当前以哪一列排序
    order: PropTypes.string,//asc,desc
    pageSizeOptions: PropTypes.array,
    pageText1: PropTypes.string,//底部分页第一条文字
    pageText2: PropTypes.string,//底部分页第二条文字
    noDataText: PropTypes.string,//无数据的展示文字
    serial: PropTypes.bool,//设置为true会在列表最开始展示序号
    onEditor: PropTypes.func,//某一列格设置为可编辑时，编辑后会调用的方法function(editor, data)
    onSearch: PropTypes.func,//设置某一列可搜索时，搜索后调用的方法function(searchData,searchInfo)
    topable: PropTypes.any,//true/false/function(record){}可以筛选出哪条数据是可以被置顶的
    validateTop: PropTypes.func,//function(record){}判断哪些是被置顶的
    onTopped: PropTypes.func,//function(toppedData){}
    onRewidth: PropTypes.func,
    treeConfig: PropTypes.any,//true/{ column: ''//默认第一个,parentKey: 'parentId', key: 'id'}
    customSort: true
}

export default Grid;