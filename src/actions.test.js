import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

import {
  watchAuthentication, loadRooms, loginRequest, userAuthenticationChange,
} from './slice';

import { getRooms, postLogin, getAuthentication } from './service/api';

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

jest.mock('./service/api');
jest.mock('./service/firebase');

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

  describe('loadRooms', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      store = mockStore({
        loginFields: {
          rooms: [],
        },
      });

      getRooms.mockResolvedValue([]);
    });

    it('runs setRooms', async () => {
      await store.dispatch(loadRooms());

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: 'roomPreviews/setRooms',
          payload: [],
        },
      ]);
    });
  });

  describe('watchAuthentication', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      store = mockStore({});
    });

    it('runs setRooms', async () => {
      await store.dispatch(watchAuthentication());

      expect(getAuthentication).toBeCalled();
    });
  });

  describe('userAuthenticationChange', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      store = mockStore({});
    });

    context('with logged in', () => {
      it('runs setRooms', async () => {
        await store.dispatch(userAuthenticationChange('USER'));

        const actions = store.getActions();

        expect(actions).toEqual([
          {
            type: 'roomPreviews/setFirebaseReset',
            payload: false,
          },
          {
            type: 'roomPreviews/setIsLoggedIn',
            payload: true,
          },
          {
            type: 'roomPreviews/setFirebaseReset',
            payload: true,
          },
        ]);
      });
    });

    context('with logged out', () => {
      it('runs setRooms', async () => {
        await store.dispatch(userAuthenticationChange(null));

        const actions = store.getActions();

        expect(actions).toEqual([
          {
            type: 'roomPreviews/setFirebaseReset',
            payload: false,
          },
          {
            type: 'roomPreviews/setIsLoggedIn',
            payload: false,
          },
          {
            type: 'roomPreviews/setFirebaseReset',
            payload: true,
          },
        ]);
      });
    });
  });
});
