<template>
  <div class="tariffs-card">
    <slot></slot>
  </div>
</template>

<style lang="scss">

.tariffs-card {
  flex: 1 1 50%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  border-top: 2px solid var(--border-color-quaternary);
  border-left: 2px solid var(--border-color-quaternary);
  background-color: var(--bg-secondary-color);
  padding: 1.5em;
}

</style>