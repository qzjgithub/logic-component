import React, { Component } from 'react';
import { Dialog } from '../../logic';
// import {confirm} from '../../logic/component/default/dialog';
// import './index.styl';

const {confirm} = Dialog;

class DialogShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled : true
        }
    }

    show = () => {
        // this.refs['dialog'].show();
        const close = confirm('测试', {onConfirm: () => {
            return false;
        }});
        /* setTimeout(() => {
            close();
        }, 3000); */
    }

    render(){
        return <div className={"Show"}>
            <button onClick={this.show}>展示</button>
            <Dialog ref={'dialog'} 
                penetrate={true}
                draggable={false}
                title={'弹框测试'} 
                height={'40%'} 
                width={'40%'}>
                <p style={{whiteSpace:'nowrap'}} key='1'>
                    弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉
                    弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉
                </p>
                <p style={{whiteSpace:'nowrap'}} key='2'>
                    弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉
                    弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉
                </p>
                <p style={{whiteSpace:'nowrap'}} key='3'>
                    弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉
                    弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉
                </p>
                <ul style={{whiteSpace:'nowrap'}} key='4'>
                    <li key='1'>弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉</li>
                    <li key='2'>弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉</li>
                </ul>
                <p style={{whiteSpace:'nowrap'}} key='5'>
                    弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉
                    弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉
                </p>
                <p style={{whiteSpace:'nowrap'}} key='6'>
                    弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉
                    弹框撒点击十六点拍摄地九分PDF就怕是大家拉开圣诞节历史阿三是大盘经过；萨拉；啊的发我披肩发爱上对方就；埃里克大家发票四点九分萨拉
                </p>
            </Dialog>
        </div>
    }
}


export default DialogShow;