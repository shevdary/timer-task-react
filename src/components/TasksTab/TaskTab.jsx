import React from "react";
import TasksLog from "../TasksLog/TasksLog";
import { AppBar, Tab } from "@material-ui/core";
import { StyleTabs } from "../../helperStyle/customStyles";
import Chart from "../TasksChart/TaskChart";

const TaskTab = ({ props }) => {
  const page = props.match.params.page;
  const history = props.history;
  const tabNameToIndex = {
    0: "tab-log",
    1: "tab-chart"
  };
  const index = {
    "tab-log": 0,
    "tab-chart": 1
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
      {value === 1 && <Chart />}
    </div>
  );
};

export default TaskTab;