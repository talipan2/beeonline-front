<template>
  <div class="staff">
    <p class="staff__description">Вы можете добавить сотрудников своей компании для предоставления им доступа в личный
      кабинет и осуществления операций по поиску заказчиков, работе с клиентами, размещению услуг, предоставляемых услуг
      в каталоге.
    </p>
    <UiButton :to="`/staff/create`" class="staff__btn" variant="quinary" size="around">Добавить сотрудника</UiButton>
    <h2 class="staff__title">Все сотрудники</h2>
    <div class="staff__list">
      <div class="staff__item" v-for="employee in employeeList" :key="employee.id">
        <div class="staff__col-1">
          <div class="staff__container-column">
            <p class="staff__name">{{ employee.name }}</p>
            <p class="staff__job-title">{{ employee.post || '' }}</p>
          </div>
        </div>
        <div class="staff__col-2">
          <div class="staff__container-column">
            <NuxtLink :to="`mailto:${employee.email}`" class="staff__email link">{{ employee.email }}</NuxtLink>
            <NuxtLink :to="`tel:${employee.phone}`" class="staff__phone link">{{ employee.phone }}</NuxtLink>
          </div>
        </div>
        <div class="staff__col-3">
          <div class="staff__container-row staff__status_type_full" v-if="userStore.userData.id === employee.id">
            <SvgoCheckMark class="svg-m"/>
            <p class="staff__status ">Полный доступ</p>
          </div>
          <div class="staff__container-row staff__status_type_limited" v-else>
            <SvgoAlertIcon class="svg-m"/>
            <p class="staff__status ">Доступ в личный кабинет</p>
          </div>
        </div>
        <div class="staff__col-4" >
          <UiButton :to="`/staff/edit/${employee.id}`" class="staff__item-btn" variant="quinary" size="large" v-if="userStore.userData.id !== employee.id">Изменить</UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOrganizationStore } from '~/store/organizationStore';
import { useUserStore } from '~/store/userStore';

const props = defineProps({

})

const organizationStore = useOrganizationStore();
const userStore = useUserStore();

const employeeList = ref([]);

onMounted(() => {
  organizationStore.getOrganizationEmployees(userStore.userData.organization_id).then(res => {
    if(res.data) {
      employeeList.value = res.data;
    }
  })
})

</script>

<style lang="scss">

.staff {
  font-size: 1rem;

  &__description {
    font-size: 1.3em;
    margin-bottom: 1.5em;
  }

  &__title {
    font-size: 2.8em;
    margin-bottom: .8em;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__item {
    font-size: 1.6em;
    line-height: 1em;
    display: flex;
    column-gap: 1em;
    align-items: center;
    padding: 2em 1em;
    border-top: 1px solid var(--border-color-secondary);

    .staff__item-btn {
      font-size: .75em;
      text-transform: uppercase;
      padding: .83em .625em;
    }
  }

  &__col-1 {
    flex: 0 1 30%;
  }

  &__col-2 {
    flex: 0 1 30%;
  }

  &__col-3 {
    flex: 0 1 30%;
  }

  &__col-4 {
    flex: 0 1 15%;
  }

  &__container-column {
    display: flex;
    flex-direction: column;
    row-gap: .5em;
  }

  &__container-row {
    display: flex;
    align-items: center;
    column-gap: .5em;
  }

  &__btn {
    font-size: 1.2em;
    text-transform: uppercase;
    padding: .83em 1.25em;
    width: fit-content;
    margin-bottom: 2.5em;
  }

  &__status_type_full {
    color: #6DBF2F;
    svg {
      fill: #6DBF2F;
    }
  }

  &__status_type_limited {
    color: var(--text-color-ternary);
    svg {
      fill: var(--text-color-ternary);
    }
  }
}

@include mobile {
  .staff {

    &__item {
      flex-wrap: wrap;
      row-gap: 1em;
      font-size: 1.3rem;
      justify-content: space-between;
    }

    &__col-1,
    &__col-2,
    &__col-3,
    &__col-4 {
      flex: 0 1 47%;
    }
  }
}

@include small-mobile {
  .staff {

    &__item {
      flex-direction: column;
      align-items: flex-start;
      row-gap: 1.5em;

      .staff__item-btn {
        font-size: 1.2rem;
        padding: .75em 1em;
      }
    }

    &__col-1,
    &__col-2,
    &__col-3,
    &__col-4 {
      flex-basis: 100%;
    }

    &__col-4 {
      align-self: flex-end;
    }
  }
}

</style>