import React from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter
} from "react-router-dom";
import TaskInfo from "./components/TaskInfo/TaskInfo";
import MainPage from "./components/MainPage/MainPage";
import TasksLog from "./components/TasksLog/TasksLog";
import {createBrowserHistory} from "history";
export default function App() {
  return (
    <BrowserRouter history={createBrowserHistory()}>
      <Switch>
        <Redirect exact from="/" to={"/tab-log"} />
        <Route
          exact
          path="/:page"
          component={props => <MainPage props={props} />}
        />
        {/*<Route path="/tab-log" component={TasksLog}/>*/}
        <Route
          exact
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
