import axios from "src/utils/axios";
import { createSlice } from "@reduxjs/toolkit";

//---------------------------------------------------

const initialState = {
  isLoading: false,
  jobs: [],
  job: {},
};

const slice = createSlice({
  name: "job",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET JOB POSTS
    getJobPosts(state, action) {
      state.isLoading = false;
      state.jobs = action.payload;
    },

    // GET JOB POST
    getJobPost(state, action) {
      state.isLoading = false;
      state.job = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export function startLoading() {
  return (dispatch) => {
    dispatch(slice.actions.startLoading());
  };
}

export function getJobPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/jobs");
      dispatch(slice.actions.getJobPosts(response.data.jobs));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getJobPost(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/jobs/jobDetail", {
        params: { id },
      });
      dispatch(slice.actions.getJobPost(response.data.job));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
