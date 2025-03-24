<template>
    <NuxtLayout name="telegram" >
      <TelegramBotAuthWithoutPassword v-if="currentAuthPage === 'without-password'"/>
      <TelegramBotAuth v-else />
    </NuxtLayout>
</template>

<script setup>

definePageMeta({
  layout: '',
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
</script>
