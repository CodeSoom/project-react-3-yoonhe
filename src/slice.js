import { createSlice } from '@reduxjs/toolkit';

import {
  postLogin,
  getAuthentication,
  getRooms,
} from './service/api';

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

const reducers = {
  changeLoginFields(state, { payload: { name, value } }) {
    const { loginFields } = state;

    return {
      ...state,
      loginFields: {
        ...loginFields,
        [name]: value,
      },
    };
  },
  setIsLoggedIn(state, { payload: isLoggedIn }) {
    return {
      ...state,
      isLoggedIn,
    };
  },
  setIsLoginError(state, { payload: loginError }) {
    return {
      ...state,
      loginError,
    };
  },
  setFirebaseReset(state, { payload: isResetFirebase }) {
    return {
      ...state,
      isResetFirebase,
    };
  },
  setRooms(state, { payload: rooms }) {
    return {
      ...state,
      rooms,
    };
  },
};

const { reducer, actions } = createSlice({
  name: 'roomPreviews',
  initialState,
  reducers,
});

export const {
  changeLoginFields,
  setIsLoggedIn,
  setFirebaseReset,
  setIsLoginError,
  setRooms,
} = actions;

export function loginRequest() {
  return async (dispatch, getState) => {
    const { loginFields } = getState();
    const { email, password } = loginFields;

    try {
      await postLogin({ email, password });
    } catch (error) {
      const errors = {
        'auth/user-not-found': '계정을 찾을 수 없습니다 👀',
        'auth/wrong-password': '비밀번호가 틀렸습니다 👀',
      };

      const { code } = error;

      dispatch(setIsLoginError(errors[code]));
    }
  };
}

export function userAuthenticationChange(user) {
  return (dispatch) => {
    dispatch(setFirebaseReset(false));
    const isLoggedIn = !!user;
    dispatch(setIsLoggedIn(isLoggedIn));
    dispatch(setFirebaseReset(true));
  };
}

export function firebaseAuthenticationChange(dispatch) {
  return (user) => {
    dispatch(userAuthenticationChange(user));
  };
}

export function watchAuthentication() {
  return async (dispatch) => {
    getAuthentication(firebaseAuthenticationChange(dispatch));
  };
}

export function loadRooms() {
  return async (dispatch) => {
    try {
      const rooms = await getRooms();
      dispatch(setRooms(rooms));
    } catch (error) {
      console.log(error);
    }
  };
}

export default reducer;
