import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';

import MainPage from './MainPage';

jest.mock('../service/api');
jest.mock('react-redux');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('MainPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useDispatch.mockImplementation(() => dispatch);
  });

  it('renders MainPage', () => {
    const { queryByText } = render((
      <MainPage />
    ));

    expect(queryByText('Room Preview 🏠')).not.toBeNull();
  });

  it('routing to "Add Room" page when click "방 등록" button', () => {
    const { getByText } = render((
      <MainPage />
    ));

    fireEvent.click(getByText('방 등록'));

    expect(mockPush).toBeCalledWith('/addRoom');
  });

  it('routing to "Home" page when click "Home" button', () => {
    const { getByText } = render((
      <MainPage />
    ));

    fireEvent.click(getByText('Home'));

    expect(mockPush).toBeCalledWith('/main');
  });
});
