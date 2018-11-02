import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route , Redirect, Switch} from "react-router";
import { Link } from 'react-router-dom';
import 'mpa-bridge-dom';

import test2 from '../../test/testComponent2';

import { Button , Grid } from '../../logic';
import ButtonShow from '../../space_modules/button';
import './App.styl';

import Header from '../../space_modules/header';

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
                <li><Link to={'/grid'}>列表</Link></li>
            </ul>
            <Switch>
                <Route path={'/button'} component={ ButtonShow } />
                <Route path={'/grid'} component={ Grid }/>
                <Route path={'/test2'} component={ test2 }/>
                <Redirect from={'/'} to={'/button'}/>
            </Switch>
            {/*</Content>*/}
        </div>
    }
}

App.contextTypes = {
    store: PropTypes.object
}

export default connect(state => state )(App);
