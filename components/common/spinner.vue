<template>
  <div class="spinner-border"></div>
</template>

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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>