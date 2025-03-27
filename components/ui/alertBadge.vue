<template>
  <span class="alert-badge">{{ count }}</span>
</template>

<script setup>

const props = defineProps({
  count: {
    type: Number,
    default: 0
  }
})

</script>

<style lang="scss">
.alert-badge {
  font-family: "fira-sans", sans-serif;
  font-weight: 800;
  font-size: .7rem;
  padding-top: 2px;
  line-height: 2em;
  text-align: center;
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  top: 1px;
  right: 2px;
  border-radius: 15px;
  background-color: var(--bg-secondary-color);
  color: var(--text-color-primary);
}

</style>