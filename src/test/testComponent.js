import React, { Component } from 'react';
import Basic from '../common/Basic';
import './test.styl';

class test extends Component{

    divClick = (e) => {
        console.log(e.target);
        console.log("div2 is clicked.");
    }

    render(){
        return <Basic>
            <div sign={"div1"}>this is test</div>
            <div sign={"div2"} onClick={this.divClick}>第二个div</div>
            <p><a>内容:</a>一段文字</p>
            { ["sdf",21143,"w4r0"].map((v) => {
                return <b key={v}>{v}</b>
            }) }
        </Basic>
    }
}

export default test;