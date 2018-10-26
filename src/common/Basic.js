import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenLogic from './GenLogic';

class Basic extends Component {

    constructor(props, context) {
        super(props, context);
        this.logic = new GenLogic();
    }

    render(){
        console.log(this.props.children);
        let c = this.props.children;
        /*c[0].props['onClick'] = () => {
            console.log("div1 is clicked.");
        }*/
        let newC = React.cloneElement(c[0],{
            'onClick' : () => {
                console.log("div1 is cliced.")
            }
        });
        // c.push(newC);
        return newC;
    }
}

Basic.propTypes = {
    wrap : PropTypes.bool,
    logic : PropTypes.object
}

module.exports = Basic;