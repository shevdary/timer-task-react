export const tickTimer = () => {
  return { type: "TICK_TIMER" };
};

export const startTimer = () => {
  return { type: "TIMER_START" };
};

export const addNewTask = taskName => {
  return { type: "TIMER_STOP_TASK", payload: taskName };
};
export const removeItem = taskID => {
  return { type: "REMOVE_ITEM_TASK", payload: taskID };
};
export const onLoad = (current) => {
  return { type: "TIMER_UPDATE_STORAGE",payload:{current:current}};
};
export const onUpdateList=tasks=>{
  return { type:"UPDATE_TASKS", payload:tasks}
}