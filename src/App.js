import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
//components
import TaskInfo from './components/TaskInfo/TaskInfo';
import MainPage from './components/MainPage/MainPage';
//history
import { createBrowserHistory } from 'history';

export default function App() {
  return (
    <BrowserRouter history={createBrowserHistory()}>
      <Switch>
        <Redirect exact from="/" to={'/tasks'} />
        <Route
          exact
          path="/:page"
          component={props => <MainPage props={props} />}
        />
        <Route
          path="/tasks/:id"
          render={({ match }) => {
            const { id } = match.params;
            return <TaskInfo tasksId={id} />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}
