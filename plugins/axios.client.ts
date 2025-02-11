import { defineNuxtPlugin } from "#app";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  // if (process.server) return;

  const config = useRuntimeConfig();

  if (import.meta.client) axios.defaults.baseURL = config.public.baseUrl;
  console.log(import.meta.client);
  axios.defaults.headers.common["Content-Type"] = "application/json; charset=UTF-8";
  axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

  // перехват запросов
  axios.interceptors.request.use((request) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token") || null;

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }

    return request;
  }, (error) => {
    return Promise.reject(error);
  });

  // перехват ответов
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 404) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Page Not Found',
          data: {
            myCustomField: true
          }
        })
      }

      return Promise.reject(error);
    }
  );

  nuxtApp.provide("axios", axios);
});
