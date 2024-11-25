<template>
  <div class="staff staff-create">
    <p class="staff__description">Заполните данные о сотруднике. Его логином будет являться адрес электронной
      почты, на которую придет пароль для доступа в личный кабинет.
    </p>
    <StaffContent v-model="staffData"/>
    <div class="form-group staff__buttons">
      <div class="form-group-data">
        <UiButton type="submit" class="form-group-data__btn" variant="quinary" size="large">Создать</UiButton>
      </div>
      <div class="form-group-data">
        <UiButton type="submit" class="form-group-data__btn" variant="senary" size="large">Вернуться к списку сотрудников</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>

const staffData = ref({
  name: '',
  email: '',
  phone: '',
  jobTitle: '',
  StaffPermissions: [],
  staffNotifications: [],
});


watch(() => staffData.value, (newVal) => {
  console.log(newVal)
}, {deep: true})
</script>

<style lang="scss">

.staff {

  &__buttons {
    padding-top: 2em;
    border-top: 1px solid var(--border-color-secondary);
  }
}

</style>