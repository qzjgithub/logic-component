import React, { Component } from 'react';
import { TopSlip } from '../../logic';
import './index.styl';

class TopSlipShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            message : '一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示一句提示'
        }
    }

    onChanged = (s,o,n,state) => {
        console.log(s,o,n,state);
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                message: "change message"
            });
        },2000);
    }

    render(){
        return <div className={"Show"}>
            <TopSlip param={{message:this.state.message, increase: true}}/>
        </div>
    }
}


export default TopSlipShow;