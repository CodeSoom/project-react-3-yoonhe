import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import SignInContainer from './SignInContainer';

import { email as EMAIL } from '../../fixtures/loginFields';

jest.mock('react-redux');
jest.mock('../service/api');

describe('SignInContainer', () => {
  const dispatch = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    useSelector.mockImplementation((selector) => selector({
      isLoggedIn: given?.isLoggedIn || false,
      loginError: given?.loginError || null,
      loginFields: {
        email: '',
        password: '',
      },
    }));
    useDispatch.mockImplementation(() => dispatch);
  });

  function renderSignInContainer() {
    return render(<SignInContainer onGoToMainClick={handleClick} />);
  }

  it('listens authentication change', () => {
    renderSignInContainer();

    expect(dispatch).toBeCalled();
  });

  it('renders Email field', () => {
    const { queryByPlaceholderText } = renderSignInContainer();

    expect(queryByPlaceholderText('Email')).not.toBeNull();
  });

  it('calls onChange handler when change email feild', () => {
    const { getByPlaceholderText } = renderSignInContainer();

    fireEvent.change(getByPlaceholderText('Email'), {
      target: {
        value: EMAIL,
      },
    });

    expect(dispatch).toBeCalledWith({
      type: 'roomPreviews/changeLoginFields',
      payload: {
        name: 'email',
        value: EMAIL,
      },
    });
  });

  it('renders Password field', () => {
    const { queryByPlaceholderText } = renderSignInContainer();

    expect(queryByPlaceholderText('Password')).not.toBeNull();
  });

  it('calls onChange handler when change password feild', () => {
    const { getByPlaceholderText } = renderSignInContainer();

    fireEvent.change(getByPlaceholderText('Password'), {
      target: {
        value: '123123',
      },
    });

    expect(dispatch).toBeCalledWith({
      type: 'roomPreviews/changeLoginFields',
      payload: {
        name: 'password',
        value: '123123',
      },
    });
  });

  it('calls onChange handler when change password feild', () => {
    const { getByPlaceholderText } = renderSignInContainer();

    fireEvent.change(getByPlaceholderText('Password'), {
      target: {
        value: '123123',
      },
    });

    expect(dispatch).toBeCalledWith({
      type: 'roomPreviews/changeLoginFields',
      payload: {
        name: 'password',
        value: '123123',
      },
    });
  });

  it('calls onSubmit handler when click "방보러 가볼까요? 👉🏻" button', () => {
    const { getByText } = renderSignInContainer();

    fireEvent.click(getByText('방보러 가볼까요? 👉🏻'));

    expect(dispatch).toBeCalled();
  });

  it('calls onClick handler when click "로그인 없이 구경하기 👀" button', () => {
    const { getByText } = renderSignInContainer();

    fireEvent.click(getByText('로그인 없이 구경하기 👀'));

    expect(handleClick).toBeCalled();
  });

  it('listens authentication state change', () => {
    renderSignInContainer();

    expect(dispatch).toBeCalled();
  });

  context('when logout', () => {
    it('listens listens firebase authentication state change', () => {
      renderSignInContainer();

      expect(dispatch).toBeCalled();
    });
  });

  context('when login', () => {
    given('isLoggedIn', () => true);
    it('listens isLoggedIn state change', () => {
      renderSignInContainer();

      expect(handleClick).toBeCalled();
    });
  });

  context('when login fail', () => {
    given('loginError', () => 'LOGIN_ERROR_MESSAGE');
    it('renders login error message when login fail', async () => {
      const { queryByText } = renderSignInContainer();
      expect(queryByText('LOGIN_ERROR_MESSAGE')).not.toBeNull();
    });
  });

  context('when login success', () => {
    given('loginError', () => null);
    it('renders login error message when login fail', async () => {
      const { queryByText } = renderSignInContainer();
      expect(queryByText('LOGIN_ERROR_MESSAGE')).toBeNull();
    });
  });
});
