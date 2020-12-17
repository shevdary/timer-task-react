import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
// components
import MainPage from './components/MainPage/MainPage';

const App = () => (
  <BrowserRouter basename="/">
    <Switch>
      <Redirect exact from="/" to="/tasks" />
      <Route path="/:page" component={MainPage} />
    </Switch>
  </BrowserRouter>
);
export default App;
