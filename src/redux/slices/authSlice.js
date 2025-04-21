import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  userInfo: {},
  token: null,
  getCourse: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logOut: () => {
      return initialState;
    },
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    activationToken: (state, action) => {
      state.activationToken = action.payload.activationToken;
    },
    token: (state, action) => {
      state.token = action.payload.token;
    },
    getCourse: (state, action) => {
      state.getCourse = action.payload.getCourse;
    },
  },
});

export const {
  login,
  logOut,
  saveUserInfo,
  activationToken,
  token,
  getCourse,
} = authSlice.actions;
export default authSlice.reducer;
