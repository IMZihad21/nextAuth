import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://graphql-svr.herokuapp.com/",
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error("Internal server error: " + error.code);
  }
);

export default axiosClient;
