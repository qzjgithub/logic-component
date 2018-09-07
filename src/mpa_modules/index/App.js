import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route , Redirect, Switch} from "react-router";
import Button from '../../comnponent/button';
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
            <Content>
                <Switch>
                    <Route path={'/button'} component={ Button } />
                    <Redirect from={'/'} to={'/button'}/>
                </Switch>
            </Content>
        </div>
    }
}

App.contextTypes = {
    store: PropTypes.object
}

export default connect(state => state )(App);
