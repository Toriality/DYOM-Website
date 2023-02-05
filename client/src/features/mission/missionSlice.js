import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:5000/";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  missionInfo: {},
  error: null,
  success: false,
};

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-auth-token": token,
  },
};

export const addMission = createAsyncThunk(
  "mission/add",
  async (formData, { rejectWithValue }) => {
    try {
      await axios.post(`${backendURL}api/mission/add`, formData, config);
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return rejectWithValue(error.response.data.msg);
      } else {
        return rejectWithValue(error.msg);
      }
    }
  }
);

export const listMissions = createAsyncThunk("mission/list", async () => {
  try {
    const response = await axios.get(`${backendURL}api/mission/list`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return error.response.data.msg;
    } else {
      return error.msg;
    }
  }
});

export const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listMissions.fulfilled, (state, action) => {
      state.missionInfo = action.payload;
    });
  },
});

export default missionSlice.reducer;
