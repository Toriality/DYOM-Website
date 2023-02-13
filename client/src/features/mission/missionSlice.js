import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:5000/";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  loadingReview: false,
  missionInfo: {},
  reviewInfo: {},
  error: null,
  success: false,
};

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-auth-token": token,
  },
};

const configJson = {
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": token,
  },
};

export const addMission = createAsyncThunk(
  "mission/add",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendURL}api/mission/add`,
        formData,
        config
      );
      return data;
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

export const getMission = createAsyncThunk(
  "mission/get",
  async ([id, params]) => {
    try {
      const response = await axios.get(
        `${backendURL}api/mission/${id}${params ? params : ""}`
      );
      console.log(`${backendURL}api/mission/${id}${params ? params : ""}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return error.response.data.msg;
      } else {
        return error.msg;
      }
    }
  }
);

export const writeReview = createAsyncThunk("mission/review", async (data) => {
  try {
    console.log(data);
    const response = await axios.post(
      `${backendURL}api/review/add`,
      data,
      configJson
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return error.response.data.msg;
    } else {
      return error.msg;
    }
  }
});

export const likeReview = createAsyncThunk("mission/like", async (reviewId) => {
  try {
    const response = await axios.post(
      `${backendURL}api/review/${reviewId}/like`,
      { reviewId },
      configJson
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      return error.response.data.msg;
    } else {
      return error.msg;
    }
  }
});

export const getReview = createAsyncThunk(
  "mission/getReview",
  async (reviewId) => {
    try {
      const response = await axios.get(`${backendURL}api/review/${reviewId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.msg) {
        return error.response.data.msg;
      } else {
        return error.msg;
      }
    }
  }
);

export const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {},
  extraReducers: {
    [getMission.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getMission.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [getMission.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.missionInfo = payload;
    },
    [listMissions.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [listMissions.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [listMissions.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.missionInfo = payload;
    },
    [addMission.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [addMission.pending]: (state, { paylaod }) => {
      state.loading = true;
      state.error = null;
    },
    [addMission.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.missionInfo = payload;
    },
    [likeReview.rejected]: (state, { payload }) => {
      state.loadingReview = false;
      state.error = payload;
    },
    [likeReview.pending]: (state, { paylaod }) => {
      state.loadingReview = true;
      state.error = null;
    },
    [likeReview.fulfilled]: (state, { payload }) => {
      state.loadingReview = false;
      state.error = null;
      state.reviewInfo = payload;
    },
    [getReview.rejected]: (state, { payload }) => {
      state.loadingReview = false;
      state.error = payload;
    },
    [getReview.pending]: (state, { paylaod }) => {
      state.loadingReview = true;
      state.error = null;
    },
    [getReview.fulfilled]: (state, { payload }) => {
      state.loadingReview = false;
      state.reviewInfo = payload;
    },
  },
});

export default missionSlice.reducer;
