import _ from 'lodash';

// Hides actual keys so everyone uses these constants.
function mirrorKeys(keys) {
  return keys.reduce((actionMap, key) => {
    return {
      [key]: _.uniqueId(key + ':'),
      ...actionMap
    };
  }, {});
}

export default mirrorKeys([
  'ADDED_TODO',
  'DELETED_TODO',
  'EDITED_TODO',
  'CHECK_TODO',
  'UNCHECK_TODO',
  'CHECK_ALL',
  'UNCHECK_ALL',
  'CLEAR_MARKED',
  'FINISHED_EDITING_TODO',
  'WILL_EDIT_TODO'
]);
