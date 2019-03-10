import React, { Component } from 'react';
import logical from '../../../common/logical';
import Button from '../button/index';
import Input from '../input/index';
import config from './config.json';
import logic from './logic.js';
import './index.styl';

class Grid extends Component{
    constructor(props, context) {
        super(props, context);
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
        return <div>
            <ul>
                <li><Button sign={'btn'} onChanged={this.onButtonChanged} onClick={this.onButtonClick}>
                    <a>+</a>
                    添加
                </Button></li>
            </ul>
            <ul>列表</ul>
            <Input onChanged={this.onInputChanged}/>
        </div>
    }
}

export default logical(Grid,logic,config);