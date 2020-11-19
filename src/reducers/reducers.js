
const initialState = {
  currentTime: 0
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIMER_START":
      return {
        currentTime: state.currentTime + 1
      };
    case "TIMER_STOP":
      return {
        currentTime: initialState.currentTime
      };
    default:
      return state;
  }
};
export default reducer;