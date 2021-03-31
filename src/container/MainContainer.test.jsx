import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import MainContainer from './MainContainer';
import ROOMS from '../../fixtures/rooms';

jest.mock('react-redux');
jest.mock('../service/api');

describe('MainContainer', () => {
  const dispatch = jest.fn();

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
    return render(<MainContainer />);
  }

  it('renders rooms', () => {
    const { queryByText } = renderMainContainer();

    expect(queryByText('베스트 하우스 ✨')).not.toBeNull();
    expect(queryByText('서울시 강남구')).not.toBeNull();
    expect(queryByText('월세 50/3000')).not.toBeNull();
    expect(queryByText('채광 ☀️')).not.toBeNull();
    expect(queryByText('습기 💧️')).not.toBeNull();
    expect(queryByText('통풍 🍃')).not.toBeNull();
  });

  it('dispatches "loadRooms" action', () => {
    renderMainContainer();

    expect(dispatch).toBeCalled();
  });
});
