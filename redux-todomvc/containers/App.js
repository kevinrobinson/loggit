import React from 'react';
import TodoApp from './TodoApp';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from '../stores';
import * as TodoActions from '../actions/TodoActions';
import initialFactsSet1 from '../test/initial_facts_set1'

const redux = createRedux(stores);

// for debugging
window.redux = redux;

// simulate 1000 events first to build up state
initialFactsSet1.forEach((action) => {
  redux.dispatch(action);
});

export default class App {
  componentDidMount() {
    window.setTimeout(() => this.startMonkeying(), 4000);
  }

  startMonkeying() {
    this.MonkeyTimer = window.setInterval(this.pokeMonkey, 10);
    window.setTimeout(() => {
      window.clearInterval(this.MonkeyTimer);
      console.info(window.redux.getProfilingReporter().printStats());
    }, 30000);
  }

  pokeMonkey() {
    const actionFns = [
      TodoActions.markAll,
      TodoActions.clearMarked,
      () => TodoActions.addTodo('do something: ' + Math.random())
    ];
    const randomIndex = Math.floor(Math.random() * actionFns.length);
    const randomAction = actionFns[randomIndex]();
    redux.dispatch(randomAction);
  }

  render() {
    return (
      <Provider redux={redux}>
        {() => <TodoApp />}
      </Provider>
    );
  }
}
