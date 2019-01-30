import React, { Component } from 'react';
import { Cutover } from '../../logic';
// import './index.styl';

const CutoverItem = Cutover.CutoverItem;

class CutoverShow extends Component{
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

    render(){
        return <div className={"Show"}>
            <Cutover initValue={'1'}>
                <CutoverItem value={'1'}>每日</CutoverItem>
                <CutoverItem value={'2'}>每月</CutoverItem>
            </Cutover>
        </div>
    }
}


export default CutoverShow;