<template>
  <UiModal v-model="isOpenModal" @confirm="() => confirm()" class="header-menu"
    :style="{ marginTop: `${headerHeight}px` }" ref="modall" :clickToClose="false">
    <template #content>
      <template v-if="isAuth">
        <button class="header-menu__user-data" @click="() => isOpenDropDown = !isOpenDropDown">
          <div class="header-menu__user-image">
            <img :src="logo || defaultLogoImage" :alt="userName">
          </div>
          <div class="header-menu__user-info">
            <div class="header-menu__user-name">{{ userName }}</div>
            <div class="header-menu__user-role">{{ getRoleName(role) }}</div>
          </div>
        </button>
        <ul class="header-menu__link-list header-menu__link-list_type_dropdown">
          <li class="header-menu__link-item">
            <NuxtLink to="/customer/orders" class="header-menu__link">Заказы</NuxtLink>
          </li>
          <li class="header-menu__link-item">
            <NuxtLink to="/orders/create" class="header-menu__link">Разместить заказ</NuxtLink>
          </li>
          <li class="header-menu__link-item header-menu__sign-out">
            <UiButton type="button" class="header-menu__link" variant="default" :withoutPadding="true" @click="logOut">Выход</UiButton>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="header-menu__sign-in">
          <UiButton type="button" variant="quinary" size="large" class="header-menu__sign-in-button"
            @click="settingStore.authModalStatus = true">Вход/Регистрация</UiButton>
          <UiButton type="button" variant="tertiary" size="large" class="header-menu__order-btn">Разместить заказ
          </UiButton>
        </div>
      </template>
    </template>
  </UiModal>
</template>

<script setup>
import { useSettingStore } from '~/store/settingStore';
import defaultLogoImage from "~/assets/images/nophoto_pc.png";
import { useUserStore } from '~/store/userStore';
import { useOrganizationStore } from '~/store/organizationStore';


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
  },
  logo: {
    type: String,
    default: '',
  }
});

const router = useRouter();
const emit = defineEmits(['update:modelValue']);
const modall = ref(null);
const settingStore = useSettingStore();
const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const isOpenModal = ref(props.modelValue);
const userRoles = computed(() => userStore.userRoles);
const userData = computed(() => userStore.userData);


const isOpenDropDown = ref(false);

function getRoleName(role) {
  if(role === 'customer') {
    return 'Заказчик';
  } else if(role === 'performer') {
    return 'Исполнитель';
  }
}

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

const logOut = () => {
  userStore.logOut().then(() => {
    router.push({ path: '/telegram' });
  });
}

watch(() => router.currentRoute.value.path, (newVal) => {
  confirm();
})

</script>

<style lang="scss">

.header-menu {

  .modal-body {
    width: 29em;
  }

  .modal-content {
    font-family: "Inter", sans-serif;
    max-height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    padding-bottom: 3em;
    margin-block: 0;
    background-color: transparent;
    padding-right: 1em;
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
    row-gap: .5em;
    color: var(--text-color-octonary);
  }

  &__user-role{
    font-size: 0.857em;
    text-transform: uppercase;
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
    column-gap: 0.625em;
    padding-block: 0.625em 2.291em;
    border: none;
    border-bottom: 1px solid var(--text-color-ternary);
    margin-bottom: 1.66em;
    border-radius: 0;
    width: 100%;

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

    .header-menu__link {
      font-size: 1.6rem;
      color: #fff;
      text-transform: none;
      font-weight: 300;
    }
  }


}

</style>
