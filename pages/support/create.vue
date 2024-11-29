<template>
  <NuxtLayout name="profile" title="Техническая поддержка" class="support-сreate-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Техническая поддержка', link: '/support' }, { label: 'Новый запрос', link: '' }]" />
    </template>
    <template #content>
      <SupportCreate />
    </template>
  </NuxtLayout>
</template>

<style lang="scss">

.support-сreate-layout {
  .profile__content {
    flex: 0 1 30%;
    margin-inline: auto;
  }
}

</style>