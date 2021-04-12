import reducer, {
  changeLoginFields,
  setIsLoggedIn,
  setFirebaseReset,
  setIsLoginError,
  setRooms,
  setAddRoomFields,
  setAddRoomImagesField,
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
      addRoomFields: {
        address: '',
        moveInType: '',
        deposit: '',
        monthlyRent: '',
        adminCost: '',
        lightning: null,
        ventilation: null,
        moisture: null,
        worm: null,
        noise: null,
        images: [],
      },
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

  describe('setAddRoomFields', () => {
    it('change addRoomFields', () => {
      const initialState = {
        addRoomFields: {},
      };

      const state = reducer(initialState, setAddRoomFields({
        name: 'address',
        value: '서울시 강남구 역삼동',
      }));

      expect(state.addRoomFields.address).toBe('서울시 강남구 역삼동');
    });
  });

  describe('setAddRoomImagesField', () => {
    it('change images in addRoomFields', () => {
      const initialState = {
        addRoomFields: {
          images: [],
        },
      };

      const state = reducer(initialState, setAddRoomImagesField([
        'FILE_1',
        'FILE_2',
        'FILE_3',
      ]));

      expect(state.addRoomFields.images).toHaveLength(3);
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
