<template>
  <div class="login-container container">
    <UiBreadCrumb :list="[{label: 'Главная', link: '/'},{ label: 'Авторизация', link: '' }]" />
    <LoginWithoutPassword v-if="currentAuthPage === 'without-password'" redirect="/desktop"/>
    <Login v-else/>
  </div>
</template>

<script setup>
import { useSettingStore } from "~/store/settingStore";

const settingStore = useSettingStore();

useHead({
  title: 'Авторизация',
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

const router = useRouter();

const currentAuthPage = ref('')

watch(() => router.currentRoute.value.query, (newVal) => {
  console.log(newVal)
  if(newVal && newVal.type) {
    currentAuthPage.value = newVal.type
  } else {
    currentAuthPage.value = ''
  }
}, {deep: true, immediate: true})

onMounted(() => {
    settingStore.authModalStatus = false;
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
