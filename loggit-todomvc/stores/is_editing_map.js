import {
  WILL_EDIT_TODO,
  FINISHED_EDITING_TODO
} from '../actions/ActionTypes';

// Returns a computation that yields a map of 
//   {todoId -> isEditing:bool}
export default {
  initial: {},
  reducer: function(isEditingMap, action) {
    switch (action.type) {
    case WILL_EDIT_TODO:
      return {...isEditingMap, [action.todoId]: true};

    case FINISHED_EDITING_TODO:
      return {...isEditingMap, [action.todoId]: false};

    default:
      return isEditingMap;
    }
  }
};