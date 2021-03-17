import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Icon from '../icon';
import Pagination from '../pagination';
import Select from '../select';
import moment from 'moment';
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
            scrollTop: 0,
            hideBody: false,//可编辑某单元格时，清空已编辑数据所用
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
        const setIndex = (cols, indarr) => {
            if(!(indarr instanceof Array)){
                indarr = [];
            }
            cols.forEach((col,ind) => {
                let { children, key } = col;
                this.columnsMap[key] = [...indarr,ind];
                if((children instanceof Array) && children.length){
                    setIndex(children,[...indarr,ind]);
                }
            });
        }
        
        setIndex(columns);
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
            selected: selected || state.selected || [], 
            sort: sort===undefined ? state.sort : sort, 
            order: order===undefined ? state.order : order
        }
    }

    getColumnByKey = (key) => {
        let { columns } = this.props;
        let indarr = this.columnsMap[key];
        if(!indarr || indarr.length) {
            return {};
        }
        let col = { children : columns||{} };
        indarr.forEach((ind)=>{
            col = col['children'][ind]||{};
        });
        return col;
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
                let begin = ((curPage||1) - 1) * pageSize;
                data.forEach((d,i) => {
                    d['Grid_show_index'] = begin + i;
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
        let { customSort } = this.props;
        if(customSort){
            return data;
        }
        let { sort, order } = this.state;
        if(sort){
            let column = this.getColumnByKey(sort);
            let sorter = column['sorter'];
            if(sorter && typeof sorter === 'function'){
                data.sort(sorter);
            }else{
                data.sort((a,b) => {
                    a = a[sort];
                    b = b[sort];
                    if(a === '' || a === null || a === undefined){
                        return 1;
                    }else if(b === '' || b === null || b === undefined){
                        return -1;
                    }
                    let reg = /^\d{4}-\d{2}-\d{2}([ ]\d{2}:\d{2}:\d{2}){0,1}$/;
                    if(reg.test((a||'').toString()) || reg.test((b||'').toString())){
                        a = moment(a);
                        b = moment(b);
                        if(moment.isMoment(a) && !moment.isMoment(b)){
                            return -1;
                        }else if(!moment.isMoment(a) && moment.isMoment(b)){
                            return 1;
                        }else if(moment.isMoment(a) && moment.isMoment(b)){
                            return a.diff(b);
                        }
                    }
                    let an = Number(a);
                    let bn = Number(b);
                    if(isNaN(an) && !isNaN(bn)){
                        return 1;
                    }else if(!isNaN(an) && isNaN(bn)){
                        return -1;
                    }else if(isNaN(an) && isNaN(bn)){
                        return (a||'').toString().localeCompare(b||'').toString();
                    }else{
                        return an - bn;
                    }
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
            let col = this.getColumnByKey(ck);
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
            if(this.props.onAllClick){
                this.props.onAllClick(selected.map((gi) => this.props.data[gi]),!!selected.length);
            }
            this.triggerChange();
        });
    }

    selectOne = (gInd,selForbid) => {
        if(selForbid) return;
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
            if(this.props.onItemClick){
                this.props.onItemClick(this.props.data[gInd],ind < 0, gInd);
            }
            this.triggerChange();
        })
    }

    setSort = (key) => {
        let { sort, order} = this.state;
        let column = this.getColumnByKey(key);
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
    
    pageInputConfirm = (e) => {
        if(e === 13){
            let { pagination } = this.state;
            pagination.curPage = e.target.value;
            this.setState({
                pagination
            });
        }
    }

    startRewidth = (e,key) => {
        let offsetParent = e.target.offsetParent;
        let scrollLeft = offsetParent.className.indexOf('Grid') > -1 ? this.scrollLeft : 0;
        let old = e.target.offsetLeft;
        let rewidthDom = this.refs['rewidth'];
        rewidthDom.style.cssText = `;left:${old-(scrollLeft||0)-10}px;z-index:3;opacity:1`;
        this.key = key;
        let indarr = this.columnsMap[key];
        let curDom = e.target.parentElement;
        let pd = null;
        if(indarr.length > 1){
            this.pdKey = (this.props['columns'][indarr[0]]||{})['key'];
            let i = indarr.length;
            while(i > 1){
                pd = curDom.parentElement;
                i--;
            }
            this.pOldW = pd.clientWidth;
        }
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
        if(this.pdKey && this.pOldW){
            widthRecord[this.pdKey] = (this.pOldW + gap - 1) + 'px';
        }
        this.pdKey = null;
        this.pOldW = null;
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

    clearEditor = (index, key) => {
        let editor = this.state.editor;
        let indf = isRealOrZero(index);
        let keyf = isRealOrZero(key);
        if(indf && keyf && editor[index]){
            delete editor[index][key];
        }else if(indf && !keyf){
            delete editor[index];
        }else if(!indf && keyf){
            Object.keys(editor).forEach((k)=>{
                delete editor[k][key];
            });
        }else{
            editor = {};
        }
        this.setState({
            editor : editor,
            hideBody: true
        },() => {
            this.setState({
                hideBody: false
            });
        });
    }

    editClick = (e,editable) => {
        if(editable){
            e.stopPropagation();
        }
    }

    clearSelected = () => {
        this.setState({
            selected: []
        });
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
        let { pageText1, i18n = {} } = this.props;
        let str = i18n.pages || pageText1 || `共${pages}页`;
        str = str.replace('${pages}',pages);
        return <span>{ str }</span>
    }

    getPageText2 = (param) => {
        const {noDataText, i18n = {}} = this.props;
        if(!this.props.data || !this.props.data.length){
            return <p><span>{i18n.noDataText || noDataText || '无数据'}</span></p>;
        }
        let { curPage, pageSize, total } = param;
        let start = ((curPage||1) - 1) * pageSize + 1;
        let end = curPage * pageSize;
        if(end > total){
            end = total;
        }
        let { pageText2} = this.props;
        let str = i18n.total || pageText2 || `${start} - ${end} 共${total}条`;
        str = str.replace('${start}',start)
            .replace('${end}',end)
            .replace('${total}', total);
        return <p><span>{ str }</span></p>
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
            let getCol = (col, isChild, theInd) => {
                let { name, key, hidden ,width, fixed, children } = col;
                if(hidden) return '';

                width = widthRecord[key] || width;
                let style = {};
                if(width){
                    style = {
                        width,
                        flex: 'none'
                    }
                }
                comFixed = comFixed && (isChild || !!fixed);
                hasFixed = hasFixed || !!fixed;

                let getMultiLi = (cls) => {
                    return <li className={`with-child ${cls}`} style={style} key={theInd}>
                        <p title={name} >
                            {name}
                        </p>
                        <ul>{children.map((c, cind)=>{
                            return getCol(c,true, cind);
                        })}</ul>
                    </li>
                }

                if(children && children.length){
                    if(comFixed && !isChild){
                        fixedDom.push(getMultiLi('th fixed'));
                    }
                    return getMultiLi(`th${comFixed?' fixed-hide':''}`);
                }
                let getNormalLi = (cls) => {
                    return <li className={cls} 
                        style={ style } 
                        onClick={() => this.setSort(key)} 
                        title={name}
                        key={theInd}
                    >
                        <a className={'rewidth'} 
                            onMouseDown={(e) => this.startRewidth(e,key)}> </a>
                        <span>{name}</span>
                        {this.getSortIcon(key,sort,order)}
                    </li>
                }
                if(comFixed){
                    fixedDom.push(getNormalLi('th fixed'));
                }
                return getNormalLi(`th${comFixed?' fixed-hide':''}`);
            }
            let dom = columns.map((column, colind) => {
                return getCol(column, false, colind);
            });
            if(topable){
                dom.unshift(<li className={`th topsign${ hasFixed ? ' fixed-hide': ''}`} key='top'> </li>);
                if(hasFixed){
                    fixedDom.unshift(<li className={'th topsign fixed'} key='top'> </li>);
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
                dom.unshift(<li className={`th select${ hasFixed ? ' fixed-hide': ''}`} key='multi'>
                    <Icon type={type} onClick={this.selectAll}/>
                </li>);
                if(hasFixed){
                    fixedDom.unshift(<li className={'th select fixed'} key='multi'>
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
                dom.unshift(<li style={style} className={`th serial${ hasFixed ? ' fixed-hide': ''}`} key='serial'> </li>);
                if(hasFixed){
                    fixedDom.unshift(<li style={style} className={'th serial fixed'} key='serial'> </li>);
                }
            }
            return [<li className={'gfixed-panel'} key='fixed'><ul>{fixedDom}</ul></li>, ...dom];
        }else{
            return '';
        }
    }

    getSortIcon = (key,sort,order) => {
        if(key === sort){
            let dom = [];
            dom.push(<Icon type={'triangleupfill'} className={`sort ${order!=='desc'?'active':''}`} key='asc'/>);
            dom.push(<Icon type={'triangledownfill'} className={`sort desc ${order==='desc'?'active':''}`} key='desc' />);
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
            let getCol = (column, pfixed, theInd) => {
                let { key, hidden ,width,searcher, fixed, children } = column;
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

                fixed = pfixed === undefined ? fixed : pfixed;
                comFixed = comFixed && !!fixed;
                hasFixed = hasFixed || !!fixed;
                if(children && children.length){
                    return <React.Fragment key={theInd}>
                        {children.map((c, cind)=>{
                            return getCol(c, fixed, cind);
                        })}
                    </React.Fragment>;
                }
                let getNormalDom = (cls, isFixed) => {
                    return <div className={cls} style={ style } key={`${theInd}-${isFixed ? 'fixed' : ''}`}>
                        {searcher && <Input onKeyUp={(e) => this.onSearch(e,key)}/>}
                    </div>
                }
                if(comFixed){
                    fixedDom.push(getNormalDom('th gsearch fixed', true));
                }
                return getNormalDom(`th gsearch${comFixed ? ' fixed-hide':''}`);
            }
            let dom = columns.map((column, colind) => {
                return getCol(column, false, colind);
            });
            if(!hasSearch){
                return '';
            }
            if(topable){
                dom.unshift(<div className={`th gsearch topsign${ hasFixed ? ' fixed-hide':''}`} key='top'> </div>);
                if(hasFixed){
                    fixedDom.unshift(<div className={`th gsearch topsign fixed`} key='top-fixed'> </div>);
                }
            }
            if(selectMode === 'multi'){
                dom.unshift(<div className={`th gsearch select${ hasFixed ? ' fixed-hide':''}`} key='multi'> </div>);
                if(hasFixed){
                    fixedDom.unshift(<div className={`th gsearch select fixed`} key='multi-fixed'> </div>);
                }
            }
            if(serial){
                let style = {};
                if(typeof serial === 'object'){
                    if(serial.width){
                        style['width'] = serial.width + 'px';
                    }
                }
                dom.unshift(<div style={style} className={`th gsearch serial${ hasFixed ? ' fixed-hide':''}`} key='serial'> </div>);
                if(hasFixed){
                    fixedDom.unshift(<div style={style} className={`th gsearch serial fixed`} key='serial-fixed'> </div>);
                }
            }
            return <ul className={'search-head'} key='search'>{[<div className={'gfixed-panel'} key='fixed'>{fixedDom}</div>, ...dom]}</ul>;
        }else{
            return '';
        }
    }

    getBodyDom = (data) => {
        let { columns, validateTop, selectable } = this.props;
        if(validateTop && typeof validateTop === 'function'){
            this.topped = [];
        }
        if(isArray(columns)){
            let topDom = [];
            let dom = [];
            data.forEach((d) => {
                let gInd = d['Grid_index'];
                let cls = this.state.selected.indexOf(gInd) > -1? ['selected']: [];
                let topFlag = false;
                if(validateTop && typeof validateTop === 'function'){
                    if(validateTop(d)){
                        cls.push('topped');
                        this.topped.push(gInd);
                        topFlag = true;
                    }
                }else if(this.topped.indexOf(gInd) > -1){
                    cls.push('topped');
                    topFlag = true;
                }
                let selForbid = false;
                if(typeof selectable === 'function' && !selectable(d)){
                    cls.push('sel-forbid');
                    selForbid = true;
                }
                let li = <li className={`tr ${cls.join(' ')}`} key={gInd} onClick={() => this.selectOne(gInd,selForbid)}>
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
        let { validateTop, selectable, pageMode, pagination } = this.props;
        let { curPage, pageSize } = pagination;
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
            let cls = this.state.selected.indexOf(gInd) > -1? ['selected']: [];
            let fixedFlag = false;
            if(validateTop && typeof validateTop === 'function'){
                if(validateTop(d)){
                    cls.push('topped');
                    this.topped.push(gInd);
                    fixedFlag = true;
                }
            }else if(this.topped.indexOf(gInd) > -1){
                cls.push('topped');
                fixedFlag = true;
            }
            let selForbid = false;
            if(typeof selectable === 'function' && !selectable(d)){
                cls.push('sel-forbid');
                selForbid = true;
            }
            let li = <li className={`tr ${cls.join(' ')}`} key={gInd} onClick={() => this.selectOne(gInd, selForbid)}>
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
        let { widthRecord, treeState } = this.state;
        let comFixed = true;
        let hasFixed = false;
        let fixedDom = [];
        let dom = [];
        let initKey = moment().valueOf();
        let getColTr = (cols, pfixed) => {
            let i = 0;
            while(i < cols.length){
                let column = cols[i];
                let { hidden, width, render, key, editable, validate, 
                    fixed, colspan, children, hoverTips } = column;
                if(hidden){
                    i++;
                    continue;
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
                        let col = cols[i];
                        if(!col.hidden){
                            widthArr.push(widthRecord[col['key']] || col['width']);
                            colspan--;
                        }
                        i++;
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
                    style['justifyContent'] = 'start';
                    style['paddingLeft'] = TREE_PAD * d['Grid_level'] + 'px';
                }
                let cls = 'td';
                cls += editable ? ' editable':'';
                cls += treeColumn && treeColumn === key?' treesign':'';
                cls += treeColumn && treeColumn === key && treeState[d[treeKey]] === false ? ' treehide' : '';
    
                fixed = pfixed === undefined ? fixed : pfixed;
                comFixed = comFixed && !!fixed;
                hasFixed = hasFixed || !!fixed;
                if(children && children.length){
                    getColTr(children);
                }else{
                    let getDiv = (isFixed , isHide, clz) => {
                        if(isFixed && isHide){
                            clz += ' fixed-hide';
                        }else if(isFixed && !isHide){
                            clz += ' fixed';
                        }
                        return <div className={clz} 
                            title={ hoverTips === false ? '' : value}
                            style={style} 
                            contentEditable={editable} 
                            onClick={(e)=> this.editClick(e,editable)}
                            onFocus={(e)=> this.editFocus(e,d,key)}
                            onBlur={(e) => this.editBlur(e,d,key,validate)}
                            key={initKey++}
                        >
                                { treeColumn && treeColumn === key && 
                                    (d['Grid_leaf'] ? <Icon type={'item'} /> : 
                                    <Icon type={'triangledownfill'} onClick={(e)=>{this.setTreeState(e,d[treeKey])}} />) }
                                {( render ? render(value,d,key,gInd) : (isRealOrZero(value) ? value : ''))}
                        </div>
                    }
        
                    if(comFixed){
                        fixedDom.push(getDiv(comFixed, false, cls));
                    }
                    dom.push(getDiv(comFixed, true, cls));
                }
    
            }
        }
        getColTr(columns);
        if(topable){
            let cls = 'td topsign';
            let getDiv = (isFixed, isHide, clz) => {
                if(isFixed && isHide){
                    clz += ' fixed-hide';
                }else if(isFixed && !isHide){
                    clz += ' fixed';
                }
                let icon = <Icon type={'circle'} onClick={(e) => this.setTop(e, gInd)}/>;
                return <div className={clz} key={`top ${isHide ? '' : 'fixed'}`}>{ 
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
            dom.unshift(<div className={`td select${hasFixed ? ' fixed-hide':''}`} key='multi'>
                <Icon type={type}/>
            </div>);
            if(hasFixed){
                fixedDom.unshift(<div className={'td select fixed'} key='multi-fixed'>
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
            dom.unshift(<div className={`td serial${hasFixed ? ' fixed-hide' : ''}`} style={style} key='serial'>{sortIndDom}</div>);
            if(hasFixed){
                fixedDom.unshift(<div className={`td serial fixed`} style={style} key='serial-fixed'>{sortIndDom}</div>);
            }
        }
        if(fixedDom.length){
            return [ <div className={'gfixed-panel'} style={{'marginTop': - this.state.scrollTop}} key='fixed'>{fixedDom}</div>, ...dom];
        }else{
            return dom;
        }
    }

    render(){
        let data = this.getDisplayData();
        let { curPage, pages } = this.state.pagination;

        let prevDisabled = curPage <= 1 ? 'disabled':'';
        let nextDisabled = curPage >= pages ? 'disabled':'';

        let { pageMode, className, headerStrategy } = this.props;
        className = className || '';
        if (headerStrategy) {
            className += ' ' + headerStrategy;
        }

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
                    <ul key='header'>{ this.getHeaderDom() }</ul>
                    { this.getSearchDom() }
                </header>
                {!this.state.hideBody && <div className={'scroll-y'} onScroll={this.bodyScroll}>
                    <ul className={`Grid-body ${pageMode === 'tree'?'treesign':''}`} ref={'body'}>
                        { pageMode === 'tree' ? this.getTreeBodyDom(data) : this.getBodyDom(data) }
                    </ul>
                </div>}
            {pageMode !== 'tree' && pageMode !== 'none' && <footer className={'Grid-footer'}>
                <Pagination {...this.state.pagination} onChange={this.pageChange} key='pagination'>
                    <p key='none'> </p>
                    <PageElement type={'first'} event={'onClick'} key='first'>
                        <Icon type={'step-backward'} className={prevDisabled}/>
                    </PageElement>
                    <PageElement type={'prev'} event={'onClick'} key='prev'>
                        <Icon type={'fast-backward'} className={prevDisabled}/>
                    </PageElement>
                    <PageElement type={'page'} event={'onKeyUp'} param={(e) => e.target.value} key='page'>
                        <input onKeyUp={(e) => e.keyCode === 13 } onInput={this.pageInputChange} value={this.state.pageInput}/>
                    </PageElement>
                    <PageElement type={'text'} text={this.getPageText1} key='text'/>
                    <PageElement type={'next'} event={'onClick'} key='next'>
                        <Icon type={'fast-forward'} className={nextDisabled}/>
                    </PageElement>
                    <PageElement type={'last'} event={'onClick'} key='last'>
                        <Icon type={'step-forward'} className={nextDisabled}/>
                    </PageElement>
                    <PageElement type={'pageSize'} event={'onSelected'} param={(value) => value} key='pageSize'>
                        <Select value={this.state.pagination.pageSize} orient={'up'}>
                            { this.getPageSizeOptionsDom() }
                        </Select>
                    </PageElement>
                    <PageElement type={'text'} text={this.getPageText2} key='total'/>
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
     * hoverTips: true,//默认是true，是false表示不展示鼠标放上去的提示信息
     * colspan: 1/function(value,record,key,index),//数字或者方法返回的数字，默认是1
     * children: []//数组内为对象，每个对象参数和columns一级参数一致。当一次参数存在children时，值对一级的name,key,fixed,hidden生效。children的fixed无效
     * }]
     *  */
    columns: PropTypes.array,
    selectMode: PropTypes.string,//'multi'
    selectable: PropTypes.func,//function(record){}
    selected: PropTypes.array,//被选中的数据编号
    onChange: PropTypes.func,//function(pagination, selectData){}
    onItemClick: PropTypes.func,//当某条数据被点击时，不可选中的数据不能被点击
    onAllClick: PropTypes.func,//全选被点击时
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
    customSort: PropTypes.bool,
    headerStrategy: PropTypes.string, // strech
    i18n: PropTypes.object, // {noDataText, pages, total} 所有需要国际化的内容集合
}

export default Grid;