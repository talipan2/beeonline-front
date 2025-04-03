<template>
  <header class="welcome-header" :style="{ height: `${headerHeight}px` }">
    <div class="welcome-header__inner " ref="header">
      <div class="welcome-header__wrapper container">
        <button class="welcome-header__menu-btn" :class="{ 'welcome-header__menu-btn_active': isOpenMobileModal }" @click="isOpenMobileModal = !isOpenMobileModal">
          <div></div>
          <div></div>
          <div></div>
        </button>
        <NuxtLink to="/" class="welcome-header__logo">
          <SvgoLogo class="svg-l" filled alt="Логотип" />
        </NuxtLink>
        <div class="welcome-header__container">
          <UiButton to="/login" variant="secondary" size="large" class="welcome-header__auth-link">
            Войти
          </UiButton>
          <UiButton to="/login" variant="quinary" size="large" class="welcome-header__auth-link welcome-header__auth-link_mobile">
            Войти
          </UiButton>
          <HeaderChooseRegistrProfileDropdown class="welcome-header__auth-link" btnStyle="quinary"/>
          <HeaderChooseLang class="welcome-header__lang"/>
        </div>
      </div>
    </div>
    <WelcomeMainHeaderMobileModal
      v-model="isOpenMobileModal" 
      :headerHeight="headerHeight" 
    />
  </header>
</template>

<script setup>

const header = ref(null);

const headerHeight = ref(null);
const isOpenMobileModal = ref(false);


const handleHeaderHeightChange = () => {
  headerHeight.value = header.value ? header.value.offsetHeight : 0;
}

onMounted(() => {
  window.addEventListener('resize', handleHeaderHeightChange);
  handleHeaderHeightChange();
})

onUnmounted(() => {
  window.removeEventListener('resize', handleHeaderHeightChange);
})

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

    &_mobile {
      display: none;
    }
  }

  &__lang {
    font-family: 'Inter', sans-serif;
    font-size: 1.3em;
  }

  &__menu-btn {
    display: none;
    background-color: inherit;
    border: none;
    height: 24px;
    padding: 0;
    width: 24px;
    position: relative;
  }

  &__menu-btn>div {
    position: absolute;
    left: 3px;
    right: 3px;
    width: 18px;
    height: 2px;
    margin: auto;
    background-color: #6937a5;
    border-radius: 2px;
    transition: opacity 0s 0.3s, transform 0.3s 0s, top 0.3s 0.3s, width 0s 0.3s;
  }

  &__menu-btn> :nth-child(1) {
    top: 4px;
  }

  &__menu-btn> :nth-child(2) {
    top: 11px;
    width: 12px;
    margin-left: 0;
  }

  &__menu-btn> :nth-child(3) {
    top: 18px;
  }

  &__menu-btn_active >div {
    transition: opacity 0s 0.3s, transform 0.3s 0.3s, top 0.3s 0s, width 0s 0.3s;
  }

  &__menu-btn_active > :nth-child(1) {
    opacity: 0;
  }

  .welcome-header__inner .welcome-header__menu-btn_active div {
    top: 10px; 
  }

  &__menu-btn_active > :nth-child(2) {
    transform: rotate(45deg);
    width: 18px;
  }

  &__menu-btn_active > :nth-child(3) {
    transform: rotate(-45deg);
  }

  @include tablet {
    &__wrapper {
      justify-content: flex-start;
      column-gap: 12px;
    }

    &__container {
      margin-left: auto;
    }

    &__logo {
      width: 133px;
    }
  }

  @include mobile {
    &__auth-link {
      display: none;

      &_mobile {
        font-size: 12px;
        display: block;
      }
    }

    &__lang {
      display: none;
    }

    &__menu-btn {
      display: block;
    }
  }
}

</style>