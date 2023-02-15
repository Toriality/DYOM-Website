import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:5000/";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  loadingReview: false,
  list: {},
  single: {},
  review: {},
  error: null,
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

export const addProject = createAsyncThunk(
  "project/add",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${backendURL}api/projects/add`,
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

export const listProjects = createAsyncThunk(
  "projects/list",
  async ([type, params]) => {
    try {
      const response = await axios.get(
        `${backendURL}api/projects/list/${type}${params ? params : ""}`
      );
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

export const getProject = createAsyncThunk(
  "project/get",
  async ([type, id, params]) => {
    try {
      const response = await axios.get(
        `${backendURL}api/projects/${type}/${id}${params ? params : ""}`
      );
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

export const writeReview = createAsyncThunk("projects/review", async (data) => {
  try {
    console.log(data);
    const response = await axios.post(
      `${backendURL}api/reviews/add`,
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

export const likeReview = createAsyncThunk("project/like", async (reviewId) => {
  try {
    const response = await axios.post(
      `${backendURL}api/reviews/${reviewId}/like`,
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
  "project/getReview",
  async (reviewId) => {
    try {
      const response = await axios.get(`${backendURL}api/reviews/${reviewId}`);
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

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: {
    [getProject.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [getProject.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [getProject.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.single = payload;
    },
    [listProjects.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [listProjects.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [listProjects.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.list = payload;
    },
    [addProject.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [addProject.pending]: (state, { paylaod }) => {
      state.loading = true;
      state.error = null;
    },
    [addProject.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.single = payload;
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

export default projectSlice.reducer;
