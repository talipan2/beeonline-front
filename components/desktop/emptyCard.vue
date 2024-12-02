<template>
  <div class="desktop__empty-card">
    <div class="desktop__empty-card-image">
      <slot name="image"/>
    </div>
    <h2 class="desktop__empty-card-title">{{ title }}</h2>
    <p class="desktop__empty-card-text">{{ text }}</p>
    <div class="desktop__empty-card-button" v-if="$slots.button">
      <slot name="button"/>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  }
})

</script>

<style lang="scss">

.desktop {
  &__empty-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    font-size: 1rem;
    text-align: center;
    padding: 1.5em;
  }

  &__empty-card-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f5f6;
    border-radius: 100%;
    width: 7.2em;
    height: 7.2em;
    margin-bottom: 1.8em;

    svg {
      path {
        stroke: #8b92a1;
      }
    }
  }

  &__empty-card-title {
    font-size: 1.8em;
    font-weight: 600;
    margin-bottom: .5em;
  }

  &__empty-card-text {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.4em;
    color: var(--text-color-tertiary);
    margin-bottom: 1em;
  }

  &__empty-card-button {
    font-family: 'fira-sans', sans-serif;
    font-size: 1.2em;
    text-transform: uppercase;
  }
}

</style>