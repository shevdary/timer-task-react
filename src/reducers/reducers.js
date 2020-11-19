
const initialState = {
  currentTime: 0,
  tasks: [{ id: 1 }]
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
    case "TIMER_STOP":
      const timeEnd = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds() +
        state.currentTime}`;
      const getLastId = state.tasks[state.tasks.length - 1].id;
      const countTime=`${state.currentTime ? Math.trunc((state.currentTime / 60) % 60) : 0}:${Math.trunc((state.currentTime / 60 / 60) % 60)}:${state.currentTime > 60 ? state.currentTime % 60 : state.currentTime}`
      return {
        currentTime: 0,
        tasks: [
          ...state.tasks,
          {
            id: getLastId + 1,
            timeStart: date,
            timeEnd: timeEnd,
            name: "someNAme",
            timeSpend: countTime
          }
        ]
      };
    case "TASKS_LOADED":
      return {
        tasks: action.payload
      };
    default:
      return state;
  }
};
export default reducer;