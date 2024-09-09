<template>
  <UiDropDown :options="dropdownMenuLinks" :type="'secondary'" class="header__menu-dropdown">
    <template #trigger>
      <UiButton type="button" variant="secondary" size="large" class="header__auth-link">
        <SvgoUser class="svg-m" />
        Кабинет
        <span class="d-none" v-if="userStore.role === 'performer'"> исполнителя</span>
        <span class="d-none" v-else> заказчика</span>
        <SvgoDropDown class="svg-m" />
      </UiButton>
    </template>
    <template #dropdown-header>
      <div class="header__user-info">
        <div class="header__user-image">
          <img src="~/assets/images/header/profile-image.jpg" alt="">
        </div>
        <div class="header__user-data">
          <div class="header__user-name">{{ userData.name }}</div>
          <div class="header__user-role">
            Исполнитель
          </div>
          <div class="header__user-role">
            (ID={{ userData.id }})
          </div>
        </div>
      </div>
    </template>
    <template #default="{ item }">
      <NuxtLink class="header__dropdown-links" :to="item.value">{{ item.label }}</NuxtLink>
    </template>
    <template #dropdown-footer>
      <UiButton type="button" variant="tertiary" size="centered" class="header__dropdown-change-role" 
      @click="handleSwitchRole" v-if="userStore.role === 'performer'">
        <SvgoEnter class="svg-m" />
        Переключиться<br>на заказчика
      </UiButton>
      <UiButton type="button" variant="tertiary" size="centered" class="header__dropdown-change-role" 
      @click="handleSwitchRole" v-else>
        <SvgoEnter class="svg-m" />
        Переключиться<br>на исполнителя
      </UiButton>
      <UiButton to="/" variant="tertiary" size="centered" class="header__dropdown-change-role">
        <SvgoEnter class="svg-m" />
        В кабинет<br>менеджера сделок
      </UiButton>
      <div class="header__dropdown-logout">
        <a class="header__dropdown-links" href="javascript:;" @click="logOut">Выход</a>
      </div>
    </template>
  </UiDropDown>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';

const userStore = useUserStore();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['update:modelValue']);
const userData = computed(() => userStore.userData);
const router = useRouter();

  const dropdownMenuLinks = [
    { label: 'Рабочий стол', value: '/customer/desktop' },
    { label: 'Профиль', value: '/customer/profile' },
    { label: 'Услуги', value: '/' },
    { label: 'Сообщения', value: '/' },
    { label: 'Сделки', value: '/' },
    { label: 'Избранное', value: '/' },
    { label: 'Отзывы', value: '/' },
    { label: 'Баланс и платные услуги', value: '/' },
    { label: 'Уведомления', value: '/' },
    { label: 'Техническая поддержка', value: '/' },
    { label: 'Новости', value: '/' },
  ]

const logOut = () => {
  userStore.logOut()
  .then(res => console.log(res))
  .catch(err => console.log(err))
};

const handleSwitchRole = () => {
  if (userStore.role === 'customer') {
    userStore.role = 'performer';
    router.push({ path: '/performer/profile' })
  } else {
    userStore.role = 'customer';
    router.push({ path: '/customer/profile' })
  }
}

</script>

<style lang="scss">

.header__menu-dropdown {
  color: var(--text-color-monodecimal);
}

.header__auth-link {
  font-size: 1em;
  font-weight: 600;
  display: flex;
  align-items: center;
  column-gap: 0.53em;
}
  .header__user-info {
    display: flex;
    padding-bottom: 0.857em;
    border-bottom: 1px solid var(--border-color-quinary);
    margin-bottom: 0.857em;
    align-items: center;
  }

  .header__user-image {
      position: relative;
      min-width: 2.57em;
      width: 2.57em;
      height: 2.57em;
      border-radius: 2.57em;
      margin-right: 1.142em;
  }

  .header__user-name {
      font-size: 1.142em;
      line-height: 1em;
  }

  .header__user-role {
      font-size: 0.857em;
      font-weight: 300;
      text-transform: uppercase;
  }

  .header__dropdown-links {
    padding: .2em .42em;
    font-size: 1em;
    margin-bottom: 0.214em;
    line-height: 1.2em;
  }

  .header__dropdown-change-role {
    column-gap: 1.25em;
    font-size: .857em;
    line-height: 1em;
    text-transform: uppercase;
    margin-bottom: 0.33em;
    padding-block: 0.66em;
    justify-content: flex-start;
    text-align: left;
    width: 100%;
    box-sizing: border-box;

    & svg {
      fill: var(--text-color-ternary)
    }

    &:last-child {
      margin-bottom: 0;
    }

  } 

  .header__dropdown-logout {
    border-top: 1px solid var(--border-color-quinary);
    margin-top: 0.857em;
    padding-top: 0.857em;

    a:hover {
      background-color: var(--button-background-tertiary-hover) ;
    }
  }
  

  @media screen and (max-width: 1420px) {
    .d-none {
      display: none;
    }
    
  }

</style>