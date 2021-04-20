import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import SignInPage from './SignInPage';

import { email as EMAIL } from '../../fixtures/loginFields';

jest.mock('react-redux');
jest.mock('../service/api');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SignInPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: EMAIL,
        password: '1234',
      },
    }));
    useDispatch.mockImplementation(() => dispatch);
  });

  it('renders SignInPage', () => {
    const { queryByText } = render((
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    ));

    expect(queryByText('Welcome, RoomPreview!')).not.toBeNull();
  });

  it('routing to "Main" page when click "회원가입" button', () => {
    const { getByText } = render(<SignInPage />);

    fireEvent.click(getByText('회원가입'));

    expect(getByText('회원가입')).not.toBeNull();
  });

  it('routing to "Main" page when click "로그인 없이 구경하기 👀" button', () => {
    const { getByText } = render(<SignInPage />);

    fireEvent.click(getByText('로그인 없이 구경하기 👀'));

    expect(mockPush).toBeCalledWith('/main');
  });
});
