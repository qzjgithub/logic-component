import React, {Component} from 'react';
import {Tree,TreeItem} from '../../logic';
import './index.styl';

import data from './data.json';

class TreeShow extends Component {
    constructor(props, context) {
        super(props, context);

    }

    onChanged = (o, n, s, st) => {
        // console.log(o,n,s,st);
    }

    onTextClick = (value, id, text, data) => {
        console.log(value, id, text, data);
        return true;
    }

    render() {
        let d = data;//[Object.assign(data[3],{ root: true })];
        // d[0]['children'][0]['children'] = null;
        let value = d[0]['id'];
        console.log(d);
        return <div className={"Show"}>
            <Tree data={d}
                  onTextClick={this.onTextClick}
                  search={true}
                  iconEnable={true}
                  value={value}
                  textKey={'display_name'}
                  valueKey={'id'}
                  selectMode={'auto'}
                  cable={false}
                  onChanged={this.onChanged}/>
        </div>
    }
}


export default TreeShow;