<template>
  <footer class="welcome-footer">
    <div class="welcome-footer__main">
      <div class="welcome-footer__container">
        <div class="welcome-footer__logo">
          <NuxtLink to="/" class="welcome-footer__logo-link">
            <SvgoLogo class="svg-l " filled alt="Логотип" />
          </NuxtLink>
          <p class="welcome-footer__copyright">© Профешн 2021. При копировании любого материала сайта ссылка на сайт обязательна</p>
        </div>
        <div class="welcome-footer__links">
          <NuxtLink to="/" class="welcome-footer__link">
            <SvgoYoutube class="svg-l" />
          </NuxtLink>
          <NuxtLink to="/" class="welcome-footer__link">
            <SvgoVkontakte class="svg-l" />
          </NuxtLink>
          <NuxtLink to="/" class="welcome-footer__link">
            <SvgoTelegram class="svg-l" />
          </NuxtLink>
        </div>
        <p class="welcome-footer__copyright welcome-footer__copyright_mobile">© Профешн 2021. При копировании любого материала сайта ссылка на сайт обязательна</p>
      </div>
    </div>
    <div class="welcome-footer__bottom">
      <div class="welcome-footer__container welcome-footer__bottom-container">
        <NuxtLink to="/page-policy" class="welcome-footer__bottom-link">
          Политика конфиденциальности
        </NuxtLink>
        <NuxtLink to="https://fillincode.ru/" class="welcome-footer__bottom-link" target="_blank">
          Создание и поддержка
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">

.welcome-footer {
  font-size: 1rem;

  &__main {
    padding-block: 3.1em 1.4em;
    background-color: #fff;
  }

  &__container {
    max-width: 1710px;
    margin-inline: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__logo {
    max-width: 30em;
  }

  &__copyright {
    font-size: 1.2em;
    font-weight: 400;
    color: #000;

    &_mobile {
      display: none;
    }
  }

  &__logo-link {
    margin-bottom: 1.5em;
    svg {
      width: 19.6em;
    }
  }

  &__links {
    display: flex;
    column-gap: 2em;
  }

  &__bottom {
    padding-block: 2.3em;
    background-color: #6937a5;
    color: #fff;
  }

  &__bottom-link {
    font-size: 1.2em;
    font-weight: 400;
  }

  @include tablet {
    &__container {
      flex-direction: column;
      text-align: center;
      row-gap: 64px;
    }

    &__bottom-container {
      row-gap: 12px;
    }

    &__main {
      padding-block: 37px 32px;
    }

    &__bottom {
      padding-block: 24px;
    }

    &__copyright {
      display: none;

      &_mobile {
        display: block;
        padding-inline: 38px;
      }
    }

    &__link {
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }


}

</style>