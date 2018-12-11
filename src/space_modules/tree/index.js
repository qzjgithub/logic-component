import React, { Component } from 'react';
import { Tree } from '../../logic';
import './index.styl';

import data from './data.json';

class TreeShow extends Component{
    constructor(props, context) {
        super(props, context);

    }

    onChanged = (o,n,s,st) => {
        // console.log(o,n,s,st);
    }

    render(){
        let d = data;//[Object.assign(data[3],{ root: true })];
        return <div className={"Show"}>
            {d.map((item, index) => {
                return <Tree key={item['id']}
                             data={ item }
                             param={{ iconEnable:false }}
                             onChanged={this.onChanged}
                             last={index == (d.length - 1)}/> })}
        </div>
    }
}


export default TreeShow;