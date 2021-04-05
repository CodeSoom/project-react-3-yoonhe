import React from 'react';

import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import { email as EMAIL, password as PASSWORD } from '../../fixtures/loginFields';

jest.mock('react-redux');
jest.mock('../service/api');

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: EMAIL,
        password: PASSWORD,
      },
      isLoggedIn: false,
    }));
    useDispatch.mockImplementation(() => dispatch);
  });

  function renderApp({ path = '/' } = {}) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

  it('listens listens firebase authentication state change', () => {
    renderApp();

    expect(dispatch).toBeCalled();
  });

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

    expect(queryByText('메인 페이지')).not.toBeNull();
  });

  it('renders "addRoom" page', () => {
    const path = '/addRoom';
    const { queryByText } = renderApp({ path });

    expect(queryByText('살았던 혹은 살고계신 방을 알려주세요 😊')).not.toBeNull();
  });
});
