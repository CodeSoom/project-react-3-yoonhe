import { getDefaultMiddleware } from '@reduxjs/toolkit';
import configureStore from 'redux-mock-store';

import {
  watchAuthentication,
  loginRequest,
  loadRooms,
  initialAddRoomFields,
  requestAddRoom,
  signInRequest,
} from './slice';

import {
  getRooms,
  postLogin,
  getAuthentication,
  postSignup,
} from './service/api';

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
    });

    context('when login success', () => {
      beforeEach(() => {
        postLogin.mockResolvedValue('USER_INFOMATION');
      });

      it('runs setIsLoggedIn', async () => {
        await store.dispatch(loginRequest());

        const actions = store.getActions();

        expect(actions).toEqual([
          {
            type: 'roomPreviews/setIsLoggedIn',
            payload: true,
          },
        ]);
      });
    });

    context('when login failure', () => {
      beforeEach(() => {
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

  describe('signInRequest', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      store = mockStore({
        signInFields: {
          email: 'tester@example.com',
          password: 'test',
        },
      });
    });

    context('when signin success', () => {
      beforeEach(() => {
        postSignup.mockResolvedValue();
      });

      it('runs setIsLoggedIn', async () => {
        await store.dispatch(signInRequest());

        const actions = store.getActions();

        expect(actions).toEqual([
          {
            type: 'roomPreviews/setSignInRequest',
          },
          {
            type: 'roomPreviews/setSignInSuccess',
          },
        ]);
      });
    });

    context('when signin failure', () => {
      beforeEach(() => {
        postSignup.mockRejectedValue({
          code: 'auth/email-already-in-use',
        });
      });

      it('runs setIsLoggedIn with false', async () => {
        await store.dispatch(signInRequest());

        const actions = store.getActions();

        expect(actions).toEqual([
          {
            type: 'roomPreviews/setSignInRequest',
          },
          {
            type: 'roomPreviews/setSignInFailure',
            payload: '이미 사용중인 메일입니다 👀',
          },
        ]);
      });
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

    context('with logged in', () => {
      beforeEach(() => {
        getAuthentication.mockResolvedValue(true);
      });

      it('runs setRooms', async () => {
        await store.dispatch(watchAuthentication());

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
      beforeEach(() => {
        getAuthentication.mockResolvedValue(null);
      });

      it('runs setRooms', async () => {
        await store.dispatch(watchAuthentication());

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

  describe('requestAddRoom', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      store = mockStore({
        rooms: [],
        addRoomFields: {
          address: '서울시 강남구',
          moveInType: '전세',
          monthlyRent: '30',
          deposit: '5000',
          adminCost: '4',
          worm: 4,
          lightning: 4,
          ventilation: 4,
          moisture: 4,
          noise: 4,
          images: ['URL'],
        },
      });
    });

    it('runs set setAddRoomFields', async () => {
      await store.dispatch(requestAddRoom());

      const actions = store.getActions();

      expect(actions).toEqual([
        {
          type: 'roomPreviews/setAddRoomFields',
          payload: initialAddRoomFields,
        },
      ]);
    });
  });
});
