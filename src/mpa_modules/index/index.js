import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, hashHistory} from 'react-router';
// import 'antd/dist/antd.css';
// import 'antd/lib/date-picker/style/index.css';
// import 'antd/lib/input/style/index.css';
// import './component/default/ASSETS/font/iconfont.css';
import createHashHistory from 'history/createHashHistory';

import configureStore from '../../redux/store/configureStore';
import App from './App';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const state = window.__initialState__ || undefined;
const store = configureStore(hashHistory, state);
const history = createHashHistory();
/*<Provider store={ store }>
        <Router history={ history }>
            <LocaleProvider locale={zh_CN}>
            <section>
                <Route path="/" component={ App } />
            </section>
            </LocaleProvider>
        </Router>
    </Provider>,*/
render(
    <Provider store={ store }>
        <Router history={ history }>
            <LocaleProvider locale={zh_CN}>
                <section>
                    <Route path="/" component={ App } />
                </section>
            </LocaleProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);
