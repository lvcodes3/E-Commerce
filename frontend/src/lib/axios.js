import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    import.meta.mode === "development" ? "http://localhost:5050/api" : "/api",
  withCredentials: true, // send cookies in requests to the backend api
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
