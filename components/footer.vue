<template>
  <footer>
    <h1>футер</h1>
    <button @click="isOpenMobileModal = true" >мнею</button>
    <HeaderMenuMobileModal v-model="isOpenMobileModal"></HeaderMenuMobileModal>
  </footer>
</template>

<script setup>
const isOpenMobileModal = ref(false);

</script>