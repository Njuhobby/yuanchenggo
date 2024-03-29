import axios from "axios";

// ----------------------------------------------------------------------

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
