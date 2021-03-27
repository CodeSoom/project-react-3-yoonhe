import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import SignIn from './SignIn';

describe('SignIn', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleClick = jest.fn();

  function renderSignIn(fields = { email: '', password: '' }) {
    return render(<SignIn
      onChange={handleChange}
      onSubmit={handleSubmit}
      onClick={handleClick}
      fields={fields}
    />);
  }

  it('renders "Room Preview" Logo', () => {
    const { queryByText } = renderSignIn();

    expect(queryByText('Room Preview 🏠')).not.toBeNull();
  });

  it('renders input controls', () => {
    const email = 'test@gmail.com';
    const password = '1234';

    const { getByPlaceholderText } = renderSignIn({ email, password });

    const controls = [
      {
        placeholder: 'Email',
        value: email,
      },
      {
        placeholder: 'Password',
        value: password,
      },
    ];

    controls.forEach(({ placeholder, value }) => {
      const input = getByPlaceholderText(placeholder);

      expect(input).toHaveValue(value);
    });
  });

  it('calls onChange handler when change login feilds', () => {
    const email = 'test@gmail.com';
    const password = '1234';

    const { getByPlaceholderText } = renderSignIn();

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

  it('renders "방보러 가볼까요?" button', () => {
    const { queryByText } = renderSignIn();

    expect(queryByText('방보러 가볼까요? 👉🏻')).not.toBeNull();
  });

  it('calls onSubmit handler when click "방보러 가볼까요? 👉🏻" button', () => {
    const { getByText } = renderSignIn();

    fireEvent.click(getByText('방보러 가볼까요? 👉🏻'));

    expect(handleSubmit).toBeCalled();
  });

  it('renders "로그인 없이 구경하기" button', () => {
    const { queryByText } = renderSignIn();

    expect(queryByText('로그인 없이 구경하기 👀')).not.toBeNull();
  });

  it('calls onClick handler when click "로그인 없이 구경하기 👀" ', () => {
    const { queryByText } = renderSignIn();

    fireEvent.click(queryByText('로그인 없이 구경하기 👀'));

    expect(handleClick).toBeCalled();
  });
});
