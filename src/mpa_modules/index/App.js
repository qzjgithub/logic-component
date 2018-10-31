import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route , Redirect, Switch} from "react-router";
import Button from '../../comnponent/default/button';
import Grid from '../../comnponent/default/grid';
import test from '../../test/testComponent';
import test2 from '../../test/testComponent2';
import './App.styl';

import Header from '../../space_modules/header';

import Content from "../../space_modules/content";

class App extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return <div>
            <Header/>
            {/*<Content>*/}
                <Switch>
                    <Route path={'/button'} component={ Button } />
                    <Route path={'/test'} component={ test } />
                    <Route path={'/grid'} component={ Grid }/>
                    <Route path={'/test2'} component={ test2 }/>
                    <Redirect from={'/'} to={'/test'}/>
                </Switch>
            {/*</Content>*/}
        </div>
    }
}

App.contextTypes = {
    store: PropTypes.object
}

export default connect(state => state )(App);
