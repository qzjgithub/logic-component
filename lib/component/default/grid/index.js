'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _pagination2 = require('../pagination');

var _pagination3 = _interopRequireDefault(_pagination2);

var _select = require('../select');

var _select2 = _interopRequireDefault(_select);

require('./index.styl');

var _Util = require('../../../common/Util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _select2.default.Option;
var PageElement = _pagination3.default.PageElement;

var Grid = function (_Component) {
    _inherits(Grid, _Component);

    function Grid(props, context) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.initColumnsMap(props.columns);
        _this.state = Object.assign({
            widthRecord: {}
        }, _this.initParam(props));
        return _this;
    }

    _createClass(Grid, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var columns = nextProps.columns;

            this.initColumnsMap(columns);
            this.setState(this.initParam(Object.assign({}, nextProps)));
        }
    }, {
        key: 'render',
        value: function render() {
            var data = this.getDisplayData();
            var _state$pagination = this.state.pagination,
                curPage = _state$pagination.curPage,
                pages = _state$pagination.pages;

            var prevDisabled = curPage <= 1 ? 'disabled' : '';
            var nextDisabled = curPage >= pages ? 'disabled' : '';
            return _react2.default.createElement(
                'section',
                { className: 'Grid', onDragOver: this.allCursor },
                _react2.default.createElement(
                    'div',
                    { draggable: true,
                        onDragStart: this.setCursor,
                        onDrag: this.moveRewidth,
                        onDragEnd: this.endRewidth,
                        onMouseUp: this.endRewidth,
                        className: 'Grid-rewidth',
                        ref: 'rewidth' },
                    ' '
                ),
                _react2.default.createElement(
                    'header',
                    { className: 'Grid-header' },
                    this.getHeaderDom()
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'scroll-y', onScroll: this.bodyScroll },
                    _react2.default.createElement(
                        'ul',
                        { className: 'Grid-body' },
                        this.getBodyDom(data)
                    )
                ),
                _react2.default.createElement(
                    'footer',
                    { className: 'Grid-footer' },
                    _react2.default.createElement(
                        _pagination3.default,
                        _extends({}, this.state.pagination, { onChange: this.pageChange }),
                        _react2.default.createElement(
                            'p',
                            null,
                            ' '
                        ),
                        _react2.default.createElement(
                            PageElement,
                            { type: 'first', event: 'onClick' },
                            _react2.default.createElement(_icon2.default, { type: 'zuo', className: prevDisabled })
                        ),
                        _react2.default.createElement(
                            PageElement,
                            { type: 'prev', event: 'onClick' },
                            _react2.default.createElement(_icon2.default, { type: 'zuo', className: prevDisabled })
                        ),
                        _react2.default.createElement(
                            PageElement,
                            { type: 'page', event: 'onKeyUp', param: function param(e) {
                                    return e.target.value;
                                } },
                            _react2.default.createElement('input', { onKeyUp: function onKeyUp(e) {
                                    return e.code === 13;
                                }, onInput: this.pageInputChange, value: this.state.pageInput })
                        ),
                        _react2.default.createElement(PageElement, { type: 'text', text: this.getPageText1 }),
                        _react2.default.createElement(
                            PageElement,
                            { type: 'next', event: 'onClick' },
                            _react2.default.createElement(_icon2.default, { type: 'gengduo', className: nextDisabled })
                        ),
                        _react2.default.createElement(
                            PageElement,
                            { type: 'last', event: 'onClick' },
                            _react2.default.createElement(_icon2.default, { type: 'gengduo', className: nextDisabled })
                        ),
                        _react2.default.createElement(
                            PageElement,
                            { type: 'pageSize', event: 'onSelected', param: function param(value) {
                                    return value;
                                } },
                            _react2.default.createElement(
                                _select2.default,
                                { value: this.state.pagination.pageSize, orient: 'up' },
                                this.getPageSizeOptionsDom()
                            )
                        ),
                        _react2.default.createElement(PageElement, { type: 'text', text: this.getPageText2 })
                    )
                )
            );
        }
    }]);

    return Grid;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.columnsMap = {};
    this.sortedData = [];
    this.displayIndex = [];

    this.initColumnsMap = function (columns) {
        _this2.columnsMap = {};
        if (!(0, _Util.isArray)(columns)) {
            columns = [];
        }
        columns.forEach(function (column, index) {
            _this2.columnsMap[column['key']] = index;
        });
    };

    this.initParam = function (props) {
        var pagination = props.pagination,
            data = props.data,
            sort = props.sort,
            order = props.order,
            pageMode = props.pageMode,
            pageSizeOptions = props.pageSizeOptions;

        if (!(0, _Util.isArray)(data)) {
            data = [];
        }
        data.forEach(function (d, ind) {
            d['Grid_index'] = ind;
        });
        if (!(0, _Util.isArray)(pageSizeOptions)) {
            pageSizeOptions = [10, 20, 30];
        }
        pageSizeOptions = pageSizeOptions.filter(function (v) {
            return (0, _Util.isNumber)(v) && v !== 0;
        });
        if (!(0, _Util.isKVObject)(pagination)) {
            pagination = {};
        }
        var _pagination = pagination,
            pageSize = _pagination.pageSize;

        if (!pageSize || pageSizeOptions.indexOf(pageSize) < 0) {
            pageSize = pageSizeOptions[0];
        }
        if (!(0, _Util.isNumber)(pageSize)) {
            pageSize = Number(pageSize) || 20;
        }
        pagination.pageSize = pageSize;
        if (!pageMode || pageMode === 'auto') {
            pagination.total = data.length;
        }
        if (!(0, _Util.isNumber)(pagination.total)) {
            pagination.total = Number(pagination.total) || 0;
        }
        pagination.pages = Math.ceil(pagination.total / pagination.pageSize);
        if (!pagination.curPage) {
            pagination.curPage = pagination.total ? 1 : 0;
        }
        return {
            pagination: pagination, pageSizeOptions: pageSizeOptions, pageInput: pagination.curPage,
            selected: [], sort: sort, order: order
        };
    };

    this.getDisplayData = function () {
        var _props = _this2.props,
            data = _props.data,
            pageMode = _props.pageMode;

        data = JSON.parse(JSON.stringify(data));
        if (!data || !data.length) {
            return data;
        }
        var _state$pagination2 = _this2.state.pagination,
            curPage = _state$pagination2.curPage,
            pageSize = _state$pagination2.pageSize,
            total = _state$pagination2.total;

        data = _this2.sortData(data);
        _this2.displayIndex = [];
        switch (pageMode) {
            case 'back':
                data.forEach(function (d) {
                    var ind = d['Grid_index'];
                    _this2.displayIndex.push(ind);
                });
                return data;
            case 'auto':
            default:
                var start = ((curPage || 1) - 1) * pageSize;
                var end = curPage * pageSize;
                if (end > total) {
                    end = total;
                }
                var newData = [];
                for (; start < end; start++) {
                    var d = data[start];
                    var ind = d['Grid_index'];
                    if (d) {
                        _this2.displayIndex.push(ind);
                        newData.push(d);
                    }
                }
                return newData;
        }
    };

    this.sortData = function (data) {
        var columns = _this2.props.columns;
        var _state = _this2.state,
            sort = _state.sort,
            order = _state.order;

        var columnInd = _this2.columnsMap[sort];
        var column = (0, _Util.isRealOrZero)(columnInd) ? columns[columnInd] || {} : {};
        var sorter = column['sorter'];
        if (sorter) {
            data.sort(sorter);
        } else {
            data.sort();
        }
        if (order === 'desc') {
            data.reverse();
        }
        _this2.sortedData = data;
        return data;
    };

    this.pageChange = function (param) {
        _this2.setState({
            pagination: param,
            pageInput: param.curPage
        }, function () {
            _this2.triggerChange();
        });
    };

    this.selectAll = function () {
        var pageMode = _this2.props.pageMode;
        var selected = _this2.state.selected;

        var displayIndex = _this2.displayIndex;
        switch (pageMode) {
            case 'back':
                if (selected.length === displayIndex.length) {
                    selected = [];
                } else {
                    selected = displayIndex;
                }
                break;
            default:
                var allSelected = true;
                var selectedDisplay = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = displayIndex[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var ind = _step.value;

                        var selInd = selected.indexOf(ind);
                        if (selInd < 0) {
                            selected.push(ind);
                            allSelected = false;
                        } else {
                            selectedDisplay.push(ind);
                            selected.splice(selInd, 1);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (allSelected === false) {
                    selected = selected.concat(selectedDisplay);
                }
        }
        _this2.setState({
            selected: selected
        }, function () {
            _this2.triggerChange();
        });
    };

    this.selectOne = function (gInd) {
        var selectMode = _this2.props.selectMode;
        var selected = _this2.state.selected;

        var ind = selected.indexOf(gInd);
        switch (selectMode) {
            case 'multi':
                ind < 0 ? selected.push(gInd) : selected.splice(ind, 1);
                break;
            default:
                selected = ind < 0 ? [gInd] : [];
        }
        _this2.setState({
            selected: selected
        }, function () {
            _this2.triggerChange();
        });
    };

    this.setSort = function (key) {
        var _state2 = _this2.state,
            sort = _state2.sort,
            order = _state2.order;

        if (sort !== key) {
            order = 'asc';
        } else {
            order = order !== 'desc' ? 'desc' : 'asc';
        }
        _this2.setState({
            sort: key,
            order: order
        }, function () {
            _this2.triggerChange();
        });
    };

    this.pageInputChange = function (e) {
        _this2.setState({
            pageInput: e.target.value
        });
    };

    this.startRewidth = function (e, key) {
        var old = e.target.offsetLeft;
        var rewidthDom = _this2.refs['rewidth'];
        rewidthDom.style.left = old - 10 + 'px';
        rewidthDom.style['z-index'] = 1;
        _this2.key = key;
        _this2.oldW = e.target.parentElement.clientWidth;
        _this2.oldL = old - 10;
        _this2.oldX = e.pageX;
    };

    this.setCursor = function (e) {
        e.dataTransfer.effectAllowed = 'move';
    };

    this.allCursor = function (e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    this.moveRewidth = function (e) {
        if (!_this2.oldX && _this2.oldX !== 0) return;
        var rewidthDom = _this2.refs['rewidth'];
        var nextLeft = _this2.oldL + e.pageX - _this2.oldX;
        rewidthDom.style.left = nextLeft + 'px';
    };

    this.endRewidth = function (e) {
        e.stopPropagation();
        var rewidthDom = _this2.refs['rewidth'];
        rewidthDom.style['z-index'] = -1;
        var gap = e.pageX - _this2.oldX;
        var newW = _this2.oldW + gap;
        if (newW < 50) {
            newW = 50;
        }
        _this2.oldX = null;
        _this2.oldL = null;
        var widthRecord = _this2.state.widthRecord;
        widthRecord[_this2.key] = newW + 'px';
        _this2.setState({
            widthRecord: widthRecord
        });
    };

    this.bodyScroll = function (e) {
        var scrollLeft = e.target.scrollLeft;
        e.target.previousSibling.scrollLeft = scrollLeft;
    };

    this.triggerChange = function () {
        if (_this2.props.onChange) {
            var data = _this2.props;
            var pageInfo = JSON.parse(JSON.stringify(_this2.state.pagination));
            var sld = _this2.state.selected.map(function (ind) {
                return data[ind];
            });
            sld = JSON.parse(JSON.stringify(sld));
            _this2.props.onChange(pageInfo, sld);
        }
    };

    this.getPageText1 = function (param) {
        var pages = param.pages;
        var pageText1 = _this2.props.pageText1;

        if (pageText1) {
            pageText1 = pageText1.replace('${pages}', pages);
        } else {
            pageText1 = '\u5171' + pages + '\u9875';
        }
        return _react2.default.createElement(
            'span',
            null,
            pageText1
        );
    };

    this.getPageText2 = function (param) {
        if (!_this2.props.data || !_this2.props.data.length) {
            return _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                    'span',
                    null,
                    '\u65E0\u6570\u636E'
                )
            );
        }
        var curPage = param.curPage,
            pageSize = param.pageSize,
            total = param.total;

        var start = ((curPage || 1) - 1) * pageSize + 1;
        var end = curPage * pageSize;
        if (end > total) {
            end = total;
        }
        var pageText2 = _this2.props.pageText2;

        if (pageText2) {
            pageText2 = pageText2.replace('${start}', start).replace('${end}', end).replace('${total}', total);
        } else {
            pageText2 = start + ' - ' + end + ' \u5171' + total + '\u6761';
        }
        return _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
                'span',
                null,
                pageText2
            )
        );
    };

    this.getPageSizeOptionsDom = function () {
        return _this2.state.pageSizeOptions.map(function (pageSize) {
            return _react2.default.createElement(
                Option,
                { value: pageSize, key: pageSize },
                pageSize
            );
        });
    };

    this.getHeaderDom = function () {
        var _props2 = _this2.props,
            columns = _props2.columns,
            selectMode = _props2.selectMode;
        var _state3 = _this2.state,
            sort = _state3.sort,
            order = _state3.order,
            widthRecord = _state3.widthRecord;

        if ((0, _Util.isArray)(columns)) {
            var dom = columns.map(function (column) {
                var name = column.name,
                    key = column.key,
                    hidden = column.hidden,
                    width = column.width;

                if (hidden) return '';
                width = widthRecord[key] || width;
                var style = {};
                if (width) {
                    style = {
                        width: width,
                        flex: 'none'
                    };
                }
                return _react2.default.createElement(
                    'div',
                    { className: 'th', style: style, onClick: function onClick() {
                            return _this2.setSort(key);
                        } },
                    _react2.default.createElement(
                        'span',
                        null,
                        name
                    ),
                    _this2.getSortIcon(key, sort, order),
                    _react2.default.createElement(
                        'a',
                        { className: 'rewidth',
                            onMouseDown: function onMouseDown(e) {
                                return _this2.startRewidth(e, key);
                            } },
                        ' '
                    )
                );
            });
            if (selectMode === 'multi') {
                var selectAll = !!_this2.displayIndex.length;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _this2.displayIndex[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var ind = _step2.value;

                        if (_this2.state.selected.indexOf(ind) < 0) {
                            selectAll = false;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                var type = selectAll ? 'fangxingxuanzhong' : 'fangxingweixuanzhong';
                dom.unshift(_react2.default.createElement(
                    'div',
                    { className: 'th select' },
                    _react2.default.createElement(_icon2.default, { type: type, onClick: _this2.selectAll })
                ));
            }
            return dom;
        } else {
            return '';
        }
    };

    this.getSortIcon = function (key, sort, order) {
        if (key === sort) {
            var dom = [];
            dom.push(_react2.default.createElement(_icon2.default, { type: 'triangleupfill', className: 'sort ' + (order !== 'desc' ? 'active' : '') }));
            dom.push(_react2.default.createElement(_icon2.default, { type: 'triangledownfill', className: 'sort desc ' + (order === 'desc' ? 'active' : '') }));
            return dom;
        } else {
            return '';
        }
    };

    this.getBodyDom = function (data) {
        var columns = _this2.props.columns;

        if ((0, _Util.isArray)(columns)) {
            return data.map(function (d) {
                var gInd = d['Grid_index'];
                var cls = _this2.state.selected.indexOf(gInd) > -1 ? 'selected' : '';
                return _react2.default.createElement(
                    'li',
                    { className: 'tr ' + cls, key: gInd, onClick: function onClick() {
                            return _this2.selectOne(gInd);
                        } },
                    _this2.getTrDom(d, gInd)
                );
            });
        } else {
            return '';
        }
    };

    this.getTrDom = function (d, gInd) {
        var _props3 = _this2.props,
            columns = _props3.columns,
            selectMode = _props3.selectMode;
        var widthRecord = _this2.state.widthRecord;

        var dom = columns.map(function (column) {
            var hidden = column.hidden,
                width = column.width,
                render = column.render,
                key = column.key;

            if (hidden) {
                return '';
            }
            width = widthRecord[key] || width;
            var style = {};
            if (width) {
                style = {
                    width: width,
                    flex: 'none'
                };
            }
            var value = d[key];
            return _react2.default.createElement(
                'div',
                { className: 'td', style: style },
                render ? render(value, d, key, gInd) : (0, _Util.isRealOrZero)(value) ? value : ''
            );
        });
        if (selectMode === 'multi') {
            var type = 'fangxingweixuanzhong';
            if (_this2.state.selected.indexOf(gInd) > -1) {
                type = 'fangxingxuanzhong';
            }
            dom.unshift(_react2.default.createElement(
                'li',
                { className: 'td select' },
                _react2.default.createElement(_icon2.default, { type: type })
            ));
        }
        return dom;
    };
};

Grid.propTypes = {
    data: _propTypes2.default.array,
    pagination: _propTypes2.default.object,
    columns: _propTypes2.default.array, //[{name:'',key:'',render:func(value,record,key,index),sorter:func(a,b),width: '',hidden:false}]
    selectMode: _propTypes2.default.string, //'multi'
    onChange: _propTypes2.default.func,
    pageMode: _propTypes2.default.string, //'auto','back'
    sort: _propTypes2.default.string,
    order: _propTypes2.default.string, //asc,desc
    pageSizeOptions: _propTypes2.default.array,
    pageText1: _propTypes2.default.string,
    pageText2: _propTypes2.default.string
};

exports.default = Grid;