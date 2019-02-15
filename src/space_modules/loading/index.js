import React, { Component } from 'react';
import { Loading } from '../../logic';
// import './index.styl';

class LoadingShow extends Component{
    constructor(props, context) {
        super(props, context);
    }


    render(){
        return <div className={"Show"}>
           <Loading/>
        </div>
    }
}


export default LoadingShow;