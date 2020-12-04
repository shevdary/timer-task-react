import React from "react";
import TasksLog from "../TasksLog/TasksLog";
import { AppBar, Tab } from "@material-ui/core";
import { StyleTabs } from "../../helperStyle/customStyles";
import TaskChart from "../TasksChart/TaskChart";

const TaskTab = ({ props }) => {
  const page = props.match.params.page;
  const history = props.history;
  const tabNameToIndex = {
    0: "tasks",
    1: "chart"
  };
  const index = {
    "tasks": 0,
    "chart": 1
  };
  const [value, setValue] = React.useState(index[page]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/${tabNameToIndex[newValue]}`);
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
            <Tab label="TASKS LOG"/>
            <Tab label="TASKS CHART" />
          </StyleTabs>
        </AppBar>
        {value === 0 && <TasksLog history={history}/>}
        {value === 1 && <TaskChart />}
      </div>
  );
};

export default TaskTab;