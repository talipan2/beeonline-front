<template>
  <div class="entity entity_step-check">
    <h1 class="entity__title">{{ entity === 'services' ? 'Проверка вашей услуги' : 'Проверка вашего заказа' }}</h1>
    <CommonProfileCheckCard :title="entity === 'services' ? 'Услуга' : 'Заказ'"
      text="Указанные данные не разглашаются третьим лицам, и необходимы для успешной работы на сервисе"
      change-link-label="Изменить" change-link="/services/create" />
    <div class="form-group-data">
      <p class="form-group__title">Заголовок</p>
      <p class="form-group__value">{{ userStore.userData.email || 'test' }}</p>
    </div>
    <div class="form-group">
      <div class="form-group-data">
        <p class="form-group__title">Категории</p>
        <p class="form-group__value">{{ userStore.userData.phone || 'test' }}</p>
      </div>
      <div class="form-group-data">
        <p class="form-group__title">Место производства</p>
        <p class="form-group__value">{{ userStore.userData.phone || 'test' }}</p>
      </div>
      <div class="form-group-data" v-if="entity === 'services'">
        <p class="form-group__title">Мин. партия</p>
        <p class="form-group__value">{{ userStore.userData.phone || 'test' }}</p>
      </div>
      <div class="form-group-data" v-if="entity === 'services'">
        <p class="form-group__title">Наличие СТМ</p>
        <p class="form-group__value">{{ userStore.userData.phone || 'test' }}</p>
      </div>
      <div class="form-group-data" v-if="entity === 'services'">
        <p class="form-group__title">Бесплатные тестовые образцы</p>
        <p class="form-group__value">{{ userStore.userData.phone || 'test' }}</p>
      </div>
      <div class="form-group-data" v-if="entity === 'services'">
        <p class="form-group__title">Сырье</p>
        <p class="form-group__value">{{ userStore.userData.phone || 'test' }}</p>
      </div>
      <div class="form-group-data" v-if="entity === 'orders'">
        <p class="form-group__title">Партия</p>
        <p class="form-group__value">{{ userStore.userData.phone || 'test' }}</p>
      </div>
      <div class="form-group-data" v-if="entity === 'orders'">
        <p class="form-group__title">Лекала</p>
        <p class="form-group__value">{{ userStore.userData.phone || 'test' }}</p>
      </div>
      <div class="form-group-data" v-if="entity === 'orders'">
        <p class="form-group__title">Сырье</p>
        <p class="form-group__value">{{ userStore.userData.phone || 'test' }}</p>
      </div>
      <div class="form-group-data" v-if="entity === 'orders'">
        <p class="form-group__title">Срок выполнения</p>
        <p class="form-group__value">{{ userStore.userData.phone || 'test' }}</p>
      </div>
    </div>
    <div class="form-group-data">
      <p class="form-group__title">Описание</p>
      <p class="form-group__value">{{ userStore.userData.email || 'test' }}</p>
    </div>
    <div class="form-group-data">
      <p class="form-group__title">Условия сотрудничества</p>
      <p class="form-group__value">{{ userStore.userData.email || 'test' }}</p>
    </div>
    <UiCheckbox class="form-group-data">
      Использовать &nbsp;<a>безопасную сделку.</a>
    </UiCheckbox>
    <UiCheckbox class="form-group-data">Согласен на размещение заказа в телеграм-канале "Аутсорсинг в легпроме".</UiCheckbox>
    <div class="form-group">
      <UiButton type="button" @click="router.push('/services/create/step3')" class="form-group-data form-group-data__btn" variant="tertiary" size="large">Назад</UiButton>
      <UiButton type="button" @click="router.push('/services/create/step4')" class="form-group-data form-group-data__btn" variant="quinary" size="large">Подтвердить
      </UiButton>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '~/store/userStore';


const userStore = useUserStore();
const entity = computed(() =>{
  if(userStore.role === 'performer') {
    return 'services'
  } else return 'orders'
});

</script>

<style lang="scss">

.entity_step-check {
  .check-card {
    margin-bottom: 2rem;
  }

  .form-group-data {
    margin-bottom: 1.5em;
  }

  .form-group__title {
    font-family: 'fira-sans', sans-serif;
    margin-bottom: 0;
  }

  .form-group__value {
    line-height: 1.5em;
    margin-top: 0;
  }

}

</style>