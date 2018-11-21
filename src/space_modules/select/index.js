import React, { Component } from 'react';
import { Select } from '../../logic';
import './index.styl';

class SelectShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled : true
        }
    }

    onClick = () => {
        this.setState({
            disabled : !this.state.disabled
        });
    }

    onChanged = (s,o,n,state) => {
        console.log(s,o,n,state);
    }

    render(){
        return <div className={"Show"}>
            <Select param={{ data:
                    [{value: '1',text: 'apple'},{value:'2',text:'orange'}],
                    value: '1'
            }} />
        </div>
    }
}


export default SelectShow;