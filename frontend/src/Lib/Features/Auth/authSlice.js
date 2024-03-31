import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: "", username: "", email: "" };
const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    handleLogin: (state, action) => {
      state.token = action.payload.jwt;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    handleLogout: (state) => {
      state.token = "";
      state.username = "";
      state.email = "";
    },
  },
});

export const { handleLogin, handleLogout } = authSlice.actions;
export default authSlice.reducer;
