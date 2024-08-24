import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, email: null, user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, username, email } = action.payload;
      state.token = accessToken;
      state.email = email;
      state.user = username;
    },
    logout: (state, action) => {
      state.token = null;
    },
  },
});

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
