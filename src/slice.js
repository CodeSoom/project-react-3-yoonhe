import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
};

const { reducer, actions } = createSlice({
  name: 'roomPreviews',
  initialState,
  reducers,
});

export const {
  changeLoginFields,
} = actions;

export default reducer;
