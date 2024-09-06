<template>
  <div>
    <h1 class="register__title" v-if="blockTitle">{{ blockTitle }}</h1>
    <h2 class="register__subtitle" v-if="title">{{ title }}</h2>
    <p class="register__text" v-if="description">{{ description }}</p>
    <slot /> 
    <slot name="soc-reg"/>
  </div>
</template>

<script setup>

const props = defineProps({

  blockTitle: {
    type: String,
    default: 'Регистрация исполнителя',
  },
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