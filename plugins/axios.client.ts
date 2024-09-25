import { defineNuxtPlugin } from "#app";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;

  const config = useRuntimeConfig();

  axios.defaults.baseURL = `http://localhost:8080/api`;
  axios.defaults.headers.common["Content-Type"] = "application/json; charset=UTF-8";
  axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

  axios.interceptors.request.use((request) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token") || null;

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }

    return request;
  }, (error) => {
    return Promise.reject(error);
  });

  nuxtApp.provide("axios", axios);
});
