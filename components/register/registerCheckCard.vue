<template>
  <div class="register__check-card">
    <div class="register__check-card-container">
      <h5 class="register__check-card-title">
        {{ title }}
      </h5>
      <NuxtLink :to="changeLink" class="register__check-card-link link" v-if="changeLink">Изменить</NuxtLink>
    </div>
    <p class="register__check-card-text">
      {{ text }}
    </p>
    <slot />
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
  },
  changeLink: {
    type: String,
    default: '',
  },
});

</script>

<style lang="scss">

.register {

  &__check-card {
    margin-bottom: 7.5em;
  }
  
  &__check-card-container {
    display: flex;
    align-items: center;
    column-gap: 3em;
    margin-bottom: 1.5em;  
  }
  
  &__check-card-text {
    font-size: 1.3em;
    padding-bottom: 1.53em;
    margin-bottom: 1.53em;
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__check-card-link {
    color: var(--text-color-ternary);
    font-size: 1.2em;
  }
}

</style>