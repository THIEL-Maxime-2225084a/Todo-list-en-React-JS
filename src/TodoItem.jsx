import React, { Component } from 'react';
import './App.css';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdCalendarMonth, MdEdit, MdDelete } from 'react-icons/md';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editedTitle: this.props.title,
    };
  }

  editButtonClick = () => {
    this.setState({ 
      editing: true 
    });
  }

  inputChange = (evt) => {
    this.setState({ 
      editedTitle: evt.target.value 
    });
  }

  inputKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      this.editTitle();
    }
  }

  editTitle = () => {
    if (this.state.editedTitle) {
      onEdit(this.props.id, this.state.editedTitle);
      this.setState({ editing: false });
    }
  }

  render() {
    const { id, title, selected, onCheck, onDelete, onEdit } = this.props;
    const { editing, editedTitle } = this.state;
    return (
      <div className="item-container">
        {selected ? (<button onClick={() => onCheck(id)}><MdCheckBox/></button>) : (<button onClick={() => onCheck(id)}><MdCheckBoxOutlineBlank/></button>)}
        {editing ? (<input type="text" value={editedTitle} onChange={this.inputChange} onKeyDown={this.inputKeyDown}/>) : (title)}
        <button><MdCalendarMonth/></button>
        {editing ? (<button onClick={this.editTitle}><MdEdit/></button>) : (<button onClick={this.editButtonClick}><MdEdit/></button>)}
        <button onClick={() => onDelete(id)}><MdDelete/></button>
        <br/>
      </div>
    );
  }
}
