import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:5000/";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  userInfo: {},
  token,
  userToken: null,
  error: null,
  success: false,
};

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (formData, { rejectWithValue }) => {
    try {
      await axios.post(`${backendURL}api/user/register`, formData, config);
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.msg);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}api/user/login`,
        { username, password },
        config
      );
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.msg);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.token = payload.token;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { setCredentials } = userSlice.actions;
export default userSlice.reducer;
