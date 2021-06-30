import axios from "src/utils/axios";
import { createSlice } from "@reduxjs/toolkit";

//---------------------------------------------------

const initialState = {
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
      state.jobs = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
// No actions need to be exported for now

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
