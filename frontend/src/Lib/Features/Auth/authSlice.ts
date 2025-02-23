import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "cookies-next";
const initialState = { token: "", username: "", email: "" };
const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    handleLogin: (state, action) => {
      state.token = action.payload.jwt;
      state.username = action.payload.username;
      state.email = action.payload.email;
      setCookie("token",action.payload.jwt)
    },
    handleLogout: (state) => {
      state.token = "";
      state.username = "";
      state.email = "";
      deleteCookie("token")
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
