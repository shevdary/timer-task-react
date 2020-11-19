export const startTimer = () => {
  return { type: "TIMER_START" };
};
export const stopTimer = () => {
  return { type: "TIMER_STOP" };
};
export const addNewTask = task => {
  return { type: "ADD_TASK", payload: task };
};
