import axios from "src/utils/axios";
import { createSlice } from "@reduxjs/toolkit";

//---------------------------------------------------

const initialState = {
  loadingJobs: false,
  loadingJob: false,
  jobs: [],
  job: {},
};

const slice = createSlice({
  name: "job",
  initialState,
  reducers: {
    startLoadingJobs(state) {
      state.loadingJobs = true;
    },

    startLoadingJob(state) {
      state.loadingJob = true;
    },

    errorLoadingJobs(state, action) {
      state.loadingJobs = false;
      state.loadingJobsError = action.payload;
    },

    errorLoadingJob(state, action) {
      state.loadingJob = false;
      state.loadingJobError = action.payload;
    },

    getJobPosts(state, action) {
      state.loadingJobs = false;
      state.jobs = action.payload;
    },

    getJobPost(state, action) {
      state.loadingJob = false;
      state.job = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

export function getJobPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoadingJobs());
    try {
      const response = await axios.get("/api/jobs");
      dispatch(slice.actions.getJobPosts(response.data.jobs));
    } catch (error) {
      dispatch(slice.actions.errorLoadingJobs(error));
    }
  };
}

export function getJobPost(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoadingJob());
    try {
      const response = await axios.get("/api/jobs/jobDetail", {
        params: { id },
      });
      dispatch(slice.actions.getJobPost(response.data.job));
    } catch (error) {
      dispatch(slice.actions.errorLoadingJob(error));
    }
  };
}
