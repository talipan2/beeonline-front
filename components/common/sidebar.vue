<template>
  <div class="sidebar">
    <div class="sidebar__body">
      <slot name="body"/>
      <slot name="bottom"/>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss">

.sidebar {
  &__top {
    display: flex;
    flex-direction: column;
    gap: .5em;
    margin-bottom: 1.5em;
    padding-bottom: .5em;
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }

}

</style>