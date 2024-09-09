<template>
  <div class="sidebar">
    <div class="sidebar__body">
      <nav class="sidebar__top">
        <NuxtLink v-for="link in sidebarTopLinks" :key="link.id" :to="link.value" class="sidebar__link link" active-class="active">
          {{ link.label }}
        </NuxtLink>
      </nav>
      <nav class="sidebar__bottom">
        <a href="javascript:;" class="sidebar__bottom-link">
          <SvgoAdduser class="svg-m" fill="#6937a5"/>
          Кабинет исполнителя  
        </a>
        <NuxtLink class="sidebar__bottom-link" href="https://test.bee-online.ru/support">
          <SvgoSupport class="svg-m" fill="#6937a5"/>
          Техническая поддержка
        </NuxtLink>
        <a href="javascript:;" class="sidebar__bottom-link">
          <SvgoEnter class="svg-m" fill="#6937a5"/>
          Выйти
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


const userStore = useUserStore();

const getSidebarLinks = (role) => [
  { id: 1, label: 'Рабочий стол', value: `/${role}/desktop` },
  { id: 2, label: 'Профиль', value: `/${role}/profile` },
  {
    id: 3,
    label: role === 'performer' ? 'Услуги' : 'Заказы',
    value: '/',
  },
  { id: 4, label: 'Сообщения', value: '/' },
  { id: 5, label: 'Сделки', value: '/' },
  { id: 6, label: 'Избранное', value: '/' },
  { id: 7, label: 'Отзывы', value: '/' },
  { id: 8, label: 'Баланс и платные услуги', value: '/' },
  { id: 9, label: 'Уведомления', value: '/' },
  { id: 10, label: 'Техническая поддержка', value: '/' },
  { id: 11, label: 'Новости', value: '/' },
];

const sidebarTopLinks = getSidebarLinks(userStore.role);

</script>

<style lang="scss">

.sidebar {
  &__top {
    display: flex;
    flex-direction: column;
    gap: .5em;
    margin-left: -0.78em;
    margin-bottom: 1.5em;
    padding-bottom: .5em;
    border-bottom: 1px solid var(--border-color-secondary);
  }

  &__link {
    font-size: 1.6em;
    padding: .5em;
    line-height: 1em;
  }

  .active {
    background-color: var(--button-background-primary);
    color: var(--text-color-hover-secondary);

    &:hover {
      color: var(--text-color-hover-secondary);
      text-decoration: none;
    }
  }
  
  &__bottom {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }

  &__bottom-link {
    font-size: 1.6em;
    padding-block: .3em;
    line-height: 1em;
    display: flex;
    align-items: center;
    column-gap: .3em;
  }
}

</style>