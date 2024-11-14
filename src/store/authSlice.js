import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from "jwt-decode";

const initialState = {
  isLoggedIn: Boolean(localStorage.getItem('token')),
  token: localStorage.getItem('token') || null,
  user: {
    username: '',
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;  // Store the token
      localStorage.setItem('token', action.payload.token); // Save token to localStorage

      // Decode the token to get the user info
      const decodedToken = jwtDecode(action.payload.token);
      console.log(decodedToken);
      
      state.user.username = decodedToken.username;
      state.user.email = decodedToken.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = { username: '', email: '' };
      localStorage.removeItem('token'); // Remove token from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;