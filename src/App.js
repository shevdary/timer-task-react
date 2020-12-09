import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

// components
import TaskInfo from './components/TaskInfo/TaskInfo';
import MainPage from './components/MainPage/MainPage';

// history
import { createBrowserHistory } from 'history';

export default function App() {
  return (
    <BrowserRouter history={createBrowserHistory()} basename="/">
      <Switch>
        <Redirect exact from="/" to="/tasks" />
        <Route exact path="/:page" component={MainPage} />
        <Route path="/tasks/:id" component={TaskInfo} />
      </Switch>
    </BrowserRouter>
  );
}
