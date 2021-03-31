import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MianPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <SignInPage />
        </Route>
        <Route exact path="/main">
          <MianPage />
        </Route>
        <Route path="/signup">
          <div>회원가입</div>
        </Route>
      </Switch>
    </>
  );
}
