import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/auth", // backend base
  withCredentials: true, // 👈 ensures cookies are sent
});

export default api;
