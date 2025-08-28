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
import { useSettingStore } from "~/store/settingStore";

const userStore = useUserStore();
const settingStore = useSettingStore();
const route = useRoute();
const config = useRuntimeConfig();

const frontUrl = config.public.frontUrl;
let redirect = route.query.redirect;

const userId = route.query.user_id;
const token = route.query.token;
const beesync = route.query.beesync;
const storage = {};

Object.entries(route.query).forEach(([key, value]) => {
  const match = key.match(/^storage\[(.+)\]$/);
  if (match) {
    storage[match[1]] = value;
  }
});

if (Object.keys(storage).length > 0) {
  Object.entries(storage).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
}

if (storage.isCreateOrder) {
    settingStore.isCreateOrder = true;
}

userStore.loginWithOneTimeToken(userId, token)
.then((response) => {
    userStore.userToken = response.token;
    localStorage.setItem("token", response.token);

    userStore.checkAuth(!!beesync).then((response) => {
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
