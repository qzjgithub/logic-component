import React, { Component } from 'react';
import { Menu , Loading} from '../../logic';
// import './index.styl';

const MenuItem = Menu.MenuItem;

class MenuShow extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return <div className={"Show"}>
            <Menu checkSign={true}>
                <Loading/>
                {/*<MenuItem value={'1'} text={'1'}>
                    <MenuItem value={'2'} text={'2'}/>
                </MenuItem>
                <MenuItem value={'3'} text={'3'}/>*/}
            </Menu>
        </div>
    }
}


export default MenuShow;