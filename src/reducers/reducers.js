import { countTime } from "./countTime";
const initialState = {
  currentTime: 0,
  tasks: [],
  isLoad: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIMER_START":
      return {
        currentTime: state.currentTime + 1,
        tasks: state.tasks,
        isLoad: true
      };
    case "TIMER_STOP_TASK":
      const { currentTime, tasks } = state;
      const getLastId = tasks[0] ? tasks[tasks.length - 1].id : 0;
      let timer = countTime(currentTime, tasks);
      let n = countTime(Number(localStorage.getItem("count")));
      return {
        currentTime: 0,
        isLoad: false,
        tasks: [
          ...state.tasks,
          {
            id: getLastId + 1,
            timeStart: n.date,
            timeEnd: n.timeEnd,
            name: action.payload,
            timeSpend: n.countTime
          }
        ]
      };

    case "REMOVE_ITEM_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, action.payload),
          ...state.tasks.slice(Number(action.payload) + 1)
        ]
      };
    case "TIMER_UPDATE_STORAGE":
      return {
        currentTime: Number(localStorage.getItem("count")),
        isLoad: true,
        ...state
      };

    default:
      return state;
  }
};
export default reducer;