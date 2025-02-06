<template>
  <NuxtLayout name="welcome" >
    <WelcomeMainBanner />
    <WelcomeMainChooseCategory />
    <WelcomeMainService />
    <WelcomeMainVideo />
    <WelcomeMainWork />
    <WelcomeMainMap />
    <WelcomeMainRegisterBanner />
  </NuxtLayout>
</template>

<script setup>

useHead({
  title: 'Международный цифровой сервис поиска партнеров в сфере легкой промышленности',
  meta: [
    {
      name: 'description',
      content: 'Международный цифровой сервис поиска партнеров для контрактного производства в сфере легкой промышленности, соединяющий фабрики с потенциальными заказчиками',
    },
  ],
});

definePageMeta({
  layout: false
})

</script>

<style lang="scss">

.welcome {
  &-container {
    max-width: 1440px;
    margin-inline: auto;
    overflow: hidden;
  }

  &-block-wrapper {
    max-width: 650px;
    margin-inline: auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 5.8em;
  }

  &-block-name {
   font-family: 'Lato', sans-serif;
   display: block;
   font-size: 2em;
   padding: .5em 1em;
   letter-spacing: -0.02em;
   line-height: 1em;
   color: #989ea5;
   border: 1.5px solid #dee0e5;
   border-radius: 100px;
   margin-bottom: 1.2em;
   width: fit-content;
  }

  &-title {
    font-family: 'Coolvetica', sans-serif;
    font-size: 5.6em;
    line-height: 1.14em;
    // text-transform: uppercase;
    color: #242424;
    margin-bottom: .42em;

    span {
      color: #6937a5;
    }
  }

  &-subtitle {
    font-size: 2em;
    font-weight: 400;
    line-height: 1.4em;
    letter-spacing: -0.02em;
    color: #989ea5;
  }

  &__safe-transaction {
    margin-block: 14.1em 22em;
  }

  @media screen and (max-width: 1740px) {
    &-container {
      max-width: 100%;
      margin-inline: 16px;
    }
    
  } 

  @include mobile {
    &-block-wrapper {
      margin-bottom: 48px;
    }

    &-block-name {
      font-size: 18px;
    }

    &-title {
      font-size: 28px;
      margin-bottom: 24px;
    }

    &-subtitle {
      font-size: 16px;
    }
  }

  @include small-mobile {
    &-block-name {
      font-size: 14px;
    }
  }
}

</style>