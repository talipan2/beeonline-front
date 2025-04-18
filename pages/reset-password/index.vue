<template>
  <div class="login-container container">
    <UiBreadCrumb :list="[{label: 'Главная', link: '/'},{ label: 'Авторизация', link: '/login' }, { label: 'Обновление пароля', link: '' }]" />
    <LoginResetPassword />
  </div>
</template>

<script setup>

useHead({
  title: 'Обновление пароля',
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

</script>

<style lang="scss">

.login-container {
  .login {
    width: 33%;
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
