import React, { Component } from 'react';
import { MdAdd } from 'react-icons/md';
import TodoItem from './TodoItem';
import Calendar from 'react-calendar';
import './App.css';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: 2,
      itemsValues: [
        { id: 0, title: "Tâche 0", selected: false },
        { id: 1, title: "Tâche 1", selected: false }
      ]
    };
    this.textInputRef = React.createRef();
  }

  createItem = () => {
    const title = this.textInputRef.current.value;
    if (title) {
      this.setState(prevState => ({
        currentId: prevState.currentId + 1,
        itemsValues: [
          ...prevState.itemsValues,
          { id: prevState.currentId, title: title, selected: false }
        ]
      }));
      this.textInputRef.current.value = '';
    }
  }

  deleteItem = (id) => {
    console.log("supprimer");
    this.setState(prevState => ({
      itemsValues: prevState.itemsValues.filter(item => item.id !== id)
    }));
  }

  toggleSelected = (id) => {
    this.setState(prevState => ({
      itemsValues: prevState.itemsValues.map(item => {
        if (item.id === id) {
          return { ...item, selected: !item.selected };
        } else {
          return item;
        }
      })
    }));
  }

  checkBoxSelected = (id) => {
    console.log(this.state.itemsValues);
    this.setState(prevState => ({
      itemsValues: prevState.itemsValues.map(item => {
        if (item.id === id) {
          return { ...item, selected: !item.selected };
        } 
        return item;
      })
    }));
  }

  render() {
    return (
      <div id="todoListContainer" className="todo-list-container">
        <div className="input-container">
          <button onClick={this.createItem}><MdAdd /></button>
          <input ref={this.textInputRef} placeholder="Votre nouvelle tâche..." className="textInput" />
          <br />
        </div>
        {this.state.itemsValues.map(itemValues => (
          <TodoItem
            key={itemValues.id}
            id={itemValues.id}
            title={itemValues.title}
            selected={itemValues.selected}
            onDelete={this.deleteItem}
            onEdit={this.editItem}
            onSelect={this.toggleSelected}
            onCheck={this.checkBoxSelected}
          />
        ))}
      </div>
    );
  }
}
