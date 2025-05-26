<template>
  <div>
    Авторизация...
  </div>
</template>

<script setup>
definePageMeta({
  ignoreAuth: true,
  disableMetrika: true,
})

import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();
const route = useRoute();
const config = useRuntimeConfig();

const frontUrl = config.public.frontUrl;
let redirect = route.query.redirect;

const userId = route.query.user_id;
const token = route.query.token;
const storage = route.query.storage;

userStore.loginWithOneTimeToken(userId, token)
.then((response) => {
    userStore.userToken = response.token;
    localStorage.setItem("token", response.token);

    if (storage && typeof storage === 'object') {
        Object.entries(storage).forEach(([key, value]) => {
            localStorage.setItem(key, value);
        });
    }

    userStore.checkAuth(true).then((response) => {
        if(typeof redirect === 'string') {
            const external = !redirect.startsWith(frontUrl);
            if (!external) {
                redirect = redirect.slice(frontUrl.length);
            }
            navigateTo(redirect, { external: external });
        }
    });
});
</script>

<style>

</style>
