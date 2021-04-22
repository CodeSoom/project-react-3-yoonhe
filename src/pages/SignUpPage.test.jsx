import React from 'react';
import { useSelector } from 'react-redux';

import { render } from '@testing-library/react';

import SignUpPage from './SignUpPage';

import {
  email as EMAIL,
  password as PASSWORD,
} from '../../fixtures/loginFields';

jest.mock('react-redux');
jest.mock('../service/api');

describe('SignUpPage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: EMAIL,
        password: PASSWORD,
      },
      signUp: {
        loading: false,
        success: false,
        failure: false,
      },
      isLoggedIn: false,
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

  it('renders SignUpPage', () => {
    const { queryByText } = render(<SignUpPage />);

    expect(queryByText('회원가입')).not.toBeNull();
  });
});
