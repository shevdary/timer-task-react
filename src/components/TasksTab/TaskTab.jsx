import React, { Component } from "react";
import TasksLog from "../TasksLog/TasksLog";
import { Tabs, AppBar, Tab, withStyles } from "@material-ui/core";
import { TabPanel } from "../TabPanel/TabPanel";

const TaskTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const StyleTabs = withStyles(theme => ({
    root: {
      backgroundColor: "#01bcd5"
    }
  }))(Tabs);
  return (
    <div>
      <AppBar position="static">
        <StyleTabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Item One" classes="new-class">
            <TasksLog />
          </Tab>
          <Tab label="Item Two" />
        </StyleTabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TasksLog value={value} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        НУ И ЧЕ КАК Я ДОЛЖНА ГРАФИК ЭТОТ ВАШ ПОКАЗАТЬ
      </TabPanel>
    </div>
  );
};

export default TaskTab;
