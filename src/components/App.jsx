import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MianPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';

import { watchAuthentication } from '../slice';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(watchAuthentication());
  }, []);

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
