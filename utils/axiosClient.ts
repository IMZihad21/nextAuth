import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    throw new Error("Internal server error: " + error.code);
  }
);

export default axiosClient;
