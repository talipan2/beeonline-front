<template>
  <header class="welcome-header" :style="{ height: `${headerHeight}px` }">
    <div class="welcome-header__inner" ref="header">
      <div class="welcome-header__wrapper">
        <NuxtLink to="/" class="welcome-header__logo">
          <SvgoLogo class="svg-l" filled alt="Логотип" />
        </NuxtLink>
        <div class="welcome-header__container">
          <UiButton to="/login" variant="secondary" size="large" class="welcome-header__auth-link">
            Войти
          </UiButton>
          <HeaderChooseRegistrProfileDropdown class="welcome-header__auth-link" btnStyle="quinary"/>
          <HeaderChooseLang class="welcome-header__lang"/>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>

const header = ref(null);

const headerHeight = computed(() => {
  return header.value ? header.value.offsetHeight : 0;
});

</script>

<style lang="scss">

.welcome-header {
  font-size: 1rem;

  &__inner {
    position: fixed;
    z-index: 4;
    background-color: #fff;
    padding-block: 2em;
    width: 100%;
    box-shadow: 0 0 15px rgba(0, 0, 0, .1);
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
  }

  &__logo {
    flex: 0 0 auto;
    width: 21.1em;
    height: auto;

    svg{
      width: 100%;
      height: 100%;
    }
  }

  &__container {
    display: flex;
    align-items: center;
    column-gap: 3.2em;
  }

  &__auth-link {
    font-family: 'Inter', sans-serif;
    font-size: 1.6em;
  }

  &__lang {
    font-family: 'Inter', sans-serif;
    font-size: 1.3em;
  }
}

</style>