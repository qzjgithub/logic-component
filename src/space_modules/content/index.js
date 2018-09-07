import React, { Component } from 'react';
import PropTypes from "prop-types";

class Content extends Component{
    constructor(props, context) {
        super(props, context);
    }

    render(){
        console.log(this.props);
        return <div>
            { this.props.children }
        </div>
    }
}


Content.contextTypes = {
    store: PropTypes.object
}

export default Content;