import React from "react";
import {Route, Switch, Redirect, Router, BrowserRouter} from "react-router-dom";
import { createBrowserHistory } from "history";
import MainPage from "./components/MainPage/MainPage";
import TaskInfo from "./components/TaskInfo/TaskInfo";


export default function App() {
  return (
<BrowserRouter history={createBrowserHistory()}>
    <Switch>
      <Route exact path="/tab-log" component={() => <Redirect to={"/tasks"} />} />
      <Route  exact path="/tasks" component={MainPage} />
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
