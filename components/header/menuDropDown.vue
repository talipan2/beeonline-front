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
      Кабинет
      <span class="d-none" v-if="userStore.role === 'performer'"> исполнителя</span>
      <span class="d-none" v-if="userStore.role === 'customer'"> заказчика</span>
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
            Исполнитель
          </div>
          <div class="header__user-role" v-if="userStore.role === 'customer'">
            Заказчик
          </div>
          <div class="header__user-role">
            (ID={{ userData.id }})
          </div>
        </div>
      </div>
      <div class="header__menu-dropdown-links">
        <template v-for="(item, index) in dropdownMenuLinks" :key="index">
          <NuxtLink class="header__dropdown-links" :to="item.value">{{ item.label }}</NuxtLink>
        </template>
      </div>
      <div class="header__menu-dropdown-settings">
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
            Переключиться<br>на исполнителя
          </span>
        </UiButton>
        <UiButton type="button" variant="tertiary" size="centered" class="header__dropdown-change-role"
        @click="setRole('performer')" v-if="!userRoles.includes('performer')">
          <SvgoEnter class="svg-m" />
          <span>
            Стать<br>исполнителем
          </span>
        </UiButton>
        <UiButton type="button" variant="tertiary" size="centered" class="header__dropdown-change-role"
        @click="setRole('customer')" v-if="!userRoles.includes('customer')">
          <SvgoEnter class="svg-m" />
          <span>
            Стать<br>заказчиком
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


const emit = defineEmits(['update:modelValue']);
const userData = computed(() => userStore.userData);
const organizationStore = useOrganizationStore();
const router = useRouter();
const role = computed(() => userStore.role)
const userRoles = computed(() => userStore.userRoles);

const userCurrentPubCard = computed(() => userStore.userPubCard);

const logo = computed(() => {
  if ( userCurrentPubCard.value && userCurrentPubCard.value.logo) {
    return userCurrentPubCard.value.logo;
  }
  return defaultLogoImage
})

const headerDropdown = ref(null);

const dropdownMenuLinks = computed(() => {
  return [
    { label: 'Рабочий стол', value: `/desktop` },
    { label: 'Bee-online Gifts', value: `/bonus` },
    { label: 'Профиль', value: `/profile` },
    { 
      label: `${role.value === 'customer' ? 'Заказы' : 'Услуги'}`, 
      value: `/${role.value}/${role.value === 'customer' ? 'orders' : 'services'}` 
    },
    { label: 'Сообщения', value: '/chat' },
    { label: 'Сделки', value: '/' },
    { label: 'Избранное', value: `/favorites` },
    { label: 'Отзывы', value: `/my-reviews` },
    { label: 'Баланс и платные услуги', value: '/tariffs' },
    { label: 'Уведомления', value: `/notifications` },
    { label: 'Техническая поддержка', value: '/support' },
    { label: 'Новости', value: '/news' },
  ]
})

watch(() => router.currentRoute.value.path, (newVal) => {
  if(headerDropdown.value.tippy) {
    headerDropdown.value.tippy.hide();
  }
})

const logOut = () => {
  userStore.logOut()
  .then(res => router.push({ path: '/' }))
  .catch(err => console.log(err))
};

const handleSwitchRole = async () => {
  const isCustomer = userStore.role === 'customer';
  const newRole = isCustomer ? 'performer' : 'customer';
  const redirectPath = '/desktop';

  try {
    await userStore.setUserData({ role: newRole }, userData.value.id);
    userStore.role = newRole;
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
      localStorage.setItem('role', role);
      organizationStore.setPubCard({
        id: userStore.userData.organization_id,
        name: userStore.userData.public_cards[0].name,
        status: 1,
        type: role
      })
      userStore.checkAuth()
      router.push({ path: `/desktop` });
      
    });
}

</script>

<style lang="scss">

.header__menu-dropdown {
  color: var(--text-color-monodecimal);
}

.header__menu-dropdown-content {
  font-size: 1.4rem;
  padding: 1.7em;
  color: var(--text-color-monodecimal);
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

  }

</style>
