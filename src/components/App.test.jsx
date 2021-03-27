import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';

import App from './App';

jest.mock('react-redux');

describe('App', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: 'test@gmail.com',
        password: '1234',
      },
      isLoggedIn: false,
    }));
  });

  function renderApp({ path = '/' } = {}) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

  it('renders welcome messages and service Introduction', () => {
    const { queryByText } = renderApp();

    expect(queryByText('Welcome, RoomPreview!')).not.toBeNull();
    expect(queryByText('이 서비스는 여러분이 살고싶은 집에 미리 살아본 사람들의 경험담을 공유하여 여러분이 후회없는 선택을 할 수 있도록 도와줍니다')).not.toBeNull();
  });

  it('renders "회원가입" button', () => {
    const { queryByText } = renderApp();

    expect(queryByText('회원가입')).not.toBeNull();
  });

  it('renders "Room Preview" Logo', () => {
    const { queryByText } = renderApp();

    expect(queryByText('Room Preview 🏠')).not.toBeNull();
  });

  it('renders Email field', () => {
    const { queryByPlaceholderText } = renderApp();

    expect(queryByPlaceholderText('Email')).not.toBeNull();
  });

  it('renders Password field', () => {
    const { queryByPlaceholderText } = renderApp();

    expect(queryByPlaceholderText('Password')).not.toBeNull();
  });

  it('renders "방보러 가볼까요?" button', () => {
    const { queryByText } = renderApp();

    expect(queryByText('방보러 가볼까요? 👉🏻')).not.toBeNull();
  });

  it('renders "로그인 없이 구경하기" button', () => {
    const { queryByText } = renderApp();

    expect(queryByText('로그인 없이 구경하기 👀')).not.toBeNull();
  });

  it('renders "회원가입" page', () => {
    const path = '/signup';
    const { queryByText } = renderApp({ path });

    expect(queryByText('회원가입')).not.toBeNull();
  });

  it('renders "main" page', () => {
    const path = '/main';
    const { queryByText } = renderApp({ path });

    expect(queryByText('Main')).not.toBeNull();
  });
});
