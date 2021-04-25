import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { MdVpnKey } from 'react-icons/md';

import AddRoomScoreControls from '../components/AddRoomScoreControls';
import AddRoomTextControls from '../components/AddRoomTextControls';
import AddRoomImageControls from '../components/AddRoomImageControls';

import {
  requestAddRoom,
  changeAddRoomFields,
  changeRoomImages,
} from '../slice';

import { Button, ButtonBox } from '../styles/button';

import { get, getMediaQuery, getUploadImages } from '../../utils';

const breakpoints = [900];
const mediaQuery = getMediaQuery(breakpoints);

const Title = styled.h2({
  marginBottom: '1em',
  fontSize: '2rem',
  textAlign: 'center',
  color: '#75A293',
});

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

const FormWrap = styled.div({
  display: 'flex',
  '& > *': {
    flex: 1,
  },
  '& > * + *': {
    margin: '0 0 0 1em',
  },
  [[mediaQuery[900]]]: {
    flexDirection: 'column',
    '& > * + *': {
      margin: '2em 0 0 0',
    },
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

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(requestAddRoom());

    onGoToMain();
  }

  async function handleFileChange({ files }) {
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
      <Title>살았던 혹은 살고계신 방을 알려주세요 😊</Title>
      <form onSubmit={handleSubmit}>
        <FormWrap>
          <AddRoomTextControls onChange={handleChange} />
          <AddRoomScoreControls onChange={handleChange} />
        </FormWrap>
        <FormWrap>
          <AddRoomImageControls onChange={handleFileChange} images={images} />
        </FormWrap>
        <ButtonBox>
          <Button type="submit">등록하기</Button>
        </ButtonBox>
      </form>
    </div>
  );
}
