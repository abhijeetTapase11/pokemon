import { loginSuccess, loginFailure, signupSuccess, signupFailure } from './authSlice';

export const login = (email, password) => (dispatch, getState) => {
  const { auth: { credentials = [] } } = getState(); // Default to an empty array
  const user = credentials.find((cred) => cred.email === email && cred.password === password);
  if (user) {
    dispatch(loginSuccess(user));
  } else {
    dispatch(loginFailure('Invalid email or password'));
  }
};

export const signup = (email, password) => (dispatch, getState) => {
  const { auth: { credentials = [] } } = getState(); // Default to an empty array
  const userExists = credentials.some((cred) => cred.email === email);
  if (userExists) {
    dispatch(signupFailure('Email already exists'));
  } else {
    const newUser = { email, password };
    dispatch(signupSuccess(newUser));
  }
};
 