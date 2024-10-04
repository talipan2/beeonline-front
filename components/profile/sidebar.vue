<template>
  <CommonSidebar>
    <template #body>
      <nav class="sidebar__top">
        <NuxtLink
          v-for="link in sidebarTopLinks"
          :key="link.id"
          :to="link.value"
          class="sidebar__link link"
          active-class="active"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </template>
    <template #bottom>
      <nav class="sidebar__bottom">
        <a href="javascript:;" class="sidebar__bottom-link">
          <SvgoAdduser class="svg-m" fill="#6937a5" />
          Кабинет исполнителя
        </a>
        <NuxtLink
          class="sidebar__bottom-link"
          href="https://test.bee-online.ru/support"
        >
          <SvgoSupport class="svg-m" fill="#6937a5" />
          Техническая поддержка
        </NuxtLink>
        <a href="javascript:;" class="sidebar__bottom-link">
          <SvgoEnter class="svg-m" fill="#6937a5" />
          Выйти
        </a>
      </nav>
    </template>
  </CommonSidebar>
</template>

<script setup>
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();

const getSidebarLinks = (role) => [
  { id: 1, label: "Рабочий стол", value: `/${role}/desktop` },
  { id: 2, label: "Профиль", value: `/${role}/profile` },
  {
    id: 3,
    label: role === "performer" ? "Услуги" : "Заказы",
    value: role === "performer" ? "/performer/services" : "/customer/orders",
  },
  { id: 4, label: "Сообщения", value: "/" },
  { id: 5, label: "Сделки", value: "/" },
  { id: 6, label: "Избранное", value: "/" },
  { id: 7, label: "Отзывы", value: "/" },
  { id: 8, label: "Баланс и платные услуги", value: "/" },
  { id: 9, label: "Уведомления", value: "/" },
  { id: 10, label: "Техническая поддержка", value: "/" },
  { id: 11, label: "Новости", value: "/" },
];

const sidebarTopLinks = computed(() => getSidebarLinks(userStore.role));
</script>
