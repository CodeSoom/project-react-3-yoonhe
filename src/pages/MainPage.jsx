import React from 'react';
import { useHistory } from 'react-router-dom';

import MainContainer from '../container/MainContainer';

export default function MianPage() {
  const history = useHistory();

  function handleGoToAddRoom() {
    history.push('/addRoom');
  }

  return (
    <MainContainer onGoToAddRoom={handleGoToAddRoom} />
  );
}
