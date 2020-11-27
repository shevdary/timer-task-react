import React from "react";
import {
  Route,
  Switch,
  Redirect,
  Router,
  BrowserRouter
} from "react-router-dom";
import { createBrowserHistory } from "history";
import TaskInfo from "./components/TaskInfo/TaskInfo";
import MainPage from "./components/MainPage/MainPage";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to={"/tab-log"} />
        <Route
          exact
          path="/:page"
          component={props => <MainPage props={props} />}
        />
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
