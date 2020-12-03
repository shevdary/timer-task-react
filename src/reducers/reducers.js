import { unixToTime } from "../helpers/unixToTime";
import timer from "../reducers/typesTimer";
import task from "../reducers/typesTasks";
const initialState = {
  currentTime: 0,
  tasks: [],
  isLoad: false,
  isStartTime: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case timer.TICK:
      return {
        currentTime: state.currentTime + 1,
        isLoad: true,
        tasks: state.tasks,
        isStartTime: state.isStartTime
      };
    case timer.START:
      return {
        currentTime: state.currentTime,
        isLoad: state.isLoad,
        tasks: state.tasks,
        isStartTime: new Date().toLocaleTimeString()
      };
    case timer.STOP:
      const getLastId = state.tasks[0] ? state.tasks[0].id : 0;
      return {
        currentTime: 0,
        isStartTime: state.isStartTime,
        tasks: [
          {
            id: getLastId + 1,
            name: action.payload.name,
            startTime: action.payload.start,
            endTime:  action.payload.end,
            spendTime: unixToTime(state.currentTime)
          },
          ...state.tasks
        ]
      };
    case task.REMOVE_TASK:
      return {
        ...state,
        tasks: [...state.tasks.filter(item => item.id !== action.payload)]
      };
    case timer.UPDATE:
      return {
        currentTime: action.payload,
        tasks: state.tasks,
        isLoad: state.isLoad,
        isStartTime: state.isStartTime
      };
    case task.LOAD_STORAGE:
      return {
        currentTime: state.currentTime,
        tasks: action.payload,
        isLoad: state.isLoad,
        isStartTime: state.isStartTime
      };
    default:
      return state;
  }
};
export default reducer;




