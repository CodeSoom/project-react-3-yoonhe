import { render } from '@testing-library/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddRoomPage from './AddRoomPage';

jest.mock('../service/api');
jest.mock('react-redux');

describe('AddRoomPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockReset();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      addRoomFields: {
        address: '',
        moveInType: '',
        deposit: '',
        monthlyRent: '',
        adminCost: '',
        images: [],
      },
    }));
  });

  it('renders AddRoomPage', () => {
    const { queryByText } = render((
      <AddRoomPage />
    ));

    expect(queryByText('살았던 혹은 살고계신 방을 알려주세요 😊')).not.toBeNull();
  });
});
