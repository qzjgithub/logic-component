import React, { Component } from 'react';
import { Button } from '../../logic';
import './index.styl';

class ButtonShow extends Component{
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
            {/*<Button>默认按钮</Button>
            <Button styleType={"medium"}>中宽按钮</Button>
            <Button styleType={"big"}>大宽按钮</Button>
            <br/>
            <br/>
            <Button styleType={"fixed"}>固定按钮</Button>
            <Button styleType={"fixed-medium"}>中宽按钮</Button>*/}
            <Button styleType={"fixed-big"} onClick={this.onClick}>大宽按钮</Button>
            <br/>
            <br/>
            <Button styleType={"fixed-big left"} disabled={this.state.disabled} onChanged={this.onChanged}></Button>
            {/*<Button styleType={"fixed-big right"}>大宽右按钮</Button>
            <Button styleType={"fixed-big left"}>大宽下拉按钮<i className={"icondown iconfont icon-triangledownfill"}></i></Button>*/}
        </div>
    }
}


export default ButtonShow;