import React from "react";
import { Route, Switch } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
    </Switch>
  );
}
