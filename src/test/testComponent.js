import React, { Component } from 'react';
import Basic from '../logic/common/Basic';
import './test.styl';

import logic from './test.js';

class test extends Component{

    constructor(props, context){
        super(props,context);
        this.state = {
            param : "aaaaa"
        }
    }

    divClick = (e,param,oldV,newV) => {
        console.log(this.state.param);
        console.log(e);
        console.log(param);
        console.log(oldV);
        console.log(newV);
        console.log("div2 is clicked.");
        return e;
    }

    onChanged = (o,n,s)=>{
        console.log(o,n,s);
        console.log(this.state.param);
    }

    render(){
        return <Basic logic={logic} onChanged={this.onChanged}>
            <section>
            <div sign={"div1"} style={{backgroundColor: '#977876',color: 'white'}}>this is test</div>
            <div sign={"div2"} onClick={(e,oldv,newv) => {this.divClick(e.target,"param1",oldv,newv)}}>第二个div</div>
            <p><a>内容:</a>一段文字</p>
            { ["sdf",21143,"w4r0"].map((v) => {
                return <b key={v}>{v}</b>
            }) }
            </section>
        </Basic>
    }
}

export default test;