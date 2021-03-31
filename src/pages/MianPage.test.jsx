import { render } from '@testing-library/react';
import React from 'react';
import { useDispatch } from 'react-redux';

import MianPage from './MainPage';

jest.mock('../service/api');
jest.mock('react-redux');

describe('MianPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockReset();

    useDispatch.mockImplementation(() => dispatch);
  });

  it('renders MianPage', () => {
    const { queryByText } = render((
      <MianPage />
    ));

    expect(queryByText('메인 페이지')).not.toBeNull();
  });
});
