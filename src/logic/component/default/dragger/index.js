import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.styl';
import 'moment/locale/en-au';
import'moment/locale/zh-cn';

class Dragger extends Component{
    order;
    dragIndex;
    dropIndex;
    constructor(props, context) {
        super(props, context);
        this.state = {

        }
    }

    dragOver = (e) => {
        e.preventDefault();
    }

    drop = (e) => {
        e.preventDefault();
        let orderIndex = this.order.indexOf(this.dragIndex);
        this.order.splice(orderIndex,1);
        this.order.push(this.dragIndex);
        this.setState({});
    }

    childDragStart = (dragIndex) => {
        this.dragIndex = dragIndex;
    }

    childDrop = (dropIndex) => {
        if(this.dragIndex === dropIndex) {
            return;
        }
        this.dropIndex = dropIndex;
        let orderIndex = this.order.indexOf(this.dragIndex);
        let targetIndex = this.order.indexOf(dropIndex);
        this.order.splice(orderIndex,1);
        this.order.splice(targetIndex,0,this.dragIndex);
        this.setState({});
    }

    childDragEnd = (e,index) => {
        if(this.props.onChanged){
            this.props.onChanged(this.order,this.targetIndex,this.dropIndex);
        }
    }

    getChildrenDom = () => {
        let { children } = this.props;
        if(!children){
            children = [];
        }else if(typeof children.length !== 'number'){
            children = [ children ];
        }
        let len = children.length;
        if(this.order &&  this.order.length !== len){
            this.order = null;
        }
        if(!this.order){
            this.order = [];
            let i = 0;
            while(i < len){
                this.order.push(i);
                i++;
            }
        }
        return this.order.map((index)=>{
            return React.cloneElement(children[index],{
                index: index,
                oncDragStart : this.childDragStart,
                oncDrop: this.childDrop,
                oncDragEnd: this.childDragEnd
            });
        });
    }

    render(){
        return <ul {...this.props}
            className={`Dragger ${this.props.className||''}`} 
            onDragOver={this.dragOver}
            onDrop={this.drop}
        >
            {this.getChildrenDom()}
        </ul>
    }
}

Dragger.propTypes = {
    onChanged: PropTypes.func//(order,dragIndex, dropIndex)=>{}
}

class DragItem extends Component{
    constructor(props, context) {
        super(props, context);
    }

    dragStart = (e) => {
        this.props.oncDragStart(this.props.index);
    }

    dragOver = (e) => {
        e.preventDefault();
    }

    drop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.props.oncDrop(this.props.index);
    }

    dragEnd = (e) => {
        e.preventDefault();
        if(this.props.onDragEnd){
            this.props.onDragEnd(e,this.props.index);
        }
        this.props.oncDragEnd(this.props.index);
    }

    render(){
        return <li {...this.props}
            draggable={true} 
            onDragStart={this.dragStart}
            onDragOver={this.dragOver}
            onDrop={this.drop}
            onDragEnd={this.dragEnd}
        >
            {this.props.children}
        </li>
    }
}

DragItem.propTypes = {
    index: PropTypes.number,//在原始序列中的坐标
    oncDragStart: PropTypes.func,
    oncDrop: PropTypes.func,
    oncDragEnd: PropTypes.func
}

Dragger.DragItem = DragItem;

export default Dragger;