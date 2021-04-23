import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { MdVpnKey } from 'react-icons/md';

import AddRoomScoreControls from '../components/AddRoomScoreControls';
import AddRoomTextControls from '../components/AddRoomTextControls';

import {
  requestAddRoom,
  changeAddRoomFields,
  changeRoomImages,
} from '../slice';

import { get, getUploadImages } from '../../utils';

const LoginRequestMessage = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  h2: {
    color: '#75A293',
    marginTop: '1rem',
  },
});

export default function AddRoomContainer({ onGoToMain }) {
  const addRoomFields = useSelector(get('addRoomFields'));
  const isLoggedIn = useSelector(get('isLoggedIn'));

  const { images } = addRoomFields;

  const dispatch = useDispatch();

  function handleChange({ name, value }) {
    dispatch(changeAddRoomFields({ name, value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    dispatch(requestAddRoom());

    onGoToMain();
  }

  async function handleFileChange(event) {
    const { files } = event.target;

    const uploadImages = await getUploadImages(files);

    dispatch(changeRoomImages(uploadImages));
  }

  if (!isLoggedIn) {
    return (
      <LoginRequestMessage>
        <p><MdVpnKey size="50" color="#75A293" /></p>
        <h2>로그인이 필요한 페이지 입니다</h2>
      </LoginRequestMessage>
    );
  }

  return (
    <div>
      <h2>살았던 혹은 살고계신 방을 알려주세요 😊</h2>
      <form onSubmit={handleSubmit}>
        <AddRoomTextControls onChange={handleChange} />
        <AddRoomScoreControls onChange={handleChange} />
        <div>
          <p>
            <label htmlFor="input-upload">방 사진 등록하기</label>
            <input
              id="input-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
          </p>
          <ul>
            {images.map((image) => (
              <li key={image}>
                <img
                  src={image}
                  width="50px"
                  height="50px"
                  title="방 사진"
                />
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
