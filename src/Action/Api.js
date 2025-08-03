// api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

let storeToken = null;

export const setToken = (token) => {
  storeToken = token;
};

api.interceptors.request.use(
  (config) => {
    if (storeToken) {
      config.headers.Authorization = `Bearer ${storeToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
