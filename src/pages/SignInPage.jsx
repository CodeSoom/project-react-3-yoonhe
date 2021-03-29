import React from 'react';
import { useHistory } from 'react-router-dom';

import Intro from '../components/Intro';
import SignInContainer from '../container/SignInContainer';

export default function SignInPage() {
  const history = useHistory();

  function handleSignUpClick() {
    history.push('/signup');
  }

  function handleGoToMainClick() {
    history.push('/main');
  }

  return (
    <>
      <Intro onClick={handleSignUpClick} />
      <SignInContainer onGoToMainClick={handleGoToMainClick} />
    </>
  );
}
