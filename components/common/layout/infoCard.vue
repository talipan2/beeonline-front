<template>
  <div class="info-card">
    <h2 class="info-card__title" v-if="title">{{ title }}</h2>
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
    margin-bottom: .5em;
  }
}

</style>