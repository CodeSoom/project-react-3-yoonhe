import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SignUp from './SignUp';

import { email as EMAIL, password as PASSWORD } from '../../fixtures/loginFields';

describe('SignUp', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  function renderSignUp() {
    return render(<SignUp
      onChange={handleChange}
      onSubmit={handleSubmit}
    />);
  }

  it('renders Email field', () => {
    const { queryByPlaceholderText } = renderSignUp();

    expect(queryByPlaceholderText('Email')).not.toBeNull();
  });

  it('renders Passwrord field', () => {
    const { queryByPlaceholderText } = renderSignUp();

    expect(queryByPlaceholderText('Password')).not.toBeNull();
  });

  it('renders "완료" button', () => {
    const { queryByPlaceholderText } = renderSignUp();

    expect(queryByPlaceholderText('Password')).not.toBeNull();
  });

  it('calls onChange handler when change login feilds', () => {
    const email = EMAIL;
    const password = PASSWORD;

    const { getByPlaceholderText } = renderSignUp();

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

      expect(handleChange).toBeCalledWith({
        name,
        value,
      });
    });
  });

  it('calls onSubmit handler when "완료" button click', () => {
    const { getByText } = renderSignUp();

    fireEvent.submit(getByText('완료'));

    expect(handleSubmit).toBeCalled();
  });
});
