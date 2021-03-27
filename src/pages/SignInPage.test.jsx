import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { useSelector } from 'react-redux';

import { MemoryRouter } from 'react-router-dom';

import SignInPage from './SignInPage';

jest.mock('react-redux');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('SignInPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: 'test@gmail.com',
        password: '1234',
      },
    }));
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
