import { render } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';

import MainPage from './MainPage';

jest.mock('../service/api');
jest.mock('react-redux');

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
});
