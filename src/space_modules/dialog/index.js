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
            <Dialog ref={'dialog'} 
                penetrate={true}
                draggable={true}
                title={'弹框测试'} 
                height={'40%'} 
                width={'40%'}>
                <p>弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉</p>
            </Dialog>
        </div>
    }
}


export default DialogShow;