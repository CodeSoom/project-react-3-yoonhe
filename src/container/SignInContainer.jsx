import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import SignIn from '../components/SignIn';

import {
  changeLoginFields,
  loginRequest,
} from '../slice';

import { get, getMediaQuery } from '../../utils';

const breakpoints = [1000, 768];
const mediaQuery = getMediaQuery(breakpoints);

const SignInSection = styled.section({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1.5',
  padding: '2rem 10rem',
  width: '100%',
  textAlign: 'center',
  '& > div': {
    width: '100%',
  },
  [mediaQuery[1000]]: {
    padding: '2rem 3rem',
  },
  [mediaQuery[768]]: {
    flex: 3,
  },
});

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
    <SignInSection>
      <div>
        <SignIn
          onChange={handleChange}
          onSubmit={handleSubmit}
          onClick={onGoToMainClick}
          fields={loginFields}
          loginError={loginError}
        />
      </div>
    </SignInSection>
  );
}
