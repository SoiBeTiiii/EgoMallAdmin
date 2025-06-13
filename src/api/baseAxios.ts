import axios from "axios";

const baseAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API, //  server
  // baseURL: process.env.NEXT_PUBLIC_API_LOCAL, // local debug
});

// Thêm Interceptor để set token từ localStorage vào header Authorization
baseAxios.interceptors.request.use(
  (config) => {
    const tokenData = localStorage.getItem("S0Auth");
    const state = JSON.parse(tokenData!);
    const token = state?.state?.state?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // thêm token vào header Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default baseAxios;
