import React, { useState } from 'react';
import {
  Route, Switch, Link, useParams, useHistory,
} from 'react-router-dom';
// material-ui
import { AppBar, Tab } from '@material-ui/core';
// components
import TaskChart from '../TasksChart/TaskChart';
import TasksLog from '../TasksLog/TasksLog';
// utils
import { StyleTabs } from '../../material/customStyles';
import TaskInfo from '../TaskInfo/TaskInfo';

const TaskTab = () => {
  const { page } = useParams();
  const history = useHistory();
  const [value, setValue] = useState(page);

  const handleChange = (event, value) => {
    setValue(value);
    history.push(`/${value}`);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <StyleTabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            label="TASKS LOG"
            index={0}
            value="tasks"
            component={Link}
            to="/tasks"
          />
          <Tab
            label="TASKS CHART"
            index={1}
            value="chart"
            component={Link}
            to="/chart"
          />
        </StyleTabs>
      </AppBar>
      <Switch>
        <Route exact path="/tasks" component={TasksLog} />
        <Route exact path="/chart" component={TaskChart} />
        <Route exact path={`/${page}/:id`} component={TaskInfo} />
      </Switch>
    </div>
  );
};

export default TaskTab;
