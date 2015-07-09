import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import * as TodoActions from '../actions/TodoActions';
import IsEditingMap from '../stores/is_editing_map.js'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    loggit: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  computations() {
    return {
      isEditingMap: IsEditingMap
    }
  }

  handleDoubleClick() {
    const {todo} = this.props;
    this.props.loggit.recordFact(TodoActions.willEditTodo(todo.id));
  }

  handleMarkTodo() {
    const {todo} = this.props;
    const fact = (todo.marked)
      ? TodoActions.uncheckTodo(todo.id)
      : TodoActions.checkTodo(todo.id)
    this.props.loggit.recordFact(fact);
  }

  handleDestroyTodo() {
    const {todo} = this.props;
    this.props.loggit.recordFact(TodoActions.deleteTodo(todo.id));
  }

  handleSave(id, text) {
    const finishedEditingFact = TodoActions.finishedEditingTodo(id);
    this.props.loggit.recordFact(finishedEditingFact);

    const mutationFact = (text.length === 0)
      ? TodoActions.deleteTodo(id)
      : TodoActions.editTodo(id, text);
    this.props.loggit.recordFact(mutationFact);
  }

  render() {
    const {todo} = this.props;
    const isEditing = this.props.loggit.computeFor(this).isEditingMap[todo.id];

    let element;
    if (isEditing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={isEditing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      );
    } else {
      element = (
        <div className='view'>
          <input className='toggle'
                 type='checkbox'
                 checked={todo.marked}
                 onChange={this.handleMarkTodo.bind(this)} />
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <button className='destroy'
                  onClick={this.handleDestroyTodo.bind(this)} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.marked,
        editing: isEditing
      })}>
        {element}
      </li>
    );
  }
}
