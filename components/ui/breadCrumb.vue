<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === breadcrumbs.length - 1 }"
      >
        <NuxtLink
          v-if="crumb.link && index !== breadcrumbs.length - 1"
          :to="crumb.link"
        >
          {{ crumb.name }}
        </NuxtLink>
        <span v-else>{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router';
// Словарь для перевода сегментов пути на русский язык
const translations = {
  services: 'Каталог услуг',
}
const route = useRoute();
const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(path => path);
  const crumbs = [{
    name: 'Главная',
    link: '/'
  }];
  paths.forEach((path, index) => {
    let name;
    if (translations[path]) {
      name = translations[path];
    } else if (!isNaN(path)) {
      const prevPath = paths[index - 1];
      if (prevPath === 'services') {
        name = 'Услуга';
      } else {
        name = `ID: ${path}`;
      }
    } else {
      name = path.charAt(0).toUpperCase() + path.slice(1);
    }
    crumbs.push({
      name,
      link: '/' + paths.slice(0, index + 1).join('/')
    });
  });
  crumbs[crumbs.length - 1].link = null;
  return crumbs;
});
</script>

<style lang="scss">
  .breadcrumb {
    display: flex;
    column-gap: 1em;
    font-size: 1.6em;
    padding: 0;
    li {
      display: flex;
      align-items: center;
      column-gap: 1em;
    }
    li:not(:last-child)::after {
      content: "-";
    }
    .active {
      padding: 0 0.31em;
      border-radius: 0.125em;
      background-color: var(--bg-secondary-color);
      box-shadow: 0 0 0 1px var(--text-color-ternary);
    }
  }
</style>