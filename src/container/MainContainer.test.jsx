import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import MainContainer from './MainContainer';
import ROOMS from '../../fixtures/rooms';

jest.mock('react-redux');
jest.mock('../service/api');

describe('MainContainer', () => {
  const dispatch = jest.fn();
  const handleGoToAddRoom = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    useSelector.mockImplementation((selector) => selector({
      rooms: ROOMS,
      isLoggedIn: given?.isLoggedIn || false,
      loginError: given?.loginError || null,
      loginFields: {
        email: '',
        password: '',
      },
    }));
    useDispatch.mockImplementation(() => dispatch);
  });

  function renderMainContainer() {
    return render(<MainContainer onGoToAddRoom={handleGoToAddRoom} />);
  }

  it('renders "방등록" button', () => {
    const { queryByText } = renderMainContainer();

    expect(queryByText('방을 등록해볼까요?')).not.toBeNull();
  });

  it('calls onClick handler when "방을 등록해볼까요?" button', () => {
    const { getByText } = renderMainContainer();

    fireEvent.click(getByText('방을 등록해볼까요?'));

    expect(handleGoToAddRoom).toBeCalled();
  });

  it('renders rooms', () => {
    const { queryByText } = renderMainContainer();

    const contents = [
      '방 구경 👀',
      '서울시 강남구',
      '월세 50/3000',
      '채광 ☀️',
      '습기 💧️',
      '통풍 🍃',
    ];

    contents.forEach((content) => {
      expect(queryByText(content)).not.toBeNull();
    });
  });

  it('dispatches "loadRooms" action', () => {
    renderMainContainer();

    expect(dispatch).toBeCalled();
  });

  it('renders room images', () => {
    const { queryByAltText } = renderMainContainer();

    expect(queryByAltText('방 이미지').src).toBe('http://localhost/IMAGE_URL_1');
  });
});
