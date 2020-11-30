const setStorageTimer = value =>
    localStorage.setItem("TimeBrowserClosed", value);
const setTasksStorage = tasks =>
    localStorage.setItem("tasksData", JSON.stringify(tasks));
const getTimerFromStorage = () => localStorage.getItem("TimeBrowserClosed");
const getDataFromStorage = () => {
  const data = JSON.parse(localStorage.getItem("tasksData"));
  return data;
};

const clearStorage = () => {
  localStorage.clear();
};
export {
  setStorageTimer,
  setTasksStorage,
  getDataFromStorage,
  getTimerFromStorage,
  clearStorage
};