import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState: AuthState = {
  isLoggedIn: Cookies.get("edunex-token") ? true : false,
  user: {
    full_name: "",
    email: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,

  reducers: {
    deAuthenticate: (state) => {
      state.isLoggedIn = false;
      state.user = {
        full_name: "",
        email: "",
      };
    },
    authenticate: (state) => {
      state.isLoggedIn = true;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { deAuthenticate, authenticate, setUserData } = authSlice.actions;

export default authSlice.reducer;
