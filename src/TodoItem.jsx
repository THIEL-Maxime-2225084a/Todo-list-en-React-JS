import React, { Component } from 'react'
import './App.css'
import { MdCheckBoxOutlineBlank, MdCalendarMonth, MdEdit, MdDelete } from 'react-icons/md'

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="item-container">
        <button><MdCheckBoxOutlineBlank/></button>
        {this.props.title}
        <button><MdCalendarMonth/></button>
        <button><MdEdit/></button> 
        <button onClick={() => this.props.onDelete(this.props.id)}><MdDelete/></button>
        <br/>
      </div>
    );
  }
}