import React, { Component } from 'react';
import { Route , Redirect, Switch} from "react-router";
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'mpa-bridge-dom';

import test2 from '../../test/testComponent2';

import { Menu } from '../../logic';
import ButtonShow from '../../space_modules/button';
import SelectShow from '../../space_modules/select';
import TopSlipShow from '../../space_modules/topSlip';
import TreeShow from '../../space_modules/tree';
import './App.styl';

import CutoverShow from "../../space_modules/cutover";
import DialogShow from '../../space_modules/dialog';
import LoadingShow from '../../space_modules/loading';
import MenuShow from '../../space_modules/menu';
import FormShow from '../../space_modules/form';
import TimerShow from '../../space_modules/timer';
import CalendarShow from '../../space_modules/calendar';
import DatepickerShow from '../../space_modules/datepicker';
import DateRangepickerShow from '../../space_modules/dateRangepicker';
import TreeSelectShow from '../../space_modules/treeSelect';
import PaginationShow from "../../space_modules/pagination";
import GridShow from '../../space_modules/gridShow';
import InputShow from '../../space_modules/input';
import CheckboxShow from '../../space_modules/checkbox';
import DraggerShow from '../../space_modules/draager';

const MenuItem = Menu.MenuItem;

class App extends Component{
    constructor(props, context) {
        super(props, context);
    }

    test = () => {
        console.log('test');
    }

    render(){
        return <div className={'logic-demo'}>
            <Menu>
                <MenuItem text={<Link to={'/test2'}>测试</Link>} />
                <MenuItem text={<Link to={'/button'}>按钮</Link>}/>
                <MenuItem text={<Link to={'/input'}>输入框</Link>}/>
                <MenuItem text={<Link to={'/checkbox'}>复选框</Link>}/>
                <MenuItem text={<Link to={'/select'}>下拉框</Link>}/>
                <MenuItem text={<Link to={'/cutover'}>切换</Link>}/>
                <MenuItem text={<Link to={'/grid'}>列表</Link>}/>
                <MenuItem text={<Link to={'/topSlip'}>下滑提示</Link>}/>
                <MenuItem text={<Link to={'/tree'}>树节点</Link>}/>
                <MenuItem text={<Link to={'/dialog'}>弹框</Link>}/>
                <MenuItem text={<Link to={'/loading'}>加载中</Link>}/>
                <MenuItem text={<Link to={'/menu'}>菜单</Link>}/>
                <MenuItem text={<Link to={'/form'}>表单</Link>}/>
                <MenuItem text={<Link to={'/timer'}>时间</Link>}/>
                <MenuItem text={<Link to={'/calendar'}>日历</Link>}/>
                <MenuItem text={<Link to={'/datepicker'}>时间框</Link>}/>
                <MenuItem text={<Link to={'/dateRangepicker'}>时间选择框</Link>}/>
                <MenuItem text={<Link to={'/treeSelect'}>树下拉</Link>}/>
                <MenuItem text={<Link to={'/pagination'}>分页</Link>}/>
                <MenuItem text={<Link to={'/dragger'}>拖拽</Link>}/>
            </Menu>
            <Switch>
                <Route path={'/button'} component={ ButtonShow } key='button' />
                <Route path={'/input'} component={ InputShow } key='input' />
                <Route path={'/checkbox'} component={ CheckboxShow } key='checkbox' />
                <Route path={'/grid'} component={ GridShow } key='grid' />
                <Route path={'/test2'} component={ test2 } key='test2' />
                <Route path={'/select'} component={ SelectShow } key='select' />
                <Route path={'/cutover'} component={ CutoverShow } key='cutover' />
                <Route path={'/topSlip'} component={ TopSlipShow } key='topSlip' />
                <Route path={'/tree'} component={ TreeShow } key='tree' />
                <Route path={'/dialog'} component={ DialogShow } key='dialog' />
                <Route path={'/loading'} component={ LoadingShow } key='loading' />
                <Route path={'/menu'} component={ MenuShow } key='menu' />
                <Route path={'/form'} component={ FormShow } key='form' />
                <Route path={'/timer'} component={ TimerShow } key='timer' />
                <Route path={'/calendar'} component={ CalendarShow } key='calendar' />
                <Route path={'/datepicker'} component={ DatepickerShow } key='datepicker' />
                <Route path={'/dateRangepicker'} component={ DateRangepickerShow } key='dateRangepicker' />
                <Route path={'/treeSelect'} component={ TreeSelectShow } key='treeSelect' />
                <Route path={'/pagination'} component={ PaginationShow } key='pagination' />
                <Route path={'/dragger'} component={ DraggerShow } key='dragger' />
                <Redirect from={'/'} to={'/button'} key='direct'/>
            </Switch>
            {/*</Content>*/}
        </div>
    }
}

/*App.contextTypes = {
    store: PropTypes.object
}*/

// export default connect(state => state )(App);
export default App;