<template>
  <footer class="footer">
    <div class="footer__menu-container">
      <div class="footer__menu scope-container">
        <div class="footer__menu-links">
          <div class="footer__logo">
            <NuxtLink to="https://test.bee-online.ru">
              <UiImage src="/assets/images/footer/footer-logo.svg" alt="Логотип"/>
            </NuxtLink>
          </div>
          <nav class="footer__nav">
            <ul class="footer__list">
              <li class="footer__links-item">
                <NuxtLink to="https://test.bee-online.ru/services" class="footer__link">Найти исполнителя</NuxtLink>
              </li>
              <li class="footer__links-item">
                <NuxtLink to="https://test.bee-online.ru/orders" class="footer__link">Найти заказчика</NuxtLink>
              </li>
              <li class="footer__links-item">
                <NuxtLink to="https://test.bee-online.ru/members" class="footer__link">Участники портала</NuxtLink>
              </li>
              <li class="footer__links-item">
                <NuxtLink to="https://test.bee-online.ru/contacts" class="footer__link">Контакты</NuxtLink>
              </li>
              <li class="footer__links-item">
                <NuxtLink to="https://test.bee-online.ru/help" class="footer__link">Помощь</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <p class="footer__copyright">© Профешн 2020-2024. При копировании любого материала сайта ссылка на сайт
          обязательна.</p>
        <UiImage class="footer__pattern" src="/assets/images/footer/map.png"/>
      </div>
    </div>
    <div class="footer__additionally-container ">
      <div class="footer__additionally scope-container">
        <ul class="footer__additionally-list">
          <li class="footer__additionally-item">
            <NuxtLink to="https://test.bee-online.ru/page-policy" class="footer__additionally-link">Политика
              конфиденциальности</NuxtLink>
          </li>
          <li class="footer__additionally-item">
            <NuxtLink to="https://test.bee-online.ru/page-oferta" class="footer__additionally-link">Оферта</NuxtLink>
          </li>
          <li class="footer__additionally-item">
            <NuxtLink to="https://test.bee-online.ru/page-requisites" class="footer__additionally-link">Реквизиты</NuxtLink>
          </li>
          <li class="footer__additionally-item">
            <NuxtLink to="https://test.bee-online.ru/sitemap" class="footer__additionally-link">Карта сайта</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>


<style lang="scss">
.footer {
  color: #fff
}

.footer__menu-container {
  overflow: hidden;
  padding-block: 6.8rem 3.6rem;
  position: relative
}

.footer__menu-container:before {
  background-image: url(/assets/images/footer/footer-bg.png);
  background-position: center 30%;
  background-repeat: no-repeat;
  background-size: cover;
  content: "";
  height: 100%;
  inset: 0;
  position: absolute;
  width: 100%;
  z-index: -1
}

.footer__menu {
  margin: 0 auto;
  max-width: 1520px
}

.footer__menu-links {
  align-items: center;
  -moz-column-gap: 14.9rem;
  column-gap: 14.9rem;
  display: flex;
  flex-direction: row;
  margin-bottom: 3.6rem;
}

.footer__list {
  align-items: center;
  -moz-column-gap: 3.2rem;
  column-gap: 3.2rem;
  display: flex
}

.footer__link {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  position: relative;
  z-index: 4
}

.footer__logo img {
  height: auto;
  width: 28.4rem
}

.footer__copyright {
  color: #fff;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.42em;
  margin: 0;
  max-width: 35.1rem;
  opacity: .8
}

.footer__pattern {
  bottom: 0;
  opacity: .5;
  position: absolute;
  right: 0;
  width: 545px;
  height: auto;
  z-index: 0
}

.footer__additionally-container {
  background-color: #4b1d7e
}

.footer__additionally {
  margin: 0 auto;
  max-width: 1520px;
  padding-block: 2.6rem
}

.footer__additionally-list {
  align-items: center;
  -moz-column-gap: 3.2rem;
  column-gap: 3.2rem;
  display: flex
}

.footer .footer__additionally-link {
  color: hsla(0, 0%, 100%, .5);
  font-size: 1.3rem;
  font-weight: 600
}

@media screen and (max-width: 991px) {
  .footer .scope-container {
    padding-inline: 32px
  }

  .footer__menu-container {
    padding-block: 32px
  }

  .footer__menu-container:before {
    transform: rotate(-90deg) scale(2)
  }

  .footer__menu {
    display: flex;
    flex-direction: column;
    min-height: 525px;
    box-sizing: border-box;
  }

  .footer__logo img {
    width: 200px
  }

  .footer__menu-links {
    row-gap: 44px;
    margin-bottom: 32px;
  }

  .footer__list,
  .footer__menu-links {
    align-items: flex-start;
    flex-direction: column
  }

  .footer__list {
    position: relative;
    row-gap: 32px
  }

  .footer__link {
    font-size: 16px
  }

  .footer__copyright {
    display: block;
    font-size: 14px;
    margin-block: auto 0;
    max-width: none
  }

  .footer__additionally {
    padding-block: 32px
  }

  .footer__additionally-list {
    align-items: flex-start;
    flex-direction: column;
    row-gap: 24px
  }

  .footer .footer__additionally-link {
    font-size: 13px
  }

  .footer__pattern {
    bottom: 9px;
    height: auto;
    left: 13px;
    max-width: calc(100% - 26px);
    right: auto;
    width: 350px
  }
}
</style>