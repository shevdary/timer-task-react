
const initialState = {
  currentTime: 0,
  tasks: []
};

const data = new Date();
const date = data.toLocaleTimeString();

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIMER_START":
      return {
        currentTime: state.currentTime + 1,
        tasks: state.tasks
      };
    case "TIMER_STOP_TASK":
      const timeEnd = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds() +
        state.currentTime}`;
      const getLastId =state.tasks.id?state.tasks[state.tasks.length - 1].id:0;
      const countTime = `${
        state.currentTime ? Math.trunc((state.currentTime / 60) % 60) : 0
      }:${Math.trunc((state.currentTime / 60 / 60) % 60)}:${
        state.currentTime > 60 ? state.currentTime % 60 : state.currentTime
      }`;
      console.log("task")
      return {
        currentTime: 0,
        tasks: [
          {
            id: getLastId + 1,
            timeStart: date,
            timeEnd: timeEnd,
            name: action.payload,
            timeSpend: countTime
          },
          ...state.tasks,
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