
const initialState = {
  currentTime: 0,
  tasks: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIMER_START":
      return {
        currentTime: state.currentTime + 1,
        tasks: state.tasks
      };
    case "TIMER_STOP_TASK":
      const data = new Date();
      const date = data.toLocaleTimeString();
      const minutes = state.currentTime
        ? Math.trunc((state.currentTime / 60) % 60)
        : 0;
      const hours =
        minutes == null ? 0 : Math.trunc((state.currentTime / 60 / 60) % 60);
      const second =
        state.currentTime > 60 ? state.currentTime % 60 : state.currentTime;
      const timeEnd = `${Number(data.getHours()) + hours}:${Number(
        data.getMinutes() + minutes
      )}:${Number(data.getSeconds()) + second}`;
      const getLastId = state.tasks[0]
        ? state.tasks[state.tasks.length - 1].id
        : 0;
      const countTime = `${hours + ":" + minutes + ":" + second}`;
      return {
        currentTime: 0,
        tasks: [
          ...state.tasks,
          {
            id: getLastId + 1,
            timeStart: date,
            timeEnd: timeEnd,
            name: action.payload,
            timeSpend: countTime
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
    default:
      return state;
  }
};
export default reducer;