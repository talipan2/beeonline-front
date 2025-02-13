<template>
  <div :class="`spinner-${type}`"></div>
</template>

<script setup>

const props = defineProps({
  type: {
    type: String,
    default: 'border',
    validator: value => ['border', 'grow'].includes(value),
  }
})

</script>

<style lang="scss">

.spinner-border {
  font-size: 1em;
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid rgba(0, 0, 0, 0.1); /* Полупрозрачный фон */
  border-top-color: var(--primary-color); /* Цвет активной границы */
  border-radius: 50%;
  vertical-align: text-bottom;
  animation: spin 0.8s linear infinite;
}

.spinner-grow {
    animation: spinner-grow .75s linear infinite;
    background-color: currentColor;
    border-radius: 50%;
    display: inline-block;
    height: 1em;
    opacity: 0;
    vertical-align: text-bottom;
    width: 1em;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes spinner-grow {
    0% {
        transform: scale(0)
    }

    50% {
        opacity: 1;
        transform: none
    }
}


</style>