import React, { Fragment, useEffect, useState } from 'react';
// components
import TaskChart from '../TasksChart/TaskChart';
import TasksLog from '../TasksLog/TasksLog';
// material-ui
import { AppBar, Tab } from '@material-ui/core';
// utils
import { Route, Switch, Link, useParams, useHistory } from 'react-router-dom';
import { StyleTabs } from '../../material/customStyles';

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
      </Switch>
    </div>
  );
};

export default TaskTab;
