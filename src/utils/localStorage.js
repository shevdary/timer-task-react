const setStorageTimer = (time) =>
  localStorage.setItem('TimeBrowserClosed', time);

const setTasksStorage = (tasks) =>
  localStorage.setItem('tasksData', JSON.stringify(tasks));

const getTimerFromStorage = () => localStorage.getItem('TimeBrowserClosed');

const getDataFromStorage = () => JSON.parse(localStorage.getItem('tasksData'));

const clearStorage = () => {
  localStorage.clear();
};

export {
  setStorageTimer,
  setTasksStorage,
  getDataFromStorage,
  getTimerFromStorage,
  clearStorage,
};
