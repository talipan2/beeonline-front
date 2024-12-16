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
        <button v-if="role === 'customer'" @click="handleChangeRole('performer')" class="sidebar__bottom-link">
          <SvgoAdduser class="svg-m" fill="#6937a5" />
          Кабинет исполнителя
        </button>
        <button v-if="role === 'performer'" @click="handleChangeRole('customer')" class="sidebar__bottom-link">
          <SvgoAdduser class="svg-m" fill="#6937a5" />
          Кабинет заказчика
        </button>
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
import { useUserStore } from "~/store/userStore";

const props = defineProps({
  role: {
    type: String,
    required: true,
  },
})

const userStore = useUserStore();
const router = useRouter();

function handleChangeRole(role) {
  if(role === 'customer') {
    userStore.role = 'customer';
    router.push({ path: '/customer/desktop' })
  } else if(role === 'performer') {
    userStore.role = 'performer';
    router.push({ path: '/performer/desktop' })
  }
}

function handleLogout() {
  userStore.logOut()
  .then(() => router.push({ path: '/' }))
  .catch(err => console.log(err));
}

const getSidebarLinks = (role) => [
  { id: 1, label: "Рабочий стол", value: `/${role}/desktop` },
  { id: 2, label: "Bee-online Gifts", value: `/bonus` },
  { id: 3, label: "Профиль", value: `/${role}/profile` },
  { id: 4, label: role === "performer" ? "Услуги" : "Заказы", value: role === "performer" ? "/performer/services" : "/customer/orders", },
  { id: 5, label: "Проверка контрагентов", value: `/${role}/org_check` },
  { id: 6, label: "Сообщения", value: "/chat" },
  { id: 7, label: "Сделки", value: "/" },
  { id: 8, label: "Документы", value: `/${role}/documentation` },
  { id: 9, label: "Избранное", value: `/${role}/favorites` },
  { id: 10, label: "Отзывы", value: `/${role}/my-reviews` },
  { id: 11, label: "Баланс и платные услуги", value: "/tariffs" },
  { id: 12, label: "Уведомления", value: `/${role}/notifications` },
  { id: 13, label: "Новости", value: "/news" },
];

const sidebarTopLinks = computed(() => getSidebarLinks(props.role));

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
