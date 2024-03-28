import React, { Component } from 'react';
import { MdAdd } from 'react-icons/md';
import TodoItem from './TodoItem';
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

  editItem = (id, newTitle) => {
    this.setState(prevState => ({
      itemsValues: prevState.itemsValues.map(item => {
        if (item.id === id) {
          return { ...item, title: newTitle };
        } 
        else {
          return item;
        }
      })
    }));
  }

  deleteItem = (id) => {
    this.setState(prevState => ({
      itemsValues: prevState.itemsValues.filter(item => item.id !== id)
    }));
  }

  checkBoxSelected = (id) => {
    this.setState(prevState => ({
      itemsValues: prevState.itemsValues.map(item => {
        if (item.id === id) {
          return { ...item, selected: !item.selected };
        } 
        return item;
      })
    }));
  }

  getTotalSelected = () => {
    return this.state.itemsValues.reduce((total, item) => {
      return total + (item.selected ? 1 : 0);
    }, 0);
  }

  render() {
    return (
      <div id="todoListContainer" className="todo-list-container">
        <p>{this.getTotalSelected()} / {this.state.itemsValues.length} tâche(s) complète(s)</p>
        <div className="input-container">
          <button onClick={this.createItem}><MdAdd/></button>
          <input ref={this.textInputRef} placeholder="Votre nouvelle tâche..." className="text-input" />
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
            onCheck={this.checkBoxSelected} 
          />
        ))}
      </div>
    );
  }
}
