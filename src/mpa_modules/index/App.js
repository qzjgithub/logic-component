import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route , Redirect, Switch} from "react-router";
import { Link } from 'react-router-dom';
import 'mpa-bridge-dom';

import test2 from '../../test/testComponent2';

import { Button , Grid , Select } from '../../logic';
import ButtonShow from '../../space_modules/button';
import SelectShow from '../../space_modules/select';
import TopSlipShow from '../../space_modules/topSlip';
import TreeShow from '../../space_modules/tree';
import './App.styl';

import Header from '../../space_modules/header';
import CutoverShow from "../../space_modules/cutover";
import DialogShow from '../../space_modules/dialog';
import LoadingShow from '../../space_modules/loading';

class App extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return <div>
            <Header/>
            {/*<Content>*/}
            <ul>
                <li><Link to={'/test2'}>测试</Link></li>
                <li><Link to={'/button'}>按钮</Link></li>
                <li><Link to={'/select'}>下拉框</Link></li>
                <li><Link to={'/cutover'}>切换</Link></li>
                <li><Link to={'/grid'}>列表</Link></li>
                <li><Link to={'/topSlip'}>下滑提示</Link></li>
                <li><Link to={'/tree'}>树节点</Link></li>
                <li><Link to={'/dialog'}>弹框</Link></li>
                <li><Link to={'/loading'}>加载中</Link></li>
            </ul>
            <Switch>
                <Route path={'/button'} component={ ButtonShow } />
                <Route path={'/grid'} component={ Grid }/>
                <Route path={'/test2'} component={ test2 }/>
                <Route path={'/select'} component={ SelectShow }/>
                <Route path={'/cutover'} component={ CutoverShow }/>
                <Route path={'/topSlip'} component={ TopSlipShow }/>
                <Route path={'/tree'} component={ TreeShow }/>
                <Route path={'/dialog'} component={ DialogShow }/>
                <Route path={'/loading'} component={ LoadingShow }/>
                <Redirect from={'/'} to={'/dialog'}/>
            </Switch>
            {/*</Content>*/}
        </div>
    }
}

App.contextTypes = {
    store: PropTypes.object
}

export default connect(state => state )(App);
