import React from "react";
import {
  Route,
  Switch,
  Redirect,
  Router,
  BrowserRouter
} from "react-router-dom";
import { createBrowserHistory } from "history";
import MainPage from "./components/MainPage/MainPage";
import TaskInfo from "./components/TaskInfo/TaskInfo";
import Chart from "./components/TasksChart/TaskChart";

export default function App() {
  return (
    <BrowserRouter history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" component={() => <Redirect to={"/tab-log"} />} />
        <Route exact path="/tab-log" component={MainPage} />
        <Route
          exact
          path="/tasks/:id"
          render={({ match }) => {
            const { id } = match.params;
            return <TaskInfo tasksId={id} />;
          }}
        />
        <Route exact path="/tab-chart" component={Chart} />
      </Switch>
    </BrowserRouter>
  );
}
