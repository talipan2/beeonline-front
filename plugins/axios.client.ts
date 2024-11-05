import { defineNuxtPlugin } from "#app";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  // if (process.server) return;

  const config = useRuntimeConfig();

  if (import.meta.client) axios.defaults.baseURL = config.public.baseUrl;
  axios.defaults.headers.common["Content-Type"] = "application/json; charset=UTF-8";
  axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

  axios.interceptors.request.use((request) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token") || null;
    // const token = useCookie("token").value || null;

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }

    return request;
  }, (error) => {
    return Promise.reject(error);
  });

  nuxtApp.provide("axios", axios);
});
