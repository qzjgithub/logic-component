import React, { Component } from 'react';

const basic = WrappedComponent => class extends Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return (<WrappedComponent
            {...this.props}
        />);
    }
};
export default basic;