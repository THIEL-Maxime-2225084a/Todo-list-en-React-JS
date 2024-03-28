import React, { Component, useState } from 'react';
import './App.css';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdCalendarMonth, MdEdit, MdDelete } from 'react-icons/md';
import Calendar from 'react-calendar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editedTitle: this.props.title,
      calendarIsOpened: false,
      calendarDate: new Date()
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
      () => edit(this.props.id, this.state.editedTitle);
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

  dateChange = (date) => {
    this.setState({ calendarDate: date })
  }

  render() {
    const { id, selected, checkBx, deleteItm } = this.props;
    const { editing, editedTitle, calendarIsOpened, calendarDate } = this.state;
    return (
      <>
        <div className="item-container">
          {selected ? (<button onClick={() => checkBx(id)}><MdCheckBox/></button>) : (<button onClick={() => checkBx(id)}><MdCheckBoxOutlineBlank/></button>)}
          <div className="item-text">
            {editing ? (<input type="text" value={editedTitle} onChange={this.inputChange} onKeyDown={this.inputKeyDown}/>) : (editedTitle)}
          </div>
          <div className="last-icons-pos">
            {editing || selected ? (<></>) : (<button onClick={this.theCalendar}><MdCalendarMonth/></button>)}
            {editing || selected ? (<></>) : (<button onClick={this.editButtonClick}><MdEdit/></button>)}
            <button onClick={() => deleteItm(id)}><MdDelete/></button>
          </div>
          {calendarIsOpened ? (<DatePicker selected={calendarDate} onChange={this.dateChange}/>) : (<></>)}
        </div>
      </>
    );
  }
}
