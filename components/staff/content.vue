<template>
  <div class="staff-content">
    <div class="form-group">
      <div class="form-group-data">
        <label class="form-group__title">
          Ф.И.О
          <UiInput
            name="staffName"
            type="text"
            placeholder=""
            class="form-group__value"
            v-model="modelValue.name"
            :rules="{ required: true, min: 2 }"
            label="Ф.И.О"
          />
        </label>
      </div>
      <div class="form-group-data">
        <label class="form-group__title">
          Должность
          <UiInput
            name="staffJobTitle"
            type="text"
            placeholder=""
            class="form-group__value"
            v-model="modelValue.jobTitle"
          />
        </label>
      </div>
      <div class="form-group-data">
        <label class="form-group__title">
          E-mail
          <UiInput
            name="staffEmail"
            type="email"
            placeholder="____@____"
            class="form-group__value"
            v-model="modelValue.email"
            :rules="{ required: true, email: true }"
            label="E-mail"
          />
        </label>
      </div>
      <div class="form-group-data">
        <label class="form-group__title">
          Телефон
          <UiInput
            name="staffPhone"
            type="tel"
            class="form-group__value staff__phone"
            v-model="modelValue.phone"
            :phonePlus="true"
            placeholder="+"
          />
        </label>
      </div>
    </div>
    <h2 class="staff__title">Права пользователя</h2>
    <UiCheckboxGroup
      :options="userPermissions"
      :is-drop-down="false"
      v-model="modelValue.staffPermissions"
    />
    <h2 class="staff__title">Уведомления пользователя</h2>
    <UiCheckboxGroup
      :options="userNotifications"
      :is-drop-down="false"
      v-model="modelValue.staffNotifications"
    />
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const userPermissions = [
  { id: 1, value: "admin-login", label: "Доступ в личный кабинет" },
  {
    id: 2,
    value: "manager-profile",
    label: "Редактирование профиля организации",
  },
  { id: 3, value: "user-card", label: "Создание публичной карты" },
  { id: 4, value: "admin-card", label: "Редактирование публичных карт" },
  { id: 5, value: "manager-employees", label: "Просмотр сотрудников" },
  { id: 6, value: "user-employees", label: "Управление сотрудниками" },
  { id: 7, value: "admin-order", label: "Просмотр списка заказов/услуг" },
  { id: 8, value: "manager-order", label: "Просмотр заказов/услуг" },
  { id: 9, value: "user-order", label: "Создание заказов/услуг" },
  { id: 10, value: "admin-order-edit", label: "Редактирование заказов/услуг" },
  { id: 11, value: "manager-order-edit", label: "Управление заказом/услугой" },
  { id: 12, value: "user-messages", label: "Просмотр сообщений" },
  { id: 13, value: "admin-messages", label: "Работа с сообщениями" },
  { id: 14, value: "manager-reviews", label: "Просмотр отзывов" },
  { id: 15, value: "user-reviews", label: "Работа с отзывами" },
  { id: 16, value: "admin-balance", label: "Пополнение баланса" },
  { id: 17, value: "manager-exhibition", label: "Просмотр выставок" },
  { id: 18, value: "user-exhibition", label: "Доступ к работе с ПК" },
  {
    id: 19,
    value: "admin-exhibition",
    label: "Доступ к работе с модераторами выставки",
  },
  {
    id: 20,
    value: "manager-exhibition-contacts",
    label: "Доступ к работе с контактами выставки",
  },
  {
    id: 21,
    value: "user-exhibition-info",
    label: "Доступ к работе с блоками информации о выставке",
  },
  {
    id: 22,
    value: "admin-exhibition-partners",
    label: "Доступ к работе с партнерами выставки",
  },
  {
    id: 23,
    value: "manager-exhibition-questions",
    label: "Доступ к работе с вопросами к выставке",
  },
  {
    id: 24,
    value: "user-exhibition-ad",
    label: "Доступ к работе с рекламой выставки",
  },
  {
    id: 25,
    value: "admin-exhibition-exp",
    label: "Доступ к работе с экспонентами",
  },
  {
    id: 26,
    value: "manager-exhibition-companies",
    label: "Доступ к работе с компаниями",
  },
  {
    id: 27,
    value: "user-exhibition-visitors",
    label: "Доступ к работе с посетителями",
  },
  {
    id: 28,
    value: "manager-exhibition-meetings",
    label: "Доступ к работе с встречами",
  },
  {
    id: 29,
    value: "user-exhibition-users",
    label: "Доступ к созданию новых пользователей",
  },
];

const userNotifications = [
  { id: 1, value: "1", label: "Уведомления о отзывах" },
  { id: 2, value: "2", label: "Уведомления о заказах" },
  { id: 3, value: "3", label: "Уведомления о новом сообщении" },
  { id: 4, value: "4", label: "Системные уведомления" },
  { id: 5, value: "5", label: "Новостные уведомления" },
];
</script>

<style lang="scss">
.staff-content {
  .checkbox-group {
    justify-content: space-between;

    .checkbox {
      flex: 0 1 48%;
    }
  }

  .staff__phone {
    span{
      order: -1;
      line-height: 1em;
    }
  }
}
</style>
