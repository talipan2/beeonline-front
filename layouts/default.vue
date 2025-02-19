<template>
  <div class="body">
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
  <ModalsContainer />
</template>

<script setup>
    import { ModalsContainer } from 'vue-final-modal';
</script>
