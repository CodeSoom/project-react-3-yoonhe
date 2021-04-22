import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import SignUpContainer from './SignUpContainer';

import {
  email as EMAIL,
  password as PASSWORD,
} from '../../fixtures/loginFields';

jest.mock('react-redux');
jest.mock('../service/api');

describe('SignUpContainer', () => {
  const dispatch = jest.fn();
  const handlePageMove = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: EMAIL,
        password: PASSWORD,
      },
      signUp: {
        loading: given.signinLoading || false,
        success: given.signinSuccess || false,
        failure: given.signinFailure || false,
      },
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

  function renderSignUpContainer() {
    return render(<SignUpContainer onPageMove={handlePageMove} />);
  }

  it('renders Email field', () => {
    const { queryByPlaceholderText } = renderSignUpContainer();

    expect(queryByPlaceholderText('Email')).not.toBeNull();
  });

  it('renders Passwrord field', () => {
    const { queryByPlaceholderText } = renderSignUpContainer();

    expect(queryByPlaceholderText('Password')).not.toBeNull();
  });

  it('calls onChange handler when change email feild', () => {
    const email = EMAIL;
    const password = PASSWORD;

    const { getByPlaceholderText } = renderSignUpContainer();

    const controls = [
      {
        name: 'email',
        placeholder: 'Email',
        value: email,
      },
      {
        name: 'password',
        placeholder: 'Password',
        value: password,
      },
    ];

    controls.forEach(({ name, placeholder, value }) => {
      fireEvent.change(getByPlaceholderText(placeholder), {
        target: {
          value,
        },
      });

      expect(dispatch).toBeCalledWith({
        type: 'roomPreviews/changeSignInFields',
        payload: {
          name,
          value,
        },
      });
    });
  });

  it('renders "완료" button', () => {
    const { queryByPlaceholderText } = renderSignUpContainer();

    expect(queryByPlaceholderText('Password')).not.toBeNull();
  });

  it('calls onSubmit handler when "완료" button', () => {
    const { getByText } = renderSignUpContainer();

    fireEvent.click(getByText('완료'));

    expect(dispatch).toBeCalled();
  });

  context('when sign up success', () => {
    given('signinSuccess', () => true);

    it('routing to "main" page', () => {
      renderSignUpContainer();

      expect(handlePageMove).toBeCalledWith('/main');
    });
  });

  context('when sign up failure', () => {
    given('signinFailure', () => 'ERROR_MESSAGE');

    it('renders error messages', () => {
      const { queryByText } = renderSignUpContainer();

      expect(queryByText('ERROR_MESSAGE')).not.toBeNull();
    });
  });
});
