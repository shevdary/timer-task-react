import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";
import TaskInfo from "./components/TaskInfo/TaskInfo";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={() => <Redirect to={"tasks"} />} />
      <Route exact path="/tasks" component={MainPage} />
      <Route
        exact
        path="/tasks/:id"
        render={({ match }) => {
          const { id } = match.params;
          return <TaskInfo tasksId={id} />;
        }}
      />
    </Switch>
  );
}
