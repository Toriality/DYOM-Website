import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  stats: {},
};

const backendURL = "http://localhost:5000/";

export const getStats = createAsyncThunk("stats/getStats", async () => {
  try {
    const response = await axios.get(`${backendURL}api/stats`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return error.response.data.msg;
    } else {
      return error.msg;
    }
  }
});

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: {
    [getStats.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getStats.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [getStats.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.stats = payload;
    },
  },
});

export default statsSlice.reducer;
