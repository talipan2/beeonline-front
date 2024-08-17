<template>
  <UiDropDown :options="dropdownMenuLinks" :type="'secondary'" class="header__menu-dropdown">
    <template #trigger>
      <UiButton type="button" variant="secondary" size="large" class="header__auth-link">
        <SvgoUser class="svg-m" />
        Кабинет
        <span class="d-none"> исполнителя</span>
        <SvgoDropDown class="svg-m" />
      </UiButton>
    </template>
    <template #dropdown-header>
      <div class="header__user-info">
        <div class="header__user-image">
          <img src="~/assets/images/header/profile-image.jpg" alt="">
        </div>
        <div class="header__user-data">
          <div class="header__user-name">Заказчик 1</div>
          <div class="header__user-role">
            Исполнитель
          </div>
          <div class="header__user-role">
            (ID=2)
          </div>
        </div>
      </div>
    </template>
    <template #default="{ item }">
      <NuxtLink class="header__dropdown-links" :to="item.value">{{ item.label }}</NuxtLink>
    </template>
    <template #dropdown-footer>
      <UiButton to="/" variant="tertiary" size="centered" class="header__dropdown-change-role">
        <SvgoEnter class="svg-m" />
        Переключиться<br> на заказчика
      </UiButton>
      <UiButton to="/" variant="tertiary" size="centered" class="header__dropdown-change-role">
        <SvgoEnter class="svg-m" />
        В кабинет<br>менеджера сделок
      </UiButton>
      <div class="header__dropdown-logout">
        <a class="header__dropdown-links" href="javascript:;">Выход</a>
      </div>
    </template>
  </UiDropDown>
</template>

<script setup>

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

</script>

<style lang="scss">

.header__menu-dropdown {
  color: var(--text-color-monodecimal);
}

.header__auth-link {
  font-size: 1.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  column-gap: .75rem;
}
  .header__user-info {
    display: flex;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid var(--border-color-quinary);
    margin-bottom: 1.2rem;
    align-items: center;
  }

  .header__user-image {
      position: relative;
      min-width: 3.6rem;
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 3.6rem;
      margin-right: 1.6rem;
  }

  .header__user-name {
      font-size: 1.6rem;
      line-height: 1em;
  }

  .header__user-role {
      font-size: 1.2rem;
      font-weight: 300;
      text-transform: uppercase;
  }

  .header__user-nav {
      padding: 1em 0 1em 4em;
      font-weight: 300;
  }

  .header__user-nav a {
      font-size: 1.6em;
      display: block;
  }

  .header__user-nav a+a {
      margin-top: .625em;
  }

  .header__dropdown-links {
    padding: .29rem .6rem;
    font-size: 1.44rem;
    margin-bottom: .3rem;
    line-height: 1.2em;
  }

  .dropdown__link_list {
    margin-bottom: 1.2rem;
    // margin-left: -.6rem;
  }

  .header__dropdown-change-role {
    display: flex;
    align-items: center;
    column-gap: 1.5rem;
    font-size: 1.2rem;
    line-height: 1em;
    color: var(--text-color-ternary);
    text-transform: uppercase;
    margin-bottom: .4rem;
    padding-block: .8rem;

    & svg {
      fill: var(--text-color-ternary)
    }

    &:last-child {
      margin-bottom: 0;
    }

  } 

  .header__dropdown-logout {
    border-top: 1px solid var(--border-color-quinary);
    margin-top: 12px;
    padding-top: 12px;

    a:hover {
      background-color: var(--button-background-tertiary-hover) ;
    }
  }
  

  @media screen and (max-width: 1400px) {
    .d-none {
      display: none;
    }
    
  }

</style>