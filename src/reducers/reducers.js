import { unixToTime } from "../helpers/unixToTime";

const initialState = {
  currentTime: 0,
  tasks: [],
  isLoad: false,
  isStartTime: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TICK_TIMER":
      return {
        currentTime: state.currentTime + 1,
        isLoad: true,
        tasks: state.tasks,
        isStartTime: state.isStartTime
      };
    case "TIMER_START":
      return {
        currentTime: state.currentTime,
        isLoad: state.isLoad,
        tasks: state.tasks,
        isStartTime: new Date().toLocaleTimeString()
      };
    case "TIMER_STOP_TASK":
      const getLastId = state.tasks[0] ? state.tasks[0].id : 0;
      return {
        currentTime: 0,
        isStartTime: state.isStartTime,
        tasks: [
          {
            id: getLastId + 1,
            name: action.payload,
            startTime: state.isStartTime,
            endTime: new Date().toLocaleTimeString(),
            spendTime: unixToTime(state.currentTime)
          },
          ...state.tasks
        ]
      };
    case "REMOVE_ITEM_TASK":
      return {
        ...state,
        tasks: [...state.tasks.filter(item => item.id !== action.payload)]
      };
    case "TIMER_UPDATE_STORAGE":
      return {
        currentTime: action.payload.current,
        tasks: state.tasks,
        isLoad: state.isLoad,
        isStartTime: state.isStartTime
      };
    case "UPDATE_TASKS":
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





