<template>
  <div>

  </div>
</template>

<script setup>

import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();

const route = useRoute();

const token = route.query.token;
const redirect = route.query.redirect;
userStore.userToken = token;
localStorage.setItem("token", token);
userStore.checkAuth().then(() => {
  if(redirect) {
    // TODO: добавить в конфиги front_url, проверять его наличие, и если есть - external: false
    navigateTo(redirect, { external: true });
  }
})
</script>

<style>

</style>
