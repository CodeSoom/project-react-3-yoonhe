import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

import { loginRequest } from './slice';

import { postLogin } from './service/api';

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

jest.mock('./service/api');
jest.mock('./firebase');

describe('actions', () => {
  let store;
  describe('loginRequest', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      store = mockStore({
        loginFields: {
          email: 'tester@example.com',
          password: 'test',
        },
      });

      postLogin.mockRejectedValue({
        code: 'auth/user-not-found',
      });
    });

    it('runs setIsLoggedIn with false', async () => {
      await store.dispatch(loginRequest());

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: 'roomPreviews/setIsLoginError',
          payload: '계정을 찾을 수 없습니다 👀',
        },
      ]);
    });
  });
});