import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from '../../utils';

import SignUp from '../components/SignUp';

import { changeSignInFields, signInRequest } from '../slice';

export default function SignUpContainer() {
  const dispatch = useDispatch();

  const { failure } = useSelector(get('signIn'));

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
      error={failure}
    />
  );
}
