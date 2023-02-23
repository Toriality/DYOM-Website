import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./user/authService";
import userReducer from "./user/userSlice";
import projectReducer from "./project/projectSlice";
import statsReducer from "./stats/statsSlice";

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    user: userReducer,
    project: projectReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
