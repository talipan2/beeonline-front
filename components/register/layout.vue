<template>
  <div>
    <h1 class="register__title">Регистрация исполнителя</h1>
    <h2 class="register__subtitle">{{ title }}</h2>
    <p class="register__text">{{ description }}</p>
    <form>
      <slot />
    </form>
    <slot name="soc-reg"/>
  </div>
</template>

<script setup>

const props = defineProps({

  title: {
    type: String,
    default: '',
  },
  description : {
    type: String,
    default: '',
  }

});

</script>