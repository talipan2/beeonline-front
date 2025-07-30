<template>
  <div class="forgot-container container">
    <UiBreadCrumb :list="[{label: 'Главная', link: '/'},{ label: 'Авторизация', link: '/login' }, { label: 'Восстановление пароля', link: '' }]" />
    <LoginForgotPassword />
  </div>
</template>

<script setup>
import { useSettingStore } from "~/store/settingStore";

const settingStore = useSettingStore();

useHead({
  title: 'Восстановление пароля',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

definePageMeta({
    disableMetrika: true,
});

onMounted(() => {
    settingStore.authModalStatus = false;
});

</script>

<style lang="scss">

.forgot-container {
  .login {
    width: 40%;
    margin-block: 5em 3em;
  }

  @include tablet {
    .login {
      width: 50%;
      margin-inline: auto;
    }
  }

  @include mobile {
    .login {
      width: 100%;
    }
  }
}

</style>
