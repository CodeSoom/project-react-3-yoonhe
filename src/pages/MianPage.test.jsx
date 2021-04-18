import { render } from '@testing-library/react';
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

    expect(queryByText('방 구경 👀')).not.toBeNull();
  });
});
