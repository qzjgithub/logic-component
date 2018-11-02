import React, { Component } from 'react';
import { Button } from '../../logic';
import './index.styl';

class ButtonShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            i18n : {}
        }
    }

    render(){
        return <div className={"buttonShow"}>
            <Button>默认按钮</Button>
            <Button styleType={"medium"}>中宽按钮</Button>
            <Button styleType={"big"}>大宽按钮</Button>
            <br/>
            <br/>
            <Button styleType={"fixed"}>固定按钮</Button>
            <Button styleType={"fixed-medium"}>中宽按钮</Button>
            <Button styleType={"fixed-big"}>大宽按钮</Button>
            <br/>
            <br/>
            <Button styleType={"fixed-big left"}>大宽左按钮</Button>
            <Button styleType={"fixed-big right"}>大宽右按钮</Button>
            <Button styleType={"fixed-big left"}>大宽下拉按钮<i className={"icondown iconfont icon-triangledownfill"}></i></Button>
        </div>
    }
}


export default ButtonShow;