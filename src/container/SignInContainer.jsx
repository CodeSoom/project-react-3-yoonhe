import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SignIn from '../components/SignIn';

import {
  changeLoginFields,
  loginRequest,
} from '../slice';

import { get } from '../../utils';

export default function SignInContainer({ onGoToMainClick }) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(get('isLoggedIn'));
  const loginFields = useSelector(get('loginFields'));
  const loginError = useSelector(get('loginError'));

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
