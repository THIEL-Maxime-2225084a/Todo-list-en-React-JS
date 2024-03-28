import React, { Component } from 'react';
import './App.css';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdCalendarMonth, MdEdit, MdDelete } from 'react-icons/md';
import Calendar from 'react-calendar';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editedTitle: this.props.title,
      calendarIsOpened: false
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
      () => onEdit(this.props.id, this.state.editedTitle);
      this.setState({ editing: false });
    }
  }

  theCalendar = () => {
    const { calendarIsOpened } = this.state; 
    if (calendarIsOpened == false) {
      this.setState({ calendarIsOpened: true });
    } 
    else if (calendarIsOpened == true) {
      this.setState({ calendarIsOpened: false });
    }
  }

  render() {
    const { id, selected, onCheck, onDelete } = this.props;
    const { editing, editedTitle, calendarIsOpened } = this.state;
    return (
      <>
        <div className="item-container">
          {selected ? (<button onClick={() => onCheck(id)}><MdCheckBox/></button>) : (<button onClick={() => onCheck(id)}><MdCheckBoxOutlineBlank/></button>)}
          {editing ? (<input type="text" value={editedTitle} onChange={this.inputChange} onKeyDown={this.inputKeyDown}/>) : (editedTitle)}
          <div className="last-icons-pos">
            {editing ? (<></>) : (<button onClick={this.theCalendar}><MdCalendarMonth/></button>)}
            {editing ? (<></>) : (<button onClick={this.editButtonClick}><MdEdit/></button>)}
            <button onClick={() => onDelete(id)}><MdDelete/></button>
          </div>
        </div>
        <div className="calendar-container">
          {calendarIsOpened ? (<div><Calendar/><br/></div>) : (<></>)}
        </div>
      </>
    );
  }
}
