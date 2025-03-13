<template>
  <header class="header container" ref="header" :class="{ 'header_fixed': headerFixed }">
    <div class="header__top-side" ref="headerInfo">
      <div class="header__info" >
        <ul class="header__list">
          <!-- <li class="header__item">
            <a href="#" class="header__link">О компании</a>
          </li> -->
          <li class="header__item">
            <NuxtLink to="/help" class="header__link">Помощь</NuxtLink>
          </li>
          <li class="header__item">
            <NuxtLink to="/contacts" class="header__link">Контакты</NuxtLink>
          </li>
          <li class="header__item header__item_type-location">
            <HeaderLocation />
          </li>
        </ul>
        <ul class="header__list">
          <li class="header__item header__item_type-lang">
            <HeaderChooseLang />
          </li>

        </ul>
      </div>
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
          <NuxtLink class="header__logo" to="/">
            <SvgoLogo class="header__logo-img" filled alt="Логотип" />
          </NuxtLink>
          <UiButton type="button" @click="handleCreateOrder" variant="primary" size="large" class="header__logo-button">Разместить заказ</UiButton>
        </div>
        <nav class="header__menu-links">
          <ul class="header__menu-list">
            <li class="header__links-item">
              <NuxtLink to="/services" class="header__link">Найти исполнителя</NuxtLink>
            </li>
            <li class="header__links-item">
              <NuxtLink to="/orders" class="header__link">Найти заказчика</NuxtLink>
            </li>
            <li class="header__links-item">
              <NuxtLink to="/members" class="header__link">Участники портала</NuxtLink>
            </li>
            <li class="header__links-item">
              <NuxtLink to="/related-industry-services" class="header__link">Партнерские сервисы</NuxtLink>
            </li>
          </ul>
        </nav>
        <div class="header__auth" v-if="isAuth">
          <UiButton
            class="header__page-link"
            to="/search"
            variant="secondary"
            size="around"
          >
            <SvgoSearchIcon class="svg-m" />
          </UiButton>
          <UiButton
            v-if="role !== 'adjacent'"
            class="header__page-link"
            :to="role ? `/favorites` : '/'"
            variant="secondary"
            size="around"
          >
            <SvgoFavorite class="svg-m" />
          </UiButton>
          <UiButton
            class="header__page-link"
            to="/chat"
            variant="secondary"
            size="around"
          >
            <SvgoMessage class="svg-m" />
          </UiButton>
          <UiButton
            v-if="role !== 'adjacent'"
            class="header__page-link"
            :to="role ? `/notifications` : '/'"
            variant="secondary"
            size="around"
          >
            <SvgoNotice class="svg-m" />
            <UiAlertBadge />
          </UiButton>
          <HeaderMenuDropDown v-model="isAuth" />
        </div>
        <div class="header__auth" v-else>
          <UiButton to="/search" variant="secondary" size="around">
            <SvgoSearchIcon class="svg-m" />
          </UiButton>
          <UiButton variant="secondary" size="large" type="button" @click="openAuthModal">Вход</UiButton>
          <HeaderChooseRegistrProfileDropdown class="header__page-link"/>
        </div>
        <UiButton v-if="!isAuth" type="button" variant="primary" size="small" class="header__login" @click="openAuthModal">Вход</UiButton>
      </div>
    </div>
    <HeaderMenuMobileModal
      v-model="isOpenMobileModal"
      :headerHeight="headerHeight"
      :closeButton="false"
      :userName="userName"
      :logo="userLogo"
      :role="role"
      :isAuth="isAuth"
    />
    <HeaderAuthUserModal />
  </header>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';
import { useSettingStore } from '~/store/settingStore';
import { useEntityStore } from '~/store/entityStore';
import { useLocationStore } from '~/store/locationStore';

const userStore = useUserStore();
const settingStore = useSettingStore();
const locationStore = useLocationStore();
const entityStore = useEntityStore();
const router = useRouter();

const isAuth = computed(() => userStore.isAuth);
const userName = computed(() => userStore.userData ? userStore.userData.name : null);
const userLogo = computed(() => userStore.userPubCard ? userStore.userPubCard.logo : null);
const isOpenMobileModal = ref(false);
const header = ref(null);
const headerMain = ref(null);
const headerMainHeight = ref(null);
const headerHeight = ref(null);
const headerFixed = ref(false);
const headerMainOffsetTop = ref(0);
const headerFiller = ref(0)
const headerInfo = ref(null)
const role = computed(() => {
  if(userStore.role) {
    return userStore.role
  }
})

const handleCreateOrder = () => {
  if (!isAuth.value) {
    router.push({path: '/register',  query: { role: 'customer', action: 'create-order' } });
    userStore.role = 'customer'
    localStorage.setItem('role', 'customer');
    settingStore.isCreateOrder = true
  } else {
    router.push('/orders/create/step1');
  }
}

function openAuthModal () {
  settingStore.authModalStatus = true;
}

function updateHeaderHeight() {
  if (header) {
    headerHeight.value = header.value.offsetHeight;
    headerMainHeight.value = headerMain.value.offsetHeight;
  }
}

watch(() => headerMainHeight.value, (newVal) => {
  settingStore.headerHeight = newVal;
})

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

// функция для добавления отступа header при открытии модалки
const adjustHeaderPadding = () => {
  const bodyPaddingRight = parseInt(window.getComputedStyle(document.body).paddingRight, 10) || 0;
  if (headerMain.value && header.value.classList.contains('header_fixed')) {
    headerMain.value.style.paddingRight = `${bodyPaddingRight}px`;
  }
};

onMounted(() => {
  updateHeaderHeight();
  onScrollPage();
  window.addEventListener('resize', updateHeaderHeight);
  window.addEventListener("scroll", onScrollPage)

  // следим за изменением стиля body для добавления отступа header при открытии модалки
  const observer = new MutationObserver(() => {
    adjustHeaderPadding();
  })

  observer.observe(document.body, {
    attributes: true, // Следим за изменениями атрибутов
    attributeFilter: ['style'], // Конкретно за изменением стиля
  });

  adjustHeaderPadding();


//   userStore.role = localStorage.getItem('role');
  // userStore.checkAuth();
  if(entityStore.entityData.categories.length < 1) {
    entityStore.getCategories();
    locationStore.getLocations();
  }
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

body.vfm--scrollbar-hidden .fixed-header {
  padding-right: calc(var(--vfm-scrollbar-width) + 1rem);
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
  font-size: 1.4em; //14
  font-family: "Inter", sans-serif;

  .header__info {
    border-bottom: 1px solid var(--border-color-tertiary);
    display: flex;
    justify-content: space-between;
    padding-block: 1.14em; //16
  }

  .header__list {
    align-items: center;
    column-gap: 1.14em; // 16
    display: flex;
  }

  .header__item {
    color: var(--text-color-septenary);
    font-weight: 500;
    font-size: 1em; // 14
  }

  .header__item_type-location {
    display: flex;
    align-items: center;
    color: #131523
  }

  .header__item_type-lang {
    font-size: 1em;
    font-weight: 500;
    color: var(--text-color-primary);
  }

  .header__item_type-location a {
    align-items: center;
    column-gap: .4em;
    display: flex
  }

  .header__item_type-location img {
    height: 1.14em;
    object-fit: contain;
    width: 1em;
  }

  .header__search-icon {
    width: 1em;
    height: auto;
  }

.header__main-container {
  display: flex;
  justify-content: space-between;
  padding-block: 1.428em 1.214em;
  align-items: center;
}



.header__logo-container {
  align-items: center;
  column-gap: 2.857em;
  display: flex;
  // flex: 1 0 auto;
}

.header__logo-container .header__logo-img {
  height: 3.571em;
  width: 11.428em;
}

.header__logo-button {
  background-color: var(--button-background-primary);
  border-radius: 100px;
  color: var(--text-color-octonary);
  cursor: pointer;
  font-size: 1.142em;
  font-weight: 600;
  padding: 0.75em 1.5em;
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
  display: flex;
  font-size: 1.142em;
  column-gap: 2em;
  font-weight: 600;
  justify-content: space-between
}

.header__links-item {
  flex: 1 0 auto;

}

.header__auth {
  align-items: center;
  column-gap: 1.142em;
  display: flex;
}

// .header__search {
//   align-items: center;
//   border-radius: 100px;
//   display: flex;
//   height: 4.1rem;
//   justify-content: center;
//   position: relative;
//   width: 4.1rem
// }

// .header__search img {
//   height: 2rem;
//   -o-object-fit: contain;
//   object-fit: contain;
//   width: 2rem;
// }

.header__login,
.header__menu-btn {
  display: none
}

.header__auth_mobile {
  display: none;
}

@include mobile {

  .header__auth,
  .header__info,
  .header__logo-button,
  .header__menu-links {
    display: none
  }

  .header__main {
    padding-block: 0;
  }

  .d-none {
    display: block;
  }

  .header__logo-container {
    column-gap: 0.857em
  }

  .header__logo-container .header__logo img {
    height: auto;
    width: 9.5em
  }

  .header__main-container {
    padding-block: .5em;
  }

  .header__menu-btn {
    background-color: inherit;
    border: none;
    display: block;
    height: 1.714em;
    padding: 0;
    width: 1.714em;
    position: relative;
  }

  .header__menu-btn i {
    font-size: 1.714em;
  }

  .header__login {
    display: flex;
    line-height: 1.66em;
  }

  .header__logo-container .header__logo-img {
    height: auto;
    width: 9.5em;
  }
}
}

.header__menu-btn>div {
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

@media screen and (max-width: 1325px) {
  .header__page-link {
    display: none;
  }
}

@media screen and (max-width: 991px) {
  .header__logo-button {
    display: none;
  }
}

</style>
