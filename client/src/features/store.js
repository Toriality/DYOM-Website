import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./user/authService";
import userReducer from "./user/userSlice";
import projectReducer from "./project/projectSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
