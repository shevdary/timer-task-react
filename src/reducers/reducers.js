
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
      const { currentTime, tasks } = state;
      let minutes = currentTime ? Math.trunc((currentTime / 60) % 60) : 0;
      const hours =
        minutes == null ? 0 : Math.trunc((currentTime / 60 / 60) % 60);
      const second = currentTime > 60 ? currentTime % 60 : currentTime;
      const secEnd =
        data.getSeconds() + currentTime > 60
          ? (data.getSeconds() + currentTime) % 60
          : data.getSeconds() + currentTime;
      let minEnd;
      if (
        minutes + data.getMinutes() >= 60 &&
        data.getSeconds() + second >= 60
      ) {
        minEnd =
          Math.trunc(minutes + (data.getMinutes() % 60)) +
          Math.trunc((second + data.getSeconds()) / 60);
      }
      if (
        minutes + data.getMinutes() >= 60 &&
        data.getSeconds() + second < 60
      ) {
        minEnd = Math.trunc((minutes + data.getMinutes()) % 60);
      }
      if (
        minutes + data.getMinutes() < 60 &&
        data.getSeconds() + second >= 60
      ) {
        minEnd =
          minutes +
          data.getMinutes() +
          Math.trunc((second + data.getSeconds()) / 60);
      }
      if (minutes + data.getMinutes() < 60 && data.getSeconds() + second < 60) {
        minEnd = minutes + data.getMinutes();
      }
      const hourEnd =
        hours +
        data.getHours() +
        Math.trunc((minutes + data.getMinutes()) / 60);

      const timeEnd = `${hourEnd < 10 ? "0" + hourEnd : hourEnd}:${
        minEnd < 10 ? "0" + minEnd : minEnd
      }:${secEnd < 10 ? "0" + secEnd : secEnd}`;

      const getLastId = tasks[0] ? tasks[tasks.length - 1].id : 0;
      const countTime = `${hours < 10 ? "0" + hours : hours}:${
        minutes < 10 ? "0" + minutes : minutes
      }:${second < 10 ? "0" + second : second}`;
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