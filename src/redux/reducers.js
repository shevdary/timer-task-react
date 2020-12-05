import tasksReducer from './reducers/tasks';
import timerReducer from './reducers/timer';
import { combineReducers } from 'redux';

export default combineReducers({
  timerReducer,
  tasksReducer,
});

