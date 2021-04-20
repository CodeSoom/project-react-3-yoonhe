import React from 'react';
import { useDispatch } from 'react-redux';

import SignUp from '../components/SignUp';

import { changeSignInFields, signInRequest } from '../slice';

export default function SignUpContainer() {
  const dispatch = useDispatch();

  function handleChange({ name, value }) {
    dispatch(changeSignInFields({ name, value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signInRequest());
  }

  return (
    <SignUp
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
