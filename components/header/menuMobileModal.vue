<template>
  <UiModal v-model="isOpenModal" title="Выберите город" @confirm="() => confirm()" class="header-menu"
    :style="{ marginTop: `${headerHeight}px` }" ref="modall">
    <template #content>
      <div class="header-menu__header">
        <HeaderLocation />
        <HeaderChooseLang />
      </div>
      <UiInput :placeholder="'Поиск по сайту'" class="header-menu__search" />
      <button class="header-menu__user-data" @click="() => isOpenDropDown = !isOpenDropDown">
        <div class="header-menu__user-image">
          <img src="~/assets/images/header/profile-image.jpg" alt="">
        </div>
        <div class="header-menu__user-info">
          <div class="header-menu__user-name">Заказчик 1</div>
          <div class="header-menu__user-role">Исполнитель</div>
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
      <nav>
        <ul class="header-menu__link-list">
          <li class="header-menu__link-item">
            <NuxtLink to="https://test.bee-online.ru/services" class="header-menu__link">Найти исполнителя</NuxtLink>
          </li>
          <li class="header-menu__link-item">
            <NuxtLink to="https://test.bee-online.ru/orders" class="header-menu__link">Найти заказчика</NuxtLink>
          </li>
          <li class="header-menu__link-item">
            <NuxtLink to="https://test.bee-online.ru/members" class="header-menu__link">Найти поставщика</NuxtLink>
          </li>
          <li class="header-menu__link-item">
            <NuxtLink to="https://test.bee-online.ru/members" class="header-menu__link">Помощь</NuxtLink>
          </li>
          <li class="header-menu__link-item">
            <NuxtLink to="https://test.bee-online.ru/members" class="header-menu__link">Контакты</NuxtLink>
          </li>
        </ul>
      </nav>
      <NuxtLink to="https://test.bee-online.ru/members" class="header-menu__change-role">
        <SvgoEnter class="svg-m" />
        Переключится на заказчика
      </NuxtLink>
      <NuxtLink to="https://test.bee-online.ru/members" class="header-menu__change-role">
        <SvgoEnter class="svg-m" />
        В кабинет менеджера сделок
      </NuxtLink>
      <div class="header-menu__social">
        <NuxtLink to="https://www.youtube.com/channel/UC2c_djW8Mf6KLrmB5TOuP_w" class="header-menu__social-link">
          <SvgoYoutube class="svg-lx" />
        </NuxtLink>
      </div>
    </template>
  </UiModal>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  headerHeight: {
    type: Number,
    default: 0,
  }
});

const emit = defineEmits(['update:modelValue']);
const modall = ref(null);

const isOpenModal = ref(props.modelValue);

const isOpenDropDown = ref(false);

const dropdownMenuLinks = [
    { label: 'Рабочий стол', value: '/' },
    { label: 'Профиль', value: '/' },
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

</script>

<style lang="scss">

.header-menu {

  .modal-body {
    width: 290px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  &__search {
    margin-bottom: 15px;
  }

  &__user-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    column-gap: 12px;
    padding-block: 15px;
    margin-block: 15px;
    border-bottom: 1px solid var(--text-color-ternary);
    border-top: 1px solid var(--text-color-ternary);

  }

  &__user-image {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    overflow: hidden;
  }

  &__user-info { 
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
    color: var(--text-color-octonary);
  }

  &__user-role{
    font-size: 12px;
  }

  &__dropdown-icon {
    path {
      fill: var(--text-color-octonary);
    }
  }

  &__link-list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    font-size: 16px;
    color: var(--text-color-octonary);
    padding: 10px 0 30px 40px;
    font-weight: 300;
    border-bottom: 1px solid var(--text-color-ternary);
    margin-bottom: 20px;
  }

  &__change-role {
    font-size: 12px;
    color: var(--text-color-octonary);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    column-gap: 7.5px;
    padding: 7.5px 7.5px 27.5px 30px;
    border-bottom: 1px solid var(--text-color-ternary);
    margin-bottom: 20px;

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
    padding-top: 10px;
  }

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    }
  
    // .fade-enter-from,
    // .fade-leave-to {
    //   opacity: 0;
    // }
  
    // .fade-enter-to,
    // .fade-leave-from {
    //   opacity: 1;
    // }

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