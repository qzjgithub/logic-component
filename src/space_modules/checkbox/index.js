import React, { Component } from 'react';
import { Checkbox } from '../../logic';

const CheckboxItem = Checkbox.CheckboxItem;

class CheckboxShow extends Component{
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
            <CheckboxItem/>
            <CheckboxItem checked={true}/>
            <CheckboxItem disabled={true}/>
            </div>
    }
}


export default CheckboxShow;