<script setup>
</script>

<template>
  <div class="body telegram-body">
    <TelegramBotHeader />
    <main class="telegram-main container">
      <ClientOnly>
        <slot />
      </ClientOnly>
    </main>
    <TelegramBotBottomMenu />
  </div>
</template>



<style lang="scss">

.telegram-main {
  background-color: #fff;
  font-family: "lato", sans-serif;
  font-size: 1rem;
  padding: 1em;
  padding-bottom: 6em;

  .breadcrumb-wrapper {
    display: none;
  }

  .profile__left {
    display: none;
  }
}

// .telegram-body {
//   max-width: 767px;
//   margin: 0 auto;
// }

</style>
