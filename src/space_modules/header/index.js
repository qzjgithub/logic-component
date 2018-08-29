import React, { Component } from 'react';

class Header extends Component{
    constructor(props, context) {
        super(props, context);
        console.log(props.location);
    }

    render(){
        return <header>这是头部</header>
    }
}

export default Header;