import reducer, {
  changeLoginFields, setIsLoggedIn, setFirebaseReset, setIsLoginError, setRooms,
} from './slice';

import { email as EMAIL } from '../fixtures/loginFields';

jest.mock('./service/api');
jest.mock('./service/firebase');

describe('reducer', () => {
  it('renders initial data', () => {
    const initialState = {
      isResetFirebase: false,
      isLoggedIn: false,
      loginError: null,
      loginFields: {
        email: '',
        password: '',
      },
      rooms: [],
    };

    const state = reducer(undefined, { type: 'none' });

    expect(state).toEqual(initialState);
  });

  describe('setIsLoggedIn', () => {
    it('change isLoggedIn', () => {
      const initialState = {
        isLoggedIn: false,
      };

      const state = reducer(initialState, setIsLoggedIn(true));

      expect(state.isLoggedIn).toBe(true);
    });
  });

  describe('setFirebaseReset', () => {
    it('change isResetFirebase', () => {
      const initialState = {
        isResetFirebase: false,
      };

      const state = reducer(initialState, setFirebaseReset(true));

      expect(state.isResetFirebase).toBe(true);
    });
  });

  describe('setIsLoginError', () => {
    it('change loginError', () => {
      const initialState = {
        loginError: null,
      };

      const state = reducer(initialState, setIsLoginError('LOGIN_ERROR_MESSAGE'));

      expect(state.loginError).toBe('LOGIN_ERROR_MESSAGE');
    });
  });

  describe('setRooms', () => {
    it('change rooms', () => {
      const initialState = {
        rooms: [],
      };

      const state = reducer(initialState, setRooms([
        {
          address: '서울시 강남구',
        },
      ]));

      expect(state.rooms[0].address).toBe('서울시 강남구');
    });
  });

  describe('changeLoginField', () => {
    it('change loginFields', () => {
      const initialState = {
        loginFields: {
          email: '',
          password: '',
        },
      };

      const state = reducer(initialState, changeLoginFields({
        name: 'email',
        value: EMAIL,
      }));

      expect(state.loginFields.email).toBe(EMAIL);
      expect(state.loginFields.password).toBe('');
    });
  });
});
