import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import SignInContainer from './SignInContainer';

jest.mock('react-redux');

describe('SignInContainer', () => {
  const dispatch = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: '',
        password: '',
      },
    }));
    useDispatch.mockImplementation(() => dispatch);
  });

  function renderSignInContainer() {
    return render(<SignInContainer onClick={handleClick} />);
  }

  it('renders Email field', () => {
    const { queryByPlaceholderText } = renderSignInContainer();

    expect(queryByPlaceholderText('Email')).not.toBeNull();
  });

  it('calls onChange handler when change email feild', () => {
    const { getByPlaceholderText } = renderSignInContainer();

    fireEvent.change(getByPlaceholderText('Email'), {
      target: {
        value: 'test@gmail.com',
      },
    });

    expect(dispatch).toBeCalledWith({
      type: 'roomPreviews/changeLoginFields',
      payload: {
        name: 'email',
        value: 'test@gmail.com',
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

  it('calls onClick handler when click "로그인 없이 구경하기 👀" button', () => {
    const { getByText } = renderSignInContainer();

    fireEvent.click(getByText('로그인 없이 구경하기 👀'));

    expect(handleClick).toBeCalled();
  });
});
