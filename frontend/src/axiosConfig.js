import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/auth", 
  withCredentials: true, // 👈 important for cookies/session
});

export default api;
