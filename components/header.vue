<template>
  <header class="header container" ref="header" :class="{ 'header_fixed': headerFixed }">
    <div class="header__info" ref="headerInfo">
      <ul class="header__list">
        <!-- <li class="header__item">
					<a href="#" class="header__link">О компании</a>
				</li> -->
        <li class="header__item">
          <NuxtLink to="https://test.bee-online.ru/help" class="header__link">Помощь</NuxtLink>
        </li>
        <li class="header__item">
          <NuxtLink to="https://test.bee-online.ru/contacts" class="header__link">Контакты</NuxtLink>
        </li>
      </ul>
      <ul class="header__list">
        <li class="header__item header__item_type-lang">
          <HeaderChooseLang />
        </li>
        <li class="header__item header__item_type-location">
          <HeaderLocation />
        </li>
      </ul>
    </div>
    <div class="header__filler" ref="headerFiller"></div>
    <div class="header__main" ref="headerMain" >
      <div class="header__main-container" :class="{ 'container': headerFixed }">
        <div class="header__logo-container">
          <button class="header__menu-btn" :class="{ 'header__menu-btn_active': isOpenMobileModal }" @click="isOpenMobileModal = !isOpenMobileModal">
            <div></div>
            <div></div>
            <div></div>
            <!-- <SvgoBurgerMenuIcon class="svg-l header__menu-icon"/> -->
          </button>
          <NuxtLink class="header__logo" to="https://test.bee-online.ru">
            <SvgoLogo class="header__logo-img" filled alt="Логотип" />
          </NuxtLink>
          <UiButton to="/" variant="primary" size="large" class="header__logo-button">Разместить заказ</UiButton>
        </div>
        <nav class="header__menu-links">
          <ul class="header__menu-list">
            <li class="header__links-item">
              <NuxtLink to="https://test.bee-online.ru/services" class="header__link">Найти исполнителя</NuxtLink>
            </li>
            <li class="header__links-item">
              <NuxtLink to="https://test.bee-online.ru/orders" class="header__link">Найти заказчика</NuxtLink>
            </li>
            <li class="header__links-item">
              <NuxtLink href="https://test.bee-online.ru/members" class="header__link">Участники портала</NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="header__auth" v-if="isAuth">
          <UiButton to="/" variant="secondary" size="around">
            <SvgoSearchIcon class="svg-m" />
          </UiButton>
          <UiButton to="/" variant="secondary" size="around">
            <SvgoFavorite class="svg-m" />
          </UiButton>
          <UiButton to="/" variant="secondary" size="around">
            <SvgoMessage class="svg-m" />
          </UiButton>
          <UiButton to="/" variant="secondary" size="around">
            <SvgoNotice class="svg-m" />
            <UiAlertBadge />
          </UiButton>
          <HeaderMenuDropDown v-model="isAuth" />
        </div>
        <div class="header__auth" v-else>
          <UiButton to="/" variant="secondary" size="around" class="header__search-icon"> 
            <img src="~/assets/images/header/search-icon.svg" alt="Поиск">
          </UiButton>
          <UiButton to="/" variant="secondary" size="large" type="button" @click="isAuth = true">Вход</UiButton>
          <UiButton to="/" variant="secondary" size="large">Регистрация</UiButton>
        </div>
        <UiButton to="/" variant="primary" size="small" class="header__login" @click="isAuth = true">Вход</UiButton>
      </div>
    </div>
    <HeaderMenuMobileModal v-model="isOpenMobileModal" :headerHeight="headerHeight"></HeaderMenuMobileModal>
  </header>
</template>

<script setup>

const isAuth = ref(false);
const isOpenMobileModal = ref(false);
const header = ref(null);
const headerMain = ref(null);
const headerMainHeight = ref(null);
const headerHeight = ref(null);
const headerFixed = ref(false);
const headerMainOffsetTop = ref(0);
const headerFiller = ref(0)
const headerInfo = ref(null)

function updateHeaderHeight() {
  if (header) {
    headerHeight.value = header.value.offsetHeight;
    headerMainHeight.value = headerMain.value.offsetHeight;
  }
}

const onScrollPage = () => {
  if (!headerFixed.value) {
    headerMainOffsetTop.value = headerInfo.value.offsetHeight;
  }
  if (window.scrollY > headerMainOffsetTop.value) {
    if (!headerFixed.value) {
      headerFixed.value = true;
      headerFiller.value.style.height = headerMainHeight.value + 'px';
    }
  } else {
    if (headerFixed.value) {
      headerFixed.value = false;
      headerFiller.value.style.height = 0;
    }
  }
}

onMounted(() => {
  updateHeaderHeight();
  onScrollPage();
  window.addEventListener('resize', updateHeaderHeight);
  window.addEventListener("scroll", onScrollPage)

});

onUnmounted(() => {
  window.removeEventListener('resize', updateHeaderHeight);
  window.removeEventListener("scroll", onScrollPage)
  
});

</script>

<style lang="scss">

.header__filler {
  height: 0
}

.header_fixed .header__filler {
  // height: var(--header-height)
}

.header_fixed .header__main {
  background-color: var(--bg-secondary-color);
  box-shadow: var(--box-shadow-tertiary);
  box-sizing: border-box;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100
}


// @media screen and (max-width: 1550px) {
//   .header_fixed .header__main {
//     padding-inline: 50px
//   }
// }

// @media screen and (max-width: 887px) {
//   .header_fixed .header__main {
//     padding-inline: 16px
//   }
// }

.header {
  background-color: var(--bg-secondary-color);

  .header__info {
    border-bottom: 1px solid var(--border-color-tertiary);
    display: flex;
    justify-content: space-between;
    padding-block: 1.6rem;
  }

  .header__list {
    align-items: center;
    column-gap: 1.6rem;
    display: flex
  }

  .header__item {
    color: var(--text-color-septenary);
    font-weight: 500;
    font-size: 1.4rem;
  }

  .header__item_type-location {
    color: #131523
  }

  .header__item_type-lang {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--text-color-primary);
  }

  .header__item_type-location a {
    align-items: center;
    column-gap: .4rem;
    display: flex
  }

  .header__item_type-location img {
    height: 16px;
    object-fit: contain;
    width: 16px
  }

  .header__search-icon {
    width: 1em;
    height: auto;
  }

.header__main-container {
  display: flex;
  justify-content: space-between;
  padding-block: 2rem 1.7rem;
  align-items: center;
}



.header__logo-container {
  align-items: center;
  column-gap: 4rem;
  display: flex;
  // flex: 1 0 auto;
}

.header__logo-container .header__logo-img {
  height: 5rem;
  width: 16rem;
}

.header__logo-button {
  background-color: var(--button-background-primary);
  border-radius: 100px;
  color: var(--text-color-octonary);
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.2rem 2.4rem;
  line-height: 1em;
  @include transition(background-color, .2s, ease-in-out);
}

.header__logo-button:hover {
  background-color: var(--button-background-primary-hover)
}

.header__menu-links {
  align-items: center;
  display: flex
}

.header__menu-list {
  column-gap: 3.2rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 600;
  justify-content: space-between
}

.header__links-item {
  flex: 1 0 auto;

}

.header__auth {
  align-items: center;
  column-gap: 1.6rem;
  display: flex;
}

.header__search {
  align-items: center;
  border-radius: 100px;
  display: flex;
  height: 4.1rem;
  justify-content: center;
  position: relative;
  width: 4.1rem
}

.header__search img {
  height: 2rem;
  -o-object-fit: contain;
  object-fit: contain;
  width: 2rem;
}

.header__login,
.header__menu-btn {
  display: none
}

.header__auth_mobile {
  display: none;
}

.header__l {

}

@media screen and (max-width: 887px) {

  .header__auth,
  .header__info,
  .header__logo-button,
  .header__menu-links {
    display: none
  }

  .header__main {
    padding-block: 7px
  }

  .d-none {
    display: block;
  }

  .header__logo-container {
    -moz-column-gap: 12px;
    column-gap: 12px
  }

  .header__logo-container .header__logo img {
    height: auto;
    width: 133px
  }

  .header__main-container {
    padding-block: 7px;
  }

  .header__menu-btn {
    background-color: inherit;
    border: none;
    display: block;
    height: 24px;
    padding: 0;
    width: 24px;
    position: relative;
  }

  .header__menu-btn i {
    font-size: 24px;
  }

  .header__login {
    display: flex;
  }

  .header__logo-container .header__logo-img {
    height: auto;
    width: 133px;
  }
}
}

// .header__menu-icon {
//     width: 24px;
//     height: 24px;
//     cursor: pointer;
//     transition: transform 0.3s ease;

//     path {
//       transition: d 0.3s ease;
//     }
// }


// .header__menu-btn_active .header__menu-icon path {
//     rotate: 90deg;
// }

.header__menu-btn>div {
    position: absolute;
    left: 3px;
    right: 3px;
    width: 18px;
    height: 2px;
    margin: auto;
    background-color: #3C3C53;
    border-radius: 2px;
    transition: opacity 0s 0.3s, transform 0.3s 0s, top 0.3s 0.3s, width 0s 0.3s;
}

.header__menu-btn> :nth-child(1) {
    top: 4px;
}

.header__menu-btn> :nth-child(2) {
    top: 11px;
	width: 12px;
	margin-left: 0;
}

.header__menu-btn> :nth-child(3) {
    top: 18px;
}

.header__menu-btn_active >div {
    transition: opacity 0s 0.3s, transform 0.3s 0.3s, top 0.3s 0s, width 0s 0.3s;
}

.header__logo-container .header__menu-btn_active div {
    top: 10px; 
}

.header__menu-btn_active > :nth-child(1) {
    opacity: 0;
}

.header__menu-btn_active > :nth-child(2) {
    transform: rotate(45deg);
	  width: 18px;
}

.header__menu-btn_active > :nth-child(3) {
    transform: rotate(-45deg);
}

</style>

