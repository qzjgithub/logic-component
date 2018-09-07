import React, { Component } from 'react';
import basic from '../basic';

class Button extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return <button>这是按钮</button>
    }
}

export default basic(Button);