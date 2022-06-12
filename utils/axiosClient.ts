import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://cgql.imzihad21.workers.dev/"
      : "http://localhost:4000/",
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error("Internal server error: " + error.code);
  }
);

export default axiosClient;
