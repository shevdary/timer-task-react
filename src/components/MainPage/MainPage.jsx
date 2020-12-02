import React, { Component } from "react";
import Timer from "../Timer/Timer";
import TaskTab from "../TasksTab/TaskTab";

class MainPage extends Component {
  render() {
    return (
      <div>
        <Timer />
        <TaskTab props={this.props.props} />
      </div>
    );
  }
}
export default MainPage;
