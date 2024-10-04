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
    margin-left: -0.78em;
    margin-bottom: 1.5em;
    padding-bottom: .5em;
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__link {
    font-size: 1.6em;
    padding: .5em;
    line-height: 1em;
  }

  .active {
    background-color: var(--button-background-primary);
    color: var(--text-color-hover-secondary);

    &:hover {
      color: var(--text-color-hover-secondary);
      text-decoration: none;
    }
  }
  
  &__bottom {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }

  &__bottom-link {
    font-size: 1.6em;
    padding-block: .3em;
    line-height: 1em;
    display: flex;
    align-items: center;
    column-gap: .3em;
  }
}

</style>