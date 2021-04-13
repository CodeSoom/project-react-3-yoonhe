import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomList from '../components/RoomList';

import { loadRooms } from '../slice';
import { get } from '../../utils';

export default function MainContainer({ onGoToAddRoom }) {
  const dispatch = useDispatch();

  const rooms = useSelector(get('rooms'));

  useEffect(() => {
    dispatch(loadRooms());
  }, []);

  return (
    <div>
      메인 페이지
      <p>
        <button type="button" onClick={onGoToAddRoom}>방을 등록해볼까요?</button>
      </p>
      <h2>베스트 하우스 ✨</h2>
      <RoomList rooms={rooms} />
    </div>
  );
}
