<template>
  <CommonSidebar class="profile-sidebar">
    <template #body>
      <nav class="sidebar__top" v-if="role">
        <NuxtLink
          v-for="link in sidebarTopLinks"
          :key="link.id"
          :to="link.value"
          class="sidebar__link link"
          :class="{ 'active': isActiveLink(link.value) }"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </template>
    <template #bottom>
      <nav class="sidebar__bottom">
        <template v-if="userStore.role !== 'adjacent'">
          <button v-if="userStore.role === 'customer' && userData.roles?.includes('performer')" @click="handleChangeRole('performer')" class="sidebar__bottom-link">
            <SvgoAdduser class="svg-m" fill="#6937a5" />
            Кабинет исполнителя
          </button>
          <button v-if="userStore.role === 'performer' && userData.roles?.includes('customer')" @click="handleChangeRole('customer')" class="sidebar__bottom-link">
            <SvgoAdduser class="svg-m" fill="#6937a5" />
            Кабинет заказчика
          </button>
          <button type="button" variant="default" class="sidebar__bottom-link"
          @click="setRole('performer')" v-if="!userRoles.includes('performer')" :without-padding="true">
            <SvgoAdduser class="svg-m" fill="#6937a5" />
            Стать исполнителем
          </button>
          <button type="button" variant="default" class="sidebar__bottom-link"
          @click="setRole('customer')" v-if="!userRoles.includes('customer')" :without-padding="true">
            <SvgoAdduser class="svg-m" fill="#6937a5" />
            Стать заказчиком
          </button>
        </template>
        <NuxtLink
          class="sidebar__bottom-link"
          :to="`/support`"
          :class="{ 'sidebar__bottom-link_type_active': isActiveLink('/support') }"
        >
          <SvgoSupport class="svg-m" fill="#6937a5" />
          Техническая поддержка
        </NuxtLink>
        <button @click="handleLogout" href="javascript:;" class="sidebar__bottom-link">
          <SvgoEnter class="svg-m" fill="#6937a5" />
          Выйти
        </button>
      </nav>
    </template>
  </CommonSidebar>
</template>

<script setup>
import { useOrganizationStore } from "~/store/organizationStore";
import { useUserStore } from "~/store/userStore";
import { useToast } from "vue-toastification";

const props = defineProps({
  role: {
    type: String,
    required: true,
  },
})

const userStore = useUserStore();
const organizationStore = useOrganizationStore();
const router = useRouter();

// function handleChangeRole(role) {
//   if(role === 'customer') {
//     userStore.role = 'customer';
//     router.push({ path: '/customer/desktop' })
//   } else if(role === 'performer') {
//     userStore.role = 'performer';
//     router.push({ path: '/performer/desktop' })
//   }
// }

const userRoles = computed(() => userStore.userRoles);
const userData = computed(() => userStore.userData);
const toast = useToast();

const handleChangeRole = async () => {
  const isCustomer = userStore.role === 'customer';
  const newRole = isCustomer ? 'performer' : 'customer';
  const redirectPath = '/desktop';

  try {
    await userStore.setUserData({ role: newRole }, userStore.userData.id)
    userStore.role = newRole;
    localStorage.setItem('role', newRole);
    router.push({ path: redirectPath });
  } catch (error) {
    console.error(error);
  }
};

const setRole = (role) => {
  if(!userStore.userPubCard?.id) return  
  userStore.setUserData({ role: role }, userData.value.id)
    .then(res => {
      userStore.role = role;
      userStore.userRoles = res.data.roles;
      localStorage.setItem('role', role);
      organizationStore.setPubCard({
        id: userStore.userData.organization_id,
        name: userStore.userData.public_cards[0].name,
        status: 1,
        type: role
      }).then(res => {
        if(res && res.data && res.data.id) {
          userStore.userPubCard = res.data;
          router.push({ path: `/pubcards/edit/${res.data.id}` });
          toast.success('Вы успешно стали ' + formatLangRole.value);
        }
      });
    });
}

const formatLangRole = computed(() => {
  switch (userStore.role) {
    case 'customer':
      return 'заказчиком'
    case 'performer': 
      return 'исполнителем'
    default:
      return ''
  }
})

function handleLogout() {
  userStore.logOut()
  .then(() => router.push({ path: '/' }))
  .catch(err => console.log(err));
}

const getSidebarLinks = (role) => [
  { id: 1, label: "Рабочий стол", value: `/desktop` },
  { id: 2, label: "Bee-online Gifts", value: `/bonus` },
  { id: 3, label: "Профиль", value: `/profile` },
  { id: 4, label: role === "performer" ? "Услуги" : "Заказы", value: role === "performer" ? "/performer/services" : "/customer/orders", },
  { id: 5, label: "Проверка контрагентов", value: `/org_check` },
  { id: 6, label: "Сообщения", value: "/chat" },
  { id: 7, label: "Сделки", value: "/deals" },
  { id: 8, label: "Документы", value: `/documentation` },
  { id: 9, label: "Партнерские сервисы", value: `/related-industry-services` },
  { id: 10, label: "Избранное", value: `/favorites` },
  { id: 11, label: "Отзывы", value: `/reviews` },
  { id: 12, label: "Баланс и платные услуги", value: "/tariffs" },
  { id: 13, label: "Уведомления", value: `/notifications` },
  { id: 14, label: "Новости", value: "/news" },
];

const sidebarIndustryServices = computed(() => {
  return [
    { id: 1, label: "Профиль", value: `/profile` },
    { id:2, label: 'Сообщения', value: '/chat'}
  ]
})

const sidebarTopLinks = computed(() => {
  console.log(props.role)
  if(props.role === 'adjacent') {
    return sidebarIndustryServices.value
  } else {
    return getSidebarLinks(props.role)
  }
});

const isActiveLink = (link) => {
  if (link.includes('/reviews') || link.includes('/my-reviews')) {
    return router.currentRoute.value.path.includes(link) || router.currentRoute.value.path.includes('/reviews');
  }
  if(link.includes('/services') || link.includes('/orders')) {
    return router.currentRoute.value.path.includes(link);
  }
  if(link.includes('/news')) {
    return router.currentRoute.value.path.includes(link);
  }
  return router.currentRoute.value.path === link;
};

</script>

<style lang="scss">

.profile-sidebar {

  .sidebar {

    &__top {
      margin-left: -0.78em;
    }

    &__link {
      font-size: 1.6em;
      padding: .5em;
      line-height: 1em;
    }

    &__bottom-link {
      font-size: 1.6em;
      padding-block: .3em;
      line-height: 1em;
      display: flex;
      align-items: center;
      column-gap: .3em;

      &:hover {
        color: var(--text-color-hover-primary);
        text-decoration: none;
      }

      &_type_active {
        color: var(--text-color-hover-primary);
      }
    }
  }

  .active {
      background-color: var(--button-background-primary);
      color: var(--text-color-hover-secondary);

      &:hover {
        color: var(--text-color-hover-secondary);
        text-decoration: none;
      }
    }
}

</style>
