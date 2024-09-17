import { defineNuxtPlugin } from '#app';
import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) return;

  const config = useRuntimeConfig();

  axios.defaults.baseURL = `https://6a79-109-191-45-126.ngrok-free.app/api/`;
  axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
  axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

  nuxtApp.provide('axios', axios);
});