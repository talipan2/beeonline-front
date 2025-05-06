<template>
  <NuxtLayout name="profile" className="support-layout" title="Техническая поддержка">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Техническая поддержка', link: '' }]" />
    </template>
    <template #content>
      <Support />
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Техническая поддержка',
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

.support-layout {
  .profile__content {
    flex: 0 1 75%;
  }
}

</style>
