<template>
  <div class="info-card">
    <div class="info-card__header" v-if="title">
      <h2 class="info-card__title">{{ title }}</h2>
      <slot name="action" />
    </div>
    <slot></slot>
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: '',
  }
})

</script>

<style lang="scss">

.info-card {
  font-size: 1rem;
  background-color: #fff;
  padding: 2.4em;
  border-radius: 20px;

  &__title {
    font-size: 2.4em;
    font-weight: 500;
    line-height: 1em;
    letter-spacing: -0.02em;
    color: rgba(0, 0, 0, 0.9);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3.2em;
  }

  @include mobile {
    padding-inline: 2em;
    &__header {
      margin-bottom: 2em;
      flex-wrap: wrap;
      row-gap: 2em;
      align-items: normal;
    }

    &__title {
      font-size: 2em;

    }
  }
}

</style>