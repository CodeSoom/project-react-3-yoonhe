import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RoomList from '../components/RoomList';

import { loadRooms } from '../slice';
import { get } from '../../utils';

import CenterSection from '../styles/CenterSection';

export default function MainContainer() {
  const dispatch = useDispatch();

  const rooms = useSelector(get('rooms'));

  useEffect(() => {
    dispatch(loadRooms());
  }, []);

  return (
    <CenterSection>
      <h2>방 구경 👀</h2>
      <RoomList rooms={rooms} />
    </CenterSection>
  );
}
