import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignInPage from '../pages/SignInPage';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <SignInPage />
        </Route>
        <Route exact path="/main">
          <div>Main</div>
        </Route>
        <Route path="/signup">
          <div>회원가입</div>
        </Route>
      </Switch>
    </div>
  );
}
