<template>
  <UiNewDropdown
    class="header__menu-dropdown"
    :arrow="false"
    placement="bottom-end"
    :offset="[0, 0]"
    dropdown-class="header__menu-dropdown-content"
    ref="headerDropdown"
  >
    <UiButton type="button" variant="secondary" size="large" class="header__auth-link">
      <SvgoUser class="svg-m" />
      <template v-if="userStore.role === 'customer'">
        Кабинет
        <span class="d-none"> заказчика</span>
      </template>
      <template v-else-if="userStore.role === 'performer'">
        <span class="d-none-desktop">Аккаунт</span>
        <span class="d-none-tablet">Аккаунт производителя</span>
      </template>
      <template v-else>
        Личный кабинет
      </template>
      <SvgoDropDown class="svg-m" />
    </UiButton>
    <template #content>
      <div class="header__user-info">
        <div class="header__user-image">
          <img :src="logo" :alt="userData.name">
        </div>
        <div class="header__user-data">
          <div class="header__user-name">{{ userData.name }}</div>
          <div class="header__user-role" v-if="userStore.role === 'performer'">
            Производитель
          </div>
          <div class="header__user-role" v-if="userStore.role === 'customer'">
            Заказчик
          </div>
          <!-- <div class="header__user-role">
            (ID={{ userData.id }})
          </div> -->
        </div>
      </div>
      <div class="header__menu-dropdown-links">
        <template v-for="(item, index) in dropdownMenuLinks" :key="index">
          <NuxtLink class="header__dropdown-links" :to="item.value">{{ item.label }}</NuxtLink>
        </template>
      </div>
      <div class="header__menu-dropdown-settings" v-if="userStore.role !== 'adjacent'">
        <UiButton type="button" variant="tertiary" size="centered" class="header__dropdown-change-role"
        @click="handleSwitchRole" v-if="userStore.role === 'performer' && userData.roles.includes('customer')">
          <SvgoEnter class="svg-m" />
          <span>
            Переключиться<br>на заказчика
          </span>
        </UiButton>
        <UiButton type="button" variant="tertiary" size="centered" class="header__dropdown-change-role"
        @click="handleSwitchRole" v-if="userStore.role === 'customer' && userData.roles.includes('performer')">
          <SvgoEnter class="svg-m" />
          <span>
            Переключиться<br>на производителя
          </span>
        </UiButton>
        <UiButton type="button" variant="tertiary" size="centered" class="header__dropdown-change-role"
        @click="setRole('performer')" v-if="!userRoles.includes('performer')">
          <SvgoEnter class="svg-m" />
          <span>
            Стать<br>производителем
          </span>
        </UiButton>
        <UiButton type="button" variant="tertiary" size="centered" class="header__dropdown-change-role"
        @click="setRole('customer')" v-if="!userRoles.includes('customer')">
          <SvgoEnter class="svg-m" />
          <span>
            Стать<br>заказчиком
          </span>
        </UiButton>
        <UiButton variant="tertiary" size="centered" class="header__dropdown-change-role" :to="`${config.public.backUrl}/admin`" target="_blank" v-if="adminRoles.includes(userStore.role)">
          <SvgoEnter class="svg-m" />
          <span>
            Панель<br>управления
          </span>
        </UiButton>
        <!-- <UiButton type="button" variant="tertiary" size="centered" class="header__dropdown-change-role">
          <SvgoEnter class="svg-m" />
          <span>
            В кабинет<br>менеджера сделок
          </span>
        </UiButton> -->
      </div>
      <div class="header__dropdown-logout">
        <a class="header__dropdown-links" href="javascript:;" @click="logOut">Выход</a>
      </div>
    </template>
  </UiNewDropdown>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';
import defaultLogoImage from '~/assets/images/nophoto_pc.png'

const userStore = useUserStore();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  }
});

const config = useRuntimeConfig();

const emit = defineEmits(['update:modelValue']);
const userData = computed(() => userStore.userData);
const organizationStore = useOrganizationStore();
const router = useRouter();
const role = computed(() => userStore.role)
const userRoles = computed(() => userStore.userRoles);
const absenceDefaultRole = computed(() => !userRoles.value.includes('customer') && !userRoles.value.includes('performer')); // переменная для проверки наличия ролей customer и performer

const userCurrentPubCard = computed(() => userStore.userPubCard);

const logo = computed(() => {
  if ( userCurrentPubCard.value && userCurrentPubCard.value.logo) {
    return userCurrentPubCard.value.logo;
  }
  return defaultLogoImage
})

const headerDropdown = ref(null);

const adminRoles = ['admin', 'moderator', 'support', 'to_moderator', 'deals_manager']

const dropdownMenuLinks = computed(() => {
  if(role.value === 'adjacent') {
    return [
      { label: 'Профиль', value: `/profile` },
      { label: 'Сообщения', value: `/chat` },
      { label: 'Техническая поддержка', value: '/support' },
    ]
  } else {
    return [
      { label: 'Рабочий стол', value: `/desktop` },
      { label: 'Bee-online Gifts', value: `/bonus` },
      { label: 'Профиль', value: `/profile` },
      ...(role.value === 'customer' 
      ? [{ label: 'Заказы', value: '/customer/orders' }] 
      : []),
      { label: 'Сообщения', value: '/chat' },
      { label: 'Сделки', value: '/deals' },
      { label: 'Избранное', value: `/favorites` },
      { label: 'Отзывы', value: `/my-reviews` },
      { label: 'Баланс и платные услуги', value: '/tariffs' },
      { label: 'Уведомления', value: `/notifications` },
      { label: 'Техническая поддержка', value: '/support' },
      { label: 'Новости', value: '/news' },
    ]
  }
})

watch(() => router.currentRoute.value.path, (newVal) => {
  if(headerDropdown.value?.tippy) {
    headerDropdown.value.tippy.hide();
  }
})

const logOut = async() => {
  try {
    await userStore.logOut();

    await router.push({ path: '/', });
  } catch (error) {
    console.log(error);
  }
};

const handleSwitchRole = async () => {
  const isCustomer = userStore.role === 'customer';
  const newRole = isCustomer ? 'performer' : 'customer';
  const redirectPath = '/desktop';

  try {
    await userStore.setUserData({ role: newRole }, userData.value.id).then(res => {
      userStore.role = newRole;
      userStore.checkAuth();
    })
    localStorage.setItem('role', newRole);
    router.push({ path: redirectPath });
  } catch (error) {
    console.error(error);
  }
};

const setRole = (role) => {
  userStore.setUserData({ role: role }, userData.value.id)
    .then(res => {
      userStore.role = role;
      userStore.userRoles = res.data.roles;
      localStorage.setItem('role', role);
      if(role === 'customer') {
        if(userStore.userData.organization_id) {
          router.push({ path: `/register/step2` });
        } else {
          router.push({ path: `/register/step1` });
        }
      } else if (role === 'performer') {
        if(userStore.userData.organization_id) {
          router.push({ path: `/performer-register/step2` });
        } else {
          router.push({ path: `/performer-register/step1` });
        }
      }
    });
}

const formatLangRole = computed(() => {
  switch (userStore.role) {
    case 'customer':
      return 'заказчиком'
    case 'performer': 
      return 'производителем'
    default:
      return ''
  }
})

</script>

<style lang="scss">

.header__menu-dropdown {
  color: var(--text-color-monodecimal);
}

.header__menu-dropdown-content {
  font-size: 1.4rem;
  padding: 1.7em;
  color: var(--text-color-monodecimal);
  max-width: 20em;
}

.header__menu-dropdown-links {
  margin-bottom: 1em;
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
      border-radius: 100%;
      margin-right: 1.142em;
      overflow: hidden;

      img {
        height: 100%;
        object-fit: cover;
      }
  }

  .header__user-name {
      font-size: 1.142em;
      line-height: 1.2em;
  }

  .header__user-role {
      font-size: 0.857em;
      line-height: 1.2em;
      font-weight: 400;
      text-transform: uppercase;
  }

  .header__dropdown-links {
    padding: .2em .42em;
    margin-inline: -0.42em;
    font-size: 1em;
    margin-bottom: 0.214em;
    line-height: 1.2em;

    &:hover {
      background-color: #e9ecef;
      color: #16181b;
    }
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
    text-wrap: wrap;

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

    .d-none-tablet {
      display: none;
    }
  }
  
  @media screen and (min-width: 1420px) {
    .d-none-desktop {
      display: none;
    }
  }


</style>
