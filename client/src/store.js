import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/user/authService";
import userReducer from "./features/user/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
