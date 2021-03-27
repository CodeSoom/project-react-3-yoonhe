import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SignIn from '../components/SignIn';
import { changeLoginFields } from '../slice';

export default function SignInContainer({ onClick }) {
  const dispatch = useDispatch();

  const loginFields = useSelector((store) => store.loginFields);

  function handleSubmit() {}

  function handleChange({ name, value }) {
    dispatch(changeLoginFields({ name, value }));
  }

  return (
    <SignIn
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClick={onClick}
      fields={loginFields}
    />
  );
}
