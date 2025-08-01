// import axios from "axios";
// const api = axios.create({
//   // baseURL: import.meta.env.VITE_REACT_APP_LOCAL|| "https://localhost:8080/api",
//   baseURL: import.meta.env.VITE_REACT_APP_LOCAL,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
