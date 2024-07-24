import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  credentials: [], // Initialize credentials as an empty array
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.credentials.push(action.payload); // Store new credentials
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure, logout, signupSuccess, signupFailure } = authSlice.actions;
export default authSlice.reducer;
