import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { get } from '../../utils';

import SignUp from '../components/SignUp';

import { changeSignInFields, signUpRequest } from '../slice';

export default function SignUpContainer({ onPageMove }) {
  const dispatch = useDispatch();

  const { failure, success } = useSelector(get('signUp'));

  useEffect(() => {
    if (success) { onPageMove('/main'); }
  }, [success]);

  function handleChange({ name, value }) {
    dispatch(changeSignInFields({ name, value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signUpRequest());
  }

  return (
    <SignUp
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={failure}
    />
  );
}
