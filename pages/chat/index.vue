<template>
  <NuxtLayout name="profile" title="Сообщения" class="chat-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Сообщения', link: '' }]" />
    </template>
    <template #content>
      <Chat />
    </template>
  </NuxtLayout>
</template>

<script setup>

</script>


<style lang="scss">

.chat-layout {
  .profile__content {
    max-width: 81%;
  }
}

</style>