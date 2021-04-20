import { createSlice } from '@reduxjs/toolkit';

import {
  postLogin,
  getAuthentication,
  getRooms,
  postRoom,
  getSavedFileLink,
  postSignup,
} from './service/api';

export const initialAddRoomFields = {
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
};

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
  signIn: {
    loading: false,
    success: false,
    failure: false,
  },
  rooms: [],
  addRoomFields: initialAddRoomFields,
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
  changeAddRoomFields(state, { payload: { name, value } }) {
    const { addRoomFields } = state;
    return {
      ...state,
      addRoomFields: {
        ...addRoomFields,
        [name]: value,
      },
    };
  },
  changeSignInFields(state, { payload: { name, value } }) {
    const { signInFields } = state;

    return {
      ...state,
      signInFields: {
        ...signInFields,
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
  setSignInRequest(state) {
    const { signIn } = state;

    return {
      ...state,
      signIn: {
        ...signIn,
        loading: true,
      },
    };
  },
  setSignInSuccess(state) {
    const { signIn } = state;

    return {
      ...state,
      signIn: {
        ...signIn,
        loading: false,
        success: true,
        failure: false,
      },
    };
  },
  setSignInFailure(state, { payload: errorMessage }) {
    const { signIn } = state;

    return {
      ...state,
      signIn: {
        ...signIn,
        loading: false,
        failure: errorMessage,
      },
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
  setAddRoomFields(state, { payload: addRoomFields }) {
    return {
      ...state,
      addRoomFields,
    };
  },
  changeRoomImages(state, { payload: newImages }) {
    const { addRoomFields } = state;
    const { images } = addRoomFields;

    return {
      ...state,
      addRoomFields: {
        ...addRoomFields,
        images: [...images, ...newImages],
      },
    };
  },
};

const { reducer, actions } = createSlice({
  name: 'roomPreviews',
  initialState,
  reducers,
});

export const {
  setIsLoggedIn,
  setFirebaseReset,
  setIsLoginError,
  setRooms,
  setAddRoomFields,
  changeLoginFields,
  changeAddRoomFields,
  changeRoomImages,
  addRoom,
  changeSignInFields,
  setSignInRequest,
  setSignInSuccess,
  setSignInFailure,
} = actions;

export function loginRequest() {
  return async (dispatch, getState) => {
    const { loginFields } = getState();
    const { email, password } = loginFields;

    try {
      await postLogin({ email, password });
      dispatch(setIsLoggedIn(true));
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

export function signInRequest() {
  return async (dispatch, getState) => {
    const { signInFields } = getState();
    const { email, password } = signInFields;
    dispatch(setSignInRequest());
    try {
      await postSignup({ email, password });
      dispatch(setSignInSuccess());
    } catch (error) {
      const errors = {
        'auth/email-already-in-use': '이미 사용중인 메일입니다 👀',
        'auth/weak-password': '비밀번호는 여섯자리가 넘어야합니다 👀',
      };

      const { code } = error;

      dispatch(setSignInFailure(errors[code]));
    }
  };
}

export function watchAuthentication() {
  return async (dispatch) => {
    dispatch(setFirebaseReset(false));

    const response = await getAuthentication();
    const isLoggedIn = !!response;

    dispatch(setIsLoggedIn(isLoggedIn));
    dispatch(setFirebaseReset(true));
  };
}

export function loadRooms() {
  return async (dispatch) => {
    try {
      const rooms = await getRooms();
      dispatch(setRooms(rooms));
    } catch (error) {
      alert(error);
    }
  };
}

export function requestAddRoom() {
  return async (dispatch, getState) => {
    const { addRoomFields } = getState();
    const { images } = addRoomFields;

    const getSavedUrls = images.map((image) => getSavedFileLink(image));
    const urls = await Promise.all(getSavedUrls);

    const fields = {
      ...addRoomFields,
      images: urls,
    };

    await postRoom(fields);

    dispatch(setAddRoomFields(initialAddRoomFields));
    dispatch(loadRooms());
  };
}

export default reducer;
