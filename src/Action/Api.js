// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_LOCAL_API,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// let storeToken = null;

// export const setToken = (token) => {
//   storeToken = token;
// };

// api.interceptors.request.use(
//   (config) => {
//     // If skipAuth is true, do not attach token
//     if (!config.skipAuth && storeToken) {
//       config.headers.Authorization = `Bearer ${storeToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

let storeToken = null;
let toastFn = null; // <-- Store your customToast here

// Call this in App.jsx to set toast handler
export const setToastHandler = (fn) => {
  toastFn = fn;
};

export const setToken = (token) => {
  storeToken = token;
};

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (!config.skipAuth && storeToken) {
      config.headers.Authorization = `Bearer ${storeToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network/server unreachable error
    if (!error.response && typeof toastFn === "function") {
      toastFn({
        severity: "error",
        summary: "Server Error",
        detail: "Server unreachable. Please try again later.",
        life: 3000,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
