import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { token: null, username: null, firstName: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.firstName = action.payload.firstName;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.firstName = null;
    },
    updateUser: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    deleteUser: (state) => {
      state.value = initialState.value;
    },
},
});


export const { login, logout, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;