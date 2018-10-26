import React, { Component } from 'react';
import Basic from '../common/Basic';

class test extends Component{

    divClick = () => {
        console.log("div2 is clicked.");
    }

    render(){
        return <Basic>
            <div>this is test</div>
            <div sign={"div2"} onClick={this.divClick}>第二个div</div>
            <p><a>内容:</a>一段文字</p>
        </Basic>
    }
}

export default test;