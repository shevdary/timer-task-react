import tasks from './reducers/tasks';
import timer from './reducers/timer';
import { combineReducers } from 'redux';

export default combineReducers({
  timer,
  tasks,
});

