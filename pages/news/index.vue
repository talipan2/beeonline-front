<template>
  <NuxtLayout name="info" title="Новости" class="news-layout">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Новости', link: '' }]" />
    </template>
    <template #content>
      <div class="news-layout__main">
        <News />
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Новости',
  meta: [
    {
      name: 'description',
      content: '',
    },
  ],
});

</script>

<style lang="scss">

.news-layout {
  &__main {
    max-width: 40%;

    @include tablet {
      max-width: 60%;
    }

    @include mobile {
      max-width: 100%;
    }
  }

}

</style>