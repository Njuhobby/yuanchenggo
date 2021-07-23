import axios from "axios";

// ----------------------------------------------------------------------

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response && "调用Api时发生了错误")
);

export default axiosInstance;
