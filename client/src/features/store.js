import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./user/authService";
import userReducer from "./user/userSlice";
import missionReducer from "./mission/missionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    mission: missionReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
