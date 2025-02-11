<template>
  <UiModal v-model="isOpenModal" title="Выберите город" @confirm="() => confirm()" class="header-menu"
    :style="{ marginTop: `${headerHeight}px` }" ref="modall" :clickToClose="false">
    <template #content>
      <div class="header-menu__header">
        <HeaderLocation />
        <HeaderChooseLang class="modal-lang"/>
      </div>
      <UiInput :placeholder="'Поиск по сайту'" class="header-menu__search" />
      <template v-if="isAuth"> 
        <button class="header-menu__user-data" @click="() => isOpenDropDown = !isOpenDropDown">
          <div class="header-menu__user-image">
            <img src="~/assets/images/header/profile-image.jpg" :alt="userName">
          </div>
          <div class="header-menu__user-info">
            <div class="header-menu__user-name">{{ userName }}</div>
            <div class="header-menu__user-role">{{ getRoleName(role) }}</div>
          </div>
          <SvgoDropDownNew class="svg-m header-menu__dropdown-icon" />
        </button>
        <transition name="fade">
          <ul v-if="isOpenDropDown" class="header-menu__link-list header-menu__link-list_type_dropdown">
          <li class="header-menu__link-item" v-for="item in dropdownMenuLinks" :key="item">
            <NuxtLink :to="item.value" class="header-menu__link">{{ item.label }}</NuxtLink>
          </li>
          <li class="header-menu__link-item header-menu__sign-out">
            <a href="javascript:;" class="header-menu__link">Выйти</a>
          </li>
        </ul>
        </transition>
      </template>
      <template v-else>
        <div class="header-menu__sign-in">
          <UiButton type="button" variant="quinary" size="large" class="header-menu__sign-in-button" @click="settingStore.authModalStatus = true">Вход/Регистрация</UiButton>
          <UiButton type="button" variant="tertiary" size="large" class="header-menu__order-btn">Разместить заказ</UiButton>
        </div>
      </template>
      <nav>
        <ul class="header-menu__link-list">
          <li class="header-menu__link-item">
            <NuxtLink to="/services" class="header-menu__link">Найти исполнителя</NuxtLink>
          </li>
          <li class="header-menu__link-item">
            <NuxtLink to="/orders" class="header-menu__link">Найти заказчика</NuxtLink>
          </li>
          <li class="header-menu__link-item">
            <NuxtLink to="/members" class="header-menu__link">Участники портала</NuxtLink>
          </li>
          <li class="header-menu__link-item">
            <NuxtLink to="/help" class="header-menu__link">Помощь</NuxtLink>
          </li>
          <li class="header-menu__link-item">
            <NuxtLink to="/contacts" class="header-menu__link">Контакты</NuxtLink>
          </li>
        </ul>
      </nav>
      <template v-if="isAuth">
        <NuxtLink to="" class="header-menu__change-role">
          <SvgoEnter class="svg-m" />
          Переключится на заказчика
        </NuxtLink>
        <NuxtLink to="" class="header-menu__change-role">
          <SvgoEnter class="svg-m" />
          В кабинет менеджера сделок
        </NuxtLink>
      </template>
      <div class="header-menu__social">
        <NuxtLink to="https://www.youtube.com/channel/UC2c_djW8Mf6KLrmB5TOuP_w" class="header-menu__social-link">
          <SvgoYoutube class="svg-lx" />
        </NuxtLink>
      </div>
    </template>
    <HeaderAuthUserModal />
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';


const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  headerHeight: {
    type: Number,
    default: 0,
  },
  userName: {
    type: String,
  },
  role: {
    type: String,
  },
  isAuth: {
    type: Boolean,
    default: false,
  }
});

const router = useRouter();
const emit = defineEmits(['update:modelValue']);
const modall = ref(null);
const settingStore = useSettingStore();
const isOpenModal = ref(props.modelValue);



const isOpenDropDown = ref(false);

function getRoleName(role) {
  if(role === 'customer') {
    return 'Заказчик';
  } else if(role === 'performer') {
    return 'Исполнитель';
  }
}

const dropdownMenuLinks = computed(() => {
  return [
    { id: 1, label: "Рабочий стол", value: `/${props.role}/desktop` },
    { id: 2, label: "Bee-online Gifts", value: `/bonus` },
    { id: 3, label: "Профиль", value: `/${props.role}/profile` },
    { id: 4, label: props.role === "performer" ? "Услуги" : "Заказы", value: props.role === "performer" ? "/performer/services" : "/customer/orders", },
    { id: 5, label: "Проверка контрагентов", value: `/${props.role}/org_check` },
    { id: 6, label: "Сообщения", value: "/chat" },
    { id: 7, label: "Сделки", value: "/" },
    { id: 8, label: "Документы", value: `/${props.role}/documentation` },
    { id: 9, label: "Избранное", value: `/${props.role}/favorites` },
    { id: 10, label: "Отзывы", value: `/${props.role}/my-reviews` },
    { id: 11, label: "Баланс и платные услуги", value: "/" },
    { id: 12, label: "Уведомления", value: `/${props.role}/notifications` },
    { id: 13, label: "Новости", value: "/news" },
  ];
});  


function confirm() {
  emit('update:modelValue', false);
}

watch(() => props.modelValue, (newVal) => {
  isOpenModal.value = newVal;
});

watch(isOpenModal, (newVal) => {
  isOpenModal.value = newVal;
  emit('update:modelValue', newVal);
});

watch(() => router.currentRoute.value.path, (newVal) => {
  confirm();
})

</script>

<style lang="scss">

.header-menu {

  .modal-body {
    width: 29em;
  }

  .modal-dialog {
    max-height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    padding-bottom: 3em;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5em;
    
      .header__location {
        font-size: 1.4em;
      }
  }

  .header__lang-item {
    font-size: 1em;
  }

  .choose-lang {
    [data-tippy-root] {
      min-width: auto;
    }
  }

  &__search {
    margin-bottom: 1em;
  }

  &__sign-in {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    padding-block: 2em;
    border-top: 1px solid var(--text-color-ternary);
    border-bottom: 1px solid var(--text-color-ternary);

    .btn {
      width: 100%;
      text-transform: uppercase;
      font-size: 1.2em;
    }
  }

  &__order-btn {
    background-color: transparent;
    color: #fff;
  }

  &__user-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    column-gap: 1.2em;
    padding-block: 1.5em;
    margin-block: 1.5em;
    border-bottom: 1px solid var(--text-color-ternary);
    border-top: 1px solid var(--text-color-ternary);

  }

  &__user-image {
    width: 3em;
    height: 3em;
    border-radius: 3em;
    overflow: hidden;
  }

  &__user-info { 
    font-size: 1.4em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    color: var(--text-color-octonary);
  }

  &__user-role{
    font-size: 0.857em;
  }

  &__dropdown-icon {
    path {
      fill: var(--text-color-octonary);
    }
  }

  &__link-list {
    display: flex;
    flex-direction: column;
    row-gap: 0.625em;
    font-size: 1.6em;
    color: var(--text-color-octonary);
    padding: 0.625em 0 1.9em 2.5em;
    font-weight: 300;
    border-bottom: 1px solid var(--text-color-ternary);
    margin-bottom: 1.25em;
  }

  &__change-role {
    font-size: 1.2em;
    color: var(--text-color-octonary);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    column-gap: 0.625em;
    padding: 0.625em 0.625em 2.291em 2.5em;
    border-bottom: 1px solid var(--text-color-ternary);
    margin-bottom: 1.66em;

    svg {
      fill: #fff;
    }
  }

  &__social {
    display: flex;
    justify-content: center;
  }

  &__social-link {
    circle {
      fill: #ffffff00;
    }

    @include hover {
      circle {
        fill: var(--text-color-octonary);
      }
      path {
        fill: var(--text-color-monodecimal);
      }
    }
  }

  &__sign-out {
    border-top: 1px solid #fff;
    padding-top: 1em;
  }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    }

.fade-enter-from {
  transform: translateY(-10%);
  opacity: 0;
}

.fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.fade-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.fade-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}

}

</style>