import React from 'react';
import { useDispatch } from 'react-redux';
import AddRoomScoreControls from '../components/AddRoomScoreControls';

import AddRoomTextControls from '../components/AddRoomTextControls';
import { setAddRoomFields } from '../slice';

export default function AddRoomContainer() {
  const dispatch = useDispatch();

  function handleChange({ name, value }) {
    dispatch(setAddRoomFields({ name, value }));
  }

  return (
    <div>
      <h2>살았던 혹은 살고계신 방을 알려주세요 😊</h2>
      <form>
        <AddRoomTextControls onChange={handleChange} />
        <AddRoomScoreControls onChange={handleChange} />
      </form>
    </div>
  );
}
