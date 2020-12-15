import React, { Component } from 'react';
// components
import Timer from '../Timer/Timer';
import TaskTab from '../TasksTab/TaskTab';
import { createBrowserHistory } from 'history';

class MainPage extends Component {
  render() {
    return (
      <div>
        <Timer />
        <TaskTab history={createBrowserHistory()}/>
      </div>
    );
  }
}
export default MainPage;
