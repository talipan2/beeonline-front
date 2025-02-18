import { defineNuxtPlugin } from "#app";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  // if (process.server) return;
  const router = useRouter();
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
      console.log(error)
      // if (error.response && error.response.status === 404) {
      //   throw showError({
      //     statusCode: 404,
      //     fatal: true,
      //     message: error.response.data.msg
      //  })
      // }
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("axios", axios);
});
