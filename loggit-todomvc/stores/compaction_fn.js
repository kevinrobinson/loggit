import {
  ADDED_TODO,
  DELETED_TODO,
  EDITED_TODO,
  CHECK_TODO,
  UNCHECK_TODO,
  CHECK_ALL,
  UNCHECK_ALL,
  CLEAR_MARKED
} from '../actions/ActionTypes';


// This maps facts -> compaction key.  It's semantics are coupled
// to what facts mean and how they are used in the app.  This isn't
// library code and is tricky to tune.
export default function compactionKey(action) {
  switch (action.type) {
  case ADDED_TODO:
    return [ADDED_TODO, action.text];

  case DELETED_TODO:
    return [DELETED_TODO, action.id];

  case EDITED_TODO:
    return [EDITED_TODO, action.id];

  case UNCHECK_TODO:
    return [UNCHECK_TODO, action.id];

  case CHECK_TODO:
    return [CHECK_TODO, action.id];

  case CHECK_ALL:
    return [CHECK_ALL];

  case UNCHECK_ALL:
    return [UNCHECK_ALL];

  case CLEAR_MARKED:
    return [CLEAR_MARKED];

  default:
    return null;
  }
};