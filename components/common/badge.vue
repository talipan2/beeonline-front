<template>
  <div class="badge" v-if="badge">
    <p class="badge__text">{{ badge }}</p>
  </div>
</template>

<script setup>

const props = defineProps({
  badge: {
    type: String,
    default: '',
  }
})

</script>

<style lang="scss">

.badge {
  display: inline-block;
  padding: .25em .41em;
  border: 2px solid var(--border-color-quaternary);
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 1px;
  margin-inline: 1em;
}

</style>