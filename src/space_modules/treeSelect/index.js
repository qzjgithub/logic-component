import React, {Component} from 'react';
import {TreeSelect} from '../../logic';
import './index.styl';

import data from './data.json';

class TreeSelectShow extends Component {
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
        let text = d[0]['display_name'];
        console.log(d);
        return <div className={"Show"}>
            <TreeSelect
                mode={'multi'}
                defaultText={'请选择节点'}
                initAll={true}
                // value={value}
                text={text}
                treeConfig={
                    {
                        data: d,
                        onTextClick : this.onTextClick,
                        search: true,
                        iconEnable:true,
                        textKey:'display_name',
                        valueKey: 'id',
                        selectMode: 'multi',
                    }
                }/>
        </div>
    }
}


export default TreeSelectShow;