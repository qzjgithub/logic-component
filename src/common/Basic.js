import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GenLogic from './GenLogic';
import GenBone from './GenBone';

class Basic extends Component {

    constructor(props, context) {
        super(props, context);
        this.logic = new GenLogic({
            "touched" : {
                target: 'div1',
                classTrue: "test-touched",
                styleTrue: { color: '#490344' },
                event : {
                    click: 0
                }
            }
        });

        this.state = {
            status : this.logic.values
        }
    }

    getBone = () => {
        return new GenBone(this.props.children,this.logic,this.state).get();
    }

    render(){
        return this.getBone();
    }
}

Basic.propTypes = {
    wrap : PropTypes.bool,
    logic : PropTypes.object
}

module.exports = Basic;