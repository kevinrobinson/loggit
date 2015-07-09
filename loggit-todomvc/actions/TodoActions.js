import * as types from './ActionTypes';

export function addTodo(text) {
  return {
    type: types.ADDED_TODO,
    text
  };
}

export function deleteTodo(id) {
  return {
    type: types.DELETED_TODO,
    id
  };
}

export function editTodo(id, text) {
  return {
    type: types.EDITED_TODO,
    id,
    text
  };
}

export function checkTodo(id) {
  return {
    type: types.CHECK_TODO,
    id
  };
}

export function uncheckTodo(id) {
  return {
    type: types.UNCHECK_TODO,
    id
  };
}

export function checkAll() {
  return {
    type: types.CHECK_ALL
  };
}

export function uncheckAll() {
  return {
    type: types.UNCHECK_ALL
  };
}

export function clearMarked() {
  return {
    type: types.CLEAR_MARKED
  };
}

export function willEditTodo(todoId) {
  return {
    type: types.WILL_EDIT_TODO,
    todoId: todoId
  };
}

export function finishedEditingTodo(todoId) {
  return {
    type: types.FINISHED_EDITING_TODO,
    todoId: todoId
  };
}
