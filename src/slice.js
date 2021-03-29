import { createSlice } from '@reduxjs/toolkit';

import { postLogin, getAuthentication } from './service/api';

const initialState = {
  isResetFirebase: false,
  isLoggedIn: false,
  loginError: null,
  loginFields: {
    email: '',
    password: '',
  },
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

export function authenticationChange() {
  return async (dispatch) => {
    getAuthentication(dispatch);
  };
}

export default reducer;
