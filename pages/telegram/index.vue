<template>
  <LoginWithoutPassword v-if="currentAuthPage === 'without-password'" redirect="/customer/orders"/>
  <TelegramBotAuth v-else />
</template>

<script setup>
const router = useRouter();

const currentAuthPage = ref('')

watch(() => router.currentRoute.value.query, (newVal) => {
  if(newVal && newVal.type) {
    currentAuthPage.value = newVal.type
  } else {
    currentAuthPage.value = ''
  }
}, {deep: true, immediate: true})
</script>
