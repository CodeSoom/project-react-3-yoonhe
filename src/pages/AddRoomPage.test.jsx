import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddRoomPage from './AddRoomPage';

jest.mock('../service/api');
jest.mock('react-redux');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('AddRoomPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockReset();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      isLoggedIn: given.isLoggedIn || false,
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

  context('when logged in', () => {
    given('isLoggedIn', () => true);

    it('renders AddRoomPage', () => {
      const { queryByText } = render((
        <AddRoomPage />
      ));

      expect(queryByText('살았던 혹은 살고계신 방을 알려주세요 😊')).not.toBeNull();
    });

    it('routing to "Main" page when "등록하기" button click', () => {
      const { getByText } = render((
        <AddRoomPage />
      ));

      fireEvent.click(getByText('등록하기'));

      expect(mockPush).toBeCalledWith('/main');
    });
  });

  context('when logged out', () => {
    given('isLoggedIn', () => false);

    it('renders AddRoomPage', () => {
      const { queryByText } = render((
        <AddRoomPage />
      ));

      expect(queryByText('살았던 혹은 살고계신 방을 알려주세요 😊')).toBeNull();
    });

    it('routing to "Main" page when "등록하기" button click', () => {
      const { queryByText } = render((
        <AddRoomPage />
      ));

      expect(queryByText('등록하기')).toBeNull();
    });
  });
});
