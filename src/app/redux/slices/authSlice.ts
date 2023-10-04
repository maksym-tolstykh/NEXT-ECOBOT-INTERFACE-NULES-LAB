"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { destroyCookie, parseCookies, setCookie } from "nookies";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: string | null;
};
let userCookie = null;
if (typeof window !== "undefined") {
  userCookie = parseCookies().userData;
}
const initialState = {
  value: {
    isAuth: userCookie || null,
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      destroyCookie(null, "userData");
      return {
        value: {
          isAuth: null,
        },
      };
    },
    logIn: (state, action: PayloadAction<any>) => {
      setCookie(null, "userData", action.payload, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      return {
        value: {
          isAuth: action.payload,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;

export default auth.reducer;
