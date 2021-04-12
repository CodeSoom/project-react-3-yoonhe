import React from 'react';
import { useHistory } from 'react-router-dom';

import AddRoomContainer from '../container/AddRoomContainer';

export default function MianPage() {
  const history = useHistory();

  function handleGoToMain() {
    history.push('/main');
  }

  return (
    <AddRoomContainer onGoToMain={handleGoToMain} />
  );
}
