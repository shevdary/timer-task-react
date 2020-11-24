import React, { Component } from "react";
import TasksLog from "../TasksLog/TasksLog";
import { AppBar, Tab } from "@material-ui/core";
import { TabPanel } from "../TabPanel/TabPanel";
import { StyleTabs } from "../../helperStyle/customStyles";
import MyChart from "../TasksChart/TaskChart";

const TaskTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Tab label="TASKS LOG" classes="new-class">
            <TasksLog />
          </Tab>
          <Tab label="TASKS CHART" />
        </StyleTabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TasksLog value={value} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MyChart/>
      </TabPanel>
    </div>
  );
};

export default TaskTab;
