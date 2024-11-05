<template>
  <nav aria-label="breadcrumb" class="container">
    <ul class="breadcrumb">
      <li
        v-for="(crumb, index) in list"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === list.length - 1 }"
      >
        <NuxtLink
          v-if="crumb.link && index !== list.length - 1"
          :to="crumb.link"
        >
          {{ crumb.label }}
        </NuxtLink>
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
});


</script>

<style lang="scss" scoped>
  .breadcrumb {
    display: flex;
    column-gap: 1em;
    font-size: 1.6em;
    padding: 0;
    margin-block: 2em 0;
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