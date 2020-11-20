import React, { Component } from "react";
import TasksLog from "../TasksLog/TasksLog";
import { Box } from "@material-ui/core";
import { Tabs, AppBar, Tab } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { TabPanel } from "../TabPanel/TabPanel";

const TaskTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Item One">
            <TasksLog />
          </Tab>
          <Tab label="Item Two" />
        </Tabs>
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
