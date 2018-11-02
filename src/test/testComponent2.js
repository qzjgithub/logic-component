import React, { Component } from 'react';
import logical from '../logic/common/logical';
import './test.styl';

import logic from './test.js';

class test2 extends Component{

    constructor(props, context){
        super(props,context);
        this.state = {
            param : "aaaaa"
        }
    }

    divClick = (e,param,oldV,newV) => {
        // console.log(this.state.param);
        console.log(e);
        // console.log(param);
        // console.log(oldV);
        // console.log(newV);
        console.log("div2 is clicked.");
    }

    render(){
        return <section>
            <div sign={"div1"} style={{backgroundColor: '#977876',color: 'white'}}>this is test</div>
            <div sign={"div2"} onClick={(e,o,n) => {this.divClick(e.target,"param1",o,n)}}>第二个div</div>
            <p><a>内容:</a>一段文字</p>
            { ["sdf",21143,"w4r0"].map((v) => {
                return <b key={v}>{v}</b>
            }) }
        </section>
    }
}

export default logical(test2, logic);