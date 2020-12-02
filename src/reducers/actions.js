import timer from "./typesTimer";
import task from "./typesTasks";

export const tickTimer = () => {
  return { type: timer.TICK };
};

export const startTimer = () => {
  return { type: timer.START };
};

export const addNewTask = taskName => {
  return { type: timer.STOP, payload: taskName };
};
export const removeItem = taskID => {
  return { type: task.REMOVE_TASK, payload: taskID };
};
export const onUpdateTimer = (current) => {
  return { type: timer.UPDATE,payload:{current:current}};
};
export const onUpdateList=tasks=>{
  return { type:task.LOAD_STORAGE, payload:tasks}
}