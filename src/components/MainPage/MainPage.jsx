import React, { Component } from 'react';

// components
import Timer from '../Timer/Timer';
import TaskTab from '../TasksTab/TaskTab';

class MainPage extends Component {
  render() {
    return (
      <div>
        <Timer />
        <TaskTab />
      </div>
    );
  }
}
export default MainPage;
