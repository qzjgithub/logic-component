import React, { Component } from 'react';
import { Dragger } from '../../logic';
// import './index.styl';

const DragItem = Dragger.DragItem;

class DraggerShow extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            disabled : true
        }
    }

    render(){
        return <div className={"Show"}>
            <Dragger>
                <DragItem>拖拽1</DragItem>
                <DragItem>拖拽2</DragItem>
                <DragItem>拖拽3</DragItem>
                <DragItem>拖拽4</DragItem>
                <DragItem>拖拽5</DragItem>
                <DragItem>拖拽6</DragItem>
                <DragItem>拖拽7</DragItem>
                <DragItem>拖拽8</DragItem>
            </Dragger>
        </div>
    }
}


export default DraggerShow;