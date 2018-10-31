import React, { Component } from 'react';
import logical from '../../../common/logical';
import Button from '../button';
import Input from '../input';
import config from './config.json';
import logic from './logic.json';
import './index.styl';

class Grid extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            param: "1"
        }
    }

    onButtonChanged =(o,n,s) => {
        console.log(o,n,s);
    }

    onInputChanged =(o,n,s) => {
        // console.log(o,n,s);
    }

    onButtonClick = (o,n,s) =>{
        // console.log(o,n,s);
    }

    onLogicalInit = (logical,status)=>{
        console.log(logical,status);
    }

    render(){
        console.log(this.state);
        return <div className={config.name}>
            <ul>
                <li><Button sign={'btn'} onChanged={this.onButtonChanged} onClick={this.onButtonClick}>添加</Button></li>
            </ul>
            <ul>列表</ul>
            <Input onChanged={this.onInputChanged}/>
        </div>
    }
}

export default logical(Grid,logic);