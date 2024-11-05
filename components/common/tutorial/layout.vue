<template>
  <div class="tutorial-layout">
    <p class="tutorial-layout__text">{{ content }}</p>
    <button type="button" class="tutorial-layout__btn" @click="nextTick">Спасибо, понятно</button>
  </div>
</template>

<script setup>

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  nextTick: {
    type: Function,
    default: () => {}
  }
})

</script>

<style lang="scss" scoped>

.tutorial-layout {
  font-family: 'lato', sans-serif;
  font-size: 1em;
  padding: 2em;
  color: var(--text-color-primary);
  border: 1px solid #6937a5;

  &__text {
    margin-bottom: 1em;
  }

  &__btn {
    display: block;
    margin-left: auto;
  }
}

</style>