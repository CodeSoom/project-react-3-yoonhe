import React from 'react';
import { useHistory } from 'react-router-dom';

import MainContainer from '../container/MainContainer';

export default function MianPage() {
  const history = useHistory();

  function handlePageMove(path) {
    history.push(path);
  }

  return (
    <MainContainer
      onPageMove={handlePageMove}
    />
  );
}
