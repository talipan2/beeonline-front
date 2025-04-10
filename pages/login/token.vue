<template>
  <div>
    Авторизация...
  </div>
</template>

<script setup>
definePageMeta({
  ignoreAuth: true
})

import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();
const route = useRoute();
const config = useRuntimeConfig();

const frontUrl = config.public.frontUrl;
let redirect = route.query.redirect;

const token = route.query.token;
userStore.userToken = token;
localStorage.setItem("token", token);

userStore.checkAuth(true).then((response) => {
  if(typeof redirect === 'string') {
    const external = !redirect.startsWith(frontUrl);
    if (!external) {
        redirect = redirect.slice(frontUrl.length);
    }
    navigateTo(redirect, { external: external });
  }
})
</script>

<style>

</style>
