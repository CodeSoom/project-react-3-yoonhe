import reducer, {
  setIsLoggedIn,
  setFirebaseReset,
  setIsLoginError,
  setRooms,
  setAddRoomFields,
  changeLoginFields,
  changeAddRoomFields,
  changeRoomImages,
  initialAddRoomFields,
  changeSignInFields,
  setSignUpRequest,
  setSignUpSuccess,
  setSignUpFailure,
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
      signInFields: {
        email: '',
        password: '',
      },
      signUp: {
        loading: false,
        success: false,
        failure: false,
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

      const state = reducer(initialState, setAddRoomFields(initialAddRoomFields));

      expect(state.addRoomFields).toEqual(initialAddRoomFields);
    });
  });

  describe('changeRoomImages', () => {
    it('change images in addRoomFields', () => {
      const initialState = {
        addRoomFields: {
          images: [],
        },
      };

      const state = reducer(initialState, changeRoomImages([
        'FILE_1',
        'FILE_2',
        'FILE_3',
      ]));

      expect(state.addRoomFields.images).toHaveLength(3);
    });
  });

  describe('changeAddRoomFields', () => {
    it('change addRoomFields', () => {
      const initialState = {
        addRoomFields: {},
      };

      const state = reducer(initialState, changeAddRoomFields({
        name: 'address',
        value: '서울시 강남구 역삼동',
      }));

      expect(state.addRoomFields.address).toBe('서울시 강남구 역삼동');
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

  describe('changeSignInFields', () => {
    it('change signInFields', () => {
      const initialState = {
        signInFields: {
          email: '',
          password: '',
        },
      };

      const state = reducer(initialState, changeSignInFields({
        name: 'email',
        value: EMAIL,
      }));

      expect(state.signInFields.email).toBe(EMAIL);
      expect(state.signInFields.password).toBe('');
    });
  });

  describe('siginInRequest', () => {
    it('change signIn loading', () => {
      const initialState = {
        signUp: {
          loading: false,
          success: false,
          failure: false,
        },
      };

      const state = reducer(initialState, setSignUpRequest());

      expect(state.signUp.loading).toBe(true);
      expect(state.signUp.success).toBe(false);
      expect(state.signUp.failure).toBe(false);
    });
  });

  describe('setSignUpSuccess', () => {
    it('change signIn loading and success', () => {
      const initialState = {
        signUp: {
          loading: true,
          success: false,
          failure: 'ERROR_MESSAGE',
        },
      };

      const state = reducer(initialState, setSignUpSuccess());

      expect(state.signUp.loading).toBe(false);
      expect(state.signUp.success).toBe(true);
      expect(state.signUp.failure).toBe(false);
    });
  });

  describe('setSignUpFailure', () => {
    it('change signIn loading and failure', () => {
      const initialState = {
        signUp: {
          loading: true,
          success: false,
          failure: false,
        },
      };

      const state = reducer(initialState, setSignUpFailure('ERROR_MESSAGE'));

      expect(state.signUp.loading).toBe(false);
      expect(state.signUp.success).toBe(false);
      expect(state.signUp.failure).toBe('ERROR_MESSAGE');
    });
  });
});
