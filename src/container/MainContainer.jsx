import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import RoomList from '../components/RoomList';

import { loadRooms } from '../slice';
import { get } from '../../utils';

export default function MainContainer({ onGoToAddRoom }) {
  const dispatch = useDispatch();

  const rooms = useSelector(get('rooms'));

  useEffect(() => {
    dispatch(loadRooms());
  }, []);

  const LeftSection = styled.section({
    position: 'fixed',
    left: '0',
    top: '0',
    padding: '3rem 2rem',
    width: '300px',
    height: '100%',
    background: '#fff',
    boxSizing: 'border-box',
  });

  const CenterSection = styled.section({
    padding: '3rem 2rem',
    marginLeft: '300px',
  });

  return (
    <div>
      <LeftSection>
        <div>
          <h2>Room Preview 🏠</h2>
        </div>
        <p>
          <button type="button" onClick={onGoToAddRoom}>방을 등록해볼까요?</button>
        </p>
      </LeftSection>
      <CenterSection>
        <h2>방 구경 👀</h2>
        <RoomList rooms={rooms} />
      </CenterSection>
    </div>
  );
}
