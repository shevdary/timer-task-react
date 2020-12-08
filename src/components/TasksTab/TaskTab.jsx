import React from 'react';
//components
import TasksLog from '../TasksLog/TasksLog';
import TaskChart from '../TasksChart/TaskChart';
//material-ui
import { AppBar, Tab } from '@material-ui/core';
import { StyleTabs } from '../../material/customStyles';
//utils
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

const TaskTab = () => {
  const page = history.location.pathname;
  const tabNameToIndex = {
    0: '/tasks',
    1: '/chart',
  };
  const index = {
    '/tasks': 0,
    '/chart': 1,
  };
  const [value, setValue] = React.useState(index[page]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`${tabNameToIndex[newValue]}`);
  };

  return (
    <div>
      <AppBar position="static">
        <StyleTabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="TASKS LOG" />
          <Tab label="TASKS CHART" />
        </StyleTabs>
      </AppBar>
      {value === 0 && <TasksLog history={history} />}
      {value === 1 && <TaskChart />}
    </div>
  );
};

export default TaskTab;