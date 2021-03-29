import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import SignIn from '../components/SignIn';
import {
  authenticationChange,
  changeLoginFields,
  loginRequest,
} from '../slice';

export default function SignInContainer({ onGoToMainClick }) {
  const dispatch = useDispatch();
  // const history = useHistory();

  const loginFields = useSelector((store) => store.loginFields);
  const loginError = useSelector((store) => store.loginError);

  useEffect(() => {
    dispatch(authenticationChange());
  }, []);

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
