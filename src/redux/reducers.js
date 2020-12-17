import { combineReducers } from 'redux';
import tasks from './reducers/tasks';
import timer from './reducers/timer';

export default combineReducers({
  timer,
  tasks,
});
