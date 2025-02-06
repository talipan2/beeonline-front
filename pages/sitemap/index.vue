<template>
  <NuxtLayout name="info" className="sitemap" title="Карта сайта">
    <template #header>
      <UiBreadCrumb :list="[{label: 'Главная', link: '/'}, { label: 'Карта сайта', link: '' }]" />
    </template>
    <template #content>
      <div class="sitemap-container">
        <NuxtLink class="link" to="/">Главная</NuxtLink>
        <NuxtLink class="link" to="/help">Помощь</NuxtLink>
        <NuxtLink class="link" to="/contacts">Контакты</NuxtLink>
        <NuxtLink class="link" to="/page-policy">Политика конфиденциальности</NuxtLink>
        <NuxtLink class="link" to="/page-oferta">Оферта</NuxtLink>
        <NuxtLink class="link" to="/page-terms-of-use">Пользовательское соглашение</NuxtLink>
        <NuxtLink class="link" to="/page-requisites">Реквизиты</NuxtLink>
        <NuxtLink class="link" to="/page-oferta-st">Оферта</NuxtLink>
        <NuxtLink class="link" to="/page-oferta-ct">Оферта</NuxtLink>

      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Карта сайта',
  meta: [
    {
      name: 'description',
      content: 'Карта сайта',
    },
  ],
});

</script>

<style lang="scss">

  .sitemap-container {
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    row-gap: .5em;
  }

</style>