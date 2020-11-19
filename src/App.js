import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={() => <Redirect to={"tasks"} />} />
      <Route exact path="/tasks" component={MainPage} />
    </Switch>
  );
}
