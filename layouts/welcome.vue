<template>
  <div class="body">
    <WelcomeHeader />
    <main class="welcome-main">
      <slot />
    </main>
    <WelcomeFooter />
  </div>
</template>

<style lang="scss">

.welcome-main {
  background-color: #fff;
  font-family: "lato", sans-serif;
  font-size: 1rem;
}

</style>

