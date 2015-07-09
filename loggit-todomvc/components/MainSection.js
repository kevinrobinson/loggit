import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_MARKED, SHOW_UNMARKED } from '../constants/TodoFilters';
import ComputeTodos from '../stores/todos.js'
import * as TodoActions from '../actions/TodoActions';


const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_UNMARKED]: todo => !todo.marked,
  [SHOW_MARKED]: todo => todo.marked
};

export default class MainSection extends Component {
  static propTypes = {
    loggit: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearMarked() {
    const {todos} = this.data();
    const atLeastOneMarked = todos.some(todo => todo.marked);
    if (!atLeastOneMarked) return;

    this.props.loggit.recordFact(TodoActions.clearMarked());
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  handleInputChanged() {
    const {todos} = this.data();
    const fact = (todos.every(todo => todo.marked))
      ? TodoActions.uncheckAll()
      : TodoActions.checkAll();
    this.props.loggit.recordFact(fact);
  }

  computations() {
    return {
      todos: ComputeTodos
    }
  }

  data() {
    return this.props.loggit.computeFor(this);
  }

  render() {
    const { todos } = this.data();
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const markedCount = todos.reduce((count, todo) =>
      todo.marked ? count + 1 : count,
      0
    );

    return (
      <section className='main'>
        {this.renderToggleAll(todos, markedCount)}
        <ul className='todo-list'>
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} loggit={this.props.loggit} />
          )}
        </ul>
        {this.renderFooter(markedCount)}
      </section>
    );
  }

  renderToggleAll(todos, markedCount) {
    if (todos.length > 0) {
      return (
        <input className='toggle-all'
               type='checkbox'
               checked={markedCount === todos.length}
               onChange={this.handleInputChanged.bind(this)} />
      );
    }
  }

  renderFooter(markedCount) {
    const { todos } = this.data();
    const { filter } = this.state;
    const unmarkedCount = todos.length - markedCount;

    if (todos.length) {
      return (
        <Footer markedCount={markedCount}
                unmarkedCount={unmarkedCount}
                filter={filter}
                onClearMarked={this.handleClearMarked.bind(this)}
                onShow={this.handleShow.bind(this)} />
      );
    }
  }
}
