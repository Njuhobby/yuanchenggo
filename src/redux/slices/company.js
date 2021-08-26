import axios from "src/utils/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingCompanies: false,
  loadingCompany: false,
  companies: [],
  company: {},
};

const slice = createSlice({
  name: "company",
  initialState,
  reducers: {
    startLoadingCompanies(state) {
      state.loadingCompanies = true;
    },

    startLoadingCompany(state) {
      state.loadingCompany = true;
    },

    errorLoadingCompanies(state, action) {
      state.loadingCompanies = false;
      state.loadingCompaniesError = action.payload;
    },

    errorLoadingCompany(state, action) {
      state.loadingCompany = false;
      state.loadingCompanyError = action.payload;
    },

    getCompanies(state, action) {
      state.loadingCompanies = true;
      state.companies = action.payload;
    },

    getCompany(state, action) {
      state.loadingCompany = true;
      state.company = action.payload;
    },
  },
});

export default slice.reducer;

export function getCompanies() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoadingCompanies());
    try {
      const response = await axios.get("api/companies");
      dispatch(slice.actions.getCompanies(response.data.companies));
    } catch (error) {
      dispatch(slice.actions.errorLoadingCompanies(error));
    }
  };
}

export function getCompany(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoadingCompany());
    try {
      const response = await axios.get("/api/company", {
        params: { id },
      });
      dispatch(slice.actions.getCompany(response.data.company));
    } catch (error) {
      dispatch(slice.actions.errorLoadingCompany(error));
    }
  };
}
