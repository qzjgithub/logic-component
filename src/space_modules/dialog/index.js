import React, { Component } from 'react';
import { Dialog } from '../../logic';
// import './index.styl';

class DialogShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled : true
        }
    }

    show = () => {
        this.refs['dialog'].show();
    }

    render(){
        return <div className={"Show"}>
            <button onClick={this.show}>展示</button>
            <Dialog ref={'dialog'} title={'弹框测试'}>弹框</Dialog>
        </div>
    }
}


export default DialogShow;