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
      let timer = countTime(Number(localStorage.getItem("count")));
      const storage = JSON.parse(localStorage.getItem("tasksData"));
      let newTask;
      if (storage == null) {
        newTask = [
          ...state.tasks,
          {
            id: getLastId + 1,
            timeStart: timer.date,
            timeEnd: timer.timeEnd,
            name: action.payload,
            timeSpend: timer.countTime
          }
        ];
        return {
          currentTime: 0,
          isLoad: false,
          tasks: newTask
        };
      }
      if (storage != null) {
        const getLastID =storage[0]? storage[storage.length - 1].id:0;
        newTask = [
          ...state.tasks,
          {
            id: getLastID + 1,
            timeStart: timer.date,
            timeEnd: timer.timeEnd,
            name: action.payload,
            timeSpend: timer.countTime
          }
        ];
        return {
          currentTime: 0,
          isLoad: false,
          tasks: newTask
        };
      }
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