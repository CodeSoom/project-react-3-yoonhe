import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SignIn from '../components/SignIn';
import {
  authenticationChange,
  changeLoginFields,
  loginRequest,
} from '../slice';

export default function SignInContainer({ onGoToMainClick }) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  const loginFields = useSelector((store) => store.loginFields);
  const loginError = useSelector((store) => store.loginError);

  console.log('loginError ? ', loginError);

  useEffect(() => {
    dispatch(authenticationChange());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      onGoToMainClick();
    }
  }, [isLoggedIn]);

  function handleSubmit() {
    dispatch(loginRequest(loginFields));
  }

  function handleChange({ name, value }) {
    dispatch(changeLoginFields({ name, value }));
  }

  return (
    <SignIn
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClick={onGoToMainClick}
      fields={loginFields}
      loginError={loginError}
    />
  );
}
