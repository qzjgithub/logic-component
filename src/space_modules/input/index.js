import React, { Component } from 'react';
import { Input } from '../../logic';

class InputShow extends Component{
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
            <Input/>
            <Input disabled={true}/>
            </div>
    }
}


export default InputShow;