import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import { email as EMAIL, password as PASSWORD } from '../../fixtures/loginFields';

jest.mock('react-redux');
jest.mock('../service/api');

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: EMAIL,
        password: PASSWORD,
      },
      isLoggedIn: given.isLoggedIn || false,
      signIn: {
        loading: false,
        success: false,
        failure: false,
      },
      addRoomFields: {
        address: '',
        moveInType: '',
        deposit: '',
        monthlyRent: '',
        adminCost: '',
        images: [],
      },
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

  context('when logged in', () => {
    given('isLoggedIn', () => true);
    it('renders "로그아웃" menu', () => {
      const path = '/App';
      const { queryByText } = renderApp({ path });

      expect(queryByText('로그아웃')).not.toBeNull();
    });
  });

  context('when logged out', () => {
    given('isLoggedIn', () => false);
    it('renders "로그인" menu', () => {
      const path = '/App';
      const { queryByText } = renderApp({ path });

      expect(queryByText('로그인')).not.toBeNull();
    });

    it('routing to "sign in" page when click "로그인" button', () => {
      const path = '/main';
      const { getByText } = renderApp({ path });

      fireEvent.click(getByText('로그인'));

      expect(mockPush).toBeCalledWith('/');
    });
  });

  it('renders navigation menu', () => {
    const menus = ['Home', '방 등록'];
    const path = '/App';
    const { queryByText } = renderApp({ path });

    menus.forEach((menu) => expect(queryByText(menu)).not.toBeNull());
  });

  it('listens firebase authentication state change', () => {
    renderApp();

    expect(dispatch).toBeCalled();
  });

  it('renders "회원가입" page', () => {
    const path = '/signUp';
    const { queryByText } = renderApp({ path });

    expect(queryByText('회원가입')).not.toBeNull();
  });

  it('renders "main" page', () => {
    const path = '/main';
    const { queryByText } = renderApp({ path });

    expect(queryByText('방 구경 👀')).not.toBeNull();
  });

  it('renders "addRoom" page', () => {
    const path = '/addRoom';
    const { queryByText } = renderApp({ path });

    expect(queryByText('살았던 혹은 살고계신 방을 알려주세요 😊')).not.toBeNull();
  });

  it('routing to "Add Room" page when click "방 등록" button', () => {
    const path = '/main';
    const { getByText } = renderApp({ path });

    fireEvent.click(getByText('방 등록'));

    expect(mockPush).toBeCalledWith('/addRoom');
  });

  it('routing to "Home" page when click "Home" button', () => {
    const path = '/main';
    const { getByText } = renderApp({ path });

    fireEvent.click(getByText('Home'));

    expect(mockPush).toBeCalledWith('/main');
  });
});
