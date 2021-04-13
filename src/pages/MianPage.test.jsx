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
    dispatch.mockReset();

    useDispatch.mockImplementation(() => dispatch);
  });

  it('renders MainPage', () => {
    const { queryByText } = render((
      <MainPage />
    ));

    expect(queryByText('메인 페이지')).not.toBeNull();
  });

  it('routing to "Add Room" page when click "방을 등록해볼까요?" button', () => {
    const { getByText } = render((
      <MainPage />
    ));

    fireEvent.click(getByText('방을 등록해볼까요?'));

    expect(mockPush).toBeCalledWith('/addRoom');
  });
});
