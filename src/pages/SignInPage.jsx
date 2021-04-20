import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from '@emotion/styled';

import Intro from '../components/Intro';
import SignInContainer from '../container/SignInContainer';

import { getMediaQuery } from '../../utils';

const breakpoints = [768];
const mediaQuery = getMediaQuery(breakpoints);

const IntroContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  background: '#fff',
  [[mediaQuery[768]]]: {
    flexDirection: 'column',
  },
});

export default function SignInPage() {
  const history = useHistory();

  function handlePageMove(path) {
    history.push(path);
  }

  return (
    <IntroContainer>
      <Intro onClick={handlePageMove} />
      <SignInContainer onGoToMainClick={handlePageMove} />
    </IntroContainer>
  );
}
