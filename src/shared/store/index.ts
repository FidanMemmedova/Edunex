import { configureStore } from "@reduxjs/toolkit";
import auth from "../../layouts/auth/store/service";
import examSlice from "@/layouts/auth/store/examSlice";
import { apiSlice } from "./api/apiSlice";
export const store = configureStore({
  reducer: {
    auth,
    examSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
