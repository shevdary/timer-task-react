import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: []
  },
  reducers: {
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(tasks => tasks.id !== action.payload);
    },
    updateTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addNewTask: (state, action) => {
      const { name, startTime, endTime, spendTime } = action.payload;
      const getLastId = state.tasks[0] ? state.tasks[0].id : 0;
      state.tasks = [
        {
          id: getLastId + 1,
          name: name,
          startTime: startTime,
          spendTime: spendTime,
          endTime: endTime
        },
        ...state.tasks
      ];
    },
    cleanTasks: state => {
      state.tasks = [];
    }
  }
});

export const {
  removeTask,
  updateTasks,
  addNewTask,
  cleanTasks
} = tasksSlice.actions;
export default tasksSlice.reducer;
