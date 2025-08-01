import axios from "axios";
const api = axios.create({
  // baseURL: import.meta.env.VITE_REACT_APP_LOCAL|| "https://localhost:8080/api",
  baseURL: import.meta.env.VITE_REACT_APP_LOCAL || "http://localhost:8000/api",

  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
